import React from "react";
import styled from "styled-components";
import { Upload, Divider, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadFile } from "../services/upload_files";
import { createFile } from "../services/project_file_service";
import state from "../store";

const { Dragger } = Upload;

const Container = styled.div`
  width: 95%;
  height: 400px;
  margin-bottom: 32px;
`;

const Title = styled.p``;

const FileCard = ({ project }) => {
  // Define custom styles for the drag-and-drop area
  const draggerStyle = {
    padding: "16px",
    border: "2px dashed #d9d9d9",
    borderRadius: "8px",
    textAlign: "center",
  };

  // Handle file upload
  const handleFileUpload = async (info, project) => {
    if (info.file.status === "done") {
      const fileType = info.file.type;
      const url = await uploadFile(info.file, "uploads");
      createFile(project.projectId, info.file.name, url, fileType);
      //   state.files.push({
      //     projectId: project.projectId,
      //     name: info.file.name,
      //     downloadUrl: url,
      //     type: fileType,
      //   });
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Container>
      <Title>
        {`${project.name} `}
        {project.access === "admin" && "(Only Admin)"}
      </Title>
      <Divider />
      <Dragger
        style={draggerStyle}
        multiple={false}
        showUploadList={false}
        customRequest={({ onSuccess, onError, file }) => {
          onSuccess();
        }}
        height={150}
        onChange={(e) => {
          handleFileUpload(e, project);
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </Container>
  );
};

export default FileCard;
