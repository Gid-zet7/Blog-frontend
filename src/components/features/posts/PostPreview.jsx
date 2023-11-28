import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const PostPreview = ({ title, author, url, owner, source, body, category }) => {
  return (
    <>
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>Preview</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div style={{ padding: "1rem" }}>
          <h1>Title: {title} </h1>
        </div>
        <div className="image-container">
          <img
            src={url}
            alt="something"
            style={{ width: "100%", height: "100%" }}
          />
          <p>
            <p style={{ fontSize: ".6rem" }}>
              Photo by
              <span style={{ color: "steelblue" }}> {owner} </span>
              from
              <span style={{ color: "steelblue" }}> {source}</span>
            </p>
          </p>
        </div>
        <div className="body" style={{ padding: "1rem" }}>
          <p>{body} </p>
        </div>
        <p>
          <FontAwesomeIcon icon={faUser} /> {author}
        </p>
        <div>
          <h4>#{category} </h4>
        </div>
      </div>
    </>
  );
};

export default PostPreview;
