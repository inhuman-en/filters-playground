import "whatwg-fetch";

/*
 * action types
 */
export const LOAD_FILTERS = "LOAD_FILTERS";
export const FILTER_CHANGE = "FILTER_CHANGE";

export const FILTERABLE_UPLOAD_START = "FILTERABLE_UPLOAD_START";
export const FILTERABLE_UPLOAD_SUCCESS = "FILTERABLE_UPLOAD_SUCCESS";
export const FILTERABLE_UPLOAD_FAILURE = "FILTERABLE_UPLOAD_FAILURE";


/*
 * action creators
 */

export function loadFilters() {
  return { type: LOAD_FILTERS }
}

export function filterChange(data) {
  return { type: FILTER_CHANGE, filterType: data.filterType, value: data.value }
}

export function uploadFilterableStart (formData) {
  return { type: FILTERABLE_UPLOAD_START }
}

export function uploadFilterableSuccess(result) {
  return { type: FILTERABLE_UPLOAD_SUCCESS, imageSrc: result.imageSrc }
}

export function uploadFilterableFailure(error) {
  return { type: FILTERABLE_UPLOAD_FAILURE, errorMsg: error }
}

export function uploadFilterable(formData) {
  return function (dispatch) {
    dispatch(uploadFilterableStart(formData))

    return fetch(`/uploadimage`, {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(json => dispatch(uploadFilterableSuccess(json)))
      .catch(e => dispatch(uploadFilterableFailure(e)))
  }
}