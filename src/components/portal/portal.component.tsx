import { FC } from 'react';
import ReactDOM from 'react-dom';

type PortalProps={
    children?: React.ReactNode
}
const Portal: FC<PortalProps>= ({children})=>{
    const modalRoot= document.getElementById('modal-root') as HTMLElement;
    return ReactDOM.createPortal(children, modalRoot)
}

export default Portal;