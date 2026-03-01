/*
  Warnings:

  - You are about to drop the column `imageVariant` on the `attribute` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `attribute` DROP COLUMN `imageVariant`;

-- AlterTable
ALTER TABLE `product_attribute` ADD COLUMN `imageBased` BOOLEAN NOT NULL DEFAULT false;
