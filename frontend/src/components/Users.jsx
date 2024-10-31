import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../actions/usersActions';
import { Link, useNavigate } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  console.log(users);
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId)); 
    }
  };

  return (
    <div data-testid="main-container">
      {users.length === 0 ? (
        <div data-testid="empty-container">No users exist</div>
      ) : (
        <ul>
          {users.users.map(user => (
            <li key={user.id} data-testid={`list-item-${user.id}-container`}>
              <h3 data-testid="name-value">{user.name}</h3>
              <p data-testid="role-value">{user.role}</p>
              <Link to={`/users/${user.id}`}>Inspect</Link>
              <button data-testid="modify" onClick={() => navigateTo(`/users/${user.id}/modify`)}>Modify</button>
              <button data-testid="delete" onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;