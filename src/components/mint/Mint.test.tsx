import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { render, screen } from '@testing-library/react';
import { useContractFunction, TransactionStatus } from '@usedapp/core';

import { Mint } from './Mint';

jest.mock('@usedapp/core', () => ({
    ...jest.requireActual('@usedapp/core'),
    useContractFunction: jest.fn(),
}));

const mockecTransactionStatus = (props: Partial<TransactionStatus>): TransactionStatus => ({
    status: 'None',
    ...props,
});

describe('Mint', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('render initial form', async () => {
        jest.mocked(useContractFunction).mockReturnValue({
            events: [],
            state: mockecTransactionStatus({}),
            send: jest.fn(),
            resetState: jest.fn(),
        });

        render(
            <Provider theme={defaultTheme}>
                <Mint />
            </Provider>
        );

        expect(screen.getByText('Mint')).toBeVisible();
        expect(useContractFunction).toHaveBeenLastCalledWith(expect.anything(), 'mint', {
            transactionName: 'Mint',
        });
    });
});
