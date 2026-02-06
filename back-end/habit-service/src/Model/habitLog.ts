import { Habit } from "./habit.js";

export type CreateHabitLogProps = {
  habitId: string;
  userId: number;
  date: Date;
  completed: boolean;
};

export class HabitLog {
  constructor(
    public readonly id: string | null,
    public readonly habitId: string,
    public readonly userId: number,
    public date: Date,
    public completed: boolean,
    public readonly createdAt: Date | null,
    public readonly habit?: Habit // opcional si quieres incluir la relación
  ) {}

  static create(props: CreateHabitLogProps): HabitLog {
    return new HabitLog(
      null,
      props.habitId,
      props.userId,
      props.date,
      props.completed,
      null
    );
  }

  static fromPersistence(data: any): HabitLog {
    return new HabitLog(
      data.id,
      data.habitId,
      data.userId,
      new Date(data.date),
      data.completed,
      data.createdAt ? new Date(data.createdAt) : null,
      data.habit ? Habit.fromPersistence(data.habit) : undefined
    );
  }

  markCompleted() {
    this.completed = true;
  }

  markFailed() {
    this.completed = false;
  }
}
