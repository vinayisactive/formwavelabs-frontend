"use client"
import { signOut } from "next-auth/react"

const LogoutButton = () => {

    const logoutHandler = () => {
        signOut({
            callbackUrl: "/"
        })

        setTimeout(() => {
            window.location.reload()
          }, 100);
    }

    return (
        <button
            onClick={logoutHandler}
            className="border px-3 py-1 flex justify-center items-center"
        >
            Logout
        </button>
    )
}

export default LogoutButton