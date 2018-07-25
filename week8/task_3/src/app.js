import $ from "jquery";
import styles from "./css/styles.css";
import img1 from "./assets/DSC01049.JPG";
import {display} from "./view.js";
import * as flicker from "./flicker.js";

$(document).ready(function() {
    $('#loaders').html(`<img src=${img1}>`)
    flicker.searchRegister();
    flicker.getInteresting(flickrReady);
    $("#model-close").click(function() {
        $('#model-container').css('display', 'none');
        $('#model-content').attr('src', '');
    });
});

function flickrReady(data) {
    display(data);
    registerModal();
}

function registerModal() {
        $('figure').each(function(index) {
        // This = the current figure
        // console.log(this);
       $(this).click(function() {
           $('#model-container').css('display', 'block');
           $('#model-content').attr('src', $(this).attr('data-full'));
           $('#model-caption').html($(this).attr('data-title'))
       });
    });
}