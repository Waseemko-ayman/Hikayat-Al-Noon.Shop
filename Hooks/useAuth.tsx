/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/toast';
import supabase from '@/config/api';
import { PATHS } from '@/data/paths';
import { AUTH_ACTIONS } from '@/constant/auth';
import { AuthAction, AuthState, LoginFormData, LoginPhoneFormData } from '@/interfaces';

const initialState: AuthState = {
  isLoading: false,
  error: null,
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: true, error: null };

    case AUTH_ACTIONS.SET_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload?.error || 'An unexpected error occurred',
        isLoading: false,
      };

    default:
      return state;
  }
};

const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const { showToast } = useToast();

  const login = async (body: LoginFormData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { data, error } = await supabase.auth.signInWithPassword(body);

      if (error) {
        if (error.message === 'Email not confirmed') {
          showToast(
            'Please check your email to verify your account before logging in.',
            'error',
          );
        } else {
          showToast(error.message, 'error');
        }
        return;
      }

      if (data?.session) {
        showToast('Login successful');
        router.replace(PATHS.HOME);
      }
    } catch (error: any) {
      const errorMsg = error.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast('Login failed. Please check your details.', 'error');
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const signup = async (body: any) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { data, error } = await supabase.auth.signUp(body);

      if (error) {
        showToast(error.message, 'error');
        return;
      }

      if (data?.user) {
        showToast('Account created successfully. Check your email to verify.');
        router.replace(PATHS.AUTH.LOGIN);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast(errorMsg, 'error');
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const signInWithPhoneOTP = async (body: LoginPhoneFormData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { error } = await supabase.auth.signInWithOtp(body);

      if (error) {
        showToast(error.message, 'error');
        return;
      }

      showToast('OTP sent! Check your phone');
      router.replace(PATHS.AUTH.VERIFY_OTP);
    } catch (error: any) {
      const errorMsg = error.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast('Login failed. Please check your details.', 'error');
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const verifyPhoneOTP = async (body: any) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { data, error } = await supabase.auth.verifyOtp(body);

      if (error) {
        showToast(error.message, 'error');
        return;
      }

      if (data?.session) {
        showToast('Verify OTP successfully');
        router.replace(PATHS.HOME);
      }
    } catch (error: any) {
      const errorMsg = error.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast('Login failed. Please check your details.', 'error');
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        showToast(error.message, 'error');
        return;
      }

      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      showToast('Logged out successfully');
      router.replace(PATHS.HOME);
    } catch (error: any) {
      const errorMsg = error.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast(errorMsg, 'error');
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  return {
    ...state,
    login,
    signup,
    signInWithPhoneOTP,
    verifyPhoneOTP,
    logout,
  };
};

export default useAuth;
