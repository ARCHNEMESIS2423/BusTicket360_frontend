import { useState } from "react";


function BookingInfo({goBack}){

let [isError,setIsError] = useState(false)
let [errorArray,setErrorArray] = useState([])

        function handleTravelerInfo(e){
            
            e.preventDefault()
            const fullName = e.target.traveller_name.value.trim()
            const phoneNumber = e.target.phoneNumber.value.trim()

            const is_filled = fullName  &&  phoneNumber


          is_filled ? setIsError(false):setIsError(true)
          if(!is_filled){
            let currentErrors = []

            if(!fullName && !phoneNumber){
                currentErrors.push(<p className="font-bold">Please fill in the form</p>)
                setErrorArray(currentErrors)
                return
            } 

            !fullName && currentErrors.push(<p className="font-bold">Please fill in your name</p>)

            !phoneNumber && currentErrors.push(<p className="font-bold">Please fill in your phone number</p>)

            setErrorArray(currentErrors)
          }

        }



        return(
            <>
            
            <p className="mb-5" onClick={()=>goBack(false)}>
               <span className="bg-gray-300 p-3 hover:outline-2 outline-cyan-300 rounded font-bold">⬅️ BACK</span> 
            </p>

            <hr className="opacity-30"/>
             <div className="flex flex-col p-5 bg-[#edeff0] w-[99%] rounded ml-auto mr-auto mt-1 mb-10">

                {

                isError?
                <>
                    <div className="bg-red-300 p-3 rounded mb-5">
                        {
                        errorArray.map(e=>e)
                        }          
                    </div>
                    <hr className="mb-5 mt-5 opacity-20"/>
                </>
                :
                 <h3 className="font-semibold self-center">
                    Please fill in your information
                </h3>

                 }
                

                <form className="flex flex-col justify-center mt-5  gap-3" onSubmit={e=>handleTravelerInfo(e)}>

                    <div className="flex flex-col">

                        <label 
                        for="traveller_name" 
                        className="font-semibold mb-1">
                            Fullname
                        </label>

                        <input 
                        name="traveller_name" 
                        type="text" 
                        id="traveller_name" 
                        placeholder=" example John Doe"
                        pattern="[A-Za-z]{3,20} [A-Za-z]{3,20}"
                        className="rounded p-3 w-full bg-white"
                        />

                    </div>

                    <div className="flex flex-col">

                        <label 
                        for="phoneNumber" 
                        className="font-semibold mb-1">
                            Contact number
                        </label>

                        <input 
                        name="phoneNumber" 
                        type="tel" 
                        id="phoneNumber" 
                        pattern="[0-9]{10}"
                        placeholder=" example 06845..... "
                        className="rounded p-3 w-full bg-white"
                        />

                    </div>

                    <button className="bg-[#119ab7] p-3 rounded w-fit self-center mt-3 font-bold text-white hover:bg-[#0b778d] active:bg-[#055262] cursor-pointer select-none">
                        📑 Book Now
                    </button>

                </form>
             </div>

            </>
        )

}

export default BookingInfo;