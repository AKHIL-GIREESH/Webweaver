import { Button } from "../ui/button";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUnfollow } from "@/api/followUnfollow";
import { useSetAuth } from "@/hooks/useSetUser";

const FollowButton = ({ user }: { user: string }) => {
    const me = useUser();
    const setAuth = useSetAuth();
    const queryClient = useQueryClient()


    const isFollowing = me?.following?.includes(user) ?? false;

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            if (!me) return;

            const result = await followUnfollow(user, isFollowing);

            const currentFollowing = me.following ?? [];

            const updatedFollowing = isFollowing
                ? currentFollowing.filter((id: string) => id !== user)
                : [...currentFollowing, user];

            setAuth({ ...me, following: updatedFollowing });
            queryClient.invalidateQueries({ queryKey: ["getfollow", user] })

            return result;
        },
        onError: (error) => {
            console.error("Follow/Unfollow failed", error);
        }
    });

    if (!me) return null;

    return (
        <Button
            variant="auth"
            onClick={() => mutate()}
            disabled={isPending}
            className="rounded-full"
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
};

export default FollowButton;
