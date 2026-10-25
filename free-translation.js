document.addEventListener('DOMContentLoaded',async()=>{
 const form=document.getElementById('freeTranslateForm'),db=window.penpalClient;if(!form||!db)return;
 const $=id=>document.getElementById(id);const status=$('ocrProgress');
 const langCode={English:'en',Japanese:'ja',German:'de',French:'fr',Spanish:'es'};
 const ocrCode={eng:'en',jpn:'ja',deu:'de',fra:'fr',spa:'es'};
 $('freeOcr').onclick=async()=>{
  const file=form.elements.photo.files[0];if(!file){status.textContent='Choose a photo first.';return}
  if(file.size>5*1024*1024||!['image/jpeg','image/png','image/webp'].includes(file.type)){status.textContent='Use a JPEG, PNG or WebP under 5 MB.';return}
  const btn=$('freeOcr');btn.disabled=true;status.textContent='Loading free OCR locally…';
  try{
   if(!window.Tesseract){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';script.onload=resolve;script.onerror=reject;document.head.append(script)})}
   const worker=await Tesseract.createWorker(form.elements.sourceLanguage.value,1,{logger:m=>{if(m.status)status.textContent=m.status+(m.progress?' '+Math.round(m.progress*100)+'%':'')}});
   try{const {data}=await worker.recognize(file);form.elements.source.value=data.text.trim();status.textContent='OCR complete. Review and correct the text: handwriting may be misread.'}finally{await worker.terminate()}
  }catch(e){status.textContent='OCR unavailable: '+(e.message||String(e))+'. You can type the original text manually.'}finally{btn.disabled=false}
 };
 $('freeAutoTranslate').onclick=async()=>{
  const text=form.elements.source.value.trim();if(!text){status.textContent='Enter or recognize the original text first.';return}
  const sourceLanguage=ocrCode[form.elements.sourceLanguage.value],targetLanguage=langCode[form.elements.language.value];
  if(sourceLanguage===targetLanguage){form.elements.translated.value=text;status.textContent='Source and target languages are the same.';return}
  const api=window.Translator;
  if(!api||typeof api.create!=='function'){status.textContent='Built-in translation is not supported in this browser. Paste a translation into the field below; no paid API is required.';return}
  const btn=$('freeAutoTranslate');btn.disabled=true;status.textContent='Checking browser translation model…';
  try{const opts={sourceLanguage,targetLanguage};if(typeof api.availability==='function'){const availability=await api.availability(opts);if(availability==='unavailable')throw new Error('Language pair unavailable')}
   const translator=await api.create(opts);try{form.elements.translated.value=await translator.translate(text);status.textContent='Translated in your browser. Please review for errors.'}finally{translator.destroy?.()}
  }catch(e){status.textContent='Browser translation unavailable: '+e.message+'. Paste a translation manually.'}finally{btn.disabled=false}
 };
 form.onsubmit=async e=>{e.preventDefault();const b=form.querySelector('button[type=submit]');b.disabled=true;try{const {error}=await db.rpc('save_free_letter_translation',{p_source:form.elements.source.value.trim(),p_translation:form.elements.translated.value.trim(),p_language:form.elements.language.value});if(error)throw error;status.textContent='Saved privately. Refresh My Letter Collection to view it.';form.reset()}catch(e){status.textContent='Could not save: '+e.message}finally{b.disabled=false}};
});
