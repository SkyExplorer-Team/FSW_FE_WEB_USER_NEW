import React, { useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Dropdown,
  Layout,
  Modal,
  Pagination,
  PaginationProps,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
} from "antd";
import {
  DownOutlined,
  SwapOutlined,
  TeamOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/Header";
import HomeFooter from "../../components/home_footer";
import CabinField from "../../components/cabin_field";
import PassengerField from "../../components/passenger_field";
import LogoImage from "../../components/LogoImage";
import GambarPocket from "/assets/gambar-samping.png";

import Airplane from "/assets/airplane.svg";

dayjs.extend(customParseFormat);

const { Content, Footer } = Layout;
interface Airport {
  id: string | undefined;
  name: string | undefined;
  abv: string | undefined;
  city: string | undefined;
}

interface Schedule {
  id: string;
  name: string;
  from: Airport;
  to: Airport;
  departureDate: dayjs.Dayjs;
  plane: {
    id: string;
    code: string;
    name: string;
  };
  arrivalDate: dayjs.Dayjs;
  duration: number;
  price: number;
}
interface ScheduleResult {
  id: string;
  name: string;
  from: Airport;
  to: Airport;
  timeDeparture: string[];
  airplane: {
    id: string;
    code: string;
    name: string;
  };
  timeArrive: string[];
  price: number;
}
const api_base_url = "https://be-java-master-production.up.railway.app/api";

const accessToken = localStorage.getItem("access_token");

const Index: React.FC = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [fromAirportDetails, setFromAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [toAirportDetails, setToAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [fromAirport, setFromAirport] = useState<Airport>(
    location.state.fromAirport
  );
  const [toAirport, setToAirport] = useState<Airport>(location.state.toAirport);

  const [departureDate, setDepartureDate] = useState<dayjs.Dayjs>(
    dayjs(location.state.departureDate, "YYYY-MM-DD")
  );
  const [returnDate, setReturnDate] = useState<dayjs.Dayjs>(
    location.state.returnDate
      ? dayjs(location.state.returnDate, "YYYY-MM-DD")
      : dayjs()
  );

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [modalSched, setModalSched] = useState<Schedule>();

  const [trip, setTrip] = useState<string>(location.state.trip);
  const [airports, setAirports] = useState<Airport[]>([]);

  const [seat, setSeat] = useState(location.state.seats);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [scheduleToRender, setScheduleToRender] = useState<Schedule[]>([]);
  const [, setUserName] = useState<string>("");

  const handleOpen = (schedule: Schedule) => {
    setModalSched(schedule);
    setIsModalOpen(true);
  };

  const [airportDetails, setAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);

  async function fetchName() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(api_base_url + "/users/me", {
      method: "get",
      headers: myHeaders,
    });
    const responseJson = await response.json();
    if (response.status !== 200) {
      alert("error: " + responseJson.message);
      return;
    }
    // make Sure this ok ==============

    setUserName(responseJson.data["firstName"]);
  }

  async function fetchInitialAirport() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(api_base_url + "/airport", {
      method: "get",
      headers: myHeaders,
    });
    const responseJson = await response.json();
    if (response.status !== 200) {
      alert("error: " + responseJson.message);
      return;
    }
    // make Sure this ok ==============
    setAirports(responseJson.data["airports"]);

    const det = airports.map((val) => {
      return { label: val.name ?? "", value: val.id ?? "" };
    });
    setAirportDetails(det);
    setFromAirportDetails(det);
    setToAirportDetails(det);
  }

  useEffect(() => {
    if (toAirportDetails.length <= 0) {
      console.log(airports);
      if (accessToken === null) {
        navigate("/login");
      }
      fetchInitialAirport();
      handleSearch();
      fetchName();
    }
  });

  const cabinClass = [
    {
      name: "ECONOMY",
      id: "78324468-f3a8-45a2-b0bb-393979ad98ef",
    },
    {
      name: "BUSINESS",
      id: "c7697502-59af-42c1-ae07-cb4839207c2a",
    },
    {
      name: "FIRST",
      id: "16ca89c7-242d-4f5f-aabc-43504c4d4bfb",
    },
  ];

  const ticketType = [
    {
      name: "SAVER",
      id: "228aaef8-8dd1-45fa-8b0d-7b8e03abc765",
    },
    {
      name: "FLEXI",
      id: "1bed4209-2022-4f46-ab59-516a1ae6af15",
    },
    {
      name: "PLUS",
      id: "abe66727-0be4-405b-8b9b-f4798f5ab1a1",
    },
  ];

  const [cabin, setCabin] = useState<number>(0);

  const changeSeats = (targetMap: Map<string, number>) => {
    setSeat(targetMap);
  };

  const changeCabin = (target: number) => {
    setCabin(target);
  };

  const onDepartureDatePick: DatePickerProps["onChange"] = (date) => {
    setDepartureDate(date!);
    console.log(departureDate?.toISOString() ?? "");
  };
  const onReturnDatePick: DatePickerProps["onChange"] = (date) => {
    setReturnDate(date!);
    console.log(returnDate?.toISOString() ?? "");
  };
  const dateFormat = "dddd, DD MMM YYYY";

  const customFormat: DatePickerProps["format"] = (value) =>
    value.format(dateFormat);

  const fromChange = (value: string) => {
    setFromAirport(
      airports.find((obj) => {
        return obj.id == value;
      })!
    );
  };
  const toChange = (value: string) => {
    setToAirport(
      airports.find((obj) => {
        return obj.id == value;
      })!
    );
  };

  const fromSearch = (value: string) => {
    setFromAirportDetails(
      airportDetails.filter((obj) => {
        return obj.label.includes(value);
      })
    );
  };

  const toSearch = (value: string) => {
    setToAirportDetails(
      airportDetails.filter((obj) => {
        return obj.label.includes(value);
      })
    );
  };
  const handleSearch = async () => {
    console.log("Searching...", dayjs.isDayjs(departureDate));
    //case found:
    const url = new URL(api_base_url + "/schedule-detail/getSchedules");
    url.searchParams.append("cabinClassId", cabinClass[0].id);
    url.searchParams.append("ticketTypeId", ticketType[0].id);
    url.searchParams.append("date", departureDate?.format("YYYY-MM-DD") ?? "");
    url.searchParams.append("fromAirportId", fromAirport?.id ?? "");
    url.searchParams.append("toAirportId", toAirport?.id ?? "");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(url.toString(), {
      method: "get",
      headers: myHeaders,
    });
    const responseJson = await response.json();

    if (response.status !== 200) {
      alert("error: " + responseJson.message);
      return;
    }
    // implement get schedules ==============

    const res = responseJson["data"] as ScheduleResult[];
    const target = res.map<Schedule>((val) => {
      const dep = dayjs(
        val.timeDeparture[0] +
          "-" +
          val.timeDeparture[1] +
          "-" +
          val.timeDeparture[2] +
          " " +
          val.timeDeparture[3] +
          ":" +
          val.timeDeparture[4],
        "YYYY-M-D H:m"
      );
      const ar = dayjs(
        val.timeArrive[0] +
          "-" +
          val.timeArrive[1] +
          "-" +
          val.timeArrive[2] +
          " " +
          val.timeArrive[3] +
          ":" +
          val.timeArrive[4],
        "YYYY-M-D H:m"
      );
      return {
        id: val.id,
        name: val.name,
        from: val.from,
        to: val.to,
        departureDate: dep,
        plane: val.airplane,
        arrivalDate: ar,
        duration: dep.diff(ar, "minute"),
        price: val.price,
      };
    });

    await setSchedules(target);
    await setPage(1);

    if (schedules.length != 0) {
      if (schedules.length > 4) {
        await setScheduleToRender(schedules.slice((page - 1) * 4, page * 4));
      } else {
        await setScheduleToRender(schedules.slice(0, schedules.length));
      }
    }
  };
  const onChangePage: PaginationProps["onShowSizeChange"] = (current) => {
    console.log(page);
    setPage(current);
    setScheduleToRender(schedules.slice((page - 1) * 4, page * 4 - 1));
  };

  const onChange = (e: RadioChangeEvent) => {
    setTrip(e.target.value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
      <Layout className="">
        <HeaderComponent />

        <Content className="flex-col">
          <div
            style={{
              position: "sticky",
              display: "flex",
              alignItems: "center",
            }}
            className="w-full px-8 py-6  bg-white border border-gray-100 flex-col justify-center items-start gap-6 inline-flex"
          >
            <div className="w-full self-stretch items-center gap-6 inline-flex">
              <div className="justify-start items-start gap-9 flex">
                <Radio.Group
                  buttonStyle="outline"
                  size="large"
                  className="text-primary"
                  defaultValue={trip}
                  onChange={onChange}
                >
                  <Radio value="one-way">
                    <p className="text-primary text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                      One - Way
                    </p>
                  </Radio>
                  <Radio value="round">
                    <p className="text-primary text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                      Round Trip
                    </p>
                  </Radio>
                </Radio.Group>
                <Divider type="vertical" className="h-6"></Divider>
                <Dropdown
                  trigger={["click"]}
                  className="gap-4 flex"
                  menu={{}}
                  dropdownRender={() => (
                    <PassengerField
                      seats={seat}
                      onChange={(target) => {
                        changeSeats(target);
                      }}
                    ></PassengerField>
                  )}
                >
                  <a
                    className="hover:text-primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>
                      <TeamOutlined style={{ fontSize: 24 }} />
                      <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                        Seats
                      </div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
                <Dropdown
                  trigger={["click"]}
                  className="gap-4 flex"
                  dropdownRender={() => (
                    <CabinField
                      chosen={cabin}
                      onChange={(target) => {
                        changeCabin(target);
                      }}
                    ></CabinField>
                  )}
                >
                  <a
                    className="hover:text-primary"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Space>
                      <DollarOutlined style={{ fontSize: 24 }} />
                      <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                        {cabin == 0 ? (
                          <>Economy</>
                        ) : cabin == 1 ? (
                          <>Business</>
                        ) : (
                          <>First</>
                        )}
                      </div>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="self-stretch justify-start items-center gap-6 inline-flex">
              <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                <div className=" justify-center flex-grow items-center gap-2 flex">
                  <div className="flex-grow basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                      <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                        From
                      </div>
                    </div>
                    <div className="px-5 py-[8px] w-full rounded-xl border border-gray-100 justify-start items-center inline-flex">
                      <Select
                        showSearch
                        bordered={false}
                        title="Where From"
                        placeholder="Where From ?"
                        dropdownStyle={{
                          backgroundColor: "white",
                          width: "fit-content",
                          padding: "24px",
                        }}
                        style={{
                          color: "white",
                          borderColor: "transparent",
                          border: "0px solid",
                          backgroundColor: "transparent",
                        }}
                        className="w-full"
                        value={
                          fromAirport == undefined ? null : fromAirport.name
                        }
                        optionFilterProp="children"
                        onChange={fromChange}
                        onSearch={fromSearch}
                        filterOption={filterOption}
                        options={fromAirportDetails}
                        notFoundContent={
                          <>
                            <img
                              className="p-8 w-[430px]"
                              src="src/assets/not-found.svg"
                            ></img>
                          </>
                        }
                        optionRender={(_, i) => {
                          const target = toAirportDetails[i.index];
                          const a = airports.find((a) => a.id == target.value);
                          return (
                            <div className="w-[382px] h-[68px] py-2 justify-center items-center gap-4 inline-flex">
                              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                  {a?.city ?? ""}, Indonesia
                                </div>
                                <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                                  {a?.name}
                                </div>
                              </div>
                              <div className="p-2 bg-emerald-100 rounded flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-center text-teal-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                                  {a?.abv}
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      const temp = fromAirport;
                      setFromAirport(toAirport);
                      setToAirport(temp);
                    }}
                    className=""
                    type="primary"
                    style={{ backgroundColor: "#38A993" }}
                    shape="circle"
                    icon={<SwapOutlined />}
                    size="large"
                  />
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                      <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                        To
                      </div>
                    </div>
                    <div className="px-5 w-full py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">
                      <Select
                        bordered={false}
                        title="To"
                        dropdownStyle={{
                          backgroundColor: "white",
                          padding: "24px",
                          width: "fit-content",
                        }}
                        value={toAirport == undefined ? null : toAirport.name}
                        showSearch
                        className="w-full"
                        placeholder="Where to ?"
                        optionFilterProp="children"
                        onChange={toChange}
                        onSearch={toSearch}
                        style={{
                          color: "white",
                          borderColor: "transparent",
                          border: "0px solid",
                          backgroundColor: "transparent",
                        }}
                        options={toAirportDetails}
                        notFoundContent={
                          <>
                            <img
                              className="p-4 w-[430px]"
                              src="src/assets/not-found.svg"
                            ></img>
                          </>
                        }
                        filterOption={filterOption}
                        optionRender={(_, i) => {
                          const target = toAirportDetails[i.index];
                          const a = airports.find((a) => a.id == target.value);
                          return (
                            <div className="w-[382px] h-[68px] py-2 justify-center items-center gap-4 inline-flex">
                              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                  {a?.city ?? ""}, Indonesia
                                </div>
                                <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                                  {a?.name}
                                </div>
                              </div>
                              <div className="p-2 bg-emerald-100 rounded flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-center text-teal-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                                  {a?.abv}
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                {trip == "one-way" ? (
                  <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                      <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                          Departure Date
                        </div>
                      </div>

                      <div className="self-stretch px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center gap-3 inline-flex">
                        <DatePicker
                          value={departureDate}
                          onChange={onDepartureDatePick}
                          style={{ width: "100%" }}
                          className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                          bordered={false}
                          format={customFormat}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-row ">
                    <div className="grow shrink basis-0 flex-col  justify-start items-start mr-3 gap-2 inline-flex">
                      <div className="bg-white justify-start items-start inline-flex">
                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                          Departure Date
                        </div>
                      </div>

                      <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">
                        <DatePicker
                          onChange={onDepartureDatePick}
                          style={{ width: "100%" }}
                          className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                          bordered={false}
                          format={customFormat}
                        />
                      </div>
                    </div>
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                      <div className="bg-white justify-start items-start inline-flex">
                        <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                          Return Date
                        </div>
                      </div>

                      <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">
                        <DatePicker
                          onChange={onReturnDatePick}
                          style={{ width: "100%" }}
                          className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal"
                          bordered={false}
                          format={customFormat}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSearch}
                type="submit"
                className="my-4 justify-center rounded-xl flex-col bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm"
              >
                <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
                  Search Flights
                </p>
              </button>
              ,
            </div>
          </div>
          <div className="relative min-h-[50vh] ">
            <img
              className="absolute top-8 right-8 w-[309px] h-[345px]"
              src={GambarPocket}
            />

            <div className="content-center pt-8 pb-4 justify-center origin-center items-center text-center">
              <div className="w-[646px] h-[152px] content-center text-left px-4 pt-4 pb-2 bg-white rounded-2xl flex-col gap-2 inline-flex">
                <div className="self-stretch justify-start items-start gap-4 inline-flex">
                  <a
                    onClick={() => {
                      setCabin(0);
                    }}
                    className={
                      "grow shrink basis-0 p-3 " +
                      (cabin == 0 ? "bg-primary" : " bg-white rounded-xl") +
                      " rounded-xl flex-col justify-center items-start gap-3 inline-flex"
                    }
                  >
                    <div
                      className={
                        "self-stretch " +
                        (cabin == 0 ? "text-white" : "text-neutral-900") +
                        " text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight"
                      }
                    >
                      ECONOMY SAVER
                    </div>
                    <div className="self-stretch justify-between items-center inline-flex">
                      <div
                        className={
                          (cabin == 0 ? "text-white" : "text-gray-500") +
                          " text-xs font-medium font-['Plus Jakarta Sans'] leading-none"
                        }
                      >
                        Start from
                      </div>
                      <div
                        className={
                          (cabin == 0 ? "text-white" : "text-neutral-900") +
                          " text-base font-bold font-['Plus Jakarta Sans'] leading-normal"
                        }
                      >
                        IDR 1,570K
                      </div>
                    </div>
                  </a>
                  <a
                    onClick={() => {
                      setCabin(1);
                    }}
                    className={
                      "grow shrink basis-0 p-3 " +
                      (cabin == 1 ? "bg-primary" : " bg-white rounded-xl") +
                      " rounded-xl flex-col justify-center items-start gap-3 inline-flex"
                    }
                  >
                    <div
                      className={
                        "self-stretch " +
                        (cabin == 1 ? "text-white" : "text-neutral-900") +
                        " text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight"
                      }
                    >
                      ECONOMY FLEXI
                    </div>
                    <div className="self-stretch justify-between items-center inline-flex">
                      <div
                        className={
                          (cabin == 1 ? "text-white" : "text-gray-500") +
                          " text-xs font-medium font-['Plus Jakarta Sans'] leading-none"
                        }
                      >
                        Start from
                      </div>
                      <div
                        className={
                          (cabin == 1 ? "text-white" : "text-neutral-900") +
                          " text-base font-bold font-['Plus Jakarta Sans'] leading-normal"
                        }
                      >
                        IDR 2,535K
                      </div>
                    </div>
                  </a>
                  <a
                    onClick={() => {
                      setCabin(2);
                    }}
                    className={
                      "grow shrink basis-0 p-3 " +
                      (cabin == 2 ? "bg-primary" : " bg-white rounded-xl") +
                      " rounded-xl flex-col justify-center items-start gap-3 inline-flex"
                    }
                  >
                    <div
                      className={
                        "self-stretch " +
                        (cabin == 2 ? " text-white" : "text-neutral-900") +
                        " text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight"
                      }
                    >
                      ECONOMY PLUS
                    </div>
                    <div className="self-stretch justify-between items-center inline-flex">
                      <div
                        className={
                          (cabin == 2 ? "text-white" : "text-gray-500") +
                          " text-xs font-medium font-['Plus Jakarta Sans'] leading-none"
                        }
                      >
                        Start from
                      </div>
                      <div
                        className={
                          (cabin == 2 ? "text-white" : "text-neutral-900") +
                          " text-base font-bold font-['Plus Jakarta Sans'] leading-normal"
                        }
                      >
                        IDR3,290K
                      </div>
                    </div>
                  </a>
                </div>
                <div className="self-stretch justify-between items-center inline-flex">
                  <div className="w-[195px] text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                    10 Seat(s) left
                  </div>
                  <div className="py-3 rounded-lg flex-col justify-center items-center gap-3 inline-flex">
                    <div className="self-stretch justify-center items-center gap-3 inline-flex">
                      <div className="text-center text-emerald-400 text-xs font-bold font-['Plus Jakarta Sans'] leading-none">
                        Compare Fare
                      </div>
                      <div className="w-3 h-3 justify-center items-center flex">
                        <div className="w-3 h-3 relative"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {schedules.length == 0 ? (
              <div className="flex-col ">
                <img
                  className="p-8 m-auto w-[430px]"
                  src="src/assets/not-found.svg"
                ></img>
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <div className="w-full flex-col justify-center items-center gap-5 inline-flex py-8">
                  {scheduleToRender.map((value) => {
                    if (schedules.length > 0 && scheduleToRender.length == 0) {
                      if (schedules.length > 4) {
                        setScheduleToRender(
                          schedules.slice((page - 1) * 4, page * 4)
                        );
                      } else {
                        setScheduleToRender(
                          schedules.slice(0, schedules.length)
                        );
                      }
                    }
                    const hours = Math.floor(value.duration / 60);
                    const minutes = value.duration % 60;
                    return (
                      <>
                        <a
                          onClick={() => {
                            handleOpen(value);
                          }}
                          className="justify-center items-center"
                        >
                          <div className=" shadow justify-center items-center inline-flex">
                            <div className="grow shrink basis-0 px-6 pb-5 bg-white rounded-xl flex-col justify-center items-center gap-2.5 inline-flex">
                              <div className="self-stretch justify-start items-end gap-[5.01px] inline-flex">
                                <div className="w-[65px] flex-col justify-start items-start gap-1 inline-flex">
                                  <div className="text-neutral-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                                    {value.arrivalDate.format("HH:mm")}
                                  </div>
                                  <div className="text-primary text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                                    {value.from.abv}
                                  </div>
                                  <div className="self-stretch text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                                    {value.arrivalDate.format("D MMM")}
                                  </div>
                                </div>
                                <div className="grow shrink basis-0 self-stretch pt-3 flex-col justify-between items-center inline-flex">
                                  <div className="text-center text-slate-800 text-[15.03px] font-medium font-['Plus Jakarta Sans'] ">
                                    {" "}
                                    {hours}h {minutes}m{}
                                  </div>
                                  <div className="w-[225px] pt-3 justify-center items-center gap-1 inline-flex">
                                    <div className="w-[16.39px] h-[15.58px] relative">
                                      <div className="w-[16.39px] h-[15.58px] left-0 top-0 absolute opacity-50 bg-primary rounded-full" />
                                      <div className="w-[9.84px] h-[9.35px] left-[3.28px] top-[3.12px] absolute bg-primary rounded-full" />
                                    </div>
                                    <div className="grow shrink basis-0 h-[0px] border border-gray-200"></div>
                                    <div className="w-10 rotate-45 justify-center items-center flex">
                                      <img src="airplane.svg" alt="" />
                                    </div>
                                    <div className="grow shrink basis-0 h-[0px] border border-gray-200"></div>
                                    <div className="w-[16.39px] h-[15.58px] relative">
                                      <div className="w-[16.39px] h-[15.58px] left-0 top-0 absolute opacity-50 bg-primary rounded-full" />

                                      <div className="w-[9.84px] h-[9.35px] left-[3.28px] top-[3.12px] absolute bg-primary rounded-full" />
                                    </div>
                                  </div>
                                  <div className="text-center text-slate-800 text-[15.03px] font-medium font-['Plus Jakarta Sans'] ">
                                    Direct
                                  </div>
                                </div>
                                <div className="w-[61px] flex-col justify-start items-end gap-1 inline-flex">
                                  <div className="text-right text-neutral-900 text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                                    {value.arrivalDate
                                      .add(value.duration, "minute")
                                      .format("HH:mm")}
                                  </div>
                                  <div className="text-right text-primary text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                                    {value.to.abv}
                                  </div>
                                  <div className="self-stretch text-right text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                                    {value.arrivalDate
                                      .add(value.duration, "minute")
                                      .format("D MMM")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch px-6 py-5 bg-white rounded-xl flex-col justify-center items-start gap-3 inline-flex">
                              <div className="self-stretch justify-start items-center gap-2 inline-flex">
                                <div className="w-[31.60px] h-[31.60px] relative">
                                  <LogoImage />
                                </div>
                                <div className="flex-col justify-center items-start inline-flex">
                                  <div className="text-center text-neutral-900 text-xs font-semibold font-['Plus Jakarta Sans'] leading-none">
                                    SE 955
                                  </div>
                                  <div className="text-center text-gray-500 text-xs font-light font-['Plus Jakarta Sans'] leading-none">
                                    Boeing 777-300ER
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch justify-start items-center gap-1 inline-flex">
                                <div className="text-primary text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                                  IDR 1,950K
                                </div>
                                <div className="text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                                  /pax
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </>
                    );
                  })}
                </div>
                {schedules.length > 0 ? (
                  <Pagination
                    className="text-center pt-8"
                    onChange={onChangePage}
                    defaultCurrent={1}
                    total={schedules.length}
                    pageSize={4}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            )}
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
      <Modal
        className=" bg-white shadow border p-0 w-fit border-zinc-300 "
        open={isModalOpen}
        title={
          <div className="self-stretch w-full border-zinc-300 border-b  p-4 justify-start items-center gap-4 inline-flex">
            <div className="grow shrink basis-0 text-center text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">
              Flight Detail
            </div>
          </div>
        }
        maskClosable={true}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        closable={true}
        width={"fit-content"}
        footer={<div></div>}
      >
        <div className="w-full rounded-3xl flex-col justify-start items-start inline-flex">
          <div className="pt-8 px-8 justify-center items-center gap-8 inline-flex">
            <div className="self-stretch flex-col justify-start items-start gap-6 inline-flex">
              <div className=" h-6 text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                {modalSched?.from.city +
                  " (" +
                  modalSched?.from.abv +
                  ") to " +
                  modalSched?.to.city +
                  " (" +
                  modalSched?.to.abv +
                  ")"}
              </div>
              <div className="w-[428px] h-[391px] relative">
                <div className="left-0 top-[4px] absolute text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                  Total travel time
                </div>
                <div className="px-3 py-1 left-[115px] top-0 absolute bg-emerald-100 rounded-lg justify-center items-center gap-2.5 inline-flex">
                  <div className="text-teal-700 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                    {modalSched?.duration + "m"}
                  </div>
                </div>
                <div className="h-14 left-[2px] top-[48px] absolute flex-col justify-center items-center gap-2 inline-flex">
                  <div className="self-stretch text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    {modalSched?.departureDate.format("HH:mm")}
                  </div>
                  <div className="self-stretch text-center text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                    {modalSched?.departureDate.format("MMM DD")}
                  </div>
                </div>
                <div className="h-14 left-0 top-[335px] absolute flex-col justify-center items-center gap-2 inline-flex">
                  <div className="self-stretch text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    {modalSched?.arrivalDate.format("HH:mm")}
                  </div>
                  <div className="self-stretch text-center text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                    {modalSched?.arrivalDate.format("MMM DD")}
                  </div>
                </div>
                <div className="left-[146px] top-[48px] absolute flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    {modalSched?.from.city +
                      " (" +
                      modalSched?.from.abv +
                      "), Indonesia"}
                  </div>
                  <div className="text-neutral-900 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                    {modalSched?.from.name}
                  </div>
                  <div className="text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                    Terminal X
                  </div>
                </div>
                <div className="left-[146px] top-[307px] absolute flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    {modalSched?.to.city +
                      " (" +
                      modalSched?.to.abv +
                      "), Indonesia"}
                  </div>
                  <div className="text-neutral-900 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                    {modalSched?.to.name}
                  </div>
                  <div className="text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                    Terminal X
                  </div>
                </div>
                <div className="w-5 h-[300px] left-[94px] top-[56px] absolute">
                  <div className="w-28 h-[0px] left-[5px] top-[173px] absolute origin-top-left rotate-90 border-2 border-emerald-400"></div>
                  <div className="w-28 h-[0px] left-[5px] top-[14px] absolute origin-top-left rotate-90 border-2 border-emerald-400"></div>
                  <div className="w-3 h-3 -left-[2px]  -top-[3px] absolute bg-white rounded-full border-2 border-emerald-400" />
                  <div className="w-8 h-8 -left-[12px] top-[135px] rounded-full rotate-90 bg-primary absolute">
                    <img
                      src={Airplane}
                      alt="Icon Airplane"
                      className="rotate-45"
                    />
                  </div>
                  <div className="w-3 h-3 -left-[2px] top-[290px] absolute bg-primary rounded-full border-2 border-emerald-400" />
                </div>
                <div className="h-[66px] px-6 py-3 left-[146px] top-[176px] absolute bg-gray-100 rounded-2xl border border-gray-200 flex-col justify-center items-start gap-1 inline-flex">
                  <div className="justify-start items-start gap-1.5 inline-flex">
                    <div className="w-[18px] h-[18px] justify-center items-center gap-[3.72px] flex">
                      <div className="w-[17.77px] h-[17.77px] relative">
                        <div className="w-[16.76px] h-[16.76px] left-[0.62px] top-[0.62px] absolute bg-primary rounded-full">
                          <LogoImage />
                        </div>

                        <div className="w-[12.57px] h-[12.57px] left-[8.97px] top-0 absolute origin-top-left rotate-[45.56deg]">
                          <div className="w-[12.57px] h-[12.57px] left-0 top-0 absolute"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-col justify-center items-start gap-1.5 inline-flex">
                      <div className="text-slate-700 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                        {modalSched?.plane.name +
                          " • " +
                          modalSched?.plane.code}
                      </div>
                      <div className="flex-col justify-center items-start gap-1 flex">
                        <div className="text-center text-gray-500 text-xs font-medium font-['Plus Jakarta Sans'] leading-none">
                          Boeing 777-300ER
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="left-[8px] top-[199px] absolute text-center text-gray-500 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                  {modalSched?.duration + "m"}
                </div>
              </div>
            </div>
            <div className="self-stretch flex-col justify-between items-center inline-flex">
              <div className="h-[386px] flex-col justify-center items-start gap-4 flex">
                <div className="self-stretch justify-start items-center gap-4 inline-flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                    <div className="text-primary text-lg font-bold font-['Plus Jakarta Sans'] leading-7">
                      Economy Saver
                    </div>
                    <div className="text-neutral-900 text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                      Fare Conditions
                    </div>
                  </div>
                  <div className="py-3 rounded-lg flex-col justify-center items-center gap-3 inline-flex">
                    <div className="self-stretch justify-center items-center gap-3 inline-flex">
                      <div className="text-center text-primary text-xs font-bold font-['Plus Jakarta Sans'] leading-none">
                        Compare Fare
                      </div>
                      <div className="w-3 h-3 justify-center items-center flex">
                        <div className="w-3 h-3 relative"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start items-center gap-12 inline-flex">
                  <div className="flex-col justify-start items-start gap-5 inline-flex">
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="w-5 h-5 relative" />
                      <div className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        Cabin Baggage
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-2 inline-flex">
                      <div className="w-5 h-5 p-[1.67px] justify-center items-center flex">
                        <div className="w-[16.67px] h-[16.67px] relative"></div>
                      </div>
                      <div className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        Checked Baggage
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="w-5 h-5 relative" />
                      <div className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        Seat Selection
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="w-5 h-5 pl-[3.33px] pr-[1.67px] py-[1.67px] justify-center items-center flex">
                        <div className="w-[15px] h-[16.67px] relative"></div>
                      </div>
                      <div className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        Baggage Delay Protection
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="w-5 h-5 relative" />
                      <div className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        Meal Pack
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="w-5 h-5 justify-center items-center flex">
                        <div className="w-5 h-5 relative"></div>
                      </div>
                      <div className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        Cancellation
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="w-5 h-5 justify-center items-center flex">
                        <div className="w-5 h-5 relative"></div>
                      </div>
                      <div className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        Flight Change
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-center gap-2 inline-flex">
                      <div className="w-5 h-5 justify-center items-center flex">
                        <div className="w-5 h-5 relative"></div>
                      </div>
                      <div className="text-slate-600 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                        No Show
                      </div>
                    </div>
                  </div>
                  <div className="grow shrink basis-0 flex-col justify-center items-start gap-5 inline-flex">
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      1 pc x 7 kg
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      1 pc x 23 kg
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      Standard Seat
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      Not Include
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      Include
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      Not Allowed
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      Not Allowed
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      Not Allowed
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-start items-center gap-[63px] inline-flex">
                <div className="h-9 justify-start items-center gap-1 flex">
                  <div className="text-primary text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">
                    1,950K IDR{" "}
                  </div>
                  <div className="text-gray-500 text-xl font-medium font-['Plus Jakarta Sans'] leading-7">
                    /pax
                  </div>
                </div>
                <a
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="w-[136px] p-3.5 bg-primary rounded-[10px] flex-col justify-center items-center gap-3 inline-flex"
                >
                  <div className="self-stretch text-center text-white text-sm font-bold font-['Plus Jakarta Sans'] leading-tight">
                    Select Flight
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default Index;
