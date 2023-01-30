import sole_raggi from "../img/sole_reggi.png";
import sole_centro from "../img/sole_centro.png";

export default function Sun(props) {
    return (
        <div id="circle" className="wrapper w-[100%] absolute" >
            <div id="sole" className="absolute w-[30%] cursor-pointer">
                <img className="absolute" style={props.style_} onClick={props.onClick_} src={sole_centro} alt="sun face" />
                <img id="ring" className="absolute" style={props.style_} onClick={props.onClick_} src={sole_raggi} alt="sun" />
            </div>
        </div>
    )
}