import { config } from 'dotenv';

config();

export const MongoDBUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const InventoryDatabase = 'inventory';
