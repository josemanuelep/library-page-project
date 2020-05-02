import {getUrlParameter} from './util/url-params.js'; 

$(document).ready(function () {
    console.log('Book detail js loaded!');
    getBook();
    $("#delete_book").click(function (e) { 
        e.preventDefault();
        bootbox.confirm("¿Desea eliminar el libro?", function(result){ 
           if(result){
               deleteBook();
               window.location.href = "http://127.0.0.1/library-page-project/#";
           }
        });
        
    });
});

var book = [];

function getBook() {
    $.ajax({
        type: "GET",
        url: "api/books/read_one.php?id="+getUrlParameter('id'),
        data: "",
        dataType: "JSON",
        success: function (book) {
            let isBorrwed = book.isBorrwed==0 ? false : true;
            $('#book_name').val(book.book_name);
            $('#book_type').val(book.book_type);
            $('#book_isbn').val(book.isbn);
            $('#inputState option[value='+isBorrwed+']').attr("selected", true);
            $("#user_name").val(book.name_user);
            $("#user_last").val(book.last_name);
            $("#user_doc").val(book.doc);
            $("#book_initial_date").val(book.init_date);
            $("#book_end_date").val(book.end_date);

        }
    });
}

function deleteBook(){
    var id= {
        "id":getUrlParameter('id')
    }
    $.ajax({
        type: "POST",
        url: "api/books/delete.php",
        data: JSON.stringify(id),
        dataType: "JSON",
        success: function (response) {
            console.log(response);
        }
    });
}

function updateBook(){
    var id= {
        "id":getUrlParameter('id')
    }
    $.ajax({
        type: "POST",
        url: "api/books/delete.php",
        data: JSON.stringify(id),
        dataType: "JSON",
        success: function (response) {
            console.log(response);
        }
    });
}


