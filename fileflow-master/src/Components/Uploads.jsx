import React, { useEffect } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import BodyTitle from "../Widgets/BodyTitle";
import { getFiles } from "../services/project_file_service";
import { message } from "antd";
import { useSnapshot } from "valtio";
import state from "../store";
import FileCard from "../Widgets/FileCard";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  border-radius: 25px;
  background: #f5f5f5;
  width: 100%;
  flex: 1;
  padding: 16px 34px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - 64px - 36px - 16px - 16px);
`;

const SearchContainer = styled.div`
  height: 36px;
  width: 360px;
  border-radius: 50px;
  background-color: #eef3ec;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
`;

const Uploads = () => {
  const snap = useSnapshot(state);
  useEffect(() => {
    getFiles()
      .then((res) => {
        state.files = res;
      })
      .catch((err) => {
        message.error(`${err}`);
      });
  }, []);
  return (
    <Container>
      <SearchContainer>
        <FaSearch style={{ color: "grey" }} />
        <div style={{ width: 16 }} />
        <SearchInput placeholder="Search Files" />
        <FaWindowClose style={{ color: "grey", cursor: "pointer" }} />
      </SearchContainer>
      <div style={{ height: 16 }} />
      <Body>
        <BodyTitle title={"Uploads"} />
        <div style={{ height: 16 }} />
        {snap.projects.map((project) => {
          return (
            <FileCard key={project.projectId} project={project}></FileCard>
          );
        })}
      </Body>
    </Container>
  );
};

export default Uploads;
