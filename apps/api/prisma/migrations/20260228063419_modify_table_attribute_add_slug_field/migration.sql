/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `attribute_value` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `attribute_value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attribute` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `attribute_value` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Attribute_slug_key` ON `Attribute`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `attribute_value_slug_key` ON `attribute_value`(`slug`);
