import { defineStore } from "pinia";
import { AxiosResult, ProfileData } from "~/lib/DataType";

import ApiUser from "~/lib/api/ApiUser";

export const useProfileStore = defineStore("profile", {
  // store the state
  state: () => {
    return {
      isLoaded: false,
      profile: null as ProfileData | null,
    };
  },

  // getters
  getters: {
    // doubleCount: (state) => state.count * 2,
  },

  // setters
  actions: {
    async fetchProfile() {
      const result = await ApiUser.getProfile<ProfileData>();

      if (result.isOk) {
        this.profile = result.data;

        console.log(this.profile)
      } else {
        console.log(result.error);
      }

      this.isLoaded = true;
    },
  },
});
