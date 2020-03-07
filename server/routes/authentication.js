const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (request, response, next) => {
        let token = request.headers['authorization'].slice(7, token.length); 
        jwt.verify(token, process.env.SECRET, function(error, decoded) {
            if (error) {
                console.error(`Failed token: ${token}`);
                response.json({"unauthorized": true}); 
            } else {
                request.emailAddress = decoded.emailAddress; 
                next();
            }
        })
    }, 

    createToken: emailAddress => {
        let token = jwt.sign({emailAddress: emailAddress}, process.env.SECRET, {expiresIn: 86400});
        return token;
    }
}