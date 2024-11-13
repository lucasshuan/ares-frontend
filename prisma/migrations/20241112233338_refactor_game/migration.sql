/*
  Warnings:

  - You are about to drop the column `url` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `snapshotUrl` on the `matches` table. All the data in the column will be lost.
  - Added the required column `backgroundUrl` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenshotUrl` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "url",
ADD COLUMN     "backgroundUrl" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "steamUrl" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "snapshotUrl",
ADD COLUMN     "screenshotUrl" TEXT NOT NULL;
