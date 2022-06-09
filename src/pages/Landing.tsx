import React, { Fragment, useState } from "react";
import { Login } from "../components/Login";
import { Container, NavItem, Navbar, DropDown, Button, Logo } from "../components/Layout";
import { Register } from "../components/Register";
import styled from "styled-components";

const Switch = styled(Button)`
    font-size: 14px;
`

export const LandingPage = () => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false)
    const [showLogin, setShowLogin] = useState<boolean>(true)
    return (
        <Fragment>
            <Container>
                <Navbar>
                    <NavItem>
                        <Logo>
                            MOOZ CL
                        </Logo>
                    </NavItem>
                    <NavItem>
                        <Button onClick={() => setShowDropDown(!showDropDown)}>{showDropDown ? "Hide" : "Signup/Login"}</Button>
                        {showDropDown ? (
                            <DropDown vis={showDropDown ? "visible" : "hidden"} dis={showDropDown ? "block" : "none"}>
                                <div hidden={!showLogin}>
                                    <Login />
                                </div>
                                <div hidden={showLogin}>
                                    <Register />
                                </div>
                                <Switch onClick={() => setShowLogin(!showLogin)} >{showLogin ? "Click For Register" : "Click For Login"}</Switch>
                            </DropDown>
                        ) : null}
                    </NavItem>
                </Navbar>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum assumenda nihil odio omnis, in fugit! Nisi beatae obcaecati voluptatibus molestias cumque dolor enim delectus, odit dolorum quo reprehenderit eligendi, perspiciatis doloribus iusto tempora vero maiores voluptates porro quis libero harum labore. Beatae non hic fuga amet, suscipit illo quod doloremque sapiente perspiciatis incidunt recusandae laborum soluta corrupti ut. Minus vel voluptates pariatur laudantium dolorem consequatur eligendi tempora aliquam est reprehenderit ex porro deserunt ducimus cum possimus culpa debitis nobis quibusdam quod nemo, harum placeat nostrum. Ratione saepe ea laudantium quos? Laudantium nulla ad, doloremque earum modi at voluptatibus sapiente ipsa.
                    </p>
                    <img src="http://lorempixel.com/350/350" alt="placeholder" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum assumenda nihil odio omnis, in fugit! Nisi beatae obcaecati voluptatibus molestias cumque dolor enim delectus, odit dolorum quo reprehenderit eligendi, perspiciatis doloribus iusto tempora vero maiores voluptates porro quis libero harum labore. Beatae non hic fuga amet, suscipit illo quod doloremque sapiente perspiciatis incidunt recusandae laborum soluta corrupti ut. Minus vel voluptates pariatur laudantium dolorem consequatur eligendi tempora aliquam est reprehenderit ex porro deserunt ducimus cum possimus culpa debitis nobis quibusdam quod nemo, harum placeat nostrum. Ratione saepe ea laudantium quos? Laudantium nulla ad, doloremque earum modi at voluptatibus sapiente ipsa.
                    </p>
                </div>
            </Container>
        </Fragment>
    )
}