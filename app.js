$(document).ready(function(){ 
  console.log('jQuery loaded');

  //iterate over localStorage, clear DOM, and append all notes in correct format 

  // write to local storage from input when button save clicked
  $('.btn-submit').on('click','button', function(){
    localStorage.setItem($('.text-entry-title').val(), $('.text-entry-content').val());
    var myItemInStorage = localStorage.getItem($('.text-entry-title').val());
    // console.log($('.text-entry-title').val(), myItemInStorage);

    // create a div class = 'note'
    var noteDiv = $('<div class="note"></div>');
    //append title
    var title = $('<span class="title"></span>').text($('.text-entry-title').val());
    noteDiv.append(title);
    //append content
    noteDiv.append(myItemInStorage);
    //append delete
    noteDiv.append('<button class="delete-this-note">Delete Note</button>');
    // append div to $('.list-display-field')
    $('.list-display-field').append(noteDiv);

    // $('.list-display-field').text(myItemInStorage); // ??

  });

  // delete from local storage when delete button clicked
  $('.btn-delete').on('click', function(){
    localStorage.removeItem($('.text-entry-title').val());
  });

  $('.btn-delete-all').on('click','.btn-delete-all', function(){
    alert('Are you sure you want to delete ALL your notes? This action can NOT be undone!')
    localStorage.clear();
  })

});