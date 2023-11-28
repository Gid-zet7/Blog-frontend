/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsApiSlice";
import PostPreview from "./PostPreview";

const NewPostForm = ({ users }) => {
  const [addNewPost, { isLoading, isSuccess, isError, error }] =
    useAddNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("Set Title");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("speak your mind here");
  const [displayImage, setDisplayImage] = useState(
    "https://source.unsplash.com/nDDVQzkc_fc"
  );
  const [displayImageOwner, setDisplayImageOwner] = useState("Daniela Beleva");
  const [displayImageSource, setDisplayImageSource] = useState("Unsplash");
  const [category, setCategory] = useState("not known");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setAuthor("");
      setBody("");
      setDisplayImage("");
      setDisplayImageOwner("");
      setDisplayImageSource("");
      setCategory("");
      navigate("/dash/posts");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onAuthorChanged = (e) => setAuthor(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onDisplayImageChanged = (e) => setDisplayImage(e.target.value);
  const onDisplayImageOwnerChanged = (e) =>
    setDisplayImageOwner(e.target.value);
  const onDisplayImageSourceChanged = (e) =>
    setDisplayImageSource(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  const onPreviewChanged = () => {
    setPreview((prevState) => !prevState);
  };

  const canSave = [title, author, body, category].every(Boolean) && !isLoading;

  const image = {
    url: displayImage,
    owner: displayImageOwner,
    source: displayImageSource,
  };

  const onSavePostClicked = async (e) => {
    console.log("Clicked");
    e.preventDefault();

    await addNewPost({
      title,
      author,
      image,
      body,
      category,
    });
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.username}>
        {user.username}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";

  const errContent = error?.data?.message ?? "";

  //   const validBillClass = !bill ? "form__input--incomplete" : "";
  // const validBalanceClass = !balance ? "form__input--incomplete" : ''

  const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const content = (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>New Post</h2>
      </div>
      <section id="new_form" className="new-post__form">
        <form className="form" onSubmit={onSavePostClicked}>
          <p className={errClass}>{errContent}</p>
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
            <option>--Please select--</option>
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

          <div className="save-btn__container" style={buttonContainer}>
            <button
              id="form__action-buttons"
              className="save-btn"
              title="Save"
              disabled={!canSave}
            >
              Save
            </button>
          </div>
          <div className="preview-btn__container" style={buttonContainer}>
            <button
              id="preview-button"
              className="btn"
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

export default NewPostForm;
