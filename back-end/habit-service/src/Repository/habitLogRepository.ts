import { prisma } from "../../src/DB/prismaClient.js";
import { HabitLog } from "../Model/habitLog.js";

export class HabitLogRepository {
  async findByHabitAndDate(habitId: string, date: Date): Promise<HabitLog | null> {
    return prisma.habitLog.findUnique({
      where: {
        habitId_date: { habitId, date },
      },
    }).then(log => log ? HabitLog.fromPersistence(log) : null);
  }

  async create(log: HabitLog): Promise<HabitLog> {
    return prisma.habitLog.create({
      data: {
        habitId: log.habitId,
        userId: log.userId,
        date: log.date,
        completed: log.completed,
      },
    }).then(HabitLog.fromPersistence);
  }

  async update(log: HabitLog): Promise<HabitLog> {
    return prisma.habitLog.update({
      where: { id: log.id! },
      data: {
        completed: log.completed,
      },
    }).then(HabitLog.fromPersistence);
  }

  async findLogsByHabit(habitId: string): Promise<HabitLog[]> {
    return prisma.habitLog.findMany({
      where: { habitId },
      orderBy: { date: 'asc' },
    }).then(logs => logs.map(HabitLog.fromPersistence));
  }
}
