import { useState, useContext } from "react"
import { AppContext } from "../App"
import SearchTicket from "./SearchTicket"
import Select from "react-select"


function SearchBus(){
    const {setSearchInfo,setShowMe} = useContext(AppContext)
    let [alreadyHasTicket,setAlreadyHasTicket] = useState(false)
    const [regions] = useState({
        A1:'Mbeya',
        A2:'Iringa',
        A3:'Njombe',
        A4:'Kigoma'
    })
    
    let [pickupRegion, setPickupRegion] = useState(null)
    let [destRegion, setDestRegion] = useState(null)
    let [alert, setAlert] = useState(false)
    let [alertArray, setAlertArray] = useState([])

    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Build options for FROM — exclude whatever is selected in GOING TO
    const fromOptions = Object.values(regions)
        .filter((region) => region !== destRegion?.value)
        .map((region) => ({ value: region, label: region }))

    // Build options for GOING TO — exclude whatever is selected in FROM
    const toOptions = Object.values(regions)
        .filter((region) => region !== pickupRegion?.value)
        .map((region) => ({ value: region, label: region }))

    const selectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: 'white',
            padding: '2px',
            borderRadius: '0.25rem',
            borderWidth: '0px',
            boxShadow: 'none',
            minWidth: '180px',
        }),
    }

    function handleSearchForm(e){
        e.preventDefault()

        const startVal = pickupRegion?.value || ''
        const goingVal = destRegion?.value || ''
        const dateVal = e.target.day_of_departure.value.trim()

        if(dateVal && goingVal && startVal){
            setAlert(false)
            setSearchInfo({ start_point: startVal, going_to: goingVal, day_of_departure: dateVal })
            setShowMe(true)

            //clear form if inputs are well
            setPickupRegion('')
            setDestRegion('')
            e.target.day_of_departure.value = ""

        } else {
            setAlert(true)
            setShowMe(false)
        }

        const currentErrors = []

        if(!dateVal && !startVal && !goingVal){
            currentErrors.push(<p key="all">please fill in the form</p>)
            setAlertArray(currentErrors); return
        }
        if(!dateVal && !startVal){
            currentErrors.push(<p key="date-start">please select day of departure and starting point</p>)
            setAlertArray(currentErrors); return
        }
        if(!dateVal && !goingVal){
            currentErrors.push(<p key="date-dest">please select day of departure and destination</p>)
            setAlertArray(currentErrors); return
        }
        if(!goingVal && !startVal){
            currentErrors.push(<p key="start-dest">please select starting point and destination point</p>)
            setAlertArray(currentErrors); return
        }
        if(!dateVal){
            currentErrors.push(<p key="date">please select day of departure</p>)
            setAlertArray(currentErrors); return
        }
        if(!startVal){
            currentErrors.push(<p key="start">please select pickup point</p>)
            setAlertArray(currentErrors); return
        }
        if(!goingVal){
            currentErrors.push(<p key="dest">please select destination</p>)
            setAlertArray(currentErrors); return
        }
    }

    return (
        alreadyHasTicket ?
             <SearchTicket goBack={setAlreadyHasTicket}/>
        :
        <div className="p-5 bg-[#EDEFF0] rounded w-[90%] ml-auto mr-auto font-bold mt-4 shadow-lg shadow-[#9BA3A8]">

            {alert &&
            <>
            <div id="alert" className="p-4 bg-red-300 rounded h-fit">
                {alertArray.map(error => error)}
            </div>
            <hr className="mb-5 mt-5 opacity-20"/>
            </>
            }

            <form onSubmit={handleSearchForm} className="flex gap-2 flex-col justify-center">

                <div className="flex flex-col p-1">
                    <label className="text-black">FROM</label>
                    <Select
                        name="start_point"
                        options={fromOptions}
                        value={pickupRegion}
                        placeholder="departure from"
                        isSearchable={true}
                        isClearable={true}
                        onChange={(selected) => setPickupRegion(selected || null)}
                        styles={selectStyles}
                    />
                </div>

                <div className="flex flex-col p-1">
                    <label className="text-black">GOING TO</label>
                    <Select
                        name="going_to"
                        options={toOptions}
                        value={destRegion}
                        placeholder="destination"
                        isSearchable={true}
                        isClearable={true}
                        onChange={(selected) => setDestRegion(selected || null)}
                        styles={selectStyles}
                    />
                </div>

                <div className="flex p-1 flex-col">
                    <label htmlFor="day_of_departure" className="text-black">DATE</label>
                    <input
                        type="date"
                        name="day_of_departure"
                        id="day_of_departure"
                        className="bg-[#8BE5FE] rounded p-2 text-black font-black cursor-pointer hover:offset-1"
                        min={today}
                    />
                </div>
            <p className="underline font-bold text-blue-800 cursor-pointer" onClick={()=>setAlreadyHasTicket(true)}>Already have a ticket</p>
                <button className="bg-[#0B778D] hover:bg-[#055262] active:bg-[#000D11] text-white w-fit p-2 rounded self-center cursor-pointer outline-[#19C3E6] outline-offset-2 hover:outline-3">
                    SEARCH
                </button>
                
            </form>
            
        </div>
    )
}

export default SearchBus