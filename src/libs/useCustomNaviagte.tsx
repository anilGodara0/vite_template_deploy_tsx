/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:23:22
 * @modify date 2024-10-25 11:23:22
 * @desc This Custom Hook is Created so that developer will never do wrong routing it will give all suggestions of route thats we need
 */


import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../Routes/RouteTree';


const useCustomNavigate = () => {
    const navigate = useNavigate();

    const customNavigate = (path: RoutePath, options?: { replace?: boolean }) => {
        navigate(path, options);
    };

    return customNavigate;
};

export default useCustomNavigate;
