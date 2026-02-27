/*
  Warnings:

  - You are about to drop the `coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_coupon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_coupon` DROP FOREIGN KEY `user_coupon_couponId_fkey`;

-- DropForeignKey
ALTER TABLE `user_coupon` DROP FOREIGN KEY `user_coupon_userId_fkey`;

-- AlterTable
ALTER TABLE `product_tag` ADD COLUMN `promotionId` INTEGER NULL;

-- DropTable
DROP TABLE `coupon`;

-- DropTable
DROP TABLE `user_coupon`;

-- CreateTable
CREATE TABLE `Promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `type` ENUM('FIXED_AMOUNT', 'PERCENTAGE') NOT NULL,
    `value` DECIMAL(18, 2) NOT NULL,
    `applyTo` ENUM('ORDER', 'PRODUCT', 'CATEGORY', 'BRAND') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isAutomatic` BOOLEAN NOT NULL DEFAULT false,
    `minOrderValue` DECIMAL(18, 2) NULL,
    `maxDiscount` DECIMAL(18, 2) NULL,
    `usageLimit` INTEGER NULL,
    `usageLimitPerUser` INTEGER NULL,
    `usedCount` INTEGER NOT NULL DEFAULT 0,
    `startsAt` DATETIME(3) NULL,
    `endsAt` DATETIME(3) NULL,
    `isStackable` BOOLEAN NOT NULL DEFAULT false,
    `firstOrderOnly` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Promotion_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion_product` (
    `promotionId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`promotionId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion_category` (
    `promotionId` INTEGER NOT NULL,
    `categoryHierarchyId` INTEGER NOT NULL,

    PRIMARY KEY (`promotionId`, `categoryHierarchyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion_brand` (
    `promotionId` INTEGER NOT NULL,
    `brandId` INTEGER NOT NULL,

    PRIMARY KEY (`promotionId`, `brandId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion_usage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `promotionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `usedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `promotion_usage_promotionId_idx`(`promotionId`),
    INDEX `promotion_usage_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `promotionId` INTEGER NOT NULL,
    `isUsed` BOOLEAN NOT NULL DEFAULT false,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usedAt` DATETIME(3) NULL,
    `expiresAt` DATETIME(3) NULL,

    INDEX `user_promotion_userId_idx`(`userId`),
    UNIQUE INDEX `user_promotion_userId_promotionId_key`(`userId`, `promotionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_tag` ADD CONSTRAINT `product_tag_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_product` ADD CONSTRAINT `promotion_product_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_product` ADD CONSTRAINT `promotion_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_category` ADD CONSTRAINT `promotion_category_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_category` ADD CONSTRAINT `promotion_category_categoryHierarchyId_fkey` FOREIGN KEY (`categoryHierarchyId`) REFERENCES `category_hierarchy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_brand` ADD CONSTRAINT `promotion_brand_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_brand` ADD CONSTRAINT `promotion_brand_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_usage` ADD CONSTRAINT `promotion_usage_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_usage` ADD CONSTRAINT `promotion_usage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_promotion` ADD CONSTRAINT `user_promotion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_promotion` ADD CONSTRAINT `user_promotion_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
