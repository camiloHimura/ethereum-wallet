import './App.scss';

import { Content, Flex } from '@adobe/react-spectrum';
import { useEthers } from '@usedapp/core';

import { Mint } from './components/mint/Mint';
import { Profile } from './components/profile/Profile';
import { Transfer } from './components/transfer/Transfer';

function App() {
    const { account } = useEthers();

    return (
        <Content width={'80%'} margin={'auto'} minHeight={'100vh'} UNSAFE_style={{ paddingTop: '20px' }}>
            <Profile />
            {account && (
                <Flex justifyContent={'space-around'} gap={'size-250'}>
                    <Transfer />
                    <Mint />
                </Flex>
            )}
        </Content>
    );
}

export default App;
