# Q3

## index.html
    - In index.html, I've used the heading to write the name.
    - Then, I made a parent div named container-my-3, by using the bootstrap.
    - Inside this, I made 2 more divs, out of which, one is used to show the news fetched and another one is used for getting the advertisements.

## index.css
    - Used to make 2 divs with flex direction as row.

## index.js
    - In index.js, I'd used Promise calls using AJAX.
    - I'd used 2 different APIs for news as well as advertisement, and do the same work for both and used ajax to avoid reloading.
    - We first Create XMLHttpRequest, because XMLHttpRequest object is used to exchange data with a web server behind the scenes. 
    - This means that it is possible to update parts of a web page, without reloading the whole page.
    - Since, we are using more than one part, we use AJAX.
    - Then, I open the api using get request.
    - We check HTTP OK status by its response code "200".
    - If it returns success, I parse the JSON which was returned by using API, and store it in the array.
    - Then, checked all the elements inside the array returned by JSON and display the required properties.
    - All the advertisements are called via unsplash API which fetches different results.
    - Those images as well as text are linkable to its image to another page.
    - Since, we are asked to use an external JSON, so we used this technique as we don't have access to ads api.

### Notes:
    - Install JSON Formattor extension for human readable format.
    - Used Bootstap for every designing purpose.
    - Used popper js for popover.
    