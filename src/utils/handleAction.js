import { ref } from "vue";
import { computed } from "vue";
import { useGlobalStore } from "@/stores/global";
import { ACTIONS, MODALS } from "./constants";
import {
  addMeshSuspectsByEmails,
  haveLicenses,
  markAsFoundByNagra,
} from "@/api/serviceApi";
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
    case ACTIONS.REMOVE_SELECTED_EMAIL:
      globalStore.removeSelectedEmail(params);
      break;
    case ACTIONS.OPEN_MESH_INFO_MODAL:
      modal = MODALS.MESH;
      globalStore.addModal(modal, params);
      break;
    case ACTIONS.MARK_AS_FOUND_BY_NAGRA:
      const emails = Object.keys(params);
      const productId = globalStore.getProductId;
      if (!productId) {
        console.warn("Product ID is not set");
        return;
      }
      markAsFoundByNagra(emails, productId)
        .then((response) => {
          console.log("Marked as found by Nagra:", response);
        })
        .catch((error) => {
          console.error("Error marking as found by Nagra:", error);
        });
      break;
    default:
      return;
  }
}
