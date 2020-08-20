const initialState = {
    isgetAllSaltsLoading: false
}

const singlemedreducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_INPUT_SUGESSTIONS_REQUEST":
            return{
               ...state, isgetInputResultLoading: true,
            }
        case "GET_INPUT_SUGESSTIONS_SUCCESS":
          let names = [];
          action.payload.forEach(key => {
                names.push({ value: key.medName })
            });
            console.log("Sugesstions:",names);
            return{
               ...state, isgetInputResultLoading: false, input_sugesstions: names
            }
        case "GET_INPUT_SUGESSTIONS_FAILURE":
            return{
                ...state, isgetInputResultLoading: false, fetchSugesstionsError: action.payload
            }
        case "GET_ALL_SALTS_REQUEST":
            return {
                ...state, isgetAllSaltsLoading: true
            }
        case "GET_ALL_SALTS_SUCCESS":
            let all_medicinesTEMP = [];
            let all_medicines = [];
            action.payload.forEach(index => {
                all_medicinesTEMP.push(index.medName)
            });
            let uniqueMeds = [...new Set(all_medicinesTEMP)];
            uniqueMeds.forEach(index =>{
                    all_medicines.push({ value: index})
            })
            return {
                ...state, isgetAllSaltsLoading: false, all_salts_medicines: all_medicines
            }
        case "GET_ALL_SALTS_FAILURE":
            return {
                ...state, isgetAllSaltsLoading: false, allSaltsFetchError: action.payload
            }
        case "GET_MED_SALTS_DETAIL_REQUEST":
            return {
                ...state, isgetMedSaltDetailsLoading: true
            }
        case "GET_MED_SALTS_DETAIL_SUCCESS":
            return {
                ...state, isgetMedSaltDetailsLoading: false, all_items: action.payload
            }
        case "GET_MED_SALTS_DETAIL_FAILURE":
            return {
                ...state, isgetMedSaltDetailsLoading: false, medSaltsDetailFetchError: action.payload
            }
        case "GET_FILTERED_SALTS_REQUEST":
            return {
                ...state, isgetMedSaltDetailsLoading: true
            }
        case "GET_FILTERED_SALTS_SUCCESS":
            if ( action.payload === undefined || action.payload.length  === undefined) { return { ...state, isgetMedSaltDetailsLoading: false } }
            console.log("GET_FILTERED_SALTS_SUCCESS",action.payload)
            return {
                ...state, isgetMedSaltDetailsLoading: false, all_items: action.payload
            }
        case "GET_FILTERED_SALTS_FAILURE":
            return {
                ...state, isgetMedSaltDetailsLoading: false, filteredSaltsFetchError: action.payload
            }

        default:
            return state
    }
}
export default singlemedreducer;