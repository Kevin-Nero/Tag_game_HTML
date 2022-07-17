//初始設定
const playerlist = document.getElementsByClassName("role");
const gamearea = document.getElementById("game_area");
const safearea1 = document.getElementById("s1");
const safearea2 = document.getElementById("s2");
const safearea3 = document.getElementById("s3");
const safearea4 = document.getElementById("s4");
const text = document.getElementById("text");
let count = 0;
let issetfinish = false;
let check_winner;
let check_loser;
let isend = false;

//設定一個player的class
class player{
    constructor(num,count,icon){
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.role = playerlist[num];
        this.pc = document.getElementById(count);
        this.pcn = 0;
        this.pout = true;
        this.pnameicon = document.getElementById(icon);
        this.name = "none";
        //鬼的標記
        this.ghost = false;
        //結果標記
        this.caught = false;
    }
    hitbox(others){
        let touch = false;

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
let player1 = new player(0,"p1coun","p1nameicon");
let player2 = new player(1,"p2coun","p2nameicon");
let player3 = new player(2,"p3coun","p3nameicon");

//隨機選鬼function
function choose_ghost(p1, p2, p3) {
    let x = Math.floor(Math.random()*3)+1;
    if (x == 1) {
        p1.ghost = true;
        return p1;
    }
    else if(x == 2){
        p2.ghost = true;
        return p2;
    }
    else{
        p3.ghost = true;
        return p3;
    }
}
let isghost = choose_ghost(player1,player2,player3);

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

//輸入三位玩家姓名
document.getElementById("btn").onclick=entername;
function entername() {
    if (document.getElementById("name").value==""){
        alert("Please enter player's name")
    }
    if(count==0 && !document.getElementById("name").value==""){
        document.getElementById("p1name").textContent=document.getElementById("name").value;
        player1.name = document.getElementById("name").value;
        document.getElementById("name").placeholder="player2";
        player1.pnameicon.innerText=document.getElementById("name").value;
        document.getElementById("name").value="";
        count++;
    }
    if(count==1 && !document.getElementById("name").value==""){
        document.getElementById("p2name").textContent=document.getElementById("name").value;
        player2.name = document.getElementById("name").value;
        document.getElementById("name").placeholder="player3";
        player2.pnameicon.innerText=document.getElementById("name").value;
        document.getElementById("name").value="";
        count++;
    }
    if(count==2 && !document.getElementById("name").value==""){
        document.getElementById("p3name").textContent=document.getElementById("name").value;
        player3.name = document.getElementById("name").value;
        player3.pnameicon.innerText=document.getElementById("name").value;
        document.getElementById("name").value="";
        //隨機鬼
        isghost.pnameicon.style.color="white";
        document.getElementById("text").innerHTML='<p style="color:red;">'+isghost.name+' is ghost.</p><p>Control</p><p>Player1: up down left right</p><p>Player2: UJHK</p><p>Player3: WSAD</p><p>HINT: Safe area is safe.</p><p>Press space to start or pause</p><p></p>';
        issetfinish = true;
    }
};

//倒數計時 start pause reset 
// Select Countdown container
let countContainer;
let stopicon;
// Select action buttons
const startButton = document.getElementById("start");
const stopButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

// variable to store count
let remainingTime = 60;

// variable to store time interval
let timer;

// Variable to track whether timer is running or not
let isStopped = true;
let isfirst = true;

// Function to start Timer
function startTimer() {
    if (isfirst){
        document.getElementById("text").innerHTML='<p id="countdown-number">60</p><img id="stop">';
        countContainer = document.getElementById("countdown-number");
        stopicon = document.getElementById("stop");
        text.style.backgroundColor="rgb(223, 194, 88)";
        text.style.borderColor="rgb(223, 194, 88)";
        isfirst = false;
    }
    stopicon.src = "";
    if (isStopped && !isend) {
        isStopped = false;
        countContainer.innerText = remainingTime;
        timer = setInterval(renderTime, 1000);
    }
};

// Function to stop Timer
function stopTimer(){
    isStopped = true;
    stopicon.src = "asset/pause.png"
    if (timer) {
        clearInterval(timer);
    }
};

// Function to reset Timer
function resetTimer(){
    isStopped = true;
    clearInterval(timer);
    remainingTime = 60;
    countContainer.innerText = remainingTime;
    //玩家歸位
    player1.role.style.left = "45%";
    player2.role.style.left = "25%";
    player3.role.style.left = "65%";
    player1.role.style.top = "15%";
    player2.role.style.top = "55%";
    player3.role.style.top = "55%";
    //重選鬼
    //初始化資料
    player1.pnameicon.style.color="black";
    player2.pnameicon.style.color="black";
    player3.pnameicon.style.color="black";
    player1.ghost = false;
    player2.ghost = false;
    player3.ghost = false;
    player1.caught = false;
    player2.caught = false;
    player3.caught = false;
    player1.pcn = 0;
    player2.pcn = 0;
    player3.pcn = 0;
    player1.pc.innerText='Count: 0';
    player2.pc.innerText='Count: 0';
    player3.pc.innerText='Count: 0';
    //重新抽鬼
    isghost = choose_ghost(player1,player2,player3);
    isghost.pnameicon.style.color="white";
    document.getElementById("text").innerHTML='<p style="color:red;">'+isghost.name+' is the ghost.</p><p>Control</p><p>Player1: up down left right</p><p>Player2: UJHK</p><p>Player3: WSAD</p><p>HINT: Safe area is safe.</p><p>Press space to start or pause</p><p></p>';
    text.style.backgroundColor="black";
    text.style.borderColor="white";
    gamearea.style.backgroundColor="rgb(223, 194, 88)";
    isfirst = true;
    isend = false;
};

// function to display time
function renderTime (){
    // decement time
    remainingTime -= 1;
    // render count on the screen
    countContainer.innerText = remainingTime;
    // timeout on zero
    if (remainingTime <= 0) {
        check_result(player1,player2,player3);
        isStopped = true;
        clearInterval(timer);
    }
};

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

//鬼安全區限制
function ghostandsafearea(who,s){
    if (who.role.offsetTop>s.offsetTop-who.role.offsetHeight && who.role.offsetTop<s.offsetTop+s.offsetHeight && who.role.offsetLeft-10>s.offsetLeft-who.role.offsetWidth && who.role.offsetLeft<s.offsetLeft+s.offsetWidth){
        who.role.style.left=who.role.offsetLeft+10+'px';
    }
    if (who.role.offsetTop>s.offsetTop-who.role.offsetHeight && who.role.offsetTop<s.offsetTop+s.offsetHeight && who.role.offsetLeft>s.offsetLeft-who.role.offsetWidth && who.role.offsetLeft+10<s.offsetLeft+s.offsetWidth){
        who.role.style.left=who.role.offsetLeft-10+'px';
    }
    if (who.role.offsetTop>s.offsetTop-who.role.offsetHeight && who.role.offsetTop+10<s.offsetTop+s.offsetHeight && who.role.offsetLeft>s.offsetLeft-who.role.offsetWidth && who.role.offsetLeft<s.offsetLeft+s.offsetWidth){
        who.role.style.top=who.role.offsetTop-10+'px';
    }
    if (who.role.offsetTop-10>s.offsetTop-who.role.offsetHeight && who.role.offsetTop<s.offsetTop+s.offsetHeight && who.role.offsetLeft>s.offsetLeft-who.role.offsetWidth && who.role.offsetLeft<s.offsetLeft+s.offsetWidth){
        who.role.style.top=who.role.offsetTop+10+'px';
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

//鬼抓人偵測
function ghostcatch(who){
    if (who==player1){
        if (player1.hitbox(player2)){
            player2.caught=true;
            stopTimer();
            check_result(player1, player2, player3);
        }
        if (player1.hitbox(player3)){
            player3.caught=true;
            stopTimer();
            check_result(player1, player2, player3)
        }
    }
    if (who==player2){
        if (player2.hitbox(player1)){
            player1.caught=true;
            stopTimer();
            check_result(player1, player2, player3)
        }
        if (player2.hitbox(player3)){
            player3.caught=true;
            stopTimer();
            check_result(player1, player2, player3)
        }
    }
    if (who==player3){
        if (player3.hitbox(player2)){
            player2.caught=true;
            stopTimer();
            check_result(player1, player2, player3)
        }
        if (player3.hitbox(player1)){
            player1.caught=true;
            stopTimer();
            check_result(player1, player2, player3)
        }
    }
}

//輸贏判斷
function check_result(p1, p2, p3) {
    //時間倒數結束且鬼未抓到人
    if (remainingTime==0){
        if(p1.ghost){
            check_loser = player1.name;
        }
        if(p2.ghost){
            check_loser = player2.name;
        }
        if(p3.ghost){
            check_loser = player3.name;
        }
        let temp = 10000;
        if(!p1.ghost){
            if(temp > p1.pcn){
                check_winner = player1.name;
                temp = p1.pcn;
            }
        }
        if(!p2.ghost){
            if(temp > p2.pcn){
                check_winner = player2.name;
                temp = p2.pcn;
            }
            else if (temp==p2.pcn){
                check_winner = "Both";
            }
        }
        if(!p3.ghost){
            if(temp > p3.pcn){
                check_winner = player3.name;
                temp = p3.pcn;
            }
            else if (temp==p3.pcn){
                check_winner = "Both";
            }
        }
    }
    //時間倒數結束的瞬間(鬼抓到人)
    // if(p1.ghost){
    //     check_winner = p1_name.textContent;
    // }
    // if(p2.ghost){
    //     check_winner = p2_name.textContent;
    // }
    // if(p3.ghost){
    //     check_winner = p3_name.textContent;
    // }
    // if(!p1.ghost){
    //     if(p1.caught){
    //         check_loser = p1_name.textContent;
    //     }
    // }
    // if(!p2.ghost){
    //     if(p2.caught){
    //         check_loser = p2_name.textContent;
    //     }
    // }
    // if(!p3.ghost){
    //     if(p3.caught){
    //         check_loser = p3_name.textContent;
    //     }
    // }

    //時間倒數未結束即停止(鬼抓到人)
    if (remainingTime!=0){
        if(p1.ghost){
            check_winner = player1.name;
        }
        if(p2.ghost){
            check_winner = player2.name;
        }
        if(p3.ghost){
            check_winner = player3.name;
        }

        if(!p1.ghost){
            if(p1.caught){
                check_loser = player1.name;
            }
        }
        if(!p2.ghost){
            if(p2.caught){
                check_loser = player2.name;
            }
        }
        if(!p3.ghost){
            if(p3.caught){
                check_loser = player3.name;
            }
        }
    }
    showResult();
    isend = true;
}
//結果呈現
function showResult(params) {
    // start_label.style.display = "none";
    // end_label.style.display = "block";

    // win_player.textContent = check_winner;
    // lose_player.textContent = check_loser;
    // time_count.textContent = "時間倒數";
    document.getElementById("text").innerHTML='<p>Winner:</p>'+check_winner+'<p>Loser:</p>'+check_loser+'<p>Time Left:</p>'+remainingTime+'<p></p>';
    text.style.backgroundColor="black";
    text.style.borderColor="white";
    gamearea.style.backgroundColor="green";
}

//需要執行的function
setInterval(function(){
    if (issetfinish){
    //1
        if (!isStopped){
            player1.hitbox(player2);
            player1.hitbox(player3);
            move(player1);
            ghostcatch(isghost);
        //2
            player2.hitbox(player1);
            player2.hitbox(player3);
            move(player2);
            ghostcatch(isghost);
        //3
            player3.hitbox(player1);
            player3.hitbox(player2);
            move(player3);
            ghostcatch(isghost);
        //safe area
            safeareaboundery(player1);
            safeareaboundery(player2);
            safeareaboundery(player3);
        //ghost
            ghostandsafearea(isghost,safearea1);
            ghostandsafearea(isghost,safearea2);
            ghostandsafearea(isghost,safearea3);
            ghostandsafearea(isghost,safearea4);
        }
    // Attach onclick event to buttons
        startButton.onclick = startTimer;
        resetButton.onclick = resetTimer;
        stopicon.onclick = startTimer;
        stopButton.onclick = stopTimer;
    }
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
//start
    if (event.key==" " && issetfinish){
        if (isStopped){
            startTimer();
        }
        else if (!isStopped){
            stopTimer();
        }
    }
    if (event.key=="Enter" && !issetfinish){
        entername();
    }
})

//按鍵反饋
function clickbuttom(what){
    what.addEventListener("mouseenter",function(){
        what.style.transitionDelay = "50ms"
        what.style.transform = "scale(1.1)";
    })
    what.addEventListener("mouseout",function(){
        what.style.transform = "scale(1)";
    })
    what.addEventListener("mousedown",function(){
        what.style.transform = "scale(1)";
    })
    what.addEventListener("mouseup",function(){
        what.style.transitionDelay = "100ms"
        what.style.transform = "scale(1.1)";
    })
}
clickbuttom(startButton);
clickbuttom(stopButton);
clickbuttom(resetButton);
