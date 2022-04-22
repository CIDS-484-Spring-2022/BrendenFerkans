import * as React from "react";
import {fileMover} from "./FileMover"


let FileContext = React.createContext();

function FileMover({children})
{


let manageUpload = (files, callback) => {
    return fileMover.upload(files, (message) => {//this line returns the data from server---actually i think it returns something different?

        //under the return is some extra stuff
        
        callback(message);
      
    });
};//end manage upload



let manageDownload = (fileNames, callback) => {
    return fileMover.download(fileNames, (message) => {
        //stuffs for download
    });
};

let value = {manageUpload, manageDownload};

return <FileContext.Provider value={value}>{children}</FileContext.Provider>;//what is provider
}//end function FileMover


function useFileMover()
{
    return React.useContext(FileContext);
}


export { useFileMover, FileMover };