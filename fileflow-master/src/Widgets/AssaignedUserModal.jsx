import React from "react";
import { Modal, Button, List, Popconfirm } from "antd";
import { removeUserFromProject } from "../services/project_service";
import { useSnapshot } from "valtio";
import state from "../store";

const AssignedUsersModal = ({
  visible,
  onCancel,
  assignedUsers,
  onDeleteUser,
}) => {
  const snap = useSnapshot(state);
  const handleDeleteUser = (userId) => {
    removeUserFromProject(snap.selectedProject.projectId, userId);
    state.selectedProject.users = state.selectedProject.users.filter(
      (id) => id !== userId
    );
  };

  return (
    <Modal
      title="Assigned Users"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <List
        size="small"
        bordered
        dataSource={assignedUsers}
        renderItem={(user) => (
          <List.Item>
            {user.name}
            <Popconfirm
              title="Are you sure to remove this user?"
              onConfirm={() => handleDeleteUser(user.projectId)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Remove
              </Button>
            </Popconfirm>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default AssignedUsersModal;
