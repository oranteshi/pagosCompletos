import express from 'express';
import { PaymentController } from '../controller/pago.controller';
export const route = express.Router();


route.post('/', PaymentController.createPayment);

export default route;