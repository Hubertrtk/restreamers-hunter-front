import axiosInstance from "./axios";

export const getSuspectsLobby = (monitorType) => {
  return axiosInstance.post(`/restreamershunter/getSuspectsLobby`, {
    monitorType,
  });
};

export const getUserByEmail = (email) => {
  return axiosInstance.post(`/restreamershunter/getUserByEmail`, {
    email,
  });
};

export const getUsersByWtmIds = (ids) => {
  return axiosInstance.post(`/restreamershunter/getUsersByWmtIds`, {
    ids,
  });
};

export const findUsersRoots = (email) => {
  return axiosInstance.post(`/restreamershunter/findUsersRoots`, {
    emails: [email],
  });
};

export const getMeshes = (type) => {
  return axiosInstance.post(`/restreamershunter/getMeshes`, {
    monitorType: type,
  });
};

export const getMeshData = (meshId) => {
  return axiosInstance.post(`/restreamershunter/getMeshData`, {
    meshId,
  });
};

export const addMeshSuspectsByEmails = (meshId, emails) => {
  return axiosInstance.post(`/restreamershunter/addMeshSuspectsByEmails`, {
    meshId,
    emails,
  });
};

export const runMonitor = (meshId) => {
  return axiosInstance.post(`/restreamershunter/runMonitorMesh`, {
    meshId,
  });
};

export const markAsFoundByNagra = (emails) => {
  return axiosInstance.post(`/restreamershunter/markAsFoundByNagra`, {
    emails,
  });
};

export const haveLicenses = (emails, productId) => {
  return axiosInstance.post(`/restreamershunter/haveLicenses`, {
    emails,
    productId,
  });
};

export const getLicenses = (emails) => {
  return axiosInstance.post(`/restreamershunter/getLicenses`, {
    emails,
  });
};
