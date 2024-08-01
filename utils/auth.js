import jwt from "jsonwebtoken"

const secretKey = "hello@khushi#g"


function createTokenForUser(user) {
    const payload = {
        _id : user._id,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role : user.role
    }

    const token = jwt.sign(payload, secretKey)
    return token
}


function validateToken(token) {
    const payload = jwt.verify(token, secretKey)
    return payload
}

export {
    createTokenForUser,
    validateToken
}