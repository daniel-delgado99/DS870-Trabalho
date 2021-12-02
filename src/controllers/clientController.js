const ClientModel = require("../Models/Client");
const mongoose = require("mongoose");

const Client = mongoose.model("Client", ClientModel);

module.exports = {
	async new(req, res) {
		try {
			const {name, cnpj, address} = req.body;

			const clientList = await Client.findOne({ cnpj });
			if (clientList) {
				return res.status(404).json({ msg: "CNPJ já cadastrado." });
			}

			const client = new Client({ name, cnpj, address});
			if (!(await client.save()))
				return res
					.status(400)
					.json({ msg: "Não foi possível criar o cliente" });
			return res.json({ msg: "Cliente criado com sucesso." });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findAll(req, res) {
		try {
			const clientList = await Client.find();
			if (!clientList || clientList.length === 0)
				return res.status(404).json({ msg: "Não há clientes cadastrados." });
			else return res.json({ msg: "Lista de clientes cadastrados.", clientList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findByCnpj(req, res) {
		try {
			const {cnpj} = req.body;

			const clientList = await Client.findOne({ cnpj });
			if (!clientList || clientList.length === 0)
				return res.status(404).json({ msg: "Não há clientes cadastrados com esse cnpj." });
			else return res.json({ msg: "Lista de clientes cadastrados.", clientList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async update(req, res) {
		try {
			const _id = req.params;
			const {name, address} = req.body;
			const client = await Client.findByIdAndUpdate(
				_id,
				{name, address},
				{ new: true }
			);
			if (!client || client.length === 0)
				return res.status(404).json({ msg: "Cliente não encontrado." });
			else return res.json({ msg: "Cliente atualizado", client });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async delete(req, res) {
		try {
			const _id = req.params;
			Client.find
			const client = await Client.findByIdAndDelete(_id);
			if (!client || client.length === 0)
				return res.status(404).json({ msg: "Cliente não encontrado." });
			else return res.json({ msg: "Cliente excluído", client });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

};
