import React from "react"
import { Api } from "../../API"
import AuthService from "../../utils/auth"

interface Props {
    userId: string
}

export const Logout = (props: Props) => {
    const handleLogout = async (id: string) => {
        try {
            const status = await Api.logout(id)
            if (status.ok) {
                AuthService.logout()
                window.location.assign("/")
            }
        } catch (error) {
            throw error
        }
    }
    return (
        <>
            <button className="logout" onClick={() => handleLogout(props.userId)}>Logout</button>
        </>
    )
}