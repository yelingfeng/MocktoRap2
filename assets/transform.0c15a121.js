import{isArray as e,isNumber as r,isObject as t,isString as o}from"./utils.c9a3879e.js";import{g as n,h as i}from"./vendor.7f3024dd.js";const s=()=>{const e=`${n(10,30)}${n(10,50)}00${n(10,99)}`;return Number(e)},p=s(),d=o=>r(o)?"Number":e(o)?"Array":t(o)?"Object":"String",u=(e,t)=>{const n=[];return Object.entries(e).map((([e,i])=>{if(null!==i){const p=`@order(${i.map((e=>o(e)?`'${e}'`:r(e)?e:void 0))})`,u=d(i[0]),c={id:s(),type:u,name:e,rule:"",pid:t,scope:"response",value:p};n.push(a(c))}})),n},a=({id:e,scope:r,type:t,name:o,rule:n,value:i,desc:s="",pid:d,priority:u=1})=>({id:e,scope:r,type:t,pos:2,name:o,rule:n,value:i,description:s,parentId:d,priority:u,required:!1,creatorId:161514,moduleId:482600,repositoryId:292320,interfaceId:p}),c=(r,t)=>{const o=[];return Object.entries(t).map((([e,r])=>{if(console.log(e,r),e){const t=d(r),n=a({id:s(),type:t,name:e,rule:"",pid:-1,scope:"request",value:r});o.push(n)}})),Object.entries(r).map((([r,t])=>{const n=d(t),p={id:s(),type:n,name:r,rule:"",pid:-1,scope:"response",value:t};if(e(t)){((r,t)=>{if(e(r)){const e=i(r,((e,r,t)=>(Object.entries(r).map((([r,t])=>{null!==t?e[r]?e[r].push(t):e[r]=[t]:e[r]=null})),e)),{});return u(e,t)}return r})(t,p.id).map((e=>{o.push(e)})),t.length&&(p.name=`${p.name}|${t.length}`),p.value=""}const c=a(p);o.push(c)})),o},l=(e,r,t)=>{const o=(({name:e,url:r,method:t,bodyOption:o="FORM_DATA",description:n=""})=>({id:p,name:e,url:r,method:t,bodyOption:o,description:n,priority:1,status:200,creatorId:161514,moduleId:482600,repositoryId:292320}))({name:t.name,url:t.url,method:t.method,bodyOption:t.bodyOption,description:t.desc});console.log(e);return{itf:o,properties:c(r,e)}};export{c as _transProperties,l as transformMock};
