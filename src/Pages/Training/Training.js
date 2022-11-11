import { Button, Form, Select, Table, Space, Pagination, message } from "antd";
// import { useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { Option } from "antd/lib/mentions";
// import api from "../../Components/Service/Api";
import "./Training.css";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";

const { Column } = Table;

const Training = () => {
  // const project_id = useParams();
  // const id = project_id.id;

  useEffect(() => {
    // loadTrainings(id);
  }, []);

  const [form] = Form.useForm();
  const [Trainings, setTrainings] = useState([]);

  // const loadTrainings = () => {
  //   api("/Training/GetTrainingList/"+id, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       let result = res.data;
  //       console.log(result.trainingList);
  //       setTrainings(result.trainingList);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       let error = err.response;
  //       if (error.success === false) {
  //         console.log("error");
  //       }
  //     });
  // };

  // const onFinish = (values) => {
  //   console.log("Received values of form:", values);
  //   values["ProjectId"] = id;
  //   console.log(values);
  //   api("/Training", {
  //     method: "POST",
  //     data: JSON.stringify(values),
  //   })
  //     .then((res) => {
  //       let response = res.data;
  //       console.log(response);
  //       message.success({
  //         content: response.response.message,
  //         duration: "5",
  //         className: "custom-class",
  //         style: {
  //           marginTop: "5vh",
  //           marginRight: "5vh",
  //           fontSize: "15px",
  //           textAlign: "right",
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       let error = err.response.data.response;
  //       if (error.success === false) {
  //         console.log(error.message);
  //         message.error({
  //           content: error.message,
  //           duration: "5",
  //           className: "custom-class",
  //           style: {
  //             marginTop: "5vh",
  //             marginRight: "5vh",
  //             fontSize: "15px",
  //             textAlign: "right",
  //           },
  //         });
  //       }
  //     });
  // };

  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="training-layout">
        <div className="training-table-container">
          <div className="table_layout">
            <Table pagination={false}
            //  dataSource={Trainings}
             >
              {/* <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
      </ColumnGroup> */}
              {/* <Column title="S.No" key="index" render={(value, item, index) =>  index+1}/> */}
              <Column title="S.No" dataIndex="num" key="num" />
              <Column
                title="Project Training Id"
                dataIndex="ProjectTrainingId"
                key="ProjectTrainingId"
              />
              <Column
                title="Project Version"
                dataIndex="TrainingVersion"
                key="TrainingVersion"
              />
              {/* <Column
                title="Progress Tracker URL"
                render={(_, record) => (
                  <Space size="middle">
                    <a href={record.url} target="_blank" rel="noreferrer">
                      {record.url}
                    </a>
                  </Space>
                )}
              /> */}
              {/* <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Show</a>
              <a>
                Edit
                {record.lastName}
              </a>
              <a>Delete</a>
            </Space>
          )}
        /> */}
            </Table>
            <br />
            {/* <Pagination
              current={1}
              //onChange={onChange}
              pageSize={10}
              total={20}
            /> */}
          </div>
        </div>

        <div className="training-form-container">
          <Form form={form} name="control-hooks"
          //  onFinish={onFinish}
           >
            {/* <Form.Item
              name="ModelId"
              label="Model Name"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Model"
                //onChange={onModelChange}
                allowClear
              >
                <Option value="6D99CFBA-A91E-4207-9301-4A2B7408C400">Mask RCNN</Option>
              </Select>
            </Form.Item> */}

            {/* <Button>Start Training</Button> */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Start New Training
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

export default Training;
