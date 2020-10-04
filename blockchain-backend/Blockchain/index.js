const Block = require('./block');
const {cryptoHash} = require('../utils');
const { REWARD_INPUT, MINING_REWARD } = require('../config');
const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        })
        this.chain.push(newBlock);
    }

    replaceChain(chain, validateTransactions, onSuccess){
        if(chain.length < this.chain.length) {
            console.log("incoming chain must be longer");
            return;
        }

        if(!Blockchain.isValidChain(chain)) {
            console.log("incoming chain must be valid");
            return;
        }

        if(validateTransactions && !this.validTransactionData({chain})){
            console.log('incoming chain has invalid transaction data')
            return;
        }

        if(onSuccess) onSuccess();

        this.chain= chain;
    }

    validTransactionData({chain}){
        for(let i=1; i<chain.length; i++){
            const block = chain[i];
            const transactionSet = new Set();
            let rewardTransactionCount = 0;

            for(let transaction of block.data){
                if(transaction.input.address === REWARD_INPUT.address){
                    rewardTransactionCount +=1;

                    if(rewardTransactionCount > 1){
                        console.error('Miner rewards exceeds limit');
                        return false;
                    }

                    if(Object.values(transaction.outputMap)[0] !== MINING_REWARD){
                        console.error('Miner reward amount is invalid');
                        return false;
                    }
                }else{
                    if(!Transaction.validTransaction(transaction)){
                        console.log('invalid transaction');
                        return false;
                    }

                    const trueBalance = Wallet.calculateBalance({
                        chain: this.chain,
                        address: transaction.input.address
                    });

                    if(transaction.input.amount !== trueBalance){
                        console.log('invalid input amount')
                        return false;
                    }

                    if(transactionSet.has(transaction)){
                        console.log('an identical transaction appeared')
                        return false;
                    }else{
                        transactionSet.add(transaction);
                    }
                }
            }
        }
        return true;
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false
        }

        for(let i=1; i<chain.length; i++){
            const {timestamp, lastHash, hash, data, nonce, difficulty} = chain[i];
            const actualLastHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;

            if(lastHash !== actualLastHash) return false;

            const validateHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if(hash !== validateHash) return false;

            if(Math.abs(lastDifficulty - difficulty) > 1) return false;
        }

        return true;
    }
}
module.exports = Blockchain;