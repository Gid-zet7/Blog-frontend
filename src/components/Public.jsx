import { Link } from "react-router-dom";

const Public = () => {
  let content = (
    <>
      <p>Welcome to the Blog</p>
      <div className="Public">
        <button>
          <Link to={"/login"}>Login</Link>
        </button>
        <button>
          <Link to={"/signup"}>Sign up</Link>
        </button>
      </div>
    </>
  );
  return content;
};

export default Public;
