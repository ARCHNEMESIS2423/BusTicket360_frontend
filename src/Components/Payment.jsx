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
<div className="bg-gray-900 text-white md:w-[90%] ml-auto mr-auto p-5 rounded items-center my-3">

        <p className="self-start font-black text-lg">Complete your payment</p>
        <p className="text-gray-400 text-sm mt-1">
            Enter your mobile number. You will receive a prompt on your phone to authorise the transaction.
        </p>

        <form className="mt-8 flex flex-col" onSubmit={(e) => handlePayment(e)}>

            <div className="flex flex-row justify-between items-center w-[90%] ml-auto mr-auto p-4 rounded-lg bg-gray-800 border border-gray-700 mb-6">
                <span className="text-gray-400 text-sm uppercase tracking-wide select-none">Amount Due</span>
                <span className="text-2xl font-black text-white">TZS {AmountDue}</span>
            </div>

            <div className="flex flex-col ml-auto mr-auto w-[90%]">
            
                <label htmlFor="PayNumber" className="font-black text-sm text-gray-300 mb-1">
                    MOBILE NUMBER
                </label>

                <input
                    id="PayNumber"
                    type="tel"
                    name="PayNumber"
                    className="bg-white text-black p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                    title="Enter a valid 10-digit number starting with zero"
                    placeholder="e.g. 07XXXXXXXXX"
                    pattern="[0-9]{10}"
                    inputMode="numeric"    
                    autoComplete="tel"  
                    required
                />

                
                {error.isError && (
                    <p role="alert" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <span aria-hidden="true">⚠️</span> {error.errorMessage}
                    </p>
                )}

            </div>

            <button
            className="
                inline-flex self-center items-center gap-2
                p-3 rounded bg-black/80 font-black text-white
                w-fit ml-auto mr-auto mt-6 block
                hover:bg-black active:text-yellow-400
                outline-1 outline-slate-200 hover:outline-yellow-300 focus:outline-yellow-500
                cursor-pointer select-none
                disabled:opacity-50 disabled:cursor-not-allowed  
            "
            disabled={isLoading}
            type="submit"
            >
            🛡️ Authorise Payment
            {/* ✅ fixed size prevents layout shift */}
            {isLoading && <img src={Spinner} alt="Processing..." className="w-5 h-5 inline-block" />}
            </button>

        </form>

        <small className="ml-auto mr-auto block w-fit mt-4 select-none text-gray-500">
            Secured by M-Pesa · 256-bit encryption
        </small>
</div>
</>      )
}

export default Payment