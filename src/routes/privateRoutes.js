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
import PaybleLayout from "../layouts/admin/payble";
import ReceivableLayout from "../layouts/admin/receivable"
import CRMLayout from "../layouts/admin/crm";
import UserLayout from "../layouts/admin/crm/user";
import LeadLayout from "../layouts/admin/crm/lead";
import DealLayout from "../layouts/admin/crm/deal";
import ProjectLayout from "../layouts/admin/crm/project";

// Dashboard

import StockDashboard from "../pages/dashboard/erp/stock";
import BuyingDashboard from "../pages/dashboard/erp/buying";
import SellingDashboard from "../pages/dashboard/erp/selling";

// pages

import AdminDashboard from "../pages/dashboard/admin";
import WarehouseLayout from "../layouts/admin/stock";
import WarehouseList from "../pages/erp/stock/warehouse/list";
import UpdateWarehouse from "../pages/erp/stock/warehouse/update";
import CategoryPage from "../pages/erp/stock/category";
import ProductList from "../pages/erp/stock/product/list";
import UpdateProduct from "../pages/erp/stock/product/update";
import PurchaseList from "../pages/erp/buying/purchase/list";
import AddPurchase from "../pages/erp/buying/purchase/add";
import UpdatePurchase from "../pages/erp/buying/purchase/update";
import ConfirmPurchase from "../pages/erp/buying/purchase/confirm";
import SupplierList from "../pages/erp/buying/supplier/list";
import UpdateSupplier from "../pages/erp/buying/supplier/update";
import CustomerList from "../pages/erp/selling/customer/list";
import UpdateCustomer from "../pages/erp/selling/customer/update";
import SaleList from "../pages/erp/selling/sales/list";
import AddSale from "../pages/erp/selling/sales/add";
import UpdateSale from "../pages/erp/selling/sales/update";
import TransactionList from "../pages/erp/accounts/transaction/list";
import UpdateTransaction from "../pages/erp/accounts/transaction/update";

// Payable

import PaybleTransaction from "../pages/erp/accounts/payable";
import PaybleList from "../pages/erp/accounts/payable/list";
import PayblePurchases from "../pages/erp/accounts/payable/purchase/list";
import PurchaseInvoice from "../pages/erp/accounts/payable/purchase/invoice";

import ReceivableTransaction from "../pages/erp/accounts/receivable";
import ReceivableList from "../pages/erp/accounts/receivable/list";
import ReceivableSales from "../pages/erp/accounts/receivable/sales/list";
import ReceivableInvoice from "../pages/erp/accounts/receivable/sales/invoice";

import UpdateUser from "../pages/crm/user/update";
import UsersList from "../pages/crm/user/list";
import UpdateLead from "../pages/crm/leads/update";
import LeadsList from "../pages/crm/leads/list";
import UpdateDeal from "../pages/crm/deals/update";
import DealList from "../pages/crm/deals/list";

import UpdateProject from "../pages/crm/projects/update";
import ProjectList from "../pages/crm/projects/list";
import UpdateTask from "../pages/crm/task/update";
import TaskList from "../pages/crm/task/list";
import UpdateInteraction from "../pages/crm/interaction/update";
import InteractionList from "../pages/crm/interaction/list";

import UserProfile from "../pages/authentication/profile";

import PageNotFound from "../pages/other/PageNotFound";
import Unauthorized from "../pages/other/unauthorized";

const adminRoutes = (
  <>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<AdminDashboard />} />
      {/* stock */}
      <Route path="stock" element={<StockLayout />}>
        <Route path="dashboard" element={<StockDashboard />} />
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
        <Route path="dashboard" element={<BuyingDashboard />} />
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
        <Route path="dashboard" element={<SellingDashboard />} />
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
        <Route path="update" element={<UpdateTransaction />} />
      </Route>
      {/* payables */}
      <Route path="payable" element={<PaybleLayout />}>
        <Route index element={<PaybleTransaction />} />
        <Route path="list" element={<PaybleList />} />
        <Route path="purchase" element={<PayblePurchases />} />
        <Route path="purchase/invoice" element={<PurchaseInvoice />} />
      </Route>
      {/* receivable */}
      <Route path="receivable" element={<ReceivableLayout />}>
        <Route index element={<ReceivableTransaction />} />
        <Route path="list" element={<ReceivableList />} />
        <Route path="sale" element={<ReceivableSales />} />
        <Route path="sale/invoice" element={<ReceivableInvoice />} />
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
        <Route path="deal" element={<DealLayout />}>
          <Route index element={<DealList />} />
          <Route path="update" element={<UpdateDeal />} />
        </Route>
        <Route path="project" element={<ProjectLayout />}>
          <Route index element={<ProjectList />} />
          <Route path="update" element={<UpdateProject />} />
          <Route path="task" element={<TaskList />} />
          <Route path="task/update" element={<UpdateTask />} />
          <Route path="interaction" element={<InteractionList />} />
          <Route path="interaction/update" element={<UpdateInteraction />} />
        </Route>
      </Route>
      {/* profile */}
      <Route path="profile" element={<UserProfile />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<PageNotFound />} />;
    </Route>
  </>
);

export default adminRoutes;
