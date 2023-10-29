import React, { useEffect, useState } from 'react';
import "../interfaces/Post";
import "../styles/detailedPost.css"
import { useParams, useLocation } from 'react-router-dom';

function DetailedPost() {
    const [post, setPost] = useState<Post>(); // Post to display
    const {postId} = useParams(); // Get the id from the url

    // fetch the post with the id from the url
    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/posts`);
            const data = await response.json();
            data["posts"].map((post:Post) => {
                console.log(post.id);
                console.log(postId);
                if (post.id === postId) {
                    setPost(post);
                }
            })
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    // run fetchPost when the postId changes
    useEffect(() => {
        fetchPost();
    }, [postId]);
    
    
    
    return (
        <div>
            
            {post ?
            <div className='post-container'>
                <button className='back-button' onClick={() => window.history.back()}>Back</button>
                <h1>Title: {post.title}</h1>
                <p>Summary: {post.summary}</p>
                <h3>Categories:</h3>
                <ul>
                    {post.categories.map(category => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
                <div className='author-section'>
                    <p>Author: {post.author.name}</p>
                    <p>Publish date: {post.publishDate}</p>
                </div>
            </div>        
            : 
            <p>Post not found</p>
            }
        
        </div>
    );
}

export default DetailedPost;