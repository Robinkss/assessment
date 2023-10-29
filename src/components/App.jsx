import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import "../styles/app.css";

function App() {

/*   const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory); */

  return (
    <div>
      <PostList></PostList>
      {/* Add pagination component here */}
    </div>
  );
}

export default App;
