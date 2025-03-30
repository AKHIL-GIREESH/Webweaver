import NewProjectCard from "@/components/Layout/NewProjectCard"
import ProjectCard from "@/components/Layout/ProjectCard"

const Projects = () => {



    return (
        <div className="m-5">
            <p className="text-my-gold">PROJECTS</p>
            <br />
            {/* <ProjectCard/> */}
            <NewProjectCard />
        </div>
    )
}

export default Projects