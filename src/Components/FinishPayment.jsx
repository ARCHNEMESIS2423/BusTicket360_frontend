import SpinningLoader from "../assets/SpinningLoader.svg"

function FinishPayment(){

    return(
    <>
    <div className="p-5 bg-green-600 w-[90%] l-50 ml-auto mr-auto my-10">
        <img src={SpinningLoader} alt="loading ...." className="w-20 block ml-auto mr-auto"/>
    </div>
    </>
    )
    
}
export default FinishPayment