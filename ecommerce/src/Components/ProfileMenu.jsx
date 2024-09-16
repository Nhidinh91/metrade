import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Dropdown, } from 'react-bootstrap';
import ProfileImage from '../assets/profile-default-image.png'
import style from '../Styles/ProfileMenu.module.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Coin from '../assets/star.png';

const ProfileMenu = () => {
    const { user, deleteUser } = useAuthContext();

    const navigate = useNavigate()

    const handleMyPageClick = () => {
        navigate('/my-page');
    };

    const handleSellingHistoryClick = () => {
        navigate('/selling-history');
    }

    const handlePurchaseHistoryClick = () => {
        navigate('/purchase-history');
    }

    const handleLogoutClick = () => {
        deleteUser();
    };

    return (
        <Dropdown className={`${style.profileMenu}`}>
            <Dropdown.Toggle as={ButtonGroup} className={`${style.profileButton}`} id="dropdown-profile-button">
                <img src={ user.photo_url ? `${process.env.REACT_APP_API_PUBLIC_URL}/${user.photo_url}` : ProfileImage} alt="Profile" />
                <span className={`${style.profileName}`}>{user.first_name}</span>
            </Dropdown.Toggle>
            
            <Dropdown.Menu className={`${style.profileMenuItems}`}>
                <Dropdown.Item onClick={handleMyPageClick} className={`${style.profileMenuItem}`}>
                    My Page
                </Dropdown.Item>
                <Dropdown.Item className={`${style.profileMenuItem} ${style.balanceItem}`}>
                    Balance <span className={`${style.balance}`}><img src={Coin} alt="Coin" />{user.balance || 0}</span>
                </Dropdown.Item>
                <Dropdown.Item className={`${style.profileMenuItem}`} onClick={handleSellingHistoryClick}>
                    Selling History
                </Dropdown.Item>
                <Dropdown.Item className={`${style.profileMenuItem}`} onClick={handlePurchaseHistoryClick}>
                    Purchase History
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogoutClick} className={`${style.profileMenuItem}`}>
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileMenu;