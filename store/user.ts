import { IUser } from "@/types/user";
import { create } from "zustand";

export type UserStoreType = {
    data: IUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    setData: (data: IUser | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
    data: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    setData: (data: IUser | null) => set({ data, isAuthenticated: !!data }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
}));
