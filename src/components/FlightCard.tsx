// FlightCard.tsx
import React from "react";
import Dots from "/assets/dots.svg";
import IconAirplane from "/assets/icon-airplane.svg";
import ChevronRight from "/assets/chevron-right.svg";
import Airplane from "/assets/airplane.svg";

interface FlightCardProps {
  time: string;
  origin: string;
  date: string;
  duration: string;
  direct: boolean;
  destination: string;
  flightNumber: string;
  status: "Departed" | "Arrived";
  handleDetailsClick: (status: "Departed" | "Arrived") => void;
}

const FlightCard: React.FC<FlightCardProps> = ({
  time,
  origin,
  date,
  duration,
  direct,
  destination,
  flightNumber,
  handleDetailsClick,
  status,
}) => (
  <div className="flex">
    <div className="bg-white rounded-xl p-2 md:p-5 flex gap-2 md:gap-5 border-r border-dashed border-gray-200">
      <div className="flex flex-col">
        <p className="text-sm md:text-2xl font-semibold font-['Plus Jakarta Sans'] leading-9">
          {time}
        </p>
        <p className="text-primary text-sm md:text-2xl font-semibold font-['Plus Jakarta Sans'] leading-9">
          {origin}
        </p>
        <p className="text-neutral-gray text-xs md:text-normal font-medium md:font-semibold font-['Plus Jakarta Sans']">
          {date}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-slate-800 text-sm lg:text-[15.03px] font-normal font-['Plus Jakarta Sans']">
          {duration}
        </p>
        <div className="flex gap-2 p-2 items-center justify-center">
          <img src={Dots} alt="Icon dots" className="h-4 w-4" />
          <div className="w-[78.11px] h-[5px] border-t border-dashed border-gray-300" />
          <img src={IconAirplane} alt="Icon Airplane" className="h-4 w-4" />
          <div className="w-[30px] lg:w-[78.11px] h-[5px] border-t border-dashed border-gray-300" />
          <img src={Dots} alt="Icon dots" className="h-4 w-4" />
        </div>
        <p className="text-slate-800 text-sm lg:text-[15.03px] font-normal font-['Plus Jakarta Sans']">
          {direct ? "Direct" : "Connecting"}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm lg:text-2xl font-semibold font-['Plus Jakarta Sans'] leading-9">
          {time}
        </p>
        <p className="text-primary text-sm lg:text-2xl font-semibold font-['Plus Jakarta Sans'] leading-9">
          {destination}
        </p>
        <p className="text-neutral-gray text-xs md:text-normal font-medium md:font-semibold font-['Plus Jakarta Sans']">
          {date}
        </p>
      </div>
    </div>
    <div className="bg-white flex flex-col px-2 py-5 md:p-8 items-center justify-center h-full gap-2 md:gap-4 rounded-xl">
      <div className="flex items-center gap-1">
        <div className="bg-primary rounded-2xl">
          <img
            src={Airplane}
            alt="Icon Airplane"
            className="h-4 md:h-8 w-4 md:w-8"
          />
        </div>
        <p className="text-xs md:text-lg font-semibold font-['Plus Jakarta Sans']">
          {flightNumber}
        </p>
      </div>
      <button
        className="text-sm md:text-normal flex gap-0 md:gap-2 text-primary hover:text-primary-dark hover:text-semibold items-center justify-center"
        onClick={() => handleDetailsClick(status)}
      >
        Details
        <img
          src={ChevronRight}
          alt="Icon Chevron right"
          className="h-3 w-3 md:h-4 md:w-4"
        />
      </button>
    </div>
  </div>
);

export default FlightCard;
