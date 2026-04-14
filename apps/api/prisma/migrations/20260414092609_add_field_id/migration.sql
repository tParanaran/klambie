/*
  Warnings:

  - The primary key for the `product_attribute` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `product_attribute` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product_attribute` DROP FOREIGN KEY `product_attribute_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `product_attribute` DROP FOREIGN KEY `product_attribute_productId_fkey`;

-- DropIndex
DROP INDEX `product_attribute_attributeId_fkey` ON `product_attribute`;

-- AlterTable
ALTER TABLE `product_attribute` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
