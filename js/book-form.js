$(document).ready(function () {
  console.log('Book detail js loaded!');
  getCategories();
  getBook();
  $("#delete_book").click(function (e) {
    e.preventDefault();
    bootbox.confirm("¿Desea eliminar el libro?", function (result) {
      if (result) {
        deleteBook();
        window.location.href = "http://127.0.0.1/library-page-project/#";
      }
    });

  });
  $("#update_book").click(function (e) {
    e.preventDefault();
    bootbox.confirm("¿Desea actualizar el libro?", function (result) {
      if (result) {
        updateBook();

      }
    });

  });
});

var book = [];

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
}
function getBook() {
  $.ajax({
    type: "GET",
    url: "api/books/read_one.php?id=" + getUrlParameter('id'),
    data: "",
    dataType: "JSON",
    success: function (book) {
      let isBorrwed = book.isBorrwed == 0 ? false : true;
      console.info(book);
      //document.getElementById("book_type").selectedIndex = book.book_type;
      if (isBorrwed) {
        console.log("Painting with lend");
        let template = ' <form>\
            <hr>\
          <h4>Datos del libro</h4>\
            <div class="form-row">\
              <div class="form-group col-md-12">\
                <label for="inputEmail4">Nombre libro</label>\
                <input  type="text" class="form-control" id="book_name">\
              </div>\
              <div class="form-group col-md-6">\
                <label for="inputPassword4">Tipo libro</label>\
                <select id="book_type" class="form-control">\
                <option >Seleccione...</option>\
              </select>\
              </div>\
            </div>\
            <div class="form-row">\
            <div class="form-group col-md-6">\
              <label for="inputAddress">ISBN</label>\
              <input type="text" class="form-control" id="book_isbn">\
            </div>\
            <div class="form-group col-md-6">\
              <label for="inputState">Prestado?</label>\
              <select id="inputState" class="form-control">\
                <option >Seleccione...</option>\
                <option value="true" >Si</option>\
                <option value="false">No</option>\
              </select>\
            </div>\
          </div>\
          <button id="delete_book" type="button" class="btn btn-danger mb-3">Eliminar</button>\
          <button id="update_book" type="button" class="btn btn-warning mb-3">Actualizar</button>\
          <br>\
          <button id="giveback_book" type="button" class="btn btn-success mb-1">Reportar como entregado</button>\
          <hr>\
          <h4>Datos de quien lo tiene prestado</h4>\
            <div class="form-group">\
              <label for="inputAddress2">Nombre:</label>\
              <input type="text" class="form-control" id="user_name" readonly >\
            </div>\
            <div class="form-row">\
              <div class="form-group col-md-6">\
                <label for="inputCity" >Apellido:</label>\
                <input type="text" class="form-control" id="user_last" readonly>\
              </div>\
              <div class="form-group col-md-6">\
                <label for="inputZip">Documento:</label>\
                <input type="text" class="form-control" id="user_doc"  readonly>\
              </div>\
            </div>\
            <div class="form-row">\
              <div class="form-group col-md-6">\
                <label for="inputCity">Fecha de prestamo:</label>\
                <input type="text" class="form-control" id="book_initial_date" readonly>\
              </div>\
              <div class="form-group col-md-6">\
                <label class="text-danger" for="inputZip">Fecha de entrega:</label>\
                <input type="text" class="form-control" id="book_end_date" readonly>\
              </div>\
            </div>\
          </form>';
        $("#books_container").append(template);
        $('#book_name').val(book.book_name);
        $('#book_isbn').val(book.isbn);
        $('#inputState option[value=' + isBorrwed + ']').attr("selected", true);
        $("#user_name").val(book.name_user);
        $("#user_last").val(book.last_name);
        $("#user_doc").val(book.doc);
        $("#book_initial_date").val(book.init_date);
        $("#book_end_date").val(book.end_date);
      } else {
        console.log("Painting without lend");
        let template = ' <form>\
            <hr>\
          <h4>Datos del libro</h4>\
            <div class="form-row">\
              <div class="form-group col-md-12">\
                <label for="inputEmail4">Nombre libro</label>\
                <input type="text" class="form-control" id="book_name">\
              </div>\
              <div class="form-group col-md-6">\
                <label for="inputPassword4">Tipo libro</label>\
                <input type="text" class="form-control" id="book_type">\
              </div>\
            </div>\
            <div class="form-row">\
            <div class="form-group col-md-6">\
              <label for="inputAddress">ISBN</label>\
              <input type="text" class="form-control" id="book_isbn">\
            </div>\
            <div class="form-group col-md-6">\
              <label for="inputState">Prestado?</label>\
              <select id="inputState" class="form-control">\
                <option >Seleccione...</option>\
                <option value="true" >Si</option>\
                <option value="false">No</option>\
              </select>\
            </div>\
          </div>\
          <button id="delete_book" type="button" class="btn btn-danger mb-3">Eliminar</button>\
          <button id="update_book" type="button" class="btn btn-warning mb-3">Actualizar</button>\
          <br>\
          <hr>\
          <p>\
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">\
    Prestar Libro\
  </button>\
</p>\
<div class="collapse" id="collapseExample">\
  <div class="card card-body">\
  <div class="form-group col-md-12">\
  <label for="inputPassword4">Campo de busqueda</label>\
  <input type="text" class="form-control" id="book_type">\
  <button type="button" class="btn btn-dark mt-2">Buscar por nombre</button>\
  <button type="button" class="btn btn-dark mt-2">Buscar por ID</button>\
</div>\
  </div>\
</div>\
<br\>\
            </div>\
          </form>';
        $("#books_container").append(template);
        $('#book_name').val(book.book_name);
        $('#book_isbn').val(book.isbn);
        $('#inputState option[value=' + isBorrwed + ']').attr("selected", false);
      }

    }
  });
}
function getCategories() {
  let categories = [];
  $.ajax({
    type: "GET",
    url: "api/books/categories.php",
    data: "",
    dataType: "JSON",
    success: function (response) {
      categories = response;
      console.log(categories);
      var o = new Option("option text", "value");
      /// jquerify the DOM object 'o' so we can use the html method
      $(o).html("option text");
      $("#selectList").append(o);
    }
  });
  var i;
  for (i = 0; i < categories.length; i++) {
    // get reference to select element
    console.log(categories.length);
    var sel = document.getElementById("book_type");

    // create new option element
    var opt = document.createElement("option");

    // create text node to add to option element (opt)
    opt.appendChild(document.createTextNode(iterator.category));

    // set value property of opt
    opt.value = iterator.id;

    // add opt to end of select box (sel)
    sel.appendChild(opt);
  }
}
function deleteBook() {
  var id = {
    "id": getUrlParameter('id')
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
function updateBook() {
  var book = {
    "id": getUrlParameter('id'),
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


