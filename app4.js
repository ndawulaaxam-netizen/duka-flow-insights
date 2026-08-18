var _sh=show;
show=function(){_sh();regions();restock();expview();};
function setRange(n){
RANGE=n;
var b=document.getElementsByClassName('rb');
for(var j=0;j<b.length;j++){
b[j].className=(Number(b[j].getAttribute('data-d'))==n)?'rb on':'rb';}
applyRange();
}
function regions(){
var map={};
S.forEach(function(x){
var r=loc(x.shop_id);
map[r]=(map[r]||0)+amt(x);});
var arr=[];
for(var k in map){arr.push([k,map[k]]);}
arr.sort(function(a,b){return b[1]-a[1];});
var max=arr.length?arr[0][1]:1;
var h='';
arr.slice(0,6).forEach(function(r){
h+='<div class="tt">📍 '+r[0]+'</div>'+
'<div class="bar"><div class="fill" style="width:'+
Math.round(r[1]/max*100)+'%"></div></div>'+
'<div class="gg">UGX '+r[1].toLocaleString()+'</div>';});
document.getElementById('rg').innerHTML=
h||'<p>No data yet.</p>';
}
function restock(){
var h='';
P.forEach(function(p){
var st=Number(p.stock||p.quantity||p.stock_level||0);
var th=Number(p.low_stock||p.threshold||5);
if(st<=th){
h+='<div class="row"><span>⚠️ '+
(p.name||p.product_name||'Item')+
' — only '+st+' left</span><b>'+
nm(p.shop_id||'')+'</b></div>';}});
document.getElementById('ra').innerHTML=
h||'<p>✅ No low stock right now.</p>';
}
function expview(){
var cut=Date.now()-RANGE*86400000;
var te=0;
E.forEach(function(x){
if(RANGE==0||new Date(x.created_at).getTime()>=cut){
te+=Number(x.amount||x.total_amount||x.cost||0);}});
var ts=0;
S.forEach(function(x){ts+=amt(x);});
var el=document.getElementById('ev');
if(el){
el.innerHTML=
'<div class="row"><span>💰 Sales ('+rl()+')</span><b>UGX '+
ts.toLocaleString()+'</b></div>'+
'<div class="row"><span>💸 Expenses</span><b>UGX '+
te.toLocaleString()+'</b></div>'+
'<div class="row"><span>📊 Money Left</span><b>UGX '+
(ts-te).toLocaleString()+'</b></div>';}
}
function rl(){return RANGE==0?'all time':RANGE+' days';}