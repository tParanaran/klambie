/*
  Warnings:

  - Added the required column `basePrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attribute_value` DROP FOREIGN KEY `attribute_value_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `product_attribute` DROP FOREIGN KEY `product_attribute_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `product_tag` DROP FOREIGN KEY `product_tag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant_attribute` DROP FOREIGN KEY `product_variant_attribute_attributeValueId_fkey`;

-- DropForeignKey
ALTER TABLE `user_point` DROP FOREIGN KEY `user_point_userId_fkey`;

-- DropIndex
DROP INDEX `product_attribute_attributeId_fkey` ON `product_attribute`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `basePrice` DECIMAL(18, 2) NOT NULL,
    ADD COLUMN `comparePrice` DECIMAL(18, 2) NULL;

-- AlterTable
ALTER TABLE `product_variant` ADD COLUMN `comparePrice` DECIMAL(18, 2) NULL;

-- AddForeignKey
ALTER TABLE `user_point` ADD CONSTRAINT `user_point_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attribute_value` ADD CONSTRAINT `attribute_value_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `Attribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_attribute` ADD CONSTRAINT `product_attribute_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `Attribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant_attribute` ADD CONSTRAINT `product_variant_attribute_attributeValueId_fkey` FOREIGN KEY (`attributeValueId`) REFERENCES `attribute_value`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tag` ADD CONSTRAINT `product_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
