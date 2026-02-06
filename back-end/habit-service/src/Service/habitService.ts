import type { CreateHabitDTO } from "../DTO/createHabit.dto.js";
import { HabitRepository } from "../Repository/habitRepository.js";
import { HabitKind, HabitFrequency, HabitImpact } from "../../generated/prisma/enums.js";
import type { CreateHabitProps } from "../Model/habit.js";
import { Habit } from "../Model/habit.js";
import type { changeActivenessHabitDTO } from "../DTO/changeActivenessHabit.dto.js";

export class HabitService {
    constructor(private repo: HabitRepository) { }

    async createHabit(data: CreateHabitDTO): Promise<Habit> {
        const { name, userId, description, kind, frequency, impact, value, isActive } = data;
        
        const props: CreateHabitProps = {
            userId: userId,
            name: name,
            kind: kind,
            frequency: frequency,
            impact: impact,
            value: value,
            description: description ?? "",
            isActive: isActive
        } 
        const habit = Habit.create(props);

        return this.repo.save(habit)
    }

    async changeActiveness (data: changeActivenessHabitDTO): Promise<Habit> {
        const { id, isActive } = data
        
        let habit : Habit | null = await this.repo.findById(id);
        if(!habit) throw new Error("Id inválido");

        habit = await this.repo.updateIsActive(habit.id!, isActive)
        return habit;
    }
}