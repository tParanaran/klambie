-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `product_image_productId_fkey`;

-- DropIndex
DROP INDEX `product_image_productId_fkey` ON `product_image`;

-- AlterTable
ALTER TABLE `product_image` MODIFY `productId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
