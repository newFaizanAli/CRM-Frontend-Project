export const adminOptions = [
  
  {
    id: "erp",
    title: "ERP",
    icon: "business",
    option: [
      {
        id: "stock",
        title: "Stock",
        icon: "inventory_2",
        option: [
          {
            id: "warehouse",
            title: "Warehouse",
            link: "/stock/warehouse",
            icon: "warehouse", 
          },
          {
            id: "category",
            title: "Category",
            link: "/stock/category",
            icon: "category",
          },
          {
            id: "product",
            title: "Product",
            link: "/stock/product",
            icon: "shopping_bag",
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
            link: "/buying/supplier",
            icon: "storefront",
          },
          {
            id: "purchase",
            title: "Purchase",
            link: "/buying/purchase",
            icon: "shopping_basket", 
          },
          {
            id: "purchase-confirm",
            title: "Purchase Confirm",
            link: "/buying/purchase/confirm",
            icon: "assignment_turned_in",
          },
        ],
      },
      {
        id: "selling",
        title: "Selling",
        icon: "sell", 
        option: [
          {
            id: "customers",
            title: "Customers",
            link: "/selling/customer",
            icon: "group", 
          },
          {
            id: "sales",
            title: "Sales",
            link: "/selling/sale",
            icon: "point_of_sale", 
          },
        ],
      },

      {
        id: "transaction",
        title: "Transaction",
        icon: "credit_card", 
        option: [
          {
            id: "add-transaction",
            title: "Add Transaction",
            link: "/transaction/add",
            icon: "add_shopping_cart", 
          },
          {
            id: "transaction",
            title: "Transactions",
            link: "/transaction",
            icon: "receipt_long",
          },
        ],
      }
      
    ],
  },

  {
    id: "crm",
    title: "CRM",
    icon: "business",
    option: [
      {
        id: "users",
        title: "Users",
        icon: "person",
        option: [
          {
            id: "users-list",
            title: "Users",
            link: "/crm/user",
            icon: "format_list_bulleted",
          },
        ],
      },

      {
        id: "leads",
        title: "Leads",
        icon: "person_search",
        option: [
          {
            id: "leads-list",
            title: "Leads",
            link: "/crm/lead",
            icon: "format_list_bulleted",
          },
        ],
      },

      {
        id: "opportunities",
        title: "Opportunities",
        icon: "trending_up",
        option: [
          {
            id: "deals",
            title: "Deals",
            link: "/crm/deal",
            icon: "playlist_add_check",
          },
        ],
      },

      {
        id: "tasks",
        title: "Tasks",
        icon: "task_alt",
        option: [
          {
            id: "projects",
            title: "Projects",
            link: "/crm/project",
            icon: "list",
          },
          {
            id: "tasks",
            title: "Tasks",
            link: "/crm/project/task",
            icon: "list",
          },
          {
            id: "interaction",
            title: "Interactions",
            link: "/crm/project/interaction",
            icon: "list",
          },
        ],
      },

      // {
      //   id: "reports",
      //   title: "Reports",
      //   icon: "bar_chart", 
      //   option: [
      //     {
      //       id: "reports",
      //       title: "Reports",
      //       link: "/crm/reports",
      //       icon: "insert_chart", 
      //     },
      //   ],
      // },
    ],
  },

  {
    id: "help",
    title: "Help",
    icon: "help",
    link: "/help",
  },
];
