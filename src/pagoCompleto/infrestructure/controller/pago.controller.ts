import { Request, Response } from "express";
import { Pagado } from "../../dominio/entities/pagado";
import { PaymentServiceImpl } from '../../application/useCases/payments';
import { PaymentRepository } from "../repositoryMysql/mysql";
import { PaymentRepositoryMqtt } from '../../application/service/rabbit';
import { clients } from "../../../../socket/socket";

const paymentMqtt = new PaymentRepositoryMqtt();
const mysqlRepo = new PaymentRepository();
const paymentService = new PaymentServiceImpl(mysqlRepo);


export class PaymentController {
    static async createPayment(req: Request, res: Response): Promise<void> {

        const pagado: Pagado = req.body;

        await paymentService.createPayment(pagado);
        const notificacion = {
            message: 'Su pago se ha procesado con exito'
        };

        clients.forEach(ws => {
            ws.send(JSON.stringify(notificacion))
        });

        await paymentMqtt.sendPayments(pagado)
        .then(() => {
            res.status(201).json({
                message: 'El pago fue creado correctamente',
                pago: pagado
            });
        })
        .catch((error) => {
            console.error('Hubo un error al crear el pago ', error);
            res.status(500).json({
                error:'Hubo un error al crear el pago'
            });
        });
    }
}