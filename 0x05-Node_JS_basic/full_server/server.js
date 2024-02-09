import express from 'express';
import { router } from './routes/index';

const app = express();
const PORT = 1245 || process.env.PORT;

// Use routes middleware
app.use('/', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running and listening on PORT ${PORT}`);
});
