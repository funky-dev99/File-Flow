import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Table,
  Space,
  Button,
  Select,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { getUsers, updateUser, deleteUser } from "../services/auth_service";
import state from "../store";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  border-radius: 25px;
  background: #f5f5f5;
  width: 100%;
  flex: 1;
  padding: 16px 34px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - 64px - 36px - 16px - 16px);
`;

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Role",
      dataIndex: "userRole",
      key: "userRole",
      // render: (text, record) => (
      //   <Select
      //     defaultValue={text}
      //     style={{ width: 120 }}
      //     onChange={(value) => handleChangeRole(value)}
      //   >
      //     <Option value="Guest user">Guest User</Option>
      //     <Option value="Admin">Admin</Option>
      //     <Option value="Project Manager">Project Manager</Option>
      //     <Option value="Document owner">Document Owner</Option>
      //     <Option value="Normal user">Normal User</Option>
      //   </Select>
      // ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeRole = async (value) => {
    try {
      const updatedUser = { ...selectedUser, userRole: value };
      await updateUser(updatedUser, selectedUser.projectId);
      await fetchUsers();
      message.success("User role updated");
    } catch (error) {
      message.error(error);
    }
  };

  const handleEdit = async (user) => {
    form.resetFields();
    setSelectedUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      userRole: user.userRole,
    });
    setModalVisible(true);
  };

  const handleDelete = async (user) => {
    try {
      await deleteUser(user.uid);
      await fetchUsers();
      message.success("User deleted");
    } catch (error) {
      message.error(error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleModalOk = async () => {
    try {
      const updatedUser = await form.validateFields();
      console.log(updatedUser);
      await updateUser(updatedUser, selectedUser.projectId);
      await fetchUsers();
      setModalVisible(false);
      setSelectedUser(null);
      form.resetFields();
      message.success("User updated");
    } catch (error) {
      console.error(error);
    }
  };

  const [form] = Form.useForm();

  return (
    <Container>
      <Body>
        <Table
          columns={columns}
          dataSource={users}
          rowKey={(record) => record.uid}
          loading={loading}
        />

        {/* Edit User Modal */}
        <Modal
          title="Edit User"
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          destroyOnClose
          closeAfterTransition
        >
          <Form
            form={form}
            initialValues={{
              name: selectedUser?.name,
              email: selectedUser?.email,
              mobileNumber: selectedUser?.mobileNumber,
              userRole: selectedUser?.userRole,
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter a name" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter an email" }]}
            >
              <Input placeholder="Email" disabled />
            </Form.Item>

            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              rules={[
                { required: true, message: "Please enter a mobile number" },
              ]}
            >
              <Input placeholder="Mobile Number" />
            </Form.Item>

            <Form.Item
              name="userRole"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select style={{ width: "100%" }}>
                <Option value="Guest user">Guest User</Option>
                <Option value="Admin">Admin</Option>
                <Option value="Project Manager">Project Manager</Option>
                <Option value="Document owner">Document Owner</Option>
                <Option value="Normal user">Normal User</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Body>
    </Container>
  );
};

export default Users;
