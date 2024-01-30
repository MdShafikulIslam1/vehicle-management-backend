/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VehicleProfile" DROP CONSTRAINT "VehicleProfile_userId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VehicleProfile";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" "RoleEnumType" NOT NULL DEFAULT 'USER',
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
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

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenances" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "expense" TEXT NOT NULL,
    "lastDone" TIMESTAMP(3) NOT NULL,
    "currentDate" TIMESTAMP(3) NOT NULL,
    "nextDue" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
