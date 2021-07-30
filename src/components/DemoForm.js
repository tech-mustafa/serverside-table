import React, { useState } from 'react';
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Select,
  Radio,
} from 'antd';
import moment from 'moment';

const DemoForm = (fields) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const [componentSize, setComponentSize] = useState('default');

  const getField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <Form.Item label={field.label}>
            <Input
              type={field.type}
              defaultValue={field.initialValue}
              name={field.name}
            // onChange={(e) => setSubmitDet(`${field.label}: ${e.target.value}, `)}
            />
          </Form.Item>
        );
      case "date":
        return (
          <Form.Item label={field.label}>
            <DatePicker
              type={field.type}
              defaultValue={moment(field.initialValue, 'DD/MM/YYYY')}
              format={'DD/MM/YYYY'}
              name={field.name}
              onChange={getDate}
            />
          </Form.Item>
        );
      case "number":
        return (
          <Form.Item label={field.label}>
            <InputNumber
              type={field.type}
              defaultValue={field.initialValue}
              name={field.name}
              min="1"
              max="120"
            // onChange={(e) => setSubmitDet(`${field.label}: ${e.target.value}, `)}
            />
          </Form.Item>
        );
      case "option":
        return (
          <Form.Item label={field.label} rules={[{ required: true, message: 'Please select an item!' }]}>
            <Select name={field.name} defaultValue={field.initialValue}>
              {field.data.map((option, index) => {
                return (
                  <Select.Option key={index} value={option.value}>
                    {option.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        );
      case "radio":
        return (
          <Form.Item label={field.label} rules={[{ required: true, message: 'Please pick an item!' }]}>
            <Radio.Group name={field.name} defaultValue={field.initialValue}>
              {field.data.map((option, index) => {
                return (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
        );
      case "contact":
        return (
          <Form.Item label={field.label}>
            <InputNumber
              type={field.type}
              defaultValue={field.initialValue}
              name={field.name}
              minLength="10"
              maxLength="10"
            // onChange={(e) => setSubmitDet(`${field.label}: ${e.target.value}, `)}
            />
          </Form.Item>
        );
      default:
        return (<></>)
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const getDate = (date, dateString) => {
    console.log('Date: ', dateString);
    return dateString;
    // setSubmitDet(data[3]{initialValue: dateString});
  }

  return (
    <div style={{ margin: 50 }}>
      <br />
      <p style={{ fontSize: 28, textAlign: "center" }}>Ant Design Form</p>
      {console.log("Fields: ", fields)}
      <br />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        name="Form"
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        form={form}
        onFinish={onFinish}
      >
        {fields.data.map((field, index) => {
          return <div key={index}>{getField(field)}</div>;
        })}
        <br />

        {/* <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Switch">
          <Switch />
        </Form.Item> */}
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      <br />
      {/* {submitDet && <h3>Submitted Data: {submitDet}{console.log('submitDet: ', submitDet)}</h3>} */}

    </div>
  );
};

export default DemoForm;