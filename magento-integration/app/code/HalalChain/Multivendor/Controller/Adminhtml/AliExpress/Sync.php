<?php

namespace HalalChain\Multivendor\Controller\Adminhtml\AliExpress;

use Magento\Backend\App\Action;
use Magento\Backend\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use HalalChain\Multivendor\Model\AliExpress\Api;
use Psr\Log\LoggerInterface;

class Sync extends Action
{
    protected $resultJsonFactory;
    protected $api;
    protected $logger;

    public function __construct(
        Context $context,
        JsonFactory $resultJsonFactory,
        Api $api,
        LoggerInterface $logger
    ) {
        parent::__construct($context);
        $this->resultJsonFactory = $resultJsonFactory;
        $this->api = $api;
        $this->logger = $logger;
    }

    public function execute()
    {
        $result = $this->resultJsonFactory->create();

        try {
            $keywords = $this->getRequest()->getParam('keywords', '');
            $limit = $this->getRequest()->getParam('limit', 20);

            $products = $this->api->fetchProducts($keywords, $limit);

            // Sync each product to Magento catalog
            $syncedCount = 0;
            foreach ($products as $product) {
                if ($this->api->syncProduct($product)) {
                    $syncedCount++;
                }
            }

            $this->logger->info("AliExpress sync completed: {$syncedCount} products synced");

            return $result->setData([
                'success' => true,
                'message' => "Sync completed successfully. {$syncedCount} products imported.",
                'synced' => $syncedCount
            ]);

        } catch (\Exception $e) {
            $this->logger->error('AliExpress sync failed: ' . $e->getMessage());
            return $result->setData([
                'success' => false,
                'message' => 'Sync failed: ' . $e->getMessage()
            ]);
        }
    }

    protected function _isAllowed()
    {
        return $this->_authorization->isAllowed('HalalChain_Multivendor::aliexpress');
    }
}
