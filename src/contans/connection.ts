import { Config, Goerli } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';

export const config: Config = {
    readOnlyChainId: Goerli.chainId,
    readOnlyUrls: {
        [Goerli.chainId]: getDefaultProvider('goerli'),
    },
};
