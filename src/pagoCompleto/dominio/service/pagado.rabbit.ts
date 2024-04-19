import { Pagado } from "../entities/pagado";

export interface PaymentMqtt {
    sendPayments(payments: Pagado): Promise<any>;
}