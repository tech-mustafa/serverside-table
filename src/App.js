import React from "react";
import { DynamicTable } from "./components/DynamicTable";
// import list from "./utils/TempData.json";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    dataIndexForSort: "name",
    fieldType: "text",
    sorter: true,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    dataIndexForSort: "posbrandtId",
    fieldType: "text",
    sorter: true,
  },
  {
    title: "Segment",
    dataIndex: "segment",
    dataIndexForSort: "segment",
    fieldType: "text",
    sorter: true,
  },
  {
    title: "Regular Price",
    dataIndex: "regular_price",
    dataIndexForSort: "regular_price",
    fieldType: "text",
    sorter: true,
  },
  {
    title: "Price",
    dataIndex: "price",
    dataIndexForSort: "price",
    fieldType: "text",
    sorter: true,
  },
];

function App() {
  return (
    <div className="App">
      <DynamicTable
        columns={columns}
        // list={list.data} //or
        apiEndPoint={`https://demo-be.profitley.com/api/v1/e-commerce/shop/products-list`}
        headers={{
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTVhNjg0ZWQxMzI1NGUzYjA3M2ZlZmJkNDkxN2Y5MjUwNGFmYmM3NzdkZDI0ZDJlYjkzNzIxMDRiZDAzODliZjUyZGM1ZTFhZmYwOTg4MzMiLCJpYXQiOjE2MjU1Njc3MzcuNDA1NzksIm5iZiI6MTYyNTU2NzczNy40MDU3OTIsImV4cCI6MTY1NzEwMzczNy4zOTg5MzgsInN1YiI6Ijk0Iiwic2NvcGVzIjpbXX0.rI0A9FfNWb0L7DgWGpKg0kUCOtFOEB3dhST4p1cfLkLI2wGZ26IQdjt9z_y4C-x3DGLuRmg3vHn79sp9IMMSz5OZkMc2NX55yDjIJBcAMIbXFWuc4649x5ZHXgOPl9IMb4MQbxDLu-VK_Ila345J_XL4leEOxJqFJC6JYSqRwG4NMae8PbTqOrRi1aqCRbt02ohh3unWybIjUWlpZSU2pMP6w5oUP-DQMA8ZBCAHoKoIKLG3m5OEVZcRa51_cdSdSSnDOVU1JxicunLnj6I3Or540K7-5jfWkCt5c11XXmvs5p1QYtyI2GH7RiS2KJR_w9rn6njOSDfzzEK_stFC41zbbMiFp67DXTF59oQTEBd4sOrxI2Y52AgSFzRVg8Pdn6Ls-bRs8DWATCzNQH-19NdB0vylohK4asWT4RhFarm1ZDXg4FH0mu3rAaBBvPtqul8oMMscB_qI5SWOi5Z2Jf1cEhk6riEJOwPIpiWKHsocIul4KYxsHslvEr7iKaDY26auZALeevbKSQTdn8T54_nw20QSiDVi4MJzo2goaB3Cvd24Z_8HWgCHdrMCiKqs36HBelBSdmmmhz5hHpx2iMn9g2XLPJkI42YIHtthhU7HeGeAREgWoSxnUhK_n38-UiWCdhrwBQB87TVWNWpAIL6zO_yTNL9BgrWffJR3o_k",
        }}
        filter={true} //or false
        pagination={true} // or false
        serverFilter={true} //or false
        serverPagination={true} // or false
      />
    </div>
  );
}

export default App;
