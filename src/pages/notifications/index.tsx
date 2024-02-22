import React, { useEffect, useState } from "react";
import { ConfigProvider, Layout, Pagination } from "antd/lib";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import HomeFooter from "../../components/home_footer";
import HomeNavSide from "../../components/home_navside";
import HeaderComponent from "../../components/Header";

dayjs.extend(customParseFormat);

const { Content, Footer } = Layout;

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

  return (
    <ConfigProvider>
      <Layout>
        <HeaderComponent />
        <Content>
          <div className="my-5">
            <div className="grid grid-cols-10 gap-5">
              <HomeNavSide />
              <div className="col-start-1 col-span-10 xl:col-start-4 xl:col-span-6 px-8 py-3 bg-white rounded-[16px] border border-gray-200 flex-col justify-center items-start inline-flex">
                <div className="text-start text-black font-medium font-['Plus Jakarta Sans'] text-3xl mb-3">
                  Notifications
                </div>
                <div className="w-full min-h-[562px]">
                  <div className="w-full grid grid-cols-10 gap-1">
                    <div className="w-full col-start-1 col-span-10 flex-col justify-center items-start inline-flex">
                      {groupedNotifications.map(
                        (groupedNotification, index) => (
                          <div className="w-full" key={index}>
                            <div className="w-full flex gap-2 items-center">
                              <div className="col-start-1 col-end-2 flex-col text-center justify-top items-center inline-flex text-[#808991] font-medium text-sm my-4">
                                {groupedNotification.group}
                              </div>
                              <hr className="w-full border-[#EAECF0] mx-auto" />
                            </div>
                            {groupedNotification.notifications.map(
                              (notification, innerIndex) => (
                                <div
                                  key={innerIndex}
                                  className="w-full grid grid-cols-10 gap-2 my-5"
                                >
                                  <div className="col-start-1 col-end-2 flex-col text-center justify-top items-center inline-flex">
                                    <div className="bg-white rounded-full p-2 sm:p-4 border">
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
                                  <div className="col-start-2 col-end-10 flex-col justify-normal items-start inline-flex">
                                    <div className=" text-black font-medium font-['Plus Jakarta Sans'] font-semibold text-lg">
                                      {notification.title}
                                    </div>
                                    <div className=" text-neutral-link font-medium font-['Plus Jakarta Sans'] font-normal text-sm my-1">
                                      {notification.text}
                                    </div>
                                    <div className=" text-neutral font-normal font-['Plus Jakarta Sans'] text-xs">
                                      {notification.notificationTime.format(
                                        "HH:mm A"
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-start-10 col-end-11 flex-col justify-center items-start inline-flex cursor-pointer">
                                    <img
                                      src="/assets/chevron-right-neutral.svg"
                                      alt="w-4 h-4"
                                    />
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
