import { ref } from "vue";
import { computed } from "vue";
import { useGlobalStore } from "@/stores/global";
import { ACTIONS, MODALS } from "./constants";

export function handleAction(action, params) {
  const globalStore = useGlobalStore();

  let modal;
  switch (action) {
    case ACTIONS.search_by_email:
      modal = MODALS.USER_INFO;
      break;
    case ACTIONS.search_by_wtmId:
      modal = MODALS.SEARCH_BY_NAGRA;
      break;
    case ACTIONS.get_related_users_by_email:
      modal = MODALS.USER_ROORS;
      break;
    case ACTIONS.get_mesh:
      modal = MODALS.MESH;
      break;
    default:
      return;
  }
  globalStore.addModal(modal, params);
}
