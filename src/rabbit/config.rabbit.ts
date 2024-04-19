import amqp from 'amqplib';

export async function conectarARabbit() {
     try {
        const conn = await amqp.connect({
            protocol: 'amqp',
            hostname: '44.192.200.94',
            port: 5672,
            username: 'guest',
            password: 'guest',
        });

        console.log('La conexión a rabbit fue establecida');
        return conn.createChannel();
     } catch ( error ) {
        console.error('Error al conectar con rabbit', error);
     }
}