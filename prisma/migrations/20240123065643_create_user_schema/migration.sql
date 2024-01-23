-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('ADMIN', 'USER', 'DRIVER', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "RoleEnumType" NOT NULL DEFAULT 'USER',
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
