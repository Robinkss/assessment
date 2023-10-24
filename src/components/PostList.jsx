import React from 'react';

function PostList({ posts }) {
  if (posts.length === 0) {
    return <div>No posts to display.</div>;
  }

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>Category: {post.category}</p>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
