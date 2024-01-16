import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import BodyTitle from "../Widgets/BodyTitle";
import file from "../assets/file-plus-01.svg";
import Modal from "react-modal";
import { createProject, getProjects } from "../services/project_service";
import folder from "../assets/folder.svg";
import FilledButton from "../Widgets/FilledButton";
import OutlinedButton from "../Widgets/OutlinedButton";
import { message } from "antd";
import { useSnapshot } from "valtio";
import state from "../store/index";
import ProjectCard from "../Widgets/ProjectCard";
import { getFiles } from "../services/project_file_service";
const ModalDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: grey;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

const ButtonWrapper = styled.div`
  fill: #fff;
  stroke-width: 1px;
  border: 1px solid #4a9230;
  border-radius: 6px;
  padding: 8px 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
`;

const ButtonText = styled.div`
  color: #4a9230;
  font-size: 15px;
  font-style: italic;
  font-weight: 400;
  line-height: 22px; /* 146.667% */
`;

const Divider = styled.div`
  width: 0.5px;
  height: 25.8px;
  flex-shrink: 0;
  background-color: #c4cafc;
`;

// Set up react-modal
Modal.setAppElement("#root"); // Replace with the root element of your app

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const projectName = useRef();
  const [accessLevel, setAccessLevel] = useState("admin");
  const snap = useSnapshot(state);
  const [searchInput, setSearchInput] = useState("");

  const handleAccessChange = (e) => setAccessLevel(e.target.value);
  const handleCreateProjectClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleCreateProject = async (name, access) => {
    await createProject(name, access);
    await getProjects()
      .then((res) => {
        state.projects = res;
      })
      .catch((err) => {
        message.error(`${err}`);
      });
    handleCloseModal();
  };
  const CreateProjectModal = ({ onClose }) => {
    return (
      <div
        style={{
          widht: "60vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={folder} alt="Folder Icon" />
          <div style={{ width: 4 }} />
          <p>Create New Project</p>
          <div style={{ flex: 1 }} />
          <FaWindowClose style={{ cursor: "pointer" }} onClick={onClose} />
        </div>
        <ModalDivider />
        <div style={{ height: 16 }} />
        <div style={{ width: "95%" }}>
          <label>Name</label>
          <div
            style={{
              width: "95%",
              border: "0.5px solid grey",
              height: "40px",
              padding: "0 0 0 10px",
            }}
          >
            <input
              style={{
                outline: "none",
                border: "none",
                width: "100%",
                height: "100%",
              }}
              ref={projectName}
              placeholder="Project Name"
            />
          </div>
        </div>
        <div style={{ height: "16px" }} />
        <div style={{ width: "95%" }}>
          <label>Who can access</label>
          <div style={{ height: 5 }} />
          <div
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "#F7F5F2",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label style={{ margin: "auto 10px", fontSize: "12px" }}>
              <input
                type="radio"
                name="access"
                value="admin"
                checked={accessLevel === "admin"}
                onChange={handleAccessChange}
              />
              {` Admin`}
            </label>
          </div>
          <div style={{ height: "12px" }} />
          <div
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "#F7F5F2",
              display: "flex",
            }}
          >
            <label style={{ margin: "auto 10px", fontSize: "12px" }}>
              <input
                type="radio"
                name="access"
                value="anyone"
                checked={accessLevel === "anyone"}
                onChange={handleAccessChange}
              />
              {`  Anyone Can Access`}
            </label>
          </div>
        </div>
        <div style={{ height: 15 }} />
        <div style={{ display: "flex", flexDirection: "row", width: "95%" }}>
          <div style={{ flex: 1 }} />
          <OutlinedButton onClick={onClose} text={"Cancel"} width={"70px"} />
          <div style={{ width: 8 }} />
          <FilledButton
            onClick={() => {
              handleCreateProject(projectName.current.value, accessLevel);
            }}
            text={"Create"}
            width={"70px"}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    getProjects()
      .then((res) => {
        state.projects = res;
      })
      .catch((err) => {
        message.error(`${err}`);
      });
    getFiles()
      .then((res) => {
        state.files = res;
      })
      .catch((err) => {
        message.error(`${err}`);
      });
  }, []);

  // Filter projects based on search input and user access
  const filteredProjects = snap.projects
    .filter((project) =>
      project.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter((project) => {
      if (snap.currentUser?.userRole === "Normal user") {
        return project.users?.includes(snap.currentUser?.id);
      }
      return true;
    });

  return (
    <Container>
      <SearchContainer>
        <FaSearch style={{ color: "grey" }} />
        <div style={{ width: 16 }} />
        <SearchInput
          placeholder="Search Projects"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <FaWindowClose
          style={{ color: "grey", cursor: "pointer" }}
          onClick={() => setSearchInput("")}
        />
      </SearchContainer>
      <div style={{ height: 16 }} />
      <Body>
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BodyTitle title={"Home"} />
          {snap.canCreateProject && (
            <ButtonWrapper onClick={handleCreateProjectClick}>
              <ButtonText>Create Project</ButtonText>
              <Divider />
              <img src={file} alt="File Icon" />
            </ButtonWrapper>
          )}
        </div>
        <div style={{ height: 12 }} />
        <div>
          {filteredProjects.map((doc) => (
            <ProjectCard key={doc.projectId} project={doc} />
          ))}
        </div>
      </Body>

      {/* Render react-modal for the Create Project modal */}
      <Modal
        isOpen={isModalVisible}
        onRequestClose={handleCloseModal}
        contentLabel="Create Project"
        style={{
          content: {
            width: "60vw",
            maxWidth: "400px",
            maxHeight: "350px",
            margin: "auto",
          },
        }}
      >
        <CreateProjectModal onClose={handleCloseModal} />
      </Modal>
    </Container>
  );
};

export default Home;
