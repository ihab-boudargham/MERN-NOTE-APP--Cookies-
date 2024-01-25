import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello, world');
});

const port = process.env.PORT;

// connect returns a promise like async functions, so after that we should define what happens next
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log('Mongoose connected');

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch(console.error);
