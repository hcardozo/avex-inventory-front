(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"5VSb":function(i,e,r){"use strict";r.r(e),r.d(e,"PerfilGuiModule",(function(){return F}));var o=r("SVse"),t=r("iInd"),a=r("+Tu1"),s=r("0j/G"),n=r("8Y7J"),l=r("4Uo6"),c=r("Cd5o"),d=r("7g+E"),u=r("hhfa"),b=r("ZRSf"),f=r("MY3+"),p=r("VhXZ"),m=r("YHJu"),h=r("s7LF"),v=r("51Ls");const g=["paginador"];function P(i,e){if(1&i&&(n.Ub(0,"option",18),n.Gc(1),n.Tb()),2&i){const i=e.$implicit;n.jc("value",i),n.Cb(1),n.Hc(i)}}function T(i,e){if(1&i){const i=n.Vb();n.Ub(0,"div",11),n.Ub(1,"h5",12),n.Gc(2,"perfils"),n.Tb(),n.Ub(3,"select",13),n.bc("ngModelChange",(function(e){return n.vc(i),n.dc().registros=e}))("change",(function(){return n.vc(i),n.dc().cambioCantidadRegistros()})),n.Ec(4,P,2,2,"option",14),n.Tb(),n.Ub(5,"span",15),n.Pb(6,"i",16),n.Ub(7,"input",17),n.bc("input",(function(e){return n.vc(i),n.dc(),n.uc(1).filterGlobal(e.target.value,"contains")})),n.Tb(),n.Tb(),n.Tb()}if(2&i){const i=n.dc();n.Cb(3),n.jc("ngModel",i.registros),n.Cb(1),n.jc("ngForOf",i.registrosHabilitados)}}function S(i,e){1&i&&(n.Ub(0,"tr"),n.Ub(1,"th",19),n.Gc(2," Perfil "),n.Pb(3,"p-sortIcon",20),n.Pb(4,"p-columnFilter",21),n.Tb(),n.Ub(5,"th",19),n.Gc(6," Descripci\xf3n "),n.Pb(7,"p-sortIcon",20),n.Pb(8,"p-columnFilter",21),n.Tb(),n.Ub(9,"th",19),n.Gc(10," Modulos "),n.Pb(11,"p-sortIcon",20),n.Pb(12,"p-columnFilter",21),n.Tb(),n.Ub(13,"th",22),n.Gc(14," Estado "),n.Pb(15,"p-sortIcon",23),n.Pb(16,"p-columnFilter",24),n.Tb(),n.Ub(17,"th"),n.Gc(18,"Acciones "),n.Tb(),n.Tb())}function U(i,e){if(1&i){const i=n.Vb();n.Ub(0,"tr"),n.Ub(1,"td"),n.Ub(2,"span",25),n.Gc(3,"Perfil"),n.Tb(),n.Gc(4),n.Tb(),n.Ub(5,"td"),n.Ub(6,"span",25),n.Gc(7,"Descripci\xf3n"),n.Tb(),n.Gc(8),n.Tb(),n.Ub(9,"td"),n.Ub(10,"div",26),n.Ub(11,"span",25),n.Gc(12,"Modulos"),n.Tb(),n.Ub(13,"i",27),n.bc("click",(function(){n.vc(i);const r=e.$implicit;return n.dc().showDialog(r.modulos)})),n.Tb(),n.Tb(),n.Tb(),n.Ub(14,"td"),n.Ub(15,"div",26),n.Ub(16,"span",25),n.Gc(17,"Estado"),n.Tb(),n.Ub(18,"p-inputSwitch",28),n.bc("onChange",(function(){n.vc(i);const r=e.$implicit;return n.dc().cambiarEstado(r)}))("ngModelChange",(function(r){return n.vc(i),e.$implicit.estado=r})),n.Tb(),n.Tb(),n.Tb(),n.Ub(19,"td",29),n.Ub(20,"div",30),n.Ub(21,"span",25),n.Gc(22,"Acciones"),n.Tb(),n.Ub(23,"button",31),n.bc("click",(function(){n.vc(i);const r=e.$implicit;return n.dc().modificarPerfil(r)})),n.Pb(24,"i",32),n.Tb(),n.Ub(25,"button",33),n.bc("click",(function(){n.vc(i);const r=e.$implicit;return n.dc().eliminarPerfil(r)})),n.Pb(26,"i",34),n.Tb(),n.Tb(),n.Tb(),n.Tb()}if(2&i){const i=e.$implicit;n.Cb(4),n.Ic("",i.nombre," "),n.Cb(4),n.Ic("",i.descripcion," "),n.Cb(10),n.jc("ngModel",i.estado)}}function C(i,e){if(1&i&&(n.Ub(0,"li"),n.Gc(1),n.Tb()),2&i){const i=e.$implicit;n.Cb(1),n.Hc(i.nombreModulo)}}const w=function(){return["nombre","estado"]},R=function(){return{width:"50vw"}};let M=(()=>{class i{constructor(i,e,r,o,t,a,s){var n,l,c;this.perfilService=i,this.modulosService=e,this.alertService=r,this.router=o,this.activatedRoute=t,this.spinner=a,this.confirmationService=s,this.listaPerfiles=[],this.pagina=1,this.registros=5,this.registrosHabilitados=[5,10,20,50],this.display=!1,this.segundoNivel=null===(c=null===(l=null===(n=this.router.getCurrentNavigation())||void 0===n?void 0:n.extras)||void 0===l?void 0:l.state)||void 0===c?void 0:c.datos}ngOnInit(){this.datosSesion=JSON.parse(localStorage.getItem(s.a)),this.refrescarTabla()}refrescarTabla(){this.spinner.show(),this.perfilService.infoPaginacion({parametro:{registros:this.registros}}).subscribe(i=>{null!=i.resultado&&(this.totalPaginas=i.resultado.totalPaginas,this.totalRegistros=i.resultado.totalRegistros,this.perfilService.listarPerfil({parametro:{pagina:this.pagina,registros:this.registros}}).subscribe(i=>{this.spinner.hide(),(null==i?void 0:i.resultadoList)&&(this.listaPerfiles=i.resultadoList)},i=>{throw this.spinner.hide(),this.alertService.mostrarNotificacion(a.a.ERROR,"Error al listar Perfiles","Se presentan problemas al listar los perfiles, por favor intente nuevamente."),i}))})}modificarPerfil(i){this.router.navigate(["./modificarPerfil"],{state:{datosPerfil:i},relativeTo:this.activatedRoute.parent,skipLocationChange:!0})}cambioCantidadRegistros(){this.pagina=1,this.paginador.changePage(0),this.refrescarTabla()}cambiarPagina(i){this.pagina=i.page+1,this.refrescarTabla()}eliminarPerfil(i){this.confirmationService.confirm({message:`\xbfEsta seguro que desea eliminar el perfil ${i.nombre}?`,header:"Eliminar Perfil",icon:"pi pi-info-circle",accept:()=>{this.spinner.show(),this.perfilService.eliminarPerfil({parametro:{usuarioModificacion:this.datosSesion.usuarioAvexInfo.nombre,guid:i.guid_perfil}}).subscribe(i=>{(null==i?void 0:i.resultado.resultado)&&(this.cambioCantidadRegistros(),this.alertService.mostrarNotificacion(a.a.EXITOSA,"Perfil Eliminado","Perfil eliminado de manera correcta."))},i=>{throw this.spinner.hide(),this.alertService.mostrarNotificacion(a.a.ERROR,"Error al eliminar Perfil","Se presentan problemas al realizar eliminaci\xf3n de la Perfil, por favor intente nuevamente."),i})},reject:()=>{}})}cambiarEstado(i){var e,r;this.spinner.show();let o={guid:i.guid_perfil,usuarioModificacion:null===(r=null===(e=this.datosSesion)||void 0===e?void 0:e.usuarioAvexInfo)||void 0===r?void 0:r.nombre};this.perfilService.cambiarEstadoPerfil({parametro:o}).subscribe(()=>{this.spinner.hide()},i=>{throw this.spinner.hide(),this.alertService.mostrarNotificacion(a.a.ERROR,"Error al actualizar Perfil","Se presentan problemas al realizar actualizacion de estado de perfil, por favor intente nuevamente."),i})}showDialog(i){this.display=!0,this.vistaPreviaModulos=i}}return i.\u0275fac=function(e){return new(e||i)(n.Ob(l.q),n.Ob(l.o),n.Ob(c.a),n.Ob(t.b),n.Ob(t.a),n.Ob(d.c),n.Ob(u.b))},i.\u0275cmp=n.Ib({type:i,selectors:[["app-listar-perfil"]],viewQuery:function(i,e){var r;1&i&&n.Jc(g,!0),2&i&&n.tc(r=n.cc())&&(e.paginador=r.first)},decls:12,vars:14,consts:[["dataKey","id","styleClass","p-datatable-responsive-demo",3,"value","globalFilterFields","rowHover"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],[3,"rows","totalRecords","pageLinkSize","first","onPageChange"],["paginador",""],[3,"baseZIndex"],["header","Modulos",3,"visible","visibleChange"],[1,"vista-previa-modulos"],[4,"ngFor","ngForOf"],[1,"cabecera-tabla"],[1,"titulo"],[3,"ngModel","ngModelChange","change"],[3,"value",4,"ngFor","ngForOf"],[1,"p-input-icon-left"],[1,"pi","pi-search"],["type","text","pInputText","","placeholder","Search...",3,"input"],[3,"value"],["pSortableColumn","nombre"],["field","nombre"],["type","text","field","nombre","display","menu"],["pSortableColumn","estado"],["field","estado"],["type","boolean","field","estado","display","menu"],[1,"p-column-title"],[1,"content-perfiles-list"],[1,"fa","fa-eye",3,"click"],[3,"ngModel","onChange","ngModelChange"],[1,"acciones"],[1,"content-acciones"],[1,"btn","btn-warning",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-danger",3,"click"],[1,"fa","fa-trash"]],template:function(i,e){1&i&&(n.Ub(0,"p-table",0,1),n.Ec(2,T,8,2,"ng-template",2),n.Ec(3,S,19,0,"ng-template",3),n.Ec(4,U,27,3,"ng-template",4),n.Tb(),n.Ub(5,"p-paginator",5,6),n.bc("onPageChange",(function(i){return e.cambiarPagina(i)})),n.Tb(),n.Pb(7,"p-confirmDialog",7),n.Ub(8,"p-dialog",8),n.bc("visibleChange",(function(i){return e.display=i})),n.Ub(9,"div",9),n.Ub(10,"ul"),n.Ec(11,C,2,1,"li",10),n.Tb(),n.Tb(),n.Tb()),2&i&&(n.jc("value",e.listaPerfiles)("globalFilterFields",n.kc(12,w))("rowHover",!0),n.Cb(5),n.jc("rows",e.registros)("totalRecords",e.totalRegistros)("pageLinkSize",3)("first",0),n.Cb(2),n.Ac(n.kc(13,R)),n.jc("baseZIndex",0),n.Cb(1),n.jc("visible",e.display),n.Cb(3),n.jc("ngForOf",e.vistaPreviaModulos))},directives:[b.d,u.j,f.a,p.a,m.a,o.j,h.p,h.k,h.m,h.n,h.r,b.c,b.b,b.a,v.a],styles:[".content-acciones[_ngcontent-%COMP%], .content-perfiles-list[_ngcontent-%COMP%]{width:auto;height:auto;display:flex;justify-content:center}.content-acciones[_ngcontent-%COMP%] > button.btn[_ngcontent-%COMP%]{margin-left:10px!important;margin-right:10px!important}"]}),i})();var E=r("MEzG"),y=r("jMqV");function I(i,e){1&i&&(n.Ub(0,"span",16),n.Gc(1," Campo nombre es requerido "),n.Tb())}function O(i,e){1&i&&(n.Ub(0,"span",16),n.Gc(1," Campo nombre es requerido "),n.Tb())}function G(i,e){1&i&&(n.Ub(0,"span",16),n.Gc(1," Campo funciones es requerido "),n.Tb())}function j(i,e){if(1&i){const i=n.Vb();n.Ub(0,"button",17),n.bc("click",(function(){n.vc(i);const e=n.dc(2);return e.agregarPerfil(e.formulario)})),n.Gc(1," Agregar "),n.Tb()}if(2&i){const i=n.dc(2);n.jc("disabled",!i.formularioActual.valid)}}function q(i,e){if(1&i){const i=n.Vb();n.Ub(0,"button",17),n.bc("click",(function(){n.vc(i);const e=n.dc(2);return e.modificarPerfil(e.formulario)})),n.Gc(1," Modificar "),n.Tb()}if(2&i){const i=n.dc(2);n.jc("disabled",!i.formularioActual.valid)}}function A(i,e){if(1&i&&(n.Ub(0,"div",1),n.Ub(1,"h2"),n.Pb(2,"i",2),n.Gc(3),n.Tb(),n.Ub(4,"form",3),n.Ub(5,"div",4),n.Ub(6,"label",5),n.Gc(7,"Nombre"),n.Tb(),n.Pb(8,"input",6),n.Tb(),n.Ec(9,I,2,0,"span",7),n.Ub(10,"div",4),n.Ub(11,"label",8),n.Gc(12,"Descripci\xf3n"),n.Tb(),n.Pb(13,"textarea",9),n.Tb(),n.Ec(14,O,2,0,"span",7),n.Ub(15,"div",4),n.Ub(16,"label",10),n.Gc(17,"Funciones"),n.Tb(),n.Pb(18,"p-multiSelect",11),n.Tb(),n.Ec(19,G,2,0,"span",7),n.Ub(20,"div",4),n.Ub(21,"label",12),n.Gc(22,"Habilitar"),n.Tb(),n.Pb(23,"mat-slide-toggle",13),n.Tb(),n.Ub(24,"div",14),n.Ec(25,j,2,1,"button",15),n.Ec(26,q,2,1,"button",15),n.Tb(),n.Tb(),n.Tb()),2&i){const i=n.dc();n.Cb(3),n.Ic(" ",null!=i.parametrosRuta&&i.parametrosRuta.modificacion?" Modificar":"Agregar "," Perfil "),n.Cb(1),n.jc("formGroup",i.formularioActual),n.Cb(5),n.jc("ngIf",i.formulario.nombre.dirty&&i.formulario.nombre.errors&&i.formulario.nombre.errors.required),n.Cb(5),n.jc("ngIf",i.formulario.nombre.dirty&&i.formulario.nombre.errors&&i.formulario.nombre.errors.required),n.Cb(4),n.jc("options",i.listaModulos),n.Cb(1),n.jc("ngIf",i.formulario.modulos.dirty&&i.formulario.modulos.errors&&i.formulario.modulos.errors.required),n.Cb(6),n.jc("ngIf",!(null!=i.parametrosRuta&&i.parametrosRuta.modificacion)),n.Cb(1),n.jc("ngIf",null==i.parametrosRuta?null:i.parametrosRuta.modificacion)}}let x=(()=>{class i{constructor(i,e,r,o,t){var a,s,n,l;this.perfilService=i,this.moduloService=e,this.alertService=r,this.spinner=o,this.router=t,this.formularioRegistrarPerfil=new h.f({nombre:new h.d("",[h.q.required]),descripcion:new h.d("",[h.q.required]),modulos:new h.d(null,[h.q.required]),habilitar:new h.d(!0,[h.q.required])}),this.formularioModificacionPerfil=new h.f({guidPerfil:new h.d("",[h.q.required]),nombre:new h.d("",[h.q.required]),descripcion:new h.d("",[h.q.required]),modulos:new h.d(null,[h.q.required]),habilitar:new h.d(!0,[h.q.required])}),this.parametrosRuta={},this.listaModulos=[],this.parametrosRuta.datosPerfil=null===(n=null===(s=null===(a=this.router.getCurrentNavigation())||void 0===a?void 0:a.extras)||void 0===s?void 0:s.state)||void 0===n?void 0:n.datosPerfil,this.parametrosRuta.modificacion=!!(null===(l=this.parametrosRuta)||void 0===l?void 0:l.datosPerfil)}ngOnInit(){this.datosSesion=JSON.parse(localStorage.getItem(s.a)),this.parametrosRuta.modificacion?(this.formularioActual=this.formularioModificacionPerfil,this.asignarValoresModificacion()):(this.listarModulos(),this.formularioActual=this.formularioRegistrarPerfil)}get formulario(){return this.formularioActual.controls}asignarValoresModificacion(){this.spinner.show(),this.moduloService.listarModulos().subscribe(i=>{this.spinner.hide(),null!=(null==i?void 0:i.resultadoList)&&(this.listaModulos=i.resultadoList,this.formulario.guidPerfil.setValue(this.parametrosRuta.datosPerfil.guid_perfil),this.formulario.nombre.setValue(this.parametrosRuta.datosPerfil.nombre),this.formulario.descripcion.setValue(this.parametrosRuta.datosPerfil.descripcion),this.formulario.modulos.setValue(this.parametrosRuta.datosPerfil.modulos),this.formulario.habilitar.setValue(this.parametrosRuta.datosPerfil.estado),this.formularioActual.updateValueAndValidity())},i=>{throw this.spinner.hide(),this.alertService.mostrarNotificacion(a.a.ERROR,"Error al listar Modulos","Se presentan problemas al listar los modulos, por favor intente nuevamente."),i})}listarModulos(){this.spinner.show(),this.moduloService.listarModulos().subscribe(i=>{this.spinner.hide(),null!=(null==i?void 0:i.resultadoList)&&(this.listaModulos=i.resultadoList)},i=>{throw this.spinner.hide(),this.alertService.mostrarNotificacion(a.a.ERROR,"Error al listar Modulos","Se presentan problemas al listar los modulos, por favor intente nuevamente."),i})}agregarPerfil(i){var e,r;let o={nombrePerfil:i.nombre.value,descripcionPerfil:i.descripcion.value,modulos:i.modulos.value,usuarioCreacion:null===(r=null===(e=this.datosSesion)||void 0===e?void 0:e.usuarioAvexInfo)||void 0===r?void 0:r.nombre,estado:i.habilitar.value};this.spinner.show(),this.perfilService.registrarPerfil({parametro:o}).subscribe(i=>{var e;this.spinner.hide(),!0===(null===(e=null==i?void 0:i.resultado)||void 0===e?void 0:e.resultado)&&(this.formularioActual.reset(),this.formulario.habilitar.setValue(!0),this.alertService.mostrarNotificacion(a.a.EXITOSA,"Registro de Perfil","Perfil registrado exitosamente."))},i=>{throw this.spinner.hide(),this.alertService.mostrarNotificacion(a.a.ERROR,"Error al registrar Perfil","Se presentan problemas al realizar el registro de perfil, por favor intente nuevamente."),i})}modificarPerfil(i){var e,r;let o={guidPerfil:i.guidPerfil.value,nombrePerfil:i.nombre.value,descripcionPerfil:i.descripcion.value,modulos:i.modulos.value,usuarioModificacion:null===(r=null===(e=this.datosSesion)||void 0===e?void 0:e.usuarioAvexInfo)||void 0===r?void 0:r.nombre,estado:i.habilitar.value};this.spinner.show(),this.perfilService.modificarPerfil({parametro:o}).subscribe(i=>{var e;this.spinner.hide(),!0===(null===(e=null==i?void 0:i.resultado)||void 0===e?void 0:e.resultado)&&this.alertService.mostrarNotificacion(a.a.EXITOSA,"Modificacion de Perfil","Perfil modificado exitosamente.")},i=>{throw this.spinner.hide(),this.alertService.mostrarNotificacion(a.a.ERROR,"Error al modificar Perfil","Se presentan problemas al realizar la modificacion del perfil, por favor intente nuevamente."),i})}}return i.\u0275fac=function(e){return new(e||i)(n.Ob(l.q),n.Ob(l.o),n.Ob(c.a),n.Ob(d.c),n.Ob(t.b))},i.\u0275cmp=n.Ib({type:i,selectors:[["app-registrar-perfil"]],decls:1,vars:1,consts:[["class","contenedor",4,"ngIf"],[1,"contenedor"],[1,"fa","fa-align-justify"],[3,"formGroup"],[1,"item-formulario"],["for","nombre"],["type","text","placeholder","Nombre del perfil","autocomplete","off","formControlName","nombre","id","nombre",1,"form-control"],["class","text-danger",4,"ngIf"],["for","descripcion"],["placeholder","Descripci\xf3n del perfil","autocomplete","off","formControlName","descripcion","id","descripcion",1,"form-control"],["for","Funciones"],["formControlName","modulos","defaultLabel","Seleccione un modulo","optionLabel","nombreModulo","display","chip",1,"multiselect-modulos",3,"options"],["for","habilitar",1,"label-personalizado"],["formControlName","habilitar","color","primary","id","habilitar"],[1,"contenedor-botones"],["class","btn btn-primary",3,"disabled","click",4,"ngIf"],[1,"text-danger"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(i,e){1&i&&n.Ec(0,A,27,8,"div",0),2&i&&n.jc("ngIf",e.formularioActual)},directives:[o.k,h.s,h.l,h.g,h.b,h.k,h.e,E.a,y.a],styles:[".multiselect-modulos{min-width:65%;max-width:65%}  .multiselect-modulos>.p-multiselect{width:100%!important}"]}),i})();const N=[{path:"",redirectTo:"listarPerfiles"},{path:"listarPerfiles",component:M},{path:"registrarPerfil",component:x},{path:"modificarPerfil",component:x}];let k=(()=>{class i{}return i.\u0275mod=n.Mb({type:i}),i.\u0275inj=n.Lb({factory:function(e){return new(e||i)},imports:[[t.c.forChild(N)],t.c]}),i})();var V=r("0YIw");let F=(()=>{class i{}return i.\u0275mod=n.Mb({type:i}),i.\u0275inj=n.Lb({factory:function(e){return new(e||i)},imports:[[o.b,V.a,k,l.p,l.n]]}),i})()}}]);