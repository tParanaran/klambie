/*
  Warnings:

  - You are about to drop the column `price` on the `product_variant` table. All the data in the column will be lost.
  - Added the required column `basePrice` to the `product_variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `category_hierarchy_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `category_hierarchy_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `category_hierarchy_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `category_hierarchy_subcategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant` DROP FOREIGN KEY `product_variant_productId_fkey`;

-- DropIndex
DROP INDEX `category_hierarchy_categoryId_fkey` ON `category_hierarchy`;

-- DropIndex
DROP INDEX `category_hierarchy_collectionId_fkey` ON `category_hierarchy`;

-- DropIndex
DROP INDEX `category_hierarchy_departmentId_fkey` ON `category_hierarchy`;

-- DropIndex
DROP INDEX `category_hierarchy_subcategoryId_fkey` ON `category_hierarchy`;

-- DropIndex
DROP INDEX `product_variant_productId_price_idx` ON `product_variant`;

-- AlterTable
ALTER TABLE `product_variant` DROP COLUMN `price`,
    ADD COLUMN `basePrice` DECIMAL(18, 2) NOT NULL;

-- CreateIndex
CREATE INDEX `product_variant_productId_basePrice_idx` ON `product_variant`(`productId`, `basePrice`);

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `Subcategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
