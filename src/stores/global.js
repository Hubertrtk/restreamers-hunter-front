import { MODALS } from "@/utils/constants";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    modals: {},
    productId: null,
    licenseEmails: {
      "hubr2000@gmail.com": ["234", "253"],
    },
  }),
  getters: {
    getLicenseEmails: (state) => {
      return state.licenseEmails;
    },
  },
  actions: {
    addModal(modalType, data) {
      if (!MODALS[modalType]) {
        throw new Error(`Modal type ${modalType} doesn't exisits`);
      }
      const modalId = uuidv4();
      this.modals[modalId] = {
        modalType,
        data,
      };
      console.log(this.modals);
    },
    removeModal(modalId) {
      if (this.modals[modalId]) {
        delete this.modals[modalId];
      } else {
        console.warn(`Modal with id ${modalId} not found`);
      }
    },
    /**
     * * @param {string{}} emails email - [productIds]
     */
    addLicenseEmails(emails) {
      if (!this.haveLicenses.includes(email)) {
        this.haveLicenses.push(email);
      }
    },
  },
});
