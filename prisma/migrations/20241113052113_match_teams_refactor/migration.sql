/*
  Warnings:

  - You are about to drop the column `tourneyId` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the `contestants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seeds` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[gameId,username]` on the table `players` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "contestants" DROP CONSTRAINT "contestants_playerId_fkey";

-- DropForeignKey
ALTER TABLE "contestants" DROP CONSTRAINT "contestants_seedId_fkey";

-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_tourneyId_fkey";

-- DropForeignKey
ALTER TABLE "participations" DROP CONSTRAINT "participations_matchId_fkey";

-- DropForeignKey
ALTER TABLE "participations" DROP CONSTRAINT "participations_playerId_fkey";

-- DropForeignKey
ALTER TABLE "seeds" DROP CONSTRAINT "seeds_tourneyId_fkey";

-- DropIndex
DROP INDEX "players_username_key";

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "tourneyId";

-- DropTable
DROP TABLE "contestants";

-- DropTable
DROP TABLE "participations";

-- DropTable
DROP TABLE "seeds";

-- CreateTable
CREATE TABLE "match_participations" (
    "id" TEXT NOT NULL,
    "playerId" TEXT,
    "teamId" TEXT,
    "matchId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_participations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tourney_seeds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "tourneyId" TEXT NOT NULL,
    "phase" INTEGER NOT NULL DEFAULT 0,
    "loser" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tourney_seeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "match_participations_id_key" ON "match_participations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tourney_seeds_id_key" ON "tourney_seeds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "teams_id_key" ON "teams"("id");

-- CreateIndex
CREATE UNIQUE INDEX "team_members_id_key" ON "team_members"("id");

-- CreateIndex
CREATE UNIQUE INDEX "players_gameId_username_key" ON "players"("gameId", "username");

-- AddForeignKey
ALTER TABLE "match_participations" ADD CONSTRAINT "match_participations_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_participations" ADD CONSTRAINT "match_participations_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_participations" ADD CONSTRAINT "match_participations_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourney_seeds" ADD CONSTRAINT "tourney_seeds_tourneyId_fkey" FOREIGN KEY ("tourneyId") REFERENCES "tourneys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
