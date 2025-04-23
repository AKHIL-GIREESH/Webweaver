import { getAUser } from "@/api/getAUser";
import Errorr from "@/components/Layout/Errorr";
import Loading from "@/components/Layout/Loading";
import ProfileCard from "@/components/Profile/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OtherProfile = () => {
    const { id } = useParams();

    const [currUser, setCurrUser] = useState<any>(null);
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ["someuser", id],
        queryFn: () => getAUser(id as string),
        enabled: !!id,
    });

    useEffect(() => {
        if (data?.user) {
            setCurrUser(data.user);
        }
    }, [data]);

    if (isError) return <Errorr />;
    if (isLoading || !currUser) return <Loading />;

    const {
        id: _id,
        username,
        followers,
        following,
        websites,
        pfp,
        banner,
        desc,
        twitter,
        github,
        personalWeb,
        linkedIn,
    } = currUser;

    return (
        <ProfileCard
            self={false}
            id={_id}
            username={username}
            followers={followers}
            following={following}
            websites={websites}
            pfp={pfp}
            banner={banner}
            desc={desc}
            twitter={twitter}
            github={github}
            personalWeb={personalWeb}
            linkedIn={linkedIn}
            refetch={refetch}
        />
    );
};

export default OtherProfile;
