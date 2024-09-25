import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

//Leaflet/Map
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//layout and pages
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import BgInfo from "./pages/BgInfo";
import Profile from "./pages/Profile";
import Utah from "./pages/Utah";
import Colorado from "./pages/Colorado";
import Nevada from "./pages/Nevada";

//router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="bgInfo" element={<BgInfo />} />
      <Route path="profile" element={<Profile />} />
      <Route path="ut" element={<Utah />} />
      <Route path="co" element={<Colorado />} />
      <Route path="nv" element={<Nevada />} />
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
