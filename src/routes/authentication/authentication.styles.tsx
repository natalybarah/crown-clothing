import styled from "styled-components";

export const AuthenticationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 900px;
    margin: 30px auto;

    @media screen and (max-width: 400px){
        width: 80vw;
        flex-direction: column ;
        row-gap: 15px;
        
    }
`