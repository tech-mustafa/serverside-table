import React, { useState, useEffect } from 'react'
import "antd/dist/antd.css";
import { Button, Drawer, Table, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DynamicForm } from './DynamicForm';
// import _ from 'lodash';

export const DynamicTable = (props) => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const [fields, setFields] = useState();
    useEffect(() => {
        const tempFields = [];
        props.columns.map((col) => {
            return tempFields.push(
                {
                    type: col.fieldType,
                    name: col.dataIndex,
                    label: col.title,
                }
            )
        });
        setFields(tempFields);
    }, [props.columns])

    const onFilter = (values) => {
        console.log('values: ', values);
        let keys = Object.keys(values);// keys of value




        keys.map((val) => {// key of values
            if (values[val] || values[val] !== "" || values[val] !== undefined) {//values['name']
                props.list.map((rows) => {
                    let row = Object.keys(rows);//keys of a current row
                    row.map((r) => {//key of row
                        if (val === r) {
                            console.log('rows.row val: ', rows[r]);
                            return onClose();
                        } else {
                            return onClose();
                        }
                    })
                    return onClose();
                });
            }
            return onClose();
        });
    }
    return (
        <div style={{ margin: 50 }}>
            <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={showDrawer} style={{ float: 'right', marginBottom: 10 }} />
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
            <Table columns={props.columns} dataSource={props.list} rowKey="sno" />
        </div>
    )
}
