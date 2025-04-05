import { getAUser } from "@/api/getAUser";
import Errorr from "@/components/Layout/Errorr";
import Loading from "@/components/Layout/Loading";
import ProfileCard from "@/components/Profile/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const OtherProfile = () => {

    const { id } = useParams();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['someuser'],
        queryFn: async () => {
            const data = await getAUser(id as string)
            return data
        }
    })

    if (isError) {
        return <Errorr />
    }

    if (isLoading) {
        return <Loading />
    }

    const { id: _id, username, email, followers, following, websites, pfp, banner, desc, twitter, github, personalWeb, linkedIn } = data.user


    return (
        <ProfileCard self={false} id={_id} username={username} followers={followers} following={following} websites={websites} pfp={pfp} banner={banner} desc={desc} twitter={twitter} github={github} personalWeb={personalWeb} linkedIn={linkedIn} />
    )
}

export default OtherProfile