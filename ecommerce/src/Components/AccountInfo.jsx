import { useState, useEffect, useCallback, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Form, Button, Row, Col, Image, Container } from "react-bootstrap";
import ProfileImage from "../assets/profile-default-image.png";
import "../Styles/AccountInfo.css";

const AccountInfo = () => {
  const [profile, setProfile] = useState(null);
  const [avatarData, setAvatarData] = useState(null); // for saving avatar in database
  const [avatarPreview, setAvatarPreview] = useState(ProfileImage); // For avatar preview
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuthContext();
  const fileInputRef = useRef(null); // Ref for file input
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  const fetchProfile = useCallback(async () => {
    if (!user || !user.token) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/profile/detail/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
        // Set initial avatar preview
        setAvatarPreview(data.user.photo_url || ProfileImage);
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setPhone(data.user.phone);
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
    console.log(file);
    if (file) {
      setAvatarData(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async (event) => {
    event.prevenDefault();
    setError("");
    setLoading(true);

    // File validation
    if (avatarData & !allowedTypes.includes(avatarData.type)) {
      setError("Only image files (JPEG, PNG, GIF) are allowed");
      setLoading(false);
      return;
    }

    // Name validation
    if (!lastName || !firstName) {
      setError("Last name and first name are required");
      setLoading(false);
      return;
    }

    // Phone validation
    if (!phone) {
      setError("Phone are required");
      setLoading(false);
      return;
    }

    // Current Password validation
    if (newPassword & !currentPassword) {
      setError("Please input your current password");
      setLoading(false);
      return;
    }

    // Confirm New Password validation
    if (newPassword & !confirmNewPassword) {
      setError("Please confirm new password");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);

      // Add the avatar file only if it's selected
      if (avatarData) {
        formData.append("avatar", avatarData);
      }

      // Add password fields only if the user is changing the password
      if (currentPassword && newPassword) {
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);
      }

      console.log(formData)
      // Call backend API
      const response = await fetch(
        `http://localhost:3000/api/user/profile/update/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Handle success: e.g., update profile in UI or show success message
        alert("Profile updated successfully!");
        fetchProfile(); // Optionally refetch profile to update the UI
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = () => {};

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <Row className="account-info py-4">
        <div className="avatar-container">
          <Image src={avatarPreview} roundedCircle className="avatar-image" />

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
              style={{ cursor: "pointer" }}
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
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={profile?.last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row sm={1} md={2} className="mb-3">
            <Col sm={12} md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={profile?.email} disabled/>
              </Form.Group>
              {!profile?.is_verified && (
                <Button className="veriry-button" onClick={() => verifyEmail()}>
                  Verify
                </Button>
              )}
            </Col>
            <Col sm={12} md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={profile?.phone}
                  onChange={(e) => setPhone(e.target.value)}
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
              <Button
                type="submit"
                className="btn btn-primary save-changes-btn"
              >
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default AccountInfo;
