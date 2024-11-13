/*
  Warnings:

  - You are about to drop the column `teamfight` on the `matches` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MatchMode" AS ENUM ('DUEL', 'TEAM');

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "teamfight",
ADD COLUMN     "mode" "MatchMode" NOT NULL DEFAULT 'DUEL';

-- AlterTable
ALTER TABLE "tourney_seeds" ADD COLUMN     "playerId" TEXT,
ADD COLUMN     "teamId" TEXT;
