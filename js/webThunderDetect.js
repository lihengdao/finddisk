function _xlThunderQtyPV(){try{vhref = "http://analytics-union.xunlei.com/PV?peerid=0&uri=http://thunderqtypv.union.xunlei.com&src=" + document.domain;image1 = new Image(1,1);image1.src=vhref;} catch(e) { }}

_xlThunderQtyPV();

var thunder_linkType;
//var selectThunderType = "coWebThunder";		//default download client type
var selectThunderType = "coThunder5";
//var selectThunderType = "coMiniThunder";
var mustBeSelectedThunder = false;	
var thunder_isOpenNewWindow = 10;
var isThunder5=0;
isFun 	 = function(a){ return typeof a == "function"; };
isNull 	 = function(a){ return typeof a == "object" && !a; };
isNumber = function(a){ return typeof a == "number" && isFinite(a);};
isObject = function(a){ return (a && typeof a == "object") || isFun(a);};
isString = function(a){ return typeof a == "string";};
isArray  = function(a){ return isObject(a) && a.constructor == Array; };
isUndef  = function(a){ return typeof a == "undefined";};
DoNothing = function(){};


/* Decode the refrence URL */


function setCookie(name, value, expire) {   
window.document.cookie = name + "=" + escape(value) + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()));
}

function getCookie(Name) {   
   var search = Name + "=";
   if (window.document.cookie.length > 0) { 
     offset = window.document.cookie.indexOf(search);
         if (offset != -1) { 
       offset += search.length;          
           end = window.document.cookie.indexOf(";", offset)          
           if (end == -1)
             end = window.document.cookie.length;
           return unescape(window.document.cookie.substring(offset, end));
     }
   }
   return null;
}

function register(name) {
var today = new Date();
var expires = new Date();
expires.setTime(today.getTime() + 1000*60*60*24);
setCookie("SexMovie", name, expires);
}


function Decode(str){
	str = str.replace(/&lt/g,"<");
	str = str.replace(/&gt/g,">");
	str = str.replace(/&amp/g,"&");
	str = str.replace(/&quot/g,"\"");
	str = str.replace(/&apos/g,"\'");
	str = str.replace(/<br>/g,"\n");
	return str;
}

function wtd_ChangFolder(pid)
{

  var thunder_Contents = pid / 10000 ;

 if(thunder_Contents != null && thunder_Contents > 0)
 {
   thunder_Contents = Math.floor(thunder_Contents)+1; 
   if(selectThunderType == "coWebThunder" && mustBeSelectedThunder == true )
   {
     return "http://hezuo.down.xunlei.com/webxunlei_hezuo_"+thunder_Contents+"/webxl_"+pid+".exe";
   }
   else
   {
	   return "http://hezuo.down.xunlei.com/xunlei_hezuo_"+thunder_Contents+"/thunder("+pid+").exe";
   }
 }
 else
 {

   if(selectThunderType == "coWebThunder" && mustBeSelectedThunder == true )
   {
        return "http://hezuo.down.xunlei.com/webxunlei_hezuo_1/webxl_00000.exe";
   }
   else
   {
	     return "http://hezuo.down.xunlei.com/xunlei_hezuo_1/thunder(00000).exe";
   }

 }

}



function OnDownloadClick_Company(sDownloadURL,sResName, sRefPage, sPid, isOpenNewWindow, sType,selectType,sCompany)
{
	
	Thunder.companySetup(sCompany,sPid);

	OnDownloadClick(sDownloadURL,sResName, sRefPage, sPid, isOpenNewWindow, sType,selectType);
	return false;
}
function OnDownloadClick(sDownloadURL,sResName, sRefPage,sPid,isOpenNewWindow,sType,selectType){

	
	sPid=sPid?sPid:"";if(sType=="07") sPid="g"+sPid;
    sResName="";
	Thunder.infoType=10;
	Thunder.pId=sPid?sPid:"";
	try{
		if(selectThunderType=='coWebThunder'){
			selectType=3
		}else if(selectThunderType=='coThunder5'){
			selectType=4
		}else{
			selectType=5
		}
	}catch(e){
		if(selectType && !isNaN(selectType)) selectType=Number(selectType);		
		
	}
	
	if(selectType==3 || selectType==4){Thunder.thunderType=selectType;
	//if(selectType==3) Thunder.mustUseSelected=true;
	}
	
	if(typeof(isOpenNewWindow)!="boolean"){
		if(isNaN(isOpenNewWindow)) isOpenNewWindow=undefined; else isOpenNewWindow=Number(isOpenNewWindow);
		if(isOpenNewWindow!=2 && isOpenNewWindow!=10) isOpenNewWindow=undefined;		
	}
	
	if((isOpenNewWindow==true ||isOpenNewWindow==10) && isOpenNewWindow!=undefined)	
		Thunder.isOpenNew=true;
	else if((isOpenNewWindow==false ||isOpenNewWindow==2) && isOpenNewWindow!=undefined)
		Thunder.isOpenNew=false;

	return Thunder.download(sDownloadURL,sRefPage,sResName,sResName);
}

function OnDownloadClick_Simple(linkObj,isOpenNewWindow,selectType)
{
   
	thunder_linkType=1;
	var sDownload = linkObj.getAttribute("thunderHref");
	//alert(sDownload);
	sDownload=ThunderEncode(sDownload)
	//var sResName = linkObj.getAttribute("thunderResTitle");
    var sResName ="";
	var sRefPage = location.href;
	var sPid = linkObj.getAttribute("thunderPid");
	var sType = linkObj.getAttribute("thunderType");
	var sCompany= linkObj.getAttribute("CompanyName");
	
	if (sCompany)
		Thunder.companySetup(sCompany,sPid);
	 
	sPid=sPid?sPid:"";
	if(sType=="07") sPid="g"+sPid;	

	var selThunder,openNew;
	
	try{
		if(selectThunderType=='coWebThunder'){
			selThunder=3
		}else if(selectThunderType=='coThunder5'){
			selThunder=4
		}else{
			selThunder=5
		}
	}catch(e){
		if(isOpenNewWindow){
			switch(isOpenNewWindow)
			{
				case 3:	case 4: case 5:
					selThunder=isOpenNewWindow;
			}
		}	

		if(!selThunder){

			if (!isNaN(selectType) && selectType){		
				
				selectType=Number(selectType);			

				if(selectType==3 || selectType==4 || selectType==5)
					selThunder=selectType;
			}
		}
	}
	
	var oldTType,oldTOpen,oldMustUse;

	oldTType	=Thunder.thunderType;
	oldMustUse	=Thunder.mustUseSelected;
	if(selThunder)
	{

		Thunder.thunderType=selThunder;
		//if(selThunder==3)
			//Thunder.mustUseSelected=true;
	}	
	oldTOpen=Thunder.isOpenNew;
	Thunder.isOpenNew=((isOpenNewWindow==2)?false:((isOpenNewWindow==1)?true:Thunder.isOpenNew));

	

	Thunder.pId=sPid?sPid:"";
	Thunder.download(sDownload,sRefPage,sResName,sResName);
	
	Thunder.thunderType		=oldTType;
	Thunder.isOpenNew		=oldTOpen;
	Thunder.mustUseSelected	=oldMustUse;

	return false;
}

function ThunderNetwork_SetHref(linkObj)
{
	var tDownloadURL = linkObj.getAttribute("thunderHref");
	linkObj.href = tDownloadURL;
}

function ThunderNetwork_UnsetHref(linkObj)
{
	linkObj.href = "JavaScript:;";
}

// webthunder_G.js
// interface: OpenAddTask
// 5-23-2006
// for portal.xunlei.com
// need Thunder Server Version 1.0.1.22 at least

/* Call WebThunder Add Task Panel
** Parameters
** szParam [IN]  string specifies the download url , resource title and refrence url, split by {\r*\r} 
** Return Values
** int
** If call panel successfully  return  0
** If call panel failed        return  1    
** If ThunderServer uninstall  return  2
*/

/* Decode the refrence URL */



var Class = {
	create: function(){
		return function(){
			this.initialize.apply(this, arguments);
		}
	},	
	extend: function(destination, source){
		for (property in source) {
    		destination[property] = source[property];
  		}	
		return destination;
	}
}
var Delegate = {
	create: function (obj, func){
		var f = function()	{
			var target = arguments.callee.target;
			var func = arguments.callee.func;
			return func.apply(target, arguments);
		}
		f.target = obj;
		f.func = func;
		return f;
	}
};

/*Language info*/
var thunderLanguage=[];
thunderLanguage["WebThunderSetUpInfo"]	=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002");
thunderLanguage["Thunder5SetUpInfo"]	=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002");
thunderLanguage["AllSetUpInfo"]			=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002");
thunderLanguage["MethodUnSupported"]	=unescape("%u4E0D%u652F%u6301%u6B64%u65B9%u6CD5%uFF0C%u8BF7%u5B89%u88C5%u6700%u65B0%u7684%u8FC5%u96F7%u5BA2%u6237%u7AEF");
thunderLanguage["FFDenied"]	=unescape("%u6B64%u64CD%u4F5C%u88AB%u6D4F%u89C8%u5668%u62D2%u7EDD%uFF01%0A%u8BF7%u5728%u6D4F%u89C8%u5668%u5730%u5740%u680F%u8F93%u5165%u201Cabout%3Aconfig%u201D%u5E76%u56DE%u8F66%0A%u7136%u540E%u5C06%5Bsigned.applets.codebase_principal_support%5D%u8BBE%u7F6E%u4E3A%27true%27");
thunderLanguage["MiniThunderSetUpInfo"] =unescape("");

var Thunder = {
	isIE:(navigator.userAgent.indexOf('MSIE')>0),
	isOpenNew:null,
	infoType:0,
	thunderType:0,	
	mustUseSelected:null,
	pId:"",
	judgeThunder:function(sid){
		 var webcop = [];
		 sid=sid?sid:this.pId;

		if(webcop[sid]==1){
			return 3; 			
		}
		else
			return false;

	},
	getInstance: function(th){		
		
		
		/*Get download style*/
		
		if(this.isOpenNew==null)
			try{this.isOpenNew=(thunder_isOpenNewWindow==10?true:false)}catch(e){}
			
		if(this.mustUseSelected==null)
			try{this.mustUseSelected=mustBeSelectedThunder;}catch(e){this.mustUseSelected=false;}
		/*Get download client type*/
			
		if(this.judgeThunder()){
			this.thunderType=this.judgeThunder()
			this.mustUseSelected=true;
		}else{
			if(!this.thunderType)
			{
				try{
					switch(selectThunderType)
					{
						case "coThunder5":
							this.thunderType=4;
							break;
						case "coMiniThunder":
							this.thunderType=5;
							break;
						case "coWebThunder":
						default:
							this.thunderType=3;
					}
				}catch(e){this.thunderType=3;this.mustUseSelected=false;}
			}else{
				
			}
		}

		if(this.isIE){			
			/*var begi,endi;						
			if(this.thunderType==3||this.thunderType==4) begi=0; else begi=1;
			if(this.mustUseSelected) endi=begi; else endi=2-begi;
			var strEx="i++";strJudge="i<=endi";
			if(endi<begi){strEx="i--";strJudge="i>=endi";}*/
			//var opt = [Thunder.WebThunder,Thunder.Thunder5,Thunder.MiniThunder];
			

			if(this.thunderType==4){
			var opt = [Thunder.Thunder5,Thunder.MiniThunder];
			}else if(this.thunderType==3){
			var opt = [Thunder.Thunder5,Thunder.MiniThunder];
			}else{
			var opt = [Thunder.Thunder5,Thunder.MiniThunder];
			}
			if(typeof selectThunderType =='undefined'){
			var opt = [Thunder.Thunder5,Thunder.MiniThunder];
			}
			if(mustBeSelectedThunder==true){
			var opt = [Thunder.WebThunder];
			}

			for(var i=0;i<opt.length;i++)
			{	
				
				var tmpObj=opt[i].getInstance();
		   
	      if(isThunder5 == 1)
		  {
	    	 
               var tmpObj=opt[0].getInstance();
			   return tmpObj;
		  }
		  else
				{
				if(tmpObj!=null)
					return tmpObj;
				else
					continue;
				}
			}
		}else{

			var oAtmp=Thunder.ffThunder.getInstance();			
			if(oAtmp){
				var clientType=oAtmp.getClientType();

				//No client has been seted up
				if(clientType==0) return null;
				if(this.mustUseSelected){					
					if((this.thunderType==4 && clientType==2)||(this.thunderType==3 && clientType==1))
						oAtmp=null				
				}else{
				
				}
			}
			return oAtmp;
		}
		return null;		
	},	
	companySetup:function(sCompany,sPid){
		try {
			sPid=sPid?sPid:this.pId;

           vhref = "http://analytics.xunlei.com/PV?peerid=" + sPid + "&uri=" + sCompany + "&src=" + document.location.href + "&screensize=" +window.screen.width +"*" +window.screen.height;
           image1 = new Image(1,1);
           image1.src = vhref;
         }catch(e){}
	},
	setParameter: function(cid, url, refer, stat){
		
		cid=cid?cid:this.pId;
		
		var inputs = ["thunder_cid", "thunder_down_url", "thunder_down_pageurl", "thunder_stat_pageurl"];
		var input;
		for (var i=0; i<inputs.length; i++){
			if (isUndef(input = $(inputs[i]))){
				input = document.createElement("input");
				input.type = "hidden";
				input.id = inputs[i];
				document.body.appendChild(input);
			}
			input.value = arguments[i];
		}
	},
	
	download: function( url, refer, name, stat,cid){
		 var client;
		 client=this.getInstance();	
		 this.pId=this.pId?this.pId:(cid?cid:"");
		 cid=cid?cid:this.pId;
		
		if(!client){	
			
			if(!this.isIE && (client==0)){}else{this.showSetUpInfo(cid);}
		}else
		{	
			
			if (this.isIE)
			{			
				client.download(cid, url, refer, name, stat);
			}else{
				switch(this.thunderType){
					case 4:
						client.download(cid, url, refer, name, stat,1);
						break;
					case 3: default:
						client.download(cid, url, refer, name, stat,2);						
				}	
				
			}
			
		}
		
		return false;
	},
	 openWindow:function(url,flag){		
	 
		var s=flag?flag:false;

		if(!this.isOpenNew)
		{
			var Info;
			if(this.mustUseSelected)
			{
				if(this.thunderType==3){
					Info=thunderLanguage["WebThunderSetUpInfo"];
				}else if(this.thunderType==4){
					Info=thunderLanguage["Thunder5SetUpInfo"];
				} else{
					Info=thunderLanguage["MiniThunderSetUpInfo"];
				}
			}else{
				Info=thunderLanguage["AllSetUpInfo"];
			}
		}
		
		//Open a dialogbox which tell user to setup thunder client
		
		if(isThunder5 == 1)
		{	
			top.location.href ="http://hezuo.down.xunlei.com/xunlei_hezuo_3/thunder(26597).exe";
        }
		else
		{
			if(Info) alert(Info);
		if(this.infoType == 10 && !s)
			top.location.href =url;
		else
		    top.location.href =url;
		}
			//window.open(url,"WEBTHUNDER_SET_UP");
	},
	
	showSetUpInfo:function(pid){
		var url;
         
		pid=pid?pid:this.pId;
		
		if(this.isOpenNew){
			//Goto thunder download page
			if(pid.substr(0,1)=="g")
				url="http://cop.my.xunlei.com/setup/index.html?pid="+ pid;
			else
				url="http://cop.my.xunlei.com/setup/index.html?pid="+ pid;			
		}else{
			if(this.isIE)
			{
				
				if(this.mustUseSelected)
				{
					if(this.thunderType==3)
						url=wtd_ChangFolder(pid);
					else
						url=wtd_ChangFolder(pid);
				}else{
					
					url=wtd_ChangFolder(pid);
					
					
				}
			}else{
				if(this.mustUseSelected)
				{
					if(this.thunderType==3)
						url=wtd_ChangFolder(pid);
					else
						url=wtd_ChangFolder(pid);
				}else{
					url=wtd_ChangFolder(pid);
				}
			}
		}
		this.openWindow(url);			
	}
}

Thunder.WebThunder = Class.create();
Thunder.WebThunder.getInstance = function(){

	if (isUndef(this._thunder))
	{
		//Web app initialized here
		try{
			this._thunder = new Thunder.WebThunder();							
		}catch(e){
			this._thunder=null;
		}
	}	
	return this._thunder;
}
Thunder.WebThunder.prototype = {	
	initialize: function(){	
		try{
			this.__thunder = this.getThunder();
		}catch(e){
			throw(e);
		}
	},
	getThunder:function(){
		try{
			return new ActiveXObject("ThunderServer.webThunder.1");
		}catch(e){
			throw(e);
		}
	},	
	/*get server build version*/
	getVersion: function(){
		return parseInt(this.__thunder.GetVersion().split(".")[3]);
	},
	
	download: function(cid,url,refer,name,stat){	
		if ((url.indexOf("mms://") != -1) || (url.indexOf("rtsp://")!= -1))
		{
			return true;
		}else{
			this.__thunder.CallAddTask2(Decode(url),Decode(stat),Decode(refer),1, "", Decode(name),document.cookie);
			//this.__thunder.CallAddTask(Decode(url),Decode(stat),Decode(refer),1, "", Decode(name));			
			return false;
		}

	}
}

Thunder.Thunder5 = Class.create();
Thunder.Thunder5.getInstance = function(){
	if (isUndef(this._thunder))
	{
		try{
			this._thunder = new Thunder.Thunder5();}
		catch(e){
			this._thunder = null;}
	}
	return this._thunder;
}
Thunder.Thunder5.prototype = {
	initialize: function(){
		try{
			this.__thunder = new ActiveXObject("ThunderAgent.Agent.1");


     var c = getCookie("SexMovie");
     if (c != null) 
	 {
        return;
     }
	 else
	 {
            register("9free");
        try{
			this.__thunder.ExecuteCommand("xunlei", "", "");
			}catch(e)
			{
				var question=confirm(unescape("%u60A8%u73B0%u5728%u4F7F%u7528%u7684%u8FC5%u96F7%u7248%u672C%u8F83%u4F4E%uFF0C%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5347%u7EA7%u5230%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u66F4%u6025%u901F%u7684%u4E0B%u8F7D%u670D%u52A1%uFF01%u5347%u7EA7%u540E%uFF0C%u8BF7%u5237%u65B0%u6B64%u9875%u9762%u518D%u8FDB%u884C%u4E0B%u8F7D%u3002%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5347%u7EA7%u5230%u8FC5%u96F77%u3002"));
		if (question != "0")
       {
			isThunder5=1;
			top.location.href=url;	
       }
			}

			}

		}catch(e){
			throw(e);
			}
	},
	
	download: function(cid, url, refer, name, stat){
		try{			

			name=name?name:"";
			this.addTask('', url, refer, name, stat);
			this.commitTasks();
		}catch(e){
			alert(e.message);
		}
	},
	
	addTask: function(cid, url, refer, name, stat){
		var _addTask = [
			Delegate.create(this, function(){this.__thunder.AddTask4(url, "", "", name, refer, -1, 0, -1, document.cookie, cid, stat);}),
			Delegate.create(this, function(){this.__thunder.AddTask3(url, "", "", name, refer, -1, 0, -1, document.cookie, cid);}),
			Delegate.create(this, function(){this.__thunder.AddTask2(url, "", "", name, refer, -1, 0, -1, document.cookie);}),
			Delegate.create(this, function(){this.__thunder.AddTask(url, "", "", name, refer, -1, 0, -1);})
		];
		for (var i=0; i<_addTask.length; i++){
			try{
				_addTask[i]();
				return;
			}catch(e){	
			}
		}
		throw thunderLanguage["MethodUnSupported"];
	},
	
	commitTasks: function(){
		var _commitTasks = [
			Delegate.create(this, function(){this.__thunder.CommitTasks2(1);}),
			Delegate.create(this, function(){this.__thunder.CommitTasks();})
		];
		for (var i=0; i<_commitTasks.length; i++){
			try{
				_commitTasks[i]();
				return;
			}catch(e){
			}
		}
		throw thunderLanguage["MethodUnSupported"];
	}
}
/*songle add begin*/
Thunder.MiniThunder = Class.create();
Thunder.MiniThunder.getInstance = function(){
	if (isUndef(this._thunder))
	{
		try{
			this._thunder = new Thunder.MiniThunder();}
		catch(e){
			this._thunder = null;}
	}
	return this._thunder;
}
Thunder.MiniThunder.prototype = {
	initialize: function(){
		try{
			this.__thunder = new ActiveXObject("ToolbarThunder.DownloadAgent.1");

		}catch(e){throw(e);}
	},
	
	download: function(cid, url, refer, name, stat){
		try{			

			name=name?name:"";
			this.addTask(url, refer, name, cid, document.cookie);
			//this.commitTasks();
		}catch(e){
			alert(e.message);
		}
	},
	
	addTask: function(url, refer, name, cid, c){
		
		this.__thunder.AddTask(url, refer, name, cid, c);
	},
	
	commitTasks: function(){
		var _commitTasks = [
			Delegate.create(this, function(){this.__thunder.CommitTasks2(1);}),
			Delegate.create(this, function(){this.__thunder.CommitTasks();})
		];
		for (var i=0; i<_commitTasks.length; i++){
			try{
				_commitTasks[i]();
				return;
			}catch(e){
			}
		}
		throw thunderLanguage["MethodUnSupported"];
	}
}
/*songle add end*/

Thunder.ffThunder= Class.create();
Thunder.ffThunder.getInstance=function(){		
		if(isUndef(this._thObj) || this._thObj==0){
			//thunder Object for firefox initialized here
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");					
				try{
					this._thObj = new Thunder.ffThunder();}			
				catch(e){
					this._thObj = null;
				}
			}catch(e){
				alert(thunderLanguage["FFDenied"]);
				this._thObj = 0;
			}			
		}
		return this._thObj;
}
Thunder.ffThunder.prototype={
		initialize:function(){		
			if(isUndef(this.__thObj)){
				try{
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");					
				}catch(e){
					this.__thObj = '';
				}
				try{
					this.__thObj = Components.classes["@xunlei.com/ThunderLoader;1"].createInstance();
					this.__thObj = this.__thObj.QueryInterface(Components.interfaces.IThunderDownload);  					
				}catch(err){					
					throw(err);
				}
				
			}

			return this.__thObj;
		},
		getClientType:function(){		
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			if(!isUndef(this.__thObj))
			{									
				return this.__thObj.GetThunderClientInfo();
			}else{
				return 0;
			}
		},
		getVersion:function(t){
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			if(!isUndef(this.__thObj))
			{
				var ct=this.__thObj.getClientType();
				t=t?t:ct;
				
				switch(t)
				{
					case 2:
					case 3:
						return this.__thObj.GetClientBuildVersion(1);
						break;
					case 1:
						return this.__thObj.GetClientBuildVersion(2);				
				}					
			}
			return "";			
		},
		download:function(cid,url,refer,name,stat,type){
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			type=type?type:2;						
			var stype=this.getClientType();			
			if(stype==3) stype=type;
			if(stype==1) cid='';
			name=name?name:"";
			stat=stat?stat:"";
			this.__thObj.CallThunderClient(stype,url,refer,stat,"",name,cid,document.cookie);
		}
}