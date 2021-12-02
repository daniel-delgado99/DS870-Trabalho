const jwt = require("jsonwebtoken");

const roles = require("../_helpers/roles")

function verifyJWT(req, res, next) {
	const token = req.headers["x-access-token"];
	if (!token) return res.status(401).json({ msg: "Token indefinido." });

	if (token == process.env.ACP_TOKEN) {
		if (!(roles.ACP.routes.indexOf(req.baseUrl + req.path) > -1)) {
			return res.status(401).json({ msg: "Não autorizado." });
		}
		next();
	}
	else {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err)
				return res.status(401).json({ msg: "Falha na autenticação do token." });

			var uri = (req.baseUrl + '/' + req.path.split('/')[1]) 
			if (decoded.payload.tipo == roles.Motoboy.name) {
				if (!(roles.Motoboy.routes.indexOf(uri) > -1)) {
					return res.status(401).json({ msg: "Não autorizado.1" });
				}
			} else if (decoded.payload.tipo == roles.Associate.name) {
				
				if (!(roles.Associate.routes.indexOf(uri) > -1)) {
					return res.status(401).json({ msg: "Não autorizado.2" });
				}
			} else {
				return res.status(401).json({ msg: "Não autorizado.3" });
			}
			req.documento = decoded.payload.documento;
			next();
		});
	}
}

function passwordValidation(password) {
	return password.match(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
}

function generateToken(payload) {
	process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
	const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
		expiresIn: 18000, // Token expira em 5 horas
	});
	return token;
}


module.exports = {
	verifyJWT,
	passwordValidation,
	generateToken
};
