import React, { useEffect, useState } from "react";
import BodyTitle from "../Widgets/BodyTitle";
import styled from "styled-components";
import { getNotifications } from "../services/notification_service"; // Make sure to import the correct service
import { Divider, message } from "antd";
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

const AppNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await getNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        message.error(`Error fetching notifications: ${error.message}`);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <BodyTitle title={"Notifications"} />
      <div style={{ height: 16 }} />
      <Body>
        {notifications.map((notification) => (
          <div key={notification.id}>
            <p>{notification.message}</p>
            <p style={{ fontSize: 12 }}>
              {notification.timestamp.toDate().toLocaleString()}
            </p>
            <Divider />
          </div>
        ))}
      </Body>
    </div>
  );
};

export default AppNotifications;
