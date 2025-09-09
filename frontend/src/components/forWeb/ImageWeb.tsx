import { getAssets } from "@/api/getAssets";
import { AuthContext } from "@/providers/authProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Loading from "../Layout/Loading";
import Errorr from "../Layout/Errorr";
import ImageWebCard from "./ImageWebCard";

const ImageWeb = () => {
    const UserContext = useContext(AuthContext);

    const { data, isLoading, error } = useQuery({
        queryKey: ["getUserWebsite"],
        queryFn: async () => {
            if (UserContext && UserContext.user?.id) {
                const data = await getAssets(UserContext.user.id);
                console.log(data);
                return data;
            } else {
                return null;
            }
        },
        enabled: !!UserContext?.user,
    });

    if (!UserContext || !UserContext.user) {
        return <>Login to continue</>;
    }

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Errorr />;
    }

    console.log(data);
    if (data === null || data.length === 0) {
        return (
            <div>
                No Images Found
            </div>
        );
    }

    return (
        <div>
            <div className="w-[70vw] flex overflow-x-auto p-4 space-x-4">
                {data.map(({ url }: { url: string }) => (
                    <ImageWebCard key={url} url={url} />
                ))}
            </div>
        </div>
    );
};

export default ImageWeb;