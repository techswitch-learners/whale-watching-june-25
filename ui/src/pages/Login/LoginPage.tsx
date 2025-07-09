import Login from "../../components/Login/Login";
import { Page } from "../Page/Page";
import "./LoginPage.scss";

export default function LoginPage() {
    
    return (
        <Page>
            <div className="login-page">
                <h1 className="title">Log In</h1>
                <Login/>
                <p>Don&rsquo;t have an account yet? <a href="/sign-up">Sign up</a></p>
            </div>
        </Page>
    );
}
