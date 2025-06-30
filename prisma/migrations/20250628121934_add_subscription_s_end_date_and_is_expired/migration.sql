/*
  Warnings:

  - Added the required column `endDate` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
ADD COLUMN     "isExpired" BOOLEAN NOT NULL DEFAULT false;
