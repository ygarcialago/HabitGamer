import { prisma } from "../DB/prismaClient.js";
import { HabitKind, HabitFrequency, HabitImpact } from "../../generated/prisma/client.js";
import { Habit } from "../Model/habit.js";
import { HabitKind as HabitKindModel, HabitFrequency as HabitFrequencyModel, HabitImpact as HabitImpactModel } from "../Enum/habits.enum.js";
//Los 2 import de los enums es por que 1 permite guardar en la BD y otro devolverlo como respuesta.


export class HabitRepository {
  async save(habit: Habit): Promise<Habit> {
    const created = await prisma.habit.create({
      data: {
        userId: habit.userId,
        name: habit.name,
        description: habit.description,
        kind: habit.kind as HabitKind,
        frequency: habit.frequency as HabitFrequency,
        impact: habit.impact as HabitImpact,
        value: habit.value,
        isActive: habit.isActive,
      },
    });

    return new Habit(
      created.id,
      created.userId,
      created.name,
      created.description,
      created.kind as HabitKindModel,
      created.frequency as HabitFrequencyModel,
      created.impact as HabitImpactModel,
      created.value,
      created.isActive,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<Habit | null> {
    const data = await prisma.habit.findUnique({
      where: { id },
    });

    if (!data) return null;

    return Habit.fromPersistence(data);
  }

  async updateIsActive(id: string, isActive: boolean): Promise<Habit> {
  const updated = await prisma.habit.update({
    where: { id },
    data: { isActive },
  });

  return Habit.fromPersistence(updated);
}

}