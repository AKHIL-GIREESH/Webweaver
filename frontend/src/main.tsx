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
import AuthProvider from './providers/authProvider.tsx'
import ProfileEdit from './pages/Profile/ProfileEdit.tsx'
import Projects from './pages/WebsiteBuilder/Projects.tsx'

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
  {
    path: "/websitebuilder",
    element: <WebsiteBuilder />
  },


])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)