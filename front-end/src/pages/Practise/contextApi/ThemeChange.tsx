import React, { ReactNode, useContext }  from "react";
import { useState, createContext } from "react";

type themeProvider = {
  theme:string,
  toggleTheme: ()=>void;
};

const themeContext = createContext<themeProvider | undefined> (undefined);

type ThemeProviderProps = {
  children : ReactNode;
};

export const ThemeChange: React.FC<ThemeProviderProps> = ({children})=>{
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = ()=>{
    setTheme((prevTheme)=>(prevTheme === 'light' ? 'dark': 'light'))
  }
  return(
    <themeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </themeContext.Provider>
  )
};

//custom

export const useTheme = ():themeProvider => {
  const content = useContext(themeContext);
  if(!content){
    throw new Error ('Data is not found')
  }
  return content
}