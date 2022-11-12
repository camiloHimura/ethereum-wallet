import './App.scss';

import { Mint } from './components/mint/Mint';
import { Profile } from './components/profile/Profile';
import { Transfer } from './components/transfer/Transfer';

function App() {
    return (
        <>
            <h1>My App</h1>
            <Profile />
            <Transfer />
            <Mint />
        </>
    );
}

export default App;
