import { type Player, PlayerType, Gender } from "../../generated/prisma/client.js";
import { PlayerRepository } from "../Repository/playerRepository.js";

interface CreatePlayerDTO {
  id_user: string;
  type: PlayerType;
  gender: Gender;
  title?: string;
}

export class PlayerService {
  constructor(private playerRepository: PlayerRepository) { }

  async createPlayer(data: CreatePlayerDTO): Promise<Player> {

    const existing = await this.playerRepository.getPlayerByUserId(data.id_user);

    if (existing) {
      throw new Error("Player already exists for this user");
    }

    return this.playerRepository.createPlayer(data);
  }

  async addExperience(playerId: string, amount: number): Promise<Player> {
    if (amount <= 0) {
      throw new Error("Experience amount must be greater than 0");
    }

    const player = await this.playerRepository.getById(playerId);
    if (!player) throw new Error("Player not found");

    let newXp = player.xp + amount;
    let newLevel = player.level;

    const xpToLevelUp = player.level * 100;

    if (newXp >= xpToLevelUp) {
      newLevel += 1;
      newXp = newXp - xpToLevelUp;
    }

    return this.playerRepository.update(playerId, {
      xp: newXp,
      level: newLevel,
    });
  }

  async takeDamage(playerId: string, damage: number): Promise<Player> {
    if (damage <= 0) {
      throw new Error("Damage must be greater than 0");
    }

    const player = await this.playerRepository.getById(playerId);
    if (!player) throw new Error("Player not found");

    let newLife = player.life - damage;
    let isDead = player.isDead;

    if (newLife <= 0) {
      newLife = 0;
      isDead = true;
    }

    return this.playerRepository.update(playerId, {
      life: newLife,
      isDead,
    });
  }

  async revive(playerId: string) {
    const player = await this.playerRepository.getById(playerId);
    if (!player) throw new Error("Player not found");

    if (!player.isDead) {
      throw new Error("Player is not dead");
    }

    return this.playerRepository.update(playerId, {
      xp: 0,
      level: 1,
      life: 100,
      isDead: false,
    });
  }
  
  async reroll(
    playerId: string,
    type: PlayerType,
    gender: Gender,
    title?: string
  ) {
    const player = await this.playerRepository.getById(playerId);
    if (!player) throw new Error("Player not found");

    return this.playerRepository.update(playerId, {
      type,
      gender,
      title: title ?? null,
    });
  }

}
