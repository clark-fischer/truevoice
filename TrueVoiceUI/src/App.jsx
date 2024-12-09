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
import VoteShareSeatSharePlot from "./pages/VoteSharePlot";
import OpportunityRepresentativesPlot from "./pages/opportunityRepresentativePlot";
import OpportunityDistrictsPlot from "./pages/OpportunityDistrictPlot";
import EnsembleSMDboxAndWhiskerPlot from "./pages/EnsembleSMDboxAndWhiskerPlot";
import PartySplitBarPlot from "./pages/partySplitBarPlot";
import VoteSeatSharePlotPlanSpecific from "./pages/VoteSeatSharePlotPlanSpecific";


//router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="colorado" element={<Colorado />} />
      <Route path="nevada" element={<Nevada />} />
      <Route path="test" element={<EnsembleSMDboxAndWhiskerPlot fips={'NV'} electionType={'SMD'} characteristic={"DEMFAVORED"}  />} />
      

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
