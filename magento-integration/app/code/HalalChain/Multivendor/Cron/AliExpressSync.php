<?php

namespace HalalChain\Multivendor\Cron;

use HalalChain\Multivendor\Model\AliExpress\Api;
use Psr\Log\LoggerInterface;

class AliExpressSync
{
    protected $api;
    protected $logger;

    public function __construct(
        Api $api,
        LoggerInterface $logger
    ) {
        $this->api = $api;
        $this->logger = $logger;
    }

    public function execute()
    {
        $this->logger->info('Starting scheduled AliExpress sync');

        try {
            // Fetch popular halal products
            $keywords = ['halal', 'organic', 'certified'];
            $totalSynced = 0;

            foreach ($keywords as $keyword) {
                $products = $this->api->fetchProducts($keyword, 10);
                foreach ($products as $product) {
                    if ($this->api->syncProduct($product)) {
                        $totalSynced++;
                    }
                }
            }

            $this->logger->info("Scheduled AliExpress sync completed: {$totalSynced} products synced");

        } catch (\Exception $e) {
            $this->logger->error('Scheduled AliExpress sync failed: ' . $e->getMessage());
        }
    }
}
