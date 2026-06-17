import { useContext, useState } from "react"
import Spinner from "../assets/DualRingSpinner.svg"
import {SittingArrangementContx} from "./RoutesFound.jsx"
import { AppContext } from "../App.jsx"
//import { Navigate, replace } from "react-router-dom"

function Payment({AmountDue}){
let [isLoading,setisLoading] = useState(false)
let {setDisplayForm} = useContext(SittingArrangementContx)
let {setFinishPayment,setShowMe} = useContext(AppContext)
let [error,setError] = useState({});

 const sleep = (ms)=> new Promise((resolve)=>setTimeout(resolve, ms))

        async function handlePayment(e){

            e.preventDefault()
            if(e.target.PayNumber.value.trim()){
                setisLoading(true)
                await sleep(5000)
                setDisplayForm(false)
                setFinishPayment(true)
                setShowMe(false)
            Navigate('/')
            }else{
                setError({
                    'isError':true,
                    'errorMessage':"Please input your mobile number to be used for payment"
                })
            }

        }


      return(
        <>
            <div className="bg-red-700 text-black md:w-[90%] ml-auto mr-auto p-5 rounded items-center my-3">

                   <p className="self-start font-black">Complete your payment</p> 
                   <p>Enter your mobile number. You will receive a prompt on your phone to authorise the transaction.</p>

                   <form className="mt-8" onSubmit={(e)=>handlePayment(e)}>

                    <div className="flex flex-col ml-auto mr-auto w-[90%]">

                        <label className="font-black">
                            MOBILE NUMBER
                        </label>

                        <input 
                        type="tel"
                        name="PayNumber" 
                        className="bg-white p-3 rounded w-full "  
                        title="enter a valid 10 digit number starting with zero" 
                        placeholder="eg. 07XXXXXXXXX"
                        pattern="[0-9]{10}"
                        required
                        />
                        {error.isError&&
                            <p>
                                {error.errorMessage}
                            </p>
                        }
                    </div>
                    

                    <p className="flex flex-row justify-between w-[80%] ml-auto mr-auto p-3 rounded bg-gray-800 my-5 font-black text-white">
                        <span className="select-none">
                            AMOUNT DUE
                        </span>

                        <span>
                            TZS {AmountDue}
                        </span>
                    </p>

                    <button className="p-3 rounded bg-black/80 font-black text-white w-fit ml-auto mr-auto block hover:bg-black active:text-red-900 outline-1 outline-slate-200 hover:outline-yellow-300 focus:outline-yellow-500 cursor-pointer select-none"
                    disabled={isLoading}
                    >
                        🛡️ Authorise Payment
                        {isLoading&&<img src={Spinner} alt="Loading ..."/>}
                    </button>

                   </form>
                   <small className="ml-auto mr-auto block w-fit mt-3 select-none text-gray-900/50"> Secured by M-Pesa · 256-bit encryption</small>
            </div>
        </>
      )
}

export default Payment