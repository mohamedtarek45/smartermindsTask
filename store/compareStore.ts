import { create } from "zustand";

type State = {
  users: { name: string ,avatar:string }[];
  addToCompare: (name: string,avatar:string) => void;
  removeFromCompare: (name: string) => void;
  clearCompare: () => void;
};

const useCompareStore = create<State>((set) => ({
  users: [],
  addToCompare: (name: string,avatar:string) => {
    set((state) => {
      if (state.users.length >= 2||state.users.find((user)=>user.name===name)) {
        return state;
      } else
        return {
          users: [...state.users, { name, avatar }],
        };
    });
  },
  removeFromCompare: (name: string) => {
    set((state) => {
      const newUsers = state.users.filter((user) => user.name !== name);
      return {
        users: newUsers,
      };
    });
  },
  clearCompare:()=> set(()=>({users:[]}))
}));

export default useCompareStore;
