import Home from './components/Home';
import ActivityTable from './components/ActivityTable';
import CardsView from './components/CardsView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/activity" element={ <ActivityTable /> } />
                    <Route path="/activity/cards" element={ <CardsView /> } />
                </Routes>
            </BrowserRouter>
        </>
  );
}

export default App;
