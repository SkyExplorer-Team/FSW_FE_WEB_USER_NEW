// import React, { useEffect, useState } from "react";
// import Logo from "../../components/Logo";
// import { Card, Button, ConfigProvider, DatePickerProps, Dropdown, Layout, PaginationProps, Tabs, Collapse, Modal, Menu, Table } from "antd";
// import { MenuProps } from "antd/lib";
// import { DownOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// import ReactCountryFlag from "react-country-flag"
// import { useNavigate } from "react-router-dom";
// import SkeletonAvatar from "antd/lib/skeleton/Avatar";
// import HomeFooter from "../../components/home_footer";
// import QRCode from 'qrcode.react';

// dayjs.extend(customParseFormat);

// const { Header, Content, Footer } = Layout;


// const api_base_url = "https://be-java-production.up.railway.app"

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
//     const detailSchedule: Schedule = {
//         name: 'Flight to Jakarta',
//         departureDate: dayjs().add(1, 'day'),
//         airportDepartureCode: 'CGK',
//         plane: { name: 'Garuda Indonesia', code: 'GA123' },
//         arrivalDate: dayjs().add(1, 'day').add(3, 'hours'),
//         airportArrivalCode: 'DPS',
//         duration: 3,
//     };

//     const durationInMinutes = detailSchedule.arrivalDate.diff(detailSchedule.departureDate, 'minutes');
//     const hours = Math.floor(durationInMinutes / 60);
//     const minutes = durationInMinutes % 60;
//     const formattedDuration = `${hours}h ${minutes}m`;

//     const dataSource = [
//         {
//             key: '1',
//             service: 'Flight - Jakarta to Singapore (Economy)',
//             qty: 1,
//             total: '2,950,000 IDR',
//         },
//         {
//             key: '2',
//             service: 'Passenger Service Charge',
//             qty: 1,
//             total: '128,000 IDR',
//         },
//         {
//             key: '3',
//             service: 'Ancillary - Spaghetti Bolognese',
//             qty: 1,
//             total: '36,000 IDR',
//         },
//     ];

//     const columns = [
//         {
//             title: 'Service',
//             dataIndex: 'service',
//             key: 'service',
//         },
//         {
//             title: 'Qty',
//             dataIndex: 'qty',
//             key: 'qty',
//         },
//         {
//             title: 'Total',
//             dataIndex: 'total',
//             key: 'total',
//         },
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

//     const menu = (
//         <Menu>
//             <div className="px-2">
//                 <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-[#EAFDF6]">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                             <path d="M6.66734 18.3333H13.334C16.684 18.3333 17.284 16.9917 17.459 15.3583L18.084 8.69167C18.309 6.65833 17.7257 5 14.1673 5H5.834C2.27567 5 1.69234 6.65833 1.91734 8.69167L2.54234 15.3583C2.71734 16.9917 3.31734 18.3333 6.66734 18.3333Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M6.66406 4.99935V4.33268C6.66406 2.85768 6.66406 1.66602 9.33073 1.66602H10.6641C13.3307 1.66602 13.3307 2.85768 13.3307 4.33268V4.99935" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M11.6693 10.8333V11.6667C11.6693 11.675 11.6693 11.675 11.6693 11.6833C11.6693 12.5917 11.6609 13.3333 10.0026 13.3333C8.3526 13.3333 8.33594 12.6 8.33594 11.6917V10.8333C8.33594 10 8.33594 10 9.16927 10H10.8359C11.6693 10 11.6693 10 11.6693 10.8333Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M18.0391 9.16602C16.1141 10.566 13.9141 11.3993 11.6641 11.6827" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M2.17969 9.39062C4.05469 10.674 6.17135 11.449 8.32969 11.6906" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                     </div>
//                     <div className="flex items-center justify-center text-center">
//                         <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                             Trips
//                         </a>
//                     </div>
//                 </div>
//                 <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                             <path d="M10.1302 9.05768C10.0469 9.04935 9.94687 9.04935 9.85521 9.05768C7.87187 8.99102 6.29688 7.36602 6.29688 5.36602C6.29687 3.32435 7.94687 1.66602 9.99687 1.66602C12.0385 1.66602 13.6969 3.32435 13.6969 5.36602C13.6885 7.36602 12.1135 8.99102 10.1302 9.05768Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M5.96563 12.134C3.94896 13.484 3.94896 15.684 5.96563 17.0257C8.25729 18.559 12.0156 18.559 14.3073 17.0257C16.324 15.6757 16.324 13.4757 14.3073 12.134C12.024 10.609 8.26562 10.609 5.96563 12.134Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                     </div>
//                     <div className="flex items-center justify-center text-center">
//                         <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                             Profile
//                         </a>
//                     </div>
//                 </div>
//                 <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                             <path d="M10.0175 2.42578C7.25914 2.42578 5.01747 4.66745 5.01747 7.42578V9.83411C5.01747 10.3424 4.80081 11.1174 4.54247 11.5508L3.58414 13.1424C2.99247 14.1258 3.40081 15.2174 4.48414 15.5841C8.07581 16.7841 11.9508 16.7841 15.5425 15.5841C16.5508 15.2508 16.9925 14.0591 16.4425 13.1424L15.4841 11.5508C15.2341 11.1174 15.0175 10.3424 15.0175 9.83411V7.42578C15.0175 4.67578 12.7675 2.42578 10.0175 2.42578Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" />
//                             <path d="M11.5599 2.66719C11.3016 2.59219 11.0349 2.53385 10.7599 2.50052C9.9599 2.40052 9.19323 2.45885 8.47656 2.66719C8.71823 2.05052 9.31823 1.61719 10.0182 1.61719C10.7182 1.61719 11.3182 2.05052 11.5599 2.66719Z" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M12.5156 15.8828C12.5156 17.2578 11.3906 18.3828 10.0156 18.3828C9.33229 18.3828 8.69896 18.0995 8.24896 17.6495C7.79896 17.1995 7.51562 16.5661 7.51562 15.8828" stroke="#677084" stroke-width="1.25" stroke-miterlimit="10" />
//                         </svg>
//                     </div>
//                     <div className="flex items-center justify-center text-center">
//                         <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                             Notifications
//                         </a>
//                     </div>
//                 </div>
//                 <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                             <path d="M18.3346 3.89174V13.9501C18.3346 14.7501 17.6846 15.5001 16.8846 15.6001L16.6096 15.6334C14.793 15.8751 11.9929 16.8001 10.3929 17.6834C10.1763 17.8084 9.81798 17.8084 9.59298 17.6834L9.55961 17.6668C7.95961 16.7918 5.16799 15.8751 3.35966 15.6334L3.11796 15.6001C2.31796 15.5001 1.66797 14.7501 1.66797 13.9501V3.8834C1.66797 2.89173 2.47628 2.14174 3.46795 2.22508C5.21795 2.36674 7.86794 3.2501 9.35128 4.1751L9.55961 4.30007C9.80128 4.45007 10.2013 4.45007 10.443 4.30007L10.5846 4.20841C11.1096 3.88341 11.7763 3.55841 12.5013 3.26674V6.66676L14.168 5.55841L15.8346 6.66676V2.31678C16.0596 2.27511 16.2763 2.25008 16.4763 2.23342H16.5263C17.518 2.15008 18.3346 2.89174 18.3346 3.89174Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M10 4.57422V17.0742" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M15.8333 2.31641V6.66638L14.1667 5.55803L12.5 6.66638V3.26637C13.5917 2.83303 14.8083 2.48307 15.8333 2.31641Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                     </div>
//                     <div className="flex items-center justify-center text-center">
//                         <a href="#" className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                             Saved Travelers
//                         </a>
//                     </div>
//                 </div>
//                 <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                             <path d="M2.5 7.59115V12.3995C2.5 14.1661 2.5 14.1661 4.16667 15.2911L8.75 17.9411C9.44167 18.3411 10.5667 18.3411 11.25 17.9411L15.8333 15.2911C17.5 14.1661 17.5 14.1661 17.5 12.4078V7.59115C17.5 5.83281 17.5 5.83281 15.8333 4.70781L11.25 2.05781C10.5667 1.65781 9.44167 1.65781 8.75 2.05781L4.16667 4.70781C2.5 5.83281 2.5 5.83281 2.5 7.59115Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                     </div>
//                     <div className="flex items-center justify-center text-center">
//                         <a href="#" className="font-medium text-base text-[#677084]  group-hover:text-[#227879]">
//                             Account Settings
//                         </a>
//                     </div>
//                 </div>
//                 <div className="group relative flex gap-x-6 rounded-lg p-1 hover:bg-[#EAFDF6]">
//                     <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-[#EAFDF6]">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                             <path d="M7.41406 6.29922C7.6724 3.29922 9.21406 2.07422 12.5891 2.07422H12.6974C16.4224 2.07422 17.9141 3.56589 17.9141 7.29089V12.7242C17.9141 16.4492 16.4224 17.9409 12.6974 17.9409H12.5891C9.23906 17.9409 7.6974 16.7326 7.4224 13.7826" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M12.499 10H3.01562" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                             <path d="M4.8737 7.20898L2.08203 10.0007L4.8737 12.7923" stroke="#677084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                         </svg>
//                     </div>
//                     <div className="flex items-center justify-center text-center">
//                         <p className="font-medium text-base text-[#677084] group-hover:text-[#227879]">
//                             Sign Out
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </Menu>
//     );

//     const [seat, setSeat] = useState(new Map<string, number>(
//         [
//             ["adults", 0],
//             ["children", 0],
//             ["infant", 0]
//         ]
//     ));

//     const [cabin, setCabin] = useState<number>(1);

//     const changeSeats = (targetMap: Map<string, number>) => {
//         setSeat(targetMap);
//     }

//     const changeCabin = (target: number) => {
//         setCabin(target);
//     }

//     const onDatePick: DatePickerProps['onChange'] = (date) => {
//         departureDate = date!;
//         console.log(departureDate.toISOString());
//     };

//     const navigate = useNavigate();

//     const dateFormat = 'dddd, DD MMM YYYY';

//     const customFormat: DatePickerProps['format'] = (value) =>
//         value.format(dateFormat);

//     const fromChange = (value: string) => {
//         fromAirport = airports.find((obj) => {
//             return obj.name = value;
//         })!

//         console.log(`selected ${fromAirport.name} ${fromAirport.abv}`);
//     };
//     const toChange = (value: string) => {
//         toAirport = airports.find((obj) => {
//             return obj.name = value;
//         })!

//         console.log(`selected ${toAirport.name} ${toAirport.abv}`);
//     };

//     const fromSearch = (value: string) => {
//         fromAirportDetails = fromAirportDetails.filter((obj) => {
//             return obj.label.includes(value)
//         })
//         console.log('search:', value);
//     };

//     const toSearch = (value: string) => {
//         toAirportDetails = toAirportDetails.filter((obj) => {
//             return obj.label.includes(value)
//         })

//         console.log('search:', value);
//     };

//     const filterOption = (input: string, option?: { label: string; value: string }) =>
//         (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

//     const handleSignUp = () => {
//         navigate("/signup")
//     };

//     const handleSearch = async () => {
//         console.log("Searching...");
//         //case found:
//         const payload = {}

//         const url = new URL(api_base_url + "/schedule-detail/getSchedules")
//         url.searchParams.append("cabinClassId", "1")
//         url.searchParams.append("ticketTypeId", "1")
//         url.searchParams.append("date", departureDate.toISOString())
//         url.searchParams.append("fromAirportId", fromAirport.nationalId)
//         url.searchParams.append("toAirportId", toAirport.nationalId)


//         const response = await fetch(
//             url.toString(),
//             {

//                 method: 'get',
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
//         // implement get schedules ==============
//         schedules = responseJson['schedules'];
//         setPage(1)
//         setScheduleToRender(schedules.slice((page - 1) * 4, (page * 4) - 1))

//     };

//     const [page, setPage] = useState<number>(1);
//     const [boardingPassModal, setBoardingPassModal] = useState(false);
//     const [invoiceModal, setInvoiceModal] = useState(false);


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
//                                         <div className="  bg-white text-sm leading-6 ring-gray-900/5">
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
//                                 <div className="grid grid-cols-12 w-full">
//                                     <div className="col-start-1 col-end-9 md:col-start-1 md:col-end-5">
//                                         <div className="text-start text-[#111] font-medium font-['Plus Jakarta Sans'] font-semibold text-3xl">Trips / Details</div>
//                                     </div>
//                                     <div className="w-full col-start-9 col-end-13 md:col-start-6 md:col-end-13 flex justify-end items-end">
//                                         <button
//                                             onClick={() => { navigate("/trip") }}
//                                             className="w-44 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark text-base font-bold leading-6 text-white shadow-sm">
//                                             <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-sm font-bold p-4">
//                                                 Back
//                                             </p>
//                                         </button>
//                                     </div>
//                                     <div className="w-full min-h-[592px] col-start-1 col-end-13 mt-4">
//                                         <div className="grid grid-cols-12 w-full gap-5">
//                                             <div className="w-full col-start-1 col-end-13 md:col-start-1 md:col-end-5 rounded-md border border-solid border-neutral-300 bg-surface-additionals-over-color-frame-light">
//                                                 <div>
//                                                     <div className="group relative flex rounded-lg px-2">
//                                                         <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
//                                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                                 <path d="M16.2513 10.4173C16.2513 9.26732 17.1846 8.33398 18.3346 8.33398V7.50065C18.3346 4.16732 17.5013 3.33398 14.168 3.33398H5.83464C2.5013 3.33398 1.66797 4.16732 1.66797 7.50065V7.91732C2.81797 7.91732 3.7513 8.85065 3.7513 10.0007C3.7513 11.1507 2.81797 12.084 1.66797 12.084V12.5007C1.66797 15.834 2.5013 16.6673 5.83464 16.6673H14.168C17.5013 16.6673 18.3346 15.834 18.3346 12.5007C17.1846 12.5007 16.2513 11.5673 16.2513 10.4173Z" stroke="#38A993" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                                 <path d="M8.33203 3.33398L8.33203 16.6673" stroke="#38A993" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4.17 4.17" />
//                                                             </svg>
//                                                         </div>
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-medium text-base text-[#111]">
//                                                                 E-Ticket
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <hr className="w-[95%] border-t-2 border border-[#EAECF0] mx-auto my-3" />
//                                                 <button
//                                                     onClick={() => setBoardingPassModal(true)}
//                                                     className="m-3 w-[90%] flex items-center justify-center rounded-md border border-primary border-[2px] hover:border-primary-dark bg-white hover:bg-white-dark text-primary hover:text-primary-dark font-bold leading-6 text-sm p-4">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none" className="mr-4">
//                                                         <path d="M1.5 4.5V3.25C1.5 2.005 2.505 1 3.75 1H5" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M8 1H9.25C10.495 1 11.5 2.005 11.5 3.25V4.5" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M11.5 8V8.75C11.5 9.995 10.495 11 9.25 11H8.5" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M5 11H3.75C2.505 11 1.5 9.995 1.5 8.75V7.5" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M5.75 3.5V4.5C5.75 5 5.5 5.25 5 5.25H4C3.5 5.25 3.25 5 3.25 4.5V3.5C3.25 3 3.5 2.75 4 2.75H5C5.5 2.75 5.75 3 5.75 3.5Z" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M9.75 3.5V4.5C9.75 5 9.5 5.25 9 5.25H8C7.5 5.25 7.25 5 7.25 4.5V3.5C7.25 3 7.5 2.75 8 2.75H9C9.5 2.75 9.75 3 9.75 3.5Z" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M5.75 7.5V8.5C5.75 9 5.5 9.25 5 9.25H4C3.5 9.25 3.25 9 3.25 8.5V7.5C3.25 7 3.5 6.75 4 6.75H5C5.5 6.75 5.75 7 5.75 7.5Z" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M9.75 7.5V8.5C9.75 9 9.5 9.25 9 9.25H8C7.5 9.25 7.25 9 7.25 8.5V7.5C7.25 7 7.5 6.75 8 6.75H9C9.5 6.75 9.75 7 9.75 7.5Z" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                     </svg>
//                                                     Boarding Pass
//                                                 </button>
//                                                 <button
//                                                     onClick={() => setInvoiceModal(true)}
//                                                     className="m-3 w-[90%] flex items-center justify-center rounded-md border border-primary border-[2px] hover:border-primary-dark bg-white hover:bg-white-dark text-primary hover:text-primary-dark font-bold leading-6 text-sm p-4">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" className="mr-4">
//                                                         <path d="M11.5 3V4.21C11.5 5 11 5.5 10.21 5.5H8.5V2.005C8.5 1.45 8.95501 1 9.51001 1C10.055 1.005 10.555 1.225 10.915 1.585C11.275 1.95 11.5 2.45 11.5 3Z" stroke="#38A993" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M1.5 3.5V10.5C1.5 10.915 1.96999 11.15 2.29999 10.9L3.155 10.26C3.355 10.11 3.635 10.13 3.815 10.31L4.64499 11.145C4.83999 11.34 5.16001 11.34 5.35501 11.145L6.19501 10.305C6.37001 10.13 6.65 10.11 6.845 10.26L7.70001 10.9C8.03001 11.145 8.5 10.91 8.5 10.5V2C8.5 1.45 8.95 1 9.5 1H4H3.5C2 1 1.5 1.895 1.5 3V3.5Z" stroke="#38A993" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M3.5 4.5H6.5" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                         <path d="M3.875 6.5H6.125" stroke="#38A993" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                     </svg>
//                                                     Invoice
//                                                 </button>
//                                             </div>
//                                             <div className="w-full col-start-1 col-end-13  md:col-start-5 md:col-end-13 rounded-md border border-solid border-neutral-300 bg-surface-additionals-over-color-frame-light">
//                                                 <div className="grid grid-cols-12 w-full" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-2">
//                                                         <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
//                                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                                 <path d="M7.52552 18.0758L9.46719 16.4424C9.75885 16.1924 10.2422 16.1924 10.5339 16.4424L12.4755 18.0758C12.9255 18.3008 13.4755 18.0758 13.6422 17.5924L14.0089 16.4841C14.1005 16.2174 14.0089 15.8258 13.8089 15.6258L11.9172 13.7258C11.7755 13.5924 11.6672 13.3258 11.6672 13.1341V10.7591C11.6672 10.4091 11.9255 10.2424 12.2505 10.3758L16.3422 12.1424C16.9839 12.4174 17.5089 12.0758 17.5089 11.3758V10.3008C17.5089 9.74245 17.0922 9.10078 16.5755 8.88411L11.9172 6.87578C11.7839 6.81745 11.6672 6.64245 11.6672 6.49245V3.99245C11.6672 3.20911 11.0922 2.28411 10.3922 1.92578C10.1422 1.80078 9.85052 1.80078 9.60052 1.92578C8.90052 2.28411 8.32552 3.21745 8.32552 4.00078V6.50078C8.32552 6.65078 8.20885 6.82578 8.07552 6.88411L3.42552 8.89245C2.90885 9.10078 2.49219 9.74245 2.49219 10.3008V11.3758C2.49219 12.0758 3.01719 12.4174 3.65885 12.1424L7.75052 10.3758C8.06719 10.2341 8.33385 10.4091 8.33385 10.7591V13.1341C8.33385 13.3258 8.22552 13.5924 8.09219 13.7258L6.20052 15.6258C6.00052 15.8258 5.90885 16.2091 6.00052 16.4841L6.36719 17.5924C6.51719 18.0758 7.06719 18.3091 7.52552 18.0758Z" stroke="#38A993" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                             </svg>
//                                                         </div>
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-medium text-base text-[#111]">
//                                                                 Travel Overview
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-full col-start-6 col-end-13 flex justify-end items-center flex-none">
//                                                         <button
//                                                             onClick={handleSignUp}
//                                                             className="mx-4 justify-center rounded-md bg-white disabled:bg-gray-400 hover:text-base font-bold leading-6 text-primary-dark">
//                                                             <p className="text-center text-primary text-base font-bold font-['Plus Jakarta Sans'] ">
//                                                                 View Details
//                                                             </p>
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <hr className="w-[95%] border-t-2 border border-[#EAECF0] mx-auto my-3" />
//                                                 <div className="grid grid-cols-12 w-full px-3 pb-3" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-2">
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-bold text-xs font-['Plus Jakarta Sans'] text-[#677084]">
//                                                                 Departure
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid grid-cols-12 w-full p-3" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-2">
//                                                         <div className="w-full">
//                                                             <div className="grid grid-cols-5 gap-1">
//                                                                 <div className="col-start-0 col-span-2 font-normal text-sm bg-white font-['Plus Jakarta Sans'] text-[#111] justify-start items-center inline-flex">Jakarta</div>
//                                                                 <div className="col-start-3 col-span-1 bg-white justify-start items-center inline-flex">
//                                                                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
//                                                                         <path d="M8.41797 3.45898L11.9588 6.99982L8.41797 10.5407" stroke="#38A993" stroke-width="0.875" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                                         <path d="M2.04297 7H11.8605" stroke="#38A993" stroke-width="0.875" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                                     </svg>
//                                                                 </div>
//                                                                 <div className="col-start-4 col-span-2 font-normal text-sm bg-white font-['Plus Jakarta Sans'] text-[#111] justify-start items-center inline-flex">Medan</div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid grid-cols-12 w-full p-3" >
//                                                     <div className="w-full col-start-1 col-end-8 flex group relative flex rounded-lg px-2">
//                                                         <div className="w-full grid grid-cols-7 gap-1">
//                                                             <div className="col-start-0 col-span-3 font-normal text-sm bg-white font-['Plus Jakarta Sans'] text-[#111] justify-start items-center inline-flex">16 January 2024</div>
//                                                             <div className="col-start-4 col-span-1 bg-white justify-start text-primary font-bolder text-sm items-center inline-flex">
//                                                                 •
//                                                             </div>
//                                                             <div className="col-start-5 col-span-3 font-normal text-sm bg-white font-['Plus Jakarta Sans'] text-[#111] justify-start items-center inline-flex">10:25 - 13:10 </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-12 w-full my-4">
//                                             <div className="w-full col-start-1 col-end-13 rounded-md border border-solid border-neutral-300 bg-surface-additionals-over-color-frame-light">
//                                                 <div className="grid grid-cols-12 w-full" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-2">
//                                                         <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
//                                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                                 <path d="M10.1302 9.05768C10.0469 9.04935 9.94687 9.04935 9.85521 9.05768C7.87187 8.99102 6.29688 7.36602 6.29688 5.36602C6.29687 3.32435 7.94687 1.66602 9.99687 1.66602C12.0385 1.66602 13.6969 3.32435 13.6969 5.36602C13.6885 7.36602 12.1135 8.99102 10.1302 9.05768Z" stroke="#38A993" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                                 <path d="M5.96563 12.134C3.94896 13.484 3.94896 15.684 5.96563 17.0257C8.25729 18.559 12.0156 18.559 14.3073 17.0257C16.324 15.6757 16.324 13.4757 14.3073 12.134C12.024 10.609 8.26562 10.609 5.96563 12.134Z" stroke="#38A993" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                             </svg>
//                                                         </div>
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-medium text-base text-[#111]">
//                                                                 Passenger and Amenities
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-full col-start-6 col-end-13 flex justify-end items-center flex-none">
//                                                         <button
//                                                             onClick={handleSignUp}
//                                                             className="mx-4 justify-center rounded-md bg-white disabled:bg-gray-400 hover:text-base font-bold leading-6 text-primary-dark">
//                                                             <p className="text-center text-primary text-base font-bold font-['Plus Jakarta Sans'] ">
//                                                                 View Details
//                                                             </p>
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <hr className="w-[95%] border-t-2 border border-[#EAECF0] mx-auto my-3" />
//                                                 <div className="grid grid-cols-12 w-full px-3 pb-2" >
//                                                     <div className="w-full col-start-1 col-end-13 flex group relative flex rounded-lg ">
//                                                         <Collapse
//                                                             bordered={false}
//                                                             defaultActiveKey={['1']}
//                                                             className="w-full"
//                                                             expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
//                                                             expandIconPosition="end"
//                                                             style={{
//                                                                 display: "flex",
//                                                                 justifyContent: "space-between",
//                                                                 alignItems: "center",
//                                                                 backgroundColor: "white"
//                                                             }}
//                                                         >
//                                                             <Collapse.Panel key="1"
//                                                                 header={<>
//                                                                     <div className="col-start-0 col-span-2 font-normal text-sm bg-white font-['Plus Jakarta Sans'] text-[#111] justify-start items-center inline-flex mr-3">Jakarta</div>
//                                                                     <div className="col-start-3 col-span-1 bg-white justify-start items-center inline-flex mx-3">
//                                                                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
//                                                                             <path d="M8.41797 3.45898L11.9588 6.99982L8.41797 10.5407" stroke="#38A993" stroke-width="0.875" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                                             <path d="M2.04297 7H11.8605" stroke="#38A993" stroke-width="0.875" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
//                                                                         </svg>
//                                                                     </div>
//                                                                     <div className="col-start-4 col-span-2 font-normal text-sm bg-white font-['Plus Jakarta Sans'] text-[#111] justify-start items-center inline-flex mx-3">Medan</div>
//                                                                 </>} style={{ width: "100%" }}>
//                                                                 Detail Info
//                                                             </Collapse.Panel>
//                                                         </Collapse>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid grid-cols-12 w-full px-3 py-2" >
//                                                     <div className="w-full col-start-1 col-end-12 flex group relative flex rounded-lg px-4">
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-normal text-sm text-[#354053]">
//                                                                 Mr. Lewis Carl Davidson
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid grid-cols-12 w-full px-3 py-2" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-4">
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-semibold text-sm text-[#111]">
//                                                                 Seat
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-full col-start-7 col-end-13 flex group relative flex rounded-lg px-4 item-end justify-end text-right">
//                                                         <div className="flex items-center ">
//                                                             <p className="font-semibold text-sm text-[#111]  text-right">
//                                                                 13A
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid grid-cols-12 w-full px-3 py-2" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-4">
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-semibold text-sm text-[#111]">
//                                                                 Baggage
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-full col-start-7 col-end-13 flex group relative flex rounded-lg px-4 item-end justify-end text-right">
//                                                         <div className="flex items-center ">
//                                                             <p className="font-semibold text-sm text-[#111]  text-right">
//                                                                 23kg
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid grid-cols-12 w-full px-3 py-2" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-4">
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-semibold text-sm text-[#111]">
//                                                                 Meal
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-full col-start-7 col-end-13 flex group relative flex rounded-lg px-4 item-end justify-end text-right">
//                                                         <div className="flex items-center ">
//                                                             <p className="font-semibold text-sm text-[#111]  text-right">
//                                                                 Spaghetti Bolognese
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="grid grid-cols-12 w-full my-4">
//                                             <div className="w-full col-start-1 col-end-13 rounded-md border border-solid border-neutral-300 bg-surface-additionals-over-color-frame-light">
//                                                 <div>
//                                                     <div className="group relative flex rounded-lg px-2">
//                                                         <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
//                                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                                 <path d="M16.2513 10.4173C16.2513 9.26732 17.1846 8.33398 18.3346 8.33398V7.50065C18.3346 4.16732 17.5013 3.33398 14.168 3.33398H5.83464C2.5013 3.33398 1.66797 4.16732 1.66797 7.50065V7.91732C2.81797 7.91732 3.7513 8.85065 3.7513 10.0007C3.7513 11.1507 2.81797 12.084 1.66797 12.084V12.5007C1.66797 15.834 2.5013 16.6673 5.83464 16.6673H14.168C17.5013 16.6673 18.3346 15.834 18.3346 12.5007C17.1846 12.5007 16.2513 11.5673 16.2513 10.4173Z" stroke="#38A993" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
//                                                                 <path d="M8.33203 3.33398L8.33203 16.6673" stroke="#38A993" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4.17 4.17" />
//                                                             </svg>
//                                                         </div>
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-medium text-base text-[#111]">
//                                                                 Booking Information
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <hr className="w-[95%] border-t-2 border border-[#EAECF0] mx-auto my-3" />
//                                                 <div className="grid grid-cols-12 w-full px-3 pb-2" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-4">
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-medium text-sm text-[#111]">
//                                                                 Booking Status
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-full col-start-7 col-end-13 flex group relative flex rounded-lg px-4 item-end justify-end text-right">
//                                                         <div className="flex items-center ">
//                                                             <p className="font-medium text-sm text-[#111]  text-right">
//                                                                 13A
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid grid-cols-12 w-full px-3 py-2" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-4">
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-medium text-sm text-[#111]">
//                                                                 Booking ID
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-full col-start-7 col-end-13 flex group relative flex rounded-lg px-4 item-end justify-end text-right">
//                                                         <div className="flex items-center ">
//                                                             <p className="font-medium text-sm text-[#111]  text-right">
//                                                                 240116K204GE99
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grid grid-cols-12 w-full px-3 py-2" >
//                                                     <div className="w-full col-start-1 col-end-6 flex group relative flex rounded-lg px-4">
//                                                         <div className="flex items-center justify-center text-center">
//                                                             <p className="font-medium text-sm text-[#111]">
//                                                                 Total Transfer
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-full col-start-7 col-end-13 flex group relative flex rounded-lg px-4 item-end justify-end text-right">
//                                                         <div className="flex items-center ">
//                                                             <p className="font-medium text-sm text-[#111]  text-right">
//                                                                 {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(3116000)}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <Modal
//                         title={<>
//                             <div className="grid grid-cols-12 w-full px-6 rounded-t-md ">
//                                 <div className="w-full col-start-1 col-end-2 flex group relative flex rounded-lg">
//                                     <div className="flex items-center justify-center text-center">
//                                         <button
//                                             onClick={() => setBoardingPassModal(false)}
//                                             className="my-4 justify-center rounded-md text-[#111]  hover:bg-grey text-base font-bold leading-6 text-white shadow-sm">
//                                             <CloseOutlined className="text-[#111]" />
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="w-full col-start-3 col-end-11 flex group relative flex rounded-lg  item-center justify-center text-center">
//                                     <div className="flex items-center ">
//                                         <p className="font-semibold text-xl text-[#111]  text-right">
//                                             Boarding Pass
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </>}
//                         centered
//                         open={boardingPassModal}
//                         onOk={() => setBoardingPassModal(false)}
//                         closeIcon={null}
//                         onCancel={() => setBoardingPassModal(false)}
//                         footer={<>
//                             <div className="grid grid-cols-12 w-full px-4 py-2 bg-white" style={{ borderRadius: "30px" }} >
//                                 <div className="w-full col-start-1 col-end-13 ">
//                                     <div className="flex items-center justify-center text-center">
//                                         <button
//                                             onClick={handleSignUp}
//                                             className="w-[85%] justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark text-base font-bold leading-6 text-white shadow-sm">
//                                             <p className="flex group relative flex rounded-lg item-center justify-center text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-lg font-bold p-4">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3">
//                                                     <path d="M9 11V17L11 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                     <path d="M9 17L7 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                     <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                     <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                 </svg>
//                                                 Download Boarding Pass
//                                             </p>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </>}
//                         className="custom-modal"
//                     >
//                         <div className="grid grid-cols-12 w-full p-2 bg-[#D6FAE6] border-[#38A993] border-[2px]" >
//                             <div className="w-full col-start-1 col-end-13 flex group relative flex rounded-lg item-center justify-center text-center">
//                                 <div className="flex items-center">
//                                     <p className="font-medium text-sm text-[#227879]  text-center">
//                                         Adult 1
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="w-full col-start-1 col-end-13 flex group relative flex rounded-lg item-center justify-center text-center">
//                                 <div className="flex items-center">
//                                     <p className="font-bold text-base text-[#227879]  text-center">
//                                         Lewis Carl Davidson
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-12 w-full p-4 bg-[#F2F4F7]" >
//                             <div className="w-full col-start-1 col-end-13 flex group relative flex rounded-lg">
//                                 <div className="w-full grid grid-cols-12">
//                                     <div className=" col-start-2 col-end-12 py-6 bg-white rounded-[12px] shadow border border-gray-200 flex-col justify-center items-center">
//                                         <div className="w-full grid grid-cols-12">
//                                             <div className="col-start-1 col-end-7 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center flex">
//                                                     <div className="w-[29.793px] h-[29.793px] top-[2px]  bg-emerald-400 rounded-full items-center">
//                                                         <img src="src/assets/airplane.svg" className="w-full h-full"></img>
//                                                     </div>
//                                                     <div className="ml-2 text-center text-xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]"> Sky Explorer</div>
//                                                 </div>
//                                             </div>
//                                             <div className="w-full col-start-7 col-end-12 bg-white flex-col flex justify-center items-end">
//                                                 <div className="flex items-center">
//                                                     <p className="font-semibold text-xs text-[#38A993] text-right">
//                                                         Departure Date
//                                                     </p>
//                                                 </div>
//                                                 <div className="flex items-center">
//                                                     <p className="font-bold text-xs text-[#111] text-right">
//                                                         16 January 2024
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className=" col-start-1 col-end-4 bg-white flex-col justify-center items-center pl-5">
//                                                 <div className="justify-center">
//                                                     <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-bold text-2xl">{detailSchedule.departureDate.format('HH:mm')}</div>
//                                                     <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-bold text-2xl">{detailSchedule.airportDepartureCode}</div>
//                                                     <div className="text-center text-[#808991] font-medium font-['Plus Jakarta Sans'] font-semibold text-sm">{detailSchedule.departureDate.format('D MMM')}</div>
//                                                 </div>
//                                             </div>
//                                             <div className=" col-start-4 col-end-9 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center">
//                                                     <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg my-1">{formattedDuration}</div>
//                                                     <div className="grid grid-cols-7 gap-1">
//                                                         <div className="col-start-0 col-span-1 py-3 bg-white justify-center items-center inline-flex">
//                                                             <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
//                                                                 <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993" />
//                                                                 <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993" />
//                                                             </svg>
//                                                         </div>
//                                                         <div className="col-start-2 col-span-2  py-3 bg-white justify-center items-center inline-flex">
//                                                             <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
//                                                         </div>
//                                                         <div className="col-start-4 col-span-1 py-3 justify-center items-center inline-flex">
//                                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                                                                 <path d="M11.1422 16.7085L12.8172 12.8168L13.1839 11.9501C13.2505 11.8168 13.4255 11.7001 13.5755 11.7001H16.1255C16.9255 11.7001 17.8755 11.1085 18.2422 10.3918C18.3672 10.1418 18.3672 9.8418 18.2422 9.5918C17.8755 8.88346 16.9172 8.2918 16.1172 8.2918H13.5672C13.4172 8.2918 13.2422 8.17513 13.1755 8.0418L11.1339 3.2918C10.9172 2.7668 10.2589 2.3418 9.69219 2.3418H8.59219C7.88385 2.3418 7.53385 2.87513 7.81719 3.53346L9.61719 7.70846C9.75885 8.03346 9.58385 8.30013 9.22552 8.30013H8.30052H6.80052C6.60885 8.30013 6.33385 8.1918 6.20052 8.05846L4.25885 6.12513C4.05885 5.92513 3.66719 5.83346 3.38385 5.92513L2.25052 6.30013C1.75885 6.45013 1.52552 7.00846 1.75885 7.4668L3.42552 9.45013C3.68386 9.75013 3.68386 10.2418 3.42552 10.5418L1.75885 12.5251C1.53386 12.9835 1.75885 13.5418 2.25052 13.7085L3.38385 14.0835C3.65885 14.1751 4.05885 14.0835 4.25885 13.8835L6.20052 11.9501C6.33385 11.8085 6.60885 11.7001 6.80052 11.7001H9.22552C9.58385 11.7001 9.75052 11.9585 9.61719 12.2918L7.81719 16.4668C7.53385 17.1251 7.88385 17.6585 8.59219 17.6585H9.69219C10.2589 17.6585 10.9172 17.2335 11.1422 16.7085Z" fill="#38A993" />
//                                                             </svg>
//                                                         </div>
//                                                         <div className="col-start-5 col-span-2 py-3 justify-center items-center inline-flex">
//                                                             <hr className="w-full border-t-4 border-dashed border-[#EAECF0] mx-auto" />
//                                                         </div>
//                                                         <div className="col-start-7 col-span-1 py-3  justify-center items-center inline-flex">
//                                                             <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
//                                                                 <ellipse opacity="0.5" cx="8.69725" cy="7.99924" rx="8.19725" ry="7.79221" fill="#38A993" />
//                                                                 <ellipse cx="8.69569" cy="7.99955" rx="4.91835" ry="4.67533" fill="#38A993" />
//                                                             </svg>
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-center text-[#22313F] text-base font-medium font-['Plus Jakarta Sans'] text-lg">Direct</div>
//                                                 </div>
//                                             </div>
//                                             <div className=" col-start-9 col-end-13 bg-white flex-col justify-center items-center pr-5">
//                                                 <div className="justify-center">
//                                                     <div className="text-center text-[#111] font-medium font-['Plus Jakarta Sans'] font-bold text-2xl">{detailSchedule.arrivalDate.format('HH:mm')}</div>
//                                                     <div className="text-center text-[#38A993] font-medium font-['Plus Jakarta Sans'] font-bold text-2xl">{detailSchedule.airportArrivalCode}</div>
//                                                     <div className="text-center text-[#808991] font-medium font-['Plus Jakarta Sans'] font-semibold text-sm">{detailSchedule.arrivalDate.format('D MMM')}</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full grid grid-cols-12 gap-3 p-5">
//                                             <div className="col-start-1 col-end-4 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center bg-[#F2F4F7] rounded-[12px] p-4">
//                                                     <div className="text-center text-sm font-semibold font-['Plus Jakarta Sans']">16:45</div>
//                                                     <div className="text-center text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Board</div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-start-4 col-end-7 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center bg-[#F2F4F7] rounded-[12px] p-4">
//                                                     <div className="text-center text-sm font-semibold font-['Plus Jakarta Sans']">SE 955</div>
//                                                     <div className="text-center text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Flight</div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-start-7 col-end-10 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center bg-[#F2F4F7] rounded-[12px] p-4">
//                                                     <div className="text-center text-sm font-semibold font-['Plus Jakarta Sans']">13-A</div>
//                                                     <div className="text-center text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Seat</div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-start-10 col-end-13 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center bg-[#F2F4F7] rounded-[12px] p-4">
//                                                     <div className="text-center text-sm font-semibold font-['Plus Jakarta Sans']">A2</div>
//                                                     <div className="text-center text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Gate</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full grid grid-cols-12 gap-3 px-5">
//                                             <div className="col-start-1 col-end-7 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center bg-[#F2F4F7] rounded-[12px] p-4">
//                                                     <div className="text-center text-sm font-semibold font-['Plus Jakarta Sans']">Lewis Carl Davidson</div>
//                                                     <div className="text-center text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Passenger Name</div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-start-7 col-end-13 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center bg-[#F2F4F7] rounded-[12px] p-4">
//                                                     <div className="text-center text-sm font-semibold font-['Plus Jakarta Sans']">{cabin == 1 ? <>
//                                                         Economy
//                                                     </> : cabin == 2 ? <>
//                                                         Business
//                                                     </> : <>
//                                                         First
//                                                     </>}</div>
//                                                     <div className="text-center text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Class</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="  relative flex col-start-2 col-end-12 py-6 bg-white rounded-[12px] shadow border border-gray-200 flex-col justify-center items-center">
//                                         <QRCode size={126} value={'Ceritanya QR Code'} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </Modal>
//                     <Modal
//                         title={<>
//                             <div className="grid grid-cols-12 w-full px-6 rounded-t-md ">
//                                 <div className="w-full col-start-1 col-end-2 flex group relative flex rounded-lg">
//                                     <div className="flex items-center justify-center text-center">
//                                         <button
//                                             onClick={() => setInvoiceModal(false)}
//                                             className="my-4 justify-center rounded-md text-[#111]  hover:bg-grey text-base font-bold leading-6 text-white shadow-sm">
//                                             <CloseOutlined className="text-[#111]" />
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="w-full col-start-3 col-end-11 flex group relative flex rounded-lg  item-center justify-center text-center">
//                                     <div className="flex items-center ">
//                                         <p className="font-semibold text-xl text-[#111]  text-right">
//                                             Invoice
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </>}
//                         centered
//                         open={invoiceModal}
//                         onOk={() => setInvoiceModal(false)}
//                         closeIcon={null}
//                         onCancel={() => setInvoiceModal(false)}
//                         footer={<>
//                             <div className="grid grid-cols-12 w-full px-4 py-2 bg-white" style={{ borderRadius: "30px" }} >
//                                 <div className="w-full col-start-1 col-end-13 ">
//                                     <div className="flex items-center justify-center text-center">
//                                         <button
//                                             onClick={handleSignUp}
//                                             className="w-[85%] justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark text-base font-bold leading-6 text-white shadow-sm">
//                                             <p className="flex group relative flex rounded-lg item-center justify-center text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal text-lg font-bold p-4">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3">
//                                                     <path d="M9 11V17L11 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                     <path d="M9 17L7 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                     <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                     <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//                                                 </svg>
//                                                 Download Invoice
//                                             </p>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </>}
//                         className="custom-modal"
//                     >
//                         <div className="grid grid-cols-12 w-full p-4 bg-[#F2F4F7]" >
//                             <div className="w-full col-start-1 col-end-13 flex group relative flex rounded-lg">
//                                 <div className="w-full grid grid-cols-12">
//                                     <div className=" col-start-2 col-end-12 py-6 bg-white rounded-[12px] shadow border border-gray-200 flex-col justify-center items-center">
//                                         <div className="w-full grid grid-cols-12">
//                                             <div className="col-start-1 col-end-7 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center flex">
//                                                     <div className="w-[29.793px] h-[29.793px] top-[2px]  bg-emerald-400 rounded-full items-center">
//                                                         <img src="src/assets/airplane.svg" className="w-full h-full"></img>
//                                                     </div>
//                                                     <div className="ml-2 text-center text-xl font-semibold font-['Plus Jakarta Sans'] leading-[54px]"> Sky Explorer</div>
//                                                 </div>
//                                             </div>
//                                             <div className="w-full col-start-7 col-end-12 bg-white flex-col flex justify-center items-end">
//                                                 <div className="flex items-center">
//                                                     <p className="font-bold text-xl text-[#38A993] text-right">
//                                                         INVOICE
//                                                     </p>
//                                                 </div>
//                                                 <div className="flex items-center">
//                                                     <p className="font-bold text-xs text-[#111] text-right">
//                                                         INV/SE/240116K204GE99
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full grid grid-cols-12 gap-3 px-5 pt-5">
//                                             <div className="col-start-1 col-end-7 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center">
//                                                     <div className="text-start text-sm text-[#38A993] font-bold font-['Plus Jakarta Sans']">Passenger Information</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full grid grid-cols-12 gap-3 px-5 py-3">
//                                             <div className="col-start-1 col-end-7 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center">
//                                                     <div className="text-start text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Name</div>
//                                                     <div className="text-start text-xs font-bold font-['Plus Jakarta Sans']">Lewis Carl Davidson</div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-start-7 col-end-13 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center">
//                                                     <div className="text-start text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Phone Number</div>
//                                                     <div className="text-start text-xs font-bold font-['Plus Jakarta Sans']">(+62) 81247222044</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full grid grid-cols-12 gap-3 px-5">
//                                             <div className="col-start-1 col-end-7 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center">
//                                                     <div className="text-start text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Email</div>
//                                                     <div className="text-start text-xs font-bold font-['Plus Jakarta Sans']">lewis.davidson@gmail.com</div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-start-7 col-end-13 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center">
//                                                     <div className="text-start text-xs text-[#677084] font-semibold font-['Plus Jakarta Sans']">Issued Date</div>
//                                                     <div className="text-start text-xs font-bold font-['Plus Jakarta Sans']">16 January 2024</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full grid grid-cols-12 gap-3 p-5">
//                                             <div className="col-start-1 col-end-13 bg-white flex-col justify-center items-center">
//                                                 <div className="justify-center items-center">
//                                                     <Table pagination={false}
//                                                         dataSource={dataSource} columns={columns} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="w-full grid grid-cols-12 gap-3 px-5">
//                                             <div className="col-start-5 col-end-13 bg-white flex justify-end items-end">
//                                                 <div className="w-full grid grid-cols-12 gap-1">
//                                                     <div className="col-start-1 col-end-7 bg-white flex-col justify-center items-center">
//                                                         <div className="justify-center items-center">
//                                                             <div className="text-end text-xs text-[#99A2B2] font-semibold font-['Plus Jakarta Sans']">Sub total</div>
//                                                             <div className="text-end text-xs text-[#99A2B2] font-semibold font-['Plus Jakarta Sans']">Processing fee</div>
//                                                             <div className="text-end text-xs text-[#99A2B2] font-semibold font-['Plus Jakarta Sans']">Discount</div>
//                                                             <div className="py-1 text-end text-base text-[#38A993] font-semibold font-['Plus Jakarta Sans']">Total Amount</div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-start-7 col-end-13 bg-white flex-col justify-center items-center">
//                                                         <div className="justify-center items-center">
//                                                             <div className="text-end text-xs font-bold font-['Plus Jakarta Sans']">3,114,500 IDR</div>
//                                                             <div className="text-end text-xs font-bold font-['Plus Jakarta Sans']">2,000 IDR</div>
//                                                             <div className="text-end text-xs font-bold font-['Plus Jakarta Sans']">0 IDR</div>
//                                                             <div className="py-1 text-end text-base font-bold font-['Plus Jakarta Sans']">3,116,500 IDR</div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </Modal>
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
