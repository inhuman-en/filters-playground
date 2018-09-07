//todo: split (file per reeducer)
import { combineReducers } from 'redux';
import * as actions from './actions';

const filterList = [
    {
        displayName: 'Blur',
        filterType: 'blur',
        component: 'Blur',
        icon: 'tint'
    },
    {
        displayName: 'Brightness',
        filterType: 'brightness',
        component: 'Brightness',
        icon: 'sun'
    },
    {
        displayName: 'Contrast',
        filterType: 'contrast',
        component: 'Contrast',
        icon: 'adjust'
    },
    {
        displayName: 'Drop shadow',
        filterType: 'drop-shadow',
        component: 'DropShadow',
        icon: 'clone'
    },
    {
        displayName: 'Grayscale',
        filterType: 'grayscale',
        component: 'Grayscale',
        icon: 'pencil-alt'
    },
    {
        displayName: 'Hue rotate',
        filterType: 'hue-rotate',
        component: 'HueRotate',
        icon: 'palette'
    },
    {
        displayName: 'Invert',
        filterType: 'invert',
        component: 'Invert',
        icon: 'sync-alt'
    },

    {
        displayName: 'Opacity',
        filterType: 'opacity',
        component: 'Opacity',
        icon: 'eraser'
    },
    {
        displayName: 'Saturate',
        filterType: 'saturate',
        component: 'Saturate',
        icon: 'thermometer-three-quarters'
    },
    {
        displayName: 'SVG',
        filterType: 'url',
        component: 'SVGUrl',
        icon: 'file-upload'
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
            let newActiveFilters = state.filter(f => f.filterType !== action.filterType);

            newActiveFilters.push({
                value: action.value,
                filterType: action.filterType
            });

            return newActiveFilters;
        //todo: this is a duplication of a filter component logic
        case actions.URL_FILTER_UPLOAD_SUCCESS:
            let filters = state.filter(f => f.filterType !== 'url'),
                currentUrlFilter = state.filter(f => f.filterType === 'url')[0],
                elementId = currentUrlFilter ? currentUrlFilter.value.split('#')[1] : '';

            filters.push({
                value: `${action.fileUrl}#${elementId}`,
                filterType: 'url'
            });

            return filters;
        default:
            return state;
    }
}

function filterableReducer(state = {}, action) {
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
