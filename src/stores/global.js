import { MODALS } from "@/utils/constants";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    modals: {},
    productId: null,
    licenseEmails: {
      "hubr2000@gmail.com": null,
      //   damian: null,
    },
  }),
  getters: {
    getLicenseEmails: (state) => {
      return state.licenseEmails;
    },
    getProductId: (state) => {
      return state.productId;
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
      this.licenseEmails = {
        ...this.licenseEmails,
        ...emails,
      };
    },
    licenseCheck(email) {
      if (!this.licenseEmails[email]) {
        this.addLicenseEmails({ [email]: null });
      }
    },
    setProductId(id) {
      this.productId = id;
    },
  },
});
