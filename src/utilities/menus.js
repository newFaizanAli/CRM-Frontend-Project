export const adminOptions = [
    {
      id: "suppliers",
      title: "Stock",
      icon: "inventory",
      option: [
        {
          id: "warehouse",
          title: "Warehouse",
          icon: "local_shipping",
          option: [
            // {
            //   id: "warehouse-add",
            //   title: "Add Warehouse",
            //   link: "/stock/warehouse/add",
            //   icon: "add",
            // },
            {
              id: "warehouse-list",
              title: "List Warehouse",
              link: "/stock/warehouse",
              icon: "list",
            },
            
          ],
        },
        {
          id: "category",
          title: "Category",
          icon: "format_list_bulleted",
          option: [
            { id: "category", title: "Category", link: "/stock/category", icon: "list" },
          ],
        },
        {
          id: "product",
          title: "Product",
          icon: "store",
          option: [
            // {
            //   id: "product-add",
            //   title: "Add Product",
            //   link: "/stock/product/add",
            //   icon: "add",
            // },
            {
              id: "product-list",
              title: "Products",
              link: "/stock/product",
              icon: "list",
            },
          ],
        },
      ],
    },

    {
      id: "buying",
      title: "Buying",
      icon: "shopping_cart", 
      option: [
        {
          id: "suppliers",
          title: "Suppliers",
          icon: "business", 
          option: [
            // {
            //   id: "supplier-add",
            //   title: "Add Supplier",
            //   link: "/buying/supplier/add",
            //   icon: "add", 
            // },
            {
              id: "supplier-list",
              title: "List Suppliers",
              link: "/buying/supplier",
              icon: "list", 
            },
          ],
        },
    
        {
          id: "purchases",
          title: "Purchase",
          icon: "shopping_bag", 
          option: [
            {
              id: "purchase-add",
              title: "Add Purchase",
              link: "/buying/purchase/add",
              icon: "add", 
            },
            {
              id: "purchase-list",
              title: "Purchases",
              link: "/buying/purchase",
              icon: "list", 
            },
          ],
        },
    
        
    
        {
          id: "purchase-confirm",
          title: "Purchase Confirmation",
          icon: "assignment_turned_in", 
          option: [
            {
              id: "purchase-confirmation-list",
              title: "Confirmation List",
              link: "/buying/purchase/confirm",
              icon: "checklist",
            },
          ],
        },
      ],
    },
    
    {
      id: "selling",
      title: "Selling",
      icon: "shopping_cart_checkout", 
      option: [

        {
          id: "customers",
          title: "Customers",
          icon: "groups", 
          option: [
            // {
            //   id: "cutomer-add",
            //   title: "Add Customer",
            //   link: "/selling/customer/add",
            //   icon: "add", 
            // },
            {
              id: "customer-list",
              title: "List Customer",
              link: "/selling/customer",
              icon: "list", 
            },
          ],
        },
    
        {
          id: "sales",
          title: "Sales",
          icon: "point_of_sale",
          option: [
            {
              id: "sales-add",
              title: "Add Sales",
              link: "/selling/sale/add",
              icon: "add", 
            },
            {
              id: "sales-list",
              title: "Sales",
              link: "/selling/sale",
              icon: "list", 
            },
          ],
        },
        
      ],
    },

    {
      id: "accounts",
      title: "Accounts",
      icon: "account_balance", 
      option: [
        {
          id: "transaction",
          title: "Transaction",
          icon: "sync_alt", 
          option: [
            {
              id: "transaction-add",
              title: "Add Transaction",
              link: "/transaction/add",
              icon: "add", 
            },
            {
              id: "transaction-list",
              title: "Transactions",
              link: "/transaction",
              icon: "list", 
            },
          ],
        },
      ],
    },
    

    {
      id: "help",
      title: "Help",
      icon: "help",
      link: "/help",
    },
  ];
  