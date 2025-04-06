import { useQuery } from "@tanstack/react-query";
import { FollowDialog } from "./followDialog"
import { getFollow } from "@/api/getFollow";
import { Loader2 } from "lucide-react";
import Errorr from "../Layout/Errorr";
import { useEffect, useState } from "react";

const Follow = ({ following, followers, id }: { following?: string[], followers?: string[], id: string }) => {

    const [list, setList] = useState<any>()
    const { data, isLoading, error } = useQuery({
        queryKey: ["getfollow"],
        queryFn: async () => {
            const data = await getFollow(id)
            return data
        },
    });

    useEffect(() => {
        if (data) {
            setList(data)
        }
    }, [data])

    if (isLoading || !list) {
        return (
            <div className="flex gap-10">
                <p className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Following</p> <p className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Followers</p>
                {/* <FollowDialog/> */}
            </div>
        )
    }

    if (error) {
        return (<Errorr />)
    }


    return (
        <div className="flex gap-10">
            {/* <p><b>{following ? following.length : 0}</b> Following</p> <p><b>{followers ? followers.length : 0}</b> <FollowDialog /></p> */}
            <FollowDialog following={true} dataList={list.following} />
            <FollowDialog following={false} dataList={list.followers} />
        </div>
    )
}

export default Follow