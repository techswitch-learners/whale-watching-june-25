import { JSX} from "react";
import { Page } from "../Page/Page";
import { CreateWhaleSightingForm } from "../../components/formComponents/WhaleSighting/CreateWhaleSightingForm";



export function CreateWhaleSightingPage(): JSX.Element {
  return (
    <Page containerClassName="create-whale-sighting-page">
      <CreateWhaleSightingForm />
    </Page>
  );
}
