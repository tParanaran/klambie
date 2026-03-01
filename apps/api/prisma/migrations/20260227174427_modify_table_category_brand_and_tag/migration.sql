/*
  Warnings:

  - You are about to drop the column `collectionId` on the `category_hierarchy` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `category_hierarchy` table. All the data in the column will be lost.
  - You are about to drop the column `subcategoryId` on the `category_hierarchy` table. All the data in the column will be lost.
  - You are about to drop the `collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `category_hierarchy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `category_hierarchy_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `category_hierarchy_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `category_hierarchy` DROP FOREIGN KEY `category_hierarchy_subcategoryId_fkey`;

-- DropIndex
DROP INDEX `category_hierarchy_collectionId_fkey` ON `category_hierarchy`;

-- DropIndex
DROP INDEX `category_hierarchy_departmentId_fkey` ON `category_hierarchy`;

-- DropIndex
DROP INDEX `category_hierarchy_subcategoryId_fkey` ON `category_hierarchy`;

-- AlterTable
ALTER TABLE `brand` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `category_hierarchy` DROP COLUMN `collectionId`,
    DROP COLUMN `departmentId`,
    DROP COLUMN `subcategoryId`,
    ADD COLUMN `level` INTEGER NOT NULL,
    ADD COLUMN `parentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `tag` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `collection`;

-- DropTable
DROP TABLE `department`;

-- DropTable
DROP TABLE `subcategory`;

-- CreateIndex
CREATE UNIQUE INDEX `Brand_slug_key` ON `Brand`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_slug_key` ON `Category`(`slug`);

-- CreateIndex
CREATE INDEX `category_hierarchy_parentId_idx` ON `category_hierarchy`(`parentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_slug_key` ON `Tag`(`slug`);

-- AddForeignKey
ALTER TABLE `category_hierarchy` ADD CONSTRAINT `category_hierarchy_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `category_hierarchy`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
