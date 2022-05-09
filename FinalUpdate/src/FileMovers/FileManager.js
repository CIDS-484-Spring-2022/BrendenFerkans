import * as React from "react";
import {fileMover} from "./FileMover"


let FileContext = React.createContext();


function FileMover({children})
{


let manageUpload = (files, callback) => {
    return fileMover.upload(files, (message) => {
        callback(message);
    });
};//end manage upload



let manageDownload = (fileNames, callback) => {
    return fileMover.download(fileNames, (message) => {
        callback(message);
    });
};

let loadHomePage = (user, callback) => {
    return fileMover.loadHomePage(user, (message) => {
        callback(message);
    });
};

let value = {manageUpload, manageDownload, loadHomePage};

return <FileContext.Provider value={value}>{children}</FileContext.Provider>;//what is provider
}//end function FileMover


function useFileMover()
{
    return React.useContext(FileContext);
}


export { useFileMover, FileMover, FileContext };//added file context for tryinh