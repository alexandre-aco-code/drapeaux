import React, { useState } from "react";
import axios from "axios";

const Article = ({ article }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
        return newDate;
    };

    const handleEdit = () => {
        const data = {
            author: article.author,
            content: editedContent ? editedContent : article.content,
            date: article.date,
        };
        // on met put pour edit et l'id de l'article obligé
        axios
            .put("http://localhost:3004/articles/" + article.id, data)
            .then(() => {
                setIsEditing(false)
            });

    };

    return (
        <div className="article" style={{background : isEditing ? "#f3feff" : "white"}}>
            <div className="card-header">
                <h3>{article.author}</h3>
                <em>Posté le {dateParser(article.date)}</em>
            </div>
            {isEditing ? (
                <textarea
                    autoFocus
                    onChange={(e) => setEditedContent(e.target.value)}
                    defaultValue={
                        editedContent ? editedContent : article.content
                    }
                ></textarea>
            ) : (
                <p>{editedContent ? editedContent : article.content}</p>
            )}

            <div className="btn-container">
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                ) : (
                    <button onClick={handleEdit}>Valider</button>
                )}
                <button>Delete</button>
            </div>
        </div>
    );
};

export default Article;
