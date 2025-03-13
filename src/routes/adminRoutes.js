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

// pages
import AdminDashboard from "../pages/dashboard/admin";
import WarehouseLayout from "../layouts/admin/stock";
import AddWarehouse from "../pages/warehouse/add";
import WarehouseList from "../pages/warehouse/list";
import UpdateWarehouse from "../pages/warehouse/update";
import CategoryPage from "../pages/category";
import ProductList from "../pages/product/list";
import AddProduct from "../pages/product/add";
import UpdateProduct from "../pages/product/update";
import PurchaseList from "../pages/purchase/list";
import AddPurchase from "../pages/purchase/add";
import UpdatePurchase from "../pages/purchase/update";
import ConfirmPurchase from "../pages/purchase/confirm";
import SupplierList from "../pages/supplier/list";
import AddSupplier from "../pages/supplier/add";
import UpdateSupplier from "../pages/supplier/update";
import CustomerList from "../pages/customer/list";
import AddCustomer from "../pages/customer/add";
import UpdateCustomer from "../pages/customer/update";
import SaleList from "../pages/sales/list";
import AddSale from "../pages/sales/add";
import UpdateSale from "../pages/sales/update";
import TransactionList from "../pages/transaction/list"
import AddTransaction from "../pages/transaction/add"
import UpdateTransaction from "../pages/transaction/update"

const adminRoutes = (
  <>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="stock" element={<StockLayout />}>
        <Route path="warehouse" element={<WarehouseLayout />}>
          <Route index element={<WarehouseList />} />
          <Route path="add" element={<AddWarehouse />} />
          <Route path="update" element={<UpdateWarehouse />} />
        </Route>
        <Route path="category" element={<CategoryPage />} />
        <Route path="product" element={<ProductLayout />}>
          <Route index element={<ProductList />} />
          <Route path="add" element={<AddProduct />} />
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
          <Route path="add" element={<AddSupplier />} />
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
          <Route path="add" element={<AddCustomer />} />
          <Route path="update" element={<UpdateCustomer />} />
        </Route>
      </Route>
      {/* transaction */}
      <Route path="transaction" element={<TransactionLayout />}>
        <Route index element={<TransactionList />} />
        <Route path="add" element={<AddTransaction />} />
        <Route path="update" element={<UpdateTransaction />} />
      </Route>
    </Route>
  </>
);

export default adminRoutes;
