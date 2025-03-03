import { useEffect } from "react";

const useClickOutsideHook= (ref, callback)=>{
    useEffect(()=> {
        const handleClickOutside= (event)=>{
            
            console.log(event.target, 'clicked element');
            if(ref.current && !ref.current.contains(event.target)){
                console.log('i am clicking outside');
                callback()
            }}
            
            document.addEventListener('mousedown', handleClickOutside)
          
            return ()=> {  return document.removeEventListener('mousedown', handleClickOutside)}
    
        }, [ref, callback])
}


export default useClickOutsideHook;