import React, { useEffect, useState, useRef } from "react";
import Logo from "../components/Logo";
import { Layout, Dropdown } from "antd";
import ReactCountryFlag from "react-country-flag";
import Chevron from "/assets/chevron-down.svg";
import IconMenu from "/assets/menu.svg";
import IconUser from "/assets/user.svg";
import { useNavigate } from "react-router-dom";
import { MenuProps } from "antd/lib";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ProfileMenu from "./ProfileMenu";

dayjs.extend(customParseFormat);

const { Header } = Layout;

const api_base_url = "https://be-java-master-production.up.railway.app/api";
// const api_base_url = "https://be-java-production.up.railway.app";

const HeaderComponent: React.FC = () => {
  const token = localStorage.getItem("access_token");
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const menu = <ProfileMenu />;
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchName();
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [token, navigate]);

  async function fetchName() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token!);
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch(api_base_url + "/users/me", {
        method: "get",
        headers: myHeaders,
      });

      if (response.status !== 200) {
        const responseJson = await response.json();
        alert("error: " + responseJson.message);
        return;
      }

      const responseJson = await response.json();
      setUserName(responseJson.data["firstName"]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleProfileClick = () => {
    setProfileMenuVisible(!isProfileMenuVisible);
  };

  const handleStatus = () => {
    navigate("/status");
  };

  const CabinItems: MenuProps["items"] = [
    {
      key: "cabin-1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          Economy
        </a>
      ),
    },
    {
      key: "cabin-2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          Bussiness
        </a>
      ),
    },
    {
      key: "cabin-3",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          First
        </a>
      ),
    },
  ];

  const BaggageItems: MenuProps["items"] = [
    {
      key: "baggage-1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          Checked Baggage
        </a>
      ),
    },
    {
      key: "baggage-2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          Cabin Baggage
        </a>
      ),
    },
    {
      key: "baggage-3",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/">
          Fare Types
        </a>
      ),
    },
  ];

  const handleSignUp = () => {
    navigate("/signup");
  };

  const [, setIsMobile] = useState<boolean>(false);

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize(); // Mengecek ukuran jendela saat pertama kali dimuat
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Header
      style={{
        top: 0,
        zIndex: 1,
        paddingTop: "4px",
        paddingBottom: "8px",
        position: "sticky",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <div className="justify-around flex w-full">
        <div className="justify-start items-center gap-8 flex">
          <Logo />
          <div className="justify-start items-start gap-6 flex">
            <div className="text-neutral-900 text-lg font-medium font-['Plus Jakarta Sans'] leading-7">
              Explore
            </div>
            <div
              className="text-neutral-900 text-lg font-medium font-['Plus Jakarta Sans'] hover:text-primary leading-7 cursor-pointer"
              onClick={handleStatus}
            >
              Status
            </div>
            <Dropdown
              className="flex hover:text-primary text-neutral-900 text-lg font-medium font-['Plus Jakarta Sans'] leading-7"
              menu={{ items: CabinItems }}
            >
              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center"
              >
                <div className="pr-2">Cabin</div>
                <img src={Chevron} alt="Chevron" className="h-4 w-4" />
              </button>
            </Dropdown>
            <Dropdown
              className="flex hover:text-primary text-neutral-900 text-lg font-medium font-['Plus Jakarta Sans'] leading-7 "
              menu={{ items: BaggageItems }}
            >
              <button
                onClick={(e) => e.preventDefault()}
                className="flex items-center"
              >
                <div className="pr-2">Baggage</div>
                <img src={Chevron} alt="Chevron" className="h-4 w-4" />
              </button>
            </Dropdown>
          </div>
        </div>
        <div className="gap-8 flex">
          <a className="snap-center self-center align-middle hover:text-primary text-center text-neutral-900 text-lg font-medium font-['Plus Jakarta Sans'] leading-7">
            <div className="justify-start items-center gap-4 flex">
              <ReactCountryFlag countryCode="ID" svg />
              <div className="">IDR</div>
            </div>
          </a>

          {token ? (
            <div
              className="flex items-center justify-center gap-4 border rounded-lg p-2 hover:text-primary text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 cursor-pointer"
              onClick={handleProfileClick}
              ref={dropdownRef}
            >
              <div className="bg-[#D0D5DD] rounded-xl p-1">
                <img src={IconUser} alt="Icon Menu" className="h-4 w-4" />
              </div>
              {userName}
              <img src={IconMenu} alt="Icon Menu" className="h-4 w-4" />
              <Dropdown
                open={isProfileMenuVisible}
                overlay={menu}
                placement="bottomRight"
                trigger={[]}
              >
                <div />
              </Dropdown>
            </div>
          ) : (
            <button
              onClick={handleSignUp}
              type="submit"
              className="my-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm"
            >
              <p className="self-stretch text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
                Sign Up
              </p>
            </button>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
