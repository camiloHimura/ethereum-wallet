import './App.scss';

import { Content } from '@adobe/react-spectrum';

import { Mint } from './components/mint/Mint';
import { Profile } from './components/profile/Profile';
import { Transfer } from './components/transfer/Transfer';

function App() {
    return (
        <Content width={'80%'} margin={'auto'} minHeight={'100vh'} UNSAFE_style={{ paddingTop: '20px' }}>
            <Profile />
            <Transfer />
            <Mint />
        </Content>
    );
}

export default App;
