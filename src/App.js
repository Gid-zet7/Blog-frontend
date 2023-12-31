import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./components/features/auth/Welcome";
import PostsList from "./components/features/posts/PostsList";
import UsersList from "./components/features/users/UsersList";
import NewPost from "./components/features/posts/NewPost";
import NewUserForm from "./components/features/users/NewUserForm";
import EditUser from "./components/features/users/EditUser";
import EditPost from "./components/features/posts/EditPost";
import ViewPost from "./components/features/posts/ViewPost";
import Prefetch from "./components/features/auth/Prefetch";
import PersistLogin from "./components/features/auth/PersistLogin";
import RequireAuth from "./components/features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import Signup from "./components/features/auth/Signup";
import ViewPubPost from "./components/features/posts/ViewPubPost";
import MyPostsList from "./components/features/posts/MyPostsList";

function App() {
  useTitle("Bincika");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="posts/:id" element={<ViewPubPost />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index path="welcome" element={<Welcome />} />

                <Route path="posts">
                  <Route index element={<PostsList />} />
                  <Route path="myposts" element={<MyPostsList />} />
                  <Route path="new" element={<NewPost />} />
                  <Route path=":id" element={<EditPost />} />
                  <Route path="view/:id" element={<ViewPost />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path="new" element={<NewUserForm />} />
                    <Route path=":id" element={<EditUser />} />
                  </Route>
                </Route>
              </Route>
              {/* End of dash route */}
            </Route>
          </Route>
        </Route>
      </Route>
      {/* End of protected Routes */}
    </Routes>
  );
}

export default App;
