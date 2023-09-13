import { defineStore } from "pinia";
import { ProfileData } from "~/lib/DataType";

import ApiUser from "~/lib/api/ApiUser";

export const useProfileStore = defineStore("profile", {
  // store the state
  state: () => {
    return{
        profile: null as ProfileData | null
    }
  },

  // getters
  getters: {
    // doubleCount: (state) => state.count * 2,
  },

  // setters
  actions: {
    async fetchProfile(){
     const data = await ApiUser.getProfile()
     console.log(data)
      
    }
  },
});
