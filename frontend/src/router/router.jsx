import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateNote from "../pages/CreateNote";
import NoteDetail from "../pages/NoteDetail";

import ProtectedRoute from "../components/ProtectedRoute";
import ErrorBoundary from "../components/ErrorBoundary";


function Router(){

 return(

 <BrowserRouter>

 <Routes>

 <Route path="/" element={<Home/>} />

 <Route path="/login" element={<Login/>} />

 <Route path="/register" element={<Register/>} />

 <Route
  path="/dashboard"
                 element={
      <ErrorBoundary>   
      <ProtectedRoute>
         <Dashboard/>
      </ProtectedRoute>
      </ErrorBoundary>
  }
 />

 <Route
  path="/notes/new"
  element={
      <ErrorBoundary>
      <ProtectedRoute>
         <CreateNote />
      </ProtectedRoute>
      </ErrorBoundary>
  }
 />

 <Route
  path="/notes/:id"
  element={
      <ErrorBoundary>
      <ProtectedRoute>
         <NoteDetail />
      </ProtectedRoute>
      </ErrorBoundary>
  }
 />
 </Routes>

 </BrowserRouter>

 );
}

export default Router;


