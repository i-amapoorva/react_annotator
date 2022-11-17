import { Button, Form, Select, Table, Input, Pagination, message } from "antd";
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Option } from "antd/lib/mentions";
import api from "../../Components/Service/Api";
import "./Testing.css";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import TokenService from "../../Components/Service/TokenService";

const { Column } = Table;

const Testing = () => {
   const project_id = useParams();
   const projectDetails = TokenService.getProjectDetails();
   const id = projectDetails.id;

  useEffect(() => {
    loadTrainings(id);
  }, []);

  const [form] = Form.useForm();
  const [Trainings, setTrainings] = useState([]);
  const [file, setFile] = useState();
  const [testname, setTestName] = useState();

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    
  }

  const loadTrainings = () => {
    api("/Training/GetTrainingList/" + id, {
      method: "GET",
    })
      .then((res) => {
        let result = res.data;
        console.log(result);
        setTrainings(result.trainingList);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response;
        if (error.success === false) {
          console.log("error");
        }
      });
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    //const testImageData = document.querySelector('input[type="file"]').files[0];
    console.log(file);
    console.log(testname);
    let formData = new FormData();
    formData.append("TestingName",testname );
    formData.append("ProjectId", id);
    formData.append("ProjectTrainingId", values["ProjectTrainingId"]);
    formData.append("TestImage", file);
    api("/Testing/Inference", {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        message.success({
          content: response.response.message,
          duration: "5",
          className: "custom-class",
          style: {
            marginTop: "5vh",
            marginRight: "5vh",
            fontSize: "15px",
            textAlign: "right",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data.response;
        // if (error.success === false) {
        //   console.log(error.message);
        //   message.error({
        //     content: error.message,
        //     duration: "5",
        //     className: "custom-class",
        //     style: {
        //       marginTop: "5vh",
        //       marginRight: "5vh",
        //       fontSize: "15px",
        //       textAlign: "right",
        //     },
        //   });
        // }
      });
  };

  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="test-layout">
        <div className="test-form-container">
          <Form
            className="test-form"
            form={form}
            // name="control-hooks"
             onFinish={onFinish}
          >
            <Form.Item
              name="testname"
              label="Test Name"
              rules={[{ required: true }]}
            >
              
              <Input
              // value={""}
              onChange={({ target }) => setTestName(target.value)}
            />
            </Form.Item>
            <Form.Item
              name="ProjectTrainingId"
              label="Project Training"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Model"
                //onChange={onModelChange}
                allowClear
              >
                <Option value="6D99CFBA-A91E-4207-9301-4A2B7408C400">
                  Mask RCNN
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="TestImage"
              label="Image"
              valuePropName="image"
              extra="Upload Image"
              rules={[
                {
                  required: true,
                  message: "Please upload image!",
                },
              ]}
            >
              <Input
                type="file"
                name=" "
                onChange={handleFileChange}
              ></Input>
            </Form.Item>

            <Form.Item className="test-submit-btn-container">
              <Button
                type="primary"
                htmlType="submit"
                className="test-submit-btn"
              >
                Test
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <br></br>
          Click here to see the <Link to={""}>Result!!</Link>
          <br></br> */}
      </div>
    </div>
  );
};

export default Testing;
