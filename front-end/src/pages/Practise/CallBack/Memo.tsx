import {memo } from 'react';

interface changeProps {
    onChange : (text:string) => void
}

function search ({onChange}:changeProps){
    console.log('mounter')
    return(
        <div>
            <input 
            type="text" 
            placeholder='Searching'
            onChange={(e)=>onChange(e.target.value)}
            />
        </div>
    )
}

export default memo(search)