(function(f,h,e){var d=f.setTimeout,g={};function a(j){var i=j.required_features,k={};function l(n,o,m){var p={chunks:"slice_blob",jpgresize:"send_binary_string",pngresize:"send_binary_string",progress:"report_upload_progress",multi_selection:"select_multiple",dragdrop:"drag_and_drop",drop_element:"drag_and_drop",headers:"send_custom_headers",canSendBinary:"send_binary",triggerDialog:"summon_file_dialog"};if(p[n]){k[p[n]]=o}else{if(!m){k[n]=o}}}if(typeof(i)==="string"){c.each(i.split(/\s*,\s*/),function(m){l(m,true)})}else{if(typeof(i)==="object"){c.each(i,function(n,m){l(m,n)})}else{if(i===true){if(!j.multipart){k.send_binary_string=true}if(j.chunk_size>0){k.slice_blob=true}if(j.resize.enabled){k.send_binary_string=true}c.each(j,function(n,m){l(m,!!n,true)})}}}return k}var c={VERSION:"2.1.1",STOPPED:1,STARTED:2,QUEUED:1,UPLOADING:2,FAILED:4,DONE:5,GENERIC_ERROR:-100,HTTP_ERROR:-200,IO_ERROR:-300,SECURITY_ERROR:-400,INIT_ERROR:-500,FILE_SIZE_ERROR:-600,FILE_EXTENSION_ERROR:-601,FILE_DUPLICATE_ERROR:-602,IMAGE_FORMAT_ERROR:-700,IMAGE_MEMORY_ERROR:-701,IMAGE_DIMENSIONS_ERROR:-702,mimeTypes:h.mimes,ua:h.ua,typeOf:h.typeOf,extend:h.extend,guid:h.guid,get:function b(m){var k=[],l;if(h.typeOf(m)!=="array"){m=[m]}var j=m.length;while(j--){l=h.get(m[j]);if(l){k.push(l)}}return k.length?k:null},each:h.each,getPos:h.getPos,getSize:h.getSize,xmlEncode:function(j){var k={"<":"lt",">":"gt","&":"amp",'"':"quot","'":"#39"},i=/[<>&\"\']/g;return j?(""+j).replace(i,function(l){return k[l]?"&"+k[l]+";":l}):j},toArray:h.toArray,inArray:h.inArray,addI18n:h.addI18n,translate:h.translate,isEmptyObj:h.isEmptyObj,hasClass:h.hasClass,addClass:h.addClass,removeClass:h.removeClass,getStyle:h.getStyle,addEvent:h.addEvent,removeEvent:h.removeEvent,removeAllEvents:h.removeAllEvents,cleanName:function(j){var k,l;l=[/[\300-\306]/g,"A",/[\340-\346]/g,"a",/\307/g,"C",/\347/g,"c",/[\310-\313]/g,"E",/[\350-\353]/g,"e",/[\314-\317]/g,"I",/[\354-\357]/g,"i",/\321/g,"N",/\361/g,"n",/[\322-\330]/g,"O",/[\362-\370]/g,"o",/[\331-\334]/g,"U",/[\371-\374]/g,"u"];for(k=0;k<l.length;k+=2){j=j.replace(l[k],l[k+1])}j=j.replace(/\s+/g,"_");j=j.replace(/[^a-z0-9_\-\.]+/gi,"");return j},buildUrl:function(j,i){var k="";c.each(i,function(m,l){k+=(k?"&":"")+encodeURIComponent(l)+"="+encodeURIComponent(m)});if(k){j+=(j.indexOf("?")>0?"&":"?")+k}return j},formatSize:function(j){if(j===e||/\D/.test(j)){return c.translate("N/A")}function i(m,l){return Math.round(m*Math.pow(10,l))/Math.pow(10,l)}var k=Math.pow(1024,4);if(j>k){return i(j/k,1)+" "+c.translate("tb")}if(j>(k/=1024)){return i(j/k,1)+" "+c.translate("gb")}if(j>(k/=1024)){return i(j/k,1)+" "+c.translate("mb")}if(j>1024){return Math.round(j/1024)+" "+c.translate("kb")}return j+" "+c.translate("b")},parseSize:h.parseSizeStr,predictRuntime:function(k,j){var i,l;i=new c.Uploader(k);l=h.Runtime.thatCan(i.getOption().required_features,j||k.runtimes);i.destroy();return l},addFileFilter:function(j,i){g[j]=i}};c.addFileFilter("mime_types",function(k,j,i){if(k.length&&!k.regexp.test(j.name)){this.trigger("Error",{code:c.FILE_EXTENSION_ERROR,message:c.translate("File extension error."),file:j});i(false)}else{i(true)}});c.addFileFilter("max_file_size",function(l,j,i){var k;l=c.parseSize(l);if(j.size!==k&&l&&j.size>l){this.trigger("Error",{code:c.FILE_SIZE_ERROR,message:c.translate("File size error."),file:j});i(false)}else{i(true)}});c.addFileFilter("prevent_duplicates",function(l,j,i){if(l){var k=this.files.length;while(k--){if(j.name===this.files[k].name&&j.size===this.files[k].size){this.trigger("Error",{code:c.FILE_DUPLICATE_ERROR,message:c.translate("Duplicate file error."),file:j});i(false);return}}}i(true)});c.Uploader=function(l){var t=c.guid(),G,p=[],x={},F=[],w=[],C,K,n=false,v;function J(){var M,N=0,L;if(this.state==c.STARTED){for(L=0;L<p.length;L++){if(!M&&p[L].status==c.QUEUED){M=p[L];if(this.trigger("BeforeUpload",M)){M.status=c.UPLOADING;this.trigger("UploadFile",M)}}else{N++}}if(N==p.length){if(this.state!==c.STOPPED){this.state=c.STOPPED;this.trigger("StateChanged")}this.trigger("UploadComplete",p)}}}function k(L){L.percent=L.size>0?Math.ceil(L.loaded/L.size*100):100;j()}function j(){var M,L;K.reset();for(M=0;M<p.length;M++){L=p[M];if(L.size!==e){K.size+=L.origSize;K.loaded+=L.loaded*L.origSize/L.size}else{K.size=e}if(L.status==c.DONE){K.uploaded++}else{if(L.status==c.FAILED){K.failed++}else{K.queued++}}}if(K.size===e){K.percent=p.length>0?Math.ceil(K.uploaded/p.length*100):0}else{K.bytesPerSec=Math.ceil(K.loaded/((+new Date()-C||1)/1000));K.percent=K.size>0?Math.ceil(K.loaded/K.size*100):0}}function I(){var L=F[0]||w[0];if(L){return L.getRuntime().uid}return false}function E(M,L){if(M.ruid){var N=h.Runtime.getInfo(M.ruid);if(N){return N.can(L)}}return false}function y(){this.bind("FilesAdded",H);this.bind("CancelUpload",i);this.bind("BeforeUpload",B);this.bind("UploadFile",D);this.bind("UploadProgress",u);this.bind("StateChanged",A);this.bind("QueueChanged",j);this.bind("Error",r);this.bind("FileUploaded",s);this.bind("Destroy",q)}function z(Q,N){var O=this,M=0,L=[];var P={accept:Q.filters.mime_types,runtime_order:Q.runtimes,required_caps:Q.required_features,preferred_caps:x,swf_url:Q.flash_swf_url,xap_url:Q.silverlight_xap_url};c.each(Q.runtimes.split(/\s*,\s*/),function(R){if(Q[R]){P[R]=Q[R]}});if(Q.browse_button){c.each(Q.browse_button,function(R){L.push(function(S){var T=new h.FileInput(c.extend({},P,{name:Q.file_data_name,multiple:Q.multi_selection,container:Q.container,browse_button:R}));T.onready=function(){var U=h.Runtime.getInfo(this.ruid);h.extend(O.features,{chunks:U.can("slice_blob"),multipart:U.can("send_multipart"),multi_selection:U.can("select_multiple")});M++;F.push(this);S()};T.onchange=function(){O.addFile(this.files)};T.bind("mouseenter mouseleave mousedown mouseup",function(U){if(!n){if(Q.browse_button_hover){if("mouseenter"===U.type){h.addClass(R,Q.browse_button_hover)}else{if("mouseleave"===U.type){h.removeClass(R,Q.browse_button_hover)}}}if(Q.browse_button_active){if("mousedown"===U.type){h.addClass(R,Q.browse_button_active)}else{if("mouseup"===U.type){h.removeClass(R,Q.browse_button_active)}}}}});T.bind("error runtimeerror",function(){T=null;S()});T.init()})})}if(Q.drop_element){c.each(Q.drop_element,function(R){L.push(function(S){var T=new h.FileDrop(c.extend({},P,{drop_zone:R}));T.onready=function(){var U=h.Runtime.getInfo(this.ruid);O.features.dragdrop=U.can("drag_and_drop");M++;w.push(this);S()};T.ondrop=function(){O.addFile(this.files)};T.bind("error runtimeerror",function(){T=null;S()});T.init()})})}h.inSeries(L,function(){if(typeof(N)==="function"){N(M)}})}function o(N,P,L){var M=new h.Image();try{M.onload=function(){M.downsize(P.width,P.height,P.crop,P.preserve_headers)};M.onresize=function(){L(this.getAsBlob(N.type,P.quality));this.destroy()};M.onerror=function(){L(N)};M.load(N)}catch(O){L(N)}}function m(N,P,Q){var M=this,L=false;function O(S,T,U){var R=G[S];switch(S){case"max_file_size":if(S==="max_file_size"){G.max_file_size=G.filters.max_file_size=T}break;case"chunk_size":if(T=c.parseSize(T)){G[S]=T}break;case"filters":if(c.typeOf(T)==="array"){T={mime_types:T}}if(U){c.extend(G.filters,T)}else{G.filters=T}if(T.mime_types){G.filters.mime_types.regexp=(function(V){var W=[];c.each(V,function(X){c.each(X.extensions.split(/,/),function(Y){if(/^\s*\*\s*$/.test(Y)){W.push("\\.*")}else{W.push("\\."+Y.replace(new RegExp("["+("/^$.*+?|()[]{}\\".replace(/./g,"\\$&"))+"]","g"),"\\$&"))}})});return new RegExp("("+W.join("|")+")$","i")}(G.filters.mime_types))}break;case"resize":if(U){c.extend(G.resize,T,{enabled:true})}else{G.resize=T}break;case"prevent_duplicates":G.prevent_duplicates=G.filters.prevent_duplicates=!!T;break;case"browse_button":case"drop_element":T=c.get(T);case"container":case"runtimes":case"multi_selection":case"flash_swf_url":case"silverlight_xap_url":G[S]=T;if(!U){L=true}break;default:G[S]=T}if(!U){M.trigger("OptionChanged",S,T,R)}}if(typeof(N)==="object"){c.each(N,function(S,R){O(R,S,Q)})}else{O(N,P,Q)}if(Q){G.required_features=a(c.extend({},G));x=a(c.extend({},G,{required_features:true}))}else{if(L){M.trigger("Destroy");z.call(M,G,function(R){if(R){M.runtime=h.Runtime.getInfo(I()).type;M.trigger("Init",{runtime:M.runtime});M.trigger("PostInit")}else{M.trigger("Error",{code:c.INIT_ERROR,message:c.translate("Init error.")})}})}}}function H(M,L){[].push.apply(p,L);M.trigger("QueueChanged");M.refresh()}function B(L,M){if(G.unique_names){var O=M.name.match(/\.([^.]+)$/),N="part";if(O){N=O[1]}M.target_name=M.id+"."+N}}function D(T,Q){var N=T.settings.url,R=T.settings.chunk_size,U=T.settings.max_retries,O=T.features,S=0,L;if(Q.loaded){S=Q.loaded=R*Math.floor(Q.loaded/R)}function P(){if(U-->0){d(M,1000)}else{Q.loaded=S;T.trigger("Error",{code:c.HTTP_ERROR,message:c.translate("HTTP Error."),file:Q,response:v.responseText,status:v.status,responseHeaders:v.getAllResponseHeaders()})}}function M(){var X,W,V,Y;if(Q.status==c.DONE||Q.status==c.FAILED||T.state==c.STOPPED){return}V={name:Q.target_name||Q.name};if(R&&O.chunks&&L.size>R){Y=Math.min(R,L.size-S);X=L.slice(S,S+Y)}else{Y=L.size;X=L}if(R&&O.chunks){if(T.settings.send_chunk_number){V.chunk=Math.ceil(S/R);V.chunks=Math.ceil(L.size/R)}else{V.offset=S;V.total=L.size}}v=new h.XMLHttpRequest();if(v.upload){v.upload.onprogress=function(Z){Q.loaded=Math.min(Q.size,S+Z.loaded);T.trigger("UploadProgress",Q)}}v.onload=function(){if(v.status>=400){P();return}U=T.settings.max_retries;if(Y<L.size){X.destroy();S+=Y;Q.loaded=Math.min(S,L.size);T.trigger("ChunkUploaded",Q,{offset:Q.loaded,total:L.size,response:v.responseText,status:v.status,responseHeaders:v.getAllResponseHeaders()});if(h.Env.browser==="Android Browser"){T.trigger("UploadProgress",Q)}}else{Q.loaded=Q.size}X=W=null;if(!S||S>=L.size){if(Q.size!=Q.origSize){L.destroy();L=null}T.trigger("UploadProgress",Q);Q.status=c.DONE;T.trigger("FileUploaded",Q,{response:v.responseText,status:v.status,responseHeaders:v.getAllResponseHeaders()})}else{d(M,1)}};v.onerror=function(){P()};v.onloadend=function(){this.destroy();v=null};if(T.settings.multipart&&O.multipart){V.name=Q.target_name||Q.name;v.open("post",N,true);c.each(T.settings.headers,function(aa,Z){v.setRequestHeader(Z,aa)});W=new h.FormData();c.each(c.extend(V,T.settings.multipart_params),function(aa,Z){W.append(Z,aa)});W.append(T.settings.file_data_name,X);v.send(W,{runtime_order:T.settings.runtimes,required_caps:T.settings.required_features,preferred_caps:x,swf_url:T.settings.flash_swf_url,xap_url:T.settings.silverlight_xap_url})}else{N=c.buildUrl(T.settings.url,c.extend(V,T.settings.multipart_params));v.open("post",N,true);v.setRequestHeader("Content-Type","application/octet-stream");c.each(T.settings.headers,function(aa,Z){v.setRequestHeader(Z,aa)});v.send(X,{runtime_order:T.settings.runtimes,required_caps:T.settings.required_features,preferred_caps:x,swf_url:T.settings.flash_swf_url,xap_url:T.settings.silverlight_xap_url})}}L=Q.getSource();if(T.settings.resize.enabled&&E(L,"send_binary_string")&&!!~h.inArray(L.type,["image/jpeg","image/png"])){o.call(this,L,T.settings.resize,function(V){L=V;Q.size=V.size;M()})}else{M()}}function u(L,M){k(M)}function A(L){if(L.state==c.STARTED){C=(+new Date())}else{if(L.state==c.STOPPED){for(var M=L.files.length-1;M>=0;M--){if(L.files[M].status==c.UPLOADING){L.files[M].status=c.QUEUED;j()}}}}}function i(){if(v){v.abort()}}function s(L){j();d(function(){J.call(L)},1)}function r(L,M){if(M.file){M.file.status=c.FAILED;k(M.file);if(L.state==c.STARTED){L.trigger("CancelUpload");d(function(){J.call(L)},1)}}}function q(L){L.stop();c.each(p,function(M){M.destroy()});p=[];if(F.length){c.each(F,function(M){M.destroy()});F=[]}if(w.length){c.each(w,function(M){M.destroy()});w=[]}x={};n=false;C=v=null;K.reset()}G={runtimes:h.Runtime.order,max_retries:0,chunk_size:0,multipart:true,multi_selection:true,file_data_name:"file",flash_swf_url:"js/Moxie.swf",silverlight_xap_url:"js/Moxie.xap",filters:{mime_types:[],prevent_duplicates:false,max_file_size:0},resize:{enabled:false,preserve_headers:true,crop:false},send_chunk_number:true};m.call(this,l,null,true);K=new c.QueueProgress();c.extend(this,{id:t,uid:t,state:c.STOPPED,features:{},runtime:null,files:p,settings:G,total:K,init:function(){var L=this;if(typeof(G.preinit)=="function"){G.preinit(L)}else{c.each(G.preinit,function(N,M){L.bind(M,N)})}if(!G.browse_button||!G.url){this.trigger("Error",{code:c.INIT_ERROR,message:c.translate("Init error.")});return}y.call(this);z.call(this,G,function(M){if(typeof(G.init)=="function"){G.init(L)}else{c.each(G.init,function(O,N){L.bind(N,O)})}if(M){L.runtime=h.Runtime.getInfo(I()).type;L.trigger("Init",{runtime:L.runtime});L.trigger("PostInit")}else{L.trigger("Error",{code:c.INIT_ERROR,message:c.translate("Init error.")})}})},setOption:function(L,M){m.call(this,L,M,!this.runtime)},getOption:function(L){if(!L){return G}return G[L]},refresh:function(){if(F.length){c.each(F,function(L){L.trigger("Refresh")})}this.trigger("Refresh")},start:function(){if(this.state!=c.STARTED){this.state=c.STARTED;this.trigger("StateChanged");J.call(this)}},stop:function(){if(this.state!=c.STOPPED){this.state=c.STOPPED;this.trigger("StateChanged");this.trigger("CancelUpload")}},disableBrowse:function(){n=arguments[0]!==e?arguments[0]:true;if(F.length){c.each(F,function(L){L.disable(n)})}this.trigger("DisableBrowse",n)},getFile:function(M){var L;for(L=p.length-1;L>=0;L--){if(p[L].id===M){return p[L]}}},addFile:function(P,S){var M=this,L=[],R=[],N;function Q(V,U){var T=[];h.each(M.settings.filters,function(X,W){if(g[W]){T.push(function(Y){g[W].call(M,X,V,function(Z){Y(!Z)})})}});h.inSeries(T,U)}function O(T){var U=h.typeOf(T);if(T instanceof h.File){if(!T.ruid&&!T.isDetached()){if(!N){return false}T.ruid=N;T.connectRuntime(N)}O(new c.File(T))}else{if(T instanceof h.Blob){O(T.getSource());T.destroy()}else{if(T instanceof c.File){if(S){T.name=S}L.push(function(V){Q(T,function(W){if(!W){R.push(T);M.trigger("FileFiltered",T)}d(V,1)})})}else{if(h.inArray(U,["file","blob"])!==-1){O(new h.File(null,T))}else{if(U==="node"&&h.typeOf(T.files)==="filelist"){h.each(T.files,O)}else{if(U==="array"){S=null;h.each(T,O)}}}}}}}N=I();O(P);if(L.length){h.inSeries(L,function(){if(R.length){M.trigger("FilesAdded",R)}})}},removeFile:function(M){var N=typeof(M)==="string"?M:M.id;for(var L=p.length-1;L>=0;L--){if(p[L].id===N){return this.splice(L,1)[0]}}},splice:function(O,L){var M=p.splice(O===e?0:O,L===e?p.length:L);var N=false;if(this.state==c.STARTED){N=true;this.stop()}this.trigger("FilesRemoved",M);c.each(M,function(P){P.destroy()});this.trigger("QueueChanged");this.refresh();if(N){this.start()}return M},bind:function(M,O,N){var L=this;c.Uploader.prototype.bind.call(this,M,function(){var P=[].slice.call(arguments);P.splice(0,1,L);return O.apply(this,P)},0,N)},destroy:function(){this.trigger("Destroy");G=K=null;this.unbindAll()}})};c.Uploader.prototype=h.EventTarget.instance;c.File=(function(){var j={};function i(k){c.extend(this,{id:c.guid(),name:k.name||k.fileName,type:k.type||"",size:k.size||k.fileSize,origSize:k.size||k.fileSize,loaded:0,percent:0,status:c.QUEUED,lastModifiedDate:k.lastModifiedDate||(new Date()).toLocaleString(),getNative:function(){var l=this.getSource().getSource();return h.inArray(h.typeOf(l),["blob","file"])!==-1?l:null},getSource:function(){if(!j[this.id]){return null}return j[this.id]},destroy:function(){var l=this.getSource();if(l){l.destroy();delete j[this.id]}}});j[this.id]=k}return i}());c.QueueProgress=function(){var i=this;i.size=0;i.loaded=0;i.uploaded=0;i.failed=0;i.queued=0;i.percent=0;i.bytesPerSec=0;i.reset=function(){i.size=i.loaded=i.uploaded=i.failed=i.queued=i.percent=i.bytesPerSec=0}};f.plupload=c}(window,mOxie));