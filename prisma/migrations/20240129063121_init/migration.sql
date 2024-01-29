/*
  Warnings:

  - Added the required column `vehicleName` to the `VehicleProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VehicleProfile" ADD COLUMN     "vehicleName" TEXT NOT NULL;
