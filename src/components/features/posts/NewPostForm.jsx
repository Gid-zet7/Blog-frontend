/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsApiSlice";
import PostPreview from "./PostPreview";

const NewPostForm = ({ users }) => {
  const [addNewPost, { isLoading, isSuccess, isError, error }] =
    useAddNewPostMutation();

  const navigate = useNavigate();

  const [userId, setUserId] = useState(users);
  const [title, setTitle] = useState("Set Title");
  const [author, setAuthor] = useState("Unknown");
  const [body, setBody] = useState("speak your mind here");
  const [displayImage, setDisplayImage] = useState(
    "https://images.unsplash.com/random"
  );
  const [displayImageOwner, setDisplayImageOwner] = useState("Daniela Beleva");
  const [displayImageSource, setDisplayImageSource] = useState("Unsplash");
  const [category, setCategory] = useState("not known");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setUserId("");
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

  const onUserIdChanged = (e) => setUserId(e.target.value);
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

  const canSave =
    [
      userId,
      title,
      author,
      body,
      displayImage,
      displayImageOwner,
      displayImageSource,
      category,
    ].every(Boolean) && !isLoading;

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

  //   const errClass = isError ? "errmsg" : "offscreen";
  //   const validBillClass = !bill ? "form__input--incomplete" : "";
  // const validBalanceClass = !balance ? "form__input--incomplete" : ''

  const content = (
    <>
      <section id="new_forms">
        <h2>New Bill</h2>
        {/* <p className={errClass}>{error?.data?.message}</p> */}

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
              className="icon-button"
              title="Save"
              //   disabled={!canSave}
            >
              Save
            </button>
          </div>
        </form>
        <div className="button_div">
          <button
            id="preview-button"
            className="icon-button"
            title="Save"
            value={preview}
            onClick={onPreviewChanged}
          >
            Preview
          </button>
        </div>
      </section>
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
    </>
  );

  return content;
};

export default NewPostForm;
