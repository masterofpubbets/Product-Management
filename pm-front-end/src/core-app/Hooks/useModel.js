import { useContext} from "react";
import { ModelContext} from "../Context/ModelContext";


export const useModel = () => {
    const context = useContext(ModelContext)


    return  {...context}
}