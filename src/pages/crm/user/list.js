import React from "react";
import ListView from "../../../components/listview";
import UserBox from "../../../components/modelbox/user";

const Index = () => {

  return (
    <ListView
      title="User"
      apiEndpoint="/user"
      searchKey="email"
      modalComponent={UserBox}
      editRoute="/crm/user/update"
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "usertype", label: "Usertype" },
        
      ]}
    />
  );
};

export default Index;
