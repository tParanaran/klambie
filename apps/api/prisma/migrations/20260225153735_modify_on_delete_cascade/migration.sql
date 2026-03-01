-- DropForeignKey
ALTER TABLE `product_attribute` DROP FOREIGN KEY `product_attribute_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `product_category_categoryHierarchyId_fkey`;

-- DropForeignKey
ALTER TABLE `product_tag` DROP FOREIGN KEY `product_tag_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant_attribute` DROP FOREIGN KEY `product_variant_attribute_productVariantId_fkey`;

-- AddForeignKey
ALTER TABLE `product_attribute` ADD CONSTRAINT `product_attribute_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variant_attribute` ADD CONSTRAINT `product_variant_attribute_productVariantId_fkey` FOREIGN KEY (`productVariantId`) REFERENCES `product_variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_category` ADD CONSTRAINT `product_category_categoryHierarchyId_fkey` FOREIGN KEY (`categoryHierarchyId`) REFERENCES `category_hierarchy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tag` ADD CONSTRAINT `product_tag_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
