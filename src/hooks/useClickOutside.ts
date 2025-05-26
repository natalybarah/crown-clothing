import { RefObject, useEffect} from "react";



const useClickOutsideHook= (ref: RefObject<HTMLElement | null>, callback: ()=> void) => {
   

    useEffect(()=> {
        const handleClickOutside= (event: MouseEvent)=>{
            
            console.log(event.target, 'clicked element');
            if(ref.current && !ref.current.contains(event.target as Node)){
                console.log('i am clicking outside');
                callback()
            }}
            
            document.addEventListener('mousedown', handleClickOutside)
          
            return ()=> {  return document.removeEventListener('mousedown', handleClickOutside)}
    
        }, [ref, callback])
}


export default useClickOutsideHook;