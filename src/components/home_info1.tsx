const HomeInfo1 : React.FC = ()=>{
    return <div>
    <div className=" text-center ">
        <div className="border-b border-gray-100 justify-between items-center inline-flex">
            <div className="flex-col justify-start items-center gap-[25px] inline-flex">
                <div className="relative bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100">
                    <img className="p-4" src="src/assets/search_1.svg">
                    </img>

                </div>
                <div className="flex-col justify-center items-center gap-4 flex">
                    <div className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">Find Your Journey in a Flash</div>
                    <div className="w-[390px] text-center text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Discover flights that suit your plans. Start your adventure with a simple search.</div>
                </div>
            </div>
            <div className="flex-col justify-start items-center gap-[27px] inline-flex">
                <div className="relative bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100">
                    <img className="px-4" src="src/assets/take.svg">
                    </img>

                </div>
                <div className="flex-col justify-center items-center gap-4 flex">
                    <div className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">Tailor Your Journey, Your Way</div>
                    <div className="w-[390px] text-center text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Make it uniquely yours. Add details, select seats, and choose your in-flight delights.</div>
                </div>
            </div>
            <div className="flex-col justify-start items-center gap-7 inline-flex">
                <div className="relative bg-gradient-to-b from-emerald-100 to-white rounded-2xl border border-gray-100">
                    <img className="" src="src/assets/smooth.svg">
                    </img>

                </div>
                <div className="flex-col justify-center items-center gap-4 flex">
                    <div className="text-neutral-900 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">Smooth Boarding Awaits You</div>
                    <div className="w-[390px] text-center text-gray-500 text-base font-medium font-['Plus Jakarta Sans'] leading-normal">Ready for takeoff? Board with confidence using your digital boarding pass.</div>
                </div>
            </div>
        </div>
    </div>
    <div className=" py-12 ">
        <img className="block mr-auto ml-auto" src="src/assets/download.svg" alt="" />
    </div>

    </div>
}

export default HomeInfo1