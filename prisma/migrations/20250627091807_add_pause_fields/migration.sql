-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "pauseFrom" TIMESTAMP(3),
ADD COLUMN     "pauseUntil" TIMESTAMP(3);
