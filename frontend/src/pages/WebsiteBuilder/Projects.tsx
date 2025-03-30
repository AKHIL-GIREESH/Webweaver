import { getAllMyWebsites } from "@/api/getAllMyWebsites";
import Loading from "@/components/Layout/Loading";
import NewProjectCard from "@/components/Layout/NewProjectCard"
import ProjectCard from "@/components/Layout/ProjectCard"
import { AuthContext } from "@/providers/authProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const Projects = () => {

    const UserContext = useContext(AuthContext)

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ["getUserWebsite"],
        queryFn: async () => {
            if (UserContext.user) {
                const data = await getAllMyWebsites(UserContext.user.id)
                // const { code, title, tags } = data.Website
                // if (data) {
                //     dispatch({
                //         type: "setWebsite",
                //         website: code || website,
                //     });
                //     setRest({ ...rest, title: title, tags: tags ? tags : [] })
                // }
                return data

            }
        },
    });

    if (isLoading) {
        return <Loading />
    }


    return (
        <div className="m-5">
            <p className="text-my-gold">PROJECTS</p>
            <br />
            <NewProjectCard />
            {data.map(({ _id, title, thumbnail }: any) => <ProjectCard _id={_id} title={title} thumbnail={thumbnail} />)}
        </div>
    )
}

export default Projects