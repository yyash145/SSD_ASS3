window.onload = function() 
{
    document.getElementById('link').onclick = function(){
        this.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent(logs);
    };
};

var logs = "";
var winn = 0;

function addLogs(str){
    logs += str;
    logs += "\n";
}

var str = "Game Starts..!!";
console.log(str);
addLogs(str);
str = "";

var star = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];              // Gives the info whether the circle in star is empty, or crow(2) or vulture(1) is sitting on them.
var crow_id = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; // Gives the crow's id in star array
var crow_in = [-1, -1, -1, -1, -1, -1, -1];             // Gives the info of crow's position in the star.
var crow_flag = [0, 0, 0, 0, 0, 0, 0];                  // Gives the info whether crow is in the game or not. ( Starting 7 Crow moves)
var vulture_on = [-1];                                  // Gives the position of Vulture in the Game.
var neighbours = new Map([
    [0,[2,3]], [1,[2,5]] ,[4,[3,6]], [8,[5,7]], [9,[6,7]], [2,[0,1,3,5]], [3,[0,2,4,6]], [5,[1,2,7,8]], [6,[3,4,7,9]] , [7,[5,6,8,9]]
  ]);                                                   // Gives the neighbours of all position of star.
var count = 0;                                          // Count the total number of moves.
var crow_move = 0;                                      // Count the total number of crow's move.
var vul = -1;                                           // Find the previous position of Vulture's Move.
var cro = -1;                                           // Find the previous position of Crow's Move.
var crow_pos=-1;                                        // Gives the real time position of the crow in the star.
var vulture_win=0;                                      // If it is equal to 4, then vulture won
var inc = 0;                                            // Used to show dead Crows

{
    values = document.getElementById("1");
    coordinates = values.getBoundingClientRect();
    x1 = coordinates.left;
    y1 = coordinates.top;
    values = document.getElementById("2");
    coordinates = values.getBoundingClientRect();
    x2 = coordinates.left;
    y2 = coordinates.top;
    values = document.getElementById("3");
    coordinates = values.getBoundingClientRect();
    x3 = coordinates.left;
    y3 = coordinates.top;
    values = document.getElementById("4");
    coordinates = values.getBoundingClientRect();
    x4 = coordinates.left;
    y4 = coordinates.top;
    values = document.getElementById("5");
    coordinates = values.getBoundingClientRect();
    x5 = coordinates.left;
    y5 = coordinates.top;
    values = document.getElementById("6");
    coordinates = values.getBoundingClientRect();
    x6 = coordinates.left;
    y6 = coordinates.top;
    values = document.getElementById("7");
    coordinates = values.getBoundingClientRect();
    x7 = coordinates.left;
    y7 = coordinates.top;
    values = document.getElementById("8");
    coordinates = values.getBoundingClientRect();
    x8 = coordinates.left;
    y8 = coordinates.top;
    values = document.getElementById("9");
    coordinates = values.getBoundingClientRect();
    x9 = coordinates.left;
    y9 = coordinates.top;
    values = document.getElementById("10");
    coordinates = values.getBoundingClientRect();
    x10 = coordinates.left;
    y10 = coordinates.top;

    values = document.getElementById("1001");
    coordinates = values.getBoundingClientRect();
    x11 = coordinates.left;
    y11 = coordinates.top;
    values = document.getElementById("1002");
    coordinates = values.getBoundingClientRect();
    x12 = coordinates.left;
    y12 = coordinates.top;
    values = document.getElementById("1003");
    coordinates = values.getBoundingClientRect();
    x13 = coordinates.left;
    y13 = coordinates.top;
    values = document.getElementById("1004");
    coordinates = values.getBoundingClientRect();
    x14 = coordinates.left;
    y14 = coordinates.top;
    values = document.getElementById("1005");
    coordinates = values.getBoundingClientRect();
    x15 = coordinates.left;
    y15 = coordinates.top;
    values = document.getElementById("1006");
    coordinates = values.getBoundingClientRect();
    x16 = coordinates.left;
    y16 = coordinates.top;
    values = document.getElementById("1007");
    coordinates = values.getBoundingClientRect();
    x17 = coordinates.left;
    y17 = coordinates.top;

    // $("#line1").line(x1 + 18, y1 + 18, x3 + 18, y3 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line2").line(x1 + 18, y1 + 18, x4 + 18, y4 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line3").line(x2 + 18, y2 + 18, x3 + 18, y3 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line4").line(x4 + 18, y4 + 18, x5 + 18, y5 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line5").line(x2 + 18, y2 + 18, x6 + 18, y6 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line6").line(x5 + 18, y5 + 18, x7 + 18, y7 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line7").line(x3 + 18, y3 + 18, x4 + 18, y4 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line8").line(x3 + 18, y3 + 18, x6 + 18, y6 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line9").line(x4 + 18, y4 + 18, x7 + 19, y7 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line10").line(x6 + 18, y6 + 18, x8 + 18, y8 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line11").line(x7 + 18, y7 + 18, x8 + 18, y8 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line12").line(x6 + 18, y6 + 18, x9 + 18, y9 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line13").line(x7 + 19, y7 + 18, x10 + 18, y10 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line14").line(x8 + 18, y8 + 18, x9 + 18, y9 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    // $("#line15").line(x8 + 18, y8 + 18, x10 + 18, y10 + 18, { color: "#000000", stroke: 2, zindex: 10002 });
    $('#line1').line(x1 + 16, y1 + 16, x9 + 16, y9 + 16,{ color: "black", stroke: 2, zindex: 10002 });
    $('#line2').line(x1 + 16, y1 + 16, x10 + 16, y10 + 16,{ color: "black", stroke: 2, zindex: 10002 });
    $('#line5').line(x2 + 16, y2 + 16, x10 + 16, y10 + 16,{ color: "black", stroke: 2, zindex: 10002 });
    $('#line6').line(x5 + 16, y5 + 16, x9 + 16, y9 + 16,{ color: "black", stroke: 2, zindex: 10002 });
    $('#line3').line(x2 + 16, y2 + 16, x5 + 16, y5 + 16,{ color: "black", stroke: 2, zindex: 10002 });
}


function dragStart(ev) {
    ev.dataTransfer.setData("v1", ev.target.id);
    if(winn == 4 || winn == 5)
    {
        // if(winn == 4)
        //     alert("Crow had already won!!");
        // else
        //     alert("Vulture had already won!!");
        return;
    }
}
function dragOver(ev) {
    ev.preventDefault();
}
function dropHandler(ev) {
    ev.preventDefault();

    if(winn == 4 || winn == 5)
    {
         // if(winn == 4)
         //     alert("Crow had already won!!");
         // else
         //     alert("Vulture had already won!!");
        return;
    }

    var eid = ev.dataTransfer.getData("v1");            // Crow/Vulture we dragged
    var inside = 0;                                     // Check whether all the crows are inside the game or not.
    for (i = 0; i < 7; i++) {
        if (crow_flag[i] == 0) {
            inside = 1;
            break;
        }
    }
    if (count % 2 == 0 && star[ev.target.id - 1] == 0 &&
        (eid == 1001 || eid == 1002 || eid == 1003 || eid == 1004 || eid == 1005 || eid == 1006 || eid == 1007)) { // Move Crow Only

        if (inside == 1 && crow_in[eid % 1000 - 1] != -1 && crow_move < 8){         // When all the crows are not in the game, it will not allow the game's crow to move.
            // alert("Please place all the remaining crows in the game");    
            str = "All crows have not been placed in the game. Place all the crows first!!";
            console.log(str);
            addLogs(str);
            str = "";
            return;
        }
        
        var crow_no = eid;
        var index_abc = crow_id.indexOf(crow_no);       // Gives the index of Crow from where it is dragged.
        // console.log(crow_no);
        // console.log(index_abc);
        if(crow_move > 6)                               // When crow moves are greater than 6, then we can move to its adjacent place only.
        {
            var crow_flags = 0;                         // Check the neighbours of drag target(index_abc)
            var adjacent = neighbours.get(index_abc);
            for (index = 0; index < adjacent.length; index++) {
                if((ev.target.id - 1) == adjacent[index] )
                {
                    crow_flags = 1;
                    break;
                }
            }
            if(crow_flags == 0){
                str = "Crow has to be placed only in its neighbour. So placed accordingly!!";
                console.log(str);
                addLogs(str);
                str = "";
                return;
            }
        }
        if(crow_move > 6)
        {
            star[index_abc] = 0;
            crow_id[index_abc] = -1;
        }

        ev.target.appendChild(document.getElementById(eid));
        document.getElementById(eid).style.border="1px solid white";

        star[ev.target.id - 1] = 2;                         // 2 means Crow is entered into the star array.
        crow_flag[(eid % 1000) - 1] = 1;
        crow_id[ev.target.id - 1] = eid;
        crow_in[eid%1000 - 1] = 1;

        // --------------------------------------------
        var str;
        var posi;
        if(index_abc == -1)
            posi = "outside the game into the game";
        else 
            posi = "position " + (index_abc + 1);
        console.log("Crow was dragged from " + posi + " to position number " + ev.target.id + " in the star.")
        str = "Crow was dragged from " + posi + " to position number " + ev.target.id + " in the star.";
        addLogs(str);
        str = ""
        // --------------------------------------------

        // ------------------ Crow winning Condition ---------------
        {
            str = "Yipee Crow Won!!\n\nGame Over";
            
            if(star[0] == 1 && star[2] == 2 && star[3] == 2 && star[5] == 2 && star[6] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(0) ");
            }
            else if(star[1] == 1 && star[2] == 2 && star[3] == 2 && star[5] == 2 && star[7] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(1) ");
            }
            else if(star[4] == 1 && star[2] == 2 && star[3] == 2 && star[6] == 2 && star[7] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(4) ");
            }
            else if(star[8] == 1 && star[2] == 2 && star[5] == 2 && star[6] == 2 && star[7] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(8) ");
            }
            else if(star[9] == 1 && star[3] == 2 && star[5] == 2 && star[6] == 2 && star[7] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(9) ");
            }

            else if(star[2] == 1 && star[0] == 2 && star[1] == 2 && star[3] == 2 && star[4] == 2 && star[5] == 2 && star[8] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(2) ");
            }
            else if(star[3] == 1 && star[0] == 2 && star[1] == 2 && star[2] == 2 && star[4] == 2 && star[6] == 2 && star[9] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(3) ");
            }
            else if(star[5] == 1 && star[0] == 2 && star[1] == 2 && star[2] == 2 && star[7] == 2 && star[8] == 2 && star[9] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(5) ");
            }
            else if(star[6] == 1 && star[0] == 2 && star[3] == 2 && star[4] == 2 && star[7] == 2 && star[8] == 2 && star[9] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(6) ");
            }
            else if(star[7] == 1 && star[1] == 2 && star[4] == 2 && star[5] == 2 && star[6] == 2 && star[8] == 2 && star[9] == 2){
                document.getElementById(4000).style.visibility='visible';
                console.log(str);
                addLogs(str);
                winn = 4;
                // alert("Yipee Crow won!!(7) ");
            }
            str = ""
        }
        
        // console.log("Star Array(on Crow's Turn) = " + star);
        // console.log("Crow's Id on star = " + crow_id);
        // console.log("Crow_in Array = " + crow_in);
        // console.log("crow:" + eid);
        // console.log("ev.target.id(-1)(crow) = " + (ev.target.id));
        // console.log("Number of crow moves till now = " + crow_move);
        // console.log("Inside Value = " + inside + "(which is zero after 6th move)");
        // console.log("Previous(crow) = " + cro);
        count++;
        crow_move++;
    }
    else if (count % 2 == 1 && eid == 101 && star[ev.target.id - 1] == 0) {  // Move Vulture only
        
        var index_abc = vul;                        // Gives the previous position of Vulture.

        //----------------------------------- Vulture Moves -------------------------------
        {
            //------------------------------------- Corner Cases -----------------------------------
            
            str = "Vulture from position " + (index_abc + 1) + " can't go at position " + ev.target.id + ".";
            // Vulture at 0 && Crows at 2 and 3
            if (star[0] == 1 && star[2] == 2 && star[3] == 2 && star[5] == 0 && star[6] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 4 ||
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 5 and 6");
                    console.log(str);
                    addLogs(str);
                    return;
                }
            else if (star[0] == 1 && star[2] == 2 && star[3] == 2 && star[5] == 0 && star[6] == 2 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 ||
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[0] == 1 && star[2] == 2 && star[3] == 2 && star[5] == 2 && star[6] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 ||
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 0 && Crow at 2, not at 3
            else if (star[0] == 1 && star[2] == 2 && star[3] == 0 && star[5] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 ||
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[0] == 1 && star[2] == 2 && star[3] == 0 && star[5] == 2 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || 
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 3");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 0 && Crow at 3, not at 2
            else if (star[0] == 1 && star[2] == 0 && star[3] == 2 && star[6] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 4 ||
                 (ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[0] == 1 && star[2] == 0 && star[3] == 2 && star[6] == 2 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 0 && Crow neither at 2 nor at 3    
            else if (star[0] == 1 && star[2] == 0 && star[3] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2 and 3");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            

            // Vulture at 1 && Crows at 2 and 5
            else if (star[1] == 1 && star[2] == 2 && star[5] == 2 && star[3] == 0 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 4 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 3 and 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[1] == 1 && star[2] == 2 && star[5] == 2 && star[3] == 0 && star[7] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || 
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 3");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[1] == 1 && star[2] == 2 && star[5] == 2 && star[3] == 2 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                }
            // Vulture at 1 && Crow at 2, not at 5
            else if (star[1] == 1 && star[2] == 2 && star[5] == 0 && star[3] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 3");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[1] == 1 && star[2] == 2 && star[5] == 0 && star[3] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || 
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 1 && Crows at 5, not at 2
            else if (star[1] == 1 && star[2] == 0 && star[5] == 2 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 3 ||
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[1] == 1 && star[2] == 0 && star[5] == 2 && star[7] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 1 && Crow neither at 2 nor at 5
            else if (star[1] == 1 && star[2] == 0 && star[5] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2 and 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }


            // Vulture at 8 && Crows at 5 and 7
            else if (star[8] == 1 && star[5] == 2 && star[7] == 2 && star[2] == 0 && star[6] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2 and 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[8] == 1 && star[5] == 2 && star[7] == 2 && star[2] == 0 && star[6] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[8] == 1 && star[5] == 2 && star[7] == 2 && star[2] == 2 && star[6] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 8 && Crow at 5, nor at 7
            else if (star[8] == 1 && star[5] == 2 && star[7] == 0 && star[2] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[8] == 1 && star[5] == 2 && star[7] == 0 && star[2] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 8 && Crow at 7, nor at 5
            else if (star[8] == 1 && star[5] == 0 && star[7] == 2 && star[6] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[8] == 1 && star[5] == 0 && star[7] == 2 && star[6] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 8 && Crow neither at 5 nor at 7
            else if (star[8] == 1 && star[5] == 0 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 5 and 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }


            // Vulture at 9 && Crows at 6 and 7
            else if (star[9] == 1 && star[6] == 2 && star[7] == 2 && star[3] == 0 && star[5] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || 
                 (ev.target.id - 1) == 2 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 3 and 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[9] == 1 && star[6] == 2 && star[7] == 2 && star[3] == 0 && star[5] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 3");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[9] == 1 && star[6] == 2 && star[7] == 2 && star[3] == 2 && star[5] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 9 && Crow at 6, not at 7
            else if (star[9] == 1 && star[6] == 2 && star[7] == 0 && star[3] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 3");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[9] == 1 && star[6] == 2 && star[7] == 0 && star[3] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 9 && Crows at 7, not at 6
            else if (star[9] == 1 && star[6] == 0 && star[7] == 2 && star[5] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[9] == 1 && star[6] == 0 && star[7] == 2 && star[5] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 9 && Crow neither at 6 nor at 7
            else if (star[9] == 1 && star[6] == 0 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 6 and 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }


            // Vulture at 4 && Crows at 3 and 6
            else if (star[4] == 1 && star[3] == 2 && star[6] == 2 && star[2] == 0 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || 
                 (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2 and 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[4] == 1 && star[3] == 2 && star[6] == 2 && star[2] == 0 && star[7] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || 
                 (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[4] == 1 && star[3] == 2 && star[6] == 2 && star[2] == 2 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || 
                 (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 4 && Crow at 3, not at 6
            else if (star[4] == 1 && star[3] == 2 && star[6] == 0 && star[2] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 2");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[4] == 1 && star[3] == 2 && star[6] == 0 && star[2] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 4 && Crow at 6, nor at 3
            else if (star[4] == 1 && star[3] == 0 && star[6] == 2 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[4] == 1 && star[3] == 0 && star[6] == 2 && star[7] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 3");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 4 && Crow neither at 3 nor at 6
            else if (star[4] == 1 && star[3] == 0 && star[6] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 3 and 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // ------------------------------------ Middle Cases ----------------------------------------
            
            // Vulture at 2 && Crows at 3 and 5
            else if (star[2] == 1 && star[3] == 2 && star[5] == 2 && star[4] == 0 && star[8] == 0 &&
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 ||
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 4 and 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[2] == 1 && star[3] == 2 && star[5] == 2 && star[4] == 0 && star[8] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 6 || 
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 4");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[2] == 1 && star[3] == 2 && star[5] == 2 && star[4] == 2 && star[8] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[2] == 1 && star[3] == 2 && star[5] == 2 && star[4] == 2 && star[8] == 2 &&
                ((ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0 and 1");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 2 && Crow at 3, not at 5
            else if (star[2] == 1 && star[3] == 2 && star[5] == 0 && star[4] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 ||(ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 4");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[2] == 1 && star[3] == 2 && star[5] == 0 && star[4] == 2 && 
                ((ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0, 1 and 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 2 && Crow at 5, not at 3
            else if (star[2] == 1 && star[3] == 0 && star[5] == 2 && star[8] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[2] == 1 && star[3] == 0 && star[5] == 2 && star[8] == 2 && 
                ((ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0, 1 and 3");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 2 && Crow neither at 3 nor at 5
            else if (star[2] == 1 && star[3] == 0 && star[5] == 0 && ((ev.target.id - 1) == 4 ||  (ev.target.id - 1) == 6 || 
                (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0, 1, 3 and 5");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }


            // Vulture at 3 && Crows at 2 and 6
            else if (star[3] == 1 && star[2] == 2 && star[6] == 2 && star[1] == 0 && star[9] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 4 || 
                (ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 1 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[3] == 1 && star[2] == 2 && star[6] == 2 && star[1] == 0 && star[9] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 1)){
                    // alert("Can only go to 1");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[3] == 1 && star[2] == 2 && star[6] == 2 && star[1] == 2 && star[9] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 4 || 
                 (ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[3] == 1 && star[2] == 2 && star[6] == 2 && star[1] == 2 && star[9] == 2 && 
                ((ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 0 and 4");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 3 && Crow at 2, not at 6
            else if (star[3] == 1 && star[2] == 2 && star[6] == 0 && star[1] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 1");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[3] == 1 && star[2] == 2 && star[6] == 0 && star[1] == 2 && 
                ((ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0, 4 and 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 3 && Crow at 6, not at 2
            else if (star[3] == 1 && star[2] == 0 && star[6] == 2 && star[9] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[3] == 1 && star[2] == 0 && star[6] == 2 && star[9] == 2 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 0, 2 and 4");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 3 && Crow neither at 2 nor at 6
            else if (star[3] == 1 && star[2] == 0 && star[6] == 0 && ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 5 || 
                 (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0, 2, 4 and 6");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }


            // Vulture at 5 && Crows at 2 and 7
            else if (star[5] == 1 && star[2] == 2 && star[7] == 2 && star[0] == 0 && star[9] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 0 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[5] == 1 && star[2] == 2 && star[7] == 2 && star[0] == 0 && star[9] == 2 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 9 ||
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 0");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[5] == 1 && star[2] == 2 && star[7] == 2 && star[0] == 2 && star[9] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 ||
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[5] == 1 && star[2] == 2 && star[7] == 2 && star[0] == 2 && star[9] == 2 && 
                ((ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6)){
                    // alert("Can only go to 1 and 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 5 && Crow at 2, not at 7
            else if (star[5] == 1 && star[2] == 2 && star[7] == 0 && star[0] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || 
                 (ev.target.id - 1) == 6 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[5] == 1 && star[2] == 2 && star[7] == 0 && star[0] == 2 && 
                ((ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6  || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 1, 8 and 7");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 5 && Crow at 7, not at 2
            else if (star[5] == 1 && star[2] == 0 && star[7] == 2 && star[9] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[5] == 1 && star[2] == 0 && star[7] == 2 && star[9] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6)){
                    // alert("Can only go to 1, 2 and 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 5 && Crow neither at 2 nor at 7
            else if (star[5] == 1 && star[2] == 0 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 3 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 1, 2, 7 and 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }


            // Vulture at 6 && Crows at 3 and 7
            else if (star[6] == 1 && star[3] == 2 && star[7] == 2 && star[0] == 0 && star[8] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0 and 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[6] == 1 && star[3] == 2 && star[7] == 2 && star[0] == 0 && star[8] == 2 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[6] == 1 && star[3] == 2 && star[7] == 2 && star[0] == 2 && star[8] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[6] == 1 && star[3] == 2 && star[7] == 2 && star[0] == 2 && star[8] == 2 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 2  || (ev.target.id - 1) == 5)){
                    // alert("Can only go to 4 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 6 && Crow at 3, not at 7
            else if (star[6] == 1 && star[3] == 2 && star[7] == 0 && star[0] == 0 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 4 || 
                 (ev.target.id - 1) == 5 || (ev.target.id - 1) == 7 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 0");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[6] == 1 && star[3] == 2 && star[7] == 0 && star[0] == 2 && 
                ((ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 4, 7 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 6 && Crow at 7, not at 3
            else if (star[6] == 1 && star[3] == 0 && star[7] == 2 && star[8] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 8");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[6] == 1 && star[3] == 0 && star[7] == 2 && star[8] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 5)){
                    // alert("Can only go to 3, 4 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 6 && Crow neither at 3 nor at 7
            else if (star[6] == 1 && star[3] == 0 && star[7] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || 
                (ev.target.id - 1) == 2 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8)){
                    // alert("Can only go to 3, 4, 7 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }


            // Vulture at 7 && Crows at 5 and 6
            else if (star[7] == 1 && star[5] == 2 && star[6] == 2 && star[1] == 0 && star[4] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 1 and 4");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[7] == 1 && star[5] == 2 && star[6] == 2 && star[1] == 0 && star[4] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 1");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[7] == 1 && star[5] == 2 && star[6] == 2 && star[1] == 2 && star[4] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 4");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[7] == 1 && star[5] == 2 && star[6] == 2 && star[1] == 2 && star[4] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 3)){
                    // alert("Can only go to 8 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 7 && Crow at 5, not at 6
            else if (star[7] == 1 && star[5] == 2 && star[6] == 0 && star[1] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 3 || 
                 (ev.target.id - 1) == 4 || (ev.target.id - 1) == 6 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 1");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[7] == 1 && star[5] == 2 && star[6] == 0 && star[1] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4)){
                    // alert("Can only go to 6, 8 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 7 && Crows at 6, not at 5
            else if (star[7] == 1 && star[5] == 0 && star[6] == 2 && star[4] == 0 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || 
                 (ev.target.id - 1) == 3 || (ev.target.id - 1) == 5 || (ev.target.id - 1) == 8 || (ev.target.id - 1) == 9)){
                    // alert("Can only go to 4");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            else if (star[7] == 1 && star[5] == 0 && star[6] == 2 && star[4] == 2 && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || (ev.target.id - 1) == 2 || (ev.target.id - 1) == 3)){
                    // alert("Can only go to 5, 8 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
            // Vulture at 7 && Crow neither at 5, nor at 6
            else if ((star[7] == 1 && star[5] == 0 && star[6] == 0) && 
                ((ev.target.id - 1) == 0 || (ev.target.id - 1) == 1 || 
                 (ev.target.id - 1) == 2 || (ev.target.id - 1) == 3 || (ev.target.id - 1) == 4)){
                    // alert("Can only go to 5, 6, 8 and 9");
                    console.log(str);
                    addLogs(str);
                    str = "";
                    return;
                }
        }
                                  
        ev.target.appendChild(document.getElementById(eid));
        document.getElementById(101).style.border="1px solid white";

        // ---------------------------- Vulture Winning Condition -------------------------
        {
            if (star[0] == 1 && star[2] == 2 && (ev.target.id - 1) == 5 ){
                crow_pos = crow_id[2];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible'; 
                star[2] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[2] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 1 kills crow at position 3 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[0] == 1 && star[3] == 2 && (ev.target.id - 1) == 6){
                crow_pos = crow_id[3];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[3] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[3] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 1 kills crow at position 4 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[1] == 1 && star[2] == 2 && (ev.target.id - 1) == 3){
                crow_pos = crow_id[2];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[2] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[2] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 2 kills crow at position 3 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[1] == 1 && star[5] == 2 && (ev.target.id - 1) == 7){
                crow_pos = crow_id[5];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[5] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[5] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 2 kills crow at position 6 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[4] == 1 && star[3] == 2 && (ev.target.id - 1) == 2){
                crow_pos = crow_id[3];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[3] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[3] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 5 kills crow at position 4 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[4] == 1 && star[6] == 2 && (ev.target.id - 1) == 7){
                crow_pos = crow_id[6];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[6] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[6] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 5 kills crow at position 7 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[8] == 1 && star[5] == 2 && (ev.target.id - 1) == 2){
                crow_pos = crow_id[5];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[5] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[5] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 9 kills crow at position 6 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[8] == 1 && star[7] == 2 && (ev.target.id - 1) == 6){
                crow_pos = crow_id[7];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[7] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[7] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 9 kills crow at position 8 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[9] == 1 && star[6] == 2 && (ev.target.id - 1) == 3){
                crow_pos = crow_id[6];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[6] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[6] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 10 kills crow at position 7 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }
            else if (star[9] == 1 && star[7] == 2 && (ev.target.id - 1) == 5){
                crow_pos = crow_id[7];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[7] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[7] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 10 kills crow at position 8 and...";
                console.log(str);
                addLogs(str);
                str = ""
            }

            else if (star[2] == 1 && star[3] == 2 && (ev.target.id - 1) == 4 ){
                crow_pos = crow_id[3];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[3] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[3] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 3 kills crow at position 4 and...";
                console.log(str);
                addLogs(str);
                str = "";
            }
            else if (star[2] == 1 && star[5] == 2 && (ev.target.id - 1) == 8){
                crow_pos = crow_id[5];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[5] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[5] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 3 kills crow at position 6 and...";
                console.log(str);
                addLogs(str);
                str = "";
            }
            else if (star[3] == 1 && star[2] == 2 && (ev.target.id - 1) == 1){
                crow_pos = crow_id[2];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[2] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[2] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 4 kills crow at position 3 and...";
                console.log(str);
                addLogs(str);
                str = "";            
            }
            else if (star[3] == 1 && star[6] == 2 && (ev.target.id - 1) == 9){
                crow_pos = crow_id[6];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[6] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[6] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 4 kills crow at position 7 and...";
                console.log(str);
                addLogs(str);
                str = "";            
            }
            else if (star[5] == 1 && star[2] == 2 && (ev.target.id - 1) == 0){
                crow_pos = crow_id[2];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[2] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[2] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 6 kills crow at position 3 and...";
                console.log(str);
                addLogs(str);
                str = "";
            }
            else if (star[5] == 1 && star[7] == 2 && (ev.target.id - 1) == 9){
                crow_pos = crow_id[7];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[7] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[7] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 6 kills crow at position 8 and...";
                console.log(str);
                addLogs(str);
                str = "";
            }
            else if (star[6] == 1 && star[3] == 2 && (ev.target.id - 1) == 0){
                crow_pos = crow_id[3];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[3] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[3] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 7 kills crow at position 4 and...";
                console.log(str);
                addLogs(str);
                str = "";
            }
            else if (star[6] == 1 && star[7] == 2 && (ev.target.id - 1) == 8){
                crow_pos = crow_id[7];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[7] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[7] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 7 kills crow at position 8 and...";
                console.log(str);
                addLogs(str);
                str = "";
            }
            else if (star[7] == 1 && star[5] == 2 && (ev.target.id - 1) == 1){
                crow_pos = crow_id[5];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[5] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[5] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 8 kills crow at position 6 and...";
                console.log(str);
                addLogs(str);
                str = "";
            }
            else if (star[7] == 1 && star[6] == 2 && (ev.target.id - 1) == 4){
                crow_pos = crow_id[6];
                remove_crow = (10001 + inc);
                document.getElementById(crow_pos).remove();
                document.getElementById(remove_crow).style.visibility='visible';
                star[6] = 0;
                crow_in[crow_pos%1000] = -1;
                crow_id[6] = -1;
                inc++;
                vulture_win++;
                str = "Vulture at position 8 kills crow at position 7 and...";
                console.log(str);
                addLogs(str);
                str = "";
            }
        }
        
        star[vul] = 0;
        star[ev.target.id - 1] = 1;
        vulture_on[0] = (ev.target.id-1);           // In which index in star
        vul = ev.target.id - 1;

        // --------------------------------------------
        var str;
        var posi;
        if(index_abc == -1)
            posi = "outside the game into the game";
        else 
            posi = "position " + (index_abc + 1);
        console.log("Vulture was dragged from " + posi + " to position number " + ev.target.id + " in the star.")
        str = "Vulture was dragged from " + posi + " to position number " + ev.target.id + " in the star.";
        addLogs(str);
        str = ""
        // --------------------------------------------

        // console.log("ev.target.id(-1)(vulture) = " + (ev.target.id));
        // console.log("vulture" + eid);
        // console.log("Star Array(on Vulture's turn)" + star);
        // console.log("Current(vulture) = " + vulture_on);
        // console.log("Previous(Vulture) = " + vul);
        // console.log("Crow_in = " + crow_in);
        // console.log("vulture_win = " + vulture_win);
        count++;
    }
    if(vulture_win >= 4){
        str = "Yipee Crow Won!!\n\nGame Over";
        console.log(str);
        addLogs(str);
        str = "";
        winn = 5;
        document.getElementById(10001).style.visibility='hidden';
        document.getElementById(10002).style.visibility='hidden';
        document.getElementById(10003).style.visibility='hidden';
        document.getElementById(10004).style.visibility='hidden';
        document.getElementById(5000).style.visibility='visible';
    }
}

