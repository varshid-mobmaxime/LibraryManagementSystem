import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
const { Option } = Select;

const EditUserDetails = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form Values: ", values);
  };
  return (
    <Drawer
      title="Edit user details"
      width={720}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button htmlType="submit" form="editUserForm" type="primary">
            Update
          </Button>
        </Space>
      }
    >
      {/* <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter user name",
                },
              ]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="url"
              label="Url"
              rules={[
                {
                  required: true,
                  message: "Please enter url",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
                addonBefore="http://"
                addonAfter=".com"
                placeholder="Please enter url"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="owner"
              label="Owner"
              rules={[
                {
                  required: true,
                  message: "Please select an owner",
                },
              ]}
            >
              <Select placeholder="Please select an owner">
                <Option value="xiao">Xiaoxiao Fu</Option>
                <Option value="mao">Maomao Zhou</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                  message: "Please choose the type",
                },
              ]}
            >
              <Select placeholder="Please choose the type">
                <Option value="private">Private</Option>
                <Option value="public">Public</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="approver"
              label="Approver"
              rules={[
                {
                  required: true,
                  message: "Please choose the approver",
                },
              ]}
            >
              <Select placeholder="Please choose the approver">
                <Option value="jack">Jack Ma</Option>
                <Option value="tom">Tom Liu</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="DateTime"
              rules={[
                {
                  required: true,
                  message: "Please choose the dateTime",
                },
              ]}
            >
              <DatePicker.RangePicker
                style={{
                  width: "100%",
                }}
                getPopupContainer={(trigger) => trigger.parentElement}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter url description",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form> */}

      {/* <Form
        form={form}
        id="editUserForm" // Link the form ID to the "Update" button
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          phoneNumber: "3718642837",
          firstName: "ashdgasd",
          lastName: "askudgasiy",
          email: "",
          userName: "",
          avatar: "",
          role: "",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name",
                },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "First name should only contain letters",
                },
              ]}
            >
              <Input placeholder="Please enter your first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name",
                },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "Last name should only contain letters",
                },
              ]}
            >
              <Input placeholder="Please enter your last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Please enter your email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid phone number",
                },
              ]}
            >
              <Input placeholder="Please enter your phone number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
                {
                  min: 4,
                  message: "Username must be at least 4 characters long",
                },
              ]}
            >
              <Input placeholder="Please enter your username" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[
                {
                  required: true,
                  message: "Please select a role",
                },
              ]}
            >
              <Select displayName="Please select a role">
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form> */}

      <Form
        form={form}
        id="editUserForm"
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          phoneNumber: "+1",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name",
                },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "First name should only contain letters",
                },
              ]}
            >
              <Input placeholder="Please enter your first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name",
                },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "Last name should only contain letters",
                },
              ]}
            >
              <Input placeholder="Please enter your last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input placeholder="Please enter your email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid phone number",
                },
              ]}
            >
              <Input placeholder="Please enter your phone number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
                {
                  min: 4,
                  message: "Username must be at least 4 characters long",
                },
              ]}
            >
              <Input placeholder="Please enter your username" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[
                {
                  required: true,
                  message: "Please select a role",
                },
              ]}
            >
              <Switch></Switch>

              <Select placeholder="Please select a role">
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default EditUserDetails;
