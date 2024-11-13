/*
  Warnings:

  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleEmail]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleEmail` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Account_email_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "email",
ADD COLUMN     "googleEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_googleEmail_key" ON "Account"("googleEmail");
