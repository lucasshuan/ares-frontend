/*
  Warnings:

  - Added the required column `role` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MOD', 'NONE');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "youtubeVideoUrl" TEXT;
