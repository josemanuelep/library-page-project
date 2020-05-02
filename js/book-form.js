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
    $("#update_book").click(function (e) { 
        e.preventDefault();
        bootbox.confirm("¿Desea actualizar el libro?", function(result){ 
           if(result){
               updateBook();
              
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
    var book= {
        "id":getUrlParameter('id'),
        "name": $('#book_name').val(),
        "type": $('#book_type').val(),
        "isbn": $('#book_isbn').val()

    }
    $.ajax({
        type: "POST",
        url: "api/books/update.php",
        data: JSON.stringify(book),
        dataType: "JSON",
        success: function (response) {
            if (response.message == "Book was updated.") {
                bootbox.alert("Se ha actualizado el libro!");
            } else {
                bootbox.alert("No se  ha actualizado el libro!, intente de nuevo");
            }
        }
    });
}


