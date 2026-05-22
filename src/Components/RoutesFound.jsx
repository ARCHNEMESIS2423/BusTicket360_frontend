import SittingArrangement from "./SittingArrangement";
import { useState } from "react";

function RoutesFound({searchedInfo,busFound}){

    let [displayForm,setDisplayForm] = useState(false);
    let [busNumber,setBusNumber] = useState("");

     function callSitArrang(busPlate,price,time){
       setDisplayForm(true)
       setBusNumber(busPlate)
     }

    return (
        <>
        <br/>
        <div className="max-w-9/10 min-h-50 bg-[#edeff0] ml-auto mr-auto mt-3 rounded mb-5 border-[#033D23]/10  text-black p-1 pb-5 shadow-lg shadow-[#c2c9cc] border-[#055262]/80">

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
                    <p className="bg-[#19C3E6] p-3 mt-2 w-[98%] ml-auto mr-auto flex flex-row justify-between rounded font-bold" onClick={()=>callSitArrang(bus_number)}>
                        <span>{bus_number}</span>
                        <span>{time}</span>
                        <span>{price}</span>
                </p>
                )
                
            }
       

        </div>

        <SittingArrangement 
        show={displayForm}
        BusNo={busNumber}
        toggle={setDisplayForm}
        />

        <div id="backCover" className={`${!displayForm?'hidden':'fixed'}  bg-black/50 w-screen h-screen top-0`}>

        </div>

        </>
    )
}
export default RoutesFound;