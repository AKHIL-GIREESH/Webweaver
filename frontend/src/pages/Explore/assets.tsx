import { getAssets } from "@/api/getAssets"
import AssetCard from "@/components/assets/AssetCard"
import NewAssetCard from "@/components/assets/NewAssetCard"
import Errorr from "@/components/Layout/Errorr"
import Loading from "@/components/Layout/Loading"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/providers/authProvider"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link } from "react-router-dom"

const Assets = () => {
    const UserContext = useContext(AuthContext)

    const { data, isLoading, error } = useQuery({
        queryKey: ["getUserWebsite"],
        queryFn: async () => {
            if (UserContext && UserContext.user?.id) {
                const data = await getAssets(UserContext.user.id)
                console.log(data)
                return data
            } else {
                return null
            }
        },
        enabled: !!UserContext?.user,
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

    console.log(data)
    if (data === null) {
        return (<div className=" max-h-[100vh] w-[85vw] overflow-y-scroll">
            <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-3 mt-5">
                Media Vault
            </p>
            <br />
            <div className="flex justify-start ">
                <NewAssetCard />
            </div>
        </div>)
    }



    return (
        <div className=" max-h-[100vh] w-[85vw] overflow-y-scroll">
            <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-3 mt-5">
                Media Vault
            </p>
            <br />
            <div className="flex flex-wrap justify-start ">
                <NewAssetCard />
                {data.map(({ url, filename }: any) => <AssetCard url={url} filename={filename} />)}
            </div>
        </div>
    )
}

export default Assets