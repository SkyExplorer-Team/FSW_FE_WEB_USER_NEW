import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";


interface SeatsProps{
    seats : Map<string,number>
    onChange: (e: Map<string,number>) => void

}


const PassengerField: React.FC<SeatsProps> = (
    {
        seats,
        onChange
    }  
) => {

    const value= new  Map(seats)


    const [adult,setAdult] = useState(seats.get("adults")??0)
    const [children,setChildren] = useState(seats.get("children")??0)
    const [infant,setInfant] = useState(seats.get("infant")??0)

    const updateMap = (k:string,v:number) => {
        value.set(k,v)
        onChange(value)
      }
        

    return (
        <div className="w-[430px] h-[416px] p-6 bg-white rounded-2xl shadow border border-gray-100 flex-col justify-center items-start gap-4 inline-flex">
            <div className="text-primary text-2xl font-semibold font-['Plus Jakarta Sans'] leading-9">Passengers</div>
            <div className="h-[236px] flex-col justify-center items-start gap-6 flex">
                <div className="self-stretch h-[236px] flex-col justify-center items-center gap-2 flex">
                    <div className="w-[367px] py-2 justify-center items-center gap-4 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                            <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Adults</div>
                            <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">12 years old and above</div>
                        </div>
                        <div className="justify-center items-center gap-1 flex">
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex"
                            onClick={()=>{
                                setAdult(adult-1)
                                updateMap("adults",adult)
                            } }
                            >
                                <MinusOutlined />

                            </Button>

                            <div className="w-10 text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">{adult}</div>
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex"
                            onClick={()=>
                                {
                                    setAdult(adult+1)
                                    updateMap("adults",adult)
                                }
                            }
                            >
                                <PlusOutlined />
                            </Button>
                        </div>
                    </div>
                    <div className="w-[367px] py-2 justify-center items-center gap-4 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                            <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Children</div>
                            <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">2-11 years old</div>
                        </div>
                        <div className="justify-center items-center gap-1 flex">
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex"
                            onClick={()=>
                                {
                                    setChildren(children-1)
                                    updateMap("children",children)
                                } }
                            >
                                <MinusOutlined />

                            </Button>
                            <div className="w-10 text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">{children}</div>
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex"
                            onClick={()=>{
                                setChildren(children+1)
                                updateMap("children",children)
                            } }
                            >
                                <PlusOutlined />
                            </Button>
                        </div>
                    </div>
                    <div className="w-[367px] py-2 justify-center items-center gap-4 inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                            <div className="text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">Infant</div>
                            <div className="text-center text-neutral-900 text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">Below 2 years old</div>
                        </div>
                        <div className="justify-center items-center gap-1 flex">
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex"
                            onClick={()=>
                                {
                                    setInfant(infant-1)
                                    updateMap("infant",infant)
                                }}
                            >
                                <MinusOutlined />

                            </Button>
                            <div className="w-10 text-center text-neutral-900 text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">{infant}</div>
                            <Button className="p-2 rounded-[100px] border border-gray-300 justify-center items-center gap-2 flex"
                            onClick={()=>{
                                setInfant(infant+1)
                                updateMap("infant",infant  )                            
                            } }
                            >
                                <PlusOutlined />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="my-4 justify-center w-full rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                <p className="self-stretch w-full text-center text-white text-base font-bold font-['Plus Jakarta Sans'] leading-normal p-2">
                    Save
                </p>
            </button>
        </div>
    );
};

export default PassengerField;
