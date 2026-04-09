import styles from '../styles/BlogCard.module.css'; // Assuming you have a CSS module for styling

const BlogCard = ({ blog, isExpanded }) => {
  return (
    <div className={styles.blogCard}>
      <h3>{blog.title}</h3>
      <p className={isExpanded ? styles.expandedText : styles.clampedText}>
        {blog.content}
      </p>
      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
        <p className={styles.metadataText}>
          <strong>Tags :</strong> {blog.tags.join(', ')}
        </p>
      )}
    </div>
  );
};

export default BlogCard;