import { Divider } from "antd";
import React from "react";
import styled from "styled-components";
import { useSnapshot } from "valtio";
import state from "../store";
import SingleFile from "./SingleFile";

const Card = styled.div`
  width: 95%;
  height: auto;
`;

const ProjectName = styled.p`
  color: #000;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const NoFilesMessage = styled.div`
  color: #777;
  font-size: 16px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 12px;
  padding: 16px 0;
  margin-bottom: 16px;
`;

const ProjectCard = ({ project }) => {
  const snap = useSnapshot(state);

  const projectFiles = snap.files
    .filter((file) => file.projectId === project.projectId)
    .slice(0, 5);

  return (
    <Card>
      <ProjectName
        onClick={() => {
          state.selectedProject = project;
          state.dashboardActiveIndex = 4;
        }}
      >
        {project.name}
      </ProjectName>
      <Divider />
      {projectFiles.length > 0 ? (
        <div style={{ display: "flex" }}>
          {projectFiles.map((file) => (
            <SingleFile key={file.fileId} file={file}></SingleFile>
          ))}
        </div>
      ) : (
        <NoFilesMessage>No files here</NoFilesMessage>
      )}
    </Card>
  );
};

export default ProjectCard;
