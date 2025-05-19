// src/components/BlogList.jsx

import BlogCard from './BlogCard';

const BlogList = ({ blogs, type }) => {
  const filtered = blogs.filter(blog => blog.status === type);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>{type === 'published' ? 'Published Blogs' : 'Drafts'}</h2>
      {filtered.length > 0 ? (
        filtered.map(blog => <BlogCard key={blog._id} blog={blog} />)
      ) : (
        <p>No {type} blogs found.</p>
      )}
    </div>
  );
};

export default BlogList;