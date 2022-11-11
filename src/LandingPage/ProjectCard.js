import { Button, Form, Input, Modal, message, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
// import project2 from "../../assets/businesspeople-working.jpg";
// import { useNavigate } from "react-router-dom";
// import TokenService from "../../Components/Service/TokenService";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./Projects.css";
// import api from "../../Components/Service/Api";

function ProjectCard({ projectDetails }) {
  // const navigate = useNavigate();
  // const handleProject = () => {
  //   TokenService.setProjectDetails(projectDetails);
  //   navigate("/add-images/" + projectDetails.id);
  // };

  const [isLoaded, setisLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState(projectDetails.projectName);
  const [projectDescription, setProjectDescription] = useState(projectDetails.projectDescription);
  const [taskTypes, setTaskTypes] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState();
  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue({
      projectName: projectDetails.projectName,
      projectDescription: projectDetails.projectDescription,
    });
  }, []);

  // const loadProjects = (values) => {
  //   api("/Project/getallprojects", {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       let response = res.data;
  //       setProjects(response.project);
  //       setisLoaded(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       let error = err.response.data;
  //       if (error.status === false) {
  //         console.log("error");
  //       }
  //     });
  // };


  // const loadTaskTypes = () => {
  //   setSelectedModel(null);
  //   api("/ModelTask/GetAllModelTasks", {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       let response = res.data;
  //       console.log(response);
  //       setTaskTypes(response.modelTask);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       let error = err.response.data;
  //       if (error.status === false) {
  //         console.log("error");
  //       }
  //     });
  // };

  // const loadModel = (e) => {
  //   form.resetFields(["ModelId"]);
  //   console.log(e);
  //   api("/Model/GetModelsOnTask/" + e, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       let response = res.data;
  //       console.log(response);
  //       setModels(response.models);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       let error = err.response.data;
  //       if (error.status === false) {
  //         console.log("error");
  //       }
  //     });
  // };

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

  return (
    // <Link
    //     className="link"
    //     to={`/add-images/`+ projectDetails.id}
    //     state={{ projectDetails }}
    //     component={<AddImages props="projectDetails" />
    //     }
    //   >
    <div className="card-layout">
      <div className="project-image" 
      // onClick={() => handleProject()}
      >
        {/* <img src={project2} alt="" className="card-image" /> */}
      </div>
      <div className="project-Text-container">
        <p className="create-new-text">{projectDetails.projectName}</p>
        <div className="project-model-task-container">
          <p className="project-model">Model :</p>
          <p className="project-task">Task Type :</p>
        </div>
        <span className="create-project-span">
          {projectDetails.projectDescription}
        </span>
      </div>
      <div className="project-action-icons">
        <EditOutlined onClick={showModal} />
        <DeleteOutlined />
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
          // onFinish={onFinish}
          className="modal-innerlayout"
        >
          <p className="create-project-title"> Project</p>
          <label className="label">
            Project Name<span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item
            name="projectName"
            // rules={[
            //   {
            //     required: true,
            //     message: "Project name is required",
            //   },
            // ]}
          >
            <Input className="modal-input" onChange={({ target }) => setProjectName(target.value)}  />
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
              // onChange={(e, label) => {
              //   loadModel(e);
              // }}
            >
              <Option
              //  key={item.modelTaskId}
              //  value={item.modelTaskId}
              >
                {/* {item.taskName} */}
              </Option>
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
          <Form.Item name="projectDescription"
           rules={[{ required: true }]}
           >
            <Input className="modal-txtarea" onChange={({ target }) => setProjectDescription(target.value)}  />
          </Form.Item>

          <div className="modal-button">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                htmlType="button"
                //  onClick={onReset}
              >
                Reset
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
    // </Link>
  );
}

export default ProjectCard;
