import {create} from 'zustand';

const useAuthUser = create((set) => ({
  userData: {
    mm_name: "",
    mm_token: "",
    mm_role: "subscriber"
  }, // Default is no user data (null)

  // Action to set the user data
  setUserData: (data) => set({ userData: data }),

  // Action to clear the user data (logout)
  clearUserData: () => set({ userData: null }),
}));

export default userAuthUser;
