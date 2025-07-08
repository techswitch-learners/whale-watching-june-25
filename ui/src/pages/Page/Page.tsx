import {JSX, ReactNode} from "react";
import "./Page.scss";
import {Header, Navbar} from "../../components/Header/Header";

interface PageProps {
    children: ReactNode;
    containerClassName?: string;
}

export function Page(props: PageProps): JSX.Element {
    return (         
        <div className={"page"}> 
        <Header/>
        <Navbar/>          
            <main className={`main ${props.containerClassName}`}>
                {props.children}
            </main>            
        </div>
    );
}