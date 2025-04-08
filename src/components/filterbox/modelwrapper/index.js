import React from "react";
import { useModal } from "../../../hooks/useModal";
import { CiFilter } from "../../icons";

const Index = ({ Comp, title, ...rest }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex justify-end">
        <button
          className="text-sm border border-gray-300 px-1 bg-gray-200 rounded-md hover:bg-gray-300 duration-300"
          onClick={openModal}
        >
          <CiFilter size={20} />
        </button>
      </div>

      {Comp && (
        <Comp
          title={title}
          isOpen={isModalOpen}
          onClose={closeModal}
          {...rest}
        />
      )}
    </>
  );
};

export default Index;
