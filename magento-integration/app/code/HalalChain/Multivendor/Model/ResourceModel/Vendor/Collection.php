<?php

namespace HalalChain\Multivendor\Model\ResourceModel\Vendor;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;
use HalalChain\Multivendor\Model\Vendor;
use HalalChain\Multivendor\Model\ResourceModel\Vendor as VendorResource;

class Collection extends AbstractCollection
{
    protected function _construct()
    {
        $this->_init(Vendor::class, VendorResource::class);
    }
}
