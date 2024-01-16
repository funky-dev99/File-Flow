import React, { useState } from "react";
import { Modal, Button, Checkbox, List } from "antd"; // Import the required Ant Design components

const UserSelectionModal = ({ visible, onCancel, onAddUser, userList }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleAddUsers = () => {
    // Call the onAddUser function with the selected users
    onAddUser(selectedUsers);
    // Close the modal
    onCancel();
  };

  return (
    <Modal
      title="Select Users"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAddUsers}>
          Add Users
        </Button>,
      ]}
    >
      <List
        dataSource={userList}
        renderItem={(user) => (
          <List.Item>
            <Checkbox
              onChange={() => handleUserSelection(user.projectId)}
              checked={selectedUsers.includes(user.projectId)}
            >
              {user.name}
            </Checkbox>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default UserSelectionModal;
