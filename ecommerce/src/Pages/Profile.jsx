import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    const { user } = useAuthContext();

    const fetchProfile = useCallback(async () => {
        if (!user || !user.token) {
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/api/user/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                setProfile(data.user);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    });

    useEffect(() => {
        fetchProfile();
    }, [user]);

    return (
        <div>
            <h1>{profile ? profile.name : "Loading..."}</h1>
        </div>
    );
}

export default Profile;