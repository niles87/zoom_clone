import React, { Fragment, useState } from "react";
import { Login } from "../components/Login";
import styled from 'styled-components'

const Container = styled.div`
    width: 90%;
    margin: 0 auto;
`

const Navbar = styled.ul`
    background: lightgrey;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const NavItem = styled.li`
    padding: 5px;
`


export const LoginPage = () => {
    const [showLogin, setShowLogin] = useState<boolean>(false)
    return (
        <Fragment>
            <Container>
                <Navbar>
                    <NavItem>
                        <h1>
                            MOOZ
                        </h1>
                    </NavItem>
                    {showLogin ? (
                        <NavItem>
                            <Login />
                        </NavItem>
                    ) : ""}
                    <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? "Hide" : "Login"}</button>
                </Navbar>

            </Container>
        </Fragment>
    )
}