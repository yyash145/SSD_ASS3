# Q1

## HTML
### index.html
    - It contains just a static page, which is acting like an opening page for the main game and all the game's property are designed in 2nd page named index3.html.

### index3.html
    - I first made a parent div named container and made 3 more div inside that.
    - 1st div contains 3 div out of which 1st div contains the vulture.
        - 2nd div contains text which shows vulture wins after vulture kills the 4 crows.
        - 3rd div is empty, it was made just to keep 2nd div in middle.
    - 2nd div contains all the game's information
        - It contains 5 sub-div which are used to make star in 5 different rows.
        - Each of those divs contains required number of circles.
        - Those circles are nothing, just a div with a property border-radius: 50%.
    - 3rd div contains 2 more div which contains the crows left in going into the game and dead crows respectively.
        - live_crow div contains a span element too, which shows crow win after its win.
        - This is done by making it visible and making all the dead crows invisible(hidden).

    - Lines are made by using jquery.
    - Some inline CSS is also being used for making some property different than the classes with same name and classes with numeric names.

## CSS
### style.css
    - It contains style for index.html and all the game's style are designed in 2nd stylesheet named style2.css.

### style2.css
    - It contains the required styling and almost all are self explainatory.

## JAVASCRIPT

### javascript.js
    - Made several arrays and 1 map for funtioning.
    - star[10] array gives the info whether the circle in star is empty, or vulture(1) or crow(2) is sitting on them.
    - crow_id[10] gives the crow's id in star array.
    - crow_in[7] gives the info of crow's position in the star.
    - crow_flag[7] gives the info whether crow is present inside the game or not.
    - vulture_on[1] gives the position of Vulture in the Game.
    - neighbours(map of arrays) gives the neighbours of all position of star.

    - Crows having ID's as 1001, 1002, ..... , 1007.
    - Vulture is having its ID as 101.
    - Circles in stars have their ID's as 1, 2, 3, ... , 10.
    - Making their ID's in numbers helps us in checking and accessing arrays easier.

    - Used getBoundingClientRect() function to get the coordinates of all circles present in the star.
    - Used JQuery for lines.
    - Used div for circles.
    - Used Drag and Drop for playing.
    - Implemented all the functionalities in DROP.

    - I implemented the games in such a way that all the invalid moves will not be considered, by returning before appending in the target Id.
    - From drag, we get the Id of drag's element and put it in eid in drop function.

    - I implemented the turn using count variable and if it is even, then its crow's turn else Vulture's turn.
    - In crow's turn, we only allow crows to pass through the if condition, using their ID's and vice-versa.
    - If all the crows are not inside the game, then I don't allow the drop functionality. It is implimented using crow_flag array.
    - If all the conditions staisfying the game, then update all the arrays.
    - Checked all the vulture's moves and winning conditions(Vulture and Crow) by hardcoding.
    - Checked Crow's movement using map and for-loop.
    - If vulture kills any crow, that crow will be displayed at different position with red color.
    - Basically, it is a different div and the killed crow will be removed permanently.
    - If anyone of the two wins the game, then it will show that Crow/Vulture won the game.
    - Previous position of vulture is accessed using a variable named vul.
    - If the winning conditions are satisfied, then it will simply disable the further dragging and dropping using the return statement.

### 3-d effect
    - Use tilt.js for 3-d effect.
    - Use "data-tilt" for seeking its presence.
    - It works on absolute position in the main container.

### Note:
    - Used tilt.js for giving it 3-dimensional look.
    - All the alerts are placed at the appropriate positions, but all of them are commented for the smooth flow of game and can be uncommented, if we want or any problem persists.
    - Players are expected to more correctly, as no hints are given to them.
    - Downloaded tilt.js
    - No screen resizing is handled. 
    - It will be best experienced on screen resolution of 1250 x 600 or more.


# Q2
## HTML
    - Just add a heading that links us to download logs

## JAVASCRIPT
    - Using window.onload() property, we link it to function which links it to download it in utf-11 (in text form).
    - I also add a function which is used to add logs in a string and append it in the logs line by line.
    - That strings are nothing, but checking the previous and currents positions of crows and vultures, and append it in the logs.
    - Those strings also checkes whether the crow wins or Vulture.
    - It also gives us the info whether the crows or vulture are dragged outside the game or dragged internally.
    - If the previous position of array is "-1", then I print "Outside the game" and it is checked using the index of dragged element.
    - Logs are appended for both valid moves as well as invalid moves.
    - Logs are not appended for dragged element, as it can be done by mistake.
    

