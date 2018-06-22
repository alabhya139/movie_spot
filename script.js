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

    //Hide Title field unless Year is choosen as Search Method
    $('.optional-search').hide();

    //Hide Loader without processing
    $('.preloader-wrapper').hide();

    //Hiding Search Result Before Processing
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

    //Handles Search Button Click
    $('#search-button').click(()=>{
      $('.card').remove();
      var value = $('.select option:selected').val();

      //If Selected Search field is empty
      if(value == 0){
        $('.search-result').hide();
        alert("Please Choose One of the Options!");
        return;
      }

      //If Selected Search field is Title
      if(value == 1){
        var keyword = $('.input-movie').val();
        if(keyword == ""){
          $('.search-result').hide();
          alert("Please Enter Title");
          return;
        }
        var url = 'https://www.omdbapi.com/?s='+keyword+'&plot=shortl&apikey=b8b7d846'
        getData(url,value);
        $('.search-result').show();
        $('.card').show();
      }

      //If Selected Search field is IMDB ID
      else if(value == 2){
        var keyword = $('.input-movie').val();
        if(keyword == ""){
          $('.search-result').hide();
          alert("Please Enter IMDB Id");
          return;
        }
        var url = 'https://www.omdbapi.com/?i='+keyword+'&plot=full&apikey=b8b7d846'
        getData(url,value);
        $('.search-result').show();
        $('.card').show();
      }

      //If Selected Search field is Year
      else if(value == 3) {
        var keyword = $('.input-movie').val();
        console.log(isNaN(keyword));

        //Check if Year is Valid
        if(isNaN(keyword)){
          alert("Please Enter a Valid Year");
          $('.search-result').hide();
          return;
        }else if((keyword<1900) || (keyword>2019)){
          alert("Please Enter a Valid Year");
          $('.search-result').hide();
          return;
        }

        //If Year input field is null search is based on only title
        if(keyword == ""){
          var keyword_two = $('.input-movie2').val();
          var url = 'https://www.omdbapi.com/?t='+keyword_two+'&plot=full&apikey=b8b7d846'
          getData(url,value);
          console.log(url);
          $('.search-result').show();
          $('.card').show();
          return;
        }

        //Check if Title input field is not null
        var keyword_two = $('.input-movie2').val();
        if(keyword_two == ""){
          $('.search-result').hide();
          alert("Please Enter Title");
          return;
        }

        //Url if both input fields title and year is entered by user
        var url = 'https://www.omdbapi.com/?t='+keyword_two+'&y='+keyword+'&plot=full&apikey=b8b7d846'
        console.log(url);
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

  
  //function for retrieving data from Api
  let getData = (url,value)=>{


  //Api Call
  $.ajax({
    type: 'GET',
    dataType: 'json',
    async: 'true',
    url: ""+url,

    success: (response) =>{
      console.log(response);

      //Handles error if movie is not found
      if(response.Error == "Movie not found!"){
        alert(response.Error);
        $('.search-result').hide();
        return;
      }
      
      if(value == 1){
        //perform operation if more than one movies found
        for(let i=0; i<response.Search.length;++i){
          //Display custom image if no image available
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
          <p>Plot not available. Search with year and title or title!</p>
          </div>
          </div>`

          //Append Resulted Card under element having result as ID
          $('#result').append(cardData);
          continue;
          }

          //Display cards based on movies
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
          <p>Plot not available. Search with year and title or title!</p>
          </div>
          </div>`

          //Append Resulted Card under element having result as ID
          $('#result').append(cardData);
        }
      }else{
        //display movies from single object
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
        //Append Resulted Card under element having result as ID
        $('#result').append(cardData);
      }

    //clear cards if select value is changed
    $('.select').change(()=>{
      $('.card').remove();
      $('.search-result').hide();
    });
    },

    //Handles Error Like Network Connection Failure
    error: (response) =>{
      
      alert("Something Went Wrong! Connection Seems Dead");
      $('.search-result').hide();
    },

    //Show Loader before getting response
    beforeSend: () =>{
      $('.preloader-wrapper').show();
    },

    //Hide Loader on getting a response
    complete: ()=>{
      $('.preloader-wrapper').hide();
    },

    //Timeout of 15 seconds
    timeout:15000
    
  });

  }