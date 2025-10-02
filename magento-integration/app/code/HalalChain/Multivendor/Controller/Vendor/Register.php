<?php

namespace HalalChain\Multivendor\Controller\Vendor;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Customer\Model\Session;
use HalalChain\Multivendor\Model\VendorFactory;
use Magento\Framework\Message\ManagerInterface;

class Register extends Action
{
    protected $resultJsonFactory;
    protected $customerSession;
    protected $vendorFactory;
    protected $messageManager;

    public function __construct(
        Context $context,
        JsonFactory $resultJsonFactory,
        Session $customerSession,
        VendorFactory $vendorFactory,
        ManagerInterface $messageManager
    ) {
        $this->resultJsonFactory = $resultJsonFactory;
        $this->customerSession = $customerSession;
        $this->vendorFactory = $vendorFactory;
        $this->messageManager = $messageManager;
        parent::__construct($context);
    }

    public function execute()
    {
        $result = $this->resultJsonFactory->create();
        $data = $this->getRequest()->getPostValue();

        if (!$this->customerSession->isLoggedIn()) {
            return $result->setData(['success' => false, 'message' => 'Please login first']);
        }

        $customerId = $this->customerSession->getCustomerId();

        // Check if already a vendor
        $existingVendor = $this->vendorFactory->create()->getCollection()
            ->addFieldToFilter('customer_id', $customerId)
            ->getFirstItem();

        if ($existingVendor->getId()) {
            return $result->setData(['success' => false, 'message' => 'Already registered as vendor']);
        }

        try {
            $vendor = $this->vendorFactory->create();
            $vendor->setCustomerId($customerId);
            $vendor->setStoreName($data['store_name']);
            $vendor->setDescription($data['description'] ?? '');
            $vendor->setStatus(\HalalChain\Multivendor\Model\Vendor::STATUS_PENDING);
            $vendor->setCommissionRate(10.00); // Default
            $vendor->save();

            $this->messageManager->addSuccessMessage('Vendor registration submitted for approval');

            return $result->setData(['success' => true, 'message' => 'Registration submitted']);
        } catch (\Exception $e) {
            return $result->setData(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
