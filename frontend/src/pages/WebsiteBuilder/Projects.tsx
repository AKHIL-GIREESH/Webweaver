import { getAllMyWebsites } from "@/api/getAllMyWebsites";
import Errorr from "@/components/Layout/Errorr";
import Loading from "@/components/Layout/Loading";
import NewProjectCard from "@/components/Layout/NewProjectCard"
import ProjectCard from "@/components/Layout/ProjectCard"
import { AuthContext } from "@/providers/authProvider";
import { useQuery } from "@tanstack/react-query";
import { Blocks } from "lucide-react";
import { useContext } from "react";

const Projects = () => {

    const UserContext = useContext(AuthContext)

    const { data, isLoading, error } = useQuery({
        queryKey: ["getUserWebsite"],
        queryFn: async () => {
            if (UserContext && UserContext.user?.websites) {
                const data = await getAllMyWebsites(UserContext.user.id)
                console.log(data)
                // const { code, title, tags } = data.Website
                // if (data) {
                //     dispatch({
                //         type: "setWebsite",
                //         website: code || website,
                //     });
                //     setRest({ ...rest, title: title, tags: tags ? tags : [] })
                // }
                return data
            } else {
                return null
            }
        },
        enabled: !!UserContext?.user,
    });

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Errorr />
    }

    console.log(data)
    if (data === null) {
        return (<div className=" max-h-[100vh] w-[85vw] overflow-y-scroll">
            <p className="m-4 ml-[6vw] text-my-gold">PROJECTS</p>
            <br />
            <div className="flex justify-start ">
                <NewProjectCard />
            </div>
        </div>)
    }


    return (
        <div className=" max-h-[100vh] w-[85vw] overflow-y-scroll">
            <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-3 mt-5">
                Your Creative Universe <Blocks />
            </p>
            <br />
            <div className="flex flex-wrap justify-start ">
                <NewProjectCard />
                {data.map(({ _id, title, thumbnail }: any) => <ProjectCard _id={_id} title={title} thumbnail={thumbnail} liked={UserContext?.user?.liked ? UserContext?.user?.liked?.includes(_id) : false} />)}
            </div>
        </div>
    )
}

export default Projects