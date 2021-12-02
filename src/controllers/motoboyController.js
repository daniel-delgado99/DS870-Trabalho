const MotoboyModel = require("../Models/Motoboy");
const mongoose = require("mongoose");

const Motoboy = mongoose.model("Motoboy", MotoboyModel);

const bcrypt = require("bcryptjs");

const { generateToken, passwordValidation } = require("../middleware/auth")

module.exports = {
	async authentication(req, res) {
		const cpf = req.body.cpf;
		const password = req.body.password;
		if (!cpf || !password)
			return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
		try {
			const motoboy = await Motoboy.findOne({ cpf })
			if (!motoboy)
				return res.status(404).json({ msg: "Usuário ou senha inválidos." });
			else {
				if (bcrypt.compareSync(password, motoboy.password)) {
					const token = generateToken({
						id: motoboy._id,
						tipo: 'Motoboy',
						documento: motoboy.cpf
					});
					return res
						.status(200)
						.json({ msg: "Autenticado com sucesso", token });
				} else
					return res.status(404).json({ msg: "Usuário ou senha inválidos 2." });
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
			const {name, cpf, password, phoneNumber} = req.body;

			if (!passwordValidation(password))
				return res.status(404).json({ msg: "A senha deve conter ao menos 8 caracteres, uma letra, um símbolo especial e um número" });

			const motoboyList = await Motoboy.findOne({ cpf });
			if (motoboyList)
				return res.status(404).json({ msg: "Motoboy já cadastrado." });

			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password, salt);

			const motoboy = new Motoboy({ name, cpf, password: hash, phoneNumber});
			if (!(await motoboy.save()))
				return res
					.status(400)
					.json({ msg: "Não foi possível criar o motoboy" });
			return res.json({ msg: "Motoboy criado com sucesso." });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findAll(req, res) {
		try {
			const motoboyList = await Motoboy.find();
			if (!motoboyList || motoboyList.length === 0)
				return res.status(404).json({ msg: "Não há motoboys cadastrados." });
			else return res.json({ msg: "Lista de motoboys cadastrados.", motoboyList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findByCpf(req, res) {
		try {
			const {cpf} = req.body;

			const motoboyList = await Motoboy.findOne({ cpf });
			if (!motoboyList || motoboyList.length === 0)
				return res.status(404).json({ msg: "Não há motoboys cadastrados com esse cpf." });
			else return res.json({ msg: "Lista de motoboys cadastrados.", motoboyList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async update(req, res) {
		try {
			const _id = req.params;
			const {name, password, phoneNumber} = req.body;

			const salt = bcrypt.genSaltSync(12);
			const hash = bcrypt.hashSync(password, salt);

			const motoboy = await Motoboy.findByIdAndUpdate(
				_id,
				{name, password: hash, phoneNumber},
				{ new: true }
			);
			if (!motoboy || motoboy.length === 0)
				return res.status(404).json({ msg: "Motoboy não encontrado." });
			else return res.json({ msg: "Motoboy atualizado", motoboy });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async delete(req, res) {
		try {
			const _id = req.params;
			Motoboy.find
			const motoboy = await Motoboy.findByIdAndDelete(_id);
			if (!motoboy || motoboy.length === 0)
				return res.status(404).json({ msg: "Motoboy não encontrado." });
			else return res.json({ msg: "Motoboy excluído", motoboy });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

};
