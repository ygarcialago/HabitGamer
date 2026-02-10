import {
    HabitKind as DomainHabitKind,
    HabitFrequency as DomainHabitFrequency,
    HabitImpact as DomainHabitImpact,
} from "../Enum/habits.enum.js";

import {
    HabitKind as PrismaHabitKind,
    HabitFrequency as PrismaHabitFrequency,
    HabitImpact as PrismaHabitImpact,
} from "../../generated/prisma/enums.js";

export function mapHabitKind(kind: PrismaHabitKind): DomainHabitKind {
    switch (kind) {
        case PrismaHabitKind.GOOD:
            return DomainHabitKind.GOOD;
        case PrismaHabitKind.BAD:
            return DomainHabitKind.BAD;
    }
}

export function mapHabitFrequency(freq: PrismaHabitFrequency): DomainHabitFrequency {
    switch (freq) {
        case PrismaHabitFrequency.DAILY:
            return DomainHabitFrequency.DAILY;
        case PrismaHabitFrequency.WEEKLY:
            return DomainHabitFrequency.WEEKLY;
    }
}

export function mapHabitImpact(impact: PrismaHabitImpact): DomainHabitImpact {
    switch (impact) {
        case PrismaHabitImpact.XP:
            return DomainHabitImpact.XP;
        case PrismaHabitImpact.LIFE:
            return DomainHabitImpact.LIFE;
    }
}