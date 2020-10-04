const Block = require('./block');
const Blockchain = require('./index');
const {cryptoHash} = require('../utils');
const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

describe('Blockchain', () =>{
    let  blockchain, newChain, originalChain;

    beforeEach(()=>{
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    })

    it('start with genesis block', ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    })

    it('add a new block to the chain', ()=>{
        const newData = 'temp data';
        blockchain.addBlock({data: newData});

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    })

    describe('isValidChain()', ()=>{
        describe('when the chain does not start with the genesis block', ()=>{
            it('return false', () =>{
                blockchain.chain[0] = {data: 'fale-genesis'}
    
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
    
        describe('when the chian starts with thee genesis block and has multiple blocks', ()=>{
            beforeEach(()=>{
                blockchain.addBlock({data: "yogesh"});
                blockchain.addBlock({data: "arpit"});
                blockchain.addBlock({data: "prakhar"});
            })

            describe('and a lastHash reference has changed ',()=>{
                it('return false', ()=>{
                    blockchain.chain[2].lastHash = 'broken-lasthash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                }); 
            });
    
            describe('and the chain contains a block with an invalid field', ()=>{
                it('return false', ()=>{
                    blockchain.chain[2].data = 'bad-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
    
            describe('and the chain does not contains any invalid blocks', ()=>{
                it('return false', ()=>{
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });

            describe('the chain contains a block woth jumped difficulty', ()=>{
                it('returns false', ()=>{
                    const lastBlock = blockchain.chain[blockchain.chain.length -1];
                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty -3;
                    const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

                    const badBlock = new Block(timestamp, lastHash, hash, nonce, difficulty, data,);

                    blockchain.chain.push(badBlock);

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })
            })
        });

    });

    describe('replaceChain()',()=>{
        let errorMock, logMock;

        beforeEach(()=>{
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        }
        )
        describe('when newChain is not longer',()=>{
            it('does not replace the chain',()=>{
                newChain.chain[0] = {new: 'chain'};
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain)
            });

            // it('logs an error', ()=>{
            //     expect(errorMock).toHaveBeenCalled();
            // })
        });

        describe('when newChain is longer',()=>{
            beforeEach(()=>{
                newChain.addBlock({data: "arpit"});
                newChain.addBlock({data: "yogesh"});
                newChain.addBlock({data: "prakhar"});
            });

            describe('and the chain is invalid',()=>{
                beforeEach(() =>{
                    newChain.chain[2].hash = "fake-hash";
                    blockchain.replaceChain(newChain.chain);
                })

                it('does not replaces the chain',()=>{
                    expect(blockchain.chain).toEqual(originalChain);
                });

                // it('logs an error', ()=>{
                //     expect(errorMock).toHaveBeenCalled();
                // })
            });

            describe('and the chain is valid',()=>{
                beforeEach(()=>{
                    blockchain.replaceChain(newChain.chain);
                })

                it('replaces the chain',()=>{
                    expect(blockchain.chain).toEqual(newChain.chain)
                });

                // it('logs about the chain replacement',()=>{
                //     expect(logMock).toHaveBeenCalled();
                // })
            });
        });

        describe('and the `validTransaction` flag is true',()=>{
            it('calls validTransactionData()',()=>{
                const validTransactionDataMock = jest.fn();

                blockchain.validTransactionData = validTransactionDataMock;

                blockchain.replaceChain(newChain.chain, true);

                expect(validTransactionDataMock).toHaveBeenCalled();
            })
        })
    });

    describe('validTransactionData()',()=>{
        let transaction, rewardTransaction, wallet;

        beforeEach(()=>{
            wallet = new Wallet();
            transaction = wallet.createTransaction({recipient: 'arpit', amount: 50});
            rewardTransaction = Transaction.rewardTransaction({minerWallet: wallet});
        });

        describe('and the transaction data is valid',()=>{
            it('return true',()=>{
                newChain.addBlock({data : [transaction, rewardTransaction]});

                expect(blockchain.validTransactionData({chain: newChain.chain})).toBe(true)
            });
        });
        
        describe('and the transaction data has multiple rewards',()=>{
            it('returns false',()=>{
                newChain.addBlock({data: [transaction, rewardTransaction, rewardTransaction]});

                expect(blockchain.validTransactionData({chain: newChain.chain})).toBe(false)
            });
        });

        describe('and the trasnaction data ha at leat one malformed outputMap',()=>{
            describe('and the transaction is not a reward transaction',()=>{
                it('return false',()=>{
                    transaction.outputMap[wallet.publicKey] = 99999;

                    newChain.addBlock({data: [transaction, rewardTransaction]});

                    expect(blockchain.validTransactionData({chain: newChain.chain})).toBe(false)
                 });
            });

            describe('and the transaction is a reward transaction',()=>{
                it('return false',()=>{
                    rewardTransaction.outputMap[wallet.publicKey] = 99999;

                    newChain.addBlock({data: [transaction, rewardTransaction]});
                    
                    expect(blockchain.validTransactionData({chain: newChain.chain})).toBe(false);
                });
            });
        });

        describe('and the transaction data have at least one malformed input',()=>{
            it('return false',()=>{
                wallet.balance = 10000;

                const evilOutputMap = {
                    [wallet.publicKey] : 9900,
                    arpit : 100
                };

                const evilTransaction = {
                    input : {
                        timestamp : Date.now(),
                        amount : wallet.balance,
                        address : wallet.publicKey,
                        signature : wallet.sign(evilOutputMap)
                    },
                    outputMap: evilOutputMap
                }

                newChain.addBlock({data: [evilTransaction, rewardTransaction]});

                expect(blockchain.validTransactionData({chain : newChain.chain})).toBe(false);
            });
        })

        describe('and a data contains multiple identical transactions',()=>{
            it('return false',()=>{
                newChain.addBlock({data: [transaction , transaction, transaction, rewardTransaction]});

                expect(blockchain.validTransactionData({chain : newChain.chain})).toBe(false);
            });
        })
    })
});



    