<?php

namespace HalalChain\Multivendor\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;

class Data extends AbstractHelper
{
    public function __construct(Context $context)
    {
        parent::__construct($context);
    }

    public function isProductHalal($product)
    {
        // Logic to check halal certification
        // For now, check if halal_certified field is set
        return $product->getData('halal_certified') == 1;
    }

    public function getHalalBadgeText()
    {
        return __('Halal Certified');
    }

    public function validateHalalCertification($data)
    {
        // Validate halal certification data
        if (empty($data['certification_body'])) {
            return false;
        }
        return true;
    }
}
