-- CreateTable
CREATE TABLE "drivers" (
    "licenseNo" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("driverId","vehicleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_driverId_key" ON "drivers"("driverId");

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicleProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
