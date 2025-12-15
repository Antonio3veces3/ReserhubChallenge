import { Navigate } from "react-router-dom"
import { getJwt } from "../auth/jwt"

type Props = { children: React.ReactNode }

export const ProtectedRoute = ({ children }: Props) => {
    const jwt = getJwt().trim()

    return jwt ? <>{children}</> : <Navigate to={"/"} replace />

}