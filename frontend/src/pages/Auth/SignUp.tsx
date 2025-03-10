import AuthLayout from "../../components/Auth/AuthLayout"

const SignUp = () => {
    return(
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-my-gold">SignUp</h1><br/>
        <AuthLayout login={false}/>
    </div>
    )    
}

export default SignUp