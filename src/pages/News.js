import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const News = () => {
    return (
        <div className="news-container">
            <Navigation />
            <Logo />
            <h1>News</h1>

            <form>
                <input type="text" placeholder="Nom"/>
                <textaera placeholder="Message"></textaera>
                <input type="submit"/>
            </form>
            <ul>
                <li></li>
            </ul>
        </div>
    );
};

export default News;