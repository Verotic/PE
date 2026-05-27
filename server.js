import dotenv from 'dotenv';
import { createApp } from './server/app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const app = createApp();

app.listen(PORT, HOST, () => {
    console.log(`Servidor a correr em http://${HOST}:${PORT}`);
    console.log(`Abra o site em: http://${HOST}:${PORT}/`);
});
