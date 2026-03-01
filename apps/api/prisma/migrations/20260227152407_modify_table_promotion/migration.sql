/*
  Warnings:

  - You are about to drop the column `promotionId` on the `product_tag` table. All the data in the column will be lost.
  - You are about to drop the column `endsAt` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `firstOrderOnly` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `maxDiscount` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `minOrderValue` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `usageLimit` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `usageLimitPerUser` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `usedCount` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the `promotion_brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotion_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotion_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product_tag` DROP FOREIGN KEY `product_tag_promotionId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion_brand` DROP FOREIGN KEY `promotion_brand_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion_brand` DROP FOREIGN KEY `promotion_brand_promotionId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion_category` DROP FOREIGN KEY `promotion_category_categoryHierarchyId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion_category` DROP FOREIGN KEY `promotion_category_promotionId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion_product` DROP FOREIGN KEY `promotion_product_productId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion_product` DROP FOREIGN KEY `promotion_product_promotionId_fkey`;

-- DropIndex
DROP INDEX `product_tag_promotionId_fkey` ON `product_tag`;

-- AlterTable
ALTER TABLE `product_tag` DROP COLUMN `promotionId`;

-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `endsAt`,
    DROP COLUMN `firstOrderOnly`,
    DROP COLUMN `maxDiscount`,
    DROP COLUMN `minOrderValue`,
    DROP COLUMN `startsAt`,
    DROP COLUMN `usageLimit`,
    DROP COLUMN `usageLimitPerUser`,
    DROP COLUMN `usedCount`;

-- DropTable
DROP TABLE `promotion_brand`;

-- DropTable
DROP TABLE `promotion_category`;

-- DropTable
DROP TABLE `promotion_product`;

-- CreateTable
CREATE TABLE `PromotionRule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `promotionId` INTEGER NOT NULL,
    `minOrderValue` DECIMAL(18, 2) NULL,
    `maxDiscount` DECIMAL(18, 2) NULL,
    `usageLimit` INTEGER NULL,
    `usageLimitPerUser` INTEGER NULL,
    `usedCount` INTEGER NOT NULL DEFAULT 0,
    `startsAt` DATETIME(3) NULL,
    `endsAt` DATETIME(3) NULL,
    `firstOrderOnly` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `PromotionRule_promotionId_key`(`promotionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion_assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `promotionId` INTEGER NOT NULL,
    `targetType` ENUM('PRODUCT', 'CATEGORY', 'BRAND', 'TAG') NOT NULL,
    `targetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PromotionRule` ADD CONSTRAINT `PromotionRule_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_assignment` ADD CONSTRAINT `promotion_assignment_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
