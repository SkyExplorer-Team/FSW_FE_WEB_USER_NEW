import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import { ConfigProvider, Dropdown, Layout, Pagination, Menu } from "antd";
import { MenuProps } from "antd/lib";
import { DownOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import HomeFooter from "../../components/home_footer";
import HomeNavSide from "../../components/home_navside";
import HeaderComponent from "../../components/Header";

dayjs.extend(customParseFormat);

const { Header, Content, Footer } = Layout;

const api_base_url = "https://be-java-master-production.up.railway.app";

const menu = (
  <Menu>
    <div className="px-2">
      <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-[#EAFDF6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.66734 18.3333H13.334C16.684 18.3333 17.284 16.9917 17.459 15.3583L18.084 8.69167C18.309 6.65833 17.7257 5 14.1673 5H5.834C2.27567 5 1.69234 6.65833 1.91734 8.69167L2.54234 15.3583C2.71734 16.9917 3.31734 18.3333 6.66734 18.3333Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.66406 4.99935V4.33268C6.66406 2.85768 6.66406 1.66602 9.33073 1.66602H10.6641C13.3307 1.66602 13.3307 2.85768 13.3307 4.33268V4.99935"
              stroke="#677084"
              stroke-width="1.25"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.6693 10.8333V11.6667C11.6693 11.675 11.6693 11.675 11.6693 11.6833C11.6693 12.5917 11.6609 13.3333 10.0026 13.3333C8.3526 13.3333 8.33594 12.6 8.33594 11.6917V10.8333C8.33594 10 8.33594 10 9.16927 10H10.8359C11.6693 10 11.6693 10 11.6693 10.8333Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.0391 9.16602C16.1141 10.566 13.9141 11.3993 11.6641 11.6827"
              stroke="#677084"
              stroke-width="1.25"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.17969 9.39062C4.05469 10.674 6.17135 11.449 8.32969 11.6906"
              stroke="#677084"
              stroke-width="1.25"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center text-center">
          <a
            href="#"
            className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
          >
            Trips
          </a>
        </div>
      </div>
      <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10.1302 9.05768C10.0469 9.04935 9.94687 9.04935 9.85521 9.05768C7.87187 8.99102 6.29688 7.36602 6.29688 5.36602C6.29687 3.32435 7.94687 1.66602 9.99687 1.66602C12.0385 1.66602 13.6969 3.32435 13.6969 5.36602C13.6885 7.36602 12.1135 8.99102 10.1302 9.05768Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.96563 12.134C3.94896 13.484 3.94896 15.684 5.96563 17.0257C8.25729 18.559 12.0156 18.559 14.3073 17.0257C16.324 15.6757 16.324 13.4757 14.3073 12.134C12.024 10.609 8.26562 10.609 5.96563 12.134Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center text-center">
          <a
            href="#"
            className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
          >
            Profile
          </a>
        </div>
      </div>
      <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10.0175 2.42578C7.25914 2.42578 5.01747 4.66745 5.01747 7.42578V9.83411C5.01747 10.3424 4.80081 11.1174 4.54247 11.5508L3.58414 13.1424C2.99247 14.1258 3.40081 15.2174 4.48414 15.5841C8.07581 16.7841 11.9508 16.7841 15.5425 15.5841C16.5508 15.2508 16.9925 14.0591 16.4425 13.1424L15.4841 11.5508C15.2341 11.1174 15.0175 10.3424 15.0175 9.83411V7.42578C15.0175 4.67578 12.7675 2.42578 10.0175 2.42578Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M11.5599 2.66719C11.3016 2.59219 11.0349 2.53385 10.7599 2.50052C9.9599 2.40052 9.19323 2.45885 8.47656 2.66719C8.71823 2.05052 9.31823 1.61719 10.0182 1.61719C10.7182 1.61719 11.3182 2.05052 11.5599 2.66719Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.5156 15.8828C12.5156 17.2578 11.3906 18.3828 10.0156 18.3828C9.33229 18.3828 8.69896 18.0995 8.24896 17.6495C7.79896 17.1995 7.51562 16.5661 7.51562 15.8828"
              stroke="#677084"
              stroke-width="1.25"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center text-center">
          <a
            href="#"
            className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
          >
            Account Settings
          </a>
        </div>
      </div>
      <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M18.3346 3.89174V13.9501C18.3346 14.7501 17.6846 15.5001 16.8846 15.6001L16.6096 15.6334C14.793 15.8751 11.9929 16.8001 10.3929 17.6834C10.1763 17.8084 9.81798 17.8084 9.59298 17.6834L9.55961 17.6668C7.95961 16.7918 5.16799 15.8751 3.35966 15.6334L3.11796 15.6001C2.31796 15.5001 1.66797 14.7501 1.66797 13.9501V3.8834C1.66797 2.89173 2.47628 2.14174 3.46795 2.22508C5.21795 2.36674 7.86794 3.2501 9.35128 4.1751L9.55961 4.30007C9.80128 4.45007 10.2013 4.45007 10.443 4.30007L10.5846 4.20841C11.1096 3.88341 11.7763 3.55841 12.5013 3.26674V6.66676L14.168 5.55841L15.8346 6.66676V2.31678C16.0596 2.27511 16.2763 2.25008 16.4763 2.23342H16.5263C17.518 2.15008 18.3346 2.89174 18.3346 3.89174Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 4.57422V17.0742"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.8333 2.31641V6.66638L14.1667 5.55803L12.5 6.66638V3.26637C13.5917 2.83303 14.8083 2.48307 15.8333 2.31641Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center text-center">
          <a
            href="#"
            className="font-medium text-base text-[#677084] group-hover:text-[#227879]"
          >
            Account Settings
          </a>
        </div>
      </div>
      <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2.5 7.59115V12.3995C2.5 14.1661 2.5 14.1661 4.16667 15.2911L8.75 17.9411C9.44167 18.3411 10.5667 18.3411 11.25 17.9411L15.8333 15.2911C17.5 14.1661 17.5 14.1661 17.5 12.4078V7.59115C17.5 5.83281 17.5 5.83281 15.8333 4.70781L11.25 2.05781C10.5667 1.65781 9.44167 1.65781 8.75 2.05781L4.16667 4.70781C2.5 5.83281 2.5 5.83281 2.5 7.59115Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center text-center">
          <a
            href="#"
            className="font-medium text-base text-[#677084]  group-hover:text-[#227879]"
          >
            Account Settings
          </a>
        </div>
      </div>
      <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.41406 6.29922C7.6724 3.29922 9.21406 2.07422 12.5891 2.07422H12.6974C16.4224 2.07422 17.9141 3.56589 17.9141 7.29089V12.7242C17.9141 16.4492 16.4224 17.9409 12.6974 17.9409H12.5891C9.23906 17.9409 7.6974 16.7326 7.4224 13.7826"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.499 10H3.01562"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.8737 7.20898L2.08203 10.0007L4.8737 12.7923"
              stroke="#677084"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center text-center">
          <p className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
            Sign Out
          </p>
        </div>
      </div>
    </div>
  </Menu>
);

const AccountSettings: React.FC = () => {
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  const [currentPageActive, setCurrentPageActive] = useState(1);
  const pageSize = 4;

  const handlePageChangeActive = (page: number) => {
    setCurrentPageActive(page);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#38A993",
          borderRadius: 2,
          colorPrimaryTextHover: "#38A993",

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
      }}
    >
      <Layout>
        <HeaderComponent />
        <Content>
          <div className="my-5">
            <div className="grid grid-cols-10 gap-5">
              <HomeNavSide />
              <div className="col-start-1 col-span-10 xl:col-start-4 xl:col-span-6 px-8 py-3 bg-white rounded-[16px] shadow border border-gray-200 flex-col justify-center items-start inline-flex">
                <div className="text-start font-['Plus Jakarta Sans']  mb-6">
                  <h1 className="text-[#111] font-medium text-3xl">
                    Account Settings
                  </h1>
                  <p className="text-neutral">
                    Make booking easier and faster by saving family, friends,
                    and partners details.
                  </p>
                </div>
                <div className="w-full min-h-[562px]">
                  <div className="w-full grid grid-cols-10 gap-1">
                    <div className="w-full col-start-1 col-span-10 flex-col justify-center items-start inline-flex"></div>
                  </div>
                </div>
                <div
                  className="w-full col-start-1 col-span-10 flex-col justify-bottom items-bottom "
                  style={{ textAlign: "center" }}
                >
                  {/* <Pagination
                    total={notifications.length}
                    defaultPageSize={pageSize}
                    current={currentPageActive}
                    onChange={handlePageChangeActive}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    hideOnSinglePage={true}
                    className="my-1"
                  /> */}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2"></div>
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

export default AccountSettings;
