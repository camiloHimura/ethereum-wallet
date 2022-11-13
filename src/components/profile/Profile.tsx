import './Profile.scss';

import { useEffect, useState } from 'react';

import { Heading, Flex, Content, Button, Divider, Text, View, Well } from '@adobe/react-spectrum';
import { formatEther } from '@ethersproject/units';
import { useEthers, NodeUrls, useEtherBalance, useTokenBalance } from '@usedapp/core';

import { config } from '../../contans/connection';
import { contractAddress } from '../../contans/token';
import { reloadPage } from '../../utils/index';

export const Profile = () => {
    const { activateBrowserWallet, deactivate, active, account, chainId, error, isLoading } = useEthers();
    const daiBalance = useTokenBalance(contractAddress, account);
    const etherBalance = useEtherBalance(account);
    const [activateError, setActivateError] = useState<null | string>(null);

    const isInvalidNetwork = !chainId || !(config.readOnlyUrls as NodeUrls)[chainId];
    const balaceMessage = etherBalance ? `Ether balance: ${formatEther(etherBalance)} ETH` : 'Requesting balance...';

    useEffect(() => {
        error && setActivateError(error.message);
        !error && activateError && setActivateError(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    if (active && isInvalidNetwork) {
        return <Well>Please use Goerli testnet.</Well>;
    }

    return (
        <View borderWidth='thin' borderColor='dark' borderRadius='medium' padding='size-250'>
            <Heading level={2}>Profile</Heading>

            <Flex direction='row' gap='size-250'>
                <Flex alignItems={'center'}>
                    {!account && (
                        <Button
                            variant='primary'
                            isDisabled={isLoading}
                            onPress={() => {
                                setActivateError(null);
                                activateBrowserWallet();
                            }}
                        >
                            Connect
                        </Button>
                    )}

                    {account && (
                        <Button
                            variant='primary'
                            onPress={() => {
                                deactivate();
                                reloadPage();
                            }}
                        >
                            Deactivate
                        </Button>
                    )}
                </Flex>
                <Content>
                    {account && (
                        <>
                            <Text>Account: {account}</Text>
                            <Divider size='S' />
                            <Text>{balaceMessage}</Text>
                        </>
                    )}

                    {daiBalance && (
                        <>
                            <Divider size='S' />
                            <Text>contract balance: {formatEther(daiBalance)}</Text>
                        </>
                    )}
                </Content>
            </Flex>

            {activateError && <Well marginTop={'size-250'}>{activateError}</Well>}
        </View>
    );
};
