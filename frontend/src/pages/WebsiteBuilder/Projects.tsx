import { getAllMyWebsites } from "@/api/getAllMyWebsites";
import Errorr from "@/components/Layout/Errorr";
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

    if (error) {
        return <Errorr />
    }


    return (
        <div className=" max-h-[100vh] w-[85vw] overflow-y-scroll">
            <p className="m-4 ml-[6vw] text-my-gold">PROJECTS</p>
            <br />
            <div className="flex flex-wrap justify-start ">
                <NewProjectCard />
                {data.map(({ _id, title, thumbnail }: any) => <ProjectCard _id={_id} title={title} thumbnail={thumbnail} />)}
            </div>
        </div>
    )
}

export default Projects