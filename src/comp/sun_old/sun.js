import sole_raggi from "./img/sole_reggi.png";
import sole_centro from "./img/sole_centro.png";
import { useState, useEffect } from "react";
import "./sun.css";

export default function Sun(props) {

    const time = 50;

    const [position, setPosition] = useState(-35);

    useEffect(() => {
        setTimeout(() => {
            if(position === 115){
                setPosition(-35);
            }else
                setPosition(position + 1);
        }, time);
        document.getElementById("circle").style.transform = "rotate(" + position + "deg)";
        document.getElementById("sole").style.transform = "rotate(" + -position + "deg)";
    }, [position]);


    return (
            <div id="circle" className="wrapper w-[100%] absolute" >
                <div id="sole" className="absolute w-[30%] cursor-pointer">
                    <img className="absolute" style={props.style_} onClick={props.onClick_} src={sole_centro} alt="sun face" />
                    <img id="ring" className="absolute" style={props.style_} onClick={props.onClick_} src={sole_raggi} alt="sun" />
                </div>
            </div>
    )
}