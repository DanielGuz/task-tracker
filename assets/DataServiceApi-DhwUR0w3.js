var p=Object.defineProperty;var l=(n,e,t)=>e in n?p(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var a=(n,e,t)=>(l(n,typeof e!="symbol"?e+"":e,t),t);import{a as s}from"./Button-j0wSbITy.js";class i{constructor(){a(this,"ResponseTypeBlob");a(this,"fileHeader");this.fileHeader={headers:{"Content-Type":"multipart/form-data"}},this.ResponseTypeBlob={responseType:"blob"}}get(e,t){return s.get(e,t).then(r=>r.data)}getResponseFull(e,t){return s.get(e,t).then(r=>r)}post(e,t){return s.post(e,t).then(r=>r.data)}postResponseFull(e,t){return s.post(e,t).then(r=>r)}getFile(e,t){return s.get(e,{params:t,responseType:"blob"})}postWithFiles(e,t){return s.post(e,t,this.fileHeader)}put(e,t,r){return s.put(`${e}${r}/`,t).then(o=>o.data)}delete(e,t){return s.delete(`${e}${t}/`).then(r=>r.data)}}const h=new i;export{h as d};
