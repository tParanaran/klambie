/*
  Warnings:

  - A unique constraint covering the columns `[productId,attributeId]` on the table `product_attribute` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `product_attribute_productId_attributeId_key` ON `product_attribute`(`productId`, `attributeId`);
