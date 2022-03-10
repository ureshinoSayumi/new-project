"use strict";(self["webpackChunknew_project"]=self["webpackChunknew_project"]||[]).push([[771],{5771:function(o,t,e){e.r(t),e.d(t,{default:function(){return po}});var l=e(6252),n=e(3577);const a={class:"container"},s={class:"text-end mt-4"},i={class:"table mt-4"},d=(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",{width:"130"},"名稱"),(0,l._)("th",{width:"100"},"代碼"),(0,l._)("th",{width:"150"},"到期日"),(0,l._)("th",{width:"100"},"折扣百分比"),(0,l._)("th",{width:"120"},"是否啟用"),(0,l._)("th",{width:"80"},"編輯")])],-1),c={key:0,class:"text-success"},u={key:1},p=["onClick"],r=["onClick"],h={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"couponModal"},g={id:"delProductModal",ref:"delModal",class:"modal fade",tabindex:"-1","aria-labelledby":"delProductModalLabel","aria-hidden":"true"},b={class:"modal-dialog"},_={class:"modal-content border-0"},m={class:"modal-header bg-danger text-white"},C=(0,l._)("h5",{id:"delProductModalLabel",class:"modal-title"},[(0,l._)("span",null,"刪除產品")],-1),w={class:"modal-body"},y=(0,l.Uk)(" 是否刪除 "),k={key:0,class:"text-danger"},v=(0,l.Uk)(" 商品(刪除後將無法恢復)。 "),f={class:"modal-footer"},M={key:2,class:"spinner-border text-primary",role:"status"},x=(0,l._)("span",{class:"visually-hidden"},"Loading...",-1),D=[x];function $(o,t,e,x,$,j){const q=(0,l.up)("PagesView"),E=(0,l.up)("CouponModal");return(0,l.wg)(),(0,l.iD)("div",a,[(0,l._)("div",s,[(0,l._)("button",{class:"btn btn-primary","data-toggle":"modal",onClick:t[0]||(t[0]=o=>j.showModal())},"建立新的優惠卷 ")]),(0,l._)("table",i,[d,(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)($.coupons,(o=>((0,l.wg)(),(0,l.iD)("tr",{key:o.id},[(0,l._)("td",null,(0,n.zw)(o.title),1),(0,l._)("td",null,(0,n.zw)(o.code),1),(0,l._)("td",null,(0,n.zw)(o.due_date),1),(0,l._)("td",null,(0,n.zw)(o.percent),1),(0,l._)("td",null,[o.is_enabled?((0,l.wg)(),(0,l.iD)("span",c,"啟用")):((0,l.wg)(),(0,l.iD)("span",u,"未啟用"))]),(0,l._)("td",null,[(0,l._)("button",{class:"btn btn-outline-primary btn-sm",onClick:t=>j.showModal(o)},"編輯",8,p),(0,l._)("button",{class:"btn btn-outline-primary btn-sm",onClick:t=>j.showDeleteModal(o)},"刪除",8,r)])])))),128))])]),(0,l.Wm)(q,{pages:$.pagination,onEmitPages:j.getCoupons},null,8,["pages","onEmitPages"]),(0,l._)("div",h,[(0,l.Wm)(E,{loading:$.loading,coupon:$.coupon,isedit:$.isEdit,onCreateCoupon:j.createCoupon,onEditCoupon:j.editCoupon},null,8,["loading","coupon","isedit","onCreateCoupon","onEditCoupon"])],512),(0,l._)("div",g,[(0,l._)("div",b,[(0,l._)("div",_,[(0,l._)("div",m,[C,(0,l._)("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:t[1]||(t[1]=(...o)=>j.hideModal&&j.hideModal(...o))})]),(0,l._)("div",w,[y,this.coupon?((0,l.wg)(),(0,l.iD)("strong",k,(0,n.zw)(this.coupon.title),1)):(0,l.kq)("",!0),v]),(0,l._)("div",f,[$.loading?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("button",{key:0,type:"button",class:"btn btn-outline-secondary",onClick:t[2]||(t[2]=(...o)=>j.hideModal&&j.hideModal(...o))}," 取消 ")),$.loading?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("button",{key:1,type:"button",class:"btn btn-danger",onClick:t[3]||(t[3]=o=>j.deletecoupon())}," 確認刪除 ")),$.loading?((0,l.wg)(),(0,l.iD)("div",M,D)):(0,l.kq)("",!0)])])])],512)])}var j=e(7424),q=e.n(j),E=e(9679),P=e(9963);const U={class:"modal-dialog modal-xl",role:"document"},V={class:"modal-content border-0"},z=(0,l._)("div",{class:"modal-header bg-dark text-white"},[(0,l._)("h5",{class:"modal-title",id:"exampleModalLabel"},[(0,l._)("span",null,"優惠卷")]),(0,l._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),L={class:"modal-body"},S={class:"row justify-content-center"},O={class:"col-sm-8"},Z={class:"form-group mb-3"},B=(0,l._)("label",{for:"title"},"標題",-1),J={class:"form-row"},N={class:"form-group mb-3"},W=(0,l._)("label",{for:"due_date"},"日期",-1),Y={class:"form-group mb-3"},A=(0,l._)("label",{for:"price"},"代碼",-1),F={class:"form-row"},H={class:"form-group mb-5"},K=(0,l._)("label",{for:"origin_price"},"折抵百分比",-1),T=(0,l._)("hr",null,null,-1),G={class:"form-group"},I={class:"form-check"},Q=(0,l._)("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),R={class:"modal-footer"},X={key:0,type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},oo={key:3,class:"spinner-border text-primary",role:"status"},to=(0,l._)("span",{class:"visually-hidden"},"Loading...",-1),eo=[to];function lo(o,t,e,n,a,s){return(0,l.wg)(),(0,l.iD)("div",U,[(0,l._)("div",V,[z,(0,l._)("div",L,[(0,l._)("div",S,[(0,l._)("div",O,[(0,l._)("div",Z,[B,(0,l.wy)((0,l._)("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[0]||(t[0]=o=>a.propsCoupon.title=o),placeholder:"請輸入標題"},null,512),[[P.nr,a.propsCoupon.title]])]),(0,l._)("div",J,[(0,l._)("div",N,[W,(0,l.wy)((0,l._)("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[1]||(t[1]=o=>a.due_date=o),placeholder:"請輸入日期"},null,512),[[P.nr,a.due_date]])]),(0,l._)("div",Y,[A,(0,l.wy)((0,l._)("input",{type:"unit",class:"form-control",id:"unit","onUpdate:modelValue":t[2]||(t[2]=o=>a.propsCoupon.code=o),placeholder:"請輸入代碼"},null,512),[[P.nr,a.propsCoupon.code]])])]),(0,l._)("div",F,[(0,l._)("div",H,[K,(0,l.wy)((0,l._)("input",{type:"number",class:"form-control",id:"origin_price","onUpdate:modelValue":t[3]||(t[3]=o=>a.propsCoupon.percent=o),placeholder:"請輸入折抵百分比"},null,512),[[P.nr,a.propsCoupon.percent]])])]),T,(0,l._)("div",G,[(0,l._)("div",I,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":t[4]||(t[4]=o=>a.propsCoupon.is_enabled=o),"true-value":1,"false-value":0,id:"is_enabled"},null,512),[[P.e8,a.propsCoupon.is_enabled]]),Q])])])])]),(0,l._)("div",R,[e.loading?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("button",X,"取消")),e.isedit||e.loading?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("button",{key:1,type:"button",class:"btn btn-primary",onClick:t[5]||(t[5]=o=>s.createCoupon())},"確認新增")),e.isedit&&!e.loading?((0,l.wg)(),(0,l.iD)("button",{key:2,type:"button",class:"btn btn-primary",onClick:t[6]||(t[6]=o=>s.editCoupon())},"確認編輯")):(0,l.kq)("",!0),e.loading?((0,l.wg)(),(0,l.iD)("div",oo,eo)):(0,l.kq)("",!0)])])])}var no={props:{coupon:{type:Object,default(){return{}}},isedit:{type:Boolean,default(){return!1}},loading:{type:Boolean,default(){return!1}}},data(){return{propsCoupon:{},due_date:null}},emits:["create-coupon","isedit","edit-coupon"],methods:{createCoupon(){this.propsCoupon.due_date=Math.floor(new Date(this.due_date)/1e3),this.propsCoupon.is_enabled||(this.propsCoupon.is_enabled=0),this.$emit("create-coupon",this.propsCoupon)},editCoupon(){this.$emit("edit-coupon",this.propsCoupon)}},watch:{coupon(){this.propsCoupon=this.coupon;const o=new Date(1e3*this.coupon.due_date),t=o.getFullYear();let e=o.getMonth()+1,l=o.getDate();e=1===e.toString().length?`0${e.toString()}`:e,l=1===l.toString().length?`0${l.toString()}`:l,this.due_date=`${t}-${e}-${l}`}},mounted(){}},ao=e(3744);const so=(0,ao.Z)(no,[["render",lo]]);var io=so,co={components:{PagesView:E.Z,CouponModal:io},data(){return{loading:!1,isEdit:!1,data:"data",coupons:null,coupon:null,couponModal:null,deleteModal:null,products:[],pagination:{}}},methods:{getCoupons(o=1){const t=`https://vue3-course-api.hexschool.io/v2/api/ciye-project/admin/coupons?page=${o}`;this.axios.get(t).then((o=>{console.log(o,"getCoupons"),this.coupons=o.data.coupons,this.pagination=o.data.pagination,this.loading=!1})).catch((o=>{console.log(o,"err")}))},createCoupon(o){const t={data:o};this.loading=!0;const e="https://vue3-course-api.hexschool.io/v2/api/ciye-project/admin/coupon";this.axios.post(e,t).then((o=>{console.log(o,"createCoupon"),this.getCoupons(),this.couponModal.hide(),alert("新增完成")})).catch((o=>{alert("上傳失敗"),console.log(o,"err")}))},editCoupon(o){const t={data:o};this.loading=!0;const e=`https://vue3-course-api.hexschool.io/v2/api/ciye-project/admin/coupon/${o.id}`;this.axios.put(e,t).then((o=>{console.log(o,"editCoupon"),this.getCoupons(),this.couponModal.hide(),alert("編輯完成")})).catch((o=>{alert("編輯失敗"),console.log(o,"err")}))},showModal(o){o?(this.isEdit=!0,this.coupon=JSON.parse(JSON.stringify(o))):(this.isEdit=!1,this.coupon={}),this.couponModal.show()},showDeleteModal(o){this.coupon=o,this.deleteModal.show()},hideModal(){this.deleteModal.hide()},deletecoupon(){this.loading=!0;const o=`https://vue3-course-api.hexschool.io/v2/api/ciye-project/admin/coupon/${this.coupon.id}`;console.log(o),this.axios.delete(o).then((o=>{console.log(o,"delete"),alert("成功刪除"),this.hideModal(),this.getCoupons()})).catch((o=>{console.log(o,"daltet")}))},signinCheck(){const o=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common.Authorization=o,this.loading=!0,this.axios.post(" https://vue3-course-api.hexschool.io/v2//api/user/check").then((o=>{console.log(o),this.getCoupons()})).catch((()=>{this.$router.push("/login")}))}},mounted(){this.signinCheck(),this.deleteModal=new(q())(this.$refs.delModal),this.couponModal=new(q())(this.$refs.couponModal),console.log(this.data)}};const uo=(0,ao.Z)(co,[["render",$]]);var po=uo}}]);
//# sourceMappingURL=771.95db02d3.js.map