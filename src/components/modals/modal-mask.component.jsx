import Portal from "../portal/portal.component";
import {ModalRoot, ModalMask} from './modal-mask.styles';
import PayHow from './modal-popup-pay'

const Modal= () =>{

    return(
        <Portal>
            <ModalRoot className='modal-root'>
                <ModalMask className='modal-mask'>
                   <PayHow></PayHow> 
                </ModalMask>
            </ModalRoot>
        </Portal>
    )
}

export default Modal;
