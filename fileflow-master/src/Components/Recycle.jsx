import React, { useEffect, useState } from "react";
import BodyTitle from "../Widgets/BodyTitle";
import styled from "styled-components";
import { getBinFiles } from "../services/project_file_service";
import { message } from "antd";
import SingleFile from "../Widgets/SingleFile";

const Body = styled.div`
  border-radius: 25px;
  background: #f5f5f5;
  width: 100%;
  padding: 16px 34px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 64px - 36px - 16px - 100px);
  max-height: calc(100vh - 64px - 36px - 16px - 100px);
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`;

const Recycle = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    getBinFiles()
      .then((res) => {
        setFiles(res);
      })
      .catch((err) => {
        message.error(`${err}`);
      });
  }, []);
  return (
    <div>
      <BodyTitle title={"Bin"} />
      <div style={{ height: 16 }} />
      <Body>
        <FileGrid>
          {files.map((file) => (
            <SingleFile
              fromRecycle={true}
              key={file.fileId}
              file={file}
            ></SingleFile>
          ))}
        </FileGrid>
      </Body>
    </div>
  );
};

export default Recycle;
