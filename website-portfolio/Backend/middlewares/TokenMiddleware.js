import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(403).send({
            success: false,
            message: "Token required"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({
                success: false,
                message: "Invalid token"
            });
        }

        req.user = user;  
        next();
    });
};

export default authenticateToken;
