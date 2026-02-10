import { HabitRepository } from "../Repository/habitRepository.js";
import { HabitLogRepository } from "../Repository/habitLogRepository.js";
import { HabitLog } from "../Model/habitLog.js";

export class HabitService {
  constructor(
    private habitRepo: HabitRepository,
    private logRepo: HabitLogRepository
  ) { }

  private getPeriodStart(habitFrequency: "DAILY" | "WEEKLY"): Date {
    const today = new Date();
    if (habitFrequency === "DAILY") {
      today.setHours(0, 0, 0, 0);
      return today;
    } else {
      const day = today.getDay();
      const diff = today.getDate() - day + (day === 0 ? -6 : 1); // lunes
      return new Date(today.setDate(diff));
    }
  }

  async markHabit(habitId: string, userId: number): Promise<HabitLog> {
    const habit = await this.habitRepo.findById(habitId);
    if (!habit) throw new Error("Habit not found");
    if (!habit.isActive) throw new Error("Habit is not active");

    const periodStart = this.getPeriodStart(habit.frequency);

    let log = await this.logRepo.findByHabitAndDate(habitId, periodStart);

    if (log) {
      log.markCompleted();
      return this.logRepo.update(log);
    } else {
      log = HabitLog.create({
        habitId,
        userId,
        date: periodStart,
        completed: true,
      });
      return this.logRepo.create(log);
    }
  }

  async getStreak(habitId: string): Promise<number> {
    const logs = await this.logRepo.findLogsByHabit(habitId);
    let streak = 0;
    for (let i = logs.length - 1; i >= 0; i--) {
      if (logs[i]!.completed) streak++;
      else break;
    }
    return streak;
  }

  async unmarkHabit(habitId: string): Promise<HabitLog> {
    const habit = await this.habitRepo.findById(habitId);
    if (!habit) throw new Error("Habit not found");
    if (!habit.isActive) throw new Error("Habit is not active");

    const periodStart = this.getPeriodStart(habit.frequency);

    const log = await this.logRepo.findByHabitAndDate(habitId, periodStart);

    if (!log) {
      throw new Error("Habit not marked for this period");
    }

    log.markFailed();
    return this.logRepo.update(log);
  }

  async undoLastCheck(habitId: string): Promise<void> {
    const logs = await this.logRepo.findLogsByHabit(habitId);

    const lastCompletedLog = [...logs]
      .reverse()
      .find(log => log.completed);

    if (!lastCompletedLog) {
      throw new Error("No completed habit to undo");
    }

    await this.logRepo.delete(lastCompletedLog.id!);
  }

}
