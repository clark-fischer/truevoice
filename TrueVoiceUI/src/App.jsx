import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";



//layout and pages
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Colorado from "./pages/Colorado";
import Nevada from "./pages/Nevada";

import OpportunityRepresentativesPlot from "./graphs/opportunityRepresentativePlot";
import OpportunityDistrictsPlot from "./graphs/opportunityDistrictPlot";
import EnsembleBoxAndWhiskerPlot from "./graphs/EnsembleBoxAndWhiskerPlot";
import PartySplitBarPlot from "./graphs/PartySplitBarPlot";
import VoteSeatSharePlotPlanSpecific from "./graphs/VoteSeatSharePlotPlanSpecific";


//router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="colorado" element={<Colorado />} />
      <Route path="nevada" element={<Nevada />} />
      <Route path="box" element={<EnsembleBoxAndWhiskerPlot fips={"NV"} electionType={"SMD"}   />} />
      <Route path="voteSeat" element={<VoteSeatSharePlotPlanSpecific fips={'NV'} electionType={'SMD'} characteristic={"REPFAVORED"}  />} />

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
