import { useState } from 'react';

const useAdminActions = (fetchUsers, setShowModal) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserAction = async (selectedUser, status) => {
    if (!selectedUser) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/users/${selectedUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`Request failed with status ${response.status}`);
    }
    fetchUsers();
    setShowModal(false);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivateAction = (selectedUser) => handleUserAction(selectedUser, 'active');
  const handleBanAction = (selectedUser) => handleUserAction(selectedUser, 'banned');
  const handleDeleteAction = (selectedUser) => handleUserAction(selectedUser, 'deleted');

  return {
    handleActivateAction,
    handleBanAction,
    handleDeleteAction,
    loading,
    error,
  };
};

export default useAdminActions;