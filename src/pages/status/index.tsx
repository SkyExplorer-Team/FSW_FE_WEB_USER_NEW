import React, { useEffect, useRef, useState } from "react";
import Logo from "../../components/Logo";
import {
  Button,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Divider,
  Dropdown,
  Layout,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
} from "antd";
import { MenuProps } from "antd/lib";
import {
  DownOutlined,
  TeamOutlined,
  DollarOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import PassengerField from "../../components/passenger_field";
import CabinField from "../../components/cabin_field";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import HeaderComponent from "../../components/Header";
import HomeInfo1 from "../../components/home_info1";
import HomeFooter from "../../components/home_footer";

dayjs.extend(customParseFormat);

const { Header, Content, Footer } = Layout;

const api_base_url = "https://be-java-master-production.up.railway.app";

interface Airport {
  id: string;
  name: string;
  abv: string;
  city: string;
}

const StatusPage: React.FC = () => {
  const token = localStorage.getItem("access_token");

  let airports: Airport[] = [];
  let fromAirportDetails: { label: string; value: string }[] = [];
  let toAirportDetails: { label: string; value: string }[] = [];
  let fromAirport!: Airport;
  let toAirport!: Airport;
  let departureDate: dayjs.Dayjs;
  let returnDate: dayjs.Dayjs;
  async function fetchInitialAirport() {
    const payload = {};

    const response = await fetch(api_base_url + "/api/airport", {
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
    console.log(responseJson);
    console.log("responseJson");

    airports = responseJson["Airport"];
  }
  let accessToken: string | null;
  useRef(() => {
    accessToken = localStorage.getItem("access_token");
  });

  useEffect(() => {
    console.log(accessToken);
    // if (accessToken === null) {
    //     navigate('/login')
    // }
    fetchInitialAirport();

    airports.map((val) => {
      fromAirportDetails.push({ label: val.name, value: val.id });
      toAirportDetails.push({ label: val.name, value: val.id });
    });
  });

  const [seat, setSeat] = useState(
    new Map<string, number>([
      ["adults", 0],
      ["children", 0],
      ["infant", 0],
    ])
  );

  const [cabin, setCabin] = useState<number>(1);

  //   const changeSeats = (targetMap: Map<string, number>) => {
  //     setSeat(targetMap);
  //   };

  //   const changeCabin = (target: number) => {
  //     setCabin(target);
  //   };

  const onDepartureDatePick: DatePickerProps["onChange"] = (date) => {
    departureDate = date!;
    console.log(departureDate.toISOString());
  };

  /*  const [flightNumber, setFlightNumber] = useState(null);

  const flightNumberChange = (value) => {
    setFlightNumber(value);
  }; */

  const navigate = useNavigate();

  const dateFormat = "dddd, DD MMM YYYY";

  const customFormat: DatePickerProps["format"] = (value) =>
    value.format(dateFormat);

  const fromChange = (value: string) => {
    fromAirport = airports.find((obj) => {
      return (obj.name = value);
    })!;

    console.log(`selected ${fromAirport.name} ${fromAirport.abv}`);
  };
  const toChange = (value: string) => {
    toAirport = airports.find((obj) => {
      return (obj.name = value);
    })!;
  };

  const fromSearch = (value: string) => {
    fromAirportDetails = fromAirportDetails.filter((obj) => {
      return obj.label.includes(value);
    });
  };

  const toSearch = (value: string) => {
    toAirportDetails = toAirportDetails.filter((obj) => {
      return obj.label.includes(value);
    });
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
    navigate("/status_result", {
      state: {
        trip: trip,
        seats: seat,
        cabin: cabin,
        fromAirport: fromAirport,
        toAirport: toAirport,
        departureDate: departureDate,
        returnDate: returnDate,
      },
    });
  };

  const [trip, setTrip] = useState<string>("one-way");

  const onChange = (e: RadioChangeEvent) => {
    setTrip(e.target.value);
  };

  return (
    <Layout>
      <HeaderComponent />
      <Content>
        <div>
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
                          Route
                        </p>
                      </Radio>
                      <Radio value="round">
                        <p className="text-primary text-base font-semibold font-['Plus Jakarta Sans'] leading-normal">
                          Number
                        </p>
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="self-stretch justify-start items-center gap-6 inline-flex">
                  <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                    <div className=" justify-center items-center gap-2 flex">
                      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="bg-white justify-start items-start gap-2.5 inline-flex">
                          <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
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
                            optionRender={(option) => {
                              return <div>{option.value}</div>;
                            }}
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          const temp = fromAirport;
                          fromAirport = toAirport;
                          toAirport = temp;
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
                            placeholder="Select a person"
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
                            filterOption={filterOption}
                            optionRender={(option) => {
                              console.log(option.value);
                              return (
                                <div className="w-[382px] h-[68px] py-2 justify-center items-center gap-4 inline-flex">
                                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                    <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                                      Jakarta, Indonesia
                                    </div>
                                    <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                                      Soekarno Hatta International
                                    </div>
                                  </div>
                                  <div className="p-2 bg-emerald-100 rounded flex-col justify-center items-center gap-1 inline-flex">
                                    <div className="text-center text-teal-700 text-xl font-bold font-['Plus Jakarta Sans'] leading-7">
                                      CGK
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                            options={toAirportDetails}
                          />
                        </div>
                      </div>
                    </div>
                    {trip == "one-way" ? (
                      <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                          <div className="px-2 bg-white justify-start items-start gap-2.5 inline-flex">
                            <div className="text-gray-500 text-sm font-semibold font-['Plus Jakarta Sans'] leading-tight">
                              Date
                            </div>
                          </div>

                          <div className="self-stretch px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center gap-3 inline-flex">
                            <DatePicker
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
                              Date
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
    </Layout>
  );
};

export default StatusPage;
