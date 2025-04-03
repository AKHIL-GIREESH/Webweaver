import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FollowCard from "./followCard"


export const FollowDialog = ({ following, dataList }: { following: boolean, dataList: string[] | null }) => {
    return (
        <Dialog>
            <DialogTrigger>{dataList ? dataList.length : 0} {following ? "Following" : "Followers"}</DialogTrigger>
            <DialogContent className="bg-black rounded-[10px]">
                <DialogHeader>
                    <DialogTitle>{following ? "Following" : "Followers"}</DialogTitle>
                    <DialogDescription>
                        {dataList === null ? <p>{following ? "Not following Anybody" : "Get followers"}</p> :
                            dataList.map(user => <FollowCard isfollowing={following} userData={user} />)}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>


    )
}