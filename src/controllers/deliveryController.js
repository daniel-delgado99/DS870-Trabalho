const DeliveryModel = require("../Models/Delivery");
const MotoboyModel = require("../Models/Motoboy");
const ClientModel = require("../Models/Client");
const mongoose = require("mongoose");

const Delivery = mongoose.model("Delivery", DeliveryModel);
const Motoboy = mongoose.model("Motoboy", MotoboyModel);
const Client = mongoose.model("Client", ClientModel);

module.exports = {
	async new(req, res) {
		try {
			const { description, client, motoboy, status, value } = req.body;

			const motoboyList = await Motoboy.findOne({ cpf: motoboy });
			if (!motoboyList)
				return res.status(404).json({ msg: "Motoboy não encontrado." });

			const clientList = await Client.findOne({ cnpj: client });
			if (!clientList)
				return res.status(404).json({ msg: "Cliente não encontrado" });

			const delivery = new Delivery({ description, client: clientList, motoboy: motoboyList, status, value });
			if (!(await delivery.save()))
				return res
					.status(400)
					.json({ msg: "Não foi possível criar a entrega" });
			return res.json({ msg: "Entrega criada com sucesso." });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findAll(req, res) {
		try {
			const deliveryList = await Delivery.find();
			if (!deliveryList || deliveryList.length === 0)
				return res.status(404).json({ msg: "Não há entregas cadastradas." });
			else return res.json({ msg: "Lista de entregas cadastradas.", deliveryList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findCompleted(req, res) {
		try {
			const status = "COMPLETED";
			const deliveryList = await Delivery.find({ status });
			if (!deliveryList || deliveryList.length === 0)
				return res.status(404).json({ msg: "Não há entregas cadastradas realizadas." });
			else return res.json({ msg: "Lista de entregas realizadas.", deliveryList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findPending(req, res) {
		try {
			const status = "PENDING";
			const deliveryList = await Delivery.find({ status });
			if (!deliveryList)
				return res.status(404).json({ msg: "Não há entregas cadastradas pendentes." });
			else return res.json({ msg: "Lista de entregas pendentes.", deliveryList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async findByMotoboy(req, res) {
		try {
			const { cpf } = req.body;
			const motoboy = await Motoboy.findOne({ cpf })
			if (!motoboy)
				return res.status(404).json({ msg: "Não há motoboy cadastrado com esse cpf." });
			const deliveryList = await Delivery.find({ motoboy });
			if (!deliveryList || deliveryList.length === 0)
				return res.status(404).json({ msg: "Não há entregas cadastradas para esse motoboy." });
			else return res.json({ msg: "Lista de entregas cadastradas.", deliveryList });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async updatePending(req, res) {
		try {
			const _id = req.params;
			const { description, client, motoboy, status, value } = req.body;

			const motoboyObj = await Motoboy.findOne({ cpf: motoboy });
			if (!motoboyObj)
				return res.status(404).json({ msg: "Motoboy não encontrado." });

			const clientObj = await Client.findOne({ cnpj: client });
			if (!clientObj)
				return res.status(404).json({ msg: "Cliente não encontrado" });

			const delivery = await Delivery.findOneAndUpdate(
				{ _id, status: "PENDING" },
				{ description, client: clientObj, motoboy: motoboyObj, status, value }
			);
			if (!delivery)
				return res.status(404).json({ msg: "Entrega não encontrada ou Status não pendente." });
			else return res.json({ msg: "Entrega atualizada", delivery });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async deletePending(req, res) {
		try {
			const _id = req.params;
			const delivery = await Delivery.findOneAndDelete({ _id, status: "PENDING" });
			if (!delivery)
				return res.status(404).json({ msg: "Entrega não encontrada ou Status não pendente." });
			else return res.json({ msg: "Entrega excluído", delivery });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async reportAssociatePayment(req, res) {
		try {
			const status = "COMPLETED";
			const deliveryList = await Delivery.find({ status });
			if (!deliveryList || deliveryList.length < 1)
				return res.status(404).json({ msg: "Não há entregas cadastradas concluídas." });
			let valorTotal = 0;
			deliveryList.forEach(item => {
				valorTotal += item.value;
			});

			let pagamentoMotoboy = (valorTotal * 0.7).toFixed(4);
			let pagamentoAssociate = (valorTotal * 0.3).toFixed(4);

			return res.json({ msg: "Valores para as entregas concluídas.", valorPagamentoMotoboy: pagamentoMotoboy, valorPagamentoAssociado: pagamentoAssociate, valorTotal });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},


	async reportMotoboyPayment(req, res) {
		try {
			let cpf = req.documento;
			const motoboyObj = await Motoboy.findOne({ cpf });
			if (!motoboyObj)
				return res.status(404).json({ msg: "Motoboy não encontrado." });

			const status = "COMPLETED";
			const deliveryList = await Delivery.find({ status, motoboy: motoboyObj });
			if (!deliveryList || deliveryList.length < 1)
				return res.status(404).json({ msg: "Não há entregas cadastradas concluídas." });
			let valorTotal = 0;
			deliveryList.forEach(item => {
				valorTotal += item.value;
			});

			let pagamento = (valorTotal * 0.7).toFixed(4);

			return res.json({ msg: "Valores para as entregas concluídas.", valorPagamento: pagamento, valorTotal });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},

	async reportAdministrativo(req, res) {
		try {
			const motoboyList = await Motoboy.find();
			const clientList = await Client.find();
			const deliveryList = await Delivery.find();

			let topClientes = [];
			deliveryList.forEach(delivery => {
				let indexof = topClientes.findIndex(item => delivery['client']['cnpj']  == item['client']['cnpj'])
				if (indexof == -1) {
					let position = topClientes.push({
						client: delivery['client'],
						quantidadeEntregas: 1
					})
				} else {
					topClientes[indexof]['quantidadeEntregas'] += 1;
				}
			})

			topClientes.sort((a, b) => {
				return b.quantidadeEntregas - a.quantidadeEntregas;
			})

			let topMotoboys = [];
			deliveryList.forEach(delivery => {
				let indexof = topMotoboys.findIndex(item => delivery['motoboy']['cpf']  == item['motoboy']['cpf'])
				if (indexof == -1) {
					topMotoboys.push({
						motoboy: delivery['motoboy'],
						quantidadeEntregas: 1
					})
				} else {
					topMotoboys[indexof]['quantidadeEntregas'] += 1;
				}
			})
			topMotoboys.sort((a, b) => {
				return b.quantidadeEntregas - a.quantidadeEntregas;
			})

			let percentPending = 0;
			let percentCompleted = 0;
			if (deliveryList.length > 0) {
				let totPending = 0;
				let totCompleted = 0;

				deliveryList.forEach(item => {
					if (item.status == "PENDING")
						totPending += 1;
					else if (item.status == "COMPLETED")
						totCompleted += 1;					
				});

				percentPending = totPending / deliveryList.length;
				percentCompleted = totCompleted / deliveryList.length;
			}

			return res.json({
				totalClientes: clientList.length,
				totalMotoboys: motoboyList.length,
				totalEntregas: deliveryList.length,
				top5Clientes: topClientes.slice(0, 5),
				top5Motoboys: topMotoboys.slice(0, 5),
				porcentagemRealizadas: (percentCompleted * 100).toFixed(2) + "%",
				porcentagemPendentes: (percentPending * 100).toFixed(2) + "%",
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: "Erro de processo no servidor." });
		}
	},
};