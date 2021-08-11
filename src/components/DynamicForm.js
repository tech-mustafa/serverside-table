import React from 'react';
import { Form, Input, Select, Checkbox, Button, InputNumber, Radio, DatePicker, Upload } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import { InboxOutlined } from '@ant-design/icons';

const { Option } = Select;

export const DynamicForm = (props) => {
    const [form] = Form.useForm();

    const getField = (field) => {
        switch (field.type) {
            case "formName"://Form Title
                return (
                    <h4 style={{ fontSize: 30, padding: 15, fontStyle: "oblique", fontWeight: "bold", textAlign: "center" }}>
                        {field.value}
                    </h4>
                );
            case "header"://Section Headers
                return (
                    <Form.Item>
                        <span style={{ color: "blue", fontSize: 20, fontStyle: "bold", borderBottom: "2px solid #bbb" }}>
                            {field.value}
                        </span>
                    </Form.Item>
                );
            case "text"://Text Field
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        rules={[
                            {
                                required: field.required,
                                message: 'This field is Required!!',
                            }, {
                                pattern: field.regex,
                                message: 'Please enter a valid Input!',
                            }
                        ]}
                        initialValue={field.initialValue}
                    >
                        <Input
                            type={field.type}
                            allowClear
                        />
                    </Form.Item>
                );
            case "date"://Date Field
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        rules={[
                            {
                                required: field.required,
                                message: 'This field is Required!!',
                            },
                        ]}
                        initialValue={moment(field.initialValue, 'DD/MM/YYYY')}
                    >
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            allowClear
                        // onChange={getDate}
                        />
                    </Form.Item>
                );
            case "age"://Age Dropdown
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        rules={[
                            {
                                required: field.required,
                                message: 'This field is Required!!',
                            },
                        ]}
                    >
                        <InputNumber
                            defaultValue={field.initialValue}
                            min="1"
                            max="120"
                            allowClear
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                );
            case "number"://Number Field
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        initialValue={field.initialValue}
                        rules={[
                            {
                                required: field.required,
                                message: 'This field is Required!!',
                            }, {
                                pattern: /[0-9]/,
                                message: 'Please enter a valid Input!',
                            }
                        ]}
                    >
                        <Input
                            min="0"
                            maxLength={field.maxLen}
                            allowClear
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                );
            case "matchInput"://Compare field input to other input field's value
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        dependencies={[field.dependsOn]}
                        initialValue={field.initialValue}
                        rules={[
                            {
                                required: field.required,
                                message: 'This field is Required!!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue(field.dependsOn) === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Both field values that you entered do not match!'));
                                },
                            }), {
                                pattern: field.regex,
                                message: 'Please enter a Only Integer Value as an Input!',
                            }
                        ]}
                    >
                        <Input
                            min="0"
                            allowClear
                            maxLength={field.maxLen}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                );
            case "option"://Dropdown Field
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        initialValue={field.initialValue}
                        rules={[{ required: field.required, message: 'Please select an item!' }]}
                    >
                        <Select>
                            {field.data.map((option, index) => {
                                return (
                                    <Option key={index} value={option.value}>
                                        {option.name} - {option.value}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                );
            case "radio"://Radio Field
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        initialValue={field.initialValue}
                        rules={[{ required: field.required, message: 'Please pick an item!' }]}
                    >
                        <Radio.Group>
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
            case "contact"://Contact Field
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        initialValue={field.initialValue}
                        rules={[{
                            required: field.required,
                            message: 'This field is Required!!',
                        }, {
                            pattern: /[0-9]/,
                            message: 'Please enter a valid Input!',
                        }
                        ]}
                    >
                        <Input
                            type={field.type}
                            prefix={field.countryCode}
                            allowClear
                            minLength="10"
                            maxLength="10"
                        />
                    </Form.Item>
                );
            case "email"://Mail Address Field
                return (
                    <Form.Item
                        name={field.name}
                        label={field.label}
                        initialValue={field.initialValue}
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: field.required,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input
                            allowClear
                        />
                    </Form.Item>
                );
            case "upload"://Upload Field
                return (
                    <Form.Item
                        label={field.label}
                        rules={[
                            {
                                required: field.required,
                                message: 'This field is Required!!',
                            },
                        ]}
                    >
                        <Form.Item name={field.name} valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name={field.name} action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                );
            case "checkbox"://Checkbox Field
                return (
                    <Form.Item
                        name={field.name}
                        valuePropName="checked"
                        label={field.label}
                        initialValue={field.initialValue}
                    >
                        <Checkbox>
                            {field.value}
                        </Checkbox>
                    </Form.Item>
                );
            default:
                return (<></>)
        }
    };

    const normFile = (e) => {                                   //handles file Uplaods
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const onFinish = (values) => {                              //Handles Form Submit
        props.onSubmit(values);
        console.log('Received values of form: ', values);
    };

    const onReset = () => {                                     //Handles Form Reset
        form.resetFields();
      };

    return (
        <div >
            <Form
                labelCol={{
                    span: 7,
                }}
                wrapperCol={{
                    span: 14,
                }}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                style={{ fontFamily: "cursive" }}
            >
                {props.data.map((field, index) => {
                    return <div key={index}>{getField(field)}</div>;
                })}
                <br />
                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    &emsp;
                    <Button type="primary" htmlType="reset" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
            <br />
            <br />
        </div>
    );
};