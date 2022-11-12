import './Profile.scss';

import { formatEther } from '@ethersproject/units';
import { useEthers, NodeUrls, useEtherBalance, useTokenBalance } from '@usedapp/core';

import { config } from '../../contans/connection';
import { contractAddress } from '../../contans/token';
import { reloadPage } from '../../utils/index';

export const Profile = () => {
    const { activateBrowserWallet, deactivate, active, account, chainId, error } = useEthers();
    const etherBalance = useEtherBalance(account);
    const daiBalance = useTokenBalance(contractAddress, account);
    const isInvalidNetwork = !chainId || !(config.readOnlyUrls as NodeUrls)[chainId];
    /* console.log('error', error);
    console.log('active', active);
    console.log('daiBalance', daiBalance); */

    if (active && isInvalidNetwork) {
        return <p>Please use Goerli testnet.</p>;
    }

    return (
        <div className='profile'>
            <h2>Profile</h2>
            {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}

            {account && (
                <button
                    onClick={() => {
                        deactivate();
                        reloadPage();
                    }}
                >
                    Deactivate
                </button>
            )}

            {account && <p>Account: {account}</p>}

            {etherBalance && (
                <div className='balance'>
                    Ether balance:
                    <p className='bold'>{formatEther(etherBalance)} ETH</p>
                </div>
            )}

            {daiBalance && (
                <div className='balance'>
                    contract balance:
                    <p className='bold'>{formatEther(daiBalance)}</p>
                </div>
            )}
        </div>
    );
};
