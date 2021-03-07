import styled from 'styled-components'
import { Container } from "../Layout";

export const FlexContainer = styled(Container)`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const FlexChild = styled.div`
    display: flex;
    flex-direction: column;
`

export const UserInfoContainer = styled(Container)`
    display: flex;
    flex-direction: column;
`