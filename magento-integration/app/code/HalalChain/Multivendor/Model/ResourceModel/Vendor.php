<?php

namespace HalalChain\Multivendor\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

class Vendor extends AbstractDb
{
    protected function _construct()
    {
        $this->_init('halalchain_vendor', 'vendor_id');
    }
}
