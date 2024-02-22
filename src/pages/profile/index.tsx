import React, { useState } from "react";
import "../../styles/StylesProfile.css";
import PersonalInfo from "./PersonalInfo";
import TravelDocument from "./TravelDocument";
import { ConfigProvider, Layout, Menu, MenuProps } from "antd/lib";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import HomeFooter from "../../components/home_footer";
import HomeNavSide from "../../components/home_navside";
import HeaderComponent from "../../components/Header";

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

dayjs.extend(customParseFormat);

const { Content, Footer } = Layout;

const Index: React.FC = () => {
  const [activeNavigation, setActiveNavigation] = useState("personalInfo");
  const [current, setCurrent] = useState("personalInfo"); // Updated default value
  const [formValues, setFormValues] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    nationality: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    // ... other form fields
  });

  const handleNavigationClick = (navigation: string) => {
    setActiveNavigation(navigation);
  };

  const onClick = (e: any) => {
    setCurrent(e.key);
    handleNavigationClick(e.key);
  };

  const handleSaveButtonClick = () => {
    // Handle saving logic based on the active section
    if (activeNavigation === "personalInfo") {
      // Implement savePersonalInfo logic if needed
      // Perbarui formValues dengan data dari PersonalInfo
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        dateOfBirth: formValues.dateOfBirth,
      }));
      console.log("Saving personal information:", formValues);
    } else if (activeNavigation === "travelDocument") {
      // Implement saveTravelDocument logic if needed
      console.log("Saving travel document information:", formValues);
    }
    // Add more conditions for other sections if needed
  };

  return (
    <ConfigProvider>
      <Layout>
        <HeaderComponent />
        <Content>
          <div className="my-5">
            <div className="grid grid-cols-10 gap-5">
              <HomeNavSide />
              <div className="col-start-1 col-span-10 xl:col-start-4 xl:col-span-6 px-8 py-3 bg-white rounded-[16px] border border-gray-200 flex-col justify-center items-start inline-flex">
                <div className="flex w-full justify-between items-center text-start font-['Plus Jakarta Sans']  mb-6">
                  <h1 className="text-black font-medium text-3xl">Profile</h1>
                  <button
                    className="w-44 justify-center rounded-md bg-primary text-white p-4"
                    onClick={handleSaveButtonClick}
                  >
                    Save
                  </button>
                </div>
                <div className="w-full min-h-[562px]">
                  <div className="container mx-auto">
                    <div className="grid w-full gap-4">
                      <div className="flex col-span-12">
                        <div
                          className="bg-white p-1 rounded card"
                          style={{
                            width: "100%",
                            height: "800px",
                            overflow: "scroll",
                            overflowX: "hidden",
                          }}
                        >
                          <Menu
                            onClick={onClick}
                            selectedKeys={[current]}
                            mode="horizontal"
                            items={items}
                          />
                          {activeNavigation === "personalInfo" && (
                            <PersonalInfo
                              formValues={formValues}
                              setFormValues={setFormValues}
                            />
                          )}
                          {activeNavigation === "travelDocument" && (
                            <TravelDocument
                            // formValues={formValues}
                            // setFormValues={setFormValues}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Footer
          style={{
            padding: 0,
          }}
        >
          <HomeFooter />
        </Footer>
      </Layout>{" "}
    </ConfigProvider>
  );
};

export default Index;
