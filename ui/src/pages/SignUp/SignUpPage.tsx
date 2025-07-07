import { Page } from "../Page/Page";
import { JSX} from "react";
import { SignUpForm } from "../../components/SignUp/SignUp";
import "./SignUpPage.scss";

export function SignUp(): JSX.Element {
  return (
    <Page containerClassName="sign-up-form">
      <h1 className="title">Sign Up</h1>
      <SignUpForm />
    </Page>
  );
}