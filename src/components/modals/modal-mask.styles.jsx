import styled from "styled-components";


export const ModalRoot= styled.div`
position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
`
export const ModalMask= styled.div`
  position: fixed;
  --modalMaskOpacity: 0.38;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, var(--modalMaskOpacity));
  pointer-events: auto;
  transition: background-color 0.3s ease;
`