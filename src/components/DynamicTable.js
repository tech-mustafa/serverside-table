import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, Drawer, Table, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DynamicForm } from "./DynamicForm";
import action from "../store/Actions";
import TableSorter from "./table_components/TableSorter";
import TableFilter from "./table_components/TableFilter";
import DrawerFields from "./table_components/DrawerFields";
import TableColumns from "./table_components/TableColumns";

export const DynamicTable = (props) => {
  const [visible, setVisible] = useState(false); //Drawer Visibility
  const [listData, setListData] = useState([]); //Filtered list data
  const [columnsData, setColumnsData] = useState([]); //Column Data with Sorter Function
  const [currPage, setcurrPage] = useState(1); //Pagination - Current Page
  const [pageSize, setpageSize] = useState(25); //Pagination - No. of rows per Page
  const [total, settotal] = useState((props.list && props.list.length) || 25); //Pagination - Toatal no. of rows in List
  const [fields, setFields] = useState(); //Column Fields to be passed to DynamicForm for Drawer form
  const [filterStr, setFilterStr] = useState(""); //String carring field and value to be passed in API call for Filtering
  const [sortStr, setSortStr] = useState(""); //String carring '+'/'-' and field name to be passed in API call for Sortering
  const dispatch = useDispatch();

  //Action Dispatch
  useEffect(() => {
    props.apiEndPoint !== `` &&
      dispatch(action.getList(props.apiEndPoint, props.headers));
  }, [dispatch, props.apiEndPoint, props.headers]);

  //Fetching data from store
  const list = useSelector((state) => state.getList.list) || props.list;
  const meta = useSelector((state) => state.getList.meta);
  const loading = useSelector((state) => state.getList.loading);

  const showDrawer = () => {
    setVisible(true); //to open drawer
  };
  const onClose = () => {
    setVisible(false); //to close drawer
  };

  useEffect(() => {
    //Creating fields for drawer to be passed to Dynamic Component
    setFields(DrawerFields(props.columns));
    //Updating Columns Sorter if sorter is true to State
    setColumnsData(TableColumns(props.columns, props.sorter));
  }, [props.columns, props.sorter]);

  //Setting up ListData with Fetch List from Server if props.list is not passed/empty
  useEffect(() => {
    props.list ? setListData(props.list) : setListData(list);
  }, [list, props.list]);

  //Server-Pagination Setup to State
  useEffect(() => {
    if (props.serverPagination && meta.pagination) {
      //Setting up Pagination with meta if fetched from server
      setcurrPage(meta.pagination.current_page);
      setpageSize(meta.pagination.per_page);
      settotal(meta.pagination.total);
    } else if (list) {
      //Setting total count if meta is null or props.serverPagination is false
      settotal(list.length);
    } else {
      //default if list & meta is null
      settotal(0);
    }
  }, [props.serverPagination, meta, list]);

  //Handles Filter/Search

  const onFilter = (values) => {
    let filteredData = [...list];
    let returnedValue = TableFilter(props.serverFilter, values, filteredData);
    props.serverFilter && dispatch(
      action.getList(
        props.apiEndPoint + "?page=1" + sortStr + returnedValue,
        props.headers
      )
    )
      ? setFilterStr(returnedValue)
      : setListData(returnedValue);
    onClose();
  };

  //On Change in Table of Pagination and Sorter
  const onTableChange = (pagination, filter, sorter) => {
    //Setting up table change to state
    setcurrPage(pagination.current);
    setpageSize(pagination.pageSize);
    settotal(pagination.total);
    //Setup sorter string if props.serverSorter is true
    var sort = "";
    if (sorter && props.serverSorter) {
      sort = TableSorter(sorter, sort);
    }
    setSortStr(sort);
    if (filterStr !== "") {
      //Filter Check
      dispatch(
        action.getList(
          props.apiEndPoint +
            "?page=" +
            (pagination.current || 1) +
            sort +
            filterStr,
          props.headers
        )
      );
    } else if (sort !== "") {
      //Sorter Check
      dispatch(
        action.getList(
          props.apiEndPoint + "?page=" + (pagination.current || 1) + sort,
          props.headers
        )
      );
    } else {
      //Pagination Check
      props.serverPagination &&
        dispatch(
          action.getList(
            props.apiEndPoint + "?page=" + (pagination.current || 1),
            props.headers
          )
        );
    }
  };

  return (
    <div style={{ margin: 50 }}>
      {/* Table Title */}
      <p
        style={{
          fontSize: 32,
          padding: 8,
          fontStyle: "oblique",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {props.tableTitle}
      </p>
      {/* Filter Check - to display search button & drawer or not */}
      {props.filter === true && (
        <div>
          <Tooltip title="Search">
            <Button
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              onClick={showDrawer}
              style={{ float: "right", marginBottom: 10 }}
            />
          </Tooltip>
          <Drawer
            title="Search"
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visible}
            width="35%"
          >
            <DynamicForm data={fields} onSubmit={onFilter} />
          </Drawer>
        </div>
      )}
      <br />
      <br />
      {/* Table Creation */}
      <Table
        columns={columnsData}
        dataSource={listData}
        loading={loading}
        rowKey="name"
        columnKey="dataIndex"
        onChange={onTableChange}
        pagination={
          props.pagination === true
            ? {
                current: currPage,
                pageSize: pageSize,
                offset: 0,
                total: total,
              }
            : false
        }
      />
      <br />
      <br />
    </div>
  );
};
