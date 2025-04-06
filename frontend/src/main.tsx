import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WebsiteBuilder from './pages/WebsiteBuilder/WebBuilder.tsx'
import App from "./App.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "./pages/Auth/Login.tsx"
import SignUp from "./pages/Auth/SignUp.tsx"
import Profile from './pages/Profile/Profile.tsx'
import ProfileEdit from './pages/Profile/ProfileEdit.tsx'
import Projects from './pages/WebsiteBuilder/Projects.tsx'
import Explore from './pages/Explore/explore.tsx'
import Favourite from './pages/Explore/favourites.tsx'
import Dashboard from './pages/Host/dashboard.tsx'
import Hosting from './pages/Host/hosting.tsx'
import OtherProfile from './pages/Profile/OtherProfile.tsx'
import Assets from './pages/Explore/assets.tsx'
import WebViewer from './pages/WebsiteBuilder/WebViewer.tsx'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Projects />
      },
      {
        path: "/me",
        element: <Profile />
      },
      {
        path: "/me/edit",
        element: <ProfileEdit />
      },
      {
        path: "/websitebuilder/:id",
        element: <WebsiteBuilder />
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "/favourites",
        element: <Favourite />
      },
      {
        path: "/assets",
        element: <Assets />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/host",
        element: <Hosting />
      },
      {
        path: "/u/:id",
        element: <OtherProfile />
      },
      {
        path: "/view/:id",
        element: <WebViewer />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },





])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)