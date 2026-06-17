import SpinningLoader from "../assets/SpinningLoader.svg"
import { AppContext } from "../App"
import { useContext, useEffect } from "react"

function FinishPayment(){
 const {setFinishPayment, setShowMe} = useContext(AppContext)
    
    const sleep = (ms)=> new Promise(resolve=>setTimeout(resolve,ms))

    async function processPayment(){
        await sleep(5000)
        return "200"
    }

   useEffect(()=>{
    async function handlePay(){
        const status = await processPayment()
        if( status === "200" ){
            setFinishPayment(false)
            setShowMe(false)
        }
        
    }
        handlePay()
    },[setFinishPayment, setShowMe]) 
    


    return(
    <>
    <div className="p-5 bg-gray-200 rounded shadow-lg shadow-[#338] w-[90%] l-50 ml-auto mr-auto my-10">
        <p className="font-black text-center">Processing Payment ......</p>
        <img src={SpinningLoader} alt="loading ...." className="w-20 block ml-auto mr-auto"/>
    </div>
    </>
    )
    
}
export default FinishPayment