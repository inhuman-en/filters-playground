import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSun,
    faAdjust,
    faPalette,
    faThermometerThreeQuarters,
    faFileUpload,
    faTint,
    faPencilAlt,
    faSyncAlt,
    faClone,
    faEraser
} from '@fortawesome/free-solid-svg-icons';

export default class IconLibrary {
    static register() {
        library.add([
            faTint,
            faSun,
            faAdjust,
            faClone,
            faPencilAlt,
            faPalette,
            faSyncAlt,
            faEraser,
            faThermometerThreeQuarters,
            faFileUpload
        ]);
    }
}
