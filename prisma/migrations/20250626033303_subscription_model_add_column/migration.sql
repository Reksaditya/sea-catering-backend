/*
  Warnings:

  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Allergic` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `DeliveryDay` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `meal` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `domicile` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MealTypes" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- CreateEnum
CREATE TYPE "DeliveryDays" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- AlterTable
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_pkey",
DROP COLUMN "Allergic",
DROP COLUMN "CreatedAt",
DROP COLUMN "DeliveryDay",
DROP COLUMN "email",
DROP COLUMN "meal",
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deliveryDays" "DeliveryDays"[],
ADD COLUMN     "domicile" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "isCancelled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mealTypes" "MealTypes"[],
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "planId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subscription_id_seq";

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "MealPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
