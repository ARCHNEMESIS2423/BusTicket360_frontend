import RoutesFound from "./Components/RoutesFound"
import SearchBus from "./Components/SearchBus"
import Header from "./Components/Header"
import SittingArrangement from "./Components/SittingArrangement"
import { useState } from "react"


function App() {
  let [searchInfo,setSearchInfo] = useState()
  let [showMe,setShowMe] = useState(false)

  return (
    <>
      <Header/>
      <SearchBus setSearchedBusInfo={setSearchInfo} displayRoutesFound={setShowMe} />

     { 
     showMe && 

      <RoutesFound 
      busFound={[
        {'bus_number':'TO076PTAI',
           'time':'09:00 AM',
           'price':'19000'
        },
        {'bus_number':'T14148JWZ',
           'time':'06:00 PM',
           'price':'14000'
        }
      ]} 
      searchedInfo={searchInfo}  
      />
    }
    </>
  )
}

export default App
