// import React, { useEffect, useState } from "react";
// import Logo from "../../components/Logo";
// import { Card, ConfigProvider, DatePickerProps, Dropdown, Layout, PaginationProps, Tabs, Pagination, Menu } from "antd";
// // const { Basic } = Tabs;
// // const { Meta } = Card;
// import { MenuProps } from "antd/lib";
// import { DownOutlined, MenuOutlined, RightOutlined } from '@ant-design/icons';
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import ReactCountryFlag from "react-country-flag"
// import { useNavigate } from "react-router-dom";
// import SkeletonAvatar from "antd/lib/skeleton/Avatar";
// import HomeFooter from "../../components/home_footer";

// dayjs.extend(customParseFormat);

// const { Header, Content, Footer } = Layout;


// const api_base_url = "https://be-java-production.up.railway.app"

// const menu = (
//     <Menu>
//         <div className="px-2">
//             <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                 <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-[#EAFDF6]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                         <path d="M6.66734 18.3333H13.334C16.684 18.3333 17.284 16.9917 17.459 15.3583L18.084 8.69167C18.309 6.65833 17.7257 5 14.1673 5H5.834C2.27567 5 1.69234 6.65833 1.91734 8.69167L2.54234 15.3583C2.71734 16.9917 3.31734 18.3333 6.66734 18.3333Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M6.66406 4.99935V4.33268C6.66406 2.85768 6.66406 1.66602 9.33073 1.66602H10.6641C13.3307 1.66602 13.3307 2.85768 13.3307 4.33268V4.99935" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M11.6693 10.8333V11.6667C11.6693 11.675 11.6693 11.675 11.6693 11.6833C11.6693 12.5917 11.6609 13.3333 10.0026 13.3333C8.3526 13.3333 8.33594 12.6 8.33594 11.6917V10.8333C8.33594 10 8.33594 10 9.16927 10H10.8359C11.6693 10 11.6693 10 11.6693 10.8333Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M18.0391 9.16602C16.1141 10.566 13.9141 11.3993 11.6641 11.6827" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M2.17969 9.39062C4.05469 10.674 6.17135 11.449 8.32969 11.6906" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                     </svg>
//                 </div>
//                 <div className="flex items-center justify-center text-center">
//                     <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                         Trips
//                     </a>
//                 </div>
//             </div>
//             <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                 <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                         <path d="M10.1302 9.05768C10.0469 9.04935 9.94687 9.04935 9.85521 9.05768C7.87187 8.99102 6.29688 7.36602 6.29688 5.36602C6.29687 3.32435 7.94687 1.66602 9.99687 1.66602C12.0385 1.66602 13.6969 3.32435 13.6969 5.36602C13.6885 7.36602 12.1135 8.99102 10.1302 9.05768Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M5.96563 12.134C3.94896 13.484 3.94896 15.684 5.96563 17.0257C8.25729 18.559 12.0156 18.559 14.3073 17.0257C16.324 15.6757 16.324 13.4757 14.3073 12.134C12.024 10.609 8.26562 10.609 5.96563 12.134Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                     </svg>
//                 </div>
//                 <div className="flex items-center justify-center text-center">
//                     <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                         Profile
//                     </a>
//                 </div>
//             </div>
//             <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                 <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                         <path d="M10.0175 2.42578C7.25914 2.42578 5.01747 4.66745 5.01747 7.42578V9.83411C5.01747 10.3424 4.80081 11.1174 4.54247 11.5508L3.58414 13.1424C2.99247 14.1258 3.40081 15.2174 4.48414 15.5841C8.07581 16.7841 11.9508 16.7841 15.5425 15.5841C16.5508 15.2508 16.9925 14.0591 16.4425 13.1424L15.4841 11.5508C15.2341 11.1174 15.0175 10.3424 15.0175 9.83411V7.42578C15.0175 4.67578 12.7675 2.42578 10.0175 2.42578Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" />
//                         <path d="M11.5599 2.66719C11.3016 2.59219 11.0349 2.53385 10.7599 2.50052C9.9599 2.40052 9.19323 2.45885 8.47656 2.66719C8.71823 2.05052 9.31823 1.61719 10.0182 1.61719C10.7182 1.61719 11.3182 2.05052 11.5599 2.66719Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M12.5156 15.8828C12.5156 17.2578 11.3906 18.3828 10.0156 18.3828C9.33229 18.3828 8.69896 18.0995 8.24896 17.6495C7.79896 17.1995 7.51562 16.5661 7.51562 15.8828" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" />
//                     </svg>
//                 </div>
//                 <div className="flex items-center justify-center text-center">
//                     <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                         Notifications
//                     </a>
//                 </div>
//             </div>
//             <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                 <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                         <path d="M18.3346 3.89174V13.9501C18.3346 14.7501 17.6846 15.5001 16.8846 15.6001L16.6096 15.6334C14.793 15.8751 11.9929 16.8001 10.3929 17.6834C10.1763 17.8084 9.81798 17.8084 9.59298 17.6834L9.55961 17.6668C7.95961 16.7918 5.16799 15.8751 3.35966 15.6334L3.11796 15.6001C2.31796 15.5001 1.66797 14.7501 1.66797 13.9501V3.8834C1.66797 2.89173 2.47628 2.14174 3.46795 2.22508C5.21795 2.36674 7.86794 3.2501 9.35128 4.1751L9.55961 4.30007C9.80128 4.45007 10.2013 4.45007 10.443 4.30007L10.5846 4.20841C11.1096 3.88341 11.7763 3.55841 12.5013 3.26674V6.66676L14.168 5.55841L15.8346 6.66676V2.31678C16.0596 2.27511 16.2763 2.25008 16.4763 2.23342H16.5263C17.518 2.15008 18.3346 2.89174 18.3346 3.89174Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M10 4.57422V17.0742" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M15.8333 2.31641V6.66638L14.1667 5.55803L12.5 6.66638V3.26637C13.5917 2.83303 14.8083 2.48307 15.8333 2.31641Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                     </svg>
//                 </div>
//                 <div className="flex items-center justify-center text-center">
//                     <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                         Saved Travelers
//                     </a>
//                 </div>
//             </div>
//             <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                 <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                         <path d="M2.5 7.59115V12.3995C2.5 14.1661 2.5 14.1661 4.16667 15.2911L8.75 17.9411C9.44167 18.3411 10.5667 18.3411 11.25 17.9411L15.8333 15.2911C17.5 14.1661 17.5 14.1661 17.5 12.4078V7.59115C17.5 5.83281 17.5 5.83281 15.8333 4.70781L11.25 2.05781C10.5667 1.65781 9.44167 1.65781 8.75 2.05781L4.16667 4.70781C2.5 5.83281 2.5 5.83281 2.5 7.59115Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                     </svg>
//                 </div>
//                 <div className="flex items-center justify-center text-center">
//                     <a href="#" className="font-medium text-base text-[#677084]  group-hover:text-[#227879]">
//                         Account Settings
//                     </a>
//                 </div>
//             </div>
//             <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                 <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                         <path d="M7.41406 6.29922C7.6724 3.29922 9.21406 2.07422 12.5891 2.07422H12.6974C16.4224 2.07422 17.9141 3.56589 17.9141 7.29089V12.7242C17.9141 16.4492 16.4224 17.9409 12.6974 17.9409H12.5891C9.23906 17.9409 7.6974 16.7326 7.4224 13.7826" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M12.499 10H3.01562" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         <path d="M4.8737 7.20898L2.08203 10.0007L4.8737 12.7923" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                     </svg>
//                 </div>
//                 <div className="flex items-center justify-center text-center">
//                     <p className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                         Sign Out
//                     </p>
//                 </div>
//             </div>
//         </div>
//     </Menu>
// );

// const cardStyle = {
//     borderRadius: '12px',
//     border: '1px solid #F2F4F7',
//     backgroundColor: 'white',
//     marginBottom: '16px',
// };

// interface Airport {
//     nationalId: string;
//     name: string;
//     abv: string;
//     lat: number | null;
//     long: number | null;
// }

// interface Schedule {
//     name: string;
//     departureDate: dayjs.Dayjs;
//     airportDepartureCode: string
//     plane: { name: string, code: string };
//     arrivalDate: dayjs.Dayjs;
//     airportArrivalCode: string
//     duration: number;
// }

// const Index: React.FC = () => {
//     const token = localStorage.getItem(
//         'access_token',
//     );

//     let airports: Airport[] = [];
//     let fromAirportDetails: { "label": string, "value": string }[] = [];
//     let toAirportDetails: { "label": string, "value": string }[] = [];
//     let fromAirport!: Airport;
//     let toAirport!: Airport;
//     let departureDate: dayjs.Dayjs;
//     let schedules: Schedule[] = [
//         {
//             name: 'Flight to Jakarta',
//             departureDate: dayjs().add(1, 'day'),
//             airportDepartureCode: 'CGK',
//             plane: { name: 'Garuda Indonesia', code: 'GA123' },
//             arrivalDate: dayjs().add(1, 'day').add(3, 'hours'),
//             airportArrivalCode: 'DPS',
//             duration: 3,
//         },
//         {
//             name: 'Flight to Bali',
//             departureDate: dayjs().add(2, 'days'),
//             airportDepartureCode: 'DPS',
//             plane: { name: 'Lion Air', code: 'JT456' },
//             arrivalDate: dayjs().add(2, 'days').add(2, 'hours'),
//             airportArrivalCode: 'CGK',
//             duration: 2
//         },
//         {
//             name: 'Flight to Yogyakarta',
//             departureDate: dayjs().add(3, 'days'),
//             airportDepartureCode: 'JOG',
//             plane: { name: 'AirAsia', code: 'AA789' },
//             arrivalDate: dayjs().add(3, 'days').add(1, 'hours'),
//             airportArrivalCode: 'SUB',
//             duration: 1
//         },
//         {
//             name: 'Flight to Surabaya',
//             departureDate: dayjs().add(4, 'days'),
//             airportDepartureCode: 'SUB',
//             plane: { name: 'Citilink', code: 'QG234' },
//             arrivalDate: dayjs().add(4, 'days').add(2, 'hours'),
//             airportArrivalCode: 'BDO',
//             duration: 2
//         },
//         {
//             name: 'Flight to Medan',
//             departureDate: dayjs().add(5, 'days'),
//             airportDepartureCode: 'KNO',
//             plane: { name: 'Batik Air', code: 'ID567' },
//             arrivalDate: dayjs().add(5, 'days').add(3, 'hours'),
//             airportArrivalCode: 'BPN',
//             duration: 3
//         }
//     ];

//     async function fetchInitialAirport() {
//         const payload = {}

//         const response = await fetch(
//             api_base_url + "/api/booking",
//             {
//                 method: 'post',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//             }
//         );
//         console.log(response)
//         const responseJson = await response.json();
//         if (response.status !== 200) {
//             alert('error: ' + responseJson.message);
//             return;
//         }
//         // make Sure this ok ==============
//         airports = responseJson['Airport']
//     }

//     useEffect(() => {

//         fetchInitialAirport()

//         airports.map((val) => {
//             fromAirportDetails.push({ label: val.name, value: val.nationalId })
//             toAirportDetails.push({ label: val.name, value: val.nationalId })
//         })



//     })

//     // const [seat, setSeat] = useState(new Map<string, number>(
//     //     [
//     //         ["adults", 0],
//     //         ["children", 0],
//     //         ["infant", 0]
//     //     ]
//     // ));

//     // const [cabin, setCabin] = useState<number>(1);

//     // const changeSeats = (targetMap: Map<string, number>) => {
//     //     setSeat(targetMap);
//     // }

//     // const changeCabin = (target: number) => {
//     //     setCabin(target);
//     // }

//     // const onDatePick: DatePickerProps['onChange'] = (date) => {
//     //     departureDate = date!;
//     //     console.log(departureDate.toISOString());
//     // };

//     const navigate = useNavigate();

//     // const dateFormat = 'dddd, DD MMM YYYY';

//     // const customFormat: DatePickerProps['format'] = (value) =>
//     //     value.format(dateFormat);

//     // const fromChange = (value: string) => {
//     //     fromAirport = airports.find((obj) => {
//     //         return obj.name = value;
//     //     })!

//     //     console.log(`selected ${fromAirport.name} ${fromAirport.abv}`);
//     // };
//     // const toChange = (value: string) => {
//     //     toAirport = airports.find((obj) => {
//     //         return obj.name = value;
//     //     })!

//     //     console.log(`selected ${toAirport.name} ${toAirport.abv}`);
//     // };

//     // const fromSearch = (value: string) => {
//     //     fromAirportDetails = fromAirportDetails.filter((obj) => {
//     //         return obj.label.includes(value)
//     //     })
//     //     console.log('search:', value);
//     // };

//     // const toSearch = (value: string) => {
//     //     toAirportDetails = toAirportDetails.filter((obj) => {
//     //         return obj.label.includes(value)
//     //     })

//     //     console.log('search:', value);
//     // };

//     // const filterOption = (input: string, option?: { label: string; value: string }) =>
//     //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

//     // const handleSignUp = () => {
//     //     navigate("/signup")
//     // };

//     // const handleSearch = async () => {
//     //     console.log("Searching...");
//     //     //case found:
//     //     const payload = {}

//     //     const url = new URL(api_base_url + "/schedule-detail/getSchedules")
//     //     url.searchParams.append("cabinClassId", "1")
//     //     url.searchParams.append("ticketTypeId", "1")
//     //     url.searchParams.append("date", departureDate.toISOString())
//     //     url.searchParams.append("fromAirportId", fromAirport.nationalId)
//     //     url.searchParams.append("toAirportId", toAirport.nationalId)


//     //     const response = await fetch(
//     //         url.toString(),
//     //         {

//     //             method: 'get',
//     //             headers: { 'Content-Type': 'application/json' },
//     //             body: JSON.stringify(payload),
//     //         }
//     //     );
//     //     console.log(response)
//     //     const responseJson = await response.json();
//     //     if (response.status !== 200) {
//     //         alert('error: ' + responseJson.message);
//     //         return;
//     //     }
//     //     // implement get schedules ==============
//     //     schedules = responseJson['schedules'];
//     //     setPage(1)
//     //     setScheduleToRender(schedules.slice((page - 1) * 4, (page * 4) - 1))

//     // };

//     // const [page, setPage] = useState<number>(1);
//     // const [scheduleToRender, setScheduleToRender] = useState<Schedule[]>(schedules.slice(0, 3));
//     // const onChangePage: PaginationProps['onShowSizeChange'] = (current) => {
//     //     console.log(page);
//     //     setPage(current)
//     //     setScheduleToRender(schedules.slice((page - 1) * 4, (page * 4) - 1))
//     // };


//     const [currentPage, setCurrentPage] = useState(1);
//     const pageSize = 3;

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };
//     const paginatedSchedules = schedules.slice((currentPage - 1) * pageSize, currentPage * pageSize);


//     const items: MenuProps['items'] = [
//         {
//             key: '1',
//             label: (
//                 <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//                     1st menu item
//                 </a>
//             ),
//         },
//     ];


//     return (
//         <ConfigProvider
//             theme={{
//                 token: {
//                     // Seed Token
//                     colorPrimary: "#38A993",
//                     borderRadius: 2,
//                     colorPrimaryTextHover: "#38A993",

//                     // Alias Token
//                     colorBgContainer: '#f6ffed',

//                 },
//             }}
//         >
//             <Layout>
//                 <Header style={{
//                     paddingLeft: "16px", paddingRight: "16px", top: 0, zIndex: 1, marginBottom: "12px", paddingTop: "4px", paddingBottom: "8px", position: 'sticky', display: 'flex', alignItems: 'center', backgroundColor: "white",
//                 }}>
//                     <div className="grid grid-cols-12 w-full">
//                         <div className="col-start-1 col-end-7 xl:col-end-10 justify-start items-center md:gap-8 flex px-4">
//                             <Logo></Logo>
//                             <div className="hidden xl:flex justify-start items-start md:gap-6">
//                                 <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Explore</div>
//                                 <div className="text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Status</div>
//                                 <Dropdown className="flex hover:text-[#38A993] text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7" menu={{ items }}>
//                                     <a onClick={(e) => e.preventDefault()}>
//                                         <div className="pr-2">Cabin</div>
//                                         <DownOutlined />
//                                     </a>
//                                 </Dropdown>
//                                 <Dropdown className="flex hover:text-[#38A993] text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 " menu={{ items }}>
//                                     <a onClick={(e) => e.preventDefault()}>
//                                         <div className="pr-2">Baggage</div>
//                                         <DownOutlined />
//                                     </a>
//                                 </Dropdown>
//                             </div>
//                             <div className="flex xl:hidden justify-start items-start md:gap-6">
//                                 <Dropdown className="flex hover:text-[#38A993] text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7" menu={{ items }}>
//                                     <a onClick={(e) => e.preventDefault()}>
//                                         <div className="md:pr-2">Explore</div>
//                                         <DownOutlined />
//                                     </a>
//                                 </Dropdown>
//                             </div>
//                         </div>
//                         <div className="col-start-7 xl:col-start-10 col-end-13 gap-4 flex item-end justify-end">
//                             <a className="snap-center self-center align-middle hover:text-[#38A993] text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
//                                 <div className="justify-start items-center px-2 md:gap-4 flex">
//                                     <ReactCountryFlag
//                                         countryCode="ID"
//                                         svg
//                                     />
//                                     <div>IDR</div>
//                                     <DownOutlined className="hidden md:block" />
//                                 </div>
//                             </a>

//                             {
//                                 token ?
//                                     <div className="snap-center self-center align-middle text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
//                                         <div className="grid grid-cols-12 md:gap-4 border border-gray-200 rounded-[5px] p-2">
//                                             <div className="col-start-1 col-end-11 hover:text-[#38A993] flex">
//                                                 <div className="grid grid-cols-12 gap-2">
//                                                     <div className="col-start-1 md:col-end-3 hover:text-[#38A993] flex"><SkeletonAvatar /></div>
//                                                     <div className="col-start-5 md:col-start-3 col-end-13 hover:text-[#38A993] flex">Lewis</div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-start-11 col-end-13 hover:text-[#38A993]">
//                                                 <Dropdown overlay={menu} placement="bottomRight">
//                                                     <a onClick={(e) => e.preventDefault()}>
//                                                         <MenuOutlined />
//                                                     </a>
//                                                 </Dropdown>
//                                             </div>
//                                         </div>
//                                     </div> :
//                                     <button
//                                         onClick={handleSignUp}
//                                         type="submit"
//                                         className="my-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
//                                         <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
//                                             Sign Up
//                                         </p>
//                                     </button>
//                             }

//                         </div>
//                     </div>
//                 </Header>
//                 <Content>
//                     <div className="my-5">
//                         <div className="grid grid-cols-10 gap-5">
//                             <div className="hidden xl:block col-start-2 col-span-2 py-6  bg-white rounded-[16px] shadow border border-gray-200 flex-col justify-center items-center gap-4">
//                                 <div className="grid grid-cols-12 gap-4">
//                                     <div className=" col-start-1 col-span-12 flex-col justify-center items-center inline-flex">
//                                         <SkeletonAvatar size={112} className="my-4" />
//                                         <div className="font-semibold text-lg font-normal font-['Plus Jakarta Sans'] text-xl leading-7 text-[#227879]">Lewis Carl Davidson</div>
//                                         <div className="text-neutral-500 text-md font-normal font-['Plus Jakarta Sans']  text-[#485466]">lewis.davidson@gmail.com</div>
//                                     </div>
//                                     <div className="col-start-1 col-end-12">
//                                         <div className="bg-white text-sm leading-6 ring-gray-900/5">
//                                             <div className="p-4">
//                                                 <div className="group relative flex gap-x-6 rounded-lg p-3 hover:bg-[#EAFDF6]">
//                                                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-[#EAFDF6]">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                             <path d="M6.66734 18.3333H13.334C16.684 18.3333 17.284 16.9917 17.459 15.3583L18.084 8.69167C18.309 6.65833 17.7257 5 14.1673 5H5.834C2.27567 5 1.69234 6.65833 1.91734 8.69167L2.54234 15.3583C2.71734 16.9917 3.31734 18.3333 6.66734 18.3333Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M6.66406 4.99935V4.33268C6.66406 2.85768 6.66406 1.66602 9.33073 1.66602H10.6641C13.3307 1.66602 13.3307 2.85768 13.3307 4.33268V4.99935" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M11.6693 10.8333V11.6667C11.6693 11.675 11.6693 11.675 11.6693 11.6833C11.6693 12.5917 11.6609 13.3333 10.0026 13.3333C8.3526 13.3333 8.33594 12.6 8.33594 11.6917V10.8333C8.33594 10 8.33594 10 9.16927 10H10.8359C11.6693 10 11.6693 10 11.6693 10.8333Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M18.0391 9.16602C16.1141 10.566 13.9141 11.3993 11.6641 11.6827" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M2.17969 9.39062C4.05469 10.674 6.17135 11.449 8.32969 11.6906" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                         </svg>
//                                                     </div>
//                                                     <div className="flex items-center justify-center text-center">
//                                                         <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                                                             Trips
//                                                         </a>
//                                                     </div>
//                                                 </div>
//                                                 <div className="group relative flex gap-x-6 rounded-lg p-3 hover:bg-[#EAFDF6]">
//                                                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                             <path d="M10.1302 9.05768C10.0469 9.04935 9.94687 9.04935 9.85521 9.05768C7.87187 8.99102 6.29688 7.36602 6.29688 5.36602C6.29687 3.32435 7.94687 1.66602 9.99687 1.66602C12.0385 1.66602 13.6969 3.32435 13.6969 5.36602C13.6885 7.36602 12.1135 8.99102 10.1302 9.05768Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M5.96563 12.134C3.94896 13.484 3.94896 15.684 5.96563 17.0257C8.25729 18.559 12.0156 18.559 14.3073 17.0257C16.324 15.6757 16.324 13.4757 14.3073 12.134C12.024 10.609 8.26562 10.609 5.96563 12.134Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                         </svg>
//                                                     </div>
//                                                     <div className="flex items-center justify-center text-center">
//                                                         <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                                                             Profile
//                                                         </a>
//                                                     </div>
//                                                 </div>
//                                                 <div className="group relative flex gap-x-6 rounded-lg p-3 hover:bg-[#EAFDF6]">
//                                                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                             <path d="M10.0175 2.42578C7.25914 2.42578 5.01747 4.66745 5.01747 7.42578V9.83411C5.01747 10.3424 4.80081 11.1174 4.54247 11.5508L3.58414 13.1424C2.99247 14.1258 3.40081 15.2174 4.48414 15.5841C8.07581 16.7841 11.9508 16.7841 15.5425 15.5841C16.5508 15.2508 16.9925 14.0591 16.4425 13.1424L15.4841 11.5508C15.2341 11.1174 15.0175 10.3424 15.0175 9.83411V7.42578C15.0175 4.67578 12.7675 2.42578 10.0175 2.42578Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" />
//                                                             <path d="M11.5599 2.66719C11.3016 2.59219 11.0349 2.53385 10.7599 2.50052C9.9599 2.40052 9.19323 2.45885 8.47656 2.66719C8.71823 2.05052 9.31823 1.61719 10.0182 1.61719C10.7182 1.61719 11.3182 2.05052 11.5599 2.66719Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M12.5156 15.8828C12.5156 17.2578 11.3906 18.3828 10.0156 18.3828C9.33229 18.3828 8.69896 18.0995 8.24896 17.6495C7.79896 17.1995 7.51562 16.5661 7.51562 15.8828" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" />
//                                                         </svg>
//                                                     </div>
//                                                     <div className="flex items-center justify-center text-center">
//                                                         <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                                                             Notifications
//                                                         </a>
//                                                     </div>
//                                                 </div>
//                                                 <div className="group relative flex gap-x-6 rounded-lg p-3 hover:bg-[#EAFDF6]">
//                                                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                             <path d="M18.3346 3.89174V13.9501C18.3346 14.7501 17.6846 15.5001 16.8846 15.6001L16.6096 15.6334C14.793 15.8751 11.9929 16.8001 10.3929 17.6834C10.1763 17.8084 9.81798 17.8084 9.59298 17.6834L9.55961 17.6668C7.95961 16.7918 5.16799 15.8751 3.35966 15.6334L3.11796 15.6001C2.31796 15.5001 1.66797 14.7501 1.66797 13.9501V3.8834C1.66797 2.89173 2.47628 2.14174 3.46795 2.22508C5.21795 2.36674 7.86794 3.2501 9.35128 4.1751L9.55961 4.30007C9.80128 4.45007 10.2013 4.45007 10.443 4.30007L10.5846 4.20841C11.1096 3.88341 11.7763 3.55841 12.5013 3.26674V6.66676L14.168 5.55841L15.8346 6.66676V2.31678C16.0596 2.27511 16.2763 2.25008 16.4763 2.23342H16.5263C17.518 2.15008 18.3346 2.89174 18.3346 3.89174Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M10 4.57422V17.0742" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M15.8333 2.31641V6.66638L14.1667 5.55803L12.5 6.66638V3.26637C13.5917 2.83303 14.8083 2.48307 15.8333 2.31641Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                         </svg>
//                                                     </div>
//                                                     <div className="flex items-center justify-center text-center">
//                                                         <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                                                             Saved Travelers
//                                                         </a>
//                                                     </div>
//                                                 </div>
//                                                 <div className="group relative flex gap-x-6 rounded-lg p-3 hover:bg-[#EAFDF6]">
//                                                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                             <path d="M2.5 7.59115V12.3995C2.5 14.1661 2.5 14.1661 4.16667 15.2911L8.75 17.9411C9.44167 18.3411 10.5667 18.3411 11.25 17.9411L15.8333 15.2911C17.5 14.1661 17.5 14.1661 17.5 12.4078V7.59115C17.5 5.83281 17.5 5.83281 15.8333 4.70781L11.25 2.05781C10.5667 1.65781 9.44167 1.65781 8.75 2.05781L4.16667 4.70781C2.5 5.83281 2.5 5.83281 2.5 7.59115Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                         </svg>
//                                                     </div>
//                                                     <div className="flex items-center justify-center text-center">
//                                                         <a href="#" className="font-medium text-base text-[#677084]  group-hover:text-[#227879]">
//                                                             Account Settings
//                                                         </a>
//                                                     </div>
//                                                 </div>
//                                                 <div className="group relative flex gap-x-6 rounded-lg p-3 hover:bg-[#EAFDF6]">
//                                                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                             <path d="M7.41406 6.29922C7.6724 3.29922 9.21406 2.07422 12.5891 2.07422H12.6974C16.4224 2.07422 17.9141 3.56589 17.9141 7.29089V12.7242C17.9141 16.4492 16.4224 17.9409 12.6974 17.9409H12.5891C9.23906 17.9409 7.6974 16.7326 7.4224 13.7826" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M12.499 10H3.01562" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                             <path d="M4.8737 7.20898L2.08203 10.0007L4.8737 12.7923" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                         </svg>
//                                                     </div>
//                                                     <div className="flex items-center justify-center text-center">
//                                                         <p className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                                                             Sign Out
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-start-1 col-span-10 xl:col-start-4 xl:col-span-6 px-6 py-3 bg-white rounded-[16px] shadow border border-gray-200 flex-col justify-center items-start inline-flex">
//                                 <div className="text-start text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-3xl">Trips</div>
//                                 <Tabs defaultActiveKey="1" tabBarGutter={28} style={{ width: '100%' }}>
//                                     <Basic tab="Active" key="1">
//                                         {paginatedSchedules.length === 0 ? (
//                                             <div className="min-h-[562px] flex justify-center items-center">
//                                                 <div className="grid grid-cols-10">
//                                                     <div className="col-start-4 col-span-4">
//                                                         <img src="src/assets/background-complete.svg" width={290} height={210} alt="Background" />
//                                                         <h1 className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-bold text-xl my-3">No Trips Found</h1>
//                                                         <p className="text-center text-[#677084] font-medium font-['Plus Jakarta Sans'] font-medium text-sm">When you book your next flight, you can check the details in here</p>
//                                                         <button
//                                                             onClick={handleSignUp}
//                                                             className="my-4 w-full justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3  text-base font-bold leading-6 text-white shadow-sm">
//                                                             <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-sm font-bold p-2">
//                                                                 Explore
//                                                             </p>
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             <>
//                                                 <div className="min-h-[562px]">
//                                                     {paginatedSchedules.map((schedule, index) => {
//                                                         const durationInMinutes = schedule.arrivalDate.diff(schedule.departureDate, 'minutes');
//                                                         const hours = Math.floor(durationInMinutes / 60);
//                                                         const minutes = durationInMinutes % 60;
//                                                         const formattedDuration = `${hours}h ${minutes}m`;
//                                                         return <>
//                                                             <div className="grid grid-cols-11">
//                                                                 <Card style={cardStyle} className="col-start-1 col-span-8 shadow border border-gray-200 " key={index}>
//                                                                     <Card.Grid hoverable={false} style={{ width: '25%', height: '100%', boxShadow: 'none', padding: '10px' }}>
//                                                                         <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.departureDate.format('HH:mm')}</div>
//                                                                         <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.airportDepartureCode}</div>
//                                                                         <div className="text-center text-[#808991] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg">{schedule.departureDate.format('D MMM')}</div>
//                                                                     </Card.Grid>
//                                                                     <Card.Grid hoverable={false} style={{ width: '50%', height: '100%', boxShadow: 'none', padding: '10px' }}>
//                                                                         <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg my-1">{formattedDuration}</div>
//                                                                         <div className="grid grid-cols-7 gap-1">
//                                                                             <div className="col-start-0 col-span-1 py-3 bg-white justify-center items-center inline-flex">
//                                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
//                                                                                     <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993" />
//                                                                                     <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993" />
//                                                                                 </svg>
//                                                                             </div>
//                                                                             <div className="col-start-2 col-span-2  py-3 bg-white justify-center items-center inline-flex">
//                                                                                 <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
//                                                                             </div>
//                                                                             <div className="col-start-4 col-span-1 py-3 justify-center items-center inline-flex">
//                                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                                                     <path d="M11.1422 16.7085L12.8172 12.8168L13.1839 11.9501C13.2505 11.8168 13.4255 11.7001 13.5755 11.7001H16.1255C16.9255 11.7001 17.8755 11.1085 18.2422 10.3918C18.3672 10.1418 18.3672 9.8418 18.2422 9.5918C17.8755 8.88346 16.9172 8.2918 16.1172 8.2918H13.5672C13.4172 8.2918 13.2422 8.17513 13.1755 8.0418L11.1339 3.2918C10.9172 2.7668 10.2589 2.3418 9.69219 2.3418H8.59219C7.88385 2.3418 7.53385 2.87513 7.81719 3.53346L9.61719 7.70846C9.75885 8.03346 9.58385 8.30013 9.22552 8.30013H8.30052H6.80052C6.60885 8.30013 6.33385 8.1918 6.20052 8.05846L4.25885 6.12513C4.05885 5.92513 3.66719 5.83346 3.38385 5.92513L2.25052 6.30013C1.75885 6.45013 1.52552 7.00846 1.75885 7.4668L3.42552 9.45013C3.68386 9.75013 3.68386 10.2418 3.42552 10.5418L1.75885 12.5251C1.53386 12.9835 1.75885 13.5418 2.25052 13.7085L3.38385 14.0835C3.65885 14.1751 4.05885 14.0835 4.25885 13.8835L6.20052 11.9501C6.33385 11.8085 6.60885 11.7001 6.80052 11.7001H9.22552C9.58385 11.7001 9.75052 11.9585 9.61719 12.2918L7.81719 16.4668C7.53385 17.1251 7.88385 17.6585 8.59219 17.6585H9.69219C10.2589 17.6585 10.9172 17.2335 11.1422 16.7085Z" fill="#38A993" />
//                                                                                 </svg>
//                                                                             </div>
//                                                                             <div className="col-start-5 col-span-2 py-3 justify-center items-center inline-flex">
//                                                                                 <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
//                                                                             </div>
//                                                                             <div className="col-start-7 col-span-1 py-3  justify-center items-center inline-flex">
//                                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
//                                                                                     <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993" />
//                                                                                     <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993" />
//                                                                                 </svg>
//                                                                             </div>
//                                                                         </div>
//                                                                         <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg">Direct</div>
//                                                                     </Card.Grid>
//                                                                     <Card.Grid hoverable={false} style={{ width: '25%', height: '100%', boxShadow: 'none', padding: '10px' }}>
//                                                                         <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.arrivalDate.format('HH:mm')}</div>
//                                                                         <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.airportArrivalCode}</div>
//                                                                         <div className="text-center text-[#808991] tfont-medium font-['Plus Jakarta Sans'] font-semibold text-lg">{schedule.arrivalDate.format('D MMM')}</div>
//                                                                     </Card.Grid>
//                                                                 </Card>
//                                                                 <Card style={cardStyle} className="col-start-9 col-span-4 shadow border border-gray-200 " key={index}>
//                                                                     <Card.Grid hoverable={false} style={{ width: '100%', height: '100%', boxShadow: 'none', padding: '10px' }}>
//                                                                         <div className="text-center text-[#111] text-base font-medium font-['Plus Jakarta Sans'] md:my-2">
//                                                                             <div className="justify-center h-[51.79px] items-center flex">
//                                                                                 <div className="w-[29.793px] h-[29.793px] top-[2px]  bg-emerald-400 rounded-full items-center mx-2">
//                                                                                     <img src="src/assets/airplane.svg" className=" w-full h-full "></img>
//                                                                                 </div>
//                                                                                 <div className="text-center text-sm  md:text-xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]">{schedule.plane.code}</div>
//                                                                             </div>
//                                                                         </div>
//                                                                         <div className="text-center text-[#111] text-base font-medium font-['Plus Jakarta Sans'] mx-0 md:mx-4">
//                                                                             <button
//                                                                                 onClick={() => { navigate("/trip-detail") }}
//                                                                                 className="my-4 justify-center rounded-md bg-white disabled:bg-gray-400 hover:text-base font-bold leading-6 text-primary-dark">
//                                                                                 <p className="text-center text-primary text-sm md:text-base font-bold font-['Plus Jakarta Sans'] md:p-2 ">
//                                                                                     Details <RightOutlined className="ml-1 md:ml-5" />
//                                                                                 </p>
//                                                                             </button>
//                                                                         </div>
//                                                                     </Card.Grid>
//                                                                 </Card>
//                                                             </div>
//                                                         </>
//                                                     })}
//                                                 </div>
//                                                 <div style={{ textAlign: 'center' }}>
//                                                     <Pagination
//                                                         total={schedules.length}
//                                                         defaultPageSize={pageSize}
//                                                         current={currentPage}
//                                                         onChange={handlePageChange}
//                                                         showSizeChanger={false}
//                                                         showQuickJumper={false}
//                                                         hideOnSinglePage={true}
//                                                         className="my-1"
//                                                     />
//                                                 </div>
//                                             </>
//                                         )}
//                                     </Basic>
//                                     <Basic tab="Expired" key="2">
//                                         {paginatedSchedules.length === 0 ? (
//                                             <div className="min-h-[562px] flex justify-center items-center">
//                                                 <div className="grid grid-cols-10">
//                                                     <div className="col-start-4 col-span-4">
//                                                         <img src="src/assets/background-complete.svg" width={290} height={210} alt="Background" />
//                                                         <h1 className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-bold text-xl my-3">No Trips Found</h1>
//                                                         <p className="text-center text-[#677084] font-medium font-['Plus Jakarta Sans'] font-medium text-sm">When you book your next flight, you can check the details in here</p>
//                                                         <button
//                                                             onClick={handleSignUp}
//                                                             className="my-4 w-full justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3  text-base font-bold leading-6 text-white shadow-sm">
//                                                             <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-sm font-bold p-2">
//                                                                 Explore
//                                                             </p>
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ) : (
//                                             <>
//                                                 <div className="min-h-[562px]">
//                                                     {paginatedSchedules.map((schedule, index) => {
//                                                         const durationInMinutes = schedule.arrivalDate.diff(schedule.departureDate, 'minutes');
//                                                         const hours = Math.floor(durationInMinutes / 60);
//                                                         const minutes = durationInMinutes % 60;
//                                                         const formattedDuration = `${hours}h ${minutes}m`;
//                                                         return <>
//                                                             <div className="grid grid-cols-11">
//                                                                 <Card style={cardStyle} className="col-start-1 col-span-8 shadow border border-gray-200 " key={index}>
//                                                                     <Card.Grid hoverable={false} style={{ width: '25%', height: '100%', boxShadow: 'none', padding: '10px' }}>
//                                                                         <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.departureDate.format('HH:mm')}</div>
//                                                                         <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.airportDepartureCode}</div>
//                                                                         <div className="text-center text-[#808991] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg">{schedule.departureDate.format('D MMM')}</div>
//                                                                     </Card.Grid>
//                                                                     <Card.Grid hoverable={false} style={{ width: '50%', height: '100%', boxShadow: 'none', padding: '10px' }}>
//                                                                         <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg my-1">{formattedDuration}</div>
//                                                                         <div className="grid grid-cols-7 gap-1">
//                                                                             <div className="col-start-0 col-span-1 py-3 bg-white justify-center items-center inline-flex">
//                                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
//                                                                                     <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993" />
//                                                                                     <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993" />
//                                                                                 </svg>
//                                                                             </div>
//                                                                             <div className="col-start-2 col-span-2  py-3 bg-white justify-center items-center inline-flex">
//                                                                                 <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
//                                                                             </div>
//                                                                             <div className="col-start-4 col-span-1 py-3 justify-center items-center inline-flex">
//                                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                                                     <path d="M11.1422 16.7085L12.8172 12.8168L13.1839 11.9501C13.2505 11.8168 13.4255 11.7001 13.5755 11.7001H16.1255C16.9255 11.7001 17.8755 11.1085 18.2422 10.3918C18.3672 10.1418 18.3672 9.8418 18.2422 9.5918C17.8755 8.88346 16.9172 8.2918 16.1172 8.2918H13.5672C13.4172 8.2918 13.2422 8.17513 13.1755 8.0418L11.1339 3.2918C10.9172 2.7668 10.2589 2.3418 9.69219 2.3418H8.59219C7.88385 2.3418 7.53385 2.87513 7.81719 3.53346L9.61719 7.70846C9.75885 8.03346 9.58385 8.30013 9.22552 8.30013H8.30052H6.80052C6.60885 8.30013 6.33385 8.1918 6.20052 8.05846L4.25885 6.12513C4.05885 5.92513 3.66719 5.83346 3.38385 5.92513L2.25052 6.30013C1.75885 6.45013 1.52552 7.00846 1.75885 7.4668L3.42552 9.45013C3.68386 9.75013 3.68386 10.2418 3.42552 10.5418L1.75885 12.5251C1.53386 12.9835 1.75885 13.5418 2.25052 13.7085L3.38385 14.0835C3.65885 14.1751 4.05885 14.0835 4.25885 13.8835L6.20052 11.9501C6.33385 11.8085 6.60885 11.7001 6.80052 11.7001H9.22552C9.58385 11.7001 9.75052 11.9585 9.61719 12.2918L7.81719 16.4668C7.53385 17.1251 7.88385 17.6585 8.59219 17.6585H9.69219C10.2589 17.6585 10.9172 17.2335 11.1422 16.7085Z" fill="#38A993" />
//                                                                                 </svg>
//                                                                             </div>
//                                                                             <div className="col-start-5 col-span-2 py-3 justify-center items-center inline-flex">
//                                                                                 <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
//                                                                             </div>
//                                                                             <div className="col-start-7 col-span-1 py-3  justify-center items-center inline-flex">
//                                                                                 <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
//                                                                                     <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993" />
//                                                                                     <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993" />
//                                                                                 </svg>
//                                                                             </div>
//                                                                         </div>
//                                                                         <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg">Direct</div>
//                                                                     </Card.Grid>
//                                                                     <Card.Grid hoverable={false} style={{ width: '25%', height: '100%', boxShadow: 'none', padding: '10px' }}>
//                                                                         <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.arrivalDate.format('HH:mm')}</div>
//                                                                         <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-semibold text-lg  md:text-3xl">{schedule.airportArrivalCode}</div>
//                                                                         <div className="text-center text-[#808991] tfont-medium font-['Plus Jakarta Sans'] font-semibold text-lg">{schedule.arrivalDate.format('D MMM')}</div>
//                                                                     </Card.Grid>
//                                                                 </Card>
//                                                                 <Card style={cardStyle} className="col-start-9 col-span-4 shadow border border-gray-200 " key={index}>
//                                                                     <Card.Grid hoverable={false} style={{ width: '100%', height: '100%', boxShadow: 'none', padding: '10px' }}>
//                                                                         <div className="text-center text-[#111] text-base font-medium font-['Plus Jakarta Sans'] md:my-2">
//                                                                             <div className="justify-center h-[51.79px] items-center flex">
//                                                                                 <div className="w-[29.793px] h-[29.793px] top-[2px]  bg-emerald-400 rounded-full items-center mx-2">
//                                                                                     <img src="src/assets/airplane.svg" className=" w-full h-full "></img>
//                                                                                 </div>
//                                                                                 <div className="text-center text-sm  md:text-xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]">{schedule.plane.code}</div>
//                                                                             </div>
//                                                                         </div>
//                                                                         <div className="text-center text-[#111] text-base font-medium font-['Plus Jakarta Sans'] mx-0 md:mx-4">
//                                                                             <button
//                                                                                 onClick={() => { navigate("/trip-detail") }}
//                                                                                 className="my-4 justify-center rounded-md bg-white disabled:bg-gray-400 hover:text-base font-bold leading-6 text-primary-dark">
//                                                                                 <p className="text-center text-primary text-sm md:text-base font-bold font-['Plus Jakarta Sans'] md:p-2 ">
//                                                                                     Details <RightOutlined className="ml-1 md:ml-5" />
//                                                                                 </p>
//                                                                             </button>
//                                                                         </div>
//                                                                     </Card.Grid>
//                                                                 </Card>
//                                                             </div>
//                                                         </>
//                                                     })}
//                                                 </div>
//                                                 <div style={{ textAlign: 'center' }}>
//                                                     <Pagination
//                                                         total={schedules.length}
//                                                         defaultPageSize={pageSize}
//                                                         current={currentPage}
//                                                         onChange={handlePageChange}
//                                                         showSizeChanger={false}
//                                                         showQuickJumper={false}
//                                                         hideOnSinglePage={true}
//                                                         className="my-1"
//                                                     />
//                                                 </div>
//                                             </>
//                                         )}
//                                     </Basic>
//                                 </Tabs>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-2">

//                         </div>
//                     </div>
//                 </Content>
//                 <Footer style={{
//                     padding: 0,
//                 }} >
//                     <HomeFooter />
//                 </Footer>
//             </Layout >  </ConfigProvider >
//     );
// };

// export default Index;
