import React from 'react';
import Header from './HeaderMainStore';
import SellerDashboardSidebar from './SellerDashboardSidebar';
import ProductManagement from './ProductManagement';

export default function SellerDashboard() {
  return (
    <div>
    <Header />
    <div className="flex flex-row">
        <div className="w-[20%]">
            <SellerDashboardSidebar />
        </div>
        <div className="w-[80%] mt-9">
            <ProductManagement />
        </div>
    </div>
</div>

    )
}
