import React, { useEffect, useState } from 'react';

import "../styles/postList.css";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Initial category filter
  const [categories, setCategories] = useState(new Set());
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [visiblePostsCount, setVisiblePostsCount] = useState(5); // Nombre de posts à afficher à la fois


  const fetchAllCategories = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      let categoriesSet = new Set(); //will contained all categories names
      data["posts"].map(post => (
        post.categories.map(category =>(
          categoriesSet.add(category.name)
        ))
      ))     
      setCategories(categoriesSet);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


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

  useEffect(() => {
    // update displayed posts when selectedCategory change
    if (selectedCategory === 'all') {
      setDisplayedPosts(posts);
    } else {
      const filteredPosts = posts.filter(post => post.categories.some(category => category.name === selectedCategory));
      setDisplayedPosts(filteredPosts);
    }
    setVisiblePostsCount(5);
  }, [selectedCategory, posts]); // Run when selectedCategory changes

  useEffect(() => {
    // Effect to fetch data from the mock API 
    fetchData();
    fetchAllCategories();
  }, []); // Run only once on component mount
  if (posts.length === 0) {
    return <div>No posts to display.</div>;
  }

  const handleLoadMore = () => {
    setVisiblePostsCount(visiblePostsCount + 5); // Load 5 more posts
  }
  

  const getGategoriesList = () => {
    return Array.from(categories).map(category => 
      <div>{category}</div>
    )
  }

  return (
    <div className='list-container'>
      <div className='categoryFilter'>
          {/* {getGategoriesList()} */}
          <label for="filter">Filter by category:</label>
          <select name='filter' onChange={(e) => setSelectedCategory(e.target.value)}>    
            <option value="all">All</option>
            {categories && Array.from(categories).map(category => 
              <option key={category} value={category}>{category}</option>
            )}
          </select>
      </div>
      <ul>
      {selectedCategory === 'all'
        ? displayedPosts.slice(0, visiblePostsCount).map(post => (
            <li key={post.id}>
              <h2>Title: {post.title}</h2>
              <p>Author: {post.author.name}</p>
            </li>
          ))
        : displayedPosts.slice(0, visiblePostsCount).map(post => {
            let isAdded = false;  //to avoid duplicate posts
            return post.categories.map(category => {        
              if (category.name === selectedCategory && !isAdded) {
                console.log('isAdded', isAdded);
                isAdded = true; 
                return (
                  <li key={post.id}>
                    <h2>Title: {post.title}</h2>
                    <p>Author: {post.author.name}</p>
                  </li>
                );
              }
              return null;
            });
          })}
        </ul>
        {visiblePostsCount < displayedPosts.length && (
          <button onClick={handleLoadMore}>Load more</button>
        )}
    </div>
    
  );
}

export default PostList;
