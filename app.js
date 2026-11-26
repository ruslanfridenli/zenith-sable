const I18N={"en":{"category":"Category","convert":"Convert","from":"From","to":"To","result":"Result","about":"About","abouttext":"All conversions run in Python inside your browser via Pyodide — no server, no tracking."},"de":{"category":"Kategorie","convert":"Umrechnen","from":"Von","to":"Nach","result":"Ergebnis","about":"Info","abouttext":"Alle Umrechnungen laufen als Python direkt im Browser via Pyodide — kein Server, kein Tracking."}};
let lang=localStorage.getItem('lang')||'en';
const t=k=>I18N[lang][k]||k;
function applyLang(){document.documentElement.lang=lang;document.querySelectorAll('[data-i]').forEach(el=>el.textContent=t(el.dataset.i));document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));}
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.setItem('lang',lang);applyLang();});

const $=id=>document.getElementById(id);let py=null;
async function boot(){
  py=await loadPyodide();
  const src=await(await fetch('app.py')).text();
  py.runPython(src);
  const cats=py.globals.get('list_cats')().toJs();
  cats.forEach(c=>{const o=document.createElement('option');o.value=o.textContent=c;$('cat').appendChild(o);});
  fillUnits();
}
function fillUnits(){
  const cat=$('cat').value;
  const units=py.globals.get('list_units')(cat).toJs();
  $('frm').innerHTML='';$('to').innerHTML='';
  units.forEach(u=>{const o1=document.createElement('option');o1.value=o1.textContent=u;$('frm').appendChild(o1);const o2=o1.cloneNode(true);$('to').appendChild(o2);});
  $('to').value=units[units.length-1]||units[0];
  calc();
}
function calc(){
  const v=parseFloat($('val').value);if(isNaN(v)){$('out').textContent='—';return;}
  const r=py.globals.get('convert')(v,$('cat').value,$('frm').value,$('to').value);
  const num=typeof r==='number'?r:Number(r);
  $('out').textContent=(Math.abs(num)>=1e6||Math.abs(num)<1e-4)?num.toExponential(6):(+num.toFixed(8)).toString();
  $('formula').textContent=v+' '+$('frm').value+' = '+$('out').textContent+' '+$('to').value;
}
['cat'].forEach(id=>$(id).addEventListener('change',fillUnits));
['frm','to'].forEach(id=>$(id).addEventListener('change',calc));
$('val').addEventListener('input',calc);
$('history').innerHTML='';
boot().catch(e=>{$('out').textContent='pyodide failed: '+e.message;});applyLang();