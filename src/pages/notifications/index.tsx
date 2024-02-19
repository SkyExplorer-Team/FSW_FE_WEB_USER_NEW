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
            Notifications
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
            Saved Travelers
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

interface GroupedNotification {
  group: string;
  notifications: Notification[];
}

const groupNotificationsByTime = (
  notifications: Notification[]
): GroupedNotification[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const groupedNotifications: { [key: string]: GroupedNotification } = {};

  for (const notification of notifications) {
    const notificationDate = notification.notificationTime.toDate(); // Convert Dayjs to Date
    notificationDate.setHours(0, 0, 0, 0);

    let group: string;

    if (notificationDate.getTime() === today.getTime()) {
      group = "Today";
    } else if (notificationDate.getTime() === yesterday.getTime()) {
      group = "Yesterday";
    } else {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());

      if (notificationDate >= weekStart) {
        group = "ThisWeek";
      } else {
        group = "Earlier";
      }
    }

    if (!groupedNotifications[group]) {
      groupedNotifications[group] = { group, notifications: [] };
    }

    groupedNotifications[group].notifications.push(notification);
  }

  return Object.values(groupedNotifications);
};

interface Notification {
  notificationTime: dayjs.Dayjs;
  title: string;
  text: string;
  icon: string;
}

const Index: React.FC = () => {
  const token = localStorage.getItem("access_token");

  const notifications: Notification[] = [
    {
      notificationTime: dayjs("2024-02-14T09:00:00"),
      title: "Latest Booking Update",
      text: "Flight from Jakarta to Singapore board on 16:45 PM at gate A2. Safe trips!",
      icon: "Plane",
    },
    {
      notificationTime: dayjs("2024-02-13T09:00:00"),
      title: "Secure your Seat Now",
      text: "Complete your payment to confirm your booking.",
      icon: "Alert",
    },
    {
      notificationTime: dayjs("2024-02-13T18:30:00"),
      title: "Payment Successful",
      text: "Your booking is confirmed. E-tickets will be emailed shortly.",
      icon: "Success",
    },
    {
      notificationTime: dayjs("2024-02-12T12:45:00"),
      title: "Payment Cancelled",
      text: "Your booking is canceled due to a missed payment deadline.",
      icon: "Failed",
    },
    {
      notificationTime: dayjs("2024-02-11T12:45:00"),
      title: "Payment Cancelled",
      text: "Your booking is canceled due to a missed payment deadline.",
      icon: "Failed",
    },
    {
      notificationTime: dayjs("2024-02-10T09:00:00"),
      title: "Secure your Seat Now",
      text: "Complete your payment to confirm your booking.",
      icon: "Alert",
    },
  ];

  // async function fetchInitialAirport() {
  //     const payload = {}

  //     const response = await fetch(
  //         api_base_url + "/api/booking",
  //         {
  //             method: 'post',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify(payload),
  //         }
  //     );
  //     console.log(response)
  //     const responseJson = await response.json();
  //     if (response.status !== 200) {
  //         alert('error: ' + responseJson.message);
  //         return;
  //     }
  //     // make Sure this ok ==============
  //     airports = responseJson['Airport']
  // }

  useEffect(() => {
    // fetchInitialAirport()
  });

  const handleSignUp = () => {
    navigate("/signup");
  };

  const navigate = useNavigate();

  const [currentPageActive, setCurrentPageActive] = useState(1);
  const pageSize = 4;

  const handlePageChangeActive = (page: number) => {
    setCurrentPageActive(page);
  };

  const paginatedSchedulesActive = notifications.slice(
    (currentPageActive - 1) * pageSize,
    currentPageActive * pageSize
  );
  const groupedNotifications = groupNotificationsByTime(
    paginatedSchedulesActive
  );
  groupedNotifications.sort((a, b) => {
    const order = ["Today", "Yesterday", "ThisWeek", "Earlier"];
    return order.indexOf(a.group) - order.indexOf(b.group);
  });

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
                <div className="text-start text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-3xl mb-6">
                  Notifications
                </div>
                <div className="w-full min-h-[562px]">
                  <div className="w-full grid grid-cols-10 gap-1">
                    <div className="w-full col-start-1 col-span-10 flex-col justify-center items-start inline-flex">
                      {groupedNotifications.map(
                        (groupedNotification, index) => (
                          <div className="w-full" key={index}>
                            <div className="w-full grid grid-cols-10 gap-2">
                              <div className="col-start-1 col-end-2 flex-col text-center justify-top items-center inline-flex text-[#808991] font-medium text-sm mt-4">
                                {groupedNotification.group}
                              </div>
                              <div className="col-start-2 col-end-11 flex-col text-center justify-top items-center inline-flex text-[#808991] justify-center items-start inline-flex font-medium text-sm mt-4">
                                <hr className="w-full border-[#EAECF0] mx-auto" />
                              </div>
                            </div>
                            {groupedNotification.notifications.map(
                              (notification, innerIndex) => (
                                <div
                                  key={innerIndex}
                                  className="w-full grid grid-cols-10 gap-2 my-2"
                                >
                                  <div className="col-start-1 col-end-2 flex-col text-center justify-top items-center inline-flex">
                                    <div className="bg-white rounded-full p-2 sm:p-4 shadow border">
                                      {notification.icon === "Plane" && (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M16.4983 20.2502C16.4983 20.4491 16.4193 20.6399 16.2787 20.7805C16.138 20.9212 15.9473 21.0002 15.7483 21.0002H2.24834C2.04943 21.0002 1.85866 20.9212 1.71801 20.7805C1.57736 20.6399 1.49834 20.4491 1.49834 20.2502C1.49834 20.0513 1.57736 19.8605 1.71801 19.7198C1.85866 19.5792 2.04943 19.5002 2.24834 19.5002H15.7483C15.9473 19.5002 16.138 19.5792 16.2787 19.7198C16.4193 19.8605 16.4983 20.0513 16.4983 20.2502ZM23.2352 8.73299C23.2156 8.83738 23.174 8.9364 23.1132 9.02352C23.0525 9.11063 22.9739 9.18384 22.8827 9.2383L9.06303 17.4883C8.48697 17.8261 7.83146 18.0047 7.16365 18.0058C6.21238 18.0047 5.29748 17.6402 4.60615 16.9867L4.5949 16.9755L1.21709 13.6689C1.03837 13.4992 0.904229 13.2881 0.826518 13.0542C0.748806 12.8203 0.729923 12.5709 0.771537 12.328C0.813152 12.085 0.913982 11.8561 1.06511 11.6614C1.21624 11.4667 1.41301 11.3123 1.63803 11.2117L1.91928 11.0739C2.09689 10.9867 2.30177 10.9733 2.48928 11.0364L5.13865 11.9308L7.02959 10.7871L4.98303 8.80049C4.79898 8.63093 4.66028 8.41801 4.57956 8.18113C4.49884 7.94426 4.47867 7.69095 4.52088 7.44428C4.56309 7.19761 4.66635 6.96543 4.82125 6.76887C4.97614 6.57232 5.17775 6.41764 5.40771 6.31893L5.43771 6.30674L6.10803 6.05268C6.27703 5.98966 6.46309 5.98966 6.63209 6.05268L11.689 7.9108L16.5237 5.02518C17.2941 4.56664 18.2038 4.40069 19.0866 4.55768C19.9693 4.71467 20.766 5.18411 21.3312 5.88018L21.3424 5.89424L23.0899 8.13393C23.1552 8.21779 23.2019 8.31456 23.2269 8.41784C23.252 8.52112 23.2548 8.62854 23.2352 8.73299ZM21.3846 8.38612L20.1658 6.8233C19.8266 6.40833 19.3498 6.12883 18.822 6.03559C18.2942 5.94235 17.7505 6.04155 17.2896 6.31518L12.1521 9.38268C12.0559 9.43973 11.9482 9.47471 11.8368 9.48508C11.7254 9.49546 11.6131 9.48098 11.508 9.44268L6.37334 7.55455L5.99834 7.69799L6.01803 7.71674L8.77053 10.3877C8.85273 10.4676 8.91553 10.5652 8.95411 10.6731C8.99269 10.7811 9.00602 10.8964 8.99307 11.0103C8.98013 11.1242 8.94125 11.2336 8.87943 11.3301C8.81761 11.4266 8.7345 11.5077 8.63646 11.5671L5.61678 13.3942C5.52336 13.4507 5.41876 13.486 5.31027 13.4978C5.20179 13.5097 5.09202 13.4977 4.98865 13.4627L2.30084 12.5561L2.28303 12.5655L2.24834 12.5814C2.25286 12.5847 2.25695 12.5884 2.26053 12.5927L5.63553 15.8983C5.98775 16.2293 6.43774 16.4372 6.91808 16.491C7.39842 16.5447 7.88324 16.4414 8.2999 16.1964L21.3846 8.38612Z"
                                            fill="#111111"
                                          />
                                        </svg>
                                      )}
                                      {notification.icon === "Success" && (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M10.4902 2.23055L5.50016 4.11055C4.35016 4.54055 3.41016 5.90055 3.41016 7.12055V14.5505C3.41016 15.7305 4.19016 17.2805 5.14016 17.9905L9.44016 21.2005C10.8502 22.2605 13.1702 22.2605 14.5802 21.2005L18.8802 17.9905C19.8302 17.2805 20.6102 15.7305 20.6102 14.5505V7.12055C20.6102 5.89055 19.6702 4.53055 18.5202 4.10055L13.5302 2.23055C12.6802 1.92055 11.3202 1.92055 10.4902 2.23055Z"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M9.05078 11.8697L10.6608 13.4797L14.9608 9.17969"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                      )}
                                      {notification.icon === "Failed" && (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M10.4902 2.23055L5.50016 4.11055C4.35016 4.54055 3.41016 5.90055 3.41016 7.12055V14.5505C3.41016 15.7305 4.19016 17.2805 5.14016 17.9905L9.44016 21.2005C10.8502 22.2605 13.1702 22.2605 14.5802 21.2005L18.8802 17.9905C19.8302 17.2805 20.6102 15.7305 20.6102 14.5505V7.12055C20.6102 5.89055 19.6702 4.53055 18.5202 4.10055L13.5302 2.23055C12.6802 1.92055 11.3202 1.92055 10.4902 2.23055Z"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M14.1484 13.4395L9.89844 9.18945"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M14.1016 9.24023L9.85156 13.4902"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                      )}
                                      {notification.icon === "Alert" && (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M18.5 9.5V14.5"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M5 22C7.20914 22 9 20.2091 9 18C9 15.7909 7.20914 14 5 14C2.79086 14 1 15.7909 1 18C1 20.2091 2.79086 22 5 22Z"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M5.25 16.75V17.68C5.25 18.03 5.07001 18.36 4.76001 18.54L4 19"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M2 15.2V9C2 5.5 4 4 7 4H17C20 4 22 5.5 22 9V15C22 18.5 20 20 17 20H8.5"
                                            stroke="#111111"
                                            stroke-width="1.5"
                                            stroke-miterlimit="10"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-start-2 col-end-10 flex-col justify-center items-center sm:items-start inline-flex">
                                    <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg">
                                      {notification.title}
                                    </div>
                                    <div className="text-center text-[#354053] font-medium font-['Plus Jakarta Sans'] font-medium text-sm my-1">
                                      {notification.text}
                                    </div>
                                    <div className="text-center text-[#808991] tfont-medium font-['Plus Jakarta Sans'] font-medium text-xs">
                                      {notification.notificationTime.format(
                                        "HH:mm A"
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-start-10 col-end-11 flex-col justify-center items-start inline-flex">
                                    <RightOutlined />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="w-full col-start-1 col-span-10 flex-col justify-bottom items-bottom "
                  style={{ textAlign: "center" }}
                >
                  <Pagination
                    total={notifications.length}
                    defaultPageSize={pageSize}
                    current={currentPageActive}
                    onChange={handlePageChangeActive}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    hideOnSinglePage={true}
                    className="my-1"
                  />
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

export default Index;
