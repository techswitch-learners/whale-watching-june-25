import UserSightings from "../../components/UserSightings/UserSightings"
import './UserProfilePage.scss';

const UserProfilePage = () => {
  return (
    <div className = "user-profile">
        <h1 className="title"> My Sightings</h1>
        <UserSightings/>
    </div>
  );
};

export default UserProfilePage;
