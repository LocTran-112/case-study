const Post = (props) => {
    const { post, onItemClicked } = props;
  
    const selectPost = () => {
      onItemClicked(post);
    };
  
    return (
      <div className="post" onClick={selectPost}>
        <img src={`${post.image}`} alt={`${post.created_by} - ${post.created_date}`}/>
      </div>
    );
  };
  export default Post;