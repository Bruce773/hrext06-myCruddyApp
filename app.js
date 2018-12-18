$(document).ready(function(){ 
  console.log('jQuery loaded');
  // console.log(localStorage.key(0));
  var appendNoteDiv = function(title, content){
    // console.log($('.text-entry-title').val(), myItemInStorage);
    // create a div class = 'note'
    var noteDiv = $('<div class="note"></div>');
    //append title
    var title = $('<span class="title"></span>').text(title); //Update this to euqual the actual title
    noteDiv.append(title);
    //append content
    noteDiv.append(content);
    //append delete
    noteDiv.append('<div class="delete-this-note"><button class="delete-this-note">Delete Note</button></div>');
    // append div to $('.list-display-field')
    $('.list-display-field').append(noteDiv);
    // $('.list-display-field').text(myItemInStorage); // ??
  }
  
  if(localStorage.length === 0){ //if localStorage is empty 
    $('.list-display-field').html("<p>You haven't created any notes yet.</p>");
  } else{
    //use localStorage.key() to iterate over localStorage
    for(var i = 0; i < localStorage.length; i++){
    //iterate over localStorage and append all notes in correct format
      // console.log(localStorage.key(i));
      var currentTitle = localStorage.key(i);
      var currentContent = localStorage.getItem(currentTitle);
      console.log(currentTitle, currentContent)
      appendNoteDiv(currentTitle, currentContent);
    }
  }

  // write to local storage from input when button save clicked
  $('.btn-submit').on('click','button', function(){
    // console.log($('.text-entry-title').val());
    if($('.text-entry-title').val() !== ''){
      localStorage.setItem($('.text-entry-title').val(), $('.text-entry-content').val());
      var myItemInStorage = localStorage.getItem($('.text-entry-title').val());
      appendNoteDiv($('.text-entry-title').val(), myItemInStorage); //Pass in (title, content)
    }
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