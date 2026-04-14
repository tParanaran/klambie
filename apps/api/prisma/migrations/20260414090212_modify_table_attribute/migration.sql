/*
  Warnings:

  - You are about to drop the column `attributeValueId` on the `product_attribute` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product_attribute` DROP FOREIGN KEY `product_attribute_attributeValueId_fkey`;

-- DropIndex
DROP INDEX `product_attribute_attributeValueId_fkey` ON `product_attribute`;

-- AlterTable
ALTER TABLE `product_attribute` DROP COLUMN `attributeValueId`;
