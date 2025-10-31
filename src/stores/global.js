import { MODALS } from "@/utils/constants";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    showToolBar: false,
    modals: {},
    selectedEmails: {},
    productId: null,
    licenseEmails: {
      "hubr2000@gmail.com": null,
    },
  }),
  getters: {
    getLicenseEmails: (state) => {
      return state.licenseEmails;
    },
    getProductId: (state) => {
      return state.productId;
    },
    getProductId: (state) => {
      return state.productId;
    },
    getShowToolBar: (state) => {
      return state.showToolBar;
    },
    allModals: (state) => {
      return state.modals;
    },
    getSelectedEmails: (state) => {
      return state.selectedEmails;
    },
  },
  actions: {
    addModal(modalType, data) {
      if (!MODALS[modalType]) {
        throw new Error(`Modal type ${modalType} doesn't exist`);
      }
      const modalId = uuidv4();
      this.modals[modalId] = {
        id: modalId,
        modalType,
        data,
      };
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
    setShowToolBar(show) {
      this.showToolBar = show;
    },
    removeModal(id) {
      delete this.modals[id];
    },
    addSelectedEmails(emails) {
      this.selectedEmails = { ...this.selectedEmails, ...emails };
    },
    removeSelectedEmail(email) {
      delete this.selectedEmails[email];
    },
  },
});
