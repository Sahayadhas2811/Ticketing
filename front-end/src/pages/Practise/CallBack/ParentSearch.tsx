import react, { useState } from 'react';

import Search from './Memo';

interface dumyProps {}

const Values = [
    'dhas',
    'james',
    'john',
    'valu',
    'man',
    'boy'
]

function ParentSearch ({}:dumyProps){
    const [val, setVal] = useState(Values);

    const handleChange = (text:string)=>{
        const filterOut = Values.filter((data)=>{
            data.includes(text)
        })
        setVal(filterOut)
    }
    return(
        <div>
            <button>Shaffle</button>
            <Search onChange={handleChange}/>
            <ul style={{listStyleType:'none'}}>
                {val.map((dataV)=>(
                    <li key={dataV}>{dataV}</li>
                ))}
            </ul>
        </div>
    )
};

export default ParentSearch;