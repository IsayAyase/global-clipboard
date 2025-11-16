import { IClipBoard } from "@/types/clipBoard";
import { create } from "zustand";

export type ClipBoardStoreType = {
    data: IClipBoard[];
    loading: boolean;
    error: string | null;
    setData: (data: IClipBoard[]) => void;
    deleteData: (code: string) => void;
    addData: (data: IClipBoard) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
};

export const useClipBoardStore = create<ClipBoardStoreType>((set, get) => ({
    data: [],
    loading: false,
    error: null,
    setData: (data: IClipBoard[]) => set({ data }),
    deleteData: (code: string) => {
        const data = get().data;
        const newData = data.filter((item) => item.code !== code);
        set({ data: newData });
    },
    addData: (data: IClipBoard) => set({ data: [data, ...get().data] }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
}));
