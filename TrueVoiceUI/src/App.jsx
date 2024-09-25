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

//router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="bgInfo" element={<BgInfo />} />
      <Route path="profile" element={<Profile />} />
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
