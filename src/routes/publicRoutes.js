import { Navigate, Route } from "react-router-dom";

import RootLayout from "../layouts/root";
import Home from '../pages/other/home'
import SignIn from "../pages/authentication/signin";
import SignUp from "../pages/authentication/signup";


const publicRoutes = (
  <>
    <Route path="/" element={<RootLayout />}>
       <Route index element={<Home />} />
    </Route>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="*" element={<Navigate to="/" />} />
  </>
);

export default publicRoutes;
