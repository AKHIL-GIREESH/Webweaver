import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
// import { Loader2 } from "lucide-react"
import { useState } from "react"
import { UserSignUpType } from "@/types/user"
// import {signUp} from "../../api/signUp"
// import {loginCall} from "../../api/login"

const AuthLayout = ({login}:{login:boolean}) => {

    const navi = useNavigate()

    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    })

    const [signData,setSignData] = useState<UserSignUpType>({
        email:"",
        password:"",
        username:""
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {value,name} = e.target
        if(login){
            setLoginData((prev) => ({...prev,[name]:value}))
        }else{
            setSignData((prev) => ({...prev,[name]:value}))
        }
    }

    // const {mutate:signUpMutate,isLoading} = useMutation({
    //     mutationFn: async () => {
    //         let newUser;
    //         if(login){
    //             console.log("hi")
    //             newUser = await loginCall(loginData)
    //         }else{
    //             newUser = await signUp(signData)
    //         }
    //         console.log("newUser",newUser)
    //         localStorage.setItem('user', JSON.stringify(newUser))
    //         navi("/", { replace: true });
    //     }
    // })

    // const {mutate:loginMutate,isLoading} = useMutation({
    //     mutationFn: async () => {
    //         const newUser = await loginCall(loginData)
    //         console.log("newUser",newUser)
    //         localStorage.setItem('user', JSON.stringify(newUser))
    //         navi("/", { replace: true });
    //     }
    // })

    // const signFunc = () => {
    //     signUpMutate()
    // }

    return(
        <>
            <div className="flex border border-black w-[60vw] h-[50vh] text-white rounded-s-md">
                <div className="bg-black w-[50%] pl-5 pr-5 h-[100%] flex flex-col items-center justify-center">
                    {login?null:<><Input name="username" placeholder="username" className="border border-light  bg-light" value={signData.username} onChange={(e) => handleChange(e)}/><br/></>}
                    <Input name="email" placeholder="email" className="border border-light bg-light" value={login?loginData.email:signData.email} onChange={(e) => handleChange(e)}/><br/>
                    <Input name="password" placeholder="password" className="border border-light  bg-light" value={login?loginData.password:signData.password} onChange={(e) => handleChange(e)}/><br/><br/>
                    {/* {isLoading?<Button className="bg-gold-gradient text-black font-bold" disabled>Loading
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /></Button>:<Button className="bg-gold-gradient text-black font-bold" onClick={signFunc}>{login?"LOGIN":"SIGN UP"}</Button>} */}
                <Button className="bg-gold-gradient text-black font-bold">{login?"LOGIN":"SIGN UP"}</Button>
                </div>
                <div className="border border-black w-[30vw] flex flex-col items-center justify-center bg-gold-gradient2 text-black rounded-s-2xl rounded-e-md text-center">
                    <h2 className="font-bold text-3xl mb-2">{!login?"Login":"Create an Account"}</h2>
                    <p>{!login?"Already a member? Click on the link below to login!":"Don't have an account? Click on the link below to get started!"}</p><br/>
                    <Button><Link to={`/${login?"signup":"login"}`} className="text-white">{!login?"LOGIN":"SIGN UP"}</Link></Button>
                </div>
            </div>
        </>
    )
}

export default AuthLayout