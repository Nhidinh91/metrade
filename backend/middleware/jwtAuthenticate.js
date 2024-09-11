import jwt from "jsonwebtoken";

const jwtAuthenticate = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return res.status(401).json({ success: false, message: "Invalid authorization header" });
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ success: false, message: "Invalid token" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export default jwtAuthenticate;