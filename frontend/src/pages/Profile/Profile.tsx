import { Button } from "@/components/ui/button"

const Profile = () => {
    return(
        <div className="flex flex-col w-[100vw] min-h-[100vh] h-fit ">
            <div className="h-[20vh] border">
                
            </div>
            <div className="h-[40vh] self-center w-[92vw]  border">
                <div>
                    <img className="h-[120px] w-[120px] border rounded-full -translate-y-[60px] bg-white"></img>
                    {/* <button className="bg-white border border-none">Edit</button> */}
                    <Button variant="edit">Edit Profile</Button>
                </div>
                
            </div>
        </div>
    )
}

export default Profile