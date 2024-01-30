/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `maintenances` table. All the data in the column will be lost.
  - You are about to drop the `vehicles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vehicleProfileId` to the `maintenances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "maintenances" DROP CONSTRAINT "maintenances_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_userId_fkey";

-- AlterTable
ALTER TABLE "maintenances" DROP COLUMN "vehicleId",
ADD COLUMN     "vehicleProfileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "vehicles";

-- CreateTable
CREATE TABLE "vehicleProfiles" (
    "id" TEXT NOT NULL,
    "vehicle_make" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "registeration_date" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL,
    "registeration_validity" TEXT NOT NULL,
    "present_km" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "body_type" TEXT NOT NULL,
    "model_name" TEXT NOT NULL,
    "registration_no" TEXT NOT NULL,
    "engine_no" TEXT NOT NULL,
    "manufacturing_date" TEXT NOT NULL,
    "cubic_capacity" TEXT NOT NULL,
    "engine_capacity" TEXT NOT NULL,
    "sitting_capacity" TEXT NOT NULL,
    "chassis_no" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicleProfiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vehicleProfiles" ADD CONSTRAINT "vehicleProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_vehicleProfileId_fkey" FOREIGN KEY ("vehicleProfileId") REFERENCES "vehicleProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
