function SearchTicket({goBack}){
   return <div className="p-5 bg-[#EDEFF0] rounded w-[90%] ml-auto mr-auto font-bold mt-4 shadow-lg shadow-[#9BA3A8]">
            <button onClick={()=>goBack(false)} className="bg-gray-300 hover:bg-gray-200 text-black w-fit p-2 rounded self-center cursor-pointer mb-10 outline-[#0B778D] outline-2">⬅️ BACK</button>
            <form className="flex flex-col ">
                <label for="ticket">TICKET NUMBER</label>
                <input name="ticket_number" placeholder="eg. TXYZ64748UII" id="ticket" className="p-3 bg-white rounded"/>
                <button className="bg-[#0B778D] hover:bg-[#055262] active:bg-[#000D11] text-white w-fit p-2 rounded self-center cursor-pointer mt-5">SEARCH TICKET</button>
            </form>
        </div>
}
export default SearchTicket;