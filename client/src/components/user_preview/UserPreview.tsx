import React from "react";

interface UserPreviewProps {
  name: string;
  position?: string;
}

const UserPreview: React.FC<UserPreviewProps> = ({ name }) => {
  return <div>{name}</div>;
};

export default UserPreview;
