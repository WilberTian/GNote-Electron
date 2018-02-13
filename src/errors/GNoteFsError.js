import * as constant from '../configs/errors';

export default class GNoteFsError extends Error {
    constructor(message) {
        super(message);
        this.name = constant.GNOTE_FS;
    }
}
