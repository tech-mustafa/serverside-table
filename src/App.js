import React from "react";
import { DynamicTable } from "./components/DynamicTable";
import list from "./utils/TempData.json";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    dataIndexForSort: "id",
    fieldType: "number",
    sorter: true,
  },
  {
    title: "User Name",
    dataIndex: "name",
    dataIndexForSort: "name",
    fieldType: "text",
    sorter: true,
  },
  {
    title: "Post ID",
    dataIndex: "postId",
    dataIndexForSort: "postId",
    fieldType: "number",
    sorter: true,
  },
  {
    title: "E-Mail",
    dataIndex: "email",
    dataIndexForSort: "email",
    fieldType: "text",
    sorter: true,
  },
  {
    title: "Comment",
    dataIndex: "body",
    dataIndexForSort: "body",
    fieldType: "text",
    sorter: true,
  },
];

function App() {
  return (
    <div className="App">
      <DynamicTable
        columns={columns}
        list={list.data} //or
        apiEndpoint={""}
        headers={{}}
        filter={true} //or false
        pagination={true} // or false
        serverFilter={true} //or false
        serverPagination={true} // or false
      />
    </div>
  );
}

export default App;
