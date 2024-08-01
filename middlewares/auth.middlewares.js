import { validateToken } from "../utils/auth.js"

function checkForAuthenticationCookie(cookieName) {

    return (req, res, next) => {

        const tokenCookieValue = req.cookies[cookieName]

        if (!tokenCookieValue) {
            return next()
        }

        try {
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload
        } catch (error) {}

        return next()
    }
}

export default checkForAuthenticationCookie