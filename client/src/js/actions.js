import "whatwg-fetch";
import storageMgr from "./StorageManager";

/*
 * action types
 */
export const LOAD_FILTERS = "LOAD_FILTERS";
export const FILTER_CHANGE = "FILTER_CHANGE";

export const URL_FILTER_UPLOAD_START = "URL_FILTER_UPLOAD_START";
export const URL_FILTER_UPLOAD_SUCCESS = "URL_FILTER_UPLOAD_SUCCESS";
export const URL_FILTER_UPLOAD_FAILURE = "URL_FILTER_UPLOAD_FAILURE";

export const FILTERABLE_UPLOAD_START = "FILTERABLE_UPLOAD_START";
export const FILTERABLE_UPLOAD_SUCCESS = "FILTERABLE_UPLOAD_SUCCESS";
export const FILTERABLE_UPLOAD_FAILURE = "FILTERABLE_UPLOAD_FAILURE";
export const FILTERABLE_GET_PERSISTED = "FILTERABLE_GET_PERSISTED";
export const FILTERABLE_PERSIST = "FILTERABLE_PERSIST";

/*
 * action creators
 */

export function loadFilters() {
  return { type: LOAD_FILTERS }
}

export function filterChange(data) {
  return { type: FILTER_CHANGE, filterType: data.filterType, value: data.value }
}

export function urlFilterUploadStart (formData) {
  return { type: URL_FILTER_UPLOAD_START }
}

export function urlFilterUploadSuccess(result) {
  return { type: URL_FILTER_UPLOAD_SUCCESS, fileUrl: result.fileUrl }
}

export function urlFilterUploadFailure(error) {
  return { type: URL_FILTER_UPLOAD_FAILURE, errorMsg: error }
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

export function getPersistedFilterable() {
  return {
      type: FILTERABLE_GET_PERSISTED,
      imageSrc: storageMgr.get("filterableSrc")
    };
}

export function persistFilterable(src) {
  storageMgr.set("filterableSrc", src);
  
    return {
      type: FILTERABLE_PERSIST,
      imageSrc: storageMgr.get("filterableSrc")
    };
}

export function uploadUrlFilter(formData) {
  return function (dispatch) {
    dispatch(urlFilterUploadStart(formData))

    return fetch(`/uploadsvgfilter`, {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(json => dispatch(urlFilterUploadSuccess(json)))
      .catch(e => dispatch(urlFilterUploadFailure(e)))
  }
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
      .then(json => dispatch(persistFilterable(json.imageSrc)))
      .catch(e => dispatch(uploadFilterableFailure(e)))
  }
}