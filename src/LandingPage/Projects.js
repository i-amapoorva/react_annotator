import { Button, Form, Input, Modal, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import newProjectIcon from "../assets/add-icon.png"
import "./Projects.css";
import { Option } from "antd/lib/mentions";
// import Header from "../../Components/Header/Header";
 import api from "../Components/Service/Api";
import ProjectCard from "./ProjectCard";
 import TokenService from "../Components/Service/TokenService";
import TextArea from "antd/lib/input/TextArea";
import Header from "../Components/Header/Header";
//  import { useNavigate } from "react-router-dom";

function Projects() {
  useEffect(() => {
    TokenService.removeProjectDetails();
    loadProjects();
    loadTaskTypes();
  }, []);

  //  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState();

  const showModal = () => {
    console.log("name");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /* start of  create new project API*/
  const onFinish = (values) => {
    console.log(values);
    values["companyId"] = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    console.log(values);
    api("/Project", {
      method: "POST",
      data: JSON.stringify(values),
      mode: "cors",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        message.success({
          content:
            "Project created successfully with name " + values["projectName"],
          duration: "5",
          className: "custom-class",
          style: {
            marginTop: "5vh",
            marginRight: "5vh",
            fontSize: "15px",
            textAlign: "right",
          },
        });
        onReset();
        setIsModalOpen(false);
        alert("inproject");
        // window.location.replace("/projects");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.success === false) {
          console.log("error");
          message.error({
            content: "Project name already exist",
            duration: "5",
            className: "custom-class",
            style: {
              marginTop: "5vh",
              marginRight: "5vh",
              fontSize: "15px",
              textAlign: "right",
            },
          });
        }
      });
  };
  /* end of create new project API */

  /* Start load projects API */
  const loadProjects = (values) => {
    api("/Project/getallprojects", {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        setProjects(response.project);
        setisLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          console.log("error");
        }
      });
  };
  // /* end of load projects API */

  const loadTaskTypes = () => {
    setSelectedModel(null);
    api("/ModelTask/GetAllModelTasks", {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setTaskTypes(response.modelTask);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          console.log("error");
        }
      });
  };

  const loadModel = (e) => {
    form.resetFields(["ModelId"]);
    console.log(e);
    api("/Model/GetModelsOnTask/" + e, {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setModels(response.models);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          console.log("error");
        }
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="container">
      <Header />
      <div className="project-container">
        <div className="overall-cards-layout">
          <div className="card-layout" onClick={showModal}>
            <div className="project-image">
              <img src={newProjectIcon} alt="" className="card-image" />
            </div>
            <p className="create-new-text">Create New</p>
            <span className="create-project-span">
              ipsum as it is sometimes known, is dummy text used in laying out
              print, graphic or web designs
            </span>
          </div>

          {isLoaded ? (
            projects.map((item, i) => {
              return <ProjectCard key={item.id} projectDetails={item} />;
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Modal
        // header={null}
        closable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className=""
        footer={false}
      >
        <Form
          form={form}
          name="control-hooks"
           onFinish={onFinish}
          className="modal-innerlayout"
        >
          <p className="create-project-title">Create New Project</p>
          <label className="label">
            Project Name<span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item
            name="projectName"
            rules={[
              {
                required: true,
                message: "Project name is required",
              },
            ]}
          >
            <Input className="modal-input" />
          </Form.Item>

          <Form.Item
            name="ModelTaskId"
            rules={[
              {
                required: true,
                message: "Missing Task Type selection",
              },
            ]}
          >
            <Select
              className="modal-select"
              showSearch
              placeholder="Select tasktype"
              optionFilterProp="children"
              filterOption={(input, option) => {
                return (
                  //console.log(option.children.props.children['1']),
                  option.children.props.children["1"]
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                );
              }}
              // filterSort={(optionA, optionB) =>
              // optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              // }
              onChange={(e, label) => {
                 loadModel(e);
              }}
            >
              {taskTypes.map((item, i) => {
                return (
                  <Option key={item.modelTaskId} value={item.modelTaskId}>
                    {item.taskName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="ModelId"
            rules={[
              {
                required: true,
                message: "Missing model selection",
              },
            ]}
          >
            <Select
              className="modal-select"
              showSearch
              allowClear
              placeholder="Select model"
              optionFilterProp="children"
              // filterOption={(input, option) => option.children.includes(input)}
              // filterSort={(optionA, optionB) =>
              // optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              // }
              value={selectedModel}
              //onChange={value => setSelectedModel(value)}
            >
              {models.map((item, i) => {
                return (
                  <Option key={item.modelId} value={item.modelId}>
                    {item.modelName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <label className="label">
            Description<span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item name="ProjectDescription" rules={[{ required: true }]}>
            <TextArea className="modal-txtarea" />
          </Form.Item>

          <div className="modal-button">
            <Form.Item >
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
export default Projects;
