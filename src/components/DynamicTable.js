import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, Drawer, Table, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DynamicForm } from "./DynamicForm";
import action from "../store/Actions"
import _ from "lodash";

export const DynamicTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const [currPage, setcurrPage] = useState(1);
  const [pageSize, setpageSize] = useState(25);
  const [total, settotal] = useState((props.list && props.list.length) || 25);
  const [fields, setFields] = useState();
  const [filterStr, setFilterStr] = useState("");
  const [sortStr, setSortStr] = useState('');
  const dispatch = useDispatch();

  //Action Dispatch
  useEffect(() => {
    props.apiEndPoint !== `` && dispatch(action.getList(props.apiEndPoint, props.headers));
  }, [dispatch, props.apiEndPoint, props.headers])

  //Fetching data from store
  const list = useSelector(state => state.getList.list) || props.list;
  const meta = useSelector(state => state.getList.meta);
  const loading = useSelector(state => state.getList.loading);

  const showDrawer = () => {
    setVisible(true);     //to open drawer
  };

  const onClose = () => {
    setVisible(false);    //to close drawer
  };

  //Creating fields for drawer
  useEffect(() => {
    const tempFields = [];
    props.columns.map((col) => {
      return tempFields.push({
        type: col.fieldType,
        name: col.dataIndex,
        label: col.title,
      });
    });
    setFields(tempFields);
    const tempColumns = [];
    props.columns.map((col, i) => {
      if (col.sorter) {
        return tempColumns.push({
          title: col.title,
          dataIndex: col.dataIndex,
          fieldType: col.fieldType,
          sorter: (col.fieldType === "number") ?
            (a, b) => a[col.dataIndex] - b[col.dataIndex] :
            (a, b) => a[col.dataIndex].length - b[col.dataIndex].length
        });
      } else {
        return tempColumns.push({
          title: col.title,
          dataIndex: col.dataIndex,
          fieldType: col.fieldType,
        });
      }
    });
    setColumnsData(tempColumns);
  }, [props.columns, props.sorter]);

  //Fetch List from Server Setup to State
  useEffect(() => {
    props.list ? setListData(props.list) : setListData(list);
  }, [list, props.list]);

  //Server-Pagination Setup to State
  useEffect(() => {
    if (props.serverPagination && meta.pagination) {
      setcurrPage(meta.pagination.current_page);
      setpageSize(meta.pagination.per_page);
      settotal(meta.pagination.total)
    } else if (list) {
      settotal(list.length);//Pagination Setup to State
    } else {
      settotal(0);
    }
  }, [props.serverPagination, meta, list]);

  //Handles Filter/Search 
  const onFilter = (values) => {
    //Local Filter
    if (props.serverFilter === false) {
      let filteredData = [...list];
      _.map(values, (value, key) => {
        if (value) {
          // eslint-disable-next-line eqeqeq
          const tempData = filteredData.filter((data) => data[key] == value);
          filteredData = [...tempData];
        }
      });
      // console.log("Local Filter");
      setListData(filteredData);
      onClose();
    }
    //Server Filter
    else {
      setFilterStr("");
      let searchStr = '';
      _.map(values, (value, key) => {
        if (value) {
          searchStr = searchStr + '&' + key + '=' + value.replace(' ', '_');
        }
      });
      setFilterStr(searchStr);
      dispatch(action.getList(props.apiEndPoint + '?page=1' + sortStr + searchStr, props.headers));
      // console.log("Server Filter");
      onClose();
    }
  };

  //On Change in Table of Pagination and Sorter
  const onTableChange = (pagination, filter, sorter) => {
    setcurrPage(pagination.current);
    setpageSize(pagination.pageSize);
    settotal(pagination.total);
    // Setup sorter
    var sort = ''
    if (sorter && props.serverSorter) {
      if (sorter.order === "ascend") {
        sort = '&sort=+' + sorter.field;
      } else if (sorter.order === "descend") {
        sort = '&sort=-' + sorter.field;
      } else {
        sort = '';
      }
    }
    setSortStr(sort);
    if (filterStr !== "") {     //Filter Check
      dispatch(action.getList(props.apiEndPoint + '?page=' + (pagination.current || 1) + sort + filterStr, props.headers));
    } else if (sort !== '') {   //Sorter Check
      dispatch(action.getList(props.apiEndPoint + '?page=' + (pagination.current || 1) + sort, props.headers));
    } else {                    //Pagination Check
      props.serverPagination && dispatch(action.getList(props.apiEndPoint + '?page=' + (pagination.current || 1), props.headers));
    }
  };

  return (
    <div style={{ margin: 50 }}>
      <p style={{ fontSize: 32, padding: 8, fontStyle: "oblique", fontWeight: "bold", textAlign: "center" }}>
        {props.tableTitle}
      </p>
      {(props.filter === true) &&
        <div>
          <Tooltip title="Search">
            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={showDrawer} style={{ float: "right", marginBottom: 10 }} />
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
        </div>}
      <br /><br />
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
              total: total
            } : false}
      />
      <br /><br />
    </div>
  );
};
