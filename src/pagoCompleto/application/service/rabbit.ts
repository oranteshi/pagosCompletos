import { conectarARabbit } from "../../../rabbit/config.rabbit";
import { Pagado } from "../../dominio/entities/pagado";
import { PaymentMqtt } from "../../dominio/service/pagado.rabbit";

export class PaymentRepositoryMqtt implements PaymentMqtt {
    async sendPayments(payments: Pagado): Promise<boolean> {
        try {
            const channel = await conectarARabbit();
            await channel?.sendToQueue('pagado', Buffer.from(JSON.stringify({message: 'venta creada', payments})));
            console.log('Pago enviado a rabbit ', payments);
            await channel?.close();
            return true;
        } catch ( error ) {
            console.error('Error al enviar el pago a rabbit: ', error);
            return false;
        }
    }
}