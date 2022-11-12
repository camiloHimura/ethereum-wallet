import './App.scss';

import { Profile } from './components/profile/Profile';
import { Transfer } from './components/transfer/Transfer';

function App() {
    return (
        <>
            <h1>My App</h1>
            <Profile />
            <Transfer />
        </>
    );
}

export default App;
