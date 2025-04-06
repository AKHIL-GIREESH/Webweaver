import { useQuery } from "@tanstack/react-query";
// import { FollowDialog } from "./followDialog"
import { getFollow } from "@/api/getFollow";
import { Loader2 } from "lucide-react";
import Errorr from "../Layout/Errorr";
// import { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FollowCard from "./followCard"
import { useState } from "react";

const Follow = ({ following, followers, id }: { following?: string[], followers?: string[], id: string }) => {

    const [section, setSection] = useState<"following" | "followers" | null>(null);

    const { data, refetch, isLoading, error } = useQuery({
        queryKey: ["getfollow", id],
        queryFn: async () => {
            const data = await getFollow(id);
            return data; // make sure it returns { following: [], followers: [] }
        },
        enabled: false,
    });

    const handleOpenSection = (target: "following" | "followers") => {
        setSection(target);
        refetch(); // fetch when clicked
    };

    const getList = () => {
        if (!data) return [];
        return section === "following" ? data.following || [] : data.followers || [];
    };



    return (

        <Dialog>
            <div className="flex gap-10">
                <DialogTrigger asChild>
                    <p onClick={() => handleOpenSection("following")}>
                        <b>{following?.length || 0}</b> Following
                    </p>
                </DialogTrigger>

                <DialogTrigger asChild>
                    <p onClick={() => handleOpenSection("followers")}>
                        <b>{followers?.length || 0}</b> Followers
                    </p>
                </DialogTrigger>
            </div>

            <DialogContent className="bg-black rounded-[10px] max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center capitalize">{section}</DialogTitle>
                    <DialogDescription>
                        {isLoading && <p>Loading...</p>}
                        {!isLoading && (
                            getList().length === 0 ? (
                                <p className="text-center text-gray-400">
                                    No {section === "following" ? "users followed yet." : "followers yet."}
                                </p>
                            ) : (
                                (getList() || []).map((user: any) => (
                                    <FollowCard
                                        key={user.id}
                                        isfollowing={section === "following"}
                                        userData={user}
                                    />
                                ))
                            )
                        )}

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

// const location = useLocation()
// // const [list, setList] = useState<any>()
// const { data, refetch, isLoading, error } = useQuery({
//     queryKey: ["getfollow"],
//     queryFn: async () => {
//         const data = await getFollow(id)
//         return data
//     },
// });

// useEffect(() => {
//     refetch()
// }, [data, location])

// if (isLoading) {
//     return (
//         <div className="flex gap-10">
//             <p className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Following</p> <p className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Followers</p>
//             {/* <FollowDialog/> */}
//         </div>
//     )
// }

// if (error) {
//     return (<Errorr />)
// }


// return (
//     <div className="flex gap-10">
//         {/* <p><b>{following ? following.length : 0}</b> Following</p> <p><b>{followers ? followers.length : 0}</b> <FollowDialog /></p> */}
//         <FollowDialog following={true} dataList={data.following} />
//         <FollowDialog following={false} dataList={data.followers} />
//     </div>
// )

export default Follow