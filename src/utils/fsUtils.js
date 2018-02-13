import { GNoteFsError } from '../errors';

const path = require('path');
const fs = require('fs');

const gnotesFolder = '_gnotes';
const gnotesPath = path.resolve(gnotesFolder);

const isFileExist = (fsPath) => {
    try {
        fs.accessSync(fsPath, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
};

const isLocalDraft = (data) => {
    if ('commitMsg' in data) {
        return true;
    }

    return false;
};

export const getLocalGNoteList = () => {
    const gnoteList = [];

    fs.readdirSync(gnotesPath).filter((gnoteItem) => {
        return gnoteItem !== '.DS_Store';
    }).forEach((gnoteItem) => {
        const gnoteItemPath = path.join(gnotesPath, gnoteItem);
        const gnoteItemContent = fs.readFileSync(gnoteItemPath);

        const gnoteItemObj = JSON.parse(gnoteItemContent, 'utf8');
        gnoteList.push({
            isDraft: isLocalDraft(gnoteItemObj),
            name: gnoteItemObj.name
        });
    });

    return gnoteList;
};

export const getLocalGNoteData = (name) => {
    const gnoteItemPath = path.join(gnotesPath, name);
    const fileContentObj = JSON.parse(fs.readFileSync(gnoteItemPath, 'utf8'));

    return fileContentObj;
};

export const createLocalGNote = (name, data) => {
    const gnoteItemPath = path.join(gnotesPath, name);

    if (isFileExist(gnoteItemPath)) {
        throw new GNoteFsError('GNote with same name already exist!');
    } else {
        fs.writeFileSync(gnoteItemPath, data);
    }
};

export const updateLocalGNote = (name, data) => {
    const gnoteItemPath = path.join(gnotesPath, name);
    fs.writeFileSync(gnoteItemPath, data);
};

