import { Page } from "../Page/Page";
import { JSX} from "react";
import { SignUpForm } from "../../components/SignUp/SignUp";
import "./SignUpPage.scss";

export function SignUp(): JSX.Element {
  return (
    <Page>
      <div className="sign-up-page">
        <h1 className="title">Sign Up</h1>
        <SignUpForm />
      </div>
    </Page>
  );
}