import { axiosall } from "./Axiosapi";
import {useAuth} from "./Authcontextprovider"

const Logoutlogger = () => {
    const { setAuthcons } = useAuth();

    const logout = async () => {
        
        
        try {
           
            const response = await axiosall.get("/logout", {
                withCredentials: true
            });
        
            setAuthcons({});
           
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default Logoutlogger