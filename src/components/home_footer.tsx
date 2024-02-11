import Logo from "./Logo"

const HomeFooter: React.FC = () => {
    return <div>
        <div className="w-full h-[321px] flex-col justify-between items-start inline-flex">
            <div className="w-full px-[51px] py-12 bg-white border-t border-gray-200 justify-between items-start inline-flex">
                <div className="w-full  grid grid-cols-12 gap-5 ">
                    <div className="col-end-13 xl: col-start-1 xl:col-end-5 py-6  bg-white rounded-[16px] flex-col justify-center items-center gap-4">
                        <div className="h-[150px] flex-col justify-between items-start inline-flex">
                            <div className="flex-col justify-center items-end gap-2 flex">
                                <Logo></Logo>
                                <div className="self-stretch text-center text-gray-500 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">Navigate the Skies, Booking Made Easy </div>
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
                                            <div className="w-[15.83px] h-[11.67px] left-0 top-0 absolute">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-start-1 col-end-13 xl: xl:col-start-5 col-end-13 py-6 bg-white rounded-[16px] flex-col justify-center items-center gap-4">
                        <div className="grid grid-cols-12 xl:grid-cols-10 gap-5">
                            <div className="col-start-1 col-end-5 xl:col-start-1 xl:col-end-3 py-6 flex-col justify-start items-start gap-3 inline-flex">
                                <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Features</div>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Sign Up / Sign In</a>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Explore</a>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Status</a>
                            </div>
                            <div className="col-start-5 col-end-9 xl:col-start-3 xl:col-end-5 py-6 flex-col justify-start items-start gap-3 inline-flex">
                                <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Cabin</div>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Economy</a>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Business</a>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">First</a>
                            </div>
                            <div className="col-start-9 col-end-13 xl:col-start-5 xl:col-end-7 py-6 flex-col justify-start items-start gap-3 inline-flex">
                                <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Baggage</div>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Checked Baggage</a>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Cabin Baggage</a>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Fare Types</a>
                            </div>
                            <div className="col-start-1 col-end-5 xl:col-start-7 xl:col-end-9 py-6 flex-col justify-start items-start gap-3 inline-flex">
                                <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Resources</div>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">About Us</a>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">FAQs</a>
                            </div>
                            <div className="col-start-5 col-end-9 xl:col-start-9 xl:col-end-11 py-6 flex-col justify-start items-start gap-3 inline-flex">
                                <div className="self-stretch text-black text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Company</div>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Privacy Policy</a>
                                <a className="self-stretch hover:text-[#38A993] text-slate-700 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Terms of Use</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[75px] pr-[51px] bg-emerald-400 justify-between items-center inline-flex">
                <div className="h-[94px] justify-end items-center gap-6 flex"></div>
                <div className="text-white text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">No Bull, Just Board!</div>
            </div>
        </div>
    </div>
}

export default HomeFooter