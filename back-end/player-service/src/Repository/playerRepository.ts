import { type Player, PlayerType, Gender } from "../../generated/prisma/client.js";
import { prisma } from "../DB/prismaClient.js";


interface CreatePlayerInput {
  id_user: string;
  type: PlayerType;
  gender: Gender;
  title?: string;
}

export class PlayerRepository {

  async createPlayer(input: CreatePlayerInput): Promise<Player> {
    const { id_user, type, gender, title } = input;

    const player = await prisma.player.create({
      data: {
        id_user,
        type,
        gender,
        title: title ?? null,
        xp: 0,
        level: 1,
        life: 100,
        isDead: false,
      },
    });

    return player;
  }

  async getPlayerByUserId(id_user: string): Promise<Player | null> {
    return prisma.player.findUnique({
      where: { id_user },
    });
  }

  async getById(id: string) {
    return prisma.player.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<Player>) {
    return prisma.player.update({
      where: { id },
      data,
    });
  }
  
}