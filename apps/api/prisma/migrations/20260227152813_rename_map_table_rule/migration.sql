/*
  Warnings:

  - You are about to drop the `promotionrule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `promotionrule` DROP FOREIGN KEY `PromotionRule_promotionId_fkey`;

-- DropTable
DROP TABLE `promotionrule`;

-- CreateTable
CREATE TABLE `promotion_rule` (
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

    UNIQUE INDEX `promotion_rule_promotionId_key`(`promotionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `promotion_rule` ADD CONSTRAINT `promotion_rule_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
