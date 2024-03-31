import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const s1={
        "name":"Arpit",
        "class":"5"
    }
    const[state,setState] =useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name": "Larry",
                "class": "10b"
            })
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state,update}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;