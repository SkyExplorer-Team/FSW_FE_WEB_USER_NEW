import { Radio } from "antd";
import { useState } from "react";

interface CabinProps {
    chosen: number
    onChange: (e: number) => void

}

const CabinField: React.FC<CabinProps> = (
    {
        chosen,
        onChange
    }
) => {
    const [value, changeValue] = useState<number>(chosen)
    return (
        <Radio.Group value={value} onChange={(e) => {
            switch (e.target.value) {
                case 0:
                    onChange(0);
                    changeValue(0);
                    break
                case 1:
                    onChange(1);
                    changeValue(1);
                    break
                case 2:
                    onChange(2);
                    changeValue(2);
                    break
                default:
                    onChange(0)
                    changeValue(0);
            }
        }} >
            <div className="w-[430px] h-[368px] p-6 bg-white rounded-2xl shadow border border-gray-100 flex-col justify-center items-start gap-4 inline-flex">
                <div className="self-stretch text-primary text-2xl font-bold font-['Plus Jakarta Sans'] leading-9">Cabin Class</div>
                <div className="h-[188px] flex-col justify-center items-start gap-6 flex">
                    <div className="self-stretch h-[188px] flex-col justify-center items-center gap-2 flex">
                        <a className="w-[367px] py-3 justify-center items-center gap-4 inline-flex"
                            onClick={() => {
                                changeValue(0)
                                onChange(0);
                            }}
                        >

                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Economy</div>
                            </div>
                            <Radio value={0}>
                            </Radio>
                        </a>
                        <a className="w-[367px] py-3 justify-center items-center gap-4 inline-flex"
                            onClick={() => {
                                changeValue(1);
                                onChange(1);
                            }}
                        >
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Business</div>
                            </div>
                            <Radio value={1}>
                            </Radio>
                        </a>
                        <a className="w-[367px] py-3 justify-center items-center gap-4 inline-flex" onClick={() => {
                            changeValue(2);
                            onChange(2);
                        }}>
                            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                                <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">First</div>
                            </div>
                            <Radio value={2}>

                            </Radio>
                        </a>
                    </div>
                </div>


            </div>

        </Radio.Group>

    );
};

export default CabinField;
