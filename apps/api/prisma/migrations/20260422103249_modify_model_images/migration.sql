-- AlterTable
ALTER TABLE `product_image` ADD COLUMN `source` ENUM('URL', 'LOCAL') NOT NULL DEFAULT 'URL';
