import React from 'react'
import StickyCard from "../../../../../components/dasboard/card/smallcard";

const index = ({
    products,
    lowStockProducts,
    warehouses
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StickyCard title={"TOTAL PRODUCTS"} value={products || 0} />
        <StickyCard
          title={"LOW STOCK PRODUCTS"}
          value={lowStockProducts}
        />
        <StickyCard title={"TOTAL WAREHOUSES"} value={warehouses} />
      </div>
  )
}

export default index
