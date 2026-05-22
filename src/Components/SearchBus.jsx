import { useState } from "react"

function SearchBus({setSearchedBusInfo,displayRoutesFound}){
    
    const [regions,setRegions] = useState({
        A1:'Mbeya',
        A2:'Iringa',
        A3:'Njombe',
        A4:'Kigoma'
    })

    let [pickupRegion,setpickupRegion] = useState()
    let [destRegion,setdestRegion] = useState()
    let [alert,setAlert]= useState(false)
    let [alertArray,setAlertArray] = useState([])

    
    //Cant book before Today
  const now = new Date();
  const today = now.toISOString().split('T')[0];

    function handleSearchForm(e){   
      e.preventDefault()        
      const data = new FormData(e.target)  

       if(e.target.day_of_departure.value.trim() && e.target.going_to.value.trim() && e.target.start_point.value.trim()){
          setAlert(false)  
          setSearchedBusInfo(Object.fromEntries(data.entries()))  
          displayRoutesFound(true)
       }else{ 
          setAlert(true) 
          displayRoutesFound(false)
       }

      const currentErrors = []
      e.target.day_of_departure.value.trim() == "" && currentErrors.push(<p>please select day of departure</p>)

      e.target.start_point.value.trim() == "" && currentErrors.push(<p>please select pickup point</p>)

      e.target.going_to.value.trim() == "" && currentErrors.push(<p>please select destination</p>)

      setAlertArray(currentErrors)


       

      console.log(alertArray)

    }




   return (
    <div className="p-5 bg-[#EDEFF0] rounded w-[90%] ml-auto mr-auto font-bold mt-4 md:w-fit shadow-lg shadow-[#9BA3A8]">

      { alert &&
      <>
      <div id="alert" className="p-4 bg-red-300 rounded h-fit">
          {
           alertArray.map(error=>error)
          }
          
        </div>
        <hr className="mb-5 mt-5 opacity-20"/>
        </>
      }
      <form onSubmit={(e)=>handleSearchForm(e)} className="flex gap-2 flex-col md:flex-row justify-center">

        <div className="flex flex-col p-1">
            <label className="text-black">FROM</label>
    
                <input 
                list="travel_point_start" 
                name="start_point" 
                value={pickupRegion} 
                placeholder="departure from" 
                className="bg-white p-2 rounded" 
                onChange={(e)=>setpickupRegion(e.target.value)}/>

                <datalist id="travel_point_start">
                    {
                      Object.values(regions).map((region)=>
                      destRegion!=region&&<option className="border-b-1 bg-white p-1" key={region}>{region}</option>
                    )   
                    }
                </datalist>
         
        </div>

        <div className="flex flex-col p-1">
          
            <label className="text-black">TO</label>

               <input 
               list="travel_point_dest"
               name="going_to"
               value={destRegion} 
               placeholder="destination_to" 
               className="bg-white p-2 rounded" 
               onChange={(e)=>(e.target.value)}
               />

                <datalist id="travel_point_dest">
                   {
                    Object.values(regions).map((region)=>
                      pickupRegion!=region&&<option className="border-b-1 bg-white p-1" key={region+1}>{region}</option>
                    )   
                    }
                </datalist>
        </div>

        <div className="flex p-1 flex-col ">

            <label for="day_of_departure" className="text-black">
              DATE
            </label>
          
            <input
             type="date"
             name="day_of_departure" 
             id="day_of_departure" 
             className="bg-[#8BE5FE] rounded p-2 text-black font-black"
             placeholder="mm/dd"
             min={today}
             />

        </div>

        <button className="bg-[#0B778D] hover:bg-[#055262] active:bg-[#000D11] text-white w-fit p-2 rounded self-center cursor-pointer">
            SEARCH
        </button> 

      </form>

    </div>
   )

}
export default SearchBus