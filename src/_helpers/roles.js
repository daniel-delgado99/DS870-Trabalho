module.exports = {
    Associate: {
        name: 'Associate',
        routes: [
            '/client/findAll',
            '/client/new',
            '/client/findByCnpj',
            '/client/update',
            '/client/delete',
            '/delivery/findAll',
            '/delivery/new',
            '/delivery/findCompleted',
            '/delivery/findPending',
            '/delivery/findByMotoboy',
            '/delivery/updatePending',
            '/delivery/deletePending',
            '/delivery/reportAssociatePayment',
            '/delivery/reportAdministrativo',
            '/motoboy/findAll',
            '/motoboy/new',
            '/motoboy/findByCpf',
            '/motoboy/update',
            '/motoboy/delete',
            '/associate/findAll',
            '/associate/new',
            '/associate/findByCnpj',
            '/associate/update',
            '/associate/delete',
        ]
    },
    Motoboy: {
        name: 'Motoboy',
        routes: [
            '/motoboy/logout',
            '/delivery/findCompletedByMotoboy',
            '/delivery/findPendingByMotoboy',
            '/delivery/findByMotoboy',
            '/delivery/reportMotoboyPayment',
        ]
    },
    ACP: {
        name: 'ACP',
        routes: [
            '/associate/findAll',
            '/associate/new',
            '/associate/findByCnpj',
            '/associate/update',
            '/associate/delete',
        ]
    }
}