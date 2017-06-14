//todo: split (file per reeducer)
import { combineReducers } from "redux";
import * as actions from "./actions";

const filterList = [
    {
        displayName: "Blur",
        filterType: "blur",
        component: "Blur"
    },
    {
        displayName: "Brightness",
        filterType: "brightness",
        component: "Brightness"
    },
    {
        displayName: "Contrast",
        filterType: "contrast",
        component: "Contrast"
    },
    {
        displayName: "Drop shadow",
        filterType: "drop-shadow",
        component: "DropShadow"
    },
    {
        displayName: "Grayscale",
        filterType: "grayscale",
        component: "Grayscale"
    },
    {
        displayName: "Hue rotate",
        filterType: "hue-rotate",
        component: "HueRotate"
    },
    {
        displayName: "Invert",
        filterType: "invert",
        component: "Invert"
    },

    {
        displayName: "Opacity",
        filterType: "opacity",
        component: "Opacity"
    },
    {
        displayName: "Saturate",
        filterType: "saturate",
        component: "Saturate"
    },
    {
        displayName: "SVG",
        filterType: "url",
        component: "SVGUrl"
    }
];

function filterListReducer(state = [], action) {
    switch (action.type) {
        case actions.LOAD_FILTERS:
            return filterList;
        default:
            return state;
    }
}

function activeFiltersReducer(state = [], action) {
    switch (action.type) {
        case actions.FILTER_CHANGE:
            let newActiveFilters = state.filter(
                f => f.filterType !== action.filterType
            );

            newActiveFilters.push({
                value: action.value,
                filterType: action.filterType
            });

            return newActiveFilters;
        //todo: this is a duplication of a filter component logic
        case actions.URL_FILTER_UPLOAD_SUCCESS:
            let filters = state.filter(
                    f => f.filterType !== "url"
                ),
                currentUrlFilter = state.filter(
                    f => f.filterType === "url"
                )[0],
                elementId = currentUrlFilter ? currentUrlFilter.value.split("#")[1] :
                ""

            filters.push({
                value: `${action.fileUrl}#${elementId}`,
                filterType: "url"
            });

            return filters;
        default:
            return state;
    }
}

function filterableReducer (state = {}, action) {
    switch (action.type) {
        case actions.FILTERABLE_UPLOAD_START:
            return Object.assign({}, state, {
                isUploading: true,
                imageSrc: null,
                errorMsg: null
            });
        case actions.FILTERABLE_UPLOAD_SUCCESS:
        return Object.assign({}, state, {
            isUploading: false,
            imageSrc: action.imageSrc,
            errorMsg: null
        });
        case actions.FILTERABLE_UPLOAD_FAILURE:
            return Object.assign({}, state, {
                isUploading: false,
                imageSrc: null,
                errorMsg: action.errorMsg
            });
        case actions.FILTERABLE_GET_PERSISTED:
           
            return Object.assign({}, state, {
                isUploading: false,
                imageSrc: action.imageSrc,
                errorMsg: null
            });
        default:
            return state;
    }
}

export default combineReducers({
    filterList: filterListReducer,
    activeFilters: activeFiltersReducer,
    filterable: filterableReducer
});