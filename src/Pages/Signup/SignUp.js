import React from "react";
// import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import logo from "../../assets/DTC-logo.png";
// import "../login/login.styles.css";
import api from "../../Components/Service/Api";
import "../Signup/SignUp.css";

function SignUp() {
  const [form] = Form.useForm();
  // const navigate = useNavigate();

  /* sign up api funcationality begins */
  const onFinish = (values) => {
      values['UserName'] = "Venkat";
      values['companyId'] = "A087E96D-E4CD-4CCC-8CCF-468927B1708B"
      api("/User/Register", {
        method: "POST",
        data: JSON.stringify(values),
      })
        .then((res) => {
          let result = res.data;
          console.log(result);        
          message.success({
            content: "Registration successfull",
            duration:'5',
            className: 'custom-class',
            style: {
              marginTop: '5vh',
              marginRight: '5vh',
              fontSize:'15px',
              textAlign:"right"
            },
          });
          // navigate("/");
          window.location.replace('/login')
        })
        .catch((err) => {
          console.log(err);
          let error = err.response.data.response;
          console.log(error);
          if (error.success === false) {
            //alert(error.message);
            message.error({
              content: error.message,
              duration:'5',
              className: 'custom-class',
              style: {
                marginTop: '5vh',
                marginRight: '5vh',
                fontSize:'15px',
                textAlign:"right"
              },
            });
          }
        });
    };
  /* end of sign up API */

  return (
    <div className="container-signup">
      <div className="signup-layout">
        <div className="logo-image">
          <img src={logo} alt="" height={50} />
        </div>
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <label className="label">
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="Email" rules={[{ required: true }]}>
            <Input className="login-input" />
          </Form.Item>
          <label className="label">
            Password<span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="Password" rules={[
                    { required: true },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,   
                        message: 'Minimum eight characters', 
                        // at least one uppercase letter,
                        //  one lowercase letter, 
                        //  one number and one special character,
                      },
                ]}>
                    <Input type="password" className="login-input" />
                </Form.Item>

          <label className="label">
            Confirm Password<span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item
            name="ConfirmPassword"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("Password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input type="password" className="login-input" />
          </Form.Item>

          <div className="">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-button"
              >
                Sign Up
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className="signup-final-div">
          <p className="ptext">
            Already have an account?{" "}
            <a href="login" className="spansignup">
              SIGN IN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
