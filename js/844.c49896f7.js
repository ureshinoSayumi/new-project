"use strict";(self["webpackChunknew_project"]=self["webpackChunknew_project"]||[]).push([[844],{4844:function(e,s,a){a.r(s),a.d(s,{default:function(){return y}});var r=a(6252),t=a(9963);const n=e=>((0,r.dD)("data-v-3f0a1a40"),e=e(),(0,r.Cn)(),e),o={class:"container"},i={class:"row justify-content-center"},l=n((()=>(0,r._)("h1",{class:"h3 mb-3 font-weight-normal text-center"}," 請先登入 ",-1))),d={class:"col-8"},u={id:"form",class:"form-signin"},c={class:"form-floating mb-3"},p=n((()=>(0,r._)("label",{for:"username"},"Email address",-1))),m={class:"form-floating"},h=n((()=>(0,r._)("label",{for:"password"},"Password",-1))),f={key:0,class:"spinner-border text-primary",role:"status"},w=n((()=>(0,r._)("span",{class:"visually-hidden"},"Loading...",-1))),g=[w],_=n((()=>(0,r._)("p",{class:"mt-5 mb-3 text-muted"}," © 2021~∞ - 六角學院 ",-1)));function v(e,s,a,n,w,v){return(0,r.wg)(),(0,r.iD)("div",o,[(0,r._)("div",i,[l,(0,r._)("div",d,[(0,r._)("form",u,[(0,r._)("div",c,[(0,r.wy)((0,r._)("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"","onUpdate:modelValue":s[0]||(s[0]=e=>w.user.username=e)},null,512),[[t.nr,w.user.username]]),p]),(0,r._)("div",m,[(0,r.wy)((0,r._)("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":s[1]||(s[1]=e=>w.user.password=e)},null,512),[[t.nr,w.user.password]]),h]),(0,r._)("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit",onClick:s[2]||(s[2]=(0,t.iM)((e=>v.signin()),["prevent"]))}," 登入 "),w.loading?((0,r.wg)(),(0,r.iD)("div",f,g)):(0,r.kq)("",!0)])])]),_])}var b={data(){return{data:"data",user:{username:"",password:""},loading:!1,baseUrl:"https://vue3-course-api.hexschool.io"}},methods:{signin(){if(!this.user.username&&!this.user.password)return;this.loading=!0;const e="https://vue3-course-api.hexschool.io/v2";this.axios.post(`${e}/admin/signin`,this.user).then((e=>{const{token:s,expired:a}=e.data;document.cookie=`hexToken=${s};expires=${new Date(a)}; path=/`,console.log("登入成功"),this.loading=!1})).catch((()=>{alert("登入失敗"),this.user={username:"",password:""},this.loading=!1}))}},mounted(){}},k=a(3744);const x=(0,k.Z)(b,[["render",v],["__scopeId","data-v-3f0a1a40"]]);var y=x}}]);
//# sourceMappingURL=844.c49896f7.js.map