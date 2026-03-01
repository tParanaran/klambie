/*
  Warnings:

  - You are about to drop the `dimension` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `point` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_info` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[attributeId,value]` on the table `attribute_value` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Coupon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attribute_value` DROP FOREIGN KEY `Attribute_Value_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `Category_Hierarchy_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `Category_Hierarchy_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `Category_Hierarchy_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `Category_Hierarchy_subcategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `dimension` DROP FOREIGN KEY `Dimension_productInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `point` DROP FOREIGN KEY `Point_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_sizingGuideId_fkey`;

-- DropForeignKey
ALTER TABLE `product_attribute` DROP FOREIGN KEY `Product_Attribute_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `product_attribute` DROP FOREIGN KEY `Product_Attribute_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `Product_Category_categoryHierarchyId_fkey`;

-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `Product_Category_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `Product_Image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `Product_Image_productVariantId_fkey`;

-- DropForeignKey
ALTER TABLE `product_info` DROP FOREIGN KEY `Product_Info_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_tag` DROP FOREIGN KEY `Product_Tag_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_tag` DROP FOREIGN KEY `Product_Tag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant` DROP FOREIGN KEY `Product_Variant_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant_attribute` DROP FOREIGN KEY `Product_Variant_Attribute_attributeValueId_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant_attribute` DROP FOREIGN KEY `Product_Variant_Attribute_productVariantId_fkey`;

-- DropForeignKey
ALTER TABLE `user_coupon` DROP FOREIGN KEY `User_Coupon_couponId_fkey`;

-- DropForeignKey
ALTER TABLE `user_coupon` DROP FOREIGN KEY `User_Coupon_userId_fkey`;

-- DropIndex
DROP INDEX `Attribute_Value_attributeId_fkey` ON `attribute_value`;

-- DropIndex
DROP INDEX `Attribute_Value_value_key` ON `attribute_value`;

-- DropIndex
DROP INDEX `Product_sizingGuideId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_Attribute_attributeId_fkey` ON `product_attribute`;

-- DropIndex
DROP INDEX `Product_Image_productId_fkey` ON `product_image`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product_variant` ADD COLUMN `reservedStock` INTEGER NOT NULL DEFAULT 0,
    ALTER COLUMN `stock` DROP DEFAULT;

-- DropTable
DROP TABLE `dimension`;

-- DropTable
DROP TABLE `point`;

-- DropTable
DROP TABLE `product_info`;

-- CreateTable
CREATE TABLE `user_point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `amount` DECIMAL(18, 2) NOT NULL,
    `type` ENUM('REDEEM', 'EARN') NOT NULL,
    `validUntil` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_point_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `material` VARCHAR(191) NULL,
    `feature` TEXT NULL,
    `weight` INTEGER NOT NULL,
    `length` INTEGER NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `volume` INTEGER NULL,
    `care` TEXT NULL,

    UNIQUE INDEX `product_details_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `attribute_value_attributeId_value_key` ON `attribute_value`(`attributeId`, `value`);

-- CreateIndex
CREATE UNIQUE INDEX `Coupon_code_key` ON `Coupon`(`code`);

-- CreateIndex
CREATE INDEX `Coupon_expiredAt_idx` ON `Coupon`(`expiredAt`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_slug_key` ON `Product`(`slug`);

-- CreateIndex
CREATE INDEX `product_category_categoryHierarchyId_idx` ON `product_category`(`categoryHierarchyId`);

-- CreateIndex
CREATE INDEX `product_variant_productId_stock_idx` ON `product_variant`(`productId`, `stock`);

-- CreateIndex
CREATE INDEX `product_variant_productId_price_idx` ON `product_variant`(`productId`, `price`);

-- CreateIndex
CREATE INDEX `product_variant_productId_isActive_idx` ON `product_variant`(`productId`, `isActive`);

-- AddForeignKey
ALTER TABLE `user_point` ADD CONSTRAINT `user_point_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_coupon` ADD CONSTRAINT `user_coupon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_coupon` ADD CONSTRAINT `user_coupon_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_sizingGuideId_fkey` FOREIGN KEY (`sizingGuideId`) REFERENCES `sizing_guide`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_details` ADD CONSTRAINT `product_details_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_productVariantId_fkey` FOREIGN KEY (`productVariantId`) REFERENCES `product_variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attribute_value` ADD CONSTRAINT `attribute_value_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `Attribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_attribute` ADD CONSTRAINT `product_attribute_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_attribute` ADD CONSTRAINT `product_attribute_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `Attribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant` ADD CONSTRAINT `product_variant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant_attribute` ADD CONSTRAINT `product_variant_attribute_productVariantId_fkey` FOREIGN KEY (`productVariantId`) REFERENCES `product_variant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant_attribute` ADD CONSTRAINT `product_variant_attribute_attributeValueId_fkey` FOREIGN KEY (`attributeValueId`) REFERENCES `attribute_value`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `Subcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_categoryHierarchyId_fkey` FOREIGN KEY (`categoryHierarchyId`) REFERENCES `category_hierarchy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tag` ADD CONSTRAINT `product_tag_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tag` ADD CONSTRAINT `product_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `product` RENAME INDEX `Product_brandId_fkey` TO `Product_brandId_idx`;

-- RenameIndex
ALTER TABLE `product_tag` RENAME INDEX `Product_Tag_tagId_fkey` TO `product_tag_tagId_idx`;

-- RenameIndex
ALTER TABLE `product_variant` RENAME INDEX `Product_Variant_barcode_key` TO `product_variant_barcode_key`;

-- RenameIndex
ALTER TABLE `product_variant` RENAME INDEX `Product_Variant_sku_key` TO `product_variant_sku_key`;

-- RenameIndex
ALTER TABLE `product_variant_attribute` RENAME INDEX `Product_Variant_Attribute_attributeValueId_fkey` TO `product_variant_attribute_attributeValueId_idx`;

-- RenameIndex
ALTER TABLE `user_coupon` RENAME INDEX `User_Coupon_userId_fkey` TO `user_coupon_userId_idx`;
