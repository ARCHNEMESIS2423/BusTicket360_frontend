import { useContext, useState } from "react";
import { AppContext } from "../App";
import { SittingArrangementContx } from "./RoutesFound.jsx"
import Payment from "../Components/Payment"

function BookNow({getBack,User}){

    const {searchedInfo} = useContext(AppContext)
    const {busInfo,userChoices} = useContext(SittingArrangementContx)
    let [readPayment,setReadPayment] = useState(false)

  return (
    readPayment ? <Payment AmountDue={busInfo.BusFare} /> :
  <>
    
    <p className="mb-5" onClick={()=>getBack(false)}>
        <span className="bg-gray-300 p-3 hover:outline-2 outline-cyan-300 rounded font-bold ">⬅️ BACK</span> 
    </p>

    <hr className="opacity-30"/>

    <div className="flex flex-col justify-center py-6 ml-auto mt-5 mr-auto">
            <div className="w-[320px] overflow-hidden rounded-xl border border-neutral-200 bg-white font-mono shadow-sm">
                
                
                <div className="bg-[#0B778D] px-6 py-5 text-center">
                    <p className="m-0 text-[15px] font-medium tracking-widest text-white">BusTicket360 TZ</p>
                    <p className="mt-0.5 text-[11px] text-white/70">PASSENGER RECEIPT</p>
                </div>

                
                <div className="border-b border-dashed border-gray-300 px-6 py-4">
                    <div className="flex justify-between items-start">

                        <div>
                            <p className="mb-0.5 text-[11px] text-gray-500">FROM</p>
                            <p className="m-0 text-base font-medium">{searchedInfo.start_point.toUpperCase()}</p>
                        </div>

                        <span className="mt-4 text-xl text-[#0B778D]">→</span>

                        <div className="text-right">
                            <p className="mb-0.5 text-[11px] text-gray-500">TO</p>
                            <p className="m-0 text-base font-medium">{searchedInfo.going_to.toUpperCase()}</p>
                        </div>

                    </div>
                </div>

                
                <div className="border-b border-dashed border-gray-300 px-6 py-4">
                    <table className="w-full border-collapse text-xs">
                        <tbody>
                        <tr>
                            <td className="py-1 text-gray-500">Passenger</td>
                            <td className="py-1 text-right font-medium">{User.name}</td>
                        </tr>
                        <tr>
                            <td className="py-1 text-gray-500">Phone</td>
                            <td className="py-1 text-right font-medium">{User.PhoneNo}</td>
                        </tr>
                        <tr>
                            <td className="py-1 text-gray-500">Departure</td>
                            <td className="py-1 text-right font-medium">{busInfo.BusDepartureTime}</td>
                        </tr>
                        <tr>
                            <td className="py-1 text-gray-500">Pickup point</td>
                            <td className="py-1 text-right font-medium">Ubungo terminal</td>
                        </tr>
                        <tr>
                            <td className="py-1 text-gray-500">Seat Number</td>
                            <td className="py-1 text-right font-medium">{userChoices.chosenSeat}</td>
                        </tr>
                        <tr>
                            <td className="py-1 text-gray-500">Plate Number</td>
                            <td className="py-1 text-right font-medium">{busInfo.BusPlateNumber}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                
                <div className="flex justify-between items-center border-b border-dashed border-gray-300 px-6 py-4">
                    <p className="m-0 text-xs text-gray-500">Total fare</p>
                    <p className="m-0 text-xl font-medium text-[#0B778D]">TZS {busInfo.BusFare}</p>
                </div>

                
                <div className="px-6 py-4 text-center">
                    <p className="mt-1 text-[10px] tracking-wider text-gray-500">Present this receipt at boarding</p>
                </div>

            </div>

            <button className="bg-[#119ab7] p-3 rounded w-fit self-center mt-3 font-bold text-white hover:bg-[#0b778d] active:bg-[#055262] cursor-pointer select-none" onClick={()=>setReadPayment(true)}>
                Get Receipt 🧾
            </button>
    </div>
    </>   
       
  )
}

export default BookNow