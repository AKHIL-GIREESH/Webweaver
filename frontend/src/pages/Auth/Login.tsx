import AuthLayout from "../../components/Auth/AuthLayout"

const Login = () => {
    return(
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-light">
        <h1 className="font-extrabold text-my-gold">LOGIN</h1><br/>
        <AuthLayout login={true}/>
    </div>
    )    
}

export default Login