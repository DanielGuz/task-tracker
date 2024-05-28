import{d as E}from"./DataServiceApi-NXsU4w8H.js";import{n as U,l as k,d as $,_ as w,o as r,c as o,a as T,w as d,p as j,v as I,e as l,t as c,q as B,s as P,u as N,g as F,x as A,y as S,z as C,A as _,B as D,b as R,r as p,f as y,C as q,D as H,E as K}from"./index-C2nEU7Iq.js";import{T as Y}from"./Button-Bre3B7el.js";const L=U("dataTable",{state:()=>({columns:[],data:[],filters:{},pagination:{page:1,sortfield:"id",sortorder:"ASC"},params:{},recordsPerPage:10,selectedData:{},showFilters:!1,showLoader:!1,statusData:[{id:"2",name:"Activo"},{id:"1",name:"Inactivo"}],tabFilterLabels:{},totalRecords:0}),getters:{getFilters(t){const e={},a=Object.keys(t.filters);for(let i=0;i<a.length;i+=1)Array.isArray(t.filters[a[i]])&&t.filters[a[i]].length>0&&(e[a[i]]=t.filters[a[i]].join(",")),!Array.isArray(t.filters[a[i]])&&t.filters[a[i]]&&(e[a[i]]=t.filters[a[i]]);return e}},actions:{setData(t){this.data=t},setLoading(t){this.showLoader=t},setTotalRecords(t){this.totalRecords=t},setRecordsPerPage(t){this.recordsPerPage=t},setFilters(t){this.filters=t},setPaginationData(t){this.pagination=t},setShowFilters(t){this.showFilters=t},setColumnsTable(t){this.columns=t},setTabFiltersLabels(t){this.tabFilterLabels=t},fetchDataTable(t){const{url:e,filters:a,withParams:i}=t;this.setLoading(!0),i&&{...this.pagination,filtros:JSON.stringify({...this.getFilters,...a})};const n=[{id_usuario:1,id:1,title:"Tarea 1",description:"Actividad 1",nombre:"User",apellido:"1",usuario:"user",numdoc:123456,fecha_login:"01-01-2024",fecha_creacion:"01-01-2024",created_at:"01-01-2024",updated_at:"01-01-2024",status:"en progreso"},{id_usuario:2,id:2,title:"Tarea 2",description:"Actividad 2",nombre:"User",apellido:"2",usuario:"user",numdoc:789014,fecha_login:"01-01-2024",fecha_creacion:"01-01-2024",created_at:"01-01-2024",updated_at:"01-01-2024",status:"finalizada"}];this.setData(n),this.setTotalRecords(2),this.setRecordsPerPage(10),this.setLoading(!1)},updateColumnsTable(t){this.setColumnsTable(t)},updateFilters(t){this.setFilters(t)},updatePaginationData(t){this.setPaginationData(t)},toggleFilterDrawer(t){this.setShowFilters(t)},updateTabFiltersLabels(t){this.setTabFiltersLabels(t)}}}),Bt={setup(){return{dataTable:L()}},data(){return{actionbuttons:[],descriptionRowProperty:"",fetchPayload:{url:"",withParams:!1},idRowProperty:"id",isFetching:!1,routeBaseName:""}},computed:{data(){return this.dataTable.data},filters(){return this.dataTable.filters},columns(){return this.dataTable.columns},showLoader(){return this.dataTable.showLoader},pagination(){return this.dataTable.pagination},showFilters(){return this.dataTable.showFilters},totalRecords(){return this.dataTable.totalRecords},recordsPerPage(){return this.dataTable.recordsPerPage},tabFilterLabels(){return this.dataTable.tabFilterLabels},filterTabKeys(){return Object.keys(this.filters).filter(t=>Array.isArray(this.filters[t])&&this.filters[t].length||!Array.isArray(this.filters[t])&&this.filters[t])},filterCounter(){return this.filterTabKeys.length},onPageChangePayload(){return{...this.pagination,sortfield:this.idRowProperty}}},methods:{toggleFilters(t){this.dataTable.toggleFilterDrawer(t)},fetchData(t){this.dataTable.fetchDataTable(t)},updatePaginationData(t){this.dataTable.updatePaginationData(t)},updateColumnsTable(t){this.dataTable.updateColumnsTable(t)},clearDataFilters(){this.dataTable.updateFilters({}),this.dataTable.updateTabFiltersLabels({}),this.dataTable.fetchDataTable(this.fetchPayload)},deleteFilter(t){const e={...this.filters},a={...this.tabFilterLabels};delete e[t],delete a[t],this.dataTable.updateFilters(e),this.dataTable.updateTabFiltersLabels(a),this.dataTable.fetchDataTable(this.fetchPayload)},updateFiltersAndLabelTab({field:t,value:e},a){if(this.dataTable.updateFilters({...this.filters,[t]:e}),e)this.dataTable.updateTabFiltersLabels({...this.tabFilterLabels,[t]:a});else{const i={...this.tabFilterLabels};delete i[t],this.dataTable.updateTabFiltersLabels(i)}},onSort({field:t,order:e}){this.dataTable.updatePaginationData({...this.pagination,sortfield:t,sortorder:e}),this.dataTable.fetchDataTable(this.fetchPayload)},onRecordsPerPage(t){this.dataTable.updatePaginationData({...this.pagination,records_per_page:t}),this.dataTable.fetchDataTable(this.fetchPayload)},onPageChange(t){this.dataTable.updatePaginationData({...this.onPageChangePayload,page:t.page}),this.dataTable.fetchDataTable(this.fetchPayload)},goPreview(t){const e=t!=null&&t[this.idRowProperty]?{id:k.utf8ToBase64(t[this.idRowProperty])}:{};this.$router.push({name:`${this.routeBaseName}_view`,params:e}).catch(()=>console.warn("Router: Prevent default"))},goEdit(t){const e=t!=null&&t[this.idRowProperty]?{id:k.utf8ToBase64(t[this.idRowProperty])}:{id:"new"};this.$router.push({name:`${this.routeBaseName}_edit`,params:e}).catch(()=>console.warn("Router: Prevent default"))},deleteRow(t){const e=t!=null&&t[this.descriptionRowProperty]?`- ${t[this.descriptionRowProperty]}`:"";this.$swal({cancelButtonColor:"#a3a3a3",cancelButtonText:"Cancelar",confirmButtonColor:"#48c774",confirmButtonText:"Confirmar",icon:"warning",showCancelButton:!0,text:`Registro a eliminar ID ${t[this.idRowProperty]} ${e}`,title:"¿Estas seguro de eliminar el registro?",width:700}).then(a=>{if(a.isConfirmed){const i=this.$buefy.loading.open();E.delete(`${this.fetchPayload.url}/`,t[this.idRowProperty]).then(()=>{this.dataTable.fetchDataTable(this.fetchPayload)}).catch(n=>console.error(n)).finally(()=>i.close())}})}},beforeMount(){this.dataTable.updateFilters({}),this.dataTable.updateColumnsTable([]),this.dataTable.updatePaginationData({...this.pagination,page:1,sortfield:this.idRowProperty,sortorder:"desc"})}},J=$({name:"tt-ui-drawer",setup(){return{dataTable:L()}},props:{size:{type:String,default:()=>""},title:{type:String,default:()=>""},value:{type:Boolean,default:()=>!1}},methods:{initialization(){(document==null?void 0:document.getElementsByTagName("body")[0]).append(this.$el)}},mounted(){this.initialization()}}),G={class:"ttui-drawer"},Q={class:"ttui-drawer__header is-flex is-justify-content-space-between"},W={class:"title is-5 mb-0"},X={class:"close"},Z={class:"ttui-drawer__body"},x={class:"ttui-drawer__footer"},tt={class:"ttui-drawer__footer-left"},et={class:"ttui-drawer__footer-right"};function at(t,e,a,i,n,m){return r(),o("div",G,[T(N,{name:t.size==="small"?"right-fade-small-in-transition":"right-fade-in-transition"},{default:d(()=>[j(l("div",{class:P(["ttui-drawer__container",{"ttui-drawer__container--active":t.dataTable.showFilters,"ttui-drawer__container--small":t.size==="small"}])},[l("div",Q,[l("div",W,c(t.title),1),l("div",X,[l("button",{class:"delete",onClick:e[0]||(e[0]=u=>{t.dataTable.toggleFilterDrawer(!1)})})])]),l("div",Z,[B(t.$slots,"body")]),l("div",x,[l("div",tt,[B(t.$slots,"footer-left")]),l("div",et,[B(t.$slots,"footer-right")])])],2),[[I,t.dataTable.showFilters]])]),_:3},8,["name"]),T(N,{name:"fade-transition-4"},{default:d(()=>[t.dataTable.showFilters?(r(),o("div",{key:0,class:P(["ttui-drawer__backdrop"]),onClick:e[1]||(e[1]=u=>{t.dataTable.toggleFilterDrawer(!1)})})):F("",!0)]),_:1})])}const St=w(J,[["render",at]]),it=$({name:"tt-ui-divider",props:{pxHeight:{type:String,default:()=>"30px"},vertical:{type:Boolean,default:()=>!0}}});function st(t,e,a,i,n,m){return r(),o("div",{class:P(["ttui-common__divider",{"ttui-common__divider--vertical":t.vertical}]),style:A({height:t.pxHeight})},null,6)}const Ct=w(it,[["render",st]]),rt=$({name:"tt-ui-filters-tabs",props:{data:{type:Object,default:()=>({})},filters:{type:Object,default:()=>({})},tabNames:{type:Object,default:()=>({})}},computed:{keyNames(){return Object.keys(this.tabNames)},usedFilters(){const t=[];for(let e=0;e<this.keyNames.length;e+=1)(this.data[this.keyNames[e]]&&this.data[this.keyNames[e]].options&&this.isNotEmpty(this.filters[this.keyNames[e]])||!this.data[this.keyNames[e]]&&this.filters[this.keyNames[e]])&&this.isNotEmpty(this.filters[this.keyNames[e]])&&t.push(this.keyNames[e]);return t}},methods:{getValuesTab(t){if(this.data[t]){const a=this.data[t].options.filter(i=>Array.isArray(this.filters[t])?this.filters[t].includes(i[t]):i[t]?this.filters[t]===i[t]:this.filters[t]===i[this.data[t].idField]).map(i=>i[this.data[t].fieldName]).join(", ");return/^\d+$/.test(a)?parseInt(a):a}return S(this.filters[t],C.BACK_DEFAULT,!0).isValid()||S(this.filters[t],C.BACK_DATE_TIME,!0).isValid()?S(this.filters[t]).format(C.DEFAULT):this.filters[t]},isNotEmpty(t){return t!=null?typeof t=="string"&&t.trim()!==""?!0:Array.isArray(t)?t.length>0:!0:!1}}}),ot={class:"ttui-filter-tabs__container"},lt={class:"pt-1"},nt={style:{"text-transform":"capitalize"},class:"mr-1"},dt=["onClick"];function ut(t,e,a,i,n,m){return r(),o("div",ot,[(r(!0),o(_,null,D(t.usedFilters,(u,g)=>(r(),o("span",{key:g,class:"tag is-white is-medium mb-2 mr-2"},[l("span",lt,[l("strong",nt,c(t.tabNames[u])+": ",1),R(" "+c(t.getValuesTab(u)),1)]),l("button",{class:"delete",onClick:v=>t.$emit("delete",u)},null,8,dt)]))),128))])}const kt=w(rt,[["render",ut]]),ht=$({name:"tt-ui-selector",data(){return{dataModel:[]}},props:{scrollable:{type:Boolean,default:()=>!1},appendToBody:{type:Boolean,default:()=>!1},keyOpt:{type:String,required:!0},nameOpt:{type:String,required:!0},options:{type:Array,default:()=>[]},maxHeight:{type:Number,default:()=>200},disabled:{type:Boolean,default:()=>!1},multiple:{type:Boolean,default:()=>!1},visibleOptions:{type:Number,default:()=>3},value:{type:[Array,String,Number],default:()=>[]},position:{types:String,default:()=>"is-bottom-right"},placeholder:{type:String,default:()=>"Seleccione una opción"}},watch:{dataModel(t){this.$emit("input",t)},value(t){JSON.stringify(this.dataModel)!==JSON.stringify(t)&&(this.dataModel=t)}},computed:{valueByMultipleOption(){if(this.multiple){const e=this.options.filter(a=>this.dataModel.includes(a[this.keyOpt])).map(a=>a[this.nameOpt]);return this.dataModel.length>this.visibleOptions?`Seleccionados: ${this.dataModel.length}`:e.join(",")}const t=this.options.filter(e=>e[this.keyOpt]===this.dataModel);return t&&t.length?t[0][this.nameOpt]:this.placeholder}},mounted(){this.dataModel=this.value}});function pt(t,e,a,i,n,m){const u=p("b-input"),g=p("b-dropdown-item"),v=p("b-dropdown");return r(),y(v,{"aria-role":"list",modelValue:t.dataModel,"onUpdate:modelValue":e[0]||(e[0]=f=>t.dataModel=f),disabled:t.disabled,multiple:t.multiple,position:t.position,"max-height":t.maxHeight,scrollable:t.scrollable,"append-to-body":t.appendToBody,class:"ttui-selector is-block"},{trigger:d(()=>[T(u,{readonly:"","icon-right":"angle-down",class:P(["ttui-selector__input",{"ttui-selector__input--placeholder":t.valueByMultipleOption===t.placeholder}]),modelValue:t.valueByMultipleOption},null,8,["modelValue","class"])]),default:d(()=>[(r(!0),o(_,null,D(t.options,f=>(r(),y(g,{key:f[t.keyOpt],"aria-role":"listitem",modelValue:f[t.keyOpt]},{default:d(()=>[l("span",null,c(f[t.nameOpt]),1)]),_:2},1032,["modelValue"]))),128))]),_:1},8,["modelValue","disabled","multiple","position","max-height","scrollable","append-to-body"])}const ct=w(ht,[["render",pt]]),ft=$({name:"tt-ui-data-table",components:{TtUiSelector:ct,TtUiStatusBar:q,TtUiButton:Y},data(){return{page:1,records:15,resetTable:!1,dataTableAsync:[],stickyHeader:!1,sortIcon:"chevron-up",sortIconSize:"is-small",valuesPerPage:[...Array(20).keys()].map(t=>({value:(t+1)*5}))}},props:{titulo:{type:String,default:""},loading:{type:Boolean,required:!0},actions:{type:Boolean,required:!0},sortField:{type:String,required:!0},paginated:{type:Boolean,default:!0},totalRecords:{type:Number,required:!0},counter:{type:Boolean,default:()=>!0},actionbuttons:{type:Array,default:()=>[]},estilo:{type:String,default:"websafiTable"},defaultsortorder:{type:String,required:!0},recordsPerPage:{type:Number,default:()=>15},paginationSimple:{type:Boolean,default:!1},paginationRounded:{type:Boolean,default:!1},outputDateFormat:{type:String,default:"DD/MM/YYYY"},columns:{type:Array,required:!0,default:()=>[]},tableData:{type:Array,required:!0,default:()=>[]}},watch:{columns(){this.resetTable=!0,this.dataTableAsync=[],setTimeout(()=>{this.resetTable=!1},50)},tableData(t){this.dataTableAsync=t},recordsPerPage(t){this.records=t},records(t,e){t!==e&&this.$emit("changeRecordsPerPage",t)}},mixins:[H,K],methods:{formatNumber(t){return k.formatNumber(t)},onPageChange(t){this.$emit("pageChange",{page:t})},onSort(t,e){this.$emit("sort",{field:t,order:e})},getDateFormat(t,e){const{field:a,time:i}=e,n=i?`${t[a]} ${t[i]}`:t[a];return n!=null?this.formatDate(n,!!i):""},getDateDiff(t,e){const{lDateIni:a,lDateEnd:i,lTimeIni:n,lTimeEnd:m}=e,u=n?`${t[a]} ${t[n]}`:t[a],g=m?`${t[i]} ${t[m]}`:t[i];return this.diffBeetweenDates(u,g,"days")}}}),bt={style:{width:"100%"},class:"is-flex is-justify-content-center is-align-items-center"},mt={key:0,class:"mr-2"},gt={key:0},yt={key:1},Tt={key:2,style:{width:"150px",overflow:"hidden","text-overflow":"ellipsis"}},_t={class:"content has-text-grey has-text-centered"},Pt=l("p",null,"No se encontraron datos.",-1);function $t(t,e,a,i,n,m){const u=p("tt-ui-button"),g=p("b-dropdown-item"),v=p("b-dropdown"),f=p("b-table-column"),O=p("tt-ui-status-bar"),M=p("tt-ui-selector"),V=p("b-icon"),z=p("b-table");return r(),o("div",{class:P([t.estilo,"mb-5"])},[t.resetTable?F("",!0):(r(),y(z,{key:0,hoverable:"",loading:t.loading,data:t.dataTableAsync,"sticky-header":t.stickyHeader,onSort:t.onSort,onPageChange:t.onPageChange,"backend-pagination":"","per-page":t.records,total:t.totalRecords,paginated:t.paginated,"pagination-size":"small","pagination-order":"is-centered","pagination-simple":t.paginationSimple,"pagination-rounded":t.paginationRounded,"aria-page-label":"Page","aria-current-label":"Pagina Actual","aria-next-label":"Pagina Siguiente","aria-previous-label":"Pagina Previa","backend-sorting":"","sort-icon":t.sortIcon,"sort-icon-size":t.sortIconSize,"default-sort-direction":t.defaultsortorder,"default-sort":[t.sortField,t.defaultsortorder]},{"bottom-left":d(()=>[T(M,{scrollable:"",placeholder:"#","key-opt":"value","name-opt":"value",modelValue:t.records,"onUpdate:modelValue":e[0]||(e[0]=s=>t.records=s),"max-height":150,style:{width:"80px"},"visible-options":1,position:"is-top-right",options:t.valuesPerPage},null,8,["modelValue","options"])]),empty:d(()=>[l("div",_t,[T(V,{icon:"info-circle",size:"is-large"}),Pt])]),default:d(()=>[t.actions?(r(),y(f,{key:0,width:"80",label:"Acciones"},{default:d(s=>[l("div",bt,[t.counter?(r(),o("div",mt,c(s.index+1),1)):F("",!0),T(v,{"aria-role":"list",position:"is-bottom-right"},{trigger:d(()=>[T(u,{icon:"ellipsis-v"})]),default:d(()=>[(r(!0),o(_,null,D(t.actionbuttons,(b,h)=>(r(),y(g,{key:h,scrollable:"",separator:b.separator,"append-to-body":"","aria-role":"listitem",onClick:wt=>t.$emit(b.event,s.row),disabled:typeof b.disabled=="boolean"?b.disabled:b.disabled(s.row)},{default:d(()=>[R(c(b.label),1)]),_:2},1032,["separator","onClick","disabled"]))),128))]),_:2},1024)])]),_:1})):F("",!0),(r(!0),o(_,null,D(t.columns,(s,b)=>(r(),y(f,{key:b,field:s.field,label:s.label,width:s.width,visible:s.visible,numeric:s.numeric,sortable:s.sortable,centered:s.centered},{default:d(h=>[s.statusField?(r(),y(O,{key:0,label:h.row[s.descriptionField]?h.row[s.descriptionField]:h.row[s.field],status:h.row[s.colorField?s.colorField:"color_label"]},null,8,["label","status"])):(r(),o(_,{key:1},[s.date?(r(),o("div",gt,c(t.getDateFormat(h.row,s)),1)):s.diffDate?(r(),o("div",yt,c(t.getDateDiff(h.row,s)),1)):s.limit?(r(),o("div",Tt,c(h.row[s.field]),1)):s.numberField?(r(),o("div",{key:3,style:A({width:`${s.width}px`})},c(t.formatNumber(h.row[s.field])),5)):(r(),o("div",{key:4,style:A({width:`${s.width}px`})},c(h.row[s.field]),5))],64))]),_:2},1032,["field","label","width","visible","numeric","sortable","centered"]))),128))]),_:1},8,["loading","data","sticky-header","onSort","onPageChange","per-page","total","paginated","pagination-simple","pagination-rounded","sort-icon","sort-icon-size","default-sort-direction","default-sort"]))],2)}const At=w(ft,[["render",$t]]);export{At as T,kt as a,Ct as b,St as c,Bt as l,L as u};