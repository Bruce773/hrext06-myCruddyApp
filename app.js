$(document).ready(function() {
  console.log("jQuery loaded");
  // console.log(localStorage.key(0));
  var idCounter = 0;
  var appendNoteDiv = function(title, content) {
    // console.log($('.text-entry-title').val(), myItemInStorage);
    // create a div class = 'note'
    idCounter++;
    var noteDiv = $(`<div id=${idCounter} class='note'></div>`);
    //append title
    var title = $(`<span id=${idCounter} class="title"></span>`).text(title);
    noteDiv.append(title);
    //append content
    noteDiv.append(content);
    //append delete
    noteDiv.append(
      `<div id=${idCounter} class="delete-this-note"><button id=${idCounter} class="delete-this-note">Delete Note</button></div>`
    );
    // append div to $('.list-display-field')
    $(".list-display-field").append(noteDiv);
    // $('.list-display-field').text(myItemInStorage); // ??
  };
  var repopulateNotesOnPage = function() {
    //use localStorage.key() to iterate over localStorage
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
        "<p>You haven't created any notes yet.</p>"
      );
    } else {
      repopulateNotesOnPage();
    }
  };
  autoRepopulateFunc();
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
      $(".list-display-field").html(" ");
      repopulateNotesOnPage();

      // var myItemInStorage = localStorage.getItem($(".text-entry-title").val());
      // appendNoteDiv($(".text-entry-title").val(), myItemInStorage); //Pass in (title, content)
    }
  });
  // delete from local storage when delete button clicked
  $(".delete-this-note").on("click", "button", function() {
    // console.log($(this).attr('class')); // get the attribute of the current button
    console.log($(this).attr("id"));
  });

  $(".btn-delete-all").on("click", ".btn-delete-all", function() {
    alert(
      "Are you sure you want to delete ALL your notes? This action can NOT be undone!"
    );
    localStorage.clear();
    $(".list-display-field").html(" ");
    autoRepopulateFunc();
  });
});
