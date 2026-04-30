import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import ManageAlerts from './ManageAlerts';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/manage" element={<ManageAlerts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;