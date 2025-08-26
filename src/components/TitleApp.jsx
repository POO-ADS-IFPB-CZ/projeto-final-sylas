import React from "react";
import { useState } from "react";
import { useDisplay } from "../services/DisplayProvider";

function TitleApp({ title: appTitle, Id: id, optClose: opt }) {
    const [title, setTitle] = useState(appTitle);
    const [Id, setId] = useState(id)
    const { handleAppToggle, handleAppMinimize, handleAppMaximize } = useDisplay()
    
    
    return (
        <div className="title-app">
        <h2>{title}</h2>
        <ul>
            <li><button className="btn-maximize"
                    onClick={()=>{handleAppMaximize(Id)}}
                >
                </button>
            </li>
            <li>
                <button className="btn-minimize"
                    onClick={ () => {handleAppMinimize(Id)}}
                >
                </button>
            </li>

            <li>
                <button className="btn-close" 
                    onClick={ () => {handleAppToggle(Id);  if(opt) opt()}}
                >
                </button>
            </li>
        </ul>
        </div>
    );
}

export default TitleApp;