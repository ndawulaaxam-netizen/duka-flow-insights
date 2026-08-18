function shopsList(){
var h='';
H.forEach(function(x){
var c=0,v=0;
S.forEach(function(y){
if(y.shop_id==x.id){c++;v+=amt(y);}});
h+='<div class="shop"><b>'+sname(x)+
'</b><div class="row"><span>'+c+
' sales · '+(x.owner_name||'')+
'</span><b>UGX '+v.toLocaleString()+
'</b></div></div>';});
document.getElementById('sh').innerHTML=
h||'<p>No shops yet.</p>';}
function tab(n){
for(var i=1;i<=3;i++){
var p=document.getElementById('p'+i);
if(p){p.className=(i==n)?'pg':'pg hid';}}
var b=document.getElementsByClassName('tb');
for(var j=0;j<b.length;j++){
b[j].className=(j==n-1)?'tb on':'tb';}}
function adminLists(){
var d='';
S.slice(0,15).forEach(function(x){
d+='<div class="row"><span>'+nm(x.shop_id)+
' · '+(x.product_name||'Item')+
'</span><button class="act" onclick="dR(\''+
x.id+'\')">Del</button></div>';});
document.getElementById('ds').innerHTML=
d||'<p>No sales.</p>';
var r='';
H.forEach(function(x){
r+='<div class="row"><span>'+sname(x)+
' ('+(x.owner_name||'')+
')</span><button class="act" onclick="dS(\''+
x.id+'\',\''+esc(sname(x))+
'\')">Remove</button></div>';});
document.getElementById('rs').innerHTML=
r||'<p>No shops.</p>';}
async function dS(i,n){
if(!confirm('Remove '+n+' and ALL its data?'))return;
await sb.from('sales').delete().eq('shop_id',i);
await sb.from('expenses').delete().eq('shop_id',i);
var r=await sb.from('shops').delete().eq('id',i);
alert(r.error?r.error.message:'✅ removed');
location.reload();}
async function dR(i){
if(!confirm('Delete this sale?'))return;
var r=await sb.from('sales').delete().eq('id',i);
alert(r.error?r.error.message:'✅ deleted');
location.reload();}
async function exp(){
if(!S.length){alert('No sales yet.');return;}
var rows=[['Date','Location','Product','Qty','UGX','Payment']];
S.forEach(function(x){
rows.push([String(x.created_at||'').slice(0,10),
loc(x.shop_id),x.product_name||'Item',
x.quantity||1,amt(x),pay(x)]);});
var csv=rows.map(function(r){return r.join(',')}).join('\n');
var a=document.createElement('a');
a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
a.download='DukaFlow_Factory_Report.csv';
a.click();}