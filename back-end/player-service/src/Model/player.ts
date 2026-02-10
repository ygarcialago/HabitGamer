import { PlayerType, Gender } from "../../generated/prisma/enums.js";

export interface Player {
  id?: string;
  id_user: string;

  xp: number;
  level: number;
  life: number;
  isDead: boolean;

  title?: string;
  type: PlayerType;
  gender: Gender;

  createdAt: Date;
  updatedAt: Date;
}