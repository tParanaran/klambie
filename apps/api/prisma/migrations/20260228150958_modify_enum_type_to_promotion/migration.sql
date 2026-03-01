-- AlterTable
ALTER TABLE `promotion` MODIFY `applyTo` ENUM('ORDER', 'PRODUCT', 'CATEGORY', 'BRAND', 'TAG') NOT NULL;
