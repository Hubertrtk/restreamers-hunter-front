import { MODALS } from "@/utils/constants";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    modals: {},
  }),
  getters: {
    allModals: (state) => {
      return Object.entries(state.modals).map(([id, modal]) => ({
        id,
        ...modal,
      }));
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
  },
});
