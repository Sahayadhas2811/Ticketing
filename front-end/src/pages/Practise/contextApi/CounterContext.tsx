import React, { ReactNode, useContext } from "react";
import { useState, createContext } from "react";

type countProvider = {
    count:number,
    increment:()=>void;
    decrement:()=>void;
    reset:()=>void;
}

const countContext = createContext<countProvider | undefined>(undefined);

type CounterProviderProps ={
    children:ReactNode
};

export const CounterContext: React.FC<CounterProviderProps> = ({children})=>{
    const [count, setCount] = useState<number>(0);

    const increment = ()=>{
        setCount((mouCount)=>(mouCount + 1));
    }

    const decrement = ()=>{
        setCount((mouCount)=>(mouCount - 1))
    };

    const reset = ()=>{
        setCount(0)
    }
    return(
        <countContext.Provider value={{count, increment, decrement, reset}}>
            {children}
        </countContext.Provider>
    )
};

//coustom

export const useCount = ():countProvider =>{
    const content = useContext(countContext);
    if(!content){
        throw new Error('No data found')
    }

    return content
};

