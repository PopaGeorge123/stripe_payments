import { Double } from 'mongodb';
import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  currentAdCount: { type: Number, required: true },
  currentAdViews: { type: Number, required: true },
  currentAdAccesses: { type: Number, required: true },
  sinceLaunchAdViews: { type: Number, required: true },
  currentImageName: { type: String, required: true },
  currentAdId: { type: String, required: true },
});

const Config = mongoose.models.Config || mongoose.model('Config', configSchema);

export default Config;