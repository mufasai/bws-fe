
import { dummyDataUserManagement } from '../shared/dummy-share';
import { CreateProjectRequest, CreateUserRequest, UserData } from '../shared/share-interface';
 

// const BASE_URL = '/src/assets/json/';
// Base URL for API - adjust as needed
// const BASE_URL = 'http://localhost:8080/api/users';
// Base URL for API - adjust as needed
const BASE_URL = 'http://localhost:8080/api';

interface VerificationResponse {
  success: boolean;
  message: string;
}



// Register API
export const RegisterAPI = async (userData: {
  first_name: string;
  last_name: string;
  username: string;
  dob: string; // Format: yyyy-mm-dd
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Verify Email API
const VerifyEmailAPI = async (token: string): Promise<VerificationResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/verify_email?token=${encodeURIComponent(token)}`,
      {
        method: 'GET', // Pastikan ini GET
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Log untuk memeriksa status dan body respons
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      throw new Error('Server responded with an error');
    }

    if (responseText) {
      const data: VerificationResponse = JSON.parse(responseText);
      return data;
    } else {
      throw new Error('Empty response body');
    }
  } catch (error) {
    console.error('Email verification error:', error);
    throw error;
  }
};


// Handle Verification Example
export const handleVerification = async (token: string) => {
  try {
    // Memanggil VerifyEmailAPI tanpa email karena backend hanya membutuhkan token
    const result = await VerifyEmailAPI(token);
    
    if (result.success) {
      return true;
    }
  } catch (error) {
    console.error('Verification failed:', error);
    return false;
  }
};

// Login API
// Login API
export const LoginAPI = async (username: string, password: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', data.token);
      return {
        status: "success",
        message: "Login successful",
        token: data.token
      };
    } else {
      return {
        status: "error",
        message: data.message || "Login failed"
      };
    }
  } catch (error: unknown) {
    console.error('Error logging in:', error);
    return {
      status: "error",
      message: "Failed to connect to the server"
    };
  }
};

// Forgot Password API
export const ForgotPasswordAPI = async (email: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/forgot_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Forgot password request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in forgot password:', error);
    throw error;
  }
};

// Reset Password API
// Update the ResetPasswordAPI function
export const ResetPasswordAPI = async (
  email: string,
  verificationCode: string,
  newPassword: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/reset_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        verification_code: verificationCode,
        new_password: newPassword 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Reset password request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in reset password:', error);
    throw error;
  }
};


// Fungsi untuk mengirimkan SMS Direct
export const InputSmsAPI = async (smsData: { phone_number: string; message: string }) => {
  try {
    const response = await fetch("http://localhost:8080/api/sms/input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(smsData),
    });

    if (!response.ok) {
      throw new Error("Failed to send SMS");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Error during SMS input: ${err}`);
  }
};



export const getAllUserManagement = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    console.log('Response:', response);
    if (!response.ok) throw new Error('Failed to fetch all user');
    const data = await response.json();
    const processedData = data.data.map((item: any) => ({
      id: { id: { String: item.id.id.String } },
      username: item.username,
      email: item.email,
      password: item.password,
      phone_number: item.phone_number,
      role_id: item.role_id,
      role_name: item.role_name,
      role_description: item.role_description,
      full_name: item.full_name,
      address: item.address,
      country: item.country,
      city: item.city,
      state: item.state,
      country_code: item.country_code,
      verification_status: item.verification_status
    })); 
    console.log('Fetched Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};



export const CreateUserManagementAPI = async (data: UserData) => {
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