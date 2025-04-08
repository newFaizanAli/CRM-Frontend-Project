export const Roles = {
  ADMIN: "admin",
  SUBADMIN: "subadmin",
  USER: "user",
};

export const RoutePermissions = {
  "/stock/dashboard": [Roles.ADMIN, Roles.SUBADMIN],
  "/stock/warehouse": [Roles.ADMIN, Roles.SUBADMIN],
  "/stock/warehouse/update": [Roles.ADMIN, Roles.SUBADMIN],
  "/stock/category": [Roles.ADMIN, Roles.SUBADMIN],
  "/stock/product": [Roles.ADMIN, Roles.SUBADMIN, Roles.USER],
  "/stock/product/update": [Roles.ADMIN, Roles.SUBADMIN, Roles.USER],

  "/buying/dashboard": [Roles.ADMIN, Roles.SUBADMIN],
  "/buying/supplier": [Roles.ADMIN, Roles.SUBADMIN],
  "/buying/supplier/update": [Roles.ADMIN, Roles.SUBADMIN],
  "/buying/purchase": [Roles.ADMIN, Roles.SUBADMIN],
  "/buying/purchase/add": [Roles.ADMIN, Roles.SUBADMIN],
  "/buying/purchase/update": [Roles.ADMIN, Roles.SUBADMIN],
  "/buying/purchase/confirm": [Roles.ADMIN],

  "/selling/dashboard": [Roles.ADMIN, Roles.SUBADMIN],
  "/selling/customer": [Roles.ADMIN, Roles.SUBADMIN],
  "/selling/customer/update": [Roles.ADMIN, Roles.SUBADMIN],
  "/selling/sale": [Roles.ADMIN, Roles.SUBADMIN],
  "/selling/sale/add": [Roles.ADMIN, Roles.SUBADMIN],
  "/selling/sale/update": [Roles.ADMIN, Roles.SUBADMIN],

  "/transaction/update": [Roles.ADMIN, Roles.SUBADMIN],
  "/transaction": [Roles.ADMIN, Roles.SUBADMIN],
  "/payable": [Roles.ADMIN, Roles.SUBADMIN],
  "/payable/purchase": [Roles.ADMIN, Roles.SUBADMIN],
  "/payable/purchase/invoice": [Roles.ADMIN, Roles.SUBADMIN],
  "/payable/list": [Roles.ADMIN, Roles.SUBADMIN],

  "/receivable": [Roles.ADMIN, Roles.SUBADMIN],
  "/receivable/sale": [Roles.ADMIN, Roles.SUBADMIN],
  "/receivable/sale/invoice": [Roles.ADMIN, Roles.SUBADMIN],
  "/receivable/list": [Roles.ADMIN, Roles.SUBADMIN],

  "/crm/user": [Roles.ADMIN],
  "/crm/user/update": [Roles.ADMIN],

  "/crm/lead": [Roles.ADMIN, Roles.SUBADMIN],
  "/crm/lead/update": [Roles.ADMIN],
  "/crm/deal": [Roles.ADMIN, Roles.SUBADMIN],
  "/crm/deal/update": [Roles.ADMIN, Roles.SUBADMIN],

  "/crm/project": [Roles.ADMIN, Roles.SUBADMIN],
  "/crm/project/update": [Roles.ADMIN, Roles.SUBADMIN],
  "/crm/project/task": [Roles.ADMIN, Roles.SUBADMIN, Roles.USER],
  "/crm/project/task/update": [Roles.ADMIN, Roles.SUBADMIN, Roles.USER],
  "/crm/project/interaction": [Roles.ADMIN, Roles.SUBADMIN],
  "/crm/project/interaction/update": [Roles.ADMIN, Roles.SUBADMIN],

  "/help": [Roles.ADMIN, Roles.SUBADMIN, Roles.USER],
  "/unauthorized": [Roles.ADMIN, Roles.SUBADMIN, Roles.USER],
  "/profile": [Roles.ADMIN, Roles.SUBADMIN, Roles.USER],
};
