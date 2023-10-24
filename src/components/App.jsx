import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PostList from './PostList';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Initial category filter

  useEffect(() => {
    // Effect to fetch data from the mock API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        //console.log('data', data["posts"][0]);
        
        setPosts(data['posts']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []); // Run only once on component mount

/*   const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory); */

  return (
    <div>
      <h1>Post List</h1>
      <p>Showing {posts.length} posts</p>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      {/* Add pagination component here */}
    </div>
  );
}

export default App;
