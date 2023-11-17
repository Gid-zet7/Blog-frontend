import { Link } from "react-router-dom";

const DashHeader = () => {
  const content = (
    <>
      {/* <p className={errClass}>{error?.data?.message} </p> */}

      <header className="dash_header">
        <div className="dash-header__container">
          <Link to="/dash/posts">
            <h1 className="dash-header__title">Blog Posts</h1>
          </Link>
          <nav className="dash-header__nav"></nav>
        </div>
      </header>
    </>
  );

  return content;
};

export default DashHeader;
