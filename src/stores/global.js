import { MODALS } from "@/utils/constants";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    modals: {},
    selectedMeshId: null,
    searchInput: "",
    showSearchInput: false,
    productId: null,
  }),
  getters: {
    allModals: (state) => {
      return Object.entries(state.modals).map(([id, modal]) => ({
        id,
        ...modal,
      }));
    },
    getMeshId: (state) => {
      return state.selectedMeshId;
    },
    getSearchInput: (state) => {
      return state.searchInput;
    },
    getShowSearchInput: (state) => {
      return state.showSearchInput;
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
    selectMeshId(meshId) {
      this.selectedMeshId = meshId;
    },
    changeShowSearchInput(isVisible) {
      this.showSearchInput = isVisible;
    },
    addValueToSearchInput(value) {
      this.searchInput += value;
    },
  },
});
