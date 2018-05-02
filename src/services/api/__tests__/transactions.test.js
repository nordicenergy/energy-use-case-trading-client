import Axios from 'axios';
import { getRecentTransactions } from '../transactions';

describe('Transactions API Service', () => {
    beforeEach(done => {
        Axios.get = jest.fn();
        done();
    });
    it('should provide method for getting recent transactions', async () => {
        Axios.get
            .mockReturnValueOnce(Promise.resolve({ data: { balance: 20, lastUpdatedAt: 12345678 } }))
            .mockReturnValue(
                Promise.resolve({
                    data: {
                        transactions: [
                            {
                                date: 1524873600,
                                description:
                                    'Bought 7.13 kWh from "Bio-Erdgas-Anlage in der ehemaligen Schultheiss-Brauerei"',
                                detailsLink:
                                    'https://ropsten.etherscan.io/tx/0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25',
                                energyAmount: 7.13,
                                from: '0x0101f8cdf2c5ed1d775120a99a701bab5418add8',
                                id: 99,
                                price: 2.7,
                                producerID: 9,
                                transactionAmount: 0.19,
                                transactionHash: '0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25'
                            }
                        ]
                    }
                })
            );

        const response = await getRecentTransactions('testId', 1);
        const [[balanceUrl], [historyUrl, historyParams]] = Axios.get.mock.calls;

        expect(balanceUrl).toEqual('/api/user/testId/transactions/getBalance');
        expect(historyUrl).toEqual('/api/user/testId/transactions/getHistory');
        expect(historyParams).toEqual({ params: { limit: 10, offset: 10 } });
        expect(response.data).toEqual({
            currentBalance: { balance: 20, date: 12345678 },
            transactions: [
                {
                    date: 1524873600,
                    description: 'Bought 7.13 kWh from "Bio-Erdgas-Anlage in der ehemaligen Schultheiss-Brauerei"',
                    details: {
                        amount: 7.13,
                        from: 'Bio-Erdgas-Anlage in der ehemaligen Schultheiss-Brauerei',
                        fromUrl: '/buy_energy/producer/9',
                        hash: '0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25',
                        price: 2.7,
                        url:
                            'https://ropsten.etherscan.io/tx/0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25'
                    },
                    detailsLink:
                        'https://ropsten.etherscan.io/tx/0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25',
                    energyAmount: 7.13,
                    from: '0x0101f8cdf2c5ed1d775120a99a701bab5418add8',
                    id: 99,
                    price: 2.7,
                    producerID: 9,
                    transactionAmount: 0.19,
                    transactionHash: '0x4c6c11de80fa544341fc97fd4fb6755adbe6006a424f5a1029b632b7ce81ed25'
                }
            ]
        });
    });
});
