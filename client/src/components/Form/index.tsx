import styled from 'styled-components'


export const Input = styled.input`
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    background: rgba(245, 240, 190, .8);
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom-width: 2px;
    border-color: #333;
    color: #222;
`

export const Form = styled.form`
    background-color: rgba(255,255,255,0.9);
    padding: 5px;
    border-radius: 5px;
    border: 2px solid #444;
`

export const Submit = styled.button`
    margin: 3px;
    padding: 5px;
    background: rgba(23, 141, 246, 1);
    color: rgba(244,244,244,1);
    border-radius: 5px;
    border: none;
    cursor: pointer;
`

export const Validation = styled.span`
    font-size: 10px;
    color: rgba(246,23,23,1);
`