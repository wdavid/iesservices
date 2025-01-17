const { SignJWT, jwtVerify } = require('jose');
const debug = require('debug')('app:jwt-tools');

// Codifica la clave secreta usando TextEncoder.
const secret = new TextEncoder().encode(process.env.TOKEN_SECRET || 'Super Secret Value');
const expTime = process.env.TOKEN_EXP || '15d';

const tools = {}

tools.createToken = async (id) => {
    return await new SignJWT() 
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(id)
        .setExpirationTime(expTime)
        .setIssuedAt()
        .sign(secret);
}

tools.verifyToken = async (token) => {
    try {
        const { payload } = await jwtVerify(
            token,
            secret,
        );
        return payload;
    } catch (error) {
        return false; // Devuelve false o podrías manejar el error de manera más específica.
    }
}

module.exports = tools;
