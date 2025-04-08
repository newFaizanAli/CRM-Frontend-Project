import React from "react";
import Box from "../../index";

const index = ({
  isOpen,
  onClose,
  title,
  warehouses,
  products,
  handleSet,
  filterValue,
  setFilterValue,
}) => {
  if (!isOpen) return null;

  const onSubmit = () => {
    handleSet();
    onClose();
  };

  // FINANCIALYEARS

  return (
    <Box title={title} onClose={onClose}>
      <div className="p-2">
        {/* warehouse */}
        {warehouses && (
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black">
              Warehouse
            </label>
            <div className="warehouse">
              <select
                name="warehouse"
                className="w-full border border-stroke rounded bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none"
                onChange={(e) =>
                  setFilterValue({
                    ...filterValue,
                    [e.target.name]: e.target.value,
                  })
                }
                value={filterValue["warehouse"]}
              >
                <option value={null}>Select warehouse</option>

                {warehouses.map((warehouse, idx) => (
                  <option
                    key={idx}
                    value={warehouse._id}
                  >{`${warehouse.area}, (${warehouse.city})`}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        {/* products */}
        {products && (
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black">
              Product
            </label>
            <div className="product">
              <select
                name="product"
                className="w-full border border-stroke rounded bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none"
                onChange={(e) =>
                  setFilterValue({
                    ...filterValue,
                    [e.target.name]: e.target.value,
                  })
                }
                value={filterValue["product"]}
              >
                <option value={null}>Select product</option>

                {products.map((product, idx) => (
                  <option
                    key={idx}
                    value={product._id}
                  >{`${product.productName}, (${product.sku})`}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end p-2">
        <button
          className="px-2 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          onClick={onSubmit}
        >
          SET
        </button>
      </div>
    </Box>
  );
};

export default index;
