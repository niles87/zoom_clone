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