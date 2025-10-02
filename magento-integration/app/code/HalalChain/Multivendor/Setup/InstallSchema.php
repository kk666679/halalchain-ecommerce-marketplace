<?php

namespace HalalChain\Multivendor\Setup;

use Magento\Framework\Setup\InstallSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\DB\Ddl\Table;

class InstallSchema implements InstallSchemaInterface
{
    public function install(SchemaSetupInterface $setup, ModuleContextInterface $context)
    {
        $installer = $setup;
        $installer->startSetup();

        // Create vendor table
        $table = $installer->getConnection()->newTable(
            $installer->getTable('halalchain_vendor')
        )->addColumn(
            'vendor_id',
            Table::TYPE_INTEGER,
            null,
            ['identity' => true, 'nullable' => false, 'primary' => true],
            'Vendor ID'
        )->addColumn(
            'customer_id',
            Table::TYPE_INTEGER,
            null,
            ['nullable' => false],
            'Customer ID'
        )->addColumn(
            'store_name',
            Table::TYPE_TEXT,
            255,
            ['nullable' => false],
            'Store Name'
        )->addColumn(
            'description',
            Table::TYPE_TEXT,
            null,
            ['nullable' => true],
            'Description'
        )->addColumn(
            'status',
            Table::TYPE_SMALLINT,
            null,
            ['nullable' => false, 'default' => 0],
            'Status (0=Pending, 1=Approved, 2=Rejected)'
        )->addColumn(
            'commission_rate',
            Table::TYPE_DECIMAL,
            '5,2',
            ['nullable' => false, 'default' => 10.00],
            'Commission Rate (%)'
        )->addColumn(
            'created_at',
            Table::TYPE_TIMESTAMP,
            null,
            ['nullable' => false, 'default' => Table::TIMESTAMP_INIT],
            'Created At'
        )->addColumn(
            'updated_at',
            Table::TYPE_TIMESTAMP,
            null,
            ['nullable' => false, 'default' => Table::TIMESTAMP_INIT_UPDATE],
            'Updated At'
        )->addIndex(
            $installer->getIdxName('halalchain_vendor', ['customer_id']),
            ['customer_id']
        )->addForeignKey(
            $installer->getFkName('halalchain_vendor', 'customer_id', 'customer_entity', 'entity_id'),
            'customer_id',
            $installer->getTable('customer_entity'),
            'entity_id',
            Table::ACTION_CASCADE
        );

        $installer->getConnection()->createTable($table);

        // Create vendor product table for additional vendor-specific product data
        $vendorProductTable = $installer->getConnection()->newTable(
            $installer->getTable('halalchain_vendor_product')
        )->addColumn(
            'vendor_product_id',
            Table::TYPE_INTEGER,
            null,
            ['identity' => true, 'nullable' => false, 'primary' => true],
            'Vendor Product ID'
        )->addColumn(
            'vendor_id',
            Table::TYPE_INTEGER,
            null,
            ['nullable' => false],
            'Vendor ID'
        )->addColumn(
            'product_id',
            Table::TYPE_INTEGER,
            null,
            ['nullable' => false],
            'Product ID'
        )->addColumn(
            'price',
            Table::TYPE_DECIMAL,
            '12,4',
            ['nullable' => false],
            'Vendor Price'
        )->addColumn(
            'qty',
            Table::TYPE_DECIMAL,
            '12,4',
            ['nullable' => false],
            'Quantity'
        )->addColumn(
            'halal_certified',
            Table::TYPE_SMALLINT,
            null,
            ['nullable' => false, 'default' => 0],
            'Halal Certified (0=No, 1=Yes)'
        )->addColumn(
            'certification_number',
            Table::TYPE_TEXT,
            255,
            ['nullable' => true],
            'Halal Certification Number'
        )->addColumn(
            'created_at',
            Table::TYPE_TIMESTAMP,
            null,
            ['nullable' => false, 'default' => Table::TIMESTAMP_INIT],
            'Created At'
        )->addIndex(
            $installer->getIdxName('halalchain_vendor_product', ['vendor_id']),
            ['vendor_id']
        )->addIndex(
            $installer->getIdxName('halalchain_vendor_product', ['product_id']),
            ['product_id']
        )->addForeignKey(
            $installer->getFkName('halalchain_vendor_product', 'vendor_id', 'halalchain_vendor', 'vendor_id'),
            'vendor_id',
            $installer->getTable('halalchain_vendor'),
            'vendor_id',
            Table::ACTION_CASCADE
        )->addForeignKey(
            $installer->getFkName('halalchain_vendor_product', 'product_id', 'catalog_product_entity', 'entity_id'),
            'product_id',
            $installer->getTable('catalog_product_entity'),
            'entity_id',
            Table::ACTION_CASCADE
        );

        $installer->getConnection()->createTable($vendorProductTable);

        $installer->endSetup();
    }
}
