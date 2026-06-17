import RoutesFound from "./Components/RoutesFound"
import SearchBus from "./Components/SearchBus"
import Header from "./Components/Header"
import Payment from "./Components/Payment"
import FinishPayment from "./Components/FinishPayment"
import { useState,useContext,createContext } from "react"
export const AppContext = createContext()


/*
    Time to use context 
    Variables needed to be propped way down
    - Start to Destinatiom
    - Date
    - BusInfo = {
      platenumber,
      Departuretime,
      Fare
      }
     -Travellers name and 
     -Travellers conatct number2 

*/

function App() {
  let [searchedInfo,setSearchInfo] = useState({})
  let [showMe,setShowMe] = useState(false)
  let [showFinishPayment,setFinishPayment] = useState(false)
  const fakeData = [
        {'bus_number':'TO076PTAI',
           'time':'09:00 AM',
           'price':'19000'
        },
        {'bus_number':'T14148JWZ',
           'time':'06:00 PM',
           'price':'14000'
        }
      ]

  return (
    <>
      <Header/>
      <AppContext.Provider value={{setSearchInfo,searchedInfo,setShowMe,showFinishPayment,setFinishPayment}}>

          {showMe && <RoutesFound busFound={fakeData}/>}
          {(showFinishPayment && !showMe) ? <FinishPayment/>:<SearchBus/>}

      </AppContext.Provider>  
    </>
  )
}


export default App
