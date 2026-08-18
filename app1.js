var sb=null,S=[],H=[],E=[],P=[],SALL=[],RANGE=0;
addEventListener('load',function(){ld();setInterval(ld,60000);});
async function ld(){
var m=document.getElementById('m');
try{
if(!sb){
if(!window.supabase){m.innerText='⚠️ Library not loaded.';return;}
sb=supabase.createClient('https://mrkawvyaybphbfpqrvqb.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ya2F3dnlheWJwaGJmcHFydnFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NDQ3OTQsImV4cCI6MjEwMjEyMDc5NH0.CCUWP5HxpjPZI8TCoakKjHj0WDrdgg9UNXjbo6GEKzc');
}
var a=await sb.from('shops').select('*');
if(a.error){m.innerText='⚠️ '+a.error.message;return;}
H=a.data||[];
var b=await sb.from('sales').select('*');
if(b.error){m.innerText='⚠️ '+b.error.message;return;}
SALL=b.data||[];
var e=await sb.from('expenses').select('*');
E=e.data||[];
var p=await sb.from('products').select('*');
P=p.data||[];
applyRange();
}catch(err){m.innerText='⚠️ '+err.message;}
}
function applyRange(){
if(RANGE>0){
var cut=Date.now()-RANGE*86400000;
S=SALL.filter(function(x){
return new Date(x.created_at).getTime()>=cut;});
}else{S=SALL.slice();}
S.sort(function(a,b){
return String(b.created_at||'').localeCompare(String(a.created_at||''));});
show();
}