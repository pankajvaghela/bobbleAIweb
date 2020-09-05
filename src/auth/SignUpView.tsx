import React from "react";

import { Form, Input, Button } from "antd";

interface SignUpViewProps {}

export const SignUpView: React.FC<SignUpViewProps> = React.forwardRef(
  (_, __) => {
    const onFinish = (values: any) => {
      console.log("Received values of form: ", values);
    };

    return (
      <div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name={["user", "firstName"]}
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name={["user", "lastName"]}
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            rules={[{ type: "email", message: "Please enter valid email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name={["user", "password"]}
            rules={[
              { required: true, message: "Please input your Password!" },
              { min: 6, message: "Length of password must be atleast 6!" },
            ]}
            hasFeedback
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <div className="login-form-forgot">
              By clicking Sign Up, you agree to our <a href="#">Terms of use</a>{" "}
              and our <a type="link">Privacy Policy</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              SIGN UP
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
);
