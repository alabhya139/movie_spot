$(document).ready(function(){
    //parallax is initialized here
    $('.parallax').parallax();

    //carousel is initialized here
    $('.carousel').carousel({
      fullWidth: true,
      indicators: true
    });
    
    //function autoplay is called.
    autoplay()   
    
    $('.sidenav').sidenav();

    $('select').formSelect();

    $('input.autocomplete').autocomplete({
      data: {
        "Inception": null,
        "Dangal": null,
        "Southpaw": null
      },
    });
  });
  /*Function to control autoplay of slide */
  function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4500);
  }