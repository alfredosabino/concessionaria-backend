const { verifyJwt, getTokenFromHeaders } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
    const { url: path } = req;

    const excludedPaths = ['/auth/login', '/auth/cadastro', '/auth/refresh'];
    const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));
    if (isExcluded) return next();

    const token = getTokenFromHeaders(req.headers);
    if (!token) {
        return res.jsonUnauthorized(null, 'Token inválido');
    };

    try {
        const decoded = verifyJwt(token);
        req.contaId = decoded.id;
        next();
    } catch (error) {
        return res.jsonUnauthorized(null, 'Token inválido');
    };
};

module.exports = checkJwt;