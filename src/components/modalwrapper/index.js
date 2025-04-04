import React from "react";
import { useModal } from "../../hooks/useModal";

const Index = ({ Comp, title, handleFetch, getList }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      
        <div className="flex justify-end">
          <button
            className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
            onClick={openModal}
          >
            + Add {title}
          </button>
        </div>
      
      {Comp && (
        <Comp
          title={title}
          isOpen={isModalOpen}
          onClose={closeModal}
          handleFetch={handleFetch}
          getList={getList}
        />
      )}
    </>
  );
};

export default Index;
