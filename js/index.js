var pageNo = 0;

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function displayPage(pno){
  for(var i=1;i<=pageNo;i++){
    $("#pageDiv"+i).hide();
  }
  $("#pageDiv"+pno).show();
}


function getMovies(searchText){
  axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=8c3cb4a0"+"&s="+searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      var flag=0;
      pageNo=1;
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            </div>
          </div>
        `;
        flag+=1;
        if(flag%4==0){
          var pageDiv = "<div class='page row' id='pageDiv"+pageNo+"' style='display:none'>"+output+"</div>";
          output='';
          $("#movies").append(pageDiv);
        }
        if(flag>4 &&flag%4==1){
          pageNo+=1;
        }
      });
      var pageDiv = "<div class='page row' id='pageDiv"+pageNo+"' style='display:none'>"+output+"</div>"; 
      $("#pageDiv1").show();
      $('#movies').append(pageDiv);
      var pageBtnDiv='<div class="pageBtnDiv" style="width:100%"><center>';
      for(var i=1;i<=pageNo;i++){
        var button = "<button class='btn pageBtn' style='margin-left:10px' onclick=displayPage('"+i+"')>"+i+"</button>";
        pageBtnDiv+=button;
      }
      pageBtnDiv+="</center></div>"
      $("#movies").append(pageBtnDiv);
    })
    .catch((err) => {
      console.log(err);
    });
}