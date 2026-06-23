import { useContext, useEffect, useState } from "react";
import BookingInfo from "./BookingInfo"
import { SittingArrangementContx } from "./RoutesFound.jsx"

function SittingArrangement(){

 let [seatChosen,setSeatChosen] = useState()
 let {userChoices,setUserChoices} = useContext(SittingArrangementContx)
 let [userIdForm,setUserIdForm] = useState(false)
 let [userCannotProceed,setUserCannotProceed] = useState(true)

 const {displayForm,busInfo,setDisplayForm} = useContext(SittingArrangementContx)

 const seatsTaken = ['A1','A7','A19','A10']
 const sitOrder = {
      'plate_no':'T097',
       'rows':5,
       'cols':4
    }
    const total_seats = sitOrder.rows * sitOrder.cols

      useEffect(()=>{
         if(!displayForm){
            setSeatChosen('')
            setUserChoices({})
            setUserIdForm(false)
            setUserCannotProceed(true)
         } 
      },[displayForm,busInfo.BusPlateNumber])

   const columnArrang = ()=> {
      let string = '';
      for(let index=0;index<sitOrder.cols;index++){
        if(index%2>0 && !((index+1) == sitOrder.cols)){
         string+='2fr '
         continue
        }
         string+= ((index+1) == sitOrder.cols)?'1.5fr':'0.5fr '
      }
      
      return string
   }

   
      //taken || unbooked || chosen by you
   function checkIfSeatTaken(seatNo){
         //is seat taken
         const isTaken = seatsTaken.includes(seatNo)
         if(isTaken){
         return 'bg-gray-500 text-white cursor-not-allowed' }
         
         //Seat is not taken neither chosen ->unbooked ->is available?
         if(!isTaken && !(seatNo === seatChosen) ){
         return 'bg-[#19c3e6] hover:bg-[#119ab7] active:bg-[#0b778d] cursor-pointer '
         }

         //is seat chosen
         return seatNo === seatChosen && "bg-green-500 text-white outline-1"

      }

   function handleUserChosenSeat(seatId){
      const isTaken = seatsTaken.includes(seatId)
      !isTaken && setSeatChosen(seatId)
      !isTaken && setUserCannotProceed(false)  
   }

   function handleNextStep(){
      /*get user chosen seat
        get user chosen bus
        next step is getting user names and number
        if cancelled clear all state objects
        if continue make http request to send all that data
        finally access payment page and ask phone number to complete payment
        then return ticket
      */


        setUserChoices({'bus_plateNumber':busInfo.BusPlateNumber,'chosenSeat':seatChosen,'fare':busInfo.BusPlateNumber})
        setUserIdForm(true)

   }


   
    return (

            <div className={`${!displayForm&&'hidden'} shadow-lg shadow-[c2c9cc] rounded w-[98%] h-[90%] p-3 mb-20  top-[50%] bg-[#edeff0] fixed left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 flex flex-col overflow-y-auto`}>

               <div className="relative">

                  <p className="text-right mb-2" onClick={()=>{setDisplayForm(false)}}>

                     <span className="sticky right-2 bg-[#19c3e6] p-2 rounded hover:bg-[#8be5fe] active:bg-[#0b778d] select-none cursor-pointer">
                        ❌
                     </span>
                     
                  </p>
               </div>
            {
               !userIdForm ?
               //getUser seat of choice
               <>
               <div className="flex flex-row justify-between mt-10">
                     
                     <p>Choose Seat <br/>total Seats: {total_seats}</p>
                     {<p><b className="font-black">Bus Plate Number</b><br/>{busInfo.BusPlateNumber}</p>}
                  </div>
                  <hr className="opacity-20"/><br/>

                  <div className="flex gap-4 text-xs mb-4 ml-auto mr-auto">
                     <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-green-400 inline-block"/>Selected</span>
                     <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-[#19c3e6] inline-block"/>Available</span>
                     <span className="flex items-center gap-1"><span className="w-4 h-4 rounded bg-gray-400 inline-block"/>Taken</span>
                  </div>
                  

               <div className={`grid ml-auto mr-auto`} style={{gridTemplateColumns:columnArrang()}}>
                  {
               
                     ( ()=>{
                        const rows=[];
                        for(let index=0;index<total_seats;index++){
                           const seatNumber = 'A'+(index+1)

                           const seatClassState = checkIfSeatTaken(seatNumber);

                           rows.push(  
                           <button className={`${seatClassState}   p-1 rounded-lg w-10 font-black m-1 select-none  outline-offset-1 outline-green-400`} 
                              key={index} 
                              onClick={e=>handleUserChosenSeat(seatNumber)}
                              >

                                 {seatNumber}
                           </button>)
                        }
                        return rows;
                     }
                     )()
                  } 
               
               </div>

               <div className="flex flex-col gap-5 mt-5">
                  <hr className="opacity-20"/>

                  <button className={`${userCannotProceed?'bg-gray-500 cursor-not-allowed':'bg-[#119ab7] active:bg-[#055262] hover:bg-[#0b778d] cursor-pointer'}   p-2 w-fit rounded self-center mt-20 font-black text-white`} 
                  onClick={()=>handleNextStep()}
                  disabled={userCannotProceed}
                  title={userCannotProceed ? 'Please select a seat to continue' : ''}   
                  >
                     NEXT
                  </button>
               </div>
               </>
                          :///get customer name
               <BookingInfo
               goBack={setUserIdForm}
               />
            }
           </div>  

    );
}
export default SittingArrangement;