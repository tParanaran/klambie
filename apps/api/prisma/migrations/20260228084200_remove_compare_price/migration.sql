/*
  Warnings:

  - You are about to drop the column `comparePrice` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `comparePrice` on the `product_variant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `comparePrice`;

-- AlterTable
ALTER TABLE `product_variant` DROP COLUMN `comparePrice`;
