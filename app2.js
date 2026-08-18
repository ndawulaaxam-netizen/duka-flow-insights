var CH=null;
function amt(x){
var v=Number(x.total_amount||x.amount||x.total||
x.sale_amount||x.total_ugx||x.value||0);
if(!v){v=(Number(x.quantity||1))*
(Number(x.unit_price||x.price||0));}
return v||0;
}
function sname(x){
return x.name||x.shop_name||x.shopname||x.title||
x.business_name||x.owner_name||'Shop';
}
function nm(i){
for(var j=0;j<H.length;j++){
if(H[j].id==i){return sname(H[j]);}}
return 'Unknown';
}
function loc(i){
for(var j=0;j<H.length;j++){
if(H[j].id==i){return H[j].location||
H[j].region||H[j].district||'Uganda';}}
return 'Uganda';
}
function esc(t){return String(t).replace(/'/g,"\\'")}
function show(){
var t=0;
S.forEach(function(x){t+=amt(x);});
document.getElementById('k1').innerText=t.toLocaleString();
document.getElementById('k2').innerText=H.length;
document.getElementById('k3').innerText=S.length;
document.getElementById('k4').innerText=
Math.round(t*0.25).toLocaleString();
document.getElementById('m').innerText=
'✅ LIVE: '+S.length+' sales · '+H.length+
' shops · UGX '+t.toLocaleString();
salesList();shopsList();adminLists();chart();
}
function salesList(){
var h='';
S.slice(0,15).forEach(function(x){
h+='<div class="row"><span>'+nm(x.shop_id)+
' · '+(x.product_name||'Item')+
' x'+(x.quantity||1)+'</span><b>UGX '+
amt(x).toLocaleString()+'</b></div>';
});
document.getElementById('s').innerHTML=
h||'<p>No sales yet.</p>';
}
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
'</b></div></div>';
});
document.getElementById('sh').innerHTML=
h||'<p>No shops yet.</p>';
}
function chart(){
try{
var L=[],T=[];
for(var i=13;i>=0;i--){
var d=new Date();d.setDate(d.getDate()-i);
var k=d.toISOString().slice(0,10);
L.push(k.slice(8)+'/'+k.slice(5,7));
var v=0;
S.forEach(function(x){
if(String(x.created_at||'').slice(0,10)==k){v+=amt(x);}});
T.push(v);
}
if(CH){CH.destroy();}
CH=new Chart(document.getElementById('ch'),
{type:'line',
data:{labels:L,datasets:[{data:T,
borderColor:'#3b82f6',
backgroundColor:'rgba(59,130,246,.2)',
fill:true,tension:.4}]},
options:{plugins:{legend:{display:false}},
scales:{y:{ticks:{color:'#94a3b8'}},
x:{ticks:{color:'#94a3b8'}}}}});
}catch(e){}
}