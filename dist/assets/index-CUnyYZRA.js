var g=Object.defineProperty;var m=(s,e,t)=>e in s?g(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var n=(s,e,t)=>(m(s,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(r){if(r.ep)return;r.ep=!0;const l=t(r);fetch(r.href,l)}})();var o=(s=>(s[s.None=0]="None",s[s.X=1]="X",s[s.O=2]="O",s))(o||{});class h{constructor(e){n(this,"strict");n(this,"cells",[]);this.init(),this.strict=e}cloneFrom(e){this.cells=[...e.cells]}init(){for(let e=0;e<9;e++)this.cells[e]=o.None}getAt(e){return this.cells[e]}setAt(e,t){if(this.strict&&this.cells[e]!==o.None)throw Error("Cell is already used");this.cells[e]=t}isFull(){return this.getEmptyCellsIndices().length===0}getEmptyCellsIndices(){const e=[];for(let t=0;t<9;t++)this.cells[t]===o.None&&e.push(t);return e}findSuccess(){const e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let t=0;t<e.length;t++)if(this.cells[e[t][0]]!=o.None&&this.cells[e[t][0]]===this.cells[e[t][1]]&&this.cells[e[t][1]]===this.cells[e[t][2]])return e[t];return null}}class w{constructor(e,t,i){n(this,"time");n(this,"index");n(this,"by");this.time=e,this.index=t,this.by=i}}class f{constructor(){n(this,"date",new Date);n(this,"ended",null);n(this,"status",null);n(this,"items",[]);n(this,"uid","");this.uid=crypto.randomUUID()}}class p{constructor(){n(this,"grid",new h(!0));n(this,"turnToX",!0);n(this,"winner",null);n(this,"start",new Date);n(this,"history",new f);n(this,"onFinish",()=>{});n(this,"onIASelect",()=>{});n(this,"onPlayerTOPlay",()=>{});this.init()}init(){this.grid.init(),this.winner=null,this.turnToX=!0,this.start=new Date,this.history=new f}checkSuccess(){const e=this.grid.findSuccess();e!==null?(this.winner=this.grid.getAt(e[0]),this.history.ended=new Date,this.history.status=this.winner,this.onFinish(e)):this.grid.isFull()&&(this.winner=o.None,this.history.ended=new Date,this.history.status=this.winner,this.onFinish(null))}setUsed(e,t){this.grid.setAt(e,t),this.history.items.push(new w(Date.now()-this.start.getTime(),e,t)),this.checkSuccess()}toggleTurn(){if(this.winner===null&&(this.turnToX=!this.turnToX,!this.turnToX)){const e=this.iaPlay();if(this.setUsed(e,o.O),this.onIASelect(e),this.turnToX=!this.turnToX,this.winner!==null)return;this.onPlayerTOPlay()}}iaPlay(){const e=new h(!1);e.cloneFrom(this.grid);for(let i=0;i<9;i++)if(e.getAt(i)==o.None){if(e.setAt(i,o.O),e.findSuccess())return i;e.setAt(i,o.None)}for(let i=0;i<9;i++)if(e.getAt(i)==o.None){if(e.setAt(i,o.X),e.findSuccess())return i;e.setAt(i,o.None)}const t=this.grid.getEmptyCellsIndices();return t.indexOf(4)!==-1?4:t[Math.floor(Math.random()*t.length)]}}const v="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M2.29289%202.29289C2.68342%201.90237%203.31658%201.90237%203.70711%202.29289L6.5%205.08579L9.29289%202.29289C9.68342%201.90237%2010.3166%201.90237%2010.7071%202.29289C11.0976%202.68342%2011.0976%203.31658%2010.7071%203.70711L7.91421%206.5L10.7071%209.29289C11.0976%209.68342%2011.0976%2010.3166%2010.7071%2010.7071C10.3166%2011.0976%209.68342%2011.0976%209.29289%2010.7071L6.5%207.91421L3.70711%2010.7071C3.31658%2011.0976%202.68342%2011.0976%202.29289%2010.7071C1.90237%2010.3166%201.90237%209.68342%202.29289%209.29289L5.08579%206.5L2.29289%203.70711C1.90237%203.31658%201.90237%202.68342%202.29289%202.29289ZM17.5%204C16.1193%204%2015%205.11929%2015%206.5C15%207.88071%2016.1193%209%2017.5%209C18.8807%209%2020%207.88071%2020%206.5C20%205.11929%2018.8807%204%2017.5%204ZM13%206.5C13%204.01472%2015.0147%202%2017.5%202C19.9853%202%2022%204.01472%2022%206.5C22%208.98528%2019.9853%2011%2017.5%2011C15.0147%2011%2013%208.98528%2013%206.5ZM6.5%2015C5.11929%2015%204%2016.1193%204%2017.5C4%2018.8807%205.11929%2020%206.5%2020C7.88071%2020%209%2018.8807%209%2017.5C9%2016.1193%207.88071%2015%206.5%2015ZM2%2017.5C2%2015.0147%204.01472%2013%206.5%2013C8.98528%2013%2011%2015.0147%2011%2017.5C11%2019.9853%208.98528%2022%206.5%2022C4.01472%2022%202%2019.9853%202%2017.5ZM13.2929%2013.2929C13.6834%2012.9024%2014.3166%2012.9024%2014.7071%2013.2929L17.5%2016.0858L20.2929%2013.2929C20.6834%2012.9024%2021.3166%2012.9024%2021.7071%2013.2929C22.0976%2013.6834%2022.0976%2014.3166%2021.7071%2014.7071L18.9142%2017.5L21.7071%2020.2929C22.0976%2020.6834%2022.0976%2021.3166%2021.7071%2021.7071C21.3166%2022.0976%2020.6834%2022.0976%2020.2929%2021.7071L17.5%2018.9142L14.7071%2021.7071C14.3166%2022.0976%2013.6834%2022.0976%2013.2929%2021.7071C12.9024%2021.3166%2012.9024%2020.6834%2013.2929%2020.2929L16.0858%2017.5L13.2929%2014.7071C12.9024%2014.3166%2012.9024%2013.6834%2013.2929%2013.2929Z'%20fill='%23000000'/%3e%3c/svg%3e";class d{static set(e,t){this.data.set(e,t)}static get(e){return this.data.has(e)?this.data.get(e):e}}n(d,"data",new Map);class y{constructor(e){n(this,"nodesContainer",null);n(this,"winOverlay",null);n(this,"winButton",null);n(this,"gameInfo",null);n(this,"timer",null);n(this,"nodes",[]);n(this,"log",null);var i;e.innerHTML=this.getHTML(),this.nodesContainer=document.getElementById("ttt-grid"),this.winOverlay=document.getElementById("win-overlay"),this.winButton=document.getElementById("win-button"),this.gameInfo=document.getElementById("game-info"),this.timer=document.getElementById("timer"),this.log=document.getElementById("log"),document.getElementById("btn-json").addEventListener("click",()=>this.log.classList.toggle("hidden"));const t=(i=this.nodesContainer)==null?void 0:i.querySelectorAll("span");if(t)for(let r=0;r<t.length;r++)this.nodes[r]=t[r]}getHTML(){return`
        <div class="p-4">
            <div class="w-72 md:w-96 mx-auto mt-8">
                <div id="game-info" class=" border rounded shadow-sm p-4 mb-4 flex">
                    <img src="${v}" class="w-12 h-12 m-auto inline-block" alt="TicTacToe Logo"/>
                    <div class="flex-grow text-left pl-4">
                        <div class="font-semibold">Tic Tac Toe</div>
                        <div class="text-gray-400 text-sm flex">
                            <div class="rounded bg-gray-200 mr-1 px-1"><i class="fa-regular fa-fw fa-flag"></i> <span id="score-n"></span></div>
                            <div class="rounded bg-gray-200 mr-1 px-1"><i class="fa fa-fw fa-times"></i> <span id="score0"></span></div>
                            <div class="rounded bg-gray-200 mr-1 px-1"><i class="fa-regular fa-fw fa-circle"></i> <span id="score1"></span></div>
                            <div id="timer" class=" px-1">0:00</div>
                        </div>
                    </div>
                </div>
                
                <div id="win-button" class="border rounded shadow-sm mb-4 hidden">
                    <button class="rounded text-lg flex p-4">
                        <svg id="ico-won" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12 m-auto">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                        </svg>
                        <svg id="ico-null" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 m-auto">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <div class="flex-grow text-left pl-4">
                            <div class="font-semibold message"></div>
                            <div class="text-sm">${d.get("play_again")}</div>
                        </div>
                    </button>
                </div>
                
                <div class="card border rounded shadow-sm p-8 relative">
                    <div id="ttt-grid" class="grid grid-cols-3 text-1xl gap-2">
                        <span data-index="0"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="1"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="2"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="3"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="4"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="5"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="6"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="7"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="8"><i class="fa fa-fw fa-times"></i></span>
                    </div>
                    <div id="win-overlay" class="absolute top-0 left-0 right-0 bottom-0 items-center justify-center hidden cursor-pointer"></div>
                <div id="log" 
                    class="hidden bg-white bg-opacity-75 backdrop-blur-lg overflow-y-auto absolute left-0 bottom-0 right-0 top-0 m-2 card border rounded shadow-inner p-4 text-sm font-mono whitespace-pre-wrap leading-4"></div>
                </div>
                <div class="border rounded shadow-sm mt-4 flex text-gray-400 text-sm">
                    <a href="https://github.com/tivins/tic-tac-toe" target="_blank" class="flex-grow px-2 py-1 hover:text-gray-500"><i class="fa-brands fa-github mr-2"></i>Source on GitHub</a>
                    <button id="btn-json" class="px-2 py-1 hover:text-gray-500"><i class="fa fa-code mr-2"></i>JSON</button>
                    <button id="btn-reset" class="px-2 py-1 hover:text-gray-500"><i class="fa fa-rotate mr-2"></i>Reset</button>
                </div>
            </div>
        </div>
        `}setTime(e){this.timer&&(this.timer.innerText=e)}updateScores(e){document.getElementById("score-n").innerText=e[0].toString(),document.getElementById("score0").innerText=e[1].toString(),document.getElementById("score1").innerText=e[2].toString()}queryCell(e){return this.nodes[e]}setWinCell(e,t){if(t!==null)for(let i=0;i<t.length;i++){const r=this.queryCell(t[i]);r.classList.add("finished"),r.classList.toggle("win",e===o.X),r.classList.toggle("fail",e!==o.X)}}updateWinButton(e){let t="?",i="";switch(this.winButton.querySelector("#ico-won").classList.add("hidden"),this.winButton.querySelector("#ico-null").classList.add("hidden"),e){case o.None:t=d.get("game_draw"),i="bg-gray-600 text-white",this.winButton.querySelector("#ico-null").classList.remove("hidden");break;case o.X:t=d.get("game_win"),i="bg-green-600 text-white",this.winButton.querySelector("#ico-won").classList.remove("hidden");break;case o.O:t=d.get("game_lost"),i="bg-red-800 text-white",this.winButton.querySelector("#ico-null").classList.remove("hidden");break}this.winButton.querySelector(".message").innerHTML=t,this.winButton.querySelector("button").className="p-4 rounded text-lg flex w-full "+i}setFinishState(){this.winOverlay.classList.toggle("hidden",!1),this.winButton.classList.toggle("hidden",!1),this.gameInfo.classList.toggle("hidden",!0)}reset(){this.winOverlay.classList.toggle("hidden",!0),this.winButton.classList.toggle("hidden",!0),this.gameInfo.classList.toggle("hidden",!1),this.setTime("0:00"),this.nodes.forEach(e=>{e.classList.remove("used","finished")})}setResetFunction(e){this.winButton.addEventListener("click",e),this.winOverlay.addEventListener("click",e),document.getElementById("btn-reset").addEventListener("click",e)}}document.addEventListener("DOMContentLoaded",()=>{window.navigator.language.substring(0,2)==="fr"?(d.set("game_draw","Match nul"),d.set("play_again","Cliquer pour rejouer"),d.set("game_lost","Vous avez perdu"),d.set("game_win","Vous &ecirc;tes vainqueur&nbsp;!")):(d.set("game_draw","Draw"),d.set("play_again","Click to play again"),d.set("game_lost","You've lost"),d.set("game_win","You are the winner!"));const s=new y(document.querySelector("#app")),e=[0,0,0],t=new p;t.onPlayerTOPlay=()=>{if(t.winner!==null)return;const a=t.grid.getEmptyCellsIndices();a.length===1&&c(s.queryCell(a[0]))},t.onIASelect=a=>{l(s.queryCell(a))},t.onFinish=a=>{s.setWinCell(t.winner,a),s.updateWinButton(t.winner),s.setFinishState(),e[t.winner??0]++},s.nodes.forEach(a=>{a.addEventListener("mouseover",()=>{a.classList.contains("used")||(t.turnToX?a.firstElementChild.className="fa fa-fw fa-times":a.firstElementChild.className="fa-regular fa-fw fa-circle")}),a.addEventListener("click",()=>{a.classList.contains("used")||!t.turnToX||(c(a),t.toggleTurn())})}),s.setResetFunction(i),s.updateScores(e),r();function i(){t.init(),s.updateScores(e),s.reset()}function r(){setInterval(()=>{let a=Math.floor((Date.now()-t.start.getTime())/1e3);const u=Math.floor(a/60);a-=u*60,s.setTime(u+":"+(a<10?"0":"")+a),s.log&&(s.log.innerHTML=JSON.stringify(t.history,null,2))},1e3)}function l(a){a.classList.add("used"),t.turnToX||(a.firstElementChild.className="fa-regular fa-fw fa-circle")}function c(a){l(a),t.setUsed(parseInt(a.getAttribute("data-index")??""),t.turnToX?o.X:o.O)}});