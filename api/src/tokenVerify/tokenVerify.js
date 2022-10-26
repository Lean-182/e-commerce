const jwt = require('jsonwebtoken');

const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, process.env.JWT_secret_key, (err, decoded) => {
        if(err) {
            console.log('Error al obtener data del token');
        } else {
            data = decoded;
        }
    });
//console.log("DATAAAA", data)
    return data;
}

module.exports = {
    getTokenData
}