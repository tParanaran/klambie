/*
  Warnings:

  - You are about to drop the column `bio` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `brand` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `brand` DROP COLUMN `bio`,
    DROP COLUMN `logo`,
    ADD COLUMN `description` VARCHAR(500) NULL,
    ADD COLUMN `image` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(500) NULL,
    ADD COLUMN `image` VARCHAR(200) NULL;
