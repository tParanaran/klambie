/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `product_image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `product_image_productVariantId_fkey`;

-- DropIndex
DROP INDEX `product_image_productVariantId_fkey` ON `product_image`;

-- AlterTable
ALTER TABLE `attribute` ADD COLUMN `imageVariant` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `product_image` DROP COLUMN `productVariantId`,
    ADD COLUMN `attributeValueId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_attributeValueId_fkey` FOREIGN KEY (`attributeValueId`) REFERENCES `attribute_value`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
