import { createContext, useEffect, useMemo, useState } from "react";
import { User, UserContextType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/getUser";
import Loading from "@/components/Layout/Loading";
import Errorr from "@/components/Layout/Errorr";


export const AuthContext = createContext<UserContextType | null >(null)

const AuthProvider = ({children}:React.PropsWithChildren) => {
    const [user, setUser] = useState<null | User>(null);

    const {data,isLoading,isError} = useQuery({
        queryKey:["User"],
        queryFn: async () => {
            const theUser = await getUser()  
            console.log(theUser)             
            return theUser                   
        }                                       
    })

    useEffect(() => {
        if (data) {
          setUser(data);
        }
    }, [data]);

    console.log("State :",user)

    const UserContext = useMemo(() => ({
        user: user,
        update: setUser,
    }), [user]);
    
    if(isLoading){
        return <Loading/>
    }

    if(isError){
        return <Errorr/>
    }
    
    return (
        <AuthContext.Provider value={UserContext}>
            {children}
        </AuthContext.Provider>
    );
};
  


export default AuthProvider