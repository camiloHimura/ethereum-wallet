import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEthers, useEtherBalance, Web3Ethers } from '@usedapp/core';

import { reloadPage } from '../../utils/index';
import { Profile } from './Profile';

jest.mock('@usedapp/core', () => ({
    ...jest.requireActual('@usedapp/core'),
    useEthers: jest.fn(),
    useEtherBalance: jest.fn(() => ({ _hex: '0x04292165078062b6', _isBigNumber: true })),
}));

jest.mock('../../utils/index', () => ({
    ...jest.requireActual('../../utils/index'),
    reloadPage: jest.fn(),
}));

const goerliChainId = 5;
const mockUseEthers = (props: Partial<Web3Ethers>): Web3Ethers => {
    return {
        activate: jest.fn(),
        setError: jest.fn(),
        deactivate: jest.fn(),
        connector: undefined,
        active: true,
        activateBrowserWallet: jest.fn(),
        isLoading: false,
        switchNetwork: jest.fn(),
        ...props,
    };
};
describe('Profile', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('invalid network', async () => {
        jest.mocked(useEthers).mockReturnValue(mockUseEthers({ active: true }));

        render(
            <Provider theme={defaultTheme}>
                <Profile />
            </Provider>
        );

        expect(screen.getByText(/Please use Goerli testnet/i)).toBeVisible();
    });

    it('shows connection option', async () => {
        const mockedEthers = mockUseEthers(mockUseEthers({ active: true, chainId: goerliChainId }));
        jest.mocked(useEthers).mockReturnValue(mockedEthers);

        render(
            <Provider theme={defaultTheme}>
                <Profile />
            </Provider>
        );

        const connectButton = screen.getByRole('button', { name: /connect/i });
        expect(connectButton).toBeVisible();
        userEvent.click(connectButton);

        expect(mockedEthers.activateBrowserWallet).toHaveBeenCalled();
    });

    it('shows account number and balance', async () => {
        const testAccount = '0xBb8D49a7B8c0C0aca44D84C15AeEBAEE31';
        jest.mocked(useEthers).mockReturnValue(
            mockUseEthers({ active: true, chainId: goerliChainId, account: testAccount })
        );

        render(
            <Provider theme={defaultTheme}>
                <Profile />
            </Provider>
        );

        expect(screen.getByText(`Account: ${testAccount}`)).toBeVisible();
        expect(screen.getByRole('button', { name: /deactivate/i })).toBeVisible();
        expect(screen.getByText(/requesting balance.../i)).toBeVisible();
        expect(useEtherBalance).toHaveBeenCalledWith(testAccount);
    });

    it('deactivate reloads the page', async () => {
        const testAccount = '0xBb8D49a7B8c0C0aca44D84C15AeEBAEE31';
        const mockedEthers = mockUseEthers({ active: true, chainId: goerliChainId, account: testAccount });
        jest.mocked(useEthers).mockReturnValue(mockedEthers);

        render(
            <Provider theme={defaultTheme}>
                <Profile />
            </Provider>
        );

        const deactivateButton = screen.queryByRole('button', { name: /deactivate/i });
        expect(deactivateButton).toBeVisible();
        userEvent.click(deactivateButton as HTMLElement);

        expect(reloadPage).toHaveBeenCalled();
        expect(mockedEthers.deactivate).toHaveBeenCalled();
    });

    it('shows error', async () => {
        const testAccount = '0xBb8D49a7B8c0C0aca44D84C15AeEBAEE31';
        const testErrorMessage = 'this is an error test message';
        jest.mocked(useEthers).mockReturnValue(
            mockUseEthers({
                active: true,
                chainId: goerliChainId,
                account: testAccount,
                error: { name: 'test', message: testErrorMessage },
            })
        );

        render(
            <Provider theme={defaultTheme}>
                <Profile />
            </Provider>
        );

        expect(screen.getByText(testErrorMessage)).toBeVisible();
    });
});
