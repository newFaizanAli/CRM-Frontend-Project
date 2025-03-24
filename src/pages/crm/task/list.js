import React from "react";
import ListView from "../../../components/listview";
import TaskBox from "../../../components/modelbox/crm/task";

const Index = () => {
  return (
    <ListView
      title="Tasks"
      apiEndpoint="/task"
      searchKey="code"
      modalComponent={TaskBox}
      editRoute="/crm/project/task/update"
      columns={[

        { key: "code", label: "Code" },
        { key: "title", label: "Title" },
        {
          key: "project",
          label: "Project",
          render: (project) => `${project?.name} (${project?.code})` || "N/A",
        },
        {
          key: "assignedTo",
          label: "Assigned",
          render: (assignedTo) => `${assignedTo?.name}` || "N/A",
        },
        { key: "status", label: "Status" },
        { key: "priority", label: "Priority" },
        { key: "taskType", label: "Type" },
      ]}
    />
  );
};

export default Index;
