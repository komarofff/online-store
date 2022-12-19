(function(){"use strict";var t={768:function(t,e,r){var a=r(963),i=r(252);function n(t,e,r,a,n,o){const s=(0,i.up)("HeaderView"),c=(0,i.up)("router-view"),l=(0,i.up)("FooterView"),u=(0,i.up)("CheckoutModalView");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(s),(0,i._)("main",null,[(0,i.Wm)(c)]),(0,i.Wm)(l),n.isShowCheckoutModal?((0,i.wg)(),(0,i.j4)(u,{key:0})):(0,i.kq)("",!0)],64)}const o={class:"header"},s={class:"container header__nav"};function c(t,e,r,a,n,c){const l=(0,i.up)("NavLinks"),u=(0,i.up)("SearchBlock"),h=(0,i.up)("CartPlaceView");return(0,i.wg)(),(0,i.iD)("header",o,[(0,i._)("div",s,[(0,i.Wm)(l),(0,i.Wm)(u),(0,i.Wm)(h)])])}var l=r(577);function u(t,e,r,a,n,o){return(0,i.wg)(),(0,i.iD)("strong",null,"Items in cart - "+(0,l.zw)(n.cartAmount),1)}var h=r(907),g={name:"CartPlaceView",data(){return{cartAmount:0,idInCart:[]}},computed:{...(0,h.Se)("Cart",["getCartLength"])},mounted(){this.cartAmount=this.getCartLength,this.emitter.on("addToCart",(()=>{this.cartAmount=this.getCartLength})),this.emitter.on("delFromCart",(()=>{this.cartAmount=this.getCartLength}))}},d=r(744);const p=(0,d.Z)(g,[["render",u]]);var A=p;function m(t,e,r,a,n,o){const s=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("nav",null,[(0,i.Wm)(s,{to:{name:"home"}},{default:(0,i.w5)((()=>[(0,i.Uk)("Home")])),_:1}),(0,i.Uk)(" | "),(0,i.Wm)(s,{to:{name:"categories"}},{default:(0,i.w5)((()=>[(0,i.Uk)("Categories")])),_:1}),(0,i.Uk)(" | "),(0,i.Wm)(s,{to:{name:"cart"}},{default:(0,i.w5)((()=>[(0,i.Uk)("Cart")])),_:1}),(0,i.Uk)(" | "),(0,i.Wm)(s,{to:{name:"checkout"}},{default:(0,i.w5)((()=>[(0,i.Uk)("Checkout")])),_:1}),(0,i.Uk)(" | "),(0,i.Wm)(s,{to:{name:"error"}},{default:(0,i.w5)((()=>[(0,i.Uk)(" 404 ")])),_:1}),(0,i.Uk)(" | ")])}var C={name:"NavLinks"};const k=(0,d.Z)(C,[["render",m],["__scopeId","data-v-301eeb9d"]]);var w=k;function y(t,e,r,n,o,s){return(0,i.wy)(((0,i.wg)(),(0,i.iD)("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>o.search=t),placeholder:"search",onChange:e[1]||(e[1]=t=>s.goToSearchPage(o.search))},null,544)),[[a.nr,o.search]])}var f={name:"SearchBlock",data(){return{search:""}},methods:{goToSearchPage(t){return this.search="",this.$router.push({name:"search",query:{search:t}})}}};const v=(0,d.Z)(f,[["render",y]]);var F=v,S={name:"HeaderView",components:{CartPlaceView:A,NavLinks:w,SearchBlock:F}};const M=(0,d.Z)(S,[["render",c],["__scopeId","data-v-3a316170"]]);var D=M;const _=t=>((0,i.dD)("data-v-3ca0027c"),t=t(),(0,i.Cn)(),t),P={class:"footer"},B=_((()=>(0,i._)("div",{class:"container footer__box"},[(0,i._)("div",null,"Link to github"),(0,i._)("div",null,"2022"),(0,i._)("div",null,"link to rsschool")],-1))),b=[B];function q(t,e,r,a,n,o){return(0,i.wg)(),(0,i.iD)("footer",P,b)}var I={name:"FooterView"};const x=(0,d.Z)(I,[["render",q],["__scopeId","data-v-3ca0027c"]]);var Q=x;function E(t,e,r,a,n,o){return(0,i.wg)(),(0,i.iD)("h1",null,"Im CheckoutModalView")}var L={name:"CheckoutModalView"};const U=(0,d.Z)(L,[["render",E]]);var H=U,J={data(){return{isShowCheckoutModal:!1}},async beforeMount(){await this.getFromStorage()},methods:{...(0,h.nv)("Cart",["getFromStorage"])},components:{HeaderView:D,FooterView:Q,CheckoutModalView:H}};const T=(0,d.Z)(J,[["render",n]]);var V=T,R=r(391),O=r(201);const Z={class:"home container"};function K(t,e,r,a,n,o){const s=(0,i.up)("FilterView"),c=(0,i.up)("CenterSection");return(0,i.wg)(),(0,i.iD)("div",Z,[(0,i.Wm)(s),(0,i.Wm)(c)])}const Y=t=>((0,i.dD)("data-v-b3a0da28"),t=t(),(0,i.Cn)(),t),W={class:"filter"},G=Y((()=>(0,i._)("h1",null,"I`m a filter section",-1))),j={key:0},z=Y((()=>(0,i._)("hr",null,null,-1))),N=Y((()=>(0,i._)("h2",null,"Categories",-1))),X=["onChange"],$=Y((()=>(0,i._)("hr",null,null,-1))),tt=Y((()=>(0,i._)("h2",null,"Brands",-1))),et=["onChange"],rt=Y((()=>(0,i._)("hr",null,null,-1))),at=Y((()=>(0,i._)("h2",null,"Price",-1))),it=Y((()=>(0,i._)("hr",null,null,-1))),nt=Y((()=>(0,i._)("h2",null,"Stock",-1)));function ot(t,e,r,n,o,s){return(0,i.wg)(),(0,i.iD)("aside",W,[(0,i._)("div",null,[G,(0,i._)("p",null,[o.successCopyLink?((0,i.wg)(),(0,i.iD)("button",j,"Link was copied successfully")):((0,i.wg)(),(0,i.iD)("button",{key:1,onClick:e[0]||(e[0]=t=>s.copyLink())},"Copy link"))]),(0,i._)("p",null,[(0,i._)("button",{onClick:e[1]||(e[1]=t=>s.clearFilters())},"Clear filters")]),(0,i.Uk)(" search text - "+(0,l.zw)(o.search)+" ",1),z,(0,i.Uk)(" queryCat- "+(0,l.zw)(o.queryCat)+" ",1),(0,i._)("div",null,[N,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.categories,(t=>((0,i.wg)(),(0,i.iD)("p",{key:t},[(0,i._)("label",null,[(0,i._)("input",{type:"checkbox",onChange:e=>s.changeCat(t)},null,40,X),(0,i.Uk)((0,l.zw)(t),1)])])))),128))]),$,(0,i._)("div",null,[tt,(0,i.Uk)(" queryBrand - "+(0,l.zw)(o.queryBrand)+" ",1),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.brands,(t=>((0,i.wg)(),(0,i.iD)("p",{key:t},[(0,i._)("label",null,[(0,i._)("input",{type:"checkbox",onChange:e=>s.changeBrand(t)},null,40,et),(0,i.Uk)((0,l.zw)(t),1)])])))),128))]),rt,(0,i._)("div",null,[at,(0,i.Uk)(" min- "),(0,i.wy)((0,i._)("input",{type:"number","onUpdate:modelValue":e[2]||(e[2]=t=>o.priceMin=t),onInput:e[3]||(e[3]=t=>s.changePriceMin())},null,544),[[a.nr,o.priceMin]]),(0,i.Uk)("| max- "),(0,i.wy)((0,i._)("input",{type:"number","onUpdate:modelValue":e[4]||(e[4]=t=>o.priceMax=t),onInput:e[5]||(e[5]=t=>s.changePriceMax())},null,544),[[a.nr,o.priceMax]])]),it,(0,i._)("div",null,[nt,(0,i.Uk)(" min- "),(0,i.wy)((0,i._)("input",{type:"number","onUpdate:modelValue":e[6]||(e[6]=t=>o.stockMin=t),onInput:e[7]||(e[7]=t=>s.changeStockMin())},null,544),[[a.nr,o.stockMin]]),(0,i.Uk)("| max- "),(0,i.wy)((0,i._)("input",{type:"number","onUpdate:modelValue":e[8]||(e[8]=t=>o.stockMax=t),onInput:e[9]||(e[9]=t=>s.changeStockMax())},null,544),[[a.nr,o.stockMax]])])])])}var st={name:"FilterView",data(){return{data:[],search:"",queryCat:[],queryBrand:[],queryPrice:[],queryStock:[],querySearch:this.search,url:window.location.href,successCopyLink:!1,big:!0,priceMax:0,priceMin:0,stockMin:0,stockMax:0}},async mounted(){await this.getAllCat(),await this.getAllProd(),this.data=this.getAllProducts.products,this.priceMax=Math.max(...this.data.map((t=>t.price))),this.priceMin=Math.min(...this.data.map((t=>t.price))),this.stockMin=Math.min(...this.data.map((t=>t.stock))),this.stockMax=Math.min(...this.data.map((t=>t.stock))),this.emitter.on("newMinMaxPrice",(t=>{this.priceMin=t[0],this.priceMax=t[1]})),this.emitter.on("newMinMaxStock",(t=>{this.stockMin=t[0],this.stockMax=t[1]})),this.emitter.on("searchText",(t=>{this.search=t})),this.query&&(this.queryCat=this.$route.query.category.join("↕"),this.queryBrand=this.$route.query.brand.join("↕"),this.queryPrice=this.$route.query.price.join("↕"),this.queryStock=this.$route.query.stock.join("↕"))},watch:{$route(){},url(){return window.location.href},search(){this.pushToRouter()}},computed:{...(0,h.Se)("Categories",["getAllCategories"]),...(0,h.Se)("Products",["getAllProducts"]),categories(){return this.data?this.getAllCategories:""},brands(){if(this.data){let t=[];return this.data.forEach((e=>{t.includes(e.brand)||t.push(e.brand)})),t}return""}},methods:{...(0,h.nv)("Categories",["getAllCat"]),...(0,h.nv)("Products",["getAllProd"]),pushToRouter(){this.$router.push({query:{category:this.queryCat.join("↕"),brand:this.queryBrand.join("↕"),price:this.queryPrice.join("↕"),stock:this.queryStock.join("↕"),search:this.search,big:!1}})},copyLink(){navigator.clipboard.writeText(window.location.href).then((()=>{this.successCopyLink=!0,setTimeout((()=>{this.successCopyLink=!1}),2e3)}))},clearFilters(){this.data=this.getAllProducts.products,this.priceMax=Math.max(...this.data.map((t=>t.price))),this.priceMin=Math.min(...this.data.map((t=>t.price))),this.stockMin=Math.min(...this.data.map((t=>t.stock))),this.stockMax=Math.min(...this.data.map((t=>t.stock))),this.search="",this.queryCat=[],this.queryBrand=[],this.queryPrice=[],this.queryStock=[],this.querySearch=this.search,this.emitter.emit("changeCat",this.queryCat),this.emitter.emit("changeBrand",this.queryBrand),this.emitter.emit("changePrice",[this.priceMin,this.priceMax]),this.emitter.emit("changeStock",[this.stockMin,this.stockMax]),this.emitter.emit("changeCat",this.queryCat),this.emitter.emit("changeBrand",this.queryBrand),this.$router.push({query:{}}),console.log("clear all filters")},changeCards(){this.pushToRouter()},sortPriceAsc(){this.pushToRouter()},sortPriceDESC(){this.pushToRouter()},sortRatingAsc(){this.pushToRouter()},sortRatingDESC(){this.pushToRouter()},sortDiscountAsc(){this.pushToRouter()},sortDiscountDESC(){this.pushToRouter()},changePriceMax(){this.queryPrice=[this.priceMin,this.priceMax],this.emitter.emit("changePrice",[this.priceMin,this.priceMax]),this.pushToRouter()},changePriceMin(){this.queryPrice=[this.priceMin,this.priceMax],this.emitter.emit("changePrice",[this.priceMin,this.priceMax]),this.pushToRouter()},changeStockMax(){this.queryStock=[this.stockMin,this.stockMax],this.emitter.emit("changeStock",[this.stockMin,this.stockMax]),this.pushToRouter()},changeStockMin(){this.queryStock=[this.stockMin,this.stockMax],this.emitter.emit("changeStock",[this.stockMin,this.stockMax]),this.pushToRouter()},changeCat(t){this.queryCat.includes(t)?this.queryCat.splice(this.queryCat.indexOf(t),1):this.queryCat.push(t),this.emitter.emit("changeCat",this.queryCat),this.pushToRouter()},changeBrand(t){this.queryBrand.includes(t)?this.queryBrand.splice(this.queryBrand.indexOf(t),1):this.queryBrand.push(t),this.emitter.emit("changeBrand",this.queryBrand),this.pushToRouter()}}};const ct=(0,d.Z)(st,[["render",ot],["__scopeId","data-v-b3a0da28"]]);var lt=ct,ut="data:image/gif;base64,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";const ht=t=>((0,i.dD)("data-v-6f342aac"),t=t(),(0,i.Cn)(),t),gt={class:"center"},dt=ht((()=>(0,i._)("h1",null,"Products list",-1))),pt={key:0,src:ut,alt:"loader"},At={class:"center-section"};function mt(t,e,r,n,o,s){return(0,i.wg)(),(0,i.iD)("div",gt,[dt,o.isLoader?((0,i.wg)(),(0,i.iD)("img",pt)):(0,i.kq)("",!0),(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>o.searchText=t)},null,512),[[a.nr,o.searchText]]),(0,i._)("div",At,(0,l.zw)(o.data),1)])}var Ct={data(){return{isLoader:!1,searchText:null,fullData:[],data:[],isHaveChangesForCategories:!1,dataForCategoriesFilter:null,isHaveChangesForBrands:!1,dataForBrandsFilter:null,isHaveChangesForPrice:!1,dataForPriceFilter:[],isHaveChangesStock:!1,dataForStockFilter:[]}},async mounted(){this.isLoader=!0,await this.getAllProd(),this.isLoader=!1,this.fullData=this.getAllProducts.products,this.data=this.fullData,this.dataForPriceFilter[0]=this.getMinPrice(this.data),this.dataForPriceFilter[1]=this.getMaxPrice(this.data),this.dataForStockFilter[0]=this.getMinStock(this.data),this.dataForStockFilter[1]=this.getMaxStock(this.data),this.emitter.on("changeCat",(t=>{console.log("change category"),t.length?(this.isHaveChangesForCategories=!0,this.dataForCategoriesFilter=t,this.getFiltersData()):(this.isHaveChangesForCategories=!1,this.getFiltersData())})),this.emitter.on("changeBrand",(t=>{console.log("change brand"),t.length?(this.isHaveChangesForBrands=!0,this.dataForBrandsFilter=t,this.getFiltersData()):(this.isHaveChangesForBrands=!1,this.getFiltersData())})),this.emitter.on("changePrice",((t,e)=>{console.log("changePrice"),this.dataForPriceFilter[0]=t,this.dataForPriceFilter[1]=e,this.getFiltersData()})),this.emitter.on("changeStock",((t,e)=>{console.log("changeStock"),this.dataForStockFilter[0]=t,this.dataForStockFilter[1]=e,this.getFiltersData()}))},watch:{searchText(){this.emitSearch()}},computed:{...(0,h.Se)("Products",["getAllProducts"])},methods:{...(0,h.nv)("Products",["getAllProd"]),emitSearch(){this.emitter.emit("searchText",this.searchText)},startEmitPriceStock(t){let e=this.getMaxPrice(t),r=this.getMinPrice(t),a=this.getMaxStock(t),i=this.getMinStock(t);this.dataForPriceFilter[0]=r,this.dataForPriceFilter[1]=e,this.dataForStockFilter[0]=i,this.dataForStockFilter[1]=a,this.emitter.emit("newMinMaxPrice",[r,e]),this.emitter.emit("newMinMaxStock",[i,a])},getMaxPrice(t){return t.length?Math.max(...t.map((t=>t.price))):0},getMinPrice(t){return t.length?Math.min(...t.map((t=>t.price))):0},getMaxStock(t){return t.length?Math.max(...t.map((t=>t.stock))):0},getMinStock(t){return t.length?Math.min(...t.map((t=>t.stock))):0},getFiltersData(){this.isHaveChangesForBrands||this.isHaveChangesForCategories||(console.log("1-",this.dataForPriceFilter[0]),console.log("2-",this.dataForStockFilter[0]),this.data=this.fullData),!this.isHaveChangesForBrands&&this.isHaveChangesForCategories&&(this.data=this.fullData.filter((t=>{for(let e=0;e<this.dataForCategoriesFilter.length;e++)if(t.category.toUpperCase()===this.dataForCategoriesFilter[e].toUpperCase())return t})),this.startEmitPriceStock(this.data)),this.isHaveChangesForBrands&&!this.isHaveChangesForCategories&&(this.data=this.fullData.filter((t=>{for(let e=0;e<this.dataForBrandsFilter.length;e++)if(t.brand.toUpperCase()===this.dataForBrandsFilter[e].toUpperCase())return t})),this.startEmitPriceStock(this.data)),this.isHaveChangesForBrands&&this.isHaveChangesForCategories&&(this.data=this.fullData.filter((t=>{for(let e=0;e<this.dataForCategoriesFilter.length;e++)for(let r=0;r<this.dataForBrandsFilter.length;r++)if(t.category.toUpperCase()===this.dataForCategoriesFilter[e].toUpperCase()&&t.brand.toUpperCase()===this.dataForBrandsFilter[r].toUpperCase())return t})),this.startEmitPriceStock(this.data))}},components:{}};const kt=(0,d.Z)(Ct,[["render",mt],["__scopeId","data-v-6f342aac"]]);var wt=kt,yt={data(){return{isLoader:!1}},computed:{},methods:{},components:{FilterView:lt,CenterSection:wt}};const ft=(0,d.Z)(yt,[["render",K],["__scopeId","data-v-2944188b"]]);var vt=ft;function Ft(t,e,r,a,n,o){const s=(0,i.up)("SingleProduct");return(0,i.wg)(),(0,i.j4)(s,{id:r.id},null,8,["id"])}const St={class:"container"},Mt=(0,i._)("h1",null,"Product page",-1),Dt={key:0,src:ut,alt:"loader"},_t={class:"product__card"},Pt=(0,i._)("hr",null,null,-1),Bt=(0,i._)("hr",null,null,-1),bt=(0,i._)("hr",null,null,-1),qt=(0,i._)("hr",null,null,-1),It=(0,i._)("hr",null,null,-1),xt=(0,i._)("hr",null,null,-1),Qt=(0,i._)("hr",null,null,-1),Et=(0,i._)("hr",null,null,-1),Lt=["src","alt"],Ut=(0,i._)("hr",null,null,-1),Ht=["src","alt"];function Jt(t,e,r,a,n,o){return(0,i.wg)(),(0,i.iD)("section",St,[Mt,n.isLoader?((0,i.wg)(),(0,i.iD)("img",Dt)):(0,i.kq)("",!0),(0,i._)("div",_t,[(0,i._)("h1",null,"title- "+(0,l.zw)(n.productData.title),1),(0,i._)("p",null,"id- "+(0,l.zw)(n.productData.id),1),Pt,(0,i._)("p",null,"title- "+(0,l.zw)(n.productData.title),1),Bt,(0,i._)("p",null,"description- "+(0,l.zw)(n.productData.description),1),bt,(0,i._)("p",null,"price- "+(0,l.zw)(n.productData.price),1),qt,(0,i._)("p",null,"rating- "+(0,l.zw)(n.productData.rating),1),It,(0,i._)("p",null,"stock- "+(0,l.zw)(n.productData.stock),1),xt,(0,i._)("p",null,"brand- "+(0,l.zw)(n.productData.brand),1),Qt,(0,i._)("p",null,"category- "+(0,l.zw)(n.productData.category),1),Et,(0,i._)("p",null,[(0,i.Uk)(" thumbnail - "),(0,i._)("img",{class:"thumbnail",src:n.productData.thumbnail,alt:n.productData.title},null,8,Lt)]),Ut,(0,i._)("p",null,[(0,i.Uk)(" Images - "),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(n.productData.images,(t=>((0,i.wg)(),(0,i.iD)("img",{key:t,class:"thumbnail",src:t,alt:n.productData.title},null,8,Ht)))),128))])])])}var Tt={props:["id"],data(){return{isLoader:!1,productData:[]}},async beforeMount(){this.isLoader=!0,await this.getSingleProd(this.id),this.productData=this.getSingleProduct,this.isLoader=!1},mounted(){this.productData=this.getSingleProduct},watch:{},computed:{...(0,h.rn)("Products",["products"]),...(0,h.Se)("Products",["getSingleProduct","getProdThroughId"])},methods:{...(0,h.nv)("Products",["getSingleProd"])}};const Vt=(0,d.Z)(Tt,[["render",Jt]]);var Rt=Vt,Ot={name:"ProductPage",props:["id"],components:{SingleProduct:Rt}};const Zt=(0,d.Z)(Ot,[["render",Ft]]);var Kt=Zt;const Yt={class:"container"},Wt=(0,i._)("h1",null,"This is an 404 page",-1),Gt=[Wt];function jt(t,e,r,a,n,o){return(0,i.wg)(),(0,i.iD)("section",Yt,Gt)}var zt={name:"ErrorPage"};const Nt=(0,d.Z)(zt,[["render",jt]]);var Xt=Nt;const $t=(0,i._)("h1",null,"This is a cart page",-1);function te(t,e,r,a,n,o){const s=(0,i.up)("ItemsInCart");return(0,i.wg)(),(0,i.iD)(i.HY,null,[$t,(0,i.Wm)(s)],64)}function ee(t,e,r,a,i,n){return(0,l.zw)(i.itemsInCart)}var re={name:"CartPage",data(){return{itemsInCart:[]}},mounted(){this.itemsInCart=this.getCartArray},computed:{...(0,h.Se)("Cart",["getCartArray"])}};const ae=(0,d.Z)(re,[["render",ee]]);var ie=ae,ne={name:"CartPage",components:{ItemsInCart:ie}};const oe=(0,d.Z)(ne,[["render",te]]);var se=oe;const ce={class:"container"},le=(0,i._)("h1",null,"This is a checkout page (Modal window)",-1),ue=[le];function he(t,e,r,a,n,o){return(0,i.wg)(),(0,i.iD)("section",ce,ue)}var ge={name:"CheckoutPage"};const de=(0,d.Z)(ge,[["render",he]]);var pe=de;const Ae={class:"container"};function me(t,e,r,a,n,o){const s=(0,i.up)("ListOfCategories"),c=(0,i.up)("SingleCategory");return(0,i.wg)(),(0,i.iD)("section",Ae,[r.id?(0,i.kq)("",!0):((0,i.wg)(),(0,i.j4)(s,{key:0})),r.id?((0,i.wg)(),(0,i.j4)(c,{key:1,id:r.id},null,8,["id"])):(0,i.kq)("",!0)])}const Ce=(0,i._)("h1",null,"Categories list",-1),ke={key:0,src:ut,alt:"loader"};function we(t,e,r,a,n,o){const s=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)("div",null,[Ce,n.isLoader?((0,i.wg)(),(0,i.iD)("img",ke)):(0,i.kq)("",!0),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(n.catData,(t=>((0,i.wg)(),(0,i.j4)(s,{key:t,to:`/categories/${t}`},{default:(0,i.w5)((()=>[(0,i._)("button",null,(0,l.zw)(t.toUpperCase()),1)])),_:2},1032,["to"])))),128))])}var ye={data(){return{isLoader:!1,catData:this.categories}},async mounted(){this.isLoader=!0,await this.getAllCat(),this.catData=this.getAllCategories,this.isLoader=!1},watch:{},computed:{...(0,h.rn)("Categories",["categories"]),...(0,h.Se)("Categories",["getAllCategories","getCatLength"])},methods:{...(0,h.nv)("Categories",["getAllCat"])}};const fe=(0,d.Z)(ye,[["render",we]]);var ve=fe;const Fe=t=>((0,i.dD)("data-v-df9ec44c"),t=t(),(0,i.Cn)(),t),Se={key:0,src:ut,alt:"loader"},Me={class:"product__list"},De=Fe((()=>(0,i._)("hr",null,null,-1))),_e=Fe((()=>(0,i._)("hr",null,null,-1))),Pe=Fe((()=>(0,i._)("hr",null,null,-1))),Be=Fe((()=>(0,i._)("hr",null,null,-1))),be=Fe((()=>(0,i._)("hr",null,null,-1))),qe=Fe((()=>(0,i._)("hr",null,null,-1))),Ie=Fe((()=>(0,i._)("hr",null,null,-1))),xe=Fe((()=>(0,i._)("hr",null,null,-1))),Qe=["src","alt"],Ee=Fe((()=>(0,i._)("hr",null,null,-1))),Le=["src","alt"],Ue=Fe((()=>(0,i._)("hr",null,null,-1))),He=["onClick"],Je=["onClick"];function Te(t,e,r,a,n,o){const s=(0,i.up)("router-link");return(0,i.wg)(),(0,i.iD)(i.HY,null,[n.isLoader?((0,i.wg)(),(0,i.iD)("img",Se)):(0,i.kq)("",!0),(0,i._)("h1",null,"Category "+(0,l.zw)(r.id),1),(0,i._)("div",Me,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(n.catProducts.products,(t=>((0,i.wg)(),(0,i.iD)("div",{key:t.id,class:"product__card"},[(0,i._)("p",null,"id- "+(0,l.zw)(t.id),1),De,(0,i._)("p",null,"title- "+(0,l.zw)(t.title),1),_e,(0,i._)("p",null,"description- "+(0,l.zw)(t.description),1),Pe,(0,i._)("p",null,"price- "+(0,l.zw)(t.price),1),Be,(0,i._)("p",null,"rating- "+(0,l.zw)(t.rating),1),be,(0,i._)("p",null,"stock- "+(0,l.zw)(t.stock),1),qe,(0,i._)("p",null,"brand- "+(0,l.zw)(t.brand),1),Ie,(0,i._)("p",null,"category- "+(0,l.zw)(t.category),1),xe,(0,i._)("p",null,[(0,i.Uk)(" thumbnail - "),(0,i._)("img",{class:"thumbnail",src:t.thumbnail,alt:t.title},null,8,Qe)]),Ee,(0,i._)("p",null,[(0,i.Uk)(" Images - "),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.images,(e=>((0,i.wg)(),(0,i.iD)("img",{key:e,class:"thumbnail",src:e,alt:t.title},null,8,Le)))),128))]),Ue,(0,i._)("p",null,[o.isActive(t.id)?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("button",{key:0,onClick:e=>o.addToCart(t)}," Add to cart ",8,He)),o.isActive(t.id)?((0,i.wg)(),(0,i.iD)("button",{key:1,class:"delete__button",onClick:e=>o.delCart(t.id),ref_for:!0,ref:`id-${t.id}`}," Delete from cart ",8,Je)):(0,i.kq)("",!0)]),(0,i._)("p",null,[(0,i.Wm)(s,{to:`/product/${t.id}`},{default:(0,i.w5)((()=>[(0,i.Uk)("Details")])),_:2},1032,["to"])])])))),128))])],64)}var Ve={props:["id"],data(){return{cart:[],isLoader:!1,catProducts:[]}},async mounted(){if(this.isLoader=!0,this.id){if(await this.getSingleCat(this.id),this.catProducts=this.getSingleCategory,0===this.catProducts.products.length)return this.catProducts=[],this.$router.push({name:"error"})}else this.catProducts=[];this.isLoader=!1,this.cart=this.getCartArray},computed:{...(0,h.Se)("Categories",["getSingleCategory"]),...(0,h.Se)("Cart",["getCartArray"])},methods:{...(0,h.nv)("Categories",["getSingleCat"]),...(0,h.nv)("Cart",["pushToCart","delFromCart"]),isActive(t){return this.getCartArray.find((e=>e.id===t))},async addToCart(t){t.quantity=1,await this.pushToCart(t),this.cart=this.getCartArray,this.emitter.emit("addToCart")},async delCart(t){await this.delFromCart(t),this.cart=this.getCartArray,this.emitter.emit("delFromCart")}}};const Re=(0,d.Z)(Ve,[["render",Te],["__scopeId","data-v-df9ec44c"]]);var Oe=Re,Ze={name:"CategoriesPage",props:["id"],components:{ListOfCategories:ve,SingleCategory:Oe}};const Ke=(0,d.Z)(Ze,[["render",me],["__scopeId","data-v-42cb82ba"]]);var Ye=Ke;function We(t,e,r,a,n,o){return(0,i.wg)(),(0,i.iD)("h1",null,"This is a search page - query is a "+(0,l.zw)(n.query),1)}var Ge={name:"SearchPage",data(){return{query:this.$route.query.search}},watch:{$route(){this.query!==this.$route.query.search&&this.goToSearchPage()}},methods:{goToSearchPage(){this.$router.go(0)}}};const je=(0,d.Z)(Ge,[["render",We]]);var ze=je,Ne=[{path:"/",name:"home",component:vt},{path:"/cart",name:"cart",component:se,props:!0},{path:"/checkout",name:"checkout",component:pe,props:!0},{path:"/categories/:id?",name:"categories",component:Ye,props:!0},{path:"/product/:id",component:Kt,props:!0},{path:"/search",name:"search",component:ze,props:!0},{path:"/:pathMatch(.*)*",name:"error",component:Xt}],Xe=(0,O.p7)({history:(0,O.PO)(),routes:Ne}),$e=Xe,tr=r(655),er=r(594),rr={products:[],singleProduct:{}},ar={getAllProducts:function(t){return t.products},getSingleProduct:function(t){return t.singleProduct},getProdThroughId:function(t,e){return t.products[e]}},ir={getAll:function(t,e){t.products=e},getSingle:function(t,e){t.singleProduct=e},getSingleId:function(t,e){t.singleProduct=t.products[e],console.log("getSingleId",t.singleProduct)}},nr={getAllProd:function(t){var e=t.commit;return(0,tr.mG)(this,void 0,void 0,(function(){return(0,tr.Jh)(this,(function(t){switch(t.label){case 0:return rr.products.length?[3,2]:[4,er.Z.get("https://dummyjson.com/products?limit=100").then((function(t){e("getAll",t.data)}))];case 1:return[2,t.sent()];case 2:return[2]}}))}))},getSingleProd:function(t,e){var r=t.commit;return(0,tr.mG)(this,void 0,void 0,(function(){return(0,tr.Jh)(this,(function(t){switch(t.label){case 0:return rr.products.length?[3,2]:[4,er.Z.get("https://dummyjson.com/products/".concat(e)).then((function(t){r("getSingle",t.data)}))];case 1:return[2,t.sent()];case 2:r("getSingleId",e),t.label=3;case 3:return[2]}}))}))}},or={namespaced:!0,state:rr,getters:ar,mutations:ir,actions:nr},sr=or,cr={categories:[],singleCategory:[],text:"text 5555"},lr={getAllCategories:function(t){return t.categories},getCatLength:function(t){return t.categories.length},getSingleCategory:function(t){return t.singleCategory}},ur={setAllCat:function(t,e){t.categories=e},setSingleCat:function(t,e){t.singleCategory=e}},hr={getAllCat:function(t){var e=t.commit;return(0,tr.mG)(this,void 0,void 0,(function(){return(0,tr.Jh)(this,(function(t){switch(t.label){case 0:return cr.categories.length?[3,2]:[4,er.Z.get("https://dummyjson.com/products/categories").then((function(t){e("setAllCat",t.data)}))];case 1:return[2,t.sent()];case 2:return[2]}}))}))},getSingleCat:function(t,e){var r=t.commit;return(0,tr.mG)(this,void 0,void 0,(function(){return(0,tr.Jh)(this,(function(t){switch(t.label){case 0:return[4,er.Z.get("https://dummyjson.com/products/category/".concat(e)).then((function(t){r("setSingleCat",t.data)}))];case 1:return[2,t.sent()]}}))}))}},gr={namespaced:!0,state:cr,getters:lr,mutations:ur,actions:hr},dr=gr,pr={cartArray:[]},Ar={getCartArray:function(t){return t.cartArray},getCartLength:function(t){return t.cartArray.length}},mr={push:function(t,e){var r=t.cartArray.find((function(t){return t.id===e.id}));r||(t.cartArray.push(e),localStorage.setItem("cart",JSON.stringify(t.cartArray)))},delete:function(t,e){var r=t.cartArray.findIndex((function(t){return t.id===e}));-1!==r&&(t.cartArray.splice(r,1),localStorage.setItem("cart",JSON.stringify(t.cartArray)))},getDataFromStorage:function(t){localStorage.getItem("cart")&&JSON.parse(localStorage.getItem("cart")||"").length>0&&(t.cartArray=JSON.parse(localStorage.getItem("cart")||""))}},Cr={pushToCart:function(t,e){var r=t.commit;r("push",e)},delFromCart:function(t,e){var r=t.commit;r("delete",e)},getFromStorage:function(t){var e=t.commit;e("getDataFromStorage")}},kr={namespaced:!0,state:pr,getters:Ar,mutations:mr,actions:Cr},wr=kr,yr=(Symbol(),(0,h.MT)({modules:{Products:sr,Categories:dr,Cart:wr}})),fr=yr,vr=(0,R.Z)(),Fr=(0,a.ri)(V);Fr.config.globalProperties.emitter=vr,Fr.use(fr).use($e).mount("#app")}},e={};function r(a){var i=e[a];if(void 0!==i)return i.exports;var n=e[a]={exports:{}};return t[a](n,n.exports,r),n.exports}r.m=t,function(){var t=[];r.O=function(e,a,i,n){if(!a){var o=1/0;for(u=0;u<t.length;u++){a=t[u][0],i=t[u][1],n=t[u][2];for(var s=!0,c=0;c<a.length;c++)(!1&n||o>=n)&&Object.keys(r.O).every((function(t){return r.O[t](a[c])}))?a.splice(c--,1):(s=!1,n<o&&(o=n));if(s){t.splice(u--,1);var l=i();void 0!==l&&(e=l)}}return e}n=n||0;for(var u=t.length;u>0&&t[u-1][2]>n;u--)t[u]=t[u-1];t[u]=[a,i,n]}}(),function(){r.d=function(t,e){for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};r.O.j=function(e){return 0===t[e]};var e=function(e,a){var i,n,o=a[0],s=a[1],c=a[2],l=0;if(o.some((function(e){return 0!==t[e]}))){for(i in s)r.o(s,i)&&(r.m[i]=s[i]);if(c)var u=c(r)}for(e&&e(a);l<o.length;l++)n=o[l],r.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return r.O(u)},a=self["webpackChunkonline_store"]=self["webpackChunkonline_store"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=r.O(void 0,[998],(function(){return r(768)}));a=r.O(a)})();
//# sourceMappingURL=app.058d02ad.js.map