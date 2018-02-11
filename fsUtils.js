var path = require('path');
var fs = require('fs');

var gnotesFolder = '_gnotes';
var gnotesPath = path.resolve(gnotesFolder);

function isFileExist(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch(e) {
        return false;
    }
    return true;
}

function isLocalDraft(data) {
    if ('commitMsg' in data) {
        return true;
    }

    return false;
}

function getLocalGNoteList() {
    var gnoteList = [];

    fs.readdirSync(gnotesPath).forEach(function(gnoteItem) {
        var gnoteItemPath = path.join(gnotesPath, gnoteItem);
        var gnoteItemContent = fs.readFileSync(gnoteItemPath);

        var gnoteItemObj = JSON.parse(gnoteItemContent);
        gnoteList.push({
            isDraft: isLocalDraft(gnoteItemObj),
            name: gnoteItemObj.name
        });
    });

    return gnoteList;
}

function getLocalGNoteContent(name) {
    var gnoteItemPath = path.join(gnotesPath, name);
    var fileContentObj = JSON.parse(fs.readFileSync(gnoteItemPath, 'utf8'));
    return fileContentObj.content;
}

function createLocalGNote(name, data) {
    var gnoteItemPath = path.join(gnotesPath, name);
    fs.writeFileSync(gnoteItemPath, data);
}

function updateLocalGNote(name, data) {
    var gnoteItemPath = path.join(gnotesPath, name);
    fs.writeFileSync(gnoteItemPath, data);
}


var gnoteUtils = {
    getLocalGNoteList,
    getLocalGNoteContent,
    createLocalGNote,
    updateLocalGNote
};


module.exports = gnoteUtils;
