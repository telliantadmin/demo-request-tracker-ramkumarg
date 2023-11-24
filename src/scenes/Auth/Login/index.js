import React from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { Link } from 'react-router-dom';
import loginService from '../../../services/loginService';

const { Title } = Typography;

const Login = ({ form }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        let res = await loginService.login(values);
        if(!res?.error) {
          localStorage.setItem('token', res?.token);
          localStorage.setItem('role', res?.role);
          localStorage.setItem('username', res?.username);
          window.location.href = `/#/${res?.role?.toLowerCase()}`
        } else {
          notification.error({
            message: 'Error',
            description: res?.error,
          });
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="login-form">
            <Title level={2} className="text-center mb-4">
              Login
            </Title>
            <Form layout="vertical" onSubmit={handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(<Input placeholder="Username" />)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(<Input.Password placeholder="Password" />)}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>

              <Form.Item>
                <Link to="/auth/forgot-password">Forgot Password?</Link>
              </Form.Item>

              <Form.Item>
                <Link to="/auth/signup">Don't have account?</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedLogin = Form.create({ name: 'login_form' })(Login);

export default WrappedLogin;
