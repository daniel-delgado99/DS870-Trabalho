const AssociateModel = require("../Models/Associate");
const mongoose = require("mongoose");

const Associate = mongoose.model("Associate", AssociateModel);

const bcrypt = require("bcryptjs");

const { generateToken, passwordValidation } = require("../middleware/auth")

module.exports = {
	async authentication(req, res) {
		const cnpj = req.body.cnpj;
		const password = req.body.password;
		if (!cnpj || !password)
			return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
		try {
			const associate = await Associate.findOne({ cnpj });
			if (!associate)
				return res.status(404).json({ msg: "Usuário ou senha inválidos .1" });
			else {				
				if (bcrypt.compareSync(password, associate.password)) {

					const token = generateToken({
						id: associate._id,
						tipo: 'Associate',
						documento: associate.cnpj
					});

					return res
						.status(200)
						.json({ msg: "Autenticado com sucesso", token });
				} else
					return res.status(404).json({ msg: "Usuário ou senha inválidos. 2" });
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},

	logout(req, res) {
		process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
		res.json({ msg: "Logout realizado com sucesso" });
	},

	async new(req, res) {
		try {
			const { companyName, cnpj, password, address } = req.body;

			if (!passwordValidation(password))
				return res.status(404).json({ msg: "A senha deve conter ao menos 8 caracteres, uma letra, um símbolo especial e um número" });

			const associateList = await Associate.findOne({ cnpj });
			if (associateList) {
				return res.status(404).json({ msg: "CNPJ já cadastrado." });
			}

			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password, salt);

			const associate = new Associate({ companyName, cnpj, password: hash, address });
			if (!(await associate.save()))
				return res
					.status(400)
					.json({ msg: "Não foi possível criar o associado" });
			return res.json({ msg: "Associado criado com sucesso." });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findAll(req, res) {
		try {
			const associate = await Associate.find();
			if (!associate || associate.length === 0)
				return res.status(404).json({ msg: "Não há associados cadastrados." });
			else return res.json({ msg: "Lista de associados cadastrados.", associate });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findByCnpj(req, res) {
		try {
			const {cnpj} = req.body;

			const associate = await Associate.findOne({ cnpj });
			if (!associate || associate.length === 0)
				return res.status(404).json({ msg: "Não há associados cadastrados com esse cnpj." });
			else return res.json({ msg: "Lista de associados cadastrados.", associate });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async update(req, res) {
		try {
			const _id = req.params;
			const {companyName, password, address} = req.body;

			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password, salt);

			const associate = await Associate.findByIdAndUpdate(
				_id,
				{companyName, password: hash, address},
				{ new: true }
			);
			if (!associate || associate.length === 0)
				return res.status(404).json({ msg: "Associado não encontrado." });
			else return res.json({ msg: "Associado atualizado", associate });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async delete(req, res) {
		try {
			const _id = req.params;
			Associate.find
			const associate = await Associate.findByIdAndDelete(_id);
			if (!associate || associate.length === 0)
				return res.status(404).json({ msg: "Associado não encontrado." });
			else return res.json({ msg: "Associado excluído", associate });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

};
