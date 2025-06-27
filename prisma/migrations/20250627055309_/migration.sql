/*
  Warnings:

  - The values [SUN,MON,TUE,WED,THU,FRI,SAT] on the enum `DeliveryDays` will be removed. If these variants are still used in the database, this will fail.
  - The values [BREAKFAST,LUNCH,DINNER,SNACK] on the enum `MealTypes` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeliveryDays_new" AS ENUM ('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
ALTER TABLE "Subscription" ALTER COLUMN "deliveryDays" TYPE "DeliveryDays_new"[] USING ("deliveryDays"::text::"DeliveryDays_new"[]);
ALTER TYPE "DeliveryDays" RENAME TO "DeliveryDays_old";
ALTER TYPE "DeliveryDays_new" RENAME TO "DeliveryDays";
DROP TYPE "DeliveryDays_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MealTypes_new" AS ENUM ('Breakfast', 'Lunch', 'Dinner', 'Snack');
ALTER TABLE "Subscription" ALTER COLUMN "mealTypes" TYPE "MealTypes_new"[] USING ("mealTypes"::text::"MealTypes_new"[]);
ALTER TYPE "MealTypes" RENAME TO "MealTypes_old";
ALTER TYPE "MealTypes_new" RENAME TO "MealTypes";
DROP TYPE "MealTypes_old";
COMMIT;

-- AlterTable
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id");
