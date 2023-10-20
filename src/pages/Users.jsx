import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    if (!users.length) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <h2 className='text-center my-3'>All Users</h2>
      <div className='row'>
        {users?.map((user, index) => {
          return (
            <Link to={`/user/${user.id}`} state={{ user: user }}>
              <div class="card my-3 custom-card" key={index}>
                <div class="card-body">
                  <p>Name: {user.name}</p>
                  <p>Post: {"10"}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Users