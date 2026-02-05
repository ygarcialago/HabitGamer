import {
    HabitKind,
    HabitFrequency,
    HabitImpact,
} from "../Enum/habits.enum.js";

export type CreateHabitProps = {
    userId: number;
    name: string;
    description?: string | null;
    kind: HabitKind;
    frequency: HabitFrequency;
    impact: HabitImpact;
    value: number;
    isActive: boolean;
};

export class Habit {
    constructor(
        public readonly id: string | null,
        public readonly userId: number,
        public name: string,
        public description: string | null,
        public kind: HabitKind,
        public frequency: HabitFrequency,
        public impact: HabitImpact,
        public value: number,
        public isActive: boolean,
        public readonly createdAt: Date | null,
        public readonly updatedAt: Date | null,
    ) { }

    static create(props: CreateHabitProps): Habit {
        return new Habit(
            null,
            props.userId,
            props.name,
            props.description ?? null,
            props.kind,
            props.frequency,
            props.impact,
            props.value,
            props.isActive,
            null,
            null
        );
    }

    isGood(): boolean {
        return this.kind === HabitKind.GOOD;
    }

    isBad(): boolean {
        return this.kind === HabitKind.BAD;
    }

    affectsXP(): boolean {
        return this.impact === HabitImpact.XP;
    }

    affectsLife(): boolean {
        return this.impact === HabitImpact.LIFE;
    }
}
