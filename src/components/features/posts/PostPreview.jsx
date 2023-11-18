const PostPreview = ({ title, author, url, owner, source, body, category }) => {
  return (
    <>
      <div>
        <h1>Preview</h1>
      </div>
      <div>
        <div className="title">
          <h1>{title}</h1>
          <p>by {author}</p>
        </div>
        <div className="image-container">
          <img src={url} alt="display" />
          {/* ?not-from-cache-please */}
          {/* crossOrigin="Anonymous" */}
          <p>
            Photo by {owner} from {source}
          </p>
        </div>
        <div className="body">
          <p>{body} </p>
        </div>
        <div>
          <h4>{category} </h4>
        </div>
      </div>
    </>
  );
};

export default PostPreview;
