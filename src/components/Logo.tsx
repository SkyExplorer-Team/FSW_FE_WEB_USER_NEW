import React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/");
      }}
      className="h-[51.79px] justify-center items-center md:gap-[10.71px] flex"
    >
      <div className="w-[52px] h-[52px] relative md:pr-12">
        <div className="w-[46px] h-[46px] top-[2px] absolute bg-primary rounded-full">
          <img src="src/assets/airplane.svg" className=" w-full h-full "></img>
        </div>
      </div>
      <div className="hidden md:block text-neutral-900 text-4xl font-medium font-['Plus Jakarta Sans'] leading-[54px]">
        SkyExplorer
      </div>
    </button>
  );
};

export default Logo;
