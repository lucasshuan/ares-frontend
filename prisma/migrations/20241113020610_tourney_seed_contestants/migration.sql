/*
  Warnings:

  - You are about to drop the column `accepted` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeVideoUrl` on the `matches` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_gameId_fkey";

-- DropForeignKey
ALTER TABLE "participations" DROP CONSTRAINT "participations_matchId_fkey";

-- DropForeignKey
ALTER TABLE "participations" DROP CONSTRAINT "participations_playerId_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_accountId_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_gameId_fkey";

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "officialWebsiteUrl" TEXT;

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "accepted",
DROP COLUMN "youtubeVideoUrl",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "streamUrl" TEXT,
ADD COLUMN     "tourneyId" TEXT;

-- AlterTable
ALTER TABLE "participations" ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "tourneys" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "thumbnailUrl" TEXT,
    "teamMinLength" INTEGER NOT NULL DEFAULT 1,
    "teamMaxLength" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tourneys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seeds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "tourneyId" TEXT NOT NULL,
    "phase" INTEGER NOT NULL DEFAULT 0,
    "loser" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contestants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "playerId" TEXT,
    "seedId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contestants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tourneys_id_key" ON "tourneys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "seeds_id_key" ON "seeds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contestants_id_key" ON "contestants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "games_name_key" ON "games"("name");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seeds" ADD CONSTRAINT "seeds_tourneyId_fkey" FOREIGN KEY ("tourneyId") REFERENCES "tourneys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contestants" ADD CONSTRAINT "contestants_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contestants" ADD CONSTRAINT "contestants_seedId_fkey" FOREIGN KEY ("seedId") REFERENCES "seeds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
