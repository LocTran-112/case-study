const Post = (props) => {
    const { post, onItemClicked } = props;
  
    const selectPost = () => {
      onItemClicked(post);
    };
  
    return (
      <div className="post" onClick={selectPost}>
        <img src={`https://6499a33d79fbe9bcf83faadd.mockapi.io/post${post.content}`} alt={`${post.created_by} - ${post.created_date}`}/>
      </div>
    );
  };
  export default Post;