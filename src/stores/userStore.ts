import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { UserData } from "../types/user";

interface UserState {
  user: null | UserData;
  setUserData: (user: UserData) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUserData: (user) => set(() => ({ user: user })),
        logout: () => set(() => ({ user: null })),
      }),
      { name: "userStore", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export default useUserStore;
