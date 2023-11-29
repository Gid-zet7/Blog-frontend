import { useState, useEffect } from "react";
import { useUpdatePostMutation, useDeletePostMutation } from "./postsApiSlice";
import { useNavigate } from "react-router-dom";
import PostPreview from "./PostPreview";

const EditPostForm = ({ post, users }) => {
  const [updatePost, { isLoading, isSuccess, isError, error }] =
    useUpdatePostMutation();

  const [
    deletePost,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.username);
  const [body, setBody] = useState(post.body);
  const [displayImage, setDisplayImage] = useState(post.image.url);
  const [displayImageOwner, setDisplayImageOwner] = useState(post.image.owner);
  const [displayImageSource, setDisplayImageSource] = useState(
    post.image.source
  );
  const [category, setCategory] = useState(post.category);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setAuthor("");
      setBody("");
      setDisplayImage("");
      setDisplayImageOwner("");
      setDisplayImageSource("");
      setCategory("");
      navigate("/dash/posts");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onAuthorChanged = (e) => setAuthor(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onDisplayImageChanged = (e) => setDisplayImage(e.target.value);
  const onDisplayImageOwnerChanged = (e) =>
    setDisplayImageOwner(e.target.value);
  const onDisplayImageSourceChanged = (e) =>
    setDisplayImageSource(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  const onDeletePostClicked = async () => {
    await deletePost({ id: post.id });
  };
  const onPreviewChanged = () => {
    setPreview((prevState) => !prevState);
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.username}>
        {user.username}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const canSave = [title, author, body, category].every(Boolean) && !isLoading;

  const image = {
    url: displayImage,
    owner: displayImageOwner,
    source: displayImageSource,
  };

  const onSavePostClicked = async (e) => {
    e.preventDefault();

    await updatePost({
      id: post.id,
      title,
      author,
      image,
      body,
      category,
    });
  };

  const content = (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Edit Post</h2>
      </div>
      <p className={errClass}>{errContent}</p>
      <section id="edit_form" className="post__form">
        <form className="form" onSubmit={onSavePostClicked}>
          <label className="form__label" htmlFor="title">
            Title:
          </label>
          <input
            className={"form__input form__input--text"}
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={onTitleChanged}
          />

          <label className="form__label" htmlFor="author">
            Author:
          </label>
          <select
            className={`form__input`}
            id="author"
            name="author"
            value={author}
            onChange={onAuthorChanged}
          >
            {options}
          </select>

          <label className="form__label" htmlFor="display-image.url">
            Display Image Url:
          </label>
          <input
            id="dispaly-image"
            name="dispaly-image.url"
            className="form__input"
            type="text"
            value={displayImage}
            onChange={onDisplayImageChanged}
          ></input>

          <label htmlFor="dispaly-image.owner">Display Image Owner:</label>
          <input
            className={`form__input`}
            id="owner"
            name="dispaly-image.owner"
            type="text"
            value={displayImageOwner}
            onChange={onDisplayImageOwnerChanged}
          />

          <label htmlFor="dispaly-image.source">Display Image Source:</label>
          <input
            className={`form__input`}
            id="source"
            name="dispaly-image.source"
            type="text"
            value={displayImageSource}
            onChange={onDisplayImageSourceChanged}
          />

          <label htmlFor="body">Body:</label>
          <textarea
            className={`form__input`}
            id="body"
            name="body"
            type="text"
            value={body}
            onChange={onBodyChanged}
          />

          <label className="form__label" htmlFor="category">
            Category:
          </label>
          <input
            className={"form__input form__input--text"}
            id="category"
            type="text"
            name="category"
            value={category}
            onChange={onCategoryChanged}
          />

          <div className="button_div">
            <button
              id="form__action-buttons"
              className="save-btn"
              type="submit"
              title="Save"
              disabled={!canSave}
            >
              Save
            </button>

            <button
              type="button"
              title="Delete"
              id="delete-post__btn"
              onClick={onDeletePostClicked}
            >
              Delete
            </button>
          </div>

          <div className="button_container">
            <button
              id="preview-button"
              className="btn"
              title="Save"
              type="button"
              value={preview}
              onClick={onPreviewChanged}
            >
              Preview
            </button>
          </div>
        </form>

        {preview && (
          <section className="preview">
            <PostPreview
              title={title}
              author={author}
              url={displayImage}
              owner={displayImageOwner}
              source={displayImageSource}
              body={body}
              category={category}
            />
          </section>
        )}
      </section>
    </>
  );

  return content;
};

export default EditPostForm;
