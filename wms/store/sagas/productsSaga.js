import { takeLatest, call, put } from "redux-saga/effects";
import api from "@/utils/axiosInstance";
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from "../slices/productsSlice";

// API call to get products
const fetchProductsApi = async () => {
  const token = localStorage.getItem("token"); // Get JWT token

  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await api.get("/master/products/unpublished", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      sort_by: "created,d",
      page: 1,
    },
  });

  return response.data;
};

// Saga to fetch products
function* fetchProductsSaga() {
  try {
    const data = yield call(fetchProductsApi);
    yield put(fetchProductsSuccess(data)); // Send full API response to the reducer
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

// Watcher saga
export function* watchFetchProducts() {
  yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
}
