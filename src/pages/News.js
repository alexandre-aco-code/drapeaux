import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";
import { getAllByPlaceholderText } from "@testing-library/react";

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios
            .get("http://localhost:3004/articles")
            .then((res) => setNewsData(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:3004/articles", {
                author,
                content,
                date: Date.now(),
            })
            .then(() => {
                setAuthor("");
                setContent("");
                getData();
            })
    };

    return (
        <div className="news-container">
            <Navigation />
            <Logo />
            <h1>News</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(e) => setAuthor(e.target.value)}
                    type="text"
                    placeholder="Nom"
                    value={author}
                />
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Message"
                    value={content}
                ></textarea>
                <input type="submit" value="Envoyer" />
            </form>

            <ul>
                {newsData
                    .sort((a, b) => b.date - a.date)
                    .map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
            </ul>
        </div>
    );
};

export default News;
