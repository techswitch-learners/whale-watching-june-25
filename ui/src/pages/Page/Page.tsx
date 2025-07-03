import {JSX, ReactNode} from "react";
import "./Page.scss";

interface PageProps {
    children: ReactNode;
    containerClassName?: string;
}

export function Page(props: PageProps): JSX.Element {
    return ( 
        <div className={"page"}>           
            <main className={`main ${props.containerClassName}`}>
                {props.children}
            </main>            
        </div>
    );
}