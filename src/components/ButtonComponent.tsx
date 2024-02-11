import React from "react";
import { Button } from "antd";

interface ButtonComponentProps {
  type: "primary" | "text" | "link" | "default" | "dashed" | "disabled";
  icon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

const getButtonStyle = (type: string) => {
  switch (type) {
    case "primary":
      return "custom-primary";
    case "text":
      return "custom-text";
    case "link":
      return "custom-link";
    case "default":
      return "custom-default";
    case "dashed":
      return "custom-dashed";
    case "disabled":
      return "custom-disabled";
    default:
      return "";
  }
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  type,
  icon,
  onClick,
  children,
}) => {
  const buttonStyle = getButtonStyle(type);

  return (
    <Button
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type={type === "text" ? "link" : (type as any)}
      icon={icon}
      onClick={onClick}
      className={`custom-button ${buttonStyle}`}
      disabled={type === "disabled"}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
