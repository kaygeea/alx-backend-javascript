import express from 'express';
import { routes } from './routes';

const app = express();
const PORT = 1245 || process.env.PORT;

// Use routes middleware
app.use('/'), routes;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running and listening on PORT ${PORT}`);
})
