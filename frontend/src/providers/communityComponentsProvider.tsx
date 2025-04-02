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

                    return null
                }
                // if (UserContext.user.websites === undefined) {
                //     data = await getAllWebsites(UserContext.user.id, false)
                // } else {
                //     data = await getAllWebsites(UserContext.user.id, true)
                // }
                else {
                    const data = await getLikedProjects(UserContext.user.id)
                    return data
                }

            }
        },
        enabled: !!UserContext?.user,
    });

    useEffect(() => {
        if (data) {
            setCommunityComp(data)
        }
    }, [data])

    console.log(data)
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
        <CommunityComponentContext.Provider value={communityComp}>
            {children}
        </CommunityComponentContext.Provider>
    )
}

export default CommunityComponentsProvider