-- AlterTable
ALTER TABLE `user` ADD COLUMN `referredBy` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `amount` DECIMAL(18, 2) NOT NULL DEFAULT 10000,
    `redeemed` BOOLEAN NOT NULL DEFAULT false,
    `validUntil` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `couponId` INTEGER NOT NULL,
    `isUsed` BOOLEAN NOT NULL DEFAULT false,
    `validUntil` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(30) NOT NULL,
    `amount` DECIMAL(18, 2) NOT NULL,
    `type` ENUM('FIXED_AMOUNT', 'PERCENTAGE') NOT NULL,
    `expiredAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Point` ADD CONSTRAINT `Point_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Coupon` ADD CONSTRAINT `User_Coupon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Coupon` ADD CONSTRAINT `User_Coupon_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
