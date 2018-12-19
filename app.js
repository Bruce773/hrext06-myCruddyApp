$(document).ready(function() {
  console.log("jQuery loaded");
  // console.log(localStorage.key(0));

  // Build dropdown menu. 
  var buildDropDownMenu = function (){
    $('.select-menu').html(' ');
    $('.select-menu').append('<option value="create">Create New Note</option>');
    for (var i = 0; i < localStorage.length; i++) {
      var currentTitle = localStorage.key(i);
      var optionElement = $(`<option value="${currentTitle}">${currentTitle}</option>`);
      $('.select-menu').append(optionElement);
    }
  }
  buildDropDownMenu();

  var idCounter = 0;
  var appendNoteDiv = function(title, content) {
    // console.log($('.text-entry-title').val(), myItemInStorage);
    // create a div class = 'note'
    idCounter++;
    var noteDiv = $(`<div data-note='${idCounter}' class='note'></div>`);
    //append title
    var titleSpan = $(
      `<span data-note='${idCounter}' class="title"></span>`
    ).text(title);
    noteDiv.append(titleSpan);
    //append content
    var contentDiv = $(
      `<div data-note='${idCounter}' class="content"></div>`
    ).text(content);
    noteDiv.append(contentDiv);
    //append delete
    noteDiv.append(
      `<div data-note='${idCounter}' class="delete-this-note"><button data-note='${idCounter}' class="delete-this-note">Delete Note</button></div>`
    );
    // append div to $('.list-display-field')
    $(".list-display-field").append(noteDiv);
    // $('.list-display-field').text(myItemInStorage); // ??
  };
  var repopulateNotesOnPage = function() {
    //use localStorage.key() to iterate over localStorage
    idCounter = 0;
    for (var i = 0; i < localStorage.length; i++) {
      //iterate over localStorage and append all notes in correct format
      // console.log(localStorage.key(i));
      var currentTitle = localStorage.key(i);
      var currentContent = localStorage.getItem(currentTitle);
      // console.log(currentTitle, currentContent);
      appendNoteDiv(currentTitle, currentContent);
    }
  };
  var autoRepopulateFunc = function() {
    if (localStorage.length === 0) {
      //if localStorage is empty
      $(".list-display-field").html(
        "<p class='no-notes-p-tag'>You haven't created any notes yet.</p>"
      );
    } else {
      $(".list-display-field").html(" ");
      repopulateNotesOnPage();
    }
  };
  autoRepopulateFunc();

  $(".select-menu").on("change", function() {
    //Strategy: if the drop-down menu .val() !== 'Create New Note' fill the text-area with the value from the key selected by the drop-down menu and set the title to === the key selected by the drop-down menu. Else clear the text-area.
    // console.log($(this).val());
    // if this value !== 'create'
    if($(this).val() !== 'create'){
      // set variable to selected value
      var selectedVal = $(this).val();
      // set the title input text to variable
      $('.text-entry-title').val(selectedVal);
      // set the textarea to localStorage.getItem(variable)
      $('.text-entry-content').val(localStorage.getItem(selectedVal));
    } else{
      //clear title input
      // console.log('Else fired!')
      $('.text-entry-title').val('');
      //clear textarea
      $('.text-entry-content').val('');
    }
  });

  // write to local storage from input when button save clicked
  $(".btn-submit").on("click", "button", function() {
    // console.log($('.text-entry-title').val());

    if ($(".text-entry-title").val() !== "") {
      //if the title input is not blank
      //if the title already exists and the content input is not blank
      //set the value of the existing title to the new content

      localStorage.setItem(
        $(".text-entry-title").val(),
        $(".text-entry-content").val()
      );
      $(".text-entry-title").val('');
      $(".text-entry-content").val('');
      $(".list-display-field").html(" ");
      repopulateNotesOnPage();
      buildDropDownMenu();

      // $('.text-entry-content').html(' ')
      // console.log($('.text-entry-content').val());

      // var myItemInStorage = localStorage.getItem($(".text-entry-title").val());
      // appendNoteDiv($(".text-entry-title").val(), myItemInStorage); //Pass in (title, content)
    }
  });
  // delete from local storage when delete button clicked
  $(".list-display-field").on("click", "button", function() {
    //Delete button
    // console.log($(this).attr('class')); // get the attribute of the current button
    // console.log($(this).attr("id"));
    var thisClasses = $(this).attr("data-note");
    // console.log(thisClasses);
    // console.log($(`span[data-note='${thisClasses}']`).text());
    var titleText = $(`span[data-note='${thisClasses}']`).text();
    // console.log($(`button.${thisId}`));
    localStorage.removeItem(titleText);
    $(`[data-note='${thisClasses}']`).remove();
    autoRepopulateFunc();
    buildDropDownMenu();
    // target all elements with the class note-data and $(this).attr("id")
    // .remove them
  });
  $(".btn-delete-all").on("click", ".btn-delete-all", function() {
    alert(
      "Are you sure you want to delete ALL your notes? This action can NOT be undone!"
    );
    localStorage.clear();
    $(".list-display-field").html(" ");
    autoRepopulateFunc();
    buildDropDownMenu();
  });
});
