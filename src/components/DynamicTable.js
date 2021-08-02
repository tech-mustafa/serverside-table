import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, Drawer, Table, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DynamicForm } from "./DynamicForm";
import _ from "lodash";

export const DynamicTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [currPage, setcurrPage] = useState(1);
  const [pageSize, setpageSize] = useState(25);
  const [fields, setFields] = useState();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  // const [headers, setHeaders] = useState()

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
    setListData(props.list);
  }, [props.list]);

  const onFilter = (values) => {
    let filteredData = [...props.list];
    _.map(values, (value, key) => {
      if (value) {
        // eslint-disable-next-line eqeqeq
        const tempData = filteredData.filter((data) => data[key] == value);
        filteredData = [...tempData];
      }
    });
    setListData(filteredData);
    onClose();
  };

  const onTableChange = (pagination, filter, sorter) => {
    setcurrPage(pagination.current);
    setpageSize(pagination.pageSize);
    console.log("sorter: ", sorter);
  };

  return (
    <div style={{ margin: 50 }}>
      <Tooltip title="search">
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
        closable={false}
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
        rowKey="sno"
        onChange={onTableChange}
        pagination={{
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
