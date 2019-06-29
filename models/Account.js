import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var account = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    icon: {
        type: String
    }
});
export default mongoose.model('Account', account);