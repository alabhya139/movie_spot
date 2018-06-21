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

    $('.optional-search').hide();

    //Hiding Search Result 
    $('.search-result').hide();

    $('.select').change(()=>{
      var a = $('.select option:selected').val();
      if(a == 1){
        $('.autocomplete').text('Enter Title');
        $('.optional-search').hide();
      }
      else if(a == 2){
        $('.autocomplete').text('Enter Imdb id');
        $('.optional-search').hide();
      }
      else if(a == 3){
        $('.autocomplete').text('Enter Year');
        $('.optional-search').show();
      }
    });

    $('#search-button').click(()=>{
      $('.card').remove();
      var value = $('.select option:selected').val();
      if(value == 1){
        var keyword = $('.input-movie').val();
        var url = 'http://www.omdbapi.com/?s='+keyword+'&plot=shortl&apikey=b8b7d846'
        getData(url,value);
        $('.search-result').show();
        $('.card').show();
      }
      else if(value == 2){
        var keyword = $('.input-movie').val();
        var url = 'http://www.omdbapi.com/?i='+keyword+'&plot=full&apikey=b8b7d846'
        getData(url,value);
        $('.search-result').show();
        $('.card').show();
      }
      else if(value == 3) {
        var keyword = $('.input-movie').val();
        var keyword_two = $('.input-movie2').val();
        var url = 'http://www.omdbapi.com/?t='+keyword_two+'&y='+keyword+'&plot=full&apikey=b8b7d846'
        getData(url,value);
        $('.search-result').show();
        $('.card').show();
      }
    });
  });

  /*Function to control autoplay of slide */
  function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4500);
  }

  let getData = (url,value)=>{


  //Api Call
  $.ajax({
    type: 'GET',
    dataType: 'json',
    async: 'true',
    url: ""+url,

    success: (response) =>{
      console.log(response);
      
      if(value == 1){
        for(let i=0; i<response.Search.length;++i){
          if(response.Search[i].Poster == "N/A"){
            let cardData = `<div class="card z-depth-5">
          <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="images/notavailable.jpg">
          </div>
          <div style="padding:8px"class="card-content">
          <span style="font-size:3vmin;"class="card-title activator grey-text text-darken-4">${response.Search[i].Title}<i class="material-icons right">more_vert</i></span>
          <p><a href="${response.Search[i].Website}">This is a link</a></p>
          </div>
          <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${response.Search[i].Title}<i class="material-icons right">close</i></span>
          <p>${response.Search[i].Plot}</p>
          </div>
          </div>`
          $('#result').append(cardData);
          continue;
          }
          let cardData = `<div class="card z-depth-5">
          <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${response.Search[i].Poster}">
          </div>
          <div style="padding:8px"class="card-content">
          <span style="font-size:3vmin;"class="card-title activator grey-text text-darken-4">${response.Search[i].Title}<i class="material-icons right">more_vert</i></span>
          <p><a href="${response.Search[i].Website}">This is a link</a></p>
          </div>
          <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${response.Search[i].Title}<i class="material-icons right">close</i></span>
          <p>${response.Search[i].Plot}</p>
          </div>
          </div>`
          $('#result').append(cardData);
        }
      }else{
        let cardData = `<div class="card z-depth-5">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${response.Poster}">
        </div>
        <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${response.Title}<i class="material-icons right">more_vert</i></span>
          <p><a href="${response.Website}">This is a link</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${response.Title}<i class="material-icons right">close</i></span>
          <p>${response.Plot}</p>
        </div>
      </div>`
      $('#result').append(cardData);
      }


    $('.select').change(()=>{
      $('.card').remove();
    });
    }
  });
  }