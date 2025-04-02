import { useContext, useEffect } from "react"
import { AuthContext } from "./authProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Layout/Loading";
import Errorr from "@/components/Layout/Errorr";


const CommunityComponents = ({ children }: React.PropsWithChildren) => {

    const UserContext = useContext(AuthContext)

    const { data, isLoading, error } = useQuery({
        queryKey: ["getlikedWebsites"],
        queryFn: async () => {
            if (UserContext && UserContext.user) {
                let data
                // if (UserContext.user.websites === undefined) {
                //     data = await getAllWebsites(UserContext.user.id, false)
                // } else {
                //     data = await getAllWebsites(UserContext.user.id, true)
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

    useEffect(() => {

    }, [])
    return (
        <div>
            {children}
        </div>
    )
}

export default CommunityComponents