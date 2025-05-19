const BlogCard = ({ blog }) => {
  return (
    <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      {/* <p>Status: {blog.status}</p> */}
    </div>
  );
};

export default BlogCard;