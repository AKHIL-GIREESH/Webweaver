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
    const [tagList, setTagList] = useState<string[]>([])

    const UserContext = useContext(AuthContext)

    const { data, isLoading, error } = useQuery({
        queryKey: ["getAllWebsites"],
        queryFn: async () => {
            if (UserContext && UserContext.user) {
                let data
                if (UserContext.user.websites === undefined) {
                    data = await getAllWebsites(UserContext.user.id, false)
                } else {
                    data = await getAllWebsites(UserContext.user.id, true)
                }
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
        <div className="max-h-[100vh] w-[85vw] overflow-y-scroll">
            <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-5 mt-5">Discover What Others Are Building</p>

            <br />
            <Searchbar val={val} setVal={setVal} setTagList={setTagList} tagList={tagList} />
            <br />
            <div className="flex flex-wrap justify-start ">
                {data?.filter(({ title, tags }: any) => {
                    const matchesTitle = title.toLowerCase().includes(val.toLowerCase());

                    const matchesTags = tagList.every(tag =>
                        tags?.map((t: string) => t.toLowerCase()).includes(tag.toLowerCase())
                    );

                    return matchesTitle && matchesTags;
                }).map(({ _id, title, thumbnail }: any) => (
                    <ProjectCard
                        key={_id}
                        _id={_id}
                        title={title}
                        thumbnail={thumbnail}
                        liked={UserContext?.user?.liked?.includes(_id) || false}
                    />
                ))}
            </div>
        </div>
    )

}

export default Explore