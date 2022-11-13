import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContractFunction, TransactionStatus } from '@usedapp/core';

import { getStatusVariant, Transfer } from './Transfer';

jest.mock('@usedapp/core', () => ({
    ...jest.requireActual('@usedapp/core'),
    useContractFunction: jest.fn(),
}));

const mockecTransactionStatus = (props: Partial<TransactionStatus>): TransactionStatus => ({
    status: 'None',
    ...props,
});

describe('Transfer', () => {
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
                <Transfer />
            </Provider>
        );

        expect(screen.getByLabelText('address')).toBeVisible();
        expect(screen.getByLabelText('amount')).toBeVisible();
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeVisible();
        expect(submitButton).toBeDisabled();
    });

    it('shows transaction state error', async () => {
        const mockedErrorMessage = 'this is an error';
        jest.mocked(useContractFunction).mockReturnValue({
            events: [],
            state: mockecTransactionStatus({ errorMessage: mockedErrorMessage }),
            send: jest.fn(() => Promise.resolve(undefined)),
            resetState: jest.fn(),
        });

        render(
            <Provider theme={defaultTheme}>
                <Transfer />
            </Provider>
        );

        expect(screen.getByText(mockedErrorMessage)).toBeVisible();
    });

    it('shows transaction error', async () => {
        const mockedTransactionError = { message: 'this is an error' };
        jest.mocked(useContractFunction).mockReturnValue({
            events: [],
            state: mockecTransactionStatus({}),
            send: jest.fn(() => Promise.reject(mockedTransactionError)),
            resetState: jest.fn(),
        });

        render(
            <Provider theme={defaultTheme}>
                <Transfer />
            </Provider>
        );

        const mockedAddress = 'x0234234234';
        const mockedAmount = '2';

        userEvent.type(screen.getByLabelText('amount'), mockedAmount);
        userEvent.type(screen.getByLabelText('address'), mockedAddress);
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();

        await act(async () => {
            fireEvent.submit(screen.getByLabelText('transaction form'));
        });

        expect(screen.getByText(mockedTransactionError.message)).toBeVisible();
    });

    it('shows transaction state', async () => {
        const mockedStatus = 'PendingSignature';
        jest.mocked(useContractFunction).mockReturnValue({
            events: [],
            state: mockecTransactionStatus({ status: mockedStatus }),
            send: jest.fn(() => Promise.resolve(undefined)),
            resetState: jest.fn(),
        });

        render(
            <Provider theme={defaultTheme}>
                <Transfer />
            </Provider>
        );

        expect(screen.getByText(mockedStatus)).toBeVisible();
    });

    it('getStatusVariant', () => {
        expect(getStatusVariant('Fail')).toBe('negative');
        expect(getStatusVariant('Exception')).toBe('negative');
        expect(getStatusVariant('Success')).toBe('positive');
        expect(getStatusVariant('Mining')).toBe('info');
        expect(getStatusVariant('CollectingSignaturePool')).toBe('info');
        expect(getStatusVariant('None')).toBe('notice');
    });
});
