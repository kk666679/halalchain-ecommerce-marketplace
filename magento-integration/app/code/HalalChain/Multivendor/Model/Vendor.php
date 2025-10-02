<?php

namespace HalalChain\Multivendor\Model;

use Magento\Framework\Model\AbstractModel;
use HalalChain\Multivendor\Model\ResourceModel\Vendor as VendorResource;

class Vendor extends AbstractModel
{
    protected function _construct()
    {
        $this->_init(VendorResource::class);
    }

    const STATUS_PENDING = 0;
    const STATUS_APPROVED = 1;
    const STATUS_REJECTED = 2;

    public function getAvailableStatuses()
    {
        return [
            self::STATUS_PENDING => __('Pending'),
            self::STATUS_APPROVED => __('Approved'),
            self::STATUS_REJECTED => __('Rejected'),
        ];
    }

    public function isApproved()
    {
        return $this->getStatus() == self::STATUS_APPROVED;
    }

    public function canSell()
    {
        return $this->isApproved();
    }
}
