//初始設定
var playerlist = document.getElementsByClassName("role");
var gamearea = document.getElementById("game_area");
var safearea1 = document.getElementById("s1");
var safearea2 = document.getElementById("s2");
var safearea3 = document.getElementById("s3");
var safearea4 = document.getElementById("s4");

//設定一個player的class
class player{
    constructor(num,count){
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.role = playerlist[num];
        this.pc = document.getElementById(count);
        this.pcn = 0;
        this.pout = true;
    }
    hitbox(others){
        var touch = false;
        if (this.role.offsetTop-40>others.role.offsetTop-this.role.offsetHeight && this.role.offsetTop+40<others.role.offsetTop+others.role.offsetHeight && this.role.offsetLeft-50>others.role.offsetLeft-this.role.offsetWidth && this.role.offsetLeft+40<others.role.offsetLeft+others.role.offsetWidth){
            this.role.style.left=this.role.offsetLeft+30+'px';
            touch = true;
        }
        if (this.role.offsetTop-40>others.role.offsetTop-this.role.offsetHeight && this.role.offsetTop+40<others.role.offsetTop+others.role.offsetHeight && this.role.offsetLeft-40>others.role.offsetLeft-this.role.offsetWidth && this.role.offsetLeft+50<others.role.offsetLeft+others.role.offsetWidth){
            this.role.style.left=this.role.offsetLeft-30+'px';
            touch = true;
        }
        if (this.role.offsetTop-40>others.role.offsetTop-this.role.offsetHeight && this.role.offsetTop+50<others.role.offsetTop+others.role.offsetHeight && this.role.offsetLeft-40>others.role.offsetLeft-this.role.offsetWidth && this.role.offsetLeft+40<others.role.offsetLeft+others.role.offsetWidth){
            this.role.style.top=this.role.offsetTop-30+'px';
            touch = true;
        }
        if (this.role.offsetTop-50>others.role.offsetTop-this.role.offsetHeight && this.role.offsetTop+40<others.role.offsetTop+others.role.offsetHeight && this.role.offsetLeft-40>others.role.offsetLeft-this.role.offsetWidth && this.role.offsetLeft+40<others.role.offsetLeft+others.role.offsetWidth){
            this.role.style.top=this.role.offsetTop+30+'px';
            touch = true;
        }
        return touch;
    }
}

//新增三位玩家
var player1 = new player(0,"p1coun");
var player2 = new player(1,"p2coun");
var player3 = new player(2,"p3coun");

//移動功能function
function move(who){
    if(who.left){
        who.role.style.left=who.role.offsetLeft-10+'px';
    }
    if(who.right){
        who.role.style.left=who.role.offsetLeft+10+'px';
    }
    if(who.up){
        who.role.style.top=who.role.offsetTop-10+'px';
    }
    if(who.down){
        who.role.style.top=who.role.offsetTop+10+'px';
    }
    if(who.role.offsetLeft<0){
        who.role.style.left=who.role.offsetLeft+10+'px';
    }
    if(who.role.offsetLeft>gamearea.offsetWidth-who.role.offsetWidth){
        who.role.style.left=who.role.offsetLeft-10+'px';
    }
    if(who.role.offsetTop<0){
        who.role.style.top=who.role.offsetTop+10+'px';
    }
    if(who.role.offsetTop>gamearea.offsetHeight-who.role.offsetHeight){
        who.role.style.top=who.role.offsetTop-10+'px';
    }
}

//安全區記數function
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

//鍵盤偵測function
function deckey(event,who,left,right,up,down,boolin){
    if (event.key == left){
        who.left=boolin;
    }
    if (event.key == right){
        who.right=boolin;
    }
    if (event.key == up){
        who.up=boolin;
    }
    if (event.key == down){
        who.down=boolin;
    }
}

//需要執行的function
setInterval(function(){
//1
    player1.hitbox(player2);
    player1.hitbox(player3);
    move(player1);
//2
    player2.hitbox(player1);
    player2.hitbox(player3);
    move(player2);
//3
    player3.hitbox(player1);
    player3.hitbox(player2);
    move(player3);
//safe area
    safeareaboundery(player1);
    safeareaboundery(player2);
    safeareaboundery(player3);
},50)

//偵測鍵盤抬起
document.addEventListener("keyup",function(event){
//1
    deckey(event,player1,"ArrowLeft","ArrowRight","ArrowUp","ArrowDown",false);
//2
    deckey(event,player2,"h","k","u","j",false);
//3
    deckey(event,player3,"a","d","w","s",false);
})

//偵測鍵盤按下
document.addEventListener("keydown",function(event){
//1
    deckey(event,player1,"ArrowLeft","ArrowRight","ArrowUp","ArrowDown",true);
//2
    deckey(event,player2,"h","k","u","j",true);
//3
    deckey(event,player3,"a","d","w","s",true);
})
