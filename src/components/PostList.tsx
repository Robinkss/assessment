import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/postList.css";
import "../interfaces/Post";



function PostList() {
  const [posts, setPosts] = useState<Post[]>([]); // All posts from the mock API
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // Category selected in the filter
  const [categories, setCategories] = useState<Set<string>>(new Set()); // All categories from the mock API
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]); // Posts to display after applying the category filter
  const [visiblePostsCount, setVisiblePostsCount] = useState<number>(5); // number of posts to display by default


  // fetch all categories from the mock API
  const fetchAllCategories = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      let categoriesSet = new Set<string>(); //will contained all categories names, set allows to avoid duplicates
      data["posts"].map((post:Post) => (
        post.categories.map(category =>(
          categoriesSet.add(category.name)
        ))
      ))     
      setCategories(categoriesSet);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // fetch all posts from the mock API
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

  // Display a message if there are no posts
  if (posts.length === 0) {
    return <div>No posts to display.</div>;
  }

  
  // Load more posts when clicking on the button linked to this function
  const handleLoadMore = () => {
    setVisiblePostsCount(visiblePostsCount + 5); // Load 5 more posts
  }
  


  return (
    <div className='list-container'>
      <div className='categoryFilter'>
          <label htmlFor="filter">Filter by category:</label>
          <select name='filter' onChange={(e) => setSelectedCategory(e.target.value)}>    
            <option value="all">All</option>
            {categories && Array.from(categories).map(category => 
              <option key={category} value={category}>{category}</option>
            )}
          </select>
      </div>
      <ul className='posts-list'>
      {selectedCategory === 'all'
        ? displayedPosts.slice(0, visiblePostsCount).map(post => (
            <li key={post.id}>
              <h2>Title: {post.title}</h2>
              <p>Author: {post.author.name}</p>
              <Link to={`/${post.id}`} className='detail-link'>More details</Link>
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
                    <Link to={`/${post.id}`} className='detail-link'>More details</Link>
                  </li>
                );
              }
              return null;
            });
          })}
        </ul>
        {visiblePostsCount < displayedPosts.length && (
          <button className='load-button' onClick={handleLoadMore}>Load more</button>
        )}
    </div>
    
  );
}

export default PostList;
