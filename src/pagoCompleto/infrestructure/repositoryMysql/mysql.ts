import { query } from '../../../db/db.config';
import { Pagado } from '../../dominio/entities/pagado';
import { PaymentService } from '../../dominio/service/pagado.service';


export class PaymentRepository implements PaymentService {

    createPayment = async(pagado: Pagado): Promise<any> => {
        const sql = 'INSERT INTO Pedidos (descripcion) VALUES (?)';
        const params = [pagado.descripcion];

        try {
            const result = await query(sql, params);
            return result;
        } catch (error) {
            console.error('Hubo un error al crear el pago ', error)
        }
    }
}