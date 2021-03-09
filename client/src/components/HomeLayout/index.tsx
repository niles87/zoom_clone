import styled from 'styled-components'
import { Container, Navbar } from "../Layout";

export const FlexContainer = styled(Container)`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const FlexChild = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
`

export const UserInfoContainer = styled(Container)`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const FriendsList = styled(Navbar)`
    background: transparent;
    border-radius: 0;
`