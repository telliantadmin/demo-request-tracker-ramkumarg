import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Select, Form, Input, Typography, notification } from 'antd';
import agentService from '../../../services/agentService';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

const AgentDashboard = ({form}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [editData, setEditData] = useState({});
  const [isAllData, setIsAllData] = useState(true);


  const initialLoad = async () => {
    try {
      let userData = await (isAllData ? agentService.getAllRequests() : agentService.getRequests());
      setData(userData);
    } catch (error) {
      console.error('Error :', error);
    }
  };
  const getagentList = async () => {
    try {
      let agentData = await agentService.getAgentList();
      setAgentData(agentData);
    } catch (error) {
      console.error('Error ', error);
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
    getagentList()
   }, []);

   useEffect(() => {
    initialLoad()
   }, [isAllData]);

  const handleEdit = (record) => {
    setEditData(record);
    setIsEditModalVisible(true);
  };



  const handleEditSubmit = (e) => {
    e.preventDefault();
    form.validateFields(['Title', 'Description', 'AssignedToID', 'Status', 'Priority'], async (err, values) => {
      if (!err) {
        let res = await agentService.updateRequest({
          Title: values.Title,
          Description: values.Description,
          AssignedToID: values.AssignedToID,
          Status: values.Status,
          Priority: values.Priority,
          id: editData.RequestID
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
    form.validateFields(['add_Title', 'add_Description', 'add_AssignedToID', 'add_Status', 'add_Priority'], async (err, values) => {
      if (!err) {
        let res = await agentService.addRequest({
          Title: values.add_Title,
          Description: values.add_Description,
          AssignedToID: values.add_AssignedToID,
          Status: values.add_Status,
          Priority: values.add_Priority
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
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      sorter: (a, b) => String(a.Title).localeCompare(b.Title),
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      sorter: (a, b) => String(a.Status).localeCompare(b.Status),
    },
    {
      title: 'Priority',
      dataIndex: 'Priority',
      key: 'Priority',
      sorter: (a, b) => String(a.Priority).localeCompare(b.Priority),
    },
    {
      title: 'RequesterName',
      dataIndex: 'RequesterName',
      key: 'RequesterName',
    },
    {
      title: 'AssignedToName',
      dataIndex: 'AssignedToName',
      key: 'AssignedToName',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      sorter: (a, b) => moment(a.Priority).isBefore(b.Priority),
      render: (text, record) => (
        <span>
          {moment(text).format('MMM DD, YYYY')}
        </span>
      ),
    },
    {
      title: 'UpdatedAt',
      dataIndex: 'UpdatedAt',
      key: 'UpdatedAt',
      sorter: (a, b) => moment(a.Priority).isBefore(b.Priority),
      render: (text, record) => (
        <span>
          {moment(text).format('MMM DD, YYYY')}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button icon="edit" onClick={() => handleEdit(record)} />
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
        <div className="col-md-12 mt-4 gap-2">
          <Button type="primary" onClick={() => {setIsAddModalVisible(true);form.resetFields()}}>
            Add Request
          </Button>&nbsp;&nbsp;
          <Button type="primary" onClick={() => {setIsAllData(!isAllData)}}>
            {isAllData ? 'Show Assigned to me' : 'Show all requests'}
          </Button>
          &nbsp;&nbsp;
          <Button type="danger" onClick={() => {localStorage.clear();window.location.href='/#/auth/login'}}>
            Logout
          </Button>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      {/* Edit Modal */}
      <Modal
        title="Edit Request"
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
          <Form.Item label="Title">
            {getFieldDecorator('Title', {
              initialValue: editData.Title,
              rules: [{ required: true, message: 'Please input Title!' }],
            })(<Input placeholder="Title" />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('Description', {
              initialValue: editData.Description,
              rules: [{ required: true, message: 'Please input Description!' }],
            })(<Input.TextArea rows={4} placeholder="Description" />)}
            <p class="text-danger" style={{fontSize:'10px'}}>No comments section here! Feel free to update the description instead.</p>

          </Form.Item>
          <Form.Item label="AssignedTo">
            {getFieldDecorator('AssignedToID', {
              initialValue: editData.AssignedToID,
              rules: [{ required: true, message: 'Please select AssignedTo!' }],
            })(
              <Select placeholder="Select AssignedTo">
                {agentData.map(d=>(<Option value={d?.UserID}>{d?.Username}</Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Status">
            {getFieldDecorator('Status', {
              initialValue: editData.Status,
              rules: [{ required: true, message: 'Please select Status!' }],
            })(
              <Select placeholder="Select Status">
                <Option value="Open">Open</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Resolved">Resolved</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Priority">
            {getFieldDecorator('Priority', {
              initialValue: editData.Priority,
              rules: [{ required: true, message: 'Please select Priority!' }],
            })(
              <Select placeholder="Select Priority">
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            )}
          </Form.Item>
         
        </Form>
      </Modal>

      {/* Add Modal */}
      <Modal
        title="Add Request"
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
          <Form.Item label="Title">
            {getFieldDecorator('add_Title', {
              rules: [{ required: true, message: 'Please input Title!' }],
            })(<Input placeholder="Title" />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('add_Description', {
              rules: [{ required: true, message: 'Please input Description!' }],
            })(<Input.TextArea rows={4} placeholder="Description" />)}
            <span class="text-muted" style={{fontSize:'10px'}}>No file uploads here! Upload your files in the cloud and send us the link instead. ☁️</span>
          </Form.Item>
          
          <Form.Item label="AssignedTo">
            {getFieldDecorator('add_AssignedToID', {
              rules: [{ required: true, message: 'Please select AssignedTo!' }],
            })(
              <Select placeholder="Select AssignedTo">
                {agentData.map(d=>(<Option value={d?.UserID}>{d?.Username}</Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Status">
            {getFieldDecorator('add_Status', {
              rules: [{ required: true, message: 'Please select Status!' }],
            })(
              <Select placeholder="Select Status">
                <Option value="Open">Open</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Resolved">Resolved</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Priority">
            {getFieldDecorator('add_Priority', {
              rules: [{ required: true, message: 'Please select Priority!' }],
            })(
              <Select placeholder="Select Priority">
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            )}
          </Form.Item>
         
        </Form>
      </Modal>
    </div>
  );
};

export default Form.create()(AgentDashboard);
