import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./authProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Layout/Loading";
import Errorr from "@/components/Layout/Errorr";
import { getLikedProjects } from "@/api/getLikedProjects";
import { likedProject } from "@/types/editor";

export const CommunityComponentContext = createContext<null | likedProject[]>(null)

const CommunityComponentsProvider = ({ children }: React.PropsWithChildren) => {

    const [communityComp, setCommunityComp] = useState<null | likedProject[]>(null)
    const UserContext = useContext(AuthContext)

    const { data, isLoading, error } = useQuery({
        queryKey: ["getlikedWebsites"],
        queryFn: async () => {
            if (UserContext && UserContext.user) {
                if (UserContext.user.liked === undefined || UserContext.user.liked.length === 0) {
                    const data = await getLikedProjects(UserContext.user.id)
                    console.log(data)
                    return data
                }
                // if (UserContext.user.websites === undefined) {
                //     data = await getAllWebsites(UserContext.user.id, false)
                // } else {
                //     data = await getAllWebsites(UserContext.user.id, true)
                // }
                else {
                    return null
                }

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

    useEffect(() => {
        if (data) {
            setCommunityComp(data)
        }
    }, [data])
    return (
        <CommunityComponentContext.Provider value={communityComp}>
            {children}
        </CommunityComponentContext.Provider>
    )
}

export default CommunityComponentsProvider