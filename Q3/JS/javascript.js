// 2e4b7f7b9187426585c57bc08e2c68ae
// https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=2e4b7f7b9187426585c57bc08e2c68ae

// YrtNEbcL5AgONLuiaxOiH2iX0nset_wd_BC6q8Y-pa4
// https://api.unsplash.com/photos/random?count=15&client_id=YrtNEbcL5AgONLuiaxOiH2iX0nset_wd_BC6q8Y-pa4

// target = "_blank is used for opening the a href at new page

var country = "in";
var source = "bbc-news";
var apikey = "2e4b7f7b9187426585c57bc08e2c68ae";
var ad_key = "YrtNEbcL5AgONLuiaxOiH2iX0nset_wd_BC6q8Y-pa4";


// Grab the Advertisement Container
let ad_api = document.getElementById('ads');
// Grab the news Container
let news_api = document.getElementById('news-api-js');

// Create a get request(AJAX)
const ad1_req = new XMLHttpRequest();

ad1_req.open('GET', 'https://api.unsplash.com/photos/random?count=15&client_id=YrtNEbcL5AgONLuiaxOiH2iX0nset_wd_BC6q8Y-pa4', true);

let myPromise = new Promise(function(myResolve,myReject){
    ad1_req.onload = function () {
        if (this.status === 200) {
            myResolve("OK");
            let json = JSON.parse(this.responseText);
            console.log(json);
            let adshtml = "";
            for(i=0; i<json.length;i++){
                let ads = `
                <div class="card" style="margin-bottom: 2%">
                    <a href="${json[i].links.html}" target="_blank">
                        <img src="${json[i].urls.small}" class="card-img-top" alt="Image">
                    </a>
                    <div class="card-footer">
                        <a class="text-muted" href="${json[i].links.html}" target="_blank"><center>Advertisement</center></a>
                    </div>
                </div>
                `;
                adshtml += ads;
            }
            ad_api.innerHTML = adshtml;
        }
        else{
            myReject("Some error");
            console.log("Some Error Occured");
        }
    }
});

myPromise.then(
    function(value){
        console.log(value);
    }
),
function(error){
    console.log(error);
}

ad1_req.send();



// Create a get request(AJAX)
const api_request = new XMLHttpRequest();

api_request.open('GET', 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=2e4b7f7b9187426585c57bc08e2c68ae', true);

let myPromise2 = new Promise(function(myResolve,myReject){
    api_request.onload = function () {
        if (this.status === 200) {
            myResolve("OK");
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            let newshtml = "";
            articles.forEach(function (element, index) {
                let news = `
                <div class="card" style="margin-bottom: 2%">
                    <img src="${element.urlToImage}" class="card-img-top" alt="Image">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${element.description}  <a href="${element['url']}" target="_blank">  Read more...</a></li>
                    </ul>
                    <div class="card-footer">
                        <small class="text-muted">Published At: ${element.publishedAt.substring(0, 10)}</small>
                    </div>
                    <div>
                        <p align="right">Author: ${element.author}  </p>
                    </div>
                </div>
                `;
                newshtml += news;
            });
            news_api.innerHTML = newshtml;
        }
        else{
            myReject("Some error");
            console.log("Some Error Occured");
        }
    }
});
myPromise2.then(
    function(value){
        console.log(value);
    }
),
function(error){
    console.log(error);
}
api_request.send();



// <div class="row row-cols-3 row-cols-md-3 g-4">
//      <div class="col">
//           <div class="card h-100">
//                <img src="${element.urlToImage}" class="card-img-top" alt="Image">
//                <div class="card-body">
//                      <h5 class="card-title">${element.title}</h5>
//                      <p class="card-text">${element.description}</p>
//                </div>
//                <div class="card-footer">
//                      <small class="text-muted">${element.publishedAt}</small>
//                </div>
//          </div>
//     </div>                      
// </div>


// <div class="card" style="width: 45%;">
//      <img src="${element.urlToImage}" class="card-img-top" alt="Image">
//      <div class="card-body">
//           <h5 class="card-title">${element.title}</h5>
//      </div>
//      <ul class="list-group list-group-flush">
//           <li class="list-group-item">${element.description}</li>
//      </ul>
//      <div class="card-body">
//           <a href="${element['url']}" class="card-link">Click here for more information</a>
//           (By ${element.author})
//      </div>
// </div>


// <div class="card" style="width: 50%;">
//     <img src="${element.urlToImage}" class="card-img-top" alt="Image">
//         <div class="card-body">
//             <p class="card-text">${element.title}</p>
//         </div>
// </div>


// <div class="card">
//     <div class="card-header" id="heading${index}">
//         <h3 class="mb-0">
//             <button class="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"
//                 aria-expanded="false" aria-controls="collapse${index}">
//                 ${element.title}
//             </button>
//         </h3>
//     </div>

//     <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-bs-parent="#news_api">
//         <div class="card-body"> ${element.description}. <a href="${element['url']}" target="_blank">Read more at</a> </div>
//     </div>
// </div> 