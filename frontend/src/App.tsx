import { Outlet } from "react-router-dom"
import MainSidebar from "./components/Layout/MainSidebar"
import AuthProvider from "./providers/authProvider"

const App = () => {
    return (
        <AuthProvider>
            <div className="flex">
                <MainSidebar />
                <Outlet />
            </div>
        </AuthProvider>
    )
}

export default App