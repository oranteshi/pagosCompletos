import express from 'express';
import cors from 'cors';
import pagadoRoute from './src/pagoCompleto/infrestructure/routes/pagado.route';
import { conectarWebSocket } from './socket/socket';

const app = express();
const PORT = '3001';

let corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/pagado', pagadoRoute);

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ', PORT)
});

conectarWebSocket();