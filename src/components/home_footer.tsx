import Logo from "./Logo";
import planeImage from "/assets/plane-footer.svg";
import IG from "/assets/medsos-ig.svg";
import twitter from "/assets/medsos-twitter.svg";
import tiktok from "/assets/medsos-tiktok.svg";
import facebook from "/assets/medsos-fb.svg";
import youtube from "/assets/medsos-ig.svg";
import { Link, useNavigate } from "react-router-dom";

const HomeFooter: React.FC = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleStatus = () => {
    navigate("/status");
  };
  const handleCabin = () => {
    navigate("/cabin");
  };
  const handleBaggage = () => {
    navigate("/baggage");
  };
  return (
    <div>
      <div className="w-full h-[321px] flex-col justify-between items-start inline-flex">
        <div className="w-full px-[20px] py-12 md:px-[50px] bg-white border-t border-gray-200 justify-between items-start inline-flex">
          <div className="w-full  grid grid-cols-12 gap-5 ">
            <div className="col-end-13 xl: col-start-1 xl:col-end-5 py-6  bg-white rounded-[16px] flex-col justify-center items-center gap-4">
              <div className="h-[150px] flex-col justify-between items-start inline-flex">
                <div className="flex-col justify-center items-start gap-2 flex">
                  <Logo />
                  <div className="self-stretch text-left text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                    Navigate the Skies, Booking Made Easy{" "}
                  </div>
                  <div className="flex pt-5" style={{ gap: "32px" }}>
                    <img
                      src={IG}
                      alt="Instagram"
                      className="social-media-icon"
                    />
                    <img
                      src={twitter}
                      alt="Twitter"
                      className="social-media-icon"
                    />
                    <img
                      src={tiktok}
                      alt="TikTok"
                      className="social-media-icon"
                    />
                    <img
                      src={facebook}
                      alt="Facebook"
                      className="social-media-icon"
                    />
                    <img
                      src={youtube}
                      alt="YouTube"
                      className="social-media-icon"
                    />
                  </div>
                </div>

                <div className="self-stretch justify-start items-center gap-3 inline-flex">
                  <div className="p-2 rounded-full justify-start items-center gap-2.5 flex">
                    <div className="w-5 h-5 relative"></div>
                  </div>
                  <div className="p-2 rounded-full justify-start items-center gap-2.5 flex">
                    <div className="w-[18px] h-[18px] relative"></div>
                  </div>
                  <div className="p-2 rounded-full justify-start items-center gap-2.5 flex">
                    <div className="w-5 h-5 relative"></div>
                  </div>
                  <div className="p-2 rounded-full justify-start items-center gap-2.5 flex">
                    <div className="w-5 h-5 relative"></div>
                  </div>
                  <div className="p-2 rounded-full justify-start items-center gap-2.5 flex">
                    <div className="w-5 h-5 relative">
                      <div className="w-[15.83px] h-[11.67px] left-[2.08px] top-[4.17px] absolute">
                        <div className="w-[15.83px] h-[11.67px] left-0 top-0 absolute"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-start-1 col-end-13 xl: xl:col-start-5 py-6 bg-white rounded-[16px] flex-col justify-center items-center gap-4">
              <div className="grid grid-cols-12 xl:grid-cols-10 gap-5">
                <div className="col-start-1 col-end-5 xl:col-start-1 xl:col-end-3 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    Features
                  </div>
                  <div className="flex gap-2 self-stretch text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    <Link
                      type="text"
                      onClick={handleSignUp}
                      className="cursor-pointer hover:text-primary"
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                    <p>/</p>
                    <Link
                      type="text"
                      onClick={handleLogin}
                      className="cursor-pointer hover:text-primary"
                      to="/login"
                    >
                      Login
                    </Link>
                  </div>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    Explore
                  </a>
                  <a className="self-stretch  text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    <Link
                      type="text"
                      onClick={handleStatus}
                      className="cursor-pointer hover:text-primary"
                      to="/status"
                    >
                      Status
                    </Link>
                  </a>
                </div>
                <div className="col-start-5 col-end-9 xl:col-start-3 xl:col-end-5 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    <Link
                      type="text"
                      onClick={handleCabin}
                      className="cursor-pointer hover:text-primary"
                      to="/cabin"
                    >
                      Cabin
                    </Link>
                  </div>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    Economy
                  </a>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    Business
                  </a>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    First
                  </a>
                </div>
                <div className="col-start-9 col-end-13 xl:col-start-5 xl:col-end-7 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch hover:text-primary text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    <Link
                      type="text"
                      onClick={handleBaggage}
                      className="cursor-pointer hover:text-primary"
                      to="/baggage"
                    >
                      Baggage
                    </Link>
                  </div>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    Checked Baggage
                  </a>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    Cabin Baggage
                  </a>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    Fare Types
                  </a>
                </div>
                <div className="col-start-1 col-end-5 xl:col-start-7 xl:col-end-9 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    Resources
                  </div>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    About Us
                  </a>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    FAQs
                  </a>
                </div>
                <div className="col-start-5 col-end-9 xl:col-start-9 xl:col-end-11 py-6 flex-col justify-start items-start gap-3 inline-flex">
                  <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                    Company
                  </div>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    Privacy Policy
                  </a>
                  <a className="self-stretch hover:text-primary text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">
                    Terms of Use
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[100px] bg-primary flex justify-end md:justify-between items-center px-[20px] lg:px-[51px] md:py-12 py-5">
          <div
            className="h-auto justify-end items-center gap-6 hidden md:flex"
            style={{ marginLeft: "-210px" }}
          >
            <img
              src={planeImage}
              alt=""
              style={{ height: "auto", width: "95%" }}
            />
          </div>
          <p className="text-white text-lg font-medium font-['Plus Jakarta Sans'] leading-7 pl-[0px] md:pl-10 ">
            No Bull, Just Board!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
