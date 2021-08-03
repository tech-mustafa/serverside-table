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
  const [currPage, setcurrPage] = useState(1);
  const [pageSize, setpageSize] = useState(25);
  const [fields, setFields] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.getList());
  }, [dispatch])

  const list = useSelector(state => state.getList.list.list);
  const loading = useSelector(state => state.getUsers.loading);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
  }, [props.columns]);

  useEffect(() => {
    list && setListData(list);
  }, [list]);

  const onFilter = (values) => {
    if (props.filter === true){
      let filteredData = [...list];
    _.map(values, (value, key) => {
      if (value) {
        // eslint-disable-next-line eqeqeq
        const tempData = filteredData.filter((data) => data[key] == value);
        filteredData = [...tempData];
      }
    });
    setListData(filteredData);
    onClose();}
  };

  const onTableChange = (pagination, filter, sorter) => {
    setcurrPage(pagination.current);
    setpageSize(pagination.pageSize);
    console.log("sorter: ", sorter);
  };

  return (
    <div style={{ margin: 50 }}>
      <Tooltip title="Search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={showDrawer} style={{ float: "right", marginBottom: 10 }} />
      </Tooltip>
      <Drawer
        title="Search"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="30%"
      >
        <DynamicForm data={fields} onSubmit={onFilter} />
      </Drawer>
      <br />
      <Table
        columns={props.columns}
        dataSource={listData}
        loading={loading}
        rowKey="sno"
        onChange={onTableChange}
        pagination={ props.pagination && {
          current: currPage,
          pageSize: pageSize,
          offset: 0,
          limit: 25,
          total: 300
        }}
      />
    </div>
  );
};
