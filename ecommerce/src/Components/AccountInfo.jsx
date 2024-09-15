import { useState, useEffect, useCallback, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Form, Button, Row, Col, Image, Container } from "react-bootstrap";
import ProfileImage from '../assets/profile-default-image.png';
import '../Styles/AccountInfo.css';

const AccountInfo = () => {
    const [profile, setProfile] = useState(null);
    const [avatarData, setAvatarData] = useState(null); // for saving avatar in database
    const [avatarPreview, setAvatarPreview] = useState(ProfileImage); // For avatar preview
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const { user } = useAuthContext();
    const fileInputRef = useRef(null); // Ref for file input

    const fetchProfile = useCallback(async () => {
        if (!user || !user.token) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/user/profile/detail/${user._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                setProfile(data.user);
                // Set initial avatar preview
                setAvatarPreview(data.user.photo_url || ProfileImage);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchProfile();
    }, [user, fetchProfile]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setAvatarData(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async (e) => {

    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <Container>
            <Row className="account-info py-4">
                <div className="avatar-container">
                    <Image
                        src={avatarPreview}
                        roundedCircle
                        className="avatar-image"
                    />

                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        ref={fileInputRef}
                        className="d-none"
                    />
                    <button className="change-avatar-btn" onClick={triggerFileInput}>
                        <i
                            className="fa-solid fa-pen-to-square"
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </button>
                </div>

                <Form onSubmit={handleSaveChanges}>
                    <Row sm={1} md={2} className="mb-3">
                        <Col sm={12} md={6}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={profile?.first_name}
                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={profile?.last_name}
                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row sm={1} md={2} className="mb-3">
                        <Col sm={12} md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={profile?.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    disabled={profile?.is_verified}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={profile?.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Form.Label>Password Changes</Form.Label>
                        <Form.Group controlId="currentPassword" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="newPassword" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmNewPassword" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row sm={1} md={2} className="justify-content-md-end">
                        <Col sm={12} md={3}>
                            <Button type="submit" className="btn btn-primary save-changes-btn">Save Changes</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default AccountInfo;
