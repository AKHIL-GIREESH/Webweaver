import { AuthContext } from "@/providers/authProvider";
import { User } from "@/types/user";
import { useContext } from "react";

export const useSetAuth = () => {

    const context = useContext(AuthContext);

    console.log(context)

    if (context === null) {
        throw new Error("Not initialised")
    }

    const setAuth = (data: User) => {
        const { update } = context
        if (data === undefined) {
            throw new Error("Provide user");
        }
        update(data);
    };

    return setAuth;
};