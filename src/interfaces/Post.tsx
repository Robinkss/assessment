

// Post interface
// This interface is used to type the data fetched from the mock API
interface Post {
    id: string;
    title: string;
    publishDate: string;
    summary: string;
    categories: { id: string; name: string }[];
    author: { name: string; avatar: string };
    
  }