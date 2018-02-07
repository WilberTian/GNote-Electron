var path = require('path');
var fs = require('fs');

var gnotesFolder = '_gnotes';
var gnotesPath = path.join(__dirname, gnotesFolder);


function isFileExist(path) {
    try {
        fs.accessSync(path,fs.F_OK);
    } catch(e) {
        return false;
    }
    return true;
}

function isLocalDraft(content) {
    if ('commitMsg' in content) {
        return true;
    }

    return false;
}

function getLocalGNoteList() {
    var gnoteList = [];

    fs.readdirSync(gnotesPath).forEach(function(gnoteItem) {
        var gnoteItemPath = path.join(gnotesPath, gnoteItem);
        var gnoteItemContent = fs.readFileSync(gnoteItemPath);

        gnoteList.push({
            isDraft: isLocalDraft,
            content: JSON.parse(gnoteItemContent)
        });
    });

    return gnoteList;
}

function createLocalGNote(name, content) {
    var gnoteItemPath = path.join(gnotesPath, name);
    if(isFileExist(gnoteItemPath)) {

    } else {
        fs.writeFileSync(gnoteItemPath, content);
    }
}

function updateLocalGNote(name, content) {
    var gnoteItemPath = path.join(gnotesPath, name);
    fs.writeFileSync(gnoteItemPath, content);
}


var gnoteUtils = {
    getLocalGNoteList,
    createLocalGNote,
    updateLocalGNote
};


module.exports = gnoteUtils;
