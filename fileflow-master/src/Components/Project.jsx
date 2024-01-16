import React, { useEffect, useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import { Modal, message, Upload, Button } from "antd";
import BodyTitle from "../Widgets/BodyTitle";
import { createFile, getFiles } from "../services/project_file_service";
import { useSnapshot } from "valtio";
import state from "../store";
import SingleFile from "../Widgets/SingleFile";
import file from "../assets/file-plus-01.svg";
import { uploadFile } from "../services/upload_files";
import { getUsers } from "../services/auth_service";
import AssignedUsersModal from "../Widgets/AssaignedUserModal";
import UserSelectionModal from "../Widgets/UserSelectionModal";
import { addUserToProject } from "../services/project_service";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 0.5px;
  height: 25.8px;
  flex-shrink: 0;
  background-color: #c4cafc;
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

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`;

const Project = () => {
  const snap = useSnapshot(state);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [userList, setUserList] = useState([]);
  const [assignedUsers, setAssagnedUsers] = useState([]);
  useEffect(() => {
    getUsers()
      .then((users) => {
        let aUsers = [];
        users.forEach((user) => {
          if (snap.selectedProject.users.includes(user.projectId)) {
            aUsers.push(user);
          }
        });
        setAssagnedUsers(aUsers);
        const filteredUsers = users.filter(
          (user) =>
            !snap.selectedProject.users.includes(user.projectId) &&
            user.userRole == "Normal user"
        );
        setUserList(filteredUsers);
      })
      .catch((err) => {
        message.error(`${err}`);
      });
  }, [snap.selectedProject.users]);

  const projectFiles = snap.files.filter(
    (file) => file.projectId === snap.selectedProject.projectId
  );

  const filteredFiles = projectFiles.filter((file) =>
    file.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleAddFileClick = () => {
    setUploadModalVisible(true);
  };

  const handleUploadModalCancel = () => {
    setUploadModalVisible(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchInput("");
  };
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [assaignedUserModalVisible, setAssaignedUserModalVisible] =
    useState(false);

  const handleAddUserClick = () => {
    setUserModalVisible(true);
  };

  const [assignedUsersModalVisible, setAssignedUsersModalVisible] =
    useState(false);

  const handleAssignedUserClick = () => {
    setAssignedUsersModalVisible(true);
  };

  const handleAssignedUserModalCancel = () => {
    setAssignedUsersModalVisible(false);
  };

  const handleUserModalCancel = () => {
    setUserModalVisible(false);
  };

  const handleAddUsers = async (selectedUsers) => {
    for (var id of selectedUsers) {
      await addUserToProject(snap.selectedProject.projectId, id);
    }
    state.selectedProject["users"] = [...selectedUsers];
    setUserModalVisible(false);
  };
  const UploadModal = ({ visible, onCancel }) => {
    const [selectedFile, setSelectedFile] = useState();

    const handleChange = (info) => {
      setSelectedFile(info);
    };

    const customRequest = ({ file, onSuccess, onError }) => {};

    const handleUpload = async () => {
      try {
        const fileType = selectedFile.file.type;
        const url = await uploadFile(selectedFile.file, "uploads");
        await createFile(
          snap.selectedProject.projectId,
          selectedFile.file.name,
          url,
          fileType
        );
        await getFiles().then((res) => {
          state.files = res;
        });
        message.success("Files uploaded successfully");
        onCancel();
      } catch (err) {
        message.error(`${err}`);
      }
    };

    return (
      <Modal
        title="Add File"
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpload}>
            Upload
          </Button>,
        ]}
      >
        <Upload
          onChange={handleChange}
          customRequest={customRequest}
          beforeUpload={() => false}
          maxCount={1} // Allow only one file
        >
          <Button icon={<FaSearch />}>Select File</Button>
        </Upload>
      </Modal>
    );
  };

  return (
    <Container>
      <SearchContainer>
        <FaSearch style={{ color: "grey" }} />
        <div style={{ width: 16 }} />
        <SearchInput
          placeholder="Search Files"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <FaWindowClose
          style={{ color: "grey", cursor: "pointer" }}
          onClick={handleSearchClear}
        />
      </SearchContainer>
      <div style={{ height: 16 }} />
      <Body>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BodyTitle title={`Home > ${snap.selectedProject.name}`} />
          {snap.canAddFiles && (
            <div style={{ display: "flex", gap: 8 }}>
              <ButtonWrapper onClick={handleAddFileClick}>
                <ButtonText>Add File</ButtonText>
                <Divider />
                <img src={file} alt="File Icon" />
              </ButtonWrapper>
              <ButtonWrapper onClick={handleAddUserClick}>
                <ButtonText>Add Users</ButtonText>
              </ButtonWrapper>
              <ButtonWrapper onClick={handleAssignedUserClick}>
                <ButtonText>Assigned Users</ButtonText>
              </ButtonWrapper>
            </div>
          )}
        </div>
        <div style={{ height: 16 }} />
        <Body>
          {filteredFiles.length > 0 ? (
            <FileGrid>
              {filteredFiles.map((file) => (
                <SingleFile key={file.fileId} file={file}></SingleFile>
              ))}
            </FileGrid>
          ) : (
            <NoFilesMessage>No files here</NoFilesMessage>
          )}
          <UploadModal
            visible={uploadModalVisible}
            onCancel={handleUploadModalCancel}
          />
        </Body>
      </Body>
      <UserSelectionModal
        visible={userModalVisible}
        onCancel={handleUserModalCancel}
        onAddUser={handleAddUsers}
        userList={userList}
      />{" "}
      <AssignedUsersModal
        visible={assignedUsersModalVisible}
        onCancel={handleAssignedUserModalCancel}
        assignedUsers={assignedUsers}
      />
    </Container>
  );
};

export default Project;
