<?php

namespace HalalChain\Multivendor\Api\Data;

interface VendorInterface
{
    const VENDOR_ID = 'vendor_id';
    const CUSTOMER_ID = 'customer_id';
    const STORE_NAME = 'store_name';
    const DESCRIPTION = 'description';
    const STATUS = 'status';
    const COMMISSION_RATE = 'commission_rate';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function getVendorId();
    public function getCustomerId();
    public function getStoreName();
    public function getDescription();
    public function getStatus();
    public function getCommissionRate();
    public function getCreatedAt();
    public function getUpdatedAt();

    public function setVendorId($vendorId);
    public function setCustomerId($customerId);
    public function setStoreName($storeName);
    public function setDescription($description);
    public function setStatus($status);
    public function setCommissionRate($commissionRate);
    public function setCreatedAt($createdAt);
    public function setUpdatedAt($updatedAt);
}
