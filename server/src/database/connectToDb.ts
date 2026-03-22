import mongoose from 'mongoose'
import { MongoUri } from '../config/AppConfiguration.js'

export function connectToDb() {
  mongoose.connect(MongoUri)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
}

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection killed on application termination');
  process.exit(0);
});