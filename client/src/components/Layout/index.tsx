import styled from 'styled-components'

export const Container = styled.div`
    width: 90%;
    margin: 0 auto;
`
export const Navbar = styled.ul`
    background: lightgrey;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`

export const NavItem = styled.li`
    padding: 0 20px;
`

export const DropDown = styled.div<{ vis: string, dis: string }>`
    padding-top: 10px;
    visibility: ${props => props.vis};
    position: absolute;
    right: 2%;
    transition: all 0.5s ease;
    display: ${props => props.dis};
`

export const Button = styled.span`
    padding: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #000;
    cursor: pointer;
`

export const Logo = styled.h2`
    font-family: Noto Sans KR, sans-serif;
    margin: 5px;
`