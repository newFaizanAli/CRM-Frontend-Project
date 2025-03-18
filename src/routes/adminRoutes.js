import { Route } from "react-router-dom";

// layout

import ProductLayout from "../layouts/admin/product";
import StockLayout from "../layouts/admin/stock";
import RootLayout from "../layouts/root";
import BuyingLayout from "../layouts/admin/buying";
import PurchaseLayout from "../layouts/admin/purchase";
import SupplierLayout from "../layouts/admin/supplier";
import SellingLayout from "../layouts/admin/selling";
import CustomerLayout from "../layouts/admin/customer";
import TransactionLayout from "../layouts/admin/transaction";

import CRMLayout from "../layouts/admin/crm";
import UserLayout from "../layouts/admin/crm/user";
import LeadLayout from "../layouts/admin/crm/lead";

// pages
import AdminDashboard from "../pages/dashboard/admin";
import WarehouseLayout from "../layouts/admin/stock";
// import AddWarehouse from "../pages/erp/stock/warehouse/add";
import WarehouseList from "../pages/erp/stock/warehouse/list";
import UpdateWarehouse from "../pages/erp/stock/warehouse/update";
import CategoryPage from "../pages/erp/stock/category";
import ProductList from "../pages/erp/stock/product/list";
// import AddProduct from "../pages/erp/stock/product/add";
import UpdateProduct from "../pages/erp/stock/product/update";
import PurchaseList from "../pages/erp/buying/purchase/list";
import AddPurchase from "../pages/erp/buying/purchase/add";
import UpdatePurchase from "../pages/erp/buying/purchase/update";
import ConfirmPurchase from "../pages/erp/buying/purchase/confirm";
import SupplierList from "../pages/erp/buying/supplier/list";
// import AddSupplier from "../pages/erp/buying/supplier/add";
import UpdateSupplier from "../pages/erp/buying/supplier/update";
import CustomerList from "../pages/erp/selling/customer/list";
// import AddCustomer from "../pages/erp/selling/customer/add";
import UpdateCustomer from "../pages/erp/selling/customer/update";
import SaleList from "../pages/erp/selling/sales/list";
import AddSale from "../pages/erp/selling/sales/add";
import UpdateSale from "../pages/erp/selling/sales/update";
import TransactionList from "../pages/erp/accounts/transaction/list";
import AddTransaction from "../pages/erp/accounts/transaction/add";
import UpdateTransaction from "../pages/erp/accounts/transaction/update";

import UpdateUser from "../pages/crm/user/update";
import UsersList from "../pages/crm/user/list";
import UpdateLead from "../pages/crm/leads/update";
import LeadsList from "../pages/crm/leads/list";

const adminRoutes = (
  <>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="stock" element={<StockLayout />}>
        <Route path="warehouse" element={<WarehouseLayout />}>
          <Route index element={<WarehouseList />} />
          <Route path="update" element={<UpdateWarehouse />} />
        </Route>
        <Route path="category" element={<CategoryPage />} />
        <Route path="product" element={<ProductLayout />}>
          <Route index element={<ProductList />} />
          <Route path="update" element={<UpdateProduct />} />
        </Route>
      </Route>
      {/* buying */}
      <Route path="buying" element={<BuyingLayout />}>
        <Route path="purchase" element={<PurchaseLayout />}>
          <Route index element={<PurchaseList />} />
          <Route path="add" element={<AddPurchase />} />
          <Route path="update" element={<UpdatePurchase />} />
          <Route path="confirm" element={<ConfirmPurchase />} />
        </Route>
        <Route path="supplier" element={<SupplierLayout />}>
          <Route index element={<SupplierList />} />
          <Route path="update" element={<UpdateSupplier />} />
        </Route>
      </Route>
      {/* selling */}
      <Route path="selling" element={<SellingLayout />}>
        <Route path="sale" element={<SellingLayout />}>
          <Route index element={<SaleList />} />
          <Route path="add" element={<AddSale />} />
          <Route path="update" element={<UpdateSale />} />
        </Route>
        <Route path="customer" element={<CustomerLayout />}>
          <Route index element={<CustomerList />} />
          <Route path="update" element={<UpdateCustomer />} />
        </Route>
      </Route>
      {/* transaction */}
      <Route path="transaction" element={<TransactionLayout />}>
        <Route index element={<TransactionList />} />
        <Route path="add" element={<AddTransaction />} />
        <Route path="update" element={<UpdateTransaction />} />
      </Route>

      {/* crm */}
      <Route path="crm" element={<CRMLayout />}>
        <Route path="user" element={<UserLayout />}>
          <Route index element={<UsersList />} />
          <Route path="update" element={<UpdateUser />} />
        </Route>
        <Route path="lead" element={<LeadLayout />}>
          <Route index element={<LeadsList />} />
          <Route path="update" element={<UpdateLead />} />
        </Route>
      </Route>
    </Route>
  </>
);

export default adminRoutes;
