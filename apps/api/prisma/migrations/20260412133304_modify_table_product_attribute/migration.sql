-- AlterTable
ALTER TABLE `product_attribute` ADD COLUMN `attributeValueId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `product_attribute` ADD CONSTRAINT `product_attribute_attributeValueId_fkey` FOREIGN KEY (`attributeValueId`) REFERENCES `attribute_value`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
