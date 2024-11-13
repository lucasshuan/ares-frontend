/*
  Warnings:

  - The `status` column on the `matches` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "contestants" DROP CONSTRAINT "contestants_playerId_fkey";

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "status",
ADD COLUMN     "status" "MatchStatus" NOT NULL DEFAULT 'ACCEPTED';

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_tourneyId_fkey" FOREIGN KEY ("tourneyId") REFERENCES "tourneys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contestants" ADD CONSTRAINT "contestants_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;
