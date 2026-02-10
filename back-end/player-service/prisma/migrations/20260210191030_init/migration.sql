-- CreateEnum
CREATE TYPE "PlayerType" AS ENUM ('KNIGHT', 'ELF', 'DWARF', 'MAGICIAN', 'ROGUE', 'PALADIN', 'RANGER', 'CLERIC');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "life" INTEGER NOT NULL DEFAULT 100,
    "isDead" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "type" "PlayerType" NOT NULL DEFAULT 'KNIGHT',
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_id_user_key" ON "player"("id_user");
