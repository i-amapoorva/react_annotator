import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, message } from "antd";
import logo from "../../assets/DTC-logo.png";
import "../Login/Login.css";
import api from "../../Components/Service/Api";
import TokenService from "../../Components/Service/TokenService";

function Login() {
  const [form] = Form.useForm();
  // const navigate = useNavigate();

  /* start of login API */
  const onFinish = (values) => {
    console.log(values);
    api("/User/login", {
      method: "POST",
      data: JSON.stringify(values),
    })
      .then((res) => {
        let result = res.data;
        console.log(result);        
        TokenService.setUser(result["user"]);
        TokenService.setLocalAccessToken(result["token"]);
        TokenService.setRefreshToken(result["refreshToken"]);
        //TokenService.setPermission(result["permissions"]);
        console.log("in");
        // navigate("/projects");
        window.location.replace("/projects");
      })
      .catch((err) => {
        let error = err.response.data;
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
  /* end of login API */

  return (
    <div className="container-login">
      <div className="login-layout">
        <div className='logo-image'>
            <img src={logo} alt="" height={50} />
        </div>
            <Form  name="control-hooks" onFinish={onFinish}>
                <label className='label'>Email<span style={{"color":"red"}}>*</span></label>
                <Form.Item name="email" className="input-design" rules={[
                      {
                        required: true,
                        message: 'Please select your email',
                      },
                      {
                        type: "email",
                        message: 'Please enter valid email',
                      },
                    ]}>
                    <Input className="login-input" />
                </Form.Item>
                <label className='label'>Password<span style={{"color":"red"}}>*</span></label>
                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input type="password" className="login-input" />
                </Form.Item>
                <Form.Item name="remember_me" valuePropName="remember_me" style={{"marginTop":"-20px"}}>
                <Checkbox>Remember me?</Checkbox>
                </Form.Item>

                <div className=''>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className='login-button'>
                    Login
                    </Button>
                </Form.Item>
                <div className="forgot-password-link"><a href="#">Forgot Password?</a></div>
                </div>
            </Form>
        <div className="login-final-div">
          <p className='ptext'>Need an account? <a href="/signup" className="spansignup">SIGN UP</a></p>
        </div>
      </div>
    </div>
  );
}
export default Login;
