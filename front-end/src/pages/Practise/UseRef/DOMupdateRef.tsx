import { Box } from "@mui/material";
import React, { useRef } from "react";

const DOMupdateRef:React.FC = ()=>{
    const butRef = useRef<HTMLDivElement>(null);

    const handleChagne = ()=>{
        if(butRef.current){
            const currentValue = butRef.current.style.backgroundColor;
            butRef.current.style.backgroundColor = currentValue === 'lightblue'? 'white':'lightblue'
        }
    }

    return(
        <div>
            <div ref={butRef} 
            style={{
            border:'2px',
            
            }}>
            Click me to change the color
        </div>
        <button onClick={handleChagne }>Click Me</button>
        </div>
    )
}

export default DOMupdateRef