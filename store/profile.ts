import { defineStore } from "pinia";
import type { AxiosResult, ProfileData } from "~/lib/DataType";

import ApiUser from "~/lib/api/ApiUser";
import { getTimeLeft } from "~/lib/utils";

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

      if (result.data) {
        const diff = getTimeLeft(result.data.premiumEnd);
        let isPremium = false;
        if (diff[0] || diff[1] || diff[2] || diff[3]) isPremium = true;
        this.profile = { ...result.data, isPremium };

        console.log(this.profile);
      } else {
        console.log(result.error);
      }

      this.isLoaded = true;
    },
  },
});
