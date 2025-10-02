<?php

namespace HalalChain\Multivendor\Block;

use Magento\Framework\View\Element\Template;
use Magento\Customer\Model\Session;
use HalalChain\Multivendor\Api\VendorRepositoryInterface;

class VendorInfo extends Template
{
    protected $customerSession;
    protected $vendorRepository;

    public function __construct(
        Template\Context $context,
        Session $customerSession,
        VendorRepositoryInterface $vendorRepository,
        array $data = []
    ) {
        $this->customerSession = $customerSession;
        $this->vendorRepository = $vendorRepository;
        parent::__construct($context, $data);
    }

    public function getCurrentVendor()
    {
        if (!$this->customerSession->isLoggedIn()) {
            return null;
        }

        $customerId = $this->customerSession->getCustomerId();
        return $this->vendorRepository->getByCustomerId($customerId);
    }

    public function isVendor()
    {
        $vendor = $this->getCurrentVendor();
        return $vendor && $vendor->getId();
    }

    public function canSell()
    {
        $vendor = $this->getCurrentVendor();
        return $vendor && $vendor->canSell();
    }
}
