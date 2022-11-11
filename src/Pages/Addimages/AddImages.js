import { PlusCircleOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import { Modal, Upload, Form, Button, message, Empty } from "antd";
import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import api from "../../Components/Service/Api";
import "./Addimages.css";
// import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar"
// import TokenService from "../../Components/Service/TokenService";
import Header from "../../Components/Header/Header.js"

const layout = {
  labelCol: {
    span: 8,
  },

  wrapperCol: {
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,

    span: 8,
  },
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const AddImages = () => {
  const [form] = Form.useForm();
  // const Details = useLocation();
  const [loader, setLoader] = useState(false);
  // const navigate = useNavigate();
  // const projectDetails = TokenService.getProjectDetails();
  // const id = projectDetails.id;

  const onFinish = (values) => {
    console.log(values);
  };

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // const handleUpload = ({ fileList }) => {
  //   //---------------^^^^^----------------
  //   // this is equivalent to your "const img = event.target.files[0]"
  //   // here, antd is giving you an array of files, just like event.target.files
  //   // but the structure is a bit different that the original file
  //   // the original file is located at the `originFileObj` key of each of this files
  //   // so `event.target.files[0]` is actually fileList[0].originFileObj
  //   console.log('fileList', fileList);

  //   // you store them in state, so that you can make a http req with them later
  //   this.setState({ fileList });
  // };

  // const handleSubmit = (event) => {
  //   setLoader(true);
  //   console.log(fileList);
  //   let formData = new FormData();
  //   formData.append("ProjectId", id);
  //   fileList.map((i) => {
  //     return formData.append("Images", i.originFileObj);
  //   });
  //   api("/ProjectImage/upload", {
  //     method: "POST",
  //     data: formData,
  //     // headers: {
  //     //   "Content-Type": "multipart/form-data"
  //     // }
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
  //       setLoader(false);
  //       // navigate("/add-images/" +id);
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

  const uploadButton = (
    <div>
      <PlusCircleOutlined style={{ fontSize: "40px" }} />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Add Images
      </div>
    </div>
  );
  return (

    
    <div className="container">
      <Header />
      <Navbar />
      <div className="add-images-layout">
        {/* <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={true}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload> */}
        <div className="">
          <h2>Add Images</h2>

          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Upload
              
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              multiple={true}
              //action =""
              beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
              allowClear
              //directory
            >
              {uploadButton}
            </Upload>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                // onClick={handleSubmit}
                className="img-submit-btn"
                loading={loader}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddImages;
