import { Outlet } from "react-router-dom"
import MainSidebar from "./components/Layout/MainSidebar"

const App = () => {
    return (
        <div className="flex">
            <MainSidebar />
            <Outlet />
        </div>
    )
}

export default App