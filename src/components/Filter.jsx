import React from 'react';

function Filter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div>
      <label htmlFor="categoryFilter">Filter by Category:</label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
