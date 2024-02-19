import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Layout,
  Pagination,
  PaginationProps,
  Radio,
  RadioChangeEvent,
  Select,
} from "antd";
import { MenuProps } from "antd/lib";
import {
  DownOutlined,
  SwapOutlined,
  // TeamOutlined,
  // DollarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ReactCountryFlag from "react-country-flag";
import { useLocation, useNavigate } from "react-router-dom";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import Logo from "../../components/Logo";
import HeaderComponent from "../../components/Header";
import HomeFooter from "../../components/home_footer";
import IconInfo from "/assets/info-circle.svg";

import GambarPocket from "/assets/gambar-samping.png";
import FlightCard from "../../components/FlightCard";
import StatusFlightDetail from "../../components/StatusFlightDetail";

dayjs.extend(customParseFormat);

const { Header, Content, Footer } = Layout;
interface Airport {
  nationalId: string;
  name: string;
  abv: string;
  lat: number | null;
  long: number | null;
}

interface Schedule {
  name: string;
  departureDate: dayjs.Dayjs;
  plane: string;
  arrivalDate: dayjs.Dayjs;
  duration: number;
}
const api_base_url = "https://be-java-master-production.up.railway.app";

const StatusResult: React.FC = () => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  let fromAirportDetails: { label: string; value: string }[] = [];
  let toAirportDetails: { label: string; value: string }[] = [];
  let fromAirport!: Airport;
  let toAirport!: Airport;
  let departureDate: dayjs.Dayjs;
  let returnDate: dayjs.Dayjs;
  let schedules: Schedule[] = [];
  const airports: Airport[] = [];
  const [seat, setSeat] = useState(
    new Map<string, number>([
      ["adults", 0],
      ["children", 0],
      ["infant", 0],
    ])
  );
  const [page, setPage] = useState<number>(1);
  const [scheduleToRender, setScheduleToRender] = useState<Schedule[]>(
    schedules.slice(0, 3)
  );
  const [trip, setTrip] = useState<string>("one-way");

  useEffect(() => {
    fetchInitialSchedule();
  });
  const location = useLocation();

  async function fetchInitialSchedule() {
    fromAirport = location.state.fromAirport;
    toAirport = location.state.toAirport;
    departureDate = location.state.departureDate;
    returnDate = location.state.returnDate;
    setSeat(location.state.seats);
    setTrip(location.state.trip);
    const payload = {
      from: fromAirport.nationalId,
      to: toAirport.nationalId,
      departure: departureDate.format("YYYY-MM-DD HH:mm:ss.sss"),
    };
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
  }

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

  const [cabin, setCabin] = useState<number>(1);

  const changeSeats = (targetMap: Map<string, number>) => {
    setSeat(targetMap);
  };

  const changeCabin = (target: number) => {
    setCabin(target);
  };

  const onDepartureDatePick: DatePickerProps["onChange"] = (date) => {
    departureDate = date!;
    console.log(departureDate.toISOString());
  };
  const onReturnDatePick: DatePickerProps["onChange"] = (date) => {
    returnDate = date!;
    console.log(returnDate.toISOString());
  };
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

    console.log(`selected ${toAirport.name} ${toAirport.abv}`);
  };

  const fromSearch = (value: string) => {
    fromAirportDetails = fromAirportDetails.filter((obj) => {
      return obj.label.includes(value);
    });
    console.log("search:", value);
  };

  const toSearch = (value: string) => {
    toAirportDetails = toAirportDetails.filter((obj) => {
      return obj.label.includes(value);
    });

    console.log("search:", value);
  };
  const handleSearch = async () => {
    console.log("Searching...");
    //case found:
    const payload = {};

    const url = new URL(api_base_url + "/schedule-detail/getSchedules");
    url.searchParams.append("cabinClassId", "1");
    url.searchParams.append("ticketTypeId", "1");
    url.searchParams.append("date", departureDate.toISOString());
    url.searchParams.append("fromAirportId", fromAirport.nationalId);
    url.searchParams.append("toAirportId", toAirport.nationalId);

    const response = await fetch(url.toString(), {
      method: "get",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(response);
    const responseJson = await response.json();
    if (response.status !== 200) {
      alert("error: " + responseJson.message);
      return;
    }
    // implement get schedules ==============
    schedules = responseJson["schedules"];
    setPage(1);
    setScheduleToRender(schedules.slice((page - 1) * 4, page * 4 - 1));
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

  console.log(schedules.length);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Number of cards per page
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState<"Departed" | "Arrived">(
    "Arrived"
  ); // Initial status for the modal

  // Handle Details button click
  const handleDetailsClick = (status: "Departed" | "Arrived") => {
    // Show the modal based on the status
    setModalStatus(status);
    setModalVisible(true);
  };

  // Define your card components
  const Card1 = (
    <FlightCard
      time="10:25"
      origin="CGK"
      date="16 Jan"
      duration="1h 45m"
      direct={true}
      destination="SIN"
      flightNumber="SE 955"
      status="Arrived"
      handleDetailsClick={handleDetailsClick}
    />
  );

  const Card2 = (
    <FlightCard
      time="10:25"
      origin="CGK"
      date="16 Jan"
      duration="1h 45m"
      direct={true}
      destination="SIN"
      flightNumber="SE 955"
      status="Arrived"
      handleDetailsClick={handleDetailsClick}
    />
  );

  const Card3 = (
    <FlightCard
      time="10:25"
      origin="CGK"
      date="16 Jan"
      duration="1h 45m"
      direct={true}
      destination="SIN"
      flightNumber="SE 955"
      status="Departed"
      handleDetailsClick={handleDetailsClick}
    />
  );

  const Card4 = (
    <FlightCard
      time="10:25"
      origin="CGK"
      date="16 Jan"
      duration="1h 45m"
      direct={true}
      destination="SIN"
      flightNumber="SE 955"
      status="Arrived"
      handleDetailsClick={handleDetailsClick}
    />
  );

  // Calculate the start and end index of the cards based on the current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // get all cards
  const allCards = [
    { card: Card1, status: "Arrived" },
    { card: Card2, status: "Arrived" },
    { card: Card3, status: "Departed" },
    { card: Card4, status: "Arrived" },
  ];

  // Get the cards to display on the current page
  const currentCards = allCards.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout className="">
      <HeaderComponent />

      <Content className="flex-col">
        <div
          style={{
            position: "sticky",
            display: "flex",
            alignItems: "center",
          }}
          className="w-full px-[51px] py-6  bg-white border border-gray-100 flex-col justify-center items-start gap-6 inline-flex"
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
            <div className="flex-col md:flex-row grow shrink basis-0 justify-start items-start gap-3 flex">
              <div className="flex-col md:flex-row justify-center flex-grow items-center gap-2 flex">
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
                      className="w-full md:w-auto"
                      value={fromAirport == undefined ? null : fromAirport.name}
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
                      className="w-full md:w-auto"
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

                    <div className="px-5 py-[8px] rounded-xl border border-gray-100 justify-start items-center gap-3 inline-flex">
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
        {schedules.length != 0 ? (
          <div className="flex-col min-h-[50vh]">
            <img
              className="p-8 m-auto w-[430px]"
              src="src/assets/not-found.svg"
            ></img>
          </div>
        ) : (
          <div className="flex my-5 mx-0 md:mx-5">
            <div className="flex flex-col w-full items-center justify-center ">
              <div className="bg-primary-background text-primary-dark p-1 md:p-2 rounded-lg flex items-center gap-1 md:gap-2 mx-4 md:mx-[12px]">
                <img src={IconInfo} alt="Icon Info" className="h-4 w-4" />
                <p className="text-sm md:text-md">
                  Scheduled departure and arrival timings may have changed.
                  Select the flight to view latest flight status.
                </p>
              </div>

              {/* cards */}
              <div className="flex flex-col gap-5 mt-4 mx-4 md:mx-[12px] mb-5">
                {currentCards.map((card, index) => (
                  <div key={index}>{card.card}</div>
                ))}
              </div>

              {/* Render the modal based on the modalStatus state */}
              <StatusFlightDetail
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                status={modalStatus}
              />

              {/* pagination */}
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={allCards.length} // Total number of cards
                onChange={handlePageChange}
              />
            </div>
            <img
              src={GambarPocket}
              alt="Gambar Pocket"
              className="hidden lg:block w-[309px] h-[345px]"
            />
          </div>
        )}
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

export default StatusResult;
