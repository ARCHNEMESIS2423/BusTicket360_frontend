import SittingArrangement from "./SittingArrangement";
import { useState,useContext,createContext } from "react";
import { AppContext } from "../App";
export const SittingArrangementContx = createContext({})

function RoutesFound({busFound}){
     let [userChoices,setUserChoices] = useState({})
     let [displayForm,setDisplayForm] = useState(false);
     let [busInfo,setBusInfo] = useState([]);
     const {searchedInfo,setShowMe} = useContext(AppContext)

     function callSitArrang(busPlate,price,time){
            if( busPlate && price && time ){
                setDisplayForm(true)
                setBusInfo({
                    "BusPlateNumber":busPlate,
                    "BusFare":price,
                    "BusDepartureTime":time
            })
            } 
     }



    return (
        <>
        <br/>
        <div className="max-w-9/10 min-h-50 bg-[#edeff0] ml-auto mr-auto mt-3 rounded mb-5 border-[#033D23]/10  text-black p-1 pb-5 shadow-lg shadow-[#c2c9cc] border-[#055262]/80">

         <button onClick={()=>setShowMe(false)} className="bg-gray-300 hover:bg-gray-200 text-black w-fit p-2 rounded self-center cursor-pointer mb-10 outline-[#0B778D] outline-2">⬅️ BACK</button>

            <h2 className="rounded-t p-2 flex flex-row justify-between">
                <p className="font-black">
                    {searchedInfo.start_point.toUpperCase()} TO {searchedInfo.going_to.toUpperCase()}
                </p>
                <p className="font-bold">
                    Monday {searchedInfo.day_of_departure} 
                </p>
            </h2>

            <hr className="opacity-[10%]"/><br/>

                   {
                    busFound.map(({bus_number,time,price})=>
                        <>
                        <button
                            className="bg-[#19C3E6] p-3 mt-2 w-[98%] ml-auto mr-auto flex flex-row justify-between items-center rounded font-bold cursor-pointer hover:bg-[#06768d] hover:outline hover:outline-3 hover:outline-offset-2 hover:outline-[#19C3E6] hover:text-white active:bg-[#000D11] active:text-white transition-colors duration-150"
                            onClick={() => callSitArrang(bus_number, price, time)}
                            type="button"
                            >
                            <span>{bus_number}</span>
                            <span>{time}</span>
                            <div className="flex items-center gap-2">
                                <span>{price}</span>
                                <span className="text-lg opacity-80">→</span>
                            </div>
                        </button>
                        <br/>
                        </>
                    )   
                   }  
        </div>

      <SittingArrangementContx.Provider value={{displayForm,busInfo,setDisplayForm,userChoices,setUserChoices}}>
        <SittingArrangement/>
      </SittingArrangementContx.Provider>

        <div id="backCover" className={`${!displayForm?'hidden':'fixed'}  bg-black/50 w-screen h-screen top-0`}>

        </div>

        </>
    )
}
export default RoutesFound;