/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:35:47
 * @modify date 2024-10-25 11:35:47
 * @desc Handling the PageLayout
 */


import Footer from "../../components/PageLayout/Fotter";
import Header from "../../components/PageLayout/Header";

export default function PageLayout({ children }: any) {
    return (
        <div className="relative">
            <Header />
            <div className="">
                {children}
            </div>
            <Footer />

        </div>
    )
}
