/*
  Warnings:

  - Added the required column `vehicleName` to the `vehicleProfiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicleProfiles" ADD COLUMN     "vehicleName" TEXT NOT NULL,
ALTER COLUMN "purchase_date" SET DATA TYPE TEXT,
ALTER COLUMN "registeration_date" SET DATA TYPE TEXT;
