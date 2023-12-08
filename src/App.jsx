import Home from "./COMPONENTS/HOME/Home";
import Layout from "./COMPONENTS/LAYOUT/Layout";
import SignInUp from "./COMPONENTS/SIGN-IN-UP/sign_in_up";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="signInUp" element={<SignInUp />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
