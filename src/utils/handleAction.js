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
    case ACTIONS.search_by_email:
      params = deleteWhiteSigns(params)[0];
      modal = MODALS.USER_INFO;
      break;
    case ACTIONS.search_by_wtmId:
      modal = MODALS.SEARCH_BY_NAGRA;
      break;
    case ACTIONS.get_related_users_by_email:
      modal = MODALS.USER_ROORS;
      break;
    case ACTIONS.get_mesh:
      meshId = globalStore.getMeshId || params;
      modal = MODALS.MESH;
      globalStore.addModal(modal, meshId);
      return;
    case ACTIONS.getLicenses:
      console.log(" licenses for emails: ");
      haveLicenses(params, globalStore.productId).then((res) => {
        for (const [email, isLicense] of Object.entries(res.data)) {
          if (isLicense) {
            globalStore.addHaveLicenseEmail(email);
          }
        }
      });
      return;
    case ACTIONS.add_emails_to_mesh:
      meshId = globalStore.getMeshId;
      if (!meshId) {
        console.warn("No mesh selected");
        return;
      }
      const emails = deleteWhiteSigns(globalStore.getSearchInput);
      if (emails.length === 0) {
        console.warn("No emails to add");
        return;
      }
      addMeshSuspectsByEmails(meshId, emails)
        .then((res) => {
          console.log("Emails added to mesh successfully");
          console.log(res);
        })
        .catch((error) => {
          console.error("Error adding emails to mesh:", error);
        });
      return;
    default:
      return;
  }
  globalStore.addModal(modal, params);
}
