$(document).ready(function(){ 
  console.log('jQuery loaded');

  // write to local storage from input when button save clicked
  $('.btn-submit').on('click', function(){
    localStorage.setItem($('.text-entry-title').val(), $('.text-entry-content').val());
    var myItemInStorage = localStorage.getItem($('.text-entry-title').val());
    console.log($('.text-entry-title').val(), myItemInStorage);

    // display the value here
    $('.list-display-field').text(myItemInStorage); // ??

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