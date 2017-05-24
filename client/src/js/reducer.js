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
    }
    //todo: add support with fileupload
    // {
    //     displayName: "SVG",
    //     filterType: "url",
    //     component: "SVGUrl"
    // }
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
            isUploading: true,
            imageSrc: action.imageSrc,
            errorMsg: null
        });
        case actions.FILTERABLE_UPLOAD_FAILURE:
            return Object.assign({}, state, {
                isUploading: false,
                imageSrc: null,
                errorMsg: action.errorMsg
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