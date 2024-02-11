import React, { useState } from "react";
import "../../styles/StylesProfile.css";
import PersonalInfo from "./PersonalInfo";
import TravelDocument from "./TravelDocument";

import type { MenuProps } from "antd";
import { Menu, Card } from "antd";
import HomeFooter from "../../components/home_footer";

const items: MenuProps["items"] = [
  {
    label: "Personal Info",
    key: "personalInfo", // Updated key for Personal Info
  },
  {
    label: "Travel Document",
    key: "travelDocument", // Updated key for Travel Document
  },
];

const Index: React.FC = () => {
  const [activeNavigation, setActiveNavigation] = useState("personalInfo");

  const handleNavigationClick = (navigation: string) => {
    setActiveNavigation(navigation);
  };

  const [current, setCurrent] = useState("personalInfo"); // Updated default value

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    handleNavigationClick(e.key); // Call handleNavigationClick to update activeNavigation
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div
            className="h-screen flex col-span-12 md:col-span-4"
            style={{ border: "1px solid black" }}
          >
            <Card style={{ width: "100%", margin: "auto 0" }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
          <div
            className="h-screen flex items-center justify-center col-span-12 md:col-span-8 p-8"
            style={{ border: "1px solid black" }}
          >
            <div
              className="bg-white p-8 rounded shadow-md card"
              style={{
                width: "100%",
                height: "638px",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              <div className="heading">
                <h1 className="profile-title">Profile</h1>
                <button className="btn-save">Save</button>
              </div>
              {/* <div className="navigation-card-second-column">
              <h2
              className={`personal-info-navigate ${
                activeNavigation === "personalInfo" ? "active" : ""
                }`}
                onClick={() => handleNavigationClick("personalInfo")}
              >
              Personal Info
              </h2>
              <h2
              className={`travel-document-navigate ${
                activeNavigation === "travelDocument" ? "active" : ""
              }`}
              onClick={() => handleNavigationClick("travelDocument")}
              >
              Travel Document
              </h2>
              </div>
            <hr /> */}
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
              />
              {activeNavigation === "personalInfo" && <PersonalInfo />}
              {activeNavigation === "travelDocument" && <TravelDocument />}
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default Index;
