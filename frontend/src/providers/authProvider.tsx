import { createContext, useEffect, useMemo, useState } from "react";
import { User, UserContextType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";


export const AuthContext = createContext<UserContextType | null >(null)

const AuthProvider = ({children}:React.PropsWithChildren) => {
    const [user, setUser] = useState<null | User>(null);

    console.log("State :",user,setUser)

    const {data,isLoading} = useQuery({
        queryKey:["User"],
        queryFn: async () => {
            // const theUser = await getUser()
            // console.log(theUser)
            // return theUser
        }
    })

    useEffect(() => {
        if (data) {
          setUser(data);
        }
    }, [data]);

    const UserContext = useMemo(() => ({
        user: user,
        update: setUser,
    }), [user]);
    
    if(isLoading){
        return(<h1>Loading...</h1>)
    }
    

    if(isLoading){
        return(<h1>Loading...</h1>)
      }
    
    return (
        <AuthContext.Provider value={UserContext}>
            {children}
        </AuthContext.Provider>
    );
};
  


export default AuthProvider