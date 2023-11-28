/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewCommentMutation } from "./CommentsApiSlice";

const NewCommentForm = ({ username, postId }) => {
  const [addNewComment, { isLoading, isSuccess, isError, error }] =
    useAddNewCommentMutation();

  const navigate = useNavigate();

  const [content, setContent] = useState("");

  //   const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setContent("");
      navigate("/dash/posts");
    }
  }, [isSuccess, navigate]);

  //   const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const canSave = [content].every(Boolean) && !isLoading;

  const onSavePostClicked = async (e) => {
    e.preventDefault();

    await addNewComment({
      postId,
      content,
      author: username,
    });
  };

  //   const options = users.map((user) => {
  //     return (
  //       <option key={user.id} value={user.username}>
  //         {user.username}
  //       </option>
  //     );
  //   });

  const errClass = isError ? "errmsg" : "offscreen";

  const errContent = error?.data?.message ?? "";

  //   const validBillClass = !bill ? "form__input--incomplete" : "";
  // const validBalanceClass = !balance ? "form__input--incomplete" : ''

  const formContent = (
    <>
      <section id="new_forms">
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={onSavePostClicked}>
          <input
            className={"form__input form__input--text"}
            id="title"
            name="title"
            type="text"
            placeholder="comment on this post..."
            value={content}
            onChange={onContentChanged}
          />

          <div className="button_div">
            <button
              id="form__action-buttons"
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );

  return formContent;
};

export default NewCommentForm;
