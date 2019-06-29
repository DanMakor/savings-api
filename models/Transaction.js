import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var transaction = new Schema({
    amount: {
        type: Number
    },
    description: {
        type: String
    },
    accountId: {
        type: String
    },
    date: {
        type: Date
    }
});
export default mongoose.model('Transaction', transaction);