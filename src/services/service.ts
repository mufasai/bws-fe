
import { dummyDataUserManagement } from '../shared/dummy-share';
import { CreateProjectRequest, CreateUserRequest } from '../shared/share-interface';
 

// const BASE_URL = '/src/assets/json/';
// Base URL for API - adjust as needed
// const BASE_URL = 'http://localhost:8080/api/users';
const BASE_URL = 'http://127.0.0.1:8080/api';



export const getAllUserManagement = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    console.log('Response:', response);
    if (!response.ok) throw new Error('Failed to fetch all user');
    const data = await response.json();
    console.log('Fetched Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
// export const getUserID = async (user_id: number) => {
//   try {
//     const response = await fetch(`${BASE_URL}/users`);
//     if (!response.ok) throw new Error('Failed to fetch user ID');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching user ID:', error);
//     throw error;
//   }
// } 

export const LoginAPI = async (username: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/users-new/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Failed to login');
    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}


export const CreateProjectAPI = async (data: CreateProjectRequest) => {
  try {
    const response = await fetch(`${BASE_URL}/project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create project');
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export const UpdateUsersManagementAPI = async (id: number, data: CreateProjectRequest) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    console.error('Error update user:', error);
    throw error;
  }
}

export const DeleteUsersManagementAPI = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return await response.json();
  } catch (error) {
    console.error('Error delete project:', error);
    throw error;
  }
}