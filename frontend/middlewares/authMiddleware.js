const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).send({
                message: "No token provided",
                success: false,
            });
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            return res.status(401).send({
                message: "Invalid token format",
                success: false,
            });
        }

        const scheme = parts[0];
        const token = parts[1];

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({
                message: "Invalid token scheme",
                success: false,
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    message: 'Auth failed',
                    success: false
                });
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Auth failed",
            success: false,
        });
    }
};