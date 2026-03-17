/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/config/api';
import { useCallback, useReducer } from 'react';

interface State<T> {
  data: T[];
  product: T | null;
  isLoading: boolean;
  error: any;
  message: string;
}

interface Action<T> {
  type: string;
  payload?: any;
}

const API_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  GET: 'GET',
  GET_SINGLE: 'GET_SINGLE',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DEL',
  ERROR: 'ERROR',
} as const;

const initialState: State<any> = {
  data: [],
  product: null,
  isLoading: false,
  error: null,
  message: '',
};

// ⚠️ Issue: How do we know that all items returned from the API have an 'id'?
// TypeScript has no guarantee that type T contains the 'id' property.
// ✔️ Fix: Constrain type T to { id: string | number } so TypeScript knows 'id' exists
const reduce = <T extends { id?: string | number }>(
  state: State<T>,
  action: Action<T>,
): State<T> => {
  switch (action.type) {
    case API_ACTIONS.SET_LOADING:
      return { ...state, isLoading: true };
    case API_ACTIONS.GET:
      return { ...state, isLoading: false, data: action.payload };
    case API_ACTIONS.GET_SINGLE:
      return { ...state, isLoading: false, product: action.payload };
    case API_ACTIONS.POST:
      return {
        ...state,
        isLoading: false,
        // data: [...state.data, action.payload],
        data: [...state.data, ...(action.payload || [])],
      };
    case API_ACTIONS.PUT:
      return {
        ...state,
        isLoading: false,
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    case API_ACTIONS.DEL:
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case API_ACTIONS.ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

// ⚠️ Issue: How do we know that all items returned from the API have an 'id'?
// TypeScript has no guarantee that type T contains the 'id' property.
// ✔️ Fix: Constrain type T to { id: string | number } so TypeScript knows 'id' exists
const useAPI = <T extends object>(
  tableName: string,
  isRPC = false,
) => {
  const [state, dispatch] = useReducer(reduce<T>, initialState);

  const get = useCallback(async () => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      let data, error;
      if (isRPC) {
        // RPC call
        ({ data, error } = await supabase.rpc(tableName));
      } else {
        // Regular table call
        ({ data, error } = await supabase.from(tableName).select('*'));
      }
      if (error) throw error;
      dispatch({ type: API_ACTIONS.GET, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  }, [tableName, isRPC]);

  const getSingle = async (id: string | number) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      const { data } = await supabase.from(tableName).select('*').eq('id', id);
      dispatch({ type: API_ACTIONS.GET_SINGLE, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  const add = async (body: any) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      if (tableName === 'auth.users') {
        // Create user from server
        const res = await fetch('/api/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) {
          throw data;
        }

        return data;
      } else {
        // Normal insert
        const { data, error } = await supabase
          .from(tableName)
          .insert([body])
          .select();

        if (error) throw error;

        dispatch({ type: API_ACTIONS.POST, payload: data || [] });
        return data;
      }
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  const edit = async (id: string | number, body: any) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      if (tableName === 'auth.users') {
        const res = await fetch('/api/update-profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: id, ...body }),
        });

        const dataRes = await res.json();
        if (!res.ok) {
          throw dataRes;
        }
        dispatch({ type: API_ACTIONS.PUT, payload: { id, ...body } });
        return dataRes;
      } else {
        const { data, error } = await supabase
          .from(tableName)
          .update(body)
          .eq('id', id)
          .select();
        if (error) throw error;
        dispatch({ type: API_ACTIONS.PUT, payload: data?.[0] });
        return data?.[0];
      }
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  const del = async (id: string | number) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      if (tableName === 'auth.users') {
        // Special case → We send a request to the server
        const res = await fetch('/api/delete-user', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to delete user');
        dispatch({ type: API_ACTIONS.DEL, payload: id });
      } else {
        // Normal deletion from other tables
        const { data, error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', id)
          .select();
        if (error) throw error;
        dispatch({ type: API_ACTIONS.DEL, payload: id });
        return data;
      }
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  return { ...state, get, getSingle, add, edit, del };
};

export default useAPI;
