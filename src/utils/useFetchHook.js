import { ref } from "vue";

export function useFetchHook(apiFunction) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  const getData = async (params) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await apiFunction(params);
      data.value = response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || err.message || "Wystąpił błąd";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    error,
    isLoading,
    getData,
  };
}
