import { getUrlParameter } from './util/url-params.js';

$(document).ready(function () {
    console.log('Book form detail js loaded!');
    $("#btn_save").click(function (e) { 
        e.preventDefault();
        saveBook();
    });
});

var book = [];

function saveBook() {
    var postData = {
        name:  $('#book_name').val(),
        type:   $('#book_type').val(),
        isbn:  $('#book_isbn').val(),
        borrowed: 0
    }

    $.ajax({
        type: "POST",
        url: "api/books/create.php",
        data:JSON.stringify(postData),
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            $('#book_name').val('');
            $('#book_type').val('');
            $('#book_isbn').val('');

        }
    });


}


