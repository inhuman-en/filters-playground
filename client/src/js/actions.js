/*
 * action types
 */
export const LOAD_FILTERS = "LOAD_FILTERS";
export const FILTER_CHANGE = "FILTER_CHANGE";

/*
 * action creators
 */

export function loadFilters() {
  return { type: LOAD_FILTERS }
}

export function filterChange(data) {
  return { type: FILTER_CHANGE, filterType: data.filterType, value: data.value }
}