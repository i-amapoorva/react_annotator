import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Space, Select,message } from 'antd';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Option } from "antd/lib/mentions";
import api from "../../Components/Service/Api";
import './Annotate.css';
import Header from '../../Components/Header/Header';
import Navbar from "../../Components/Navbar/Navbar";
import TextArea from 'antd/lib/input/TextArea';




const Annotation = () => {
  const project_id = useParams();
  const id = project_id.id;
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  //console.log(id);
  
  useEffect(() => {
    loadImages(id);
  }, []);

  const loadImages = (id) =>{
    api("/ProjectImage/"+id, {
      method: "GET",
    })
      .then((res) => {
        let response = res.data;
        console.log(response);
        setImages(response.projectImages);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.data;
        if (error.status === false) {
          console.log("error");
        }
      });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const onFinish = (values) => {
    setLoader(true);
    console.log('Received values of form:', values);
    let annotations = values['annotations'];
    for (let i = 0; i < annotations.length; i++) {
        annotations[i]['ProjectId'] = id;
        console.log(annotations[i]);
        api("/Annotation", {
            method: "POST",
            data: JSON.stringify(annotations[i]),
          })
            .then((res) => {
              let response = res.data;
              console.log(response);
              message.success({
                content: response.response.message,
                duration:'5',
                className: 'custom-class',
                style: {
                  marginTop: '5vh',
                  marginRight: '5vh',
                  fontSize:'15px',
                  textAlign:"right"
                },
              });
              setLoader(false);
              window.location.reload();
              // navigate("/annotate/" +id);
            })
            .catch((err) => {
              console.log(err);
              let error = err.response.data.response;
              if (error.success === false) {
                console.log(error.message);
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
    }
  };

  
  return (
    <div className='container'>
      <Header 
        //projectName={projectName}
      />
      <Navbar />
      <div className="annotation-screen-container">
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="annotations">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => ( 
                    <Space
                        key={key}
                        style={{
                        display: 'flex',
                        marginBottom: 8,
                        }}
                        align="baseline"
                    >
                        <Form.Item
                            {...restField}
                            name={[name, 'ProjectImageId']}
                            rules={[
                            {
                                required: true,
                                message: "Missing image selection",
                            },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Select Image"
                                optionFilterProp="children"
                                filterOption={(input, option) => {
                                  return (//console.log(option.children.props.children['1']),
                                    option.children.props.children['1'].toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  );
                                  
                                }}
                                //filterOption={(input, option) => option.children.includes(input)}
                                // filterSort={(optionA, optionB) =>
                                // optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())                                
                                // }
                                onChange={(e,label) => { //console.log(label.children);
                                  }}
                            >
                              {
                                images.map((item, i) => { 
                                  return (
                                    <Option key = {item.id} value={item.projectImageId}>
                                      <p><img src={item.imageUrl} alt="pic" width="30px" height="30px" />{item.imageName}</p>
                                    </Option>                                      
                                  );
                                })
                              }
                            </Select>
                        </Form.Item>

                        <Form.Item
                        {...restField}
                        name={[name, 'BoundingBox']}
                        rules={[
                            {
                            required: true,
                            message: 'Missing bounding box',
                            },
                        ]}
                        >
                        <TextArea placeholder="Bounding box" />
                        </Form.Item>
                        
                        <Form.Item
                        {...restField}
                        name={[name, 'Segmentation']}
                        rules={[
                            {
                            required: true,
                            message: 'Missing Segmentation',
                            },
                        ]}
                        >
                        <TextArea placeholder="Segmentation" />
                        </Form.Item>

                        <Form.Item
                        {...restField}
                        name={[name, 'ClassName']}
                        rules={[
                            {
                            required: true,
                            message: 'Missing class',
                            },
                        ]}
                        >
                        <TextArea placeholder="class" />
                        </Form.Item>                      

                        <MinusCircleOutlined onClick={() => remove(name)} />                        
                    </Space>
                    ))}
                    <Form.Item>
                    <Button type="dashed" className='add-img-conatiner' onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Annotation
                    </Button>
                    </Form.Item>
                </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit" className='annotate-submit-btn' loading={loader}>
                Submit
                </Button>
            </Form.Item>
            </Form>


            <Modal title="Image Preview" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <img src='' alt='Preview' width="100%"/>
            </Modal>

      </div>     
    </div>
  );
};

export default Annotation;
