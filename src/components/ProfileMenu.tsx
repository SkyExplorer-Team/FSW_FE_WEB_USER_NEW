import React from "react";
import { Menu } from "antd/lib";
import {
  HomeOutlined,
  UserOutlined,
  BellOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const ProfileMenu: React.FC = () => {
  const navigate = useNavigate();


  const handleProfile = () => {
    navigate("/profile");
  };

  const handleNotifications = () => {
    navigate("/notifications");
  };

  const handleSavedTravelers = () => {
    navigate("/saved-travelers");
  };

  const handleAccountSettings = () => {
    navigate("/account-settings");
  };
  return (
    <Menu>
      <Menu.Item className="px-2" key="1">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-[#EAFDF6]">
            <HomeOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <Link
              to="/trips"
              className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
            >
              Trips
            </Link>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item className="px-2" key="2">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <UserOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <Link
              onClick={handleProfile}
              to="/profile"
              className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
            >
              Profile
            </Link>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item className="px-2" key="3">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <BellOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <Link
              to="/notifications"
              onClick={handleNotifications}
              className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
            >
              Notifications
            </Link>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item className="px-2" key="4">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <TeamOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <Link
              to="/saved-travelers"
              onClick={handleSavedTravelers}
              className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
            >
              Saved Travelers
            </Link>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item className="px-2" key="5">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <SettingOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <Link
              to="/account-settings"
              onClick={handleAccountSettings}
              className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
            >
              Account Settings
            </Link>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item className="px-2" key="6">
        <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
          <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
            <LogoutOutlined />
          </div>
          <div className="flex items-center justify-center text-center">
            <p className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
              Sign Out
            </p>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default ProfileMenu;
