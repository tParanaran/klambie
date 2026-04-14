-- CreateTable
CREATE TABLE `product_attribute_value` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productAttributeId` INTEGER NOT NULL,
    `attributeValueId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_attribute` ADD CONSTRAINT `product_attribute_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_attribute` ADD CONSTRAINT `product_attribute_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `Attribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_attribute_value` ADD CONSTRAINT `product_attribute_value_productAttributeId_fkey` FOREIGN KEY (`productAttributeId`) REFERENCES `product_attribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_attribute_value` ADD CONSTRAINT `product_attribute_value_attributeValueId_fkey` FOREIGN KEY (`attributeValueId`) REFERENCES `attribute_value`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
