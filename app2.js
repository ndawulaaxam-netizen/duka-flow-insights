var CH=null;
function amt(x){
var v=Number(x.total_amount||x.amount||x.total||
x.sale_amount||x.total_ugx||x.value||0);
if(!v){v=(Number(x.quantity||1))*
(Number(x.unit_price||x.price||0));}
return v||0;
}
function pay(x){
return x.payment_method||x.payment||x.method||'Cash';
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
function products(){
var map={};
S.forEach(function(x){
var n=x.product_name||'Item';
map[n]=(map[n]||0)+amt(x);});
var arr=[];
for(var k in map){arr.push([k,map[k]]);}
arr.sort(function(a,b){return b[1]-a[1];});
return arr;
}
function show(){
var t=0;
S.forEach(function(x){t+=amt(x);});
document.getElementById('k1').innerText=
t.toLocaleString();
document.getElementById('k2').innerText=H.length;
document.getElementById('k3').innerText=S.length;
document.getElementById('k4').innerText=
Math.round(t*0.25).toLocaleString();
insight(t);topProd();payMix();
salesList();shopsList();adminLists();chart();
}
function insight(t){
var m=document.getElementById('m');
if(!S.length){m.innerText='✅ Connected! Record sales in the Shop App.';return;}
var p=products();
var top=p.length?p[0][0]:'-';
var mo=0;
S.forEach(function(x){
var q=pay(x).toLowerCase();
if(q.indexOf('momo')>-1||q.indexOf('mtn')>-1||
q.indexOf('airtel')>-1){mo+=amt(x);}});
var pc=t?Math.round(mo/t*100):0;
m.innerText='💡 '+S.length+' sales · UGX '+
t.toLocaleString()+' · Top product: '+top+
' · '+pc+'% paid by mobile money';
}
function topProd(){
var p=products().slice(0,5);
var max=p.length?p[0][1]:1;
var h='';
p.forEach(function(r){
h+='<div class="tt">'+r[0]+'</div>'+
'<div class="bar"><div class="fill" style="width:'+
Math.round(r[1]/max*100)+'%"></div></div>'+
'<div class="gg">UGX '+r[1].toLocaleString()+
'</div>';
});
document.getElementById('tp').innerHTML=
h||'<p>No data yet.</p>';
}
function payMix(){
var map={};
S.forEach(function(x){
var n=pay(x);map[n]=(map[n]||0)+amt(x);});
var tot=0;
for(var k in map){tot+=map[k];}
var h='';
for(var k in map){
var pc=tot?Math.round(map[k]/tot*100):0;
h+='<div class="tt">'+k+'</div>'+
'<div class="bar"><div class="fill" style="width:'+
pc+'%"></div></div>'+
'<div class="gg">'+pc+'%</div>';
}
document.getElementById('pm').innerHTML=
h||'<p>No data yet.</p>';
}
function salesList(){
var h='';
S.slice(0,10).forEach(function(x){
h+='<div class="row"><span>'+nm(x.shop_id)+
' · '+(x.product_name||'Item')+
' x'+(x.quantity||1)+'</span><b>UGX '+
amt(x).toLocaleString()+'</b></div>';
});
document.getElementById('s').innerHTML=
h||'<p>No sales yet.</p>';
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