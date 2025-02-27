const liveContract = {
    address: '0x4f80f1254B8783dDd8f81d996605fe85780BfcB4',
    abi: [
        {
            constant: true,
            inputs: [
                {
                    name: '',
                    type: 'uint256'
                }
            ],
            name: 'asks',
            outputs: [
                {
                    name: 'producer',
                    type: 'address'
                },
                {
                    name: 'day',
                    type: 'uint32'
                },
                {
                    name: 'price',
                    type: 'uint32'
                },
                {
                    name: 'energy',
                    type: 'uint64'
                },
                {
                    name: 'userID',
                    type: 'uint32'
                },
                {
                    name: 'timestamp',
                    type: 'uint64'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    name: '',
                    type: 'address'
                }
            ],
            name: 'consumers',
            outputs: [
                {
                    name: '',
                    type: 'uint32'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    name: '',
                    type: 'address'
                }
            ],
            name: 'producers',
            outputs: [
                {
                    name: '',
                    type: 'bool'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: false,
            inputs: [
                {
                    name: 'aproducer',
                    type: 'address'
                }
            ],
            name: 'registerProducer',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    name: '',
                    type: 'uint256'
                }
            ],
            name: 'bids',
            outputs: [
                {
                    name: 'producer',
                    type: 'address'
                },
                {
                    name: 'day',
                    type: 'uint32'
                },
                {
                    name: 'price',
                    type: 'uint32'
                },
                {
                    name: 'energy',
                    type: 'uint64'
                },
                {
                    name: 'timestamp',
                    type: 'uint64'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: false,
            inputs: [
                {
                    name: 'aproducer',
                    type: 'address'
                }
            ],
            name: 'deregisterProducer',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    name: '',
                    type: 'uint32'
                }
            ],
            name: 'asksIndex',
            outputs: [
                {
                    name: '',
                    type: 'uint256'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: false,
            inputs: [
                {
                    name: 'aconsumer',
                    type: 'address'
                },
                {
                    name: 'auserID',
                    type: 'uint32'
                }
            ],
            name: 'registerConsumer',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    name: '',
                    type: 'address'
                },
                {
                    name: '',
                    type: 'uint32'
                }
            ],
            name: 'bidsIndex',
            outputs: [
                {
                    name: '',
                    type: 'uint256'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'producer',
                    type: 'address'
                },
                {
                    indexed: true,
                    name: 'day',
                    type: 'uint32'
                },
                {
                    indexed: true,
                    name: 'price',
                    type: 'uint32'
                },
                {
                    indexed: false,
                    name: 'energy',
                    type: 'uint64'
                }
            ],
            name: 'BidMade',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'producer',
                    type: 'address'
                },
                {
                    indexed: true,
                    name: 'day',
                    type: 'uint32'
                },
                {
                    indexed: true,
                    name: 'price',
                    type: 'uint32'
                },
                {
                    indexed: false,
                    name: 'energy',
                    type: 'uint64'
                }
            ],
            name: 'BidRevoked',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'producer',
                    type: 'address'
                },
                {
                    indexed: true,
                    name: 'day',
                    type: 'uint32'
                },
                {
                    indexed: false,
                    name: 'price',
                    type: 'uint32'
                },
                {
                    indexed: false,
                    name: 'energy',
                    type: 'uint64'
                },
                {
                    indexed: true,
                    name: 'userID',
                    type: 'uint32'
                }
            ],
            name: 'Deal',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'producer',
                    type: 'address'
                },
                {
                    indexed: true,
                    name: 'day',
                    type: 'uint32'
                },
                {
                    indexed: false,
                    name: 'price',
                    type: 'uint32'
                },
                {
                    indexed: false,
                    name: 'energy',
                    type: 'uint64'
                },
                {
                    indexed: true,
                    name: 'userID',
                    type: 'uint32'
                }
            ],
            name: 'DealRevoked',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'producer',
                    type: 'address'
                }
            ],
            name: 'producerRegistered',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'producer',
                    type: 'address'
                }
            ],
            name: 'producerDeregistered',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'consumer',
                    type: 'address'
                }
            ],
            name: 'consumerRegistered',
            type: 'event'
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: 'consumer',
                    type: 'address'
                }
            ],
            name: 'consumerDeregistered',
            type: 'event'
        },
        {
            constant: false,
            inputs: [
                {
                    name: 'aday',
                    type: 'uint32'
                },
                {
                    name: 'aprice',
                    type: 'uint32'
                },
                {
                    name: 'aenergy',
                    type: 'uint64'
                },
                {
                    name: 'atimestamp',
                    type: 'uint64'
                }
            ],
            name: 'offer_energy',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            constant: true,
            inputs: [],
            name: 'getBidsCount',
            outputs: [
                {
                    name: 'count',
                    type: 'uint256'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    name: 'producer',
                    type: 'address'
                },
                {
                    name: 'day',
                    type: 'uint32'
                }
            ],
            name: 'getBidByProducerAndDay',
            outputs: [
                {
                    name: 'price',
                    type: 'uint32'
                },
                {
                    name: 'energy',
                    type: 'uint64'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: false,
            inputs: [
                {
                    name: 'aproducer',
                    type: 'address'
                },
                {
                    name: 'aday',
                    type: 'uint32'
                },
                {
                    name: 'aprice',
                    type: 'uint32'
                },
                {
                    name: 'aenergy',
                    type: 'uint64'
                },
                {
                    name: 'auserID',
                    type: 'uint32'
                },
                {
                    name: 'atimestamp',
                    type: 'uint64'
                }
            ],
            name: 'buy_energy',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            constant: false,
            inputs: [
                {
                    name: 'aproducer',
                    type: 'address'
                },
                {
                    name: 'aday',
                    type: 'uint32'
                },
                {
                    name: 'aprice',
                    type: 'uint32'
                },
                {
                    name: 'aenergy',
                    type: 'uint64'
                }
            ],
            name: 'buy_energy',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function'
        },
        {
            constant: true,
            inputs: [],
            name: 'getAsksCount',
            outputs: [
                {
                    name: 'count',
                    type: 'uint256'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        },
        {
            constant: true,
            inputs: [
                {
                    name: 'userID',
                    type: 'uint32'
                }
            ],
            name: 'getAskByUserID',
            outputs: [
                {
                    name: 'producer',
                    type: 'address'
                },
                {
                    name: 'day',
                    type: 'uint32'
                },
                {
                    name: 'price',
                    type: 'uint32'
                },
                {
                    name: 'energy',
                    type: 'uint64'
                }
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function'
        }
    ]
};

export default liveContract;
