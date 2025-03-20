import React, { useEffect, useState } from "react";
import FormikError from "../../../text/FormikError";
import {
  TASKSTATUS,
  TASKPRIORITY,
  TASKTYPES,
} from "../../../../utilities/const";

const Index = ({ formik, isUpdate, handleFetch }) => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    const result = await handleFetch("GET", "/newtask");
    if (result?.users) {
      setUsers(result.users);
    }
    if (result?.projects) {
      setProjects(result.projects);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* title and  description*/}
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="title"
          >
            Title
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"title"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="description"
          >
            Description
          </label>
          <div className="relative">
            <textarea
              rows={4}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="text"
              name="description"
              id="description"
              placeholder="Enter description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"description"} />
          </div>
        </div>
      </div>

      {/* project & priority */}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="project"
          >
            Project
          </label>
          <div className="relative">
            <select
              name="project"
              id="project"
              value={formik.values.project}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select project</option>
              {projects?.map((e, index) => (
                <option key={index} value={e._id}>
                  {`${e.name} (${e.code})`}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"project"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="priority"
          >
            Priority
          </label>
          <div className="relative">
            <select
              name="priority"
              id="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select priority</option>
              {TASKPRIORITY?.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.type}
                </option>
              ))}
            </select>

            <FormikError formik={formik} fieldName={"priority"} />
          </div>
        </div>
      </div>

      {/* status and assigned */}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="assignedTo"
          >
            Assigned to
          </label>
          <div className="relative">
            <select
              name="assignedTo"
              id="assignedTo"
              value={formik.values.assignedTo}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select user</option>
              {users?.map((e, index) => (
                <option key={index} value={e._id}>
                  {e.name}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"assignedTo"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="status"
          >
            Status
          </label>
          <div className="relative">
            <select
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              {/* <option value="">select status</option> */}
              {TASKSTATUS?.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.type}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"status"} />
          </div>
        </div>
      </div>

      {/* due date & tasktype */}

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="taskType"
          >
            Task type
          </label>
          <div className="relative">
            <select
              name="taskType"
              id="taskType"
              value={formik.values.taskType}
              onChange={formik.handleChange}
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
            >
              <option value="">select type</option>
              {TASKTYPES?.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.type}
                </option>
              ))}
            </select>
            <FormikError formik={formik} fieldName={"taskType"} />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="dueDate"
          >
            Due date
          </label>
          <div className="relative">
            <input
              className="w-full border border-stroke rounded bg-transparent py-3 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none"
              type="date"
              name="dueDate"
              id="dueDate"
              placeholder="select due date"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
            />
            <FormikError formik={formik} fieldName={"dueDate"} />
          </div>
        </div>
      </div>

      {/* submit button */}

      <div className="flex justify-end gap-4.5 mt-4">
        <button
          className="flex justify-center rounded bg-gray-800 py-2 px-6 font-medium text-white hover:bg-opacity-90"
          type="submit"
        >
          {isUpdate ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Index;
