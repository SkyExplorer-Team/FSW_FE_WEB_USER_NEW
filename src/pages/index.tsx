import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Dropdown,
  Layout,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
} from "antd";
import { MenuProps } from "antd/lib";
import { TeamOutlined, DollarOutlined, SwapOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import PassengerField from "../components/passenger_field";
import CabinField from "../components/cabin_field";
import HomeInfo1 from "../components/home_info1";
import HomeFooter from "../components/home_footer";
import Chevron from "/assets/chevron-down.svg";
import ChevronClicked from "/assets/chevron-clicked.svg";
import IconMenu from "/assets/menu.svg";
import IconUser from "/assets/user.svg";
import HeaderComponent from "../components/Header";

dayjs.extend(customParseFormat);

const { Header, Content, Footer } = Layout;

const api_base_url = "https://be-java-master-production.up.railway.app";

interface Airport {
  id: string | undefined;
  name: string | undefined;
  abv: string | undefined;
  city: string | undefined;
}

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [airports, setAirports] = useState<Airport[]>([]);
  const [airportDetails, setAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [fromAirportDetails, setFromAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [toAirportDetails, setToAirportDetails] = useState<
    { label: string; value: string }[]
  >([]);
  const [fromAirport, setFromAirport] = useState<Airport>();
  const [toAirport, setToAirport] = useState<Airport>();

  const [departureDate, setdepartureDate] = useState<dayjs.Dayjs>(dayjs());
  const [returnDate, setReturnDate] = useState<dayjs.Dayjs>(dayjs());

  const [userName, setUserName] = useState<string>("");

  const accessToken = localStorage.getItem("access_token");
  async function fetchName() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(api_base_url + "/api/users/me", {
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

    const response = await fetch(api_base_url + "/api/airport", {
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
    if (accessToken === null) {
      navigate("/login");
    }
    if (toAirportDetails.length <= 0) {
      console.log(airports);
      fetchInitialAirport();
      fetchName();
      fetchInitialAirport();
    }
  });
  const [seat, setSeat] = useState(
    new Map<string, number>([
      ["adults", 0],
      ["children", 0],
      ["infant", 0],
    ])
  );

  const [cabin, setCabin] = useState<number>(0);

  const changeSeats = (targetMap: Map<string, number>) => {
    setSeat(targetMap);
  };

  const changeCabin = (target: number) => {
    setCabin(target);
  };

  const onDepartureDatePick: DatePickerProps["onChange"] = (date) => {
    setdepartureDate(date!);
  };
  const onReturnDatePick: DatePickerProps["onChange"] = (date) => {
    setReturnDate(date!);
  };

  const navigate = useNavigate();

  const dateFormat = "dddd, DD MMM YYYY";

  const customFormat: DatePickerProps["format"] = (value) =>
    value.format(dateFormat);

  const fromChange = (value: string) => {
    setFromAirport(
      airports.find((obj) => {
        return obj.id == value;
      })
    );
  };
  const toChange = (value: string) => {
    setToAirport(
      airports.find((obj) => {
        return obj.id == value;
      })
    );
    console.log(toAirport?.city);
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

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          Items
        </a>
      ),
    },
  ];

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSearch = async () => {
    // navigate("/result", {
    //     state: {
    //         trip: trip,
    //         seats: seat,
    //         cabin: cabin,
    //         fromAirport: fromAirport,
    //         toAirport: toAirport,
    //         departureDate: departureDate,
    //         returnDate: returnDate,
    //     },
    // });
    showModal();
  };

  const handleStatus = () => {
    navigate("/status");
  };

  const [trip, setTrip] = useState<string>("one-way");

  const onChange = (e: RadioChangeEvent) => {
    setTrip(e.target.value);
  };
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };

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
          <div>
            {/* div infront */}
            <div className="relative">
              <img className="w-full" src="src/assets/Illustration.svg"></img>
              <div className="absolute w-full m-auto -bottom-[10%] snap-center self-center text-center ">
                <div className=" p-6  bg-white rounded-[20px] shadow border border-gray-200 flex-col justify-center items-start gap-6 inline-flex">
                  <div className="self-stretch justify-start items-center gap-6 inline-flex">
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
                          className={`hover:text-primary ${
                            isClicked ? "clicked" : ""
                          }`}
                          onClick={handleButtonClick}
                        >
                          <Space>
                            <TeamOutlined style={{ fontSize: 24 }} />
                            <div className="text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                              Seats
                            </div>
                            <img
                              src={isClicked ? ChevronClicked : Chevron}
                              alt="Chevron"
                              className="h-4 w-4"
                            />
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
                          className={`hover:text-primary ${
                            isClicked ? "clicked" : ""
                          }`}
                          onClick={handleButtonClick}
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
                            <img
                              src={isClicked ? ChevronClicked : Chevron}
                              alt="Chevron"
                              className="h-4 w-4"
                            />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-center gap-6 inline-flex">
                    <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                      <div className=" justify-center items-center gap-2 flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                          <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                            <div className="text-neutral text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                              From
                            </div>
                          </div>
                          <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">
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
                              value={
                                fromAirport == undefined
                                  ? null
                                  : fromAirport.name
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
                                const a = airports.find(
                                  (a) => a.id == target.value
                                );
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
                            <div className="text-neutral text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                              To
                            </div>
                          </div>
                          <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center inline-flex">
                            <Select
                              bordered={false}
                              title="To"
                              dropdownStyle={{
                                backgroundColor: "white",
                                padding: "24px",
                                width: "fit-content",
                              }}
                              value={
                                toAirport == undefined ? null : toAirport.name
                              }
                              showSearch
                              placeholder="Where To ?"
                              optionFilterProp="children"
                              onChange={toChange}
                              onSearch={toSearch}
                              style={{
                                color: "white",
                                borderColor: "transparent",
                                border: "0px solid",
                                backgroundColor: "transparent",
                              }}
                              notFoundContent={
                                <>
                                  <img
                                    className="p-4 w-[430px]"
                                    src="src/assets/not-found.svg"
                                  ></img>
                                </>
                              }
                              options={toAirportDetails}
                              filterOption={filterOption}
                              optionRender={(_, i) => {
                                const target = toAirportDetails[i.index];
                                const a = airports.find(
                                  (a) => a.id == target.value
                                );
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
                                onChange={onDepartureDatePick}
                                disabledDate={(d) => {
                                  return (
                                    d.isBefore(dayjs().add(-1, "day")) ||
                                    d.isAfter(dayjs().add(2, "month"))
                                  );
                                }}
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
                              <div className="text-neutral text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                                Departure Date
                              </div>
                            </div>

                            <div className="py-[8px] rounded-xl border border-gray-100 justify-start items-center">
                              <DatePicker
                                disabledDate={(d) => {
                                  return (
                                    d.isBefore(dayjs().add(-1, "day")) ||
                                    d.isAfter(dayjs().add(2, "month"))
                                  );
                                }}
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
                                disabledDate={(d) => {
                                  return (
                                    d.isBefore(dayjs().add(-1, "day")) ||
                                    d.isAfter(dayjs().add(2, "month"))
                                  );
                                }}
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
                      disabled={fromAirport && toAirport ? false : true}
                      type="submit"
                      className="my-4 justify-center rounded-2xl flex-col bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm"
                    >
                      <p className="self-stretch text-center text-white text-base font-semibold font-['Plus Jakarta Sans'] leading-normal p-2">
                        Search Flights
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-32"></div>

          <HomeInfo1 />
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
        className="font-['Plus Jakarta Sans']"
        open={isModalOpen}
        title={
          <div style={{ textAlign: "center" }}>Alternative Departure Date</div>
        }
        closable={false}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        style={{ borderRadius: "16px", border: "1px solid white" }}
      >
        <div>
          <div className="justify-start w-full items-start gap-6 ">
            <div className="flex-col justify-start items-center gap-3 w-full">
              <div className="self-stretch h-[106px]  flex-col justify-center items-center gap-2 flex">
                <div className="justify-center items-center m-auto gap-5 inline-flex">
                  <div className="w-[100px] flex-col justify-start items-center inline-flex">
                    <div className="text-center text-neutral-900 text-4xl font-bold font-['Plus Jakarta Sans'] leading-[54px]">
                      {fromAirport?.abv ?? ""}
                    </div>
                    <div className="text-center text-gray-400 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {fromAirport?.city ?? ""}
                    </div>
                  </div>
                  <div className="w-9 h-9 justify-center items-center flex">
                    <div className="w-9 h-9 relative">
                      <img src="src/assets/arrow-right.svg"></img>
                    </div>
                  </div>
                  <div className="w-[100px] flex-col justify-start items-center inline-flex">
                    <div className="text-center text-neutral-900 text-4xl font-bold font-['Plus Jakarta Sans'] leading-[54px]">
                      {toAirport?.abv ?? ""}
                    </div>
                    <div className="text-center text-gray-400 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {toAirport?.city ?? ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow border border-gray-200 flex-col justify-start items-start flex">
                <a
                  onClick={() => {
                    navigate("/result", {
                      state: {
                        trip: trip,
                        seats: seat,
                        cabin: cabin,
                        fromAirport: fromAirport,
                        toAirport: toAirport,
                        departureDate: departureDate.format("YYYY-MM-DD"),
                        returnDate: returnDate.format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  className="self-stretch justify-start items-center inline-flex"
                >
                  <div className="w-[88px] self-stretch px-4 py-2.5 bg-primary flex-col justify-center items-start gap-1 inline-flex">
                    <div className="self-stretch text-white text-xs font-normal font-['Plus Jakarta Sans'] leading-none">
                      Depart
                    </div>
                    <div className="self-stretch text-white text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {(departureDate == undefined
                        ? dayjs()
                        : departureDate
                      ).format("DD MMM [\n]ddd") ?? ""}
                    </div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch pl-[100px] pr-4 py-2 bg-primary-background flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch h-[52px] flex-col justify-center items-start gap-1 flex">
                      <div className="self-stretch text-teal-700 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                        From
                      </div>
                      <div className="self-stretch text-teal-700 text-lg font-bold font-['Plus Jakarta Sans'] leading-7">
                        1,570K IDR
                      </div>
                    </div>
                  </div>
                </a>
                <div className="self-stretch h-[0px] border border-gray-100"></div>
                <a
                  onClick={() => {
                    navigate("/result", {
                      state: {
                        trip: trip,
                        seats: seat,
                        cabin: cabin,
                        fromAirport: fromAirport,
                        toAirport: toAirport,
                        departureDate: departureDate
                          .add(1, "day")
                          .format("YYYY-MM-DD"),
                        returnDate: returnDate.format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  className="self-stretch justify-start items-center inline-flex"
                >
                  <div className="w-[88px] self-stretch px-4 py-2.5 bg-gray-100 flex-col justify-center items-start gap-1 inline-flex">
                    <div className="self-stretch text-gray-500 text-xs font-normal font-['Plus Jakarta Sans'] leading-none">
                      Depart
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {(departureDate == undefined ? dayjs() : departureDate)
                        .add(1, "day")
                        .format("DD MMM") ?? ""}
                    </div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch pl-[100px] pr-4 py-2 bg-white flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch h-[52px] flex-col justify-center items-start gap-1 flex">
                      <div className="self-stretch text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                        From
                      </div>
                      <div className="self-stretch text-neutral-900 text-lg font-bold font-['Plus Jakarta Sans'] leading-7">
                        1,625K IDR
                      </div>
                    </div>
                  </div>
                </a>
                <div className="self-stretch h-[0px] border border-gray-100"></div>
                <a
                  onClick={() => {
                    navigate("/result", {
                      state: {
                        trip: trip,
                        seats: seat,
                        cabin: cabin,
                        fromAirport: fromAirport,
                        toAirport: toAirport,
                        departureDate: departureDate
                          .add(2, "day")
                          .format("YYYY-MM-DD"),
                        returnDate: returnDate.format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  className="self-stretch justify-start items-center inline-flex"
                >
                  {" "}
                  <div className="w-[88px] self-stretch px-4 py-2.5 bg-gray-100 flex-col justify-center items-start gap-1 inline-flex">
                    <div className="self-stretch text-gray-500 text-xs font-normal font-['Plus Jakarta Sans'] leading-none">
                      Depart
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {(departureDate == undefined ? dayjs() : departureDate)
                        .add(2, "day")
                        .format("DD MMM") ?? ""}
                    </div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch pl-[100px] pr-4 py-2 bg-white flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch h-[52px] flex-col justify-center items-start gap-1 flex">
                      <div className="self-stretch text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                        No Flight
                      </div>
                      <div className="self-stretch text-neutral-900 text-lg font-bold font-['Plus Jakarta Sans'] leading-7">
                        Not Available
                      </div>
                    </div>
                  </div>
                </a>
                <div className="self-stretch h-[0px] border border-gray-100"></div>
                <a
                  onClick={() => {
                    navigate("/result", {
                      state: {
                        trip: trip,
                        seats: seat,
                        cabin: cabin,
                        fromAirport: fromAirport,
                        toAirport: toAirport,
                        departureDate: departureDate
                          .add(3, "day")
                          .format("YYYY-MM-DD"),
                        returnDate: returnDate.format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  className="self-stretch justify-start items-center inline-flex"
                >
                  {" "}
                  <div className="w-[88px] self-stretch px-4 py-2.5 bg-gray-100 flex-col justify-center items-start gap-1 inline-flex">
                    <div className="self-stretch text-gray-500 text-xs font-normal font-['Plus Jakarta Sans'] leading-none">
                      Depart
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {(departureDate == undefined ? dayjs() : departureDate)
                        .add(3, "day")
                        .format("DD MMM") ?? ""}
                    </div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch pl-[100px] pr-4 py-2 bg-white flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch h-[52px] flex-col justify-center items-start gap-1 flex">
                      <div className="self-stretch text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                        From
                      </div>
                      <div className="self-stretch text-neutral-900 text-lg font-bold font-['Plus Jakarta Sans'] leading-7">
                        1,800K IDR
                      </div>
                    </div>
                  </div>
                </a>
                <div className="self-stretch h-[0px] border border-gray-100"></div>
                <a
                  onClick={() => {
                    navigate("/result", {
                      state: {
                        trip: trip,
                        seats: seat,
                        cabin: cabin,
                        fromAirport: fromAirport,
                        toAirport: toAirport,
                        departureDate: departureDate
                          .add(4, "day")
                          .format("YYYY-MM-DD"),
                        returnDate: returnDate.format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  className="self-stretch justify-start items-center inline-flex"
                >
                  {" "}
                  <div className="w-[88px] self-stretch px-4 py-2.5 bg-gray-100 flex-col justify-center items-start gap-1 inline-flex">
                    <div className="self-stretch text-gray-500 text-xs font-normal font-['Plus Jakarta Sans'] leading-none">
                      Depart
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {(departureDate == undefined ? dayjs() : departureDate)
                        .add(4, "day")
                        .format("DD MMM") ?? ""}
                    </div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch pl-[100px] pr-4 py-2 bg-white flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch h-[52px] flex-col justify-center items-start gap-1 flex">
                      <div className="self-stretch text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                        From
                      </div>
                      <div className="self-stretch text-neutral-900 text-lg font-bold font-['Plus Jakarta Sans'] leading-7">
                        1,599K IDR
                      </div>
                    </div>
                  </div>
                </a>
                <div className="self-stretch h-[0px] border border-gray-100"></div>
                <a
                  onClick={() => {
                    navigate("/result", {
                      state: {
                        trip: trip,
                        seats: seat,
                        cabin: cabin,
                        fromAirport: fromAirport,
                        toAirport: toAirport,
                        departureDate: departureDate
                          .add(5, "day")
                          .format("YYYY-MM-DD"),
                        returnDate: returnDate.format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  className="self-stretch justify-start items-center inline-flex"
                >
                  {" "}
                  <div className="w-[88px] self-stretch px-4 py-2.5 bg-gray-100 flex-col justify-center items-start gap-1 inline-flex">
                    <div className="self-stretch text-gray-500 text-xs font-normal font-['Plus Jakarta Sans'] leading-none">
                      Depart
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {(departureDate == undefined ? dayjs() : departureDate)
                        .add(5, "day")
                        .format("DD MMM") ?? ""}
                    </div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch pl-[100px] pr-4 py-2 bg-white flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch h-[52px] flex-col justify-center items-start gap-1 flex">
                      <div className="self-stretch text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                        From
                      </div>
                      <div className="self-stretch text-neutral-900 text-lg font-bold font-['Plus Jakarta Sans'] leading-7">
                        1,385K IDR
                      </div>
                    </div>
                  </div>
                </a>
                <div className="self-stretch h-[0px] border border-gray-100"></div>
                <a
                  onClick={() => {
                    navigate("/result", {
                      state: {
                        trip: trip,
                        seats: seat,
                        cabin: cabin,
                        fromAirport: fromAirport,
                        toAirport: toAirport,
                        departureDate: departureDate
                          .add(6, "day")
                          .format("YYYY-MM-DD"),
                        returnDate: returnDate.format("YYYY-MM-DD"),
                      },
                    });
                  }}
                  className="self-stretch justify-start items-center inline-flex"
                >
                  {" "}
                  <div className="w-[88px] self-stretch px-4 py-2.5 bg-gray-100 flex-col justify-center items-start gap-1 inline-flex">
                    <div className="self-stretch text-gray-500 text-xs font-normal font-['Plus Jakarta Sans'] leading-none">
                      Depart
                    </div>
                    <div className="self-stretch text-neutral-900 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                      {(departureDate == undefined ? dayjs() : departureDate)
                        .add(6, "day")
                        .format("DD MMM") ?? ""}
                    </div>
                  </div>
                  <div className="grow shrink basis-0 self-stretch pl-[100px] pr-4 py-2 bg-white flex-col justify-center items-center gap-2 inline-flex">
                    <div className="self-stretch h-[52px] flex-col justify-center items-start gap-1 flex">
                      <div className="self-stretch text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                        No Flight
                      </div>
                      <div className="self-stretch text-neutral-900 text-lg font-bold font-['Plus Jakarta Sans'] leading-7">
                        Not Available
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="self-stretch pt-8 flex-col justify-start items-start gap-6 flex">
            <div className=" text-center text-neutral text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
              The presented fare is the lowest available for each date and
              covers the entire journey, selected fare category, pertains to a
              single adult traveler.
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default Index;
