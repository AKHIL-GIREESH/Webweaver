import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WebsiteBuilder from '../pages/WebBuilder.tsx'
import App from "./App.tsx"
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/websitebuilder",
    element:<WebsiteBuilder/>
  }



])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)