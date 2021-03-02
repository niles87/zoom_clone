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
    align-items: center;
`

const NavItem = styled.li`
    padding: 0 20px;
`

const DropDown = styled.div<{ vis: string, dis: string }>`
    padding-top: 3rem;
    visibility: ${props => props.vis};
    position: absolute;
    right: 2%;
    transition: all 0.5s ease;
    display: ${props => props.dis};
`

export const LoginPage = () => {
    const [showLogin, setShowLogin] = useState<boolean>(false)
    return (
        <Fragment>
            <Container>
                <Navbar>
                    <NavItem>
                        <h2>
                            MOOZ
                        </h2>
                    </NavItem>
                    <NavItem>
                        <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? "Hide" : "Login"}</button>
                        {showLogin ? (
                            <DropDown vis={showLogin ? "visible" : "hidden"} dis={showLogin ? "block" : "none"}>
                                <Login />
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