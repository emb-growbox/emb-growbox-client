
import { WiThermometerExterior } from "react-icons/wi";

function Temp(props){
    return (
        <div className="border-solid border-t-2">
            <WiThermometerExterior className={"text-9xl inline-block m-0"}/>
            <h1 className={"font-extralight text-9xl inline-block m-0"}>{props.temp}</h1>
        </div>
    )
}

export default Temp