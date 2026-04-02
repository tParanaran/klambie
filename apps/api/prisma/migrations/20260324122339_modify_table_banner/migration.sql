/*
  Warnings:

  - Made the column `isSale` on table `banner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `banner` MODIFY `isSale` BOOLEAN NOT NULL DEFAULT false;
