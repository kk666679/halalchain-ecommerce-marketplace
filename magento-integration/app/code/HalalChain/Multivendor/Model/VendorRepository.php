<?php

namespace HalalChain\Multivendor\Model;

use HalalChain\Multivendor\Api\VendorRepositoryInterface;
use HalalChain\Multivendor\Api\Data\VendorInterface;
use HalalChain\Multivendor\Model\ResourceModel\Vendor as VendorResource;
use Magento\Framework\Exception\NoSuchEntityException;

class VendorRepository implements VendorRepositoryInterface
{
    protected $vendorResource;
    protected $vendorFactory;

    public function __construct(
        VendorResource $vendorResource,
        VendorFactory $vendorFactory
    ) {
        $this->vendorResource = $vendorResource;
        $this->vendorFactory = $vendorFactory;
    }

    public function save(VendorInterface $vendor)
    {
        $this->vendorResource->save($vendor);
        return $vendor;
    }

    public function getById($vendorId)
    {
        $vendor = $this->vendorFactory->create();
        $this->vendorResource->load($vendor, $vendorId);
        if (!$vendor->getId()) {
            throw new NoSuchEntityException(__('Vendor with id "%1" does not exist.', $vendorId));
        }
        return $vendor;
    }

    public function getByCustomerId($customerId)
    {
        $vendor = $this->vendorFactory->create();
        $this->vendorResource->load($vendor, $customerId, 'customer_id');
        return $vendor;
    }

    public function delete(VendorInterface $vendor)
    {
        $this->vendorResource->delete($vendor);
    }

    public function deleteById($vendorId)
    {
        $vendor = $this->getById($vendorId);
        $this->delete($vendor);
    }
}
