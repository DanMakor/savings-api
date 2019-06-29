import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Account from './models/Account';
import Transaction from './models/Transaction';

const app = express();
export const router = express.Router();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/SavingsApp', { useNewUrlParser: true }).catch(function(err) { console.log(err); });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use(router);
app.listen(3000, () => console.log(`Express server running on port 3000`));

router.route('/api/transactions/delete/:id').delete((req, res) => {
    Transaction.findByIdAndRemove({_id: req.params.id}, (err, registryItem) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

router.route('/api/transactions').get((req, res) => {
    Transaction.find((err, transactions) => {
        if (err)
            console.log(err);
        else
            res.json(transactions);
    });
});

router.route('/api/transactions/create').post((req, res) => {
    let transaction = new Transaction(req.body);
    transaction.save()
        .then(transaction => {
            res.status(200).json({'transaction': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/api/transactions/createmany').post((req, res) => {
    Transaction.collection.insertMany(req.body, (err, transactions) => {
        if (err)
            res.json(err);
        else
            res.status(200).json({'transaction': 'Added successfully'});
    })
});

router.route('/api/accounts/delete/:id').delete((req, res) => {
    Account.findByIdAndRemove({_id: req.params.id}, (err, registryItem) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

router.route('/api/accounts/:id').get((req, res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err)
            console.log(err);
        else
            res.json(account);
    });
});

router.route('/api/accounts/:id/update').post((req, res) => {
    Account.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, acc) => {
        if (err)
            console.log(err);
        else 
            console.log(res.header);
            res.json(acc);
    })
})

router.route('/api/accounts').get((req, res) => {
    Account.find((err, accounts) => {
        if (err)
            console.log(err);
        else
            console.log(res.header);
            res.json(accounts);
    });
});

router.route('/api/accounts/create').post((req, res) => {
    let account = new Account(req.body);
    account.save()
        .then(account => {
            res.status(200).json({'category': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});
