import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import signupService from '../../../services/signupService';
import { Link } from 'react-router-dom';

const { Option } = Select;

const Signup = ({ form }) => {
  const [showMathProblem, setShowMathProblem] = useState(false);
  const [isHuman, setIsHuman] = useState('');
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [startTime, setStartTime] = useState(0);

  const handleHumanChange = (value) => {
    setIsHuman(value);
    setStartTime(new Date().getTime());
    if (value === 'yes') {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      setNumber1(num1);
      setNumber2(num2);
      setAnswer('');
      setShowMathProblem(true);
    } else {
      document.body.innerHTML = `<div class="container text-center mt-5">
      <h1 class="mb-3">Oops!</h1>
      <p class="lead">We don't support aliens, machines, or any other species on Earth!</p>
     <p class="text-muted">But hey, if you're a human, just reload the page and sign up!</p>
    </div>`;
    }
  };



  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    if (e.target.value === String(number1 + number2)) {
      const now = new Date().getTime();
      const selectedTime = now - startTime;
      if (selectedTime < 3000) {
        notification.error({
          message: 'Too fast!',
          description: 'Looks like a computer. Please try again.',
        });
        setIsHuman('');
        setAnswer('');
        setShowMathProblem(false);
      }
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        let res = await signupService.signup(values);
        if(!res?.error) {
          notification.success({
            message: 'Verify Email',
            description: 'Signup successful! Please verify your email.',
          });
          setTimeout(()=>{
            window.location.href = '/#/auth/login';
          }, 2000)
        } else {
          notification.error({
            message: 'Error',
            description: res?.error,
          });
        }
      }
    });
  };

  const { getFieldDecorator } = form;
 

 

  return (
    <div className="container">
    <div className="row justify-content-center align-items-center vh-100">
      <div className="col-md-6">
      <h1>Sign Up</h1>
      <Form
        form={form}
        onSubmit={handleSubmit}
        className="signup-form"
      >
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(<Input.Password placeholder="Password" />)}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ],
          })(<Input placeholder="Email" />)}
        </Form.Item>
        <Form.Item label="Are you human?">
          <Select
            placeholder="Are you human?"
            onChange={handleHumanChange}
            allowClear
            value={isHuman}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>
        {showMathProblem && isHuman === 'yes' && (
          <div>
            <p>
              What is {number1} + {number2}?
            </p>
            <Input value={answer} onChange={handleAnswerChange}/>
          </div>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={answer !== String(number1 + number2) || !form.getFieldValue('username') || !form.getFieldValue('password') || !form.getFieldValue('email')}>
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item>
                <Link to="#" onClick={()=>alert(`Ok! No problem. Just hit that back button and you'll be on your way to the login page`)}>I Already have account</Link>
          </Form.Item>
      </Form>
    </div>
    </div>
    </div>
  );
};

export default Form.create({ name: 'signup_form' })(Signup);
