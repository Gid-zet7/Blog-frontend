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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* Protected Routes */}
        <Route path="dash" element={<DashLayout />}>
          <Route index path="welcome" element={<Welcome />} />

          <Route path="posts">
            <Route index element={<PostsList />} />
            <Route path="new" element={<NewPost />} />
            <Route path=":id" element={<EditPost />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="new" element={<NewUserForm />} />
            <Route path=":id" element={<EditUser />} />
          </Route>
        </Route>
        {/* End of dash route */}
      </Route>
    </Routes>
  );
}

export default App;
