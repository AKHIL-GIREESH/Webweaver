import { getAllWebsites } from "@/api/getAllprojects"
import Errorr from "@/components/Layout/Errorr"
import Loading from "@/components/Layout/Loading"
import ProjectCard from "@/components/Layout/ProjectCard"
import Searchbar from "@/components/Layout/SearchBar"
import { AuthContext } from "@/providers/authProvider"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"

const Explore = () => {
    const [val, setVal] = useState("")

    const UserContext = useContext(AuthContext)

    const { data, isLoading, error } = useQuery({
        queryKey: ["getAllWebsites"],
        queryFn: async () => {
            if (UserContext && UserContext.user) {
                const data = await getAllWebsites(UserContext.user.id)
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

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Errorr />
    }


    return (
        <div className=" max-h-[100vh] w-[85vw] overflow-y-scroll">
            <p className="text-my-gold m-5">EXPLORE</p>
            <br />
            <Searchbar val={val} setVal={setVal} />
            <br />
            <div className="flex flex-wrap justify-start ">
                {data?.filter(({ title }: any) => title.toLowerCase().includes(val.toLowerCase())).map(({ _id, title, thumbnail }: any) => <ProjectCard _id={_id} title={title} thumbnail={thumbnail} />)}
            </div>
        </div>
    )

}

export default Explore