var player1 = {
    left:false,
    right:false,
    up:false,
    down:false,
    role:document.getElementById("p1"),
    pc:document.getElementById("p1coun"),
    pcn:0,
    pout:true
};
var player2 = {
    left:false,
    right:false,
    up:false,
    down:false,
    role:document.getElementById("p2"),
    pc:document.getElementById("p2coun"),
    pcn:0,
    pout:true
};
var player3 = {
    left:false,
    right:false,
    up:false,
    down:false,
    role:document.getElementById("p3"),
    pc:document.getElementById("p3coun"),
    pcn:0,
    pout:true
};

var gamearea = document.getElementById("game_area");
var safearea1 = document.getElementById("s1");
var safearea2 = document.getElementById("s2");
var safearea3 = document.getElementById("s3");
var safearea4 = document.getElementById("s4");

function gameareaboundery(who,position){
    if(who.role.offsetLeft>0 && position=="left"){
        return true;
    }
    else if(who.role.offsetLeft<gamearea.offsetWidth-who.role.offsetWidth && position=="right"){
        return true;
    }
    else if(who.role.offsetTop>0 && position=="up"){
        return true;
    }
    else if(who.role.offsetTop<gamearea.offsetHeight-who.role.offsetHeight && position=="down"){
        return true;
    }
    else{
        return false;
    }
}

function safeareaboundery(who){
    if (who.role.offsetTop<safearea1.offsetHeight-who.role.offsetHeight && who.role.offsetLeft<safearea1.offsetWidth-who.role.offsetWidth){
        if (who.pout){
            who.pcn +=1;
            who.pc.innerText='Count: '+ who.pcn
            who.pout = false;
        }
    }
    else if (who.role.offsetTop<safearea1.offsetHeight-who.role.offsetHeight && who.role.offsetLeft>gamearea.offsetWidth-safearea1.offsetWidth){
        if (who.pout){
            who.pcn +=1;
            who.pc.innerText='Count: '+ who.pcn
            who.pout = false;
        }
    }
    else if (who.role.offsetTop>gamearea.offsetHeight-safearea1.offsetHeight && who.role.offsetLeft<safearea1.offsetWidth-who.role.offsetWidth){
        if (who.pout){
            who.pcn +=1;
            who.pc.innerText='Count: '+ who.pcn
            who.pout = false;
        }
    }
    else if (who.role.offsetTop>gamearea.offsetHeight-safearea1.offsetHeight && who.role.offsetLeft>gamearea.offsetWidth-safearea1.offsetWidth){
        if (who.pout){
            who.pcn +=1;
            who.pc.innerText='Count: '+ who.pcn
            who.pout = false;
        }
    }
    else{
        who.pout = true;
    }
}

setInterval(function(){
//1
    if(player1.left && gameareaboundery(player1,"left")){
        player1.role.style.left=player1.role.offsetLeft-10+'px';
    }
    if(player1.right && gameareaboundery(player1,"right")){
        player1.role.style.left=player1.role.offsetLeft+10+'px';
    }
    if(player1.up && gameareaboundery(player1,"up")){
        player1.role.style.top=player1.role.offsetTop-10+'px';
    }
    if(player1.down && gameareaboundery(player1,"down")){
        player1.role.style.top=player1.role.offsetTop+10+'px';
    }
//2
    if(player2.left && gameareaboundery(player2,"left")){
        player2.role.style.left=player2.role.offsetLeft-10+'px';
    }
    if(player2.right && gameareaboundery(player2,"right")){
        player2.role.style.left=player2.role.offsetLeft+10+'px';
    }
    if(player2.up && gameareaboundery(player2,"up")){
        player2.role.style.top=player2.role.offsetTop-10+'px';
    }
    if(player2.down && gameareaboundery(player2,"down")){
        player2.role.style.top=player2.role.offsetTop+10+'px';
    }
//3
    if(player3.left && gameareaboundery(player3,"left")){
        player3.role.style.left=player3.role.offsetLeft-10+'px';
    }
    if(player3.right && gameareaboundery(player3,"right")){
        player3.role.style.left=player3.role.offsetLeft+10+'px';
    }
    if(player3.up && gameareaboundery(player3,"up")){
        player3.role.style.top=player3.role.offsetTop-10+'px';
    }
    if(player3.down && gameareaboundery(player3,"down")){
        player3.role.style.top=player3.role.offsetTop+10+'px';
    }
    
//safe area
    safeareaboundery(player1);
    safeareaboundery(player2);
    safeareaboundery(player3);
},50)

document.addEventListener("keyup",function(event){
//1
    if (event.key == "ArrowLeft"){
        player1.left=false;
    }
    if (event.key == "ArrowRight"){
        player1.right=false;
    }
    if (event.key == "ArrowUp"){
        player1.up=false;
    }
    if (event.key == "ArrowDown"){
        player1.down=false;
    }
//2
    if (event.key == "h"){
        player2.left=false;
    }
    if (event.key == "k"){
        player2.right=false;
    }
    if (event.key == "u"){
        player2.up=false;
    }
    if (event.key == "j"){
        player2.down=false;
    }
//3
    if (event.key == "a"){
        player3.left=false;
    }
    if (event.key == "d"){
        player3.right=false;
    }
    if (event.key == "w"){
        player3.up=false;
    }
    if (event.key == "s"){
        player3.down=false;
    }
})

document.addEventListener("keydown",function(event){
//1
if (event.key == "ArrowLeft"){
    player1.left=true;
}
if (event.key == "ArrowRight"){
    player1.right=true;
}
if (event.key == "ArrowUp"){
    player1.up=true;
}
if (event.key == "ArrowDown"){
    player1.down=true;
}
//2
if (event.key == "h"){
    player2.left=true;
}
if (event.key == "k"){
    player2.right=true;
}
if (event.key == "u"){
    player2.up=true;
}
if (event.key == "j"){
    player2.down=true;
}
//3
if (event.key == "a"){
    player3.left=true;
}
if (event.key == "d"){
    player3.right=true;
}
if (event.key == "w"){
    player3.up=true;
}
if (event.key == "s"){
    player3.down=true;
}
})
