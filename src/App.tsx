import React from 'react';
import Header from './components/Header';
import Comic from './components/Comic';

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <Comic />
        </div>
    );
};

export default App;
