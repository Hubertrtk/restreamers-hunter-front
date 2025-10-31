import { ref } from "vue";
import { computed } from "vue";
import { useGlobalStore } from "@/stores/global";
import { ACTIONS, MODALS } from "./constants";
import { addMeshSuspectsByEmails, haveLicenses } from "@/api/serviceApi";
import { deleteWhiteSigns } from "./helpers";

export function handleAction(action, params) {
  const globalStore = useGlobalStore();
  let meshId;
  let modal;
  switch (action) {
    case ACTIONS.OPEN_USER_INFO_MODAL:
      modal = MODALS.USER_INFO;
      globalStore.addModal(modal, params);
      break;
    case ACTIONS.OPEN_USER_ROOTS_MODAL:
      modal = MODALS.USER_ROOTS;
      globalStore.addModal(modal, params);
      break;
    case ACTIONS.SEARCH_BY_WTMID:
      modal = MODALS.SEARCH_BY_NAGRA;
      globalStore.addModal(modal, params);
      break;
    default:
      return;
  }
}
