function shopsList(){
document.getElementById('sh').innerHTML=
'<p>⚠️ app3.js missing - re-paste app3.js</p>';}
function adminLists(){
document.getElementById('ds').innerHTML=
'<p>⚠️ app3.js missing</p>';
document.getElementById('rs').innerHTML=
'<p>⚠️ app3.js missing</p>';}
function tab(n){
for(var i=1;i<=3;i++){
var p=document.getElementById('p'+i);
if(p){p.className=(i==n)?'pg':'pg hid';}}
var b=document.getElementsByClassName('tb');
for(var j=0;j<b.length;j++){
b[j].className=(j==n-1)?'tb on':'tb';}}
function exp(){alert('⚠️ app3.js missing - re-paste app3.js');}
function dS(){alert('⚠️ app3.js missing');}
function dR(){alert('⚠️ app3.js missing');}
function setRange(n){
window.RANGE=n;
if(window.applyRange){applyRange();}}
function regions(){
var e=document.getElementById('rg');
if(e){e.innerHTML='<p>⚠️ app4.js missing</p>';}}
function restock(){
var e=document.getElementById('ra');
if(e){e.innerHTML='<p>⚠️ app4.js missing</p>';}}
function expview(){
var e=document.getElementById('ev');
if(e){e.innerHTML='<p>⚠️ app4.js missing</p>';}}
var PIN='2026';
function unlock(){
if(document.getElementById('pw').value===PIN){
sessionStorage.setItem('dfok','1');
openDash();
}else{
document.getElementById('pe').innerText='Wrong PIN.';}}
function openDash(){
document.getElementById('pin').style.display='none';
document.getElementById('app').className='';}
if(sessionStorage.getItem('dfok')==='1'){openDash();}