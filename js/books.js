$(document).ready(function () {
    console.log('Books js loaded!');
    var dialog = bootbox.dialog({
        title: 'Espere un momento',
        message: '<p><i class="fa fa-spin fa-spinner"></i> Cargando...</p>'
    });
    getBooks();
    dialog.init(function(){
        setTimeout(function(){
            dialog.find('.bootbox-body').html('I was loaded after the dialog was shown!');
        }, 3000);
    });
  
});

var books = [];

function getBooks() {
    $.get("api/books/read.php", function (data) {
        books = data;
        fillBooks();
    });
}

function fillBooks() {
    $.each(books, function (indexInArray, valueOfElement) {
        if (valueOfElement.borrowed==0) {
            let template = '<div class="col-lg-4 col-md-6 mb-4">\
                       <div class="card h-100">\
                         <a href="book-form.html?id='+valueOfElement.id+'"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\
                         <div class="card-body">\
                           <h6 class="card-subtitle mb-2 text-muted">Nombre:</h6>\
                           <h4 class="card-title">\
                             <p id="book_name">'+valueOfElement.name+'</a>\
                           </h4>\
                           <h6 class="card-subtitle mb-2 text-muted">Tipo:</h6>\
                           <h5 id="book_type">'+valueOfElement.type+'</h5>\
                           <br>\
                           <h6 class="card-subtitle mb-2 text-muted">ISBN:</h6>\
                           <p id="book_isbn" class="card-text">1022</p>\
                         </div>\
                         <div class="alert alert-success" role="alert">\
                         Disponible para prestar!\
                       </div>\
                         <div class="card-footer">\
                           <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>\
                         </div>\
                       </div>\
                     </div>';
                     $("#books_container").append(template);
        } else {
            let template = '<div class="col-lg-4 col-md-6 mb-4">\
            <div class="card h-100">\
              <a href="book-form.html?id='+valueOfElement.id+'"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\
              <div class="card-body">\
                <h6 class="card-subtitle mb-2 text-muted">Nombre:</h6>\
                <h4 class="card-title">\
                  <p id="book_name">'+valueOfElement.name+'</a>\
                </h4>\
                <h6 class="card-subtitle mb-2 text-muted">Tipo:</h6>\
                <h5 id="book_type">'+valueOfElement.type+'</h5>\
                <br>\
                <h6 class="card-subtitle mb-2 text-muted">ISBN:</h6>\
                <p id="book_isbn" class="card-text">1022</p>\
              </div>\
              <div class="alert alert-danger" role="alert">\
              Prestado!\
            </div>\
              <div class="card-footer">\
                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>\
              </div>\
            </div>\
          </div>';
          $("#books_container").append(template);
        }
    });
}