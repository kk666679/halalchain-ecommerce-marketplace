<?php

namespace HalalChain\Multivendor\Api;

use Magento\Framework\Exception\NoSuchEntityException;
use HalalChain\Multivendor\Api\Data\VendorInterface;

interface VendorRepositoryInterface
{
    public function save(VendorInterface $vendor);
    public function getById($vendorId);
    public function getByCustomerId($customerId);
    public function delete(VendorInterface $vendor);
    public function deleteById($vendorId);
}
