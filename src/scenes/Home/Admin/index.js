import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Select, Form, Input, Typography, notification } from 'antd';
import adminService from '../../../services/adminService';

const { confirm } = Modal;
const { Title } = Typography;
const { Option } = Select;

const AdminDashboard = ({form}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  const initialLoad = async () => {
    try {
      let userData = await adminService.getUsers();
      setData(userData);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const openSuccessNotification = (msg='') => {
    notification.success({
      message: 'Success',
      description:msg
      });
  };
  const openFailureNotification = (msg='') => {
    notification.error({
      message: 'Error',
      description:msg
      });
  };

  useEffect(() => {
    initialLoad()
   }, []);

  const handleEdit = (record) => {
    setEditData(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (record) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      async onOk() {
        let res = await adminService.deleteUser({id:record.UserID});
        if(!res.error) {
          initialLoad();
          openSuccessNotification(res?.message)
        } else {
          openFailureNotification(res?.error)
        }
      },
      onCancel() {
        // Cancel delete action
      },
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    form.validateFields(['Username', 'Password', 'Role', 'Email'], async (err, values) => {
      if (!err) {
        let res = await adminService.updateUser({
          username: values.Username,
          password: values.Password,
          role: values.Role,
          email: values.Email,
          id: editData.UserID
        });
        if(!res.error) {
          initialLoad();
          form.resetFields()
          setIsEditModalVisible(false);
          openSuccessNotification(res?.message)
        } else {
          openFailureNotification(res?.error)
        }
      }
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    form.validateFields(['add_Username', 'add_Password', 'add_Role', 'add_Email'], async (err, values) => {
      if (!err) {
        let res = await adminService.addUser({
          username: values.add_Username,
          password: values.add_Password,
          role: values.add_Role,
          email: values.add_Email
        });
        if(!res.error) {
          initialLoad();
          form.resetFields()
          setIsAddModalVisible(false);
          openSuccessNotification(res?.message)
        } else {
          openFailureNotification(res?.error)
        }


       
      }
    });
  };




  const { getFieldDecorator } = form;

  const columns = [
    // Define table columns
    {
      title: 'Username',
      dataIndex: 'Username',
      key: 'Username',
      sorter: (a, b) => String(a.Username).localeCompare(b.Username),
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Role',
      dataIndex: 'Role',
      key: 'Role',
      sorter: (a, b) => String(a.Role).localeCompare(b.Role),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button icon="edit" onClick={() => handleEdit(record)} />
          <Button icon="delete" onClick={() => handleDelete(record)} />
        </span>
      ),
    },
  ];

  return (
    <div className="container">
    <div className="row">
        <div className="col-md-12">
          <Title level={2} className="text-right mt-4">
            
            <span className="ml-4">Logged in as: {localStorage.getItem('username')||''} ({localStorage.getItem('role')||''})</span>
          </Title>
        </div>
        <div className="col-md-12 mt-4">
          <Button type="primary" onClick={() => {setIsAddModalVisible(true);form.resetFields()}}>
            Add User
          </Button>
          &nbsp;&nbsp;
          <Button type="danger" onClick={() => {localStorage.clear();window.location.href='/auth/login'}}>
            Logout
          </Button>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      {/* Edit Modal */}
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditSubmit}>
            Save
          </Button>,
        ]}
      >
        <Form onSubmit={handleEditSubmit}>
          <Form.Item label="Username">
            {getFieldDecorator('Username', {
              initialValue: editData.Username,
              rules: [{ required: true, message: 'Please input Username!' }],
            })(<Input placeholder="Username" />)}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator('Password', {
              initialValue: editData.Password,
              rules: [{ required: false, message: 'Please input Password!' }],
            })(<Input.Password placeholder="Password" />)}
          </Form.Item>
          <Form.Item label="Role">
            {getFieldDecorator('Role', {
              initialValue: editData.Role,
              rules: [{ required: true, message: 'Please select Role!' }],
            })(
              <Select placeholder="Select Role">
                <Option value="Admin">Admin</Option>
                <Option value="Agent">Agent</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('Email', {
              initialValue: editData.Email,
              rules: [{ required: true, message: 'Please input Email!' }],
            })(<Input placeholder="Email" />)}
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Modal */}
      <Modal
        title="Add User"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAddModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddSubmit}>
            Save
          </Button>,
        ]}
      >
        <Form onSubmit={handleAddSubmit}>
          {/* Form fields for adding user */}
          {/* Similar getFieldDecorator usage for each field */}
          
          <Form.Item label="Username">
            {getFieldDecorator('add_Username', {
              rules: [{ required: true, message: 'Please input Username!' }],
            })(<Input placeholder="Username" />)}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator('add_Password', {
              rules: [{ required: true, message: 'Please input Password!' }],
            })(<Input.Password placeholder="Password" />)}
          </Form.Item>
          <Form.Item label="Role">
            {getFieldDecorator('add_Role', {
              rules: [{ required: true, message: 'Please select Role!' }],
            })(
              <Select placeholder="Select Role">
                <Option value="Admin">Admin</Option>
                <Option value="Agent">Agent</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('add_Email', {
              rules: [{ required: true, message: 'Please input Email!' }],
            })(<Input placeholder="Email" />)}
          </Form.Item>
       
        </Form>
      </Modal>
    </div>
  );
};

export default Form.create()(AdminDashboard);
