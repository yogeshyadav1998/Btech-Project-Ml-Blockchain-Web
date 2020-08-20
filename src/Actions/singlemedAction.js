import axios from 'axios';
const host = "http://127.0.0.1:5000";

export const getInputResult = (input) => dispatch => {
  dispatch({ type: "GET_INPUT_SUGESSTIONS_REQUEST" })
  axios.get(`${host}/api/data_merged/get_medicinesSuggestions?input=${input}`).then(response => {
    dispatch({ type: "GET_INPUT_SUGESSTIONS_SUCCESS", payload: response.data.result });
  }).catch(error => {
    dispatch({ type: "GET_INPUT_SUGESSTIONS_FAILURE", payload: error.response.data })
  })
}

export const getAllSatls = () => dispatch => {
  dispatch({ type: "GET_ALL_SALTS_REQUEST" })
  axios.get(`${host}/api/all_drug_data`).then(response => {
    dispatch({ type: "GET_ALL_SALTS_SUCCESS", payload: response.data.result })
  }).catch(error => {
    dispatch({ type: "GET_ALL_SALTS_FAILURE", payload: error.response.data })
  })
}
export const getMedSaltDetail = (name) => dispatch => {
  dispatch({ type: "GET_MED_SALTS_DETAIL_REQUEST", payload: name })
  axios.post(`${host}/api/data_merged/get_medicines?input=`, name).then(response => {
    dispatch({ type: "GET_MED_SALTS_DETAIL_SUCCESS", payload: response.data.output })
  }).catch(error => {
    dispatch({ type: "GET_MED_SALTS_DETAIL_FAILURE", payload: error })
  })
}
export const getFilteredSalts = (data) => dispatch => {
  dispatch({ type: "GET_FILTERED_SALTS_REQUEST", payload: data })
  axios.post(`${host}/api/filter_api`, data)
    .then(response => {
      dispatch({ type: "GET_FILTERED_SALTS_SUCCESS", payload: response.data })
    })
    .catch(err => {
      dispatch({ type: "GET_FILTERED_SALTS_FAILURE", payload: err.response.data })
    });
};