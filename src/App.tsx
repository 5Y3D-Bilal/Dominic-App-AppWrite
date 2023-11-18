import AuthLayOut from "./_auth/AuthLayOut";
import "./globle.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import SignupForm from "./_auth/froms/SignupForm";
import SignInForm from "./_auth/froms/SigninForm";
import RootLayout from "./_root/RootLayout";
import { Home } from "lucide-react";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import MainHomePage from "./_root/pages/Home";

const App = () => {
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          <Route element={<AuthLayOut />}>
            <Route path="/sign-up" element={<SignupForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route index path="/" element={<MainHomePage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    </>
  );
};

export default App;
