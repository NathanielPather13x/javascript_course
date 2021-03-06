let API_KEY = "api_key=dc140afe3fd3a251c2fdf9dcd835be5c";
let interestingStr = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=10&format=json&nojsoncallback=1&" + API_KEY;
let photos = [];
let nrequest;
let nreceive;

$(document).ready(function() {
    $.get(interestingStr, function(data){
        fetchPhoto(data);
    })
});

function fetchPhoto(data) {
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
            display(photos);
        }
    });
}

function display(photos) {
    let htmlStr = "";
    for (let i = 0; i < photos.length; i++) {
        htmlStr += `<figure><a href="${photos[i].file}"><img src="${photos[i].file}" alt="data.photos[i].file" width="200" height="200"></a><figurecaption>${photos[i].title}</figurecaption></figure>`;
    }
    $("#photos").html(htmlStr);
}