$(document).ready(function () {
    console.log('Book detail js loaded!');
    getBook();
  
});

var book = [];

function getBook() {
    $.ajax({
        type: "GET",
        url: "api/books/read_one.php?id=1",
        data: "",
        dataType: "JSON",
        success: function (book) {
            console.log(book);
            $('#book_name').val(book.book_name);
            $('#book_type').val(book.book_type);

        }
    });
}


