/*
  Warnings:

  - You are about to drop the column `playerId` on the `tourney_seeds` table. All the data in the column will be lost.
  - You are about to drop the `match_participations` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `teamId` on table `tourney_seeds` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "match_participations" DROP CONSTRAINT "match_participations_matchId_fkey";

-- DropForeignKey
ALTER TABLE "match_participations" DROP CONSTRAINT "match_participations_playerId_fkey";

-- DropForeignKey
ALTER TABLE "match_participations" DROP CONSTRAINT "match_participations_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_playerId_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_teamId_fkey";

-- DropForeignKey
ALTER TABLE "tourney_seeds" DROP CONSTRAINT "tourney_seeds_tourneyId_fkey";

-- AlterTable
ALTER TABLE "tourney_seeds" DROP COLUMN "playerId",
ALTER COLUMN "teamId" SET NOT NULL;

-- DropTable
DROP TABLE "match_participations";

-- CreateTable
CREATE TABLE "player_participations" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_participations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_participations" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_participations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_participations_id_key" ON "player_participations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "team_participations_id_key" ON "team_participations"("id");

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_participations" ADD CONSTRAINT "player_participations_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_participations" ADD CONSTRAINT "player_participations_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_participations" ADD CONSTRAINT "team_participations_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_participations" ADD CONSTRAINT "team_participations_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourney_seeds" ADD CONSTRAINT "tourney_seeds_tourneyId_fkey" FOREIGN KEY ("tourneyId") REFERENCES "tourneys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourney_seeds" ADD CONSTRAINT "tourney_seeds_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
