import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WebsiteBuilder from './pages/WebBuilder.tsx'
import App from "./App.tsx"
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from "./pages/Auth/Login.tsx"
import SignUp from "./pages/Auth/SignUp.tsx"

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/websitebuilder",
    element:<WebsiteBuilder/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  }



])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)