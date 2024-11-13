/*
  Warnings:

  - The values [NorthernEurasia,AsiaPacific] on the enum `Region` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `snapshotUrl` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Region_new" AS ENUM ('NorthAmerica', 'SouthAmerica', 'Europe', 'Africa', 'Asia', 'Oceania');
ALTER TABLE "Account" ALTER COLUMN "region" TYPE "Region_new" USING ("region"::text::"Region_new");
ALTER TABLE "matches" ALTER COLUMN "region" TYPE "Region_new" USING ("region"::text::"Region_new");
ALTER TYPE "Region" RENAME TO "Region_old";
ALTER TYPE "Region_new" RENAME TO "Region";
DROP TYPE "Region_old";
COMMIT;

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "snapshotUrl" TEXT NOT NULL;
