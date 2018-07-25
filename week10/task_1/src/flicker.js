import $ from "jquery";
//import {navAppend} from "./view.js";
let API_KEY = "api_key=dc140afe3fd3a251c2fdf9dcd835be5c";
let interestingStr = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=10&format=json&nojsoncallback=1&" + API_KEY;
let photos = [];
let nrequest;
let nreceive;
// initialize the callback variable
let ready_cb;

//getInteresting function is passed flickerReady function
// ready is the flickrReady function, it is just renamed.
// the paramater name can be anything
// the paramter just holds the data, it doesn't refer to the actual function.
export function getInteresting(ready) {
    // the callback variable now holds the flickrReady function
    ready_cb = ready;
    $.get(interestingStr, function(data){
        fetchPhoto(data);
    });
}

function fetchPhoto(data) {
    // can use this instead but using splice
    //photos = [];
    nrequest = data.photos.photo.length;
    nreceive = 0;
    for (let i = 0; i < data.photos.photo.length; i++) {
        let photoObj = {id: data.photos.photo[i].id, title: data.photos.photo[i].title};
        photos.push(photoObj);
        getSizes(photoObj);
    }
}

function getSizes(photoObj) {
    let getSizesStr = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&"+API_KEY+ "&photo_id="+photoObj.id;
                       
    $.get(getSizesStr, function(data){
        nreceive++;
        photoObj.file = data.sizes.size[5].source;
        photoObj.full = data.sizes.size[data.sizes.size.length-1].source;
        if (nreceive == nrequest) {
            //call flickerReady in controller with the pphotos as a paramter
            ready_cb(photos);
        }
    });
}

export function searchRegister() {
    let searchStr = "";
    let search = "";
    searchStr = $("#search-input").val();
    console.log("search string is: " + searchStr);
    search = "https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=10&format=json&nojsoncallback=1&extras=url_o&"+API_KEY+ "&text="+searchStr;
    
    $.get(search, function(data){
        fetchPhoto(data);
        ready_cb(photos);
    });
    // can also clear array at top instead of splice
    photos.splice(0, 20);
    return searchStr;
}