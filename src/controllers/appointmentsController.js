const Appointment = require("../models/Appointment");

module.exports = {
	async searchAppointmentByPatientId(req, res) {
		const id = req.body.id;
		if (!id)
			res.status(400).json({
				msg: "Parâmetro id está vazio.",
			});
		const appointment = await Appointment.findAll({
			where: { patientId: id },
		});
		if (appointment) {
			if (appointment == "")
				res.status(404).json({ msg: "Consulta não encontrada" });
			else res.status(200).json({ appointment });
		} else
			res.status(404).json({
				msg: "Consulta não encontrada"
			});
	},

	async searchAppointmentByPhysicianId(req, res) {
		const id = req.body.id;
		if (!id)
			res.status(400).json({
				msg: "Parâmetro id está vazio.",
			});
		const appointment = await Appointment.findAll({
			where: { physicianId: id },
		});
		if (appointment) {
			if (appointment == "")
				res.status(404).json({ msg: "Consulta não encontrada" });
			else res.status(200).json({ appointment });
		} else
			res.status(404).json({
				msg: "Consulta não encontrada"
			});
	},

	async newAppointment(req, res) {
		const { appointmentDate, description, patientId, physicianId } = req.body;
		if (!appointmentDate || !description || !patientId || !physicianId) {
			res.status(400).json({
				msg: "Dados obrigatórios não foram preenchidos.",
			});
		}

		const appointment = await Appointment.create({
			appointmentDate: new Date(appointmentDate),
			description,
			patientId,
			physicianId,
		}).catch((error) => {
			res.status(500).json({ msg: "Não foi possível inserir os dados." });
		});
		if (appointment)
			res.status(201).json({ msg: "Nova consulta foi adicionada." });
		else
			res
				.status(404)
				.json({ msg: "Não foi possível cadastrar nova consulta." });

	},
 
	async deleteAppointment(req, res) {
		const appointmentId = req.params.id;
		const deletedAppointment = await Appointment.destroy({
			where: { id: appointmentId },
		}).catch(async (error) => {
			res.status(500).json({ msg: "Falha na conexão." });
		});
		if (deletedAppointment != 0)
			res.status(200).json({ msg: "Consulta excluida com sucesso." });
		else res.status(404).json({ msg: "Consulta não encontrada." });
	}
};
