/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_gameId_fkey";

-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_accountId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Game";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "googleEmail" TEXT NOT NULL,
    "region" "Region" NOT NULL,
    "country" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GUEST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "steamUrl" TEXT,
    "thumbnailUrl" TEXT,
    "backgroundUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_id_key" ON "accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_googleEmail_key" ON "accounts"("googleEmail");

-- CreateIndex
CREATE UNIQUE INDEX "games_id_key" ON "games"("id");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
