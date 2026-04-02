/*
  Warnings:

  - Added the required column `path` to the `category_hierarchy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category_hierarchy` ADD COLUMN `path` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `category_hierarchy_path_idx` ON `category_hierarchy`(`path`);
