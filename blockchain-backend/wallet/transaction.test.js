const Transaction = require('./transaction');
const Wallet = require('./index');
const { verifySignature } = require('../utils');
const {REWARD_INPUT, MINING_REWARD} = require('../config');
describe('Transaction',()=>{
    let transaction, senderWallet, recipient, amount;

    beforeEach(()=>{
        senderWallet = new Wallet();
        recipient = 'recipient-public-key';
        amount= 50;

        transaction = new Transaction({senderWallet, recipient, amount});
    });
    
    it('has an id',()=>{
        expect(transaction).toHaveProperty('id');
    });

    describe('outputMap',()=>{
        it('has an `outputMap`',()=>{
            expect(transaction).toHaveProperty('outputMap');
        })
        
        it('outputs the amount to recipient', ()=>{
            expect(transaction.outputMap[recipient]).toEqual(amount);
        });
        
        it('outputs the remaining balance for the `senderWallet`',()=>{
            expect(transaction.outputMap[senderWallet.publicKey]).toEqual(senderWallet.balance - amount);
        });
    });

    describe('input', ()=>{
        it('has an `input`',()=>{
            expect(transaction).toHaveProperty('input');
        });

        it('has an `timestamp` in the `input`',()=>{
            expect(transaction.input).toHaveProperty('timestamp');
        });

        it('sets the `amount` in the `senderWallet` balance',()=>{
            expect(transaction.input.amount).toEqual(senderWallet.balance);
        });

        it('sets the `address` to the `senderwallet` publicKey', ()=>{
            expect(transaction.input.address).toEqual(senderWallet.publicKey);
        });

        it('signs the input',()=>{
            expect(
                verifySignature({
                    publicKey: senderWallet.publicKey,
                    data: transaction.outputMap,
                    signature: transaction.input.signature
                })
            ).toBe(true);
        })
    });

    describe('validTransaction()',()=>{
        describe('when transaction is valid',()=>{
            it('return true',()=>{
                expect(Transaction.validTransaction(transaction)).toBe(true);
            });
        });

        describe('when transaction is invalid',()=>{
            describe('and a transaction outputMap value is invalid', ()=>{
                it('return false',()=>{
                    transaction.input.signature = new Wallet().sign('data');
                    expect(Transaction.validTransaction(transaction)).toBe(false);
                })
            });

            describe('and a transaction input signature is invalid', ()=>{
                it('return false',()=>{
                    transaction.input.signature = new Wallet().sign('data');
                    expect(Transaction.validTransaction(transaction)).toBe(false);
                })
            })
        })
    });

    describe('update()',()=>{
        let originalSignature, originalSenderOutput, nextRecpient, nextAmount;

        describe('and amount is invalid',()=>{
            it('throw an error',()=>{
                expect(()=>{
                    transaction.update({senderWallet, recipient: 'foo', amount: 999999}).toThrow('amount eceeds balance');
                })
            })
        })

        describe('and amount is valid',()=>{
            beforeEach(()=>{
                originalSignature = transaction.input.signature;
                originalSenderOutput = transaction.outputMap[senderWallet.publicKey];
                nextRecpient = 'prakhar_rai';
                nextAmount = 50;
    
                transaction.update({
                    senderWallet, recipient: nextRecpient, amount: nextAmount
                });
            });
    
            it('outputs the amount to next recipient',()=>{
                expect(transaction.outputMap[nextRecpient]).toEqual(nextAmount);
            });
    
            it('subtracts the amount from the original sender output amount',()=>{
                expect(transaction.outputMap[senderWallet.publicKey]).toEqual(originalSenderOutput - nextAmount);
            });
    
            it('maintains a total output that matches the input amount',()=>{
                expect(Object.values(transaction.outputMap).reduce((total, outputAmount)=> total + outputAmount)).toEqual(transaction.input.amount);
            });
    
            it('re-signs the transaction',()=>{
                expect(transaction.input.signature).not.toEqual(originalSignature);
            })

            describe('and another update for the same recipient', ()=>{
                let addedAmount;

                beforeEach(()=>{
                    addedAmoun = 80;
                    transaction.update({
                        senderWallet, recipient: nextRecpient, amount: addedAmount
                    });
                });

                it('adds to the recipient amount',()=>{
                    expect(transaction.outputMap[nextRecpient]).toEqual(nextAmount + addedAmount);
                });

                it('subtracts the amount from original sender output amount',()=>{
                    expect(transaction.outputMap[senderWallet.publicKey]).toEqual(originalSenderOutput - nextAmount - addedAmount);
                });
            })
        })
        
    });

    describe('rewardTransaction()',()=>{
        let rewardTransaction, minerWallet;

        beforeEach(()=>{
            minerWallet = new Wallet();
            rewardTransaction = Transaction.rewardTransaction({minerWallet})
        });

        it('creates a transaction with the reward input',()=>{
            expect(rewardTransaction.input).toEqual(REWARD_INPUT);
        });

        it('creates one transaction for miner with the miner-reward',()=>{
            expect(rewardTransaction.outputMap[minerWallet.publicKey]).toEqual(MINING_REWARD);
        })
    })
})