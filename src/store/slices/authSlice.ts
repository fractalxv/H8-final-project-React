import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

// Define the valid user for authentication
const validUser = {
  id: '1',
  name: "Admin",
  email: "admin@mail.com",
  password: "admin123",
};

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  email: string;
  password: string;
  error: string;
  errors: Record<string, string>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  email: '',
  password: '',
  error: '',
  errors: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = '';
      state.errors = {};
    },
    loginWithCredentials: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      
      // Validate input using zod
      const schema = z.object({
        email: z.string().email("Email salah"),
        password: z.string().min(6, "Minimum password 6 karakter"),
      });
    
      const result = schema.safeParse({ email, password });
    
      if (!result.success) {
        const formattedError = Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(
            ([key, value]) => {
              return [key, value?.[0] || ""];
            }
          )
        );
        
        state.errors = formattedError;
        return;
      }
    
      // Clear previous errors
      state.errors = {};
    
      // Check credentials against valid user
      if (email !== validUser.email || password !== validUser.password) {
        state.error = "Invalid username or password";
        return;
      }
    
      // Login successful
      state.isAuthenticated = true;
      state.user = validUser;
      state.error = '';
      state.errors = {};
      
      // Store user in localStorage (handled by redux-persist)
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.email = '';
      state.password = '';
      state.error = '';
      state.errors = {};
    },
  },
});

export const { setEmail, setPassword, setError, setErrors, login, loginWithCredentials, logout } = authSlice.actions;

export default authSlice.reducer;