import React from "react";
import Box from "../../index";

const index = ({
  isOpen,
  onClose,
  title,
  suppliers,
  purStatus,
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
        {/* supplier */}
        {suppliers && (
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black">
              Supplier
            </label>
            <div className="supplier">
              <select
                name="supplier"
                className="w-full border border-stroke rounded bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none"
                onChange={(e) =>
                  setFilterValue({
                    ...filterValue,
                    [e.target.name]: e.target.value,
                  })
                }
                value={filterValue["supplier"]}
              >
                <option value={null}>Select Supplier</option>

                {suppliers.map((supplier, idx) => (
                  <option
                    key={idx}
                    value={supplier._id}
                  >{`${supplier.name} (${supplier.code})`}</option>
                ))}

                
              </select>
            </div>
          </div>
        )}
        {/* financial year */}
        <h3 className="text-md font-semibold py-2">Financial Date</h3>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black">
            Start Date
          </label>
          <div className="startDate">
            <input
              name="startDate"
              type="date"
              value={filterValue['startDate']}
              onChange={(e) => setFilterValue({...filterValue, [e.target.name] : e.target.value})}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black">
            End Date
          </label>
          <div className="endDate">
            <input
              name="endDate"
              type="date"
              value={filterValue['endDate']}
              onChange={(e) => setFilterValue({...filterValue, [e.target.name] : e.target.value})}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            />
          </div>
          {purStatus && (
          <div className="w-full">
            <label className="mb-3 block text-sm font-medium text-black">
              Status
            </label>
            <div className="purStatus">
              <select
                name="purStatus"
                className="w-full border border-stroke rounded bg-transparent py-2 px-5 text-black outline-none focus:border-primary focus-visible:shadow-none"
                onChange={(e) =>
                  setFilterValue({
                    ...filterValue,
                    [e.target.name]: e.target.value,
                  })
                }
                value={filterValue["purStatus"]}
              >
                <option value={null}>Select status</option>
                <option value={'Pending'}>To Recieve</option>
                <option value={'toBill'}>To Bill</option>
                <option value={'toRecBill'}>To Recieve and Bill</option>
                <option value={'Completed'}>Completed</option>


                

                
              </select>
            </div>
          </div>
        )}
        </div>
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
