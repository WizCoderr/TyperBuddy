import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const accountSchema = new Schema({

    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    mode: { type: String, required: true, enum: ['none', 'google'] },
    roomId: { type: String, required: false }
});

export const Account = mongoose.model("Account", accountSchema)
