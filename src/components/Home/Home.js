import React from 'react';
import Header from '../Header/Header';
import Survice from '../Survice/Survice';
import './Home.css'

const Home = () => {
    return (
        <div className="Home">
            <Header></Header>
            <Survice></Survice>
        </div>
    );
};

export default Home;