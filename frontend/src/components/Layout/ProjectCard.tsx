import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

const ProjectCard = () => {
    return (
        <div className="flex items-center justify-center outline-light outline-2 h-[35vh] w-[30vw] outline-dashed bg-black rounded-[10px]">
            <Link to="/websitebuilder/:id"><div className="p-3 rounded-full bg-gradient-to-br from-[#ffd700] via-[#f0c14b] to-[#b8860b]">
                <Plus />
            </div>
            </Link>
        </div>
    )
}

export default ProjectCard