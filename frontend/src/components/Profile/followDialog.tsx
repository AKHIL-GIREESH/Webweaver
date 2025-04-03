import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export const FollowDialog = ({ following, dataList }: { following: boolean, dataList: string[] | null }) => {
    return (
        <Dialog>
            <DialogTrigger>{dataList ? dataList.length : 0} {following ? "Following" : "Followers"}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{following ? "Following" : "Followers"}</DialogTitle>
                    <DialogDescription>
                        Nothing for now
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>


    )
}