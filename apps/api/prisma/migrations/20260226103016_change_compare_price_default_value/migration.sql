/*
  Warnings:

  - Made the column `comparePrice` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comparePrice` on table `product_variant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `comparePrice` DECIMAL(18, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `product_variant` MODIFY `comparePrice` DECIMAL(18, 2) NOT NULL DEFAULT 0;
