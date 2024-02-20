import React, { useEffect, useState } from "react";
import { Card, ConfigProvider, Layout, Tabs, Pagination } from "antd/lib";
const { TabPane } = Tabs;
import { MenuProps } from "antd/lib";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";
import HomeFooter from "../../components/home_footer";
import HomeNavSide from "../../components/home_navside";
import ProfileMenu from "../../components/ProfileMenu";
import HeaderComponent from "../../components/Header";

dayjs.extend(customParseFormat);

const { Content, Footer } = Layout;

const api_base_url = "https://be-java-master-production.up.railway.app";

const menu = <ProfileMenu />;

const cardStyle = {
  borderRadius: "12px",
  border: "1px solid #F2F4F7",
  backgroundColor: "white",
  marginBottom: "16px",
};

interface User {
  salutation: string;
  firstName: string;
  lastName: string;
  nationality: string;
  dob: string;
}

interface Airport {
  nationalId: string;
  city: string;
  name: string;
  abv: string;
  lat: number | null;
  long: number | null;
}

interface Schedule {
  departureDate: dayjs.Dayjs;
  from: Airport;
  plane: { name: string; code: string };
  arrivalDate: dayjs.Dayjs;
  to: Airport;
}

interface Booking {
  id: string;
  bookingDate: dayjs.Dayjs;
  status: boolean;
  totalCost: number;
  passanger: string;
  user: User;
  schedule: Schedule;
  seat: string;
  bagage: number;
  meal: string;
}

const Index: React.FC = () => {
  const token = localStorage.getItem("access_token");

  let airports: Airport[] = [];
  const fromAirportDetails: { label: string; value: string }[] = [];
  const toAirportDetails: { label: string; value: string }[] = [];
  const schedules: Booking[] = [
    {
      id: "1",
      bookingDate: dayjs("2024-02-15T09:30:00"),
      status: true,
      totalCost: 350.0,
      passanger: "Alice Smith",
      user: {
        salutation: "Ms",
        firstName: "Alice",
        lastName: "Smith",
        nationality: "UK",
        dob: "1985-05-20",
      },
      schedule: {
        departureDate: dayjs("2024-03-01T14:00:00"),
        from: {
          nationalId: "ID001",
          city: "Jakarta",
          name: "Soekarno-Hatta International Airport",
          abv: "CGK",
          lat: -6.1256,
          long: 106.6553,
        },
        plane: { name: "Airbus A320", code: "A320" },
        arrivalDate: dayjs("2024-03-01T17:30:00"),
        to: {
          nationalId: "ID003",
          city: "Sydney",
          name: "Kingsford Smith Airport",
          abv: "SYD",
          lat: -33.9462,
          long: 151.1772,
        },
      },
      seat: "B12",
      bagage: 1,
      meal: "Standard",
    },
    {
      id: "2",
      bookingDate: dayjs("2024-02-16T11:45:00"),
      status: true,
      totalCost: 420.0,
      passanger: "Bob Johnson",
      user: {
        salutation: "Mr",
        firstName: "Bob",
        lastName: "Johnson",
        nationality: "US",
        dob: "1980-08-12",
      },
      schedule: {
        departureDate: dayjs("2024-03-10T08:30:00"),
        from: {
          nationalId: "ID002",
          city: "Singapore",
          name: "Changi Airport",
          abv: "SIN",
          lat: 1.3644,
          long: 103.9915,
        },
        plane: { name: "Boeing 777", code: "B777" },
        arrivalDate: dayjs("2024-03-10T11:45:00"),
        to: {
          nationalId: "ID004",
          city: "Tokyo",
          name: "Narita International Airport",
          abv: "NRT",
          lat: 35.7647,
          long: 140.3864,
        },
      },
      seat: "C07",
      bagage: 2,
      meal: "Vegetarian",
    },
    {
      id: "3",
      bookingDate: dayjs("2024-02-17T15:20:00"),
      status: false,
      totalCost: 280.0,
      passanger: "Charlie Brown",
      user: {
        salutation: "Mr",
        firstName: "Charlie",
        lastName: "Brown",
        nationality: "CA",
        dob: "1992-03-25",
      },
      schedule: {
        departureDate: dayjs("2024-03-20T18:15:00"),
        from: {
          nationalId: "ID003",
          city: "Sydney",
          name: "Kingsford Smith Airport",
          abv: "SYD",
          lat: -33.9462,
          long: 151.1772,
        },
        plane: { name: "Airbus A330", code: "A330" },
        arrivalDate: dayjs("2024-03-20T21:30:00"),
        to: {
          nationalId: "ID001",
          city: "Jakarta",
          name: "Soekarno-Hatta International Airport",
          abv: "CGK",
          lat: -6.1256,
          long: 106.6553,
        },
      },
      seat: "D19",
      bagage: 1,
      meal: "Halal",
    },
    {
      id: "4",
      bookingDate: dayjs("2024-02-15T09:30:00"),
      status: dayjs().isAfter("2024-03-01T14:00:00"),
      totalCost: 350.0,
      passanger: "Alice Smith",
      user: {
        salutation: "Ms",
        firstName: "Alice",
        lastName: "Smith",
        nationality: "UK",
        dob: "1985-05-20",
      },
      schedule: {
        departureDate: dayjs("2024-03-01T14:00:00"),
        from: {
          nationalId: "ID001",
          city: "Jakarta",
          name: "Soekarno-Hatta International Airport",
          abv: "CGK",
          lat: -6.1256,
          long: 106.6553,
        },
        plane: { name: "Airbus A320", code: "A320" },
        arrivalDate: dayjs("2024-03-01T17:30:00"),
        to: {
          nationalId: "ID003",
          city: "Sydney",
          name: "Kingsford Smith Airport",
          abv: "SYD",
          lat: -33.9462,
          long: 151.1772,
        },
      },
      seat: "B12",
      bagage: 1,
      meal: "Standard",
    },
    {
      id: "5",
      bookingDate: dayjs("2024-02-15T09:30:00"),
      status: dayjs().isAfter("2024-03-01T14:00:00"),
      totalCost: 350.0,
      passanger: "Alice Smith",
      user: {
        salutation: "Ms",
        firstName: "Alice",
        lastName: "Smith",
        nationality: "UK",
        dob: "1985-05-20",
      },
      schedule: {
        departureDate: dayjs("2024-03-01T14:00:00"),
        from: {
          nationalId: "ID001",
          city: "Jakarta",
          name: "Soekarno-Hatta International Airport",
          abv: "CGK",
          lat: -6.1256,
          long: 106.6553,
        },
        plane: { name: "Airbus A320", code: "A320" },
        arrivalDate: dayjs("2024-03-01T17:30:00"),
        to: {
          nationalId: "ID003",
          city: "Sydney",
          name: "Kingsford Smith Airport",
          abv: "SYD",
          lat: -33.9462,
          long: 151.1772,
        },
      },
      seat: "B12",
      bagage: 1,
      meal: "Standard",
    },
    {
      id: "6",
      bookingDate: dayjs("2024-02-16T11:45:00"),
      status: dayjs().isAfter("2024-03-10T08:30:00"),
      totalCost: 420.0,
      passanger: "Bob Johnson",
      user: {
        salutation: "Mr",
        firstName: "Bob",
        lastName: "Johnson",
        nationality: "US",
        dob: "1980-08-12",
      },
      schedule: {
        departureDate: dayjs("2024-03-10T08:30:00"),
        from: {
          nationalId: "ID002",
          city: "Singapore",
          name: "Changi Airport",
          abv: "SIN",
          lat: 1.3644,
          long: 103.9915,
        },
        plane: { name: "Boeing 777", code: "B777" },
        arrivalDate: dayjs("2024-03-10T11:45:00"),
        to: {
          nationalId: "ID004",
          city: "Tokyo",
          name: "Narita International Airport",
          abv: "NRT",
          lat: 35.7647,
          long: 140.3864,
        },
      },
      seat: "C07",
      bagage: 2,
      meal: "Vegetarian",
    },
    {
      id: "7",
      bookingDate: dayjs("2024-02-17T15:20:00"),
      status: dayjs().isAfter("2024-03-20T18:15:00"),
      totalCost: 280.0,
      passanger: "Charlie Brown",
      user: {
        salutation: "Mr",
        firstName: "Charlie",
        lastName: "Brown",
        nationality: "CA",
        dob: "1992-03-25",
      },
      schedule: {
        departureDate: dayjs("2024-03-20T18:15:00"),
        from: {
          nationalId: "ID003",
          city: "Sydney",
          name: "Kingsford Smith Airport",
          abv: "SYD",
          lat: -33.9462,
          long: 151.1772,
        },
        plane: { name: "Airbus A330", code: "A330" },
        arrivalDate: dayjs("2024-03-20T21:30:00"),
        to: {
          nationalId: "ID001",
          city: "Jakarta",
          name: "Soekarno-Hatta International Airport",
          abv: "CGK",
          lat: -6.1256,
          long: 106.6553,
        },
      },
      seat: "D19",
      bagage: 1,
      meal: "Halal",
    },
    {
      id: "8",
      bookingDate: dayjs().subtract(7, "days"),
      status: true,
      totalCost: 300.0,
      passanger: "Eva Rodriguez",
      user: {
        salutation: "Ms",
        firstName: "Eva",
        lastName: "Rodriguez",
        nationality: "ES",
        dob: "1993-10-15",
      },
      schedule: {
        departureDate: dayjs().add(5, "days").hour(10).minute(30).second(0),
        from: {
          nationalId: "ID005",
          city: "Barcelona",
          name: "Barcelona-El Prat Airport",
          abv: "BCN",
          lat: 41.2974,
          long: 2.0833,
        },
        plane: { name: "Airbus A350", code: "A350" },
        arrivalDate: dayjs().add(5, "days").hour(13).minute(45).second(0),
        to: {
          nationalId: "ID001",
          city: "Jakarta",
          name: "Soekarno-Hatta International Airport",
          abv: "CGK",
          lat: -6.1256,
          long: 106.6553,
        },
      },
      seat: "D08",
      bagage: 1,
      meal: "Vegetarian",
    },
    {
      id: "9",
      bookingDate: dayjs().subtract(3, "days"),
      status: false,
      totalCost: 250.0,
      passanger: "Luis Fernandez",
      user: {
        salutation: "Mr",
        firstName: "Luis",
        lastName: "Fernandez",
        nationality: "MX",
        dob: "1988-07-28",
      },
      schedule: {
        departureDate: dayjs().subtract(1, "day").hour(15).minute(45).second(0),
        from: {
          nationalId: "ID006",
          city: "Mexico City",
          name: "Benito Juárez International Airport",
          abv: "MEX",
          lat: 19.4361,
          long: -99.0719,
        },
        plane: { name: "Boeing 787", code: "B787" },
        arrivalDate: dayjs().subtract(1, "day").hour(20).minute(0).second(0),
        to: {
          nationalId: "ID002",
          city: "Singapore",
          name: "Changi Airport",
          abv: "SIN",
          lat: 1.3644,
          long: 103.9915,
        },
      },
      seat: "A15",
      bagage: 2,
      meal: "Standard",
    },
  ];

  async function fetchInitialAirport() {
    const payload = {};

    const response = await fetch(api_base_url + "/api/booking", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(response);
    const responseJson = await response.json();
    if (response.status !== 200) {
      alert("error: " + responseJson.message);
      return;
    }
    // make Sure this ok ==============
    airports = responseJson["Airport"];
  }

  useEffect(() => {
    fetchInitialAirport();

    airports.map((val) => {
      fromAirportDetails.push({ label: val.name, value: val.nationalId });
      toAirportDetails.push({ label: val.name, value: val.nationalId });
    });
  });

  const handleSignUp = () => {
    navigate("/signup");
  };

  const navigate = useNavigate();

  const [currentPageActive, setCurrentPageActive] = useState(1);
  const [currentPageExpired, setCurrentPageExpired] = useState(1);
  const pageSize = 3;

  const handlePageChangeActive = (page: number) => {
    setCurrentPageActive(page);
  };
  const activeSchedules = schedules.filter(
    (schedule) => schedule.status === true
  );
  const paginatedSchedulesActive = activeSchedules.slice(
    (currentPageActive - 1) * pageSize,
    currentPageActive * pageSize
  );

  const handlePageChangeExpired = (page: number) => {
    setCurrentPageExpired(page);
  };
  const ExpiredSchedules = schedules.filter(
    (schedule) => schedule.status === false
  );
  const paginatedSchedulesExpired = ExpiredSchedules.slice(
    (currentPageExpired - 1) * pageSize,
    currentPageExpired * pageSize
  );

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
              <div className="col-start-1 col-span-10 xl:col-start-4 xl:col-span-6 px-6 py-3 bg-white rounded-[16px] shadow border border-gray-200 flex-col justify-center items-start inline-flex">
                <div className="text-start text-black font-medium font-['Plus Jakarta Sans'] font-semibold text-3xl">
                  Trips
                </div>
                <Tabs
                  defaultActiveKey="1"
                  tabBarGutter={28}
                  style={{ width: "100%" }}
                >
                  <TabPane tab="Active" key="1">
                    {paginatedSchedulesActive.length === 0 ? (
                      <div className="min-h-[562px] flex justify-center items-center">
                        <div className="grid grid-cols-10">
                          <div className="col-start-4 col-span-4">
                            <img
                              src="src/assets/background-complete.svg"
                              width={290}
                              height={210}
                              alt="Background"
                            />
                            <h1 className="text-center text-black font-medium font-['Plus Jakarta Sans'] font-bold text-xl my-3">
                              No Trips Found
                            </h1>
                            <p className="text-center text-[#677084] font-medium font-['Plus Jakarta Sans'] font-medium text-sm">
                              When you book your next flight, you can check the
                              details in here
                            </p>
                            <button
                              onClick={handleSignUp}
                              className="my-4 w-full justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3  text-base font-bold leading-6 text-white shadow-sm"
                            >
                              <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-sm font-bold p-2">
                                Explore
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="min-h-[562px]">
                          {paginatedSchedulesActive.map((schedule, index) => {
                            const durationInMinutes =
                              schedule.schedule.arrivalDate.diff(
                                schedule.schedule.departureDate,
                                "minutes"
                              );
                            const hours = Math.floor(durationInMinutes / 60);
                            const minutes = durationInMinutes % 60;
                            const formattedDuration = `${hours}h ${minutes}m`;
                            return (
                              <>
                                <div className="grid grid-cols-11">
                                  <Card
                                    style={cardStyle}
                                    className="col-start-1 col-span-8 shadow border border-gray-200 "
                                    key={index}
                                  >
                                    <Card.Grid
                                      className="flex flex-col"
                                      hoverable={false}
                                      style={{
                                        width: "25%",
                                        boxShadow: "none",
                                        padding: "10px",
                                      }}
                                    >
                                      <div className="text-center text-black font-medium font-['Plus Jakarta Sans'] text-lg  md:text-2xl">
                                        {schedule.schedule.departureDate.format(
                                          "HH:mm"
                                        )}
                                      </div>
                                      <div className="text-center text-primary font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">
                                        {schedule.schedule.from.abv}
                                      </div>
                                      <div className="text-center text-[#808991] font-normal font-['Plus Jakarta Sans'] text-lg">
                                        {schedule.schedule.departureDate.format(
                                          "D MMM"
                                        )}
                                      </div>
                                    </Card.Grid>
                                    <Card.Grid
                                      hoverable={false}
                                      style={{
                                        width: "50%",
                                        height: "100%",
                                        boxShadow: "none",
                                        padding: "10px",
                                      }}
                                    >
                                      <div className="text-center text-neutral-link text-base font-normal font-['Plus Jakarta Sans'] text-md my-1">
                                        {formattedDuration}
                                      </div>
                                      <div className="grid grid-cols-7 gap-1">
                                        <div className="col-start-0 col-span-1 py-3 bg-white justify-center items-center inline-flex">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                          >
                                            <ellipse
                                              opacity="0.5"
                                              cx="8.69725"
                                              cy="7.99924"
                                              rx="8.19725"
                                              ry="7.79221"
                                              fill="#38A993"
                                            />
                                            <ellipse
                                              cx="8.69569"
                                              cy="7.99955"
                                              rx="4.91835"
                                              ry="4.67533"
                                              fill="#38A993"
                                            />
                                          </svg>
                                        </div>
                                        <div className="col-start-2 col-span-2  py-3 bg-white justify-center items-center inline-flex">
                                          <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
                                        </div>
                                        <div className="col-start-4 col-span-1 py-3 justify-center items-center inline-flex">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                          >
                                            <path
                                              d="M11.1422 16.7085L12.8172 12.8168L13.1839 11.9501C13.2505 11.8168 13.4255 11.7001 13.5755 11.7001H16.1255C16.9255 11.7001 17.8755 11.1085 18.2422 10.3918C18.3672 10.1418 18.3672 9.8418 18.2422 9.5918C17.8755 8.88346 16.9172 8.2918 16.1172 8.2918H13.5672C13.4172 8.2918 13.2422 8.17513 13.1755 8.0418L11.1339 3.2918C10.9172 2.7668 10.2589 2.3418 9.69219 2.3418H8.59219C7.88385 2.3418 7.53385 2.87513 7.81719 3.53346L9.61719 7.70846C9.75885 8.03346 9.58385 8.30013 9.22552 8.30013H8.30052H6.80052C6.60885 8.30013 6.33385 8.1918 6.20052 8.05846L4.25885 6.12513C4.05885 5.92513 3.66719 5.83346 3.38385 5.92513L2.25052 6.30013C1.75885 6.45013 1.52552 7.00846 1.75885 7.4668L3.42552 9.45013C3.68386 9.75013 3.68386 10.2418 3.42552 10.5418L1.75885 12.5251C1.53386 12.9835 1.75885 13.5418 2.25052 13.7085L3.38385 14.0835C3.65885 14.1751 4.05885 14.0835 4.25885 13.8835L6.20052 11.9501C6.33385 11.8085 6.60885 11.7001 6.80052 11.7001H9.22552C9.58385 11.7001 9.75052 11.9585 9.61719 12.2918L7.81719 16.4668C7.53385 17.1251 7.88385 17.6585 8.59219 17.6585H9.69219C10.2589 17.6585 10.9172 17.2335 11.1422 16.7085Z"
                                              fill="#38A993"
                                            />
                                          </svg>
                                        </div>
                                        <div className="col-start-5 col-span-2 py-3 justify-center items-center inline-flex">
                                          <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
                                        </div>
                                        <div className="col-start-7 col-span-1 py-3  justify-center items-center inline-flex">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                          >
                                            <ellipse
                                              opacity="0.5"
                                              cx="8.69725"
                                              cy="7.99924"
                                              rx="8.19725"
                                              ry="7.79221"
                                              fill="#38A993"
                                            />
                                            <ellipse
                                              cx="8.69569"
                                              cy="7.99955"
                                              rx="4.91835"
                                              ry="4.67533"
                                              fill="#38A993"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="text-center text-neutral-link text-base font-normal font-['Plus Jakarta Sans'] text-md">
                                        Direct
                                      </div>
                                    </Card.Grid>
                                    <Card.Grid
                                      hoverable={false}
                                      style={{
                                        width: "25%",
                                        height: "100%",
                                        boxShadow: "none",
                                        padding: "10px",
                                      }}
                                    >
                                      <div className="text-center text-black font-medium font-['Plus Jakarta Sans'] text-lg  md:text-2xl">
                                        {schedule.schedule.arrivalDate.format(
                                          "HH:mm"
                                        )}
                                      </div>
                                      <div className="text-center text-primary font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">
                                        {schedule.schedule.to.abv}
                                      </div>
                                      <div className="text-center text-neutral font-normal font-['Plus Jakarta Sans'] text-lg">
                                        {schedule.schedule.arrivalDate.format(
                                          "D MMM"
                                        )}
                                      </div>
                                    </Card.Grid>
                                  </Card>
                                  <Card
                                    style={cardStyle}
                                    className="col-start-9 col-span-4 shadow border border-gray-200 "
                                    key={index}
                                  >
                                    <Card.Grid
                                      hoverable={false}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        boxShadow: "none",
                                        padding: "10px",
                                      }}
                                    >
                                      <div className="text-center text-black text-base font-medium font-['Plus Jakarta Sans'] md:my-2">
                                        <div className="justify-center h-[51.79px] items-center flex">
                                          <div className="w-[29.793px] h-[29.793px] top-[2px]  bg-primary rounded-full items-center mx-2">
                                            <img
                                              src="src/assets/airplane.svg"
                                              className=" w-full h-full "
                                            ></img>
                                          </div>
                                          <div className="text-center text-sm  md:text-xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]">
                                            {schedule.schedule.plane.code}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-center text-black text-base font-medium font-['Plus Jakarta Sans'] mx-0 md:mx-4">
                                        <button
                                          onClick={() => {
                                            navigate(`/trips-detail`);
                                          }}
                                          className="my-4 w-full flex gap-2 items-center hover:text-base font-bold leading-6 text-primary-dark"
                                        >
                                          <p className="text-center text-primary text-sm md:text-base font-semibold font-['Plus Jakarta Sans'] md:p-2 ">
                                            Details{" "}
                                          </p>
                                          <img
                                            src="/assets/chevron-right.svg"
                                            alt="w-4 h-4"
                                          />
                                        </button>
                                      </div>
                                    </Card.Grid>
                                  </Card>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <Pagination
                            total={activeSchedules.length}
                            defaultPageSize={pageSize}
                            current={currentPageActive}
                            onChange={handlePageChangeActive}
                            showSizeChanger={false}
                            showQuickJumper={false}
                            hideOnSinglePage={true}
                            className="my-1"
                          />
                        </div>
                      </>
                    )}
                  </TabPane>
                  <TabPane tab="Expired" key="2">
                    {paginatedSchedulesExpired.length === 0 ? (
                      <div className="min-h-[562px] flex justify-center items-center">
                        <div className="grid grid-cols-10">
                          <div className="col-start-4 col-span-4">
                            <img
                              src="src/assets/background-complete.svg"
                              width={290}
                              height={210}
                              alt="Background"
                            />
                            <h1 className="text-center text-black font-medium font-['Plus Jakarta Sans'] font-bold text-xl my-3">
                              No Trips Found
                            </h1>
                            <p className="text-center text-[#677084] font-medium font-['Plus Jakarta Sans'] font-medium text-sm">
                              When you book your next flight, you can check the
                              details in here
                            </p>
                            <button
                              onClick={handleSignUp}
                              className="my-4 w-full justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3  text-base font-bold leading-6 text-white shadow-sm"
                            >
                              <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-sm font-bold p-2">
                                Explore
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="min-h-[562px]">
                          {paginatedSchedulesExpired.map((schedule, index) => {
                            const durationInMinutes =
                              schedule.schedule.arrivalDate.diff(
                                schedule.schedule.departureDate,
                                "minutes"
                              );
                            const hours = Math.floor(durationInMinutes / 60);
                            const minutes = durationInMinutes % 60;
                            const formattedDuration = `${hours}h ${minutes}m`;
                            return (
                              <>
                                <div className="grid grid-cols-11">
                                  <Card
                                    style={cardStyle}
                                    className="col-start-1 col-span-8 shadow border border-gray-200 "
                                    key={index}
                                  >
                                    <Card.Grid
                                      hoverable={false}
                                      style={{
                                        width: "25%",
                                        height: "100%",
                                        boxShadow: "none",
                                        padding: "10px",
                                      }}
                                    >
                                      <div className="text-center text-black font-medium font-['Plus Jakarta Sans'] text-lg  md:text-2xl">
                                        {schedule.schedule.departureDate.format(
                                          "HH:mm"
                                        )}
                                      </div>
                                      <div className="text-center text-primary font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">
                                        {schedule.schedule.from.abv}
                                      </div>
                                      <div className="text-center text-neutral-gray font-normal font-['Plus Jakarta Sans'] text-lg">
                                        {schedule.schedule.departureDate.format(
                                          "D MMM"
                                        )}
                                      </div>
                                    </Card.Grid>
                                    <Card.Grid
                                      hoverable={false}
                                      style={{
                                        width: "50%",
                                        height: "100%",
                                        boxShadow: "none",
                                        padding: "10px",
                                      }}
                                    >
                                      <div className="text-center text-neutral-link text-base font-normal font-['Plus Jakarta Sans'] text-md my-1">
                                        {formattedDuration}
                                      </div>
                                      <div className="grid grid-cols-7 gap-1">
                                        <div className="col-start-0 col-span-1 py-3 bg-white justify-center items-center inline-flex">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                          >
                                            <ellipse
                                              opacity="0.5"
                                              cx="8.69725"
                                              cy="7.99924"
                                              rx="8.19725"
                                              ry="7.79221"
                                              fill="#38A993"
                                            />
                                            <ellipse
                                              cx="8.69569"
                                              cy="7.99955"
                                              rx="4.91835"
                                              ry="4.67533"
                                              fill="#38A993"
                                            />
                                          </svg>
                                        </div>
                                        <div className="col-start-2 col-span-2  py-3 bg-white justify-center items-center inline-flex">
                                          <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
                                        </div>
                                        <div className="col-start-4 col-span-1 py-3 justify-center items-center inline-flex">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                          >
                                            <path
                                              d="M11.1422 16.7085L12.8172 12.8168L13.1839 11.9501C13.2505 11.8168 13.4255 11.7001 13.5755 11.7001H16.1255C16.9255 11.7001 17.8755 11.1085 18.2422 10.3918C18.3672 10.1418 18.3672 9.8418 18.2422 9.5918C17.8755 8.88346 16.9172 8.2918 16.1172 8.2918H13.5672C13.4172 8.2918 13.2422 8.17513 13.1755 8.0418L11.1339 3.2918C10.9172 2.7668 10.2589 2.3418 9.69219 2.3418H8.59219C7.88385 2.3418 7.53385 2.87513 7.81719 3.53346L9.61719 7.70846C9.75885 8.03346 9.58385 8.30013 9.22552 8.30013H8.30052H6.80052C6.60885 8.30013 6.33385 8.1918 6.20052 8.05846L4.25885 6.12513C4.05885 5.92513 3.66719 5.83346 3.38385 5.92513L2.25052 6.30013C1.75885 6.45013 1.52552 7.00846 1.75885 7.4668L3.42552 9.45013C3.68386 9.75013 3.68386 10.2418 3.42552 10.5418L1.75885 12.5251C1.53386 12.9835 1.75885 13.5418 2.25052 13.7085L3.38385 14.0835C3.65885 14.1751 4.05885 14.0835 4.25885 13.8835L6.20052 11.9501C6.33385 11.8085 6.60885 11.7001 6.80052 11.7001H9.22552C9.58385 11.7001 9.75052 11.9585 9.61719 12.2918L7.81719 16.4668C7.53385 17.1251 7.88385 17.6585 8.59219 17.6585H9.69219C10.2589 17.6585 10.9172 17.2335 11.1422 16.7085Z"
                                              fill="#38A993"
                                            />
                                          </svg>
                                        </div>
                                        <div className="col-start-5 col-span-2 py-3 justify-center items-center inline-flex">
                                          <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
                                        </div>
                                        <div className="col-start-7 col-span-1 py-3  justify-center items-center inline-flex">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                          >
                                            <ellipse
                                              opacity="0.5"
                                              cx="8.69725"
                                              cy="7.99924"
                                              rx="8.19725"
                                              ry="7.79221"
                                              fill="#38A993"
                                            />
                                            <ellipse
                                              cx="8.69569"
                                              cy="7.99955"
                                              rx="4.91835"
                                              ry="4.67533"
                                              fill="#38A993"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="text-center text-neutral-link text-base font-normal font-['Plus Jakarta Sans'] text-md">
                                        Direct
                                      </div>
                                    </Card.Grid>
                                    <Card.Grid
                                      hoverable={false}
                                      style={{
                                        width: "25%",
                                        height: "100%",
                                        boxShadow: "none",
                                        padding: "10px",
                                      }}
                                    >
                                      <div className="text-center text-black font-medium font-['Plus Jakarta Sans'] text-lg md:text-2xl">
                                        {schedule.schedule.arrivalDate.format(
                                          "HH:mm"
                                        )}
                                      </div>
                                      <div className="text-center text-primary font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">
                                        {schedule.schedule.to.abv}
                                      </div>
                                      <div className="text-center text-neutral font-normal font-['Plus Jakarta Sans'] text-lg">
                                        {schedule.schedule.arrivalDate.format(
                                          "D MMM"
                                        )}
                                      </div>
                                    </Card.Grid>
                                  </Card>
                                  <Card
                                    style={cardStyle}
                                    className="col-start-9 col-span-4 shadow border border-gray-200 "
                                    key={index}
                                  >
                                    <Card.Grid
                                      className="flex flex-col items-start gap-2"
                                      hoverable={false}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        boxShadow: "none",
                                        padding: "10px",
                                      }}
                                    >
                                      <div className="text-center text-black text-base font-medium font-['Plus Jakarta Sans'] md:my-2">
                                        <div className="justify-center h-[51.79px] items-center flex">
                                          <div className="w-[29.793px] h-[29.793px] top-[2px] bg-primary rounded-full items-center mx-2">
                                            <img
                                              src="src/assets/airplane.svg"
                                              className=" w-full h-full "
                                            ></img>
                                          </div>
                                          <div className="text-center text-sm  md:text-xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]">
                                            {schedule.schedule.plane.code}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-center text-black text-base font-medium font-['Plus Jakarta Sans'] mx-0 md:mx-4">
                                        <button
                                          onClick={() => {
                                            navigate("/trips-detail");
                                          }}
                                          className="my-4 flex gap-2 items-center hover:text-base font-bold leading-6 text-primary-dark"
                                        >
                                          <p className="text-primary text-sm md:text-base font-semibold font-['Plus Jakarta Sans'] md:p-2 ">
                                            Details{" "}
                                          </p>
                                          <img
                                            src="/assets/chevron-right.svg"
                                            alt="w-4 h04"
                                          />
                                        </button>
                                      </div>
                                    </Card.Grid>
                                  </Card>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <Pagination
                            total={ExpiredSchedules.length}
                            defaultPageSize={pageSize}
                            current={currentPageExpired}
                            onChange={handlePageChangeExpired}
                            showSizeChanger={false}
                            showQuickJumper={false}
                            hideOnSinglePage={true}
                            className="my-1"
                          />
                        </div>
                      </>
                    )}
                  </TabPane>
                </Tabs>
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
