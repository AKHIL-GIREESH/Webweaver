import { AuthContext } from "@/providers/authProvider"
import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllDeployments } from "@/api/getAllDeployments"
import Loading from "@/components/Layout/Loading"
import Errorr from "@/components/Layout/Errorr"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
    const UserContext = useContext(AuthContext)
    const id = UserContext?.user?.id

    const { data: deployments, isLoading, error } = useQuery({
        queryKey: ["deployments", id],
        queryFn: async () => {
            if (!id) return []
            return await getAllDeployments(id)
        },
        enabled: !!id,
    })

    if (!id) {
        return <>Login to continue</>
    }

    if (isLoading) return <Loading />
    if (error) return <Errorr />

    console.log(deployments)

    if (!deployments || deployments.length === 0) {
        return (
            <>
                <div className="max-h-[100vh] w-[82vw] ml-[3vw] overflow-y-scroll">
                    <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-3 mt-5">
                        Hosting Dashboard
                    </p>
                    <div className="flex flex-col items-center justify-center mt-20">
                        <p className="text-xl mb-4">You don't have any deployed projects yet</p>
                        <Link to="/host">
                            <Button variant="auth">Deploy Your First Project</Button>
                        </Link>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="max-h-[100vh] w-[82vw] ml-[3vw] overflow-y-scroll">
                    <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-3 mt-5">
                        Hosting Dashboard
                    </p>
                    <div>{deployments.map(({ id, title, subdomain }: any) => (<div className="p-5 border rounded-2xl w-[40vw]" key={id}><p className="text-2xl">{title}</p><br /><a href={`http://${subdomain}`} className="underline hover:text-my-gold">{subdomain}→</a></div>))}</div>
                </div>
            </>
        )
    }
}

export default Dashboard