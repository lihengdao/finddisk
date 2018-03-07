var Prototype = {
  Version: '1.6.0.2',
  Browser: {
    IE:     !!(window.attachEvent && !window.opera),
    Opera:  !!window.opera,
    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
  },
  BrowserFeatures: {
    XPath: !!document.evaluate,
    ElementExtensions: !!window.HTMLElement,
    SpecificElementExtensions:document.createElement('div').__proto__ && document.createElement('div').__proto__ !== document.createElement('form').__proto__
  },
  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  emptyFunction:function(){},
  K:function(x){return x},
  Destroy:function(){
    var fw=Function.prototype;
    for(var p in fw)delete fw[p];
    fw=Function;
    for(var p in fw)delete fw[p];
    fw=Date.prototype;
    for(var p in fw)delete fw[p];
    var fw=Date;
    for(var p in fw)delete fw[p];
    fw=RegExp.prototype;
    for(var p in fw)delete fw[p];
    fw=RegExp;
    for(var p in fw)delete fw[p];
    fw=String.prototype;
    for(var p in fw)delete fw[p];
    fw=String;
    for(var p in fw)delete fw[p];
    fw=Template.prototype;
    for(var p in fw)delete fw[p];
    fw=Template;
    for(var p in fw)delete fw[p];
    fw=Enumerable.prototype;
    for(var p in fw)delete fw[p];
    fw=Enumerable;
    for(var p in fw)delete fw[p];
    fw=Array.prototype;
    for(var p in fw)delete fw[p];
    fw=Array;
    for(var p in fw)delete fw[p];
    fw=Number.prototype;
    for(var p in fw)delete fw[p];
    fw=Number;
    for(var p in fw)delete fw[p];
    fw=Hash.prototype;
    for(var p in fw)delete fw[p];
    fw=Hash;
    for(var p in fw)delete fw[p];
    fw=Event.prototype;
    for(var p in fw)delete fw[p];
    fw=Event;
    for(var p in fw)delete fw[p];
  }
};

//只有32位的IE浏览器才能检索ocx插件是否安装  返回的 flag：true 表示除了32位的IE浏览的其他浏览器，不能正常检测到的、   flag:ok 表示ocx插件已经安装 、 flag:false 表示ocx插件没有安装
function CheckOcx_ie(){

	var flag="true";
 	var ce;
    try{
	    ce =document.getElementById('progocx');
	    if(!ce)
	    {
	    	var d=document.createElement('span');
	    	d.innerHTML='<object id=\'progocx\' style=\'width:0;height:100%\' classid=\'clsid:34C21C24-4EB1-40A9-AB74-9C274DC23F46\'></object>';  // D9C7A2C3-188A-4F04-A1D0-664F4FDE314A    88B394A8-8040-4416-8B28-62A085C6DEC8
	        document.body.appendChild(d);
	        ce=document.getElementById('progocx');
	    }
		try
		{
			
	          var runok=ce.testrun();
	          flag="ok";
	          
		}
		catch(e){
			if(Prototype.Browser.IE&&navigator.platform.toLowerCase()=='win32')
			{
				flag="false";
			    
			}
	}
    }catch(e)
    {
    	
    	 
    }
    
	if(Prototype.Browser.IE&&navigator.platform.toLowerCase()=='win32')
	 {
	    if (!ce)
	    { 
	    	flag=false;
	    };
	}
	return flag;

}

function displayerrordiv(isoid,flag)
{
	var errordiv=$("#isoerror_div");
	errordiv.show();
    var adivname=isoid+flag+"_img";
      
    var aobj=$("#"+adivname+"");
    
    var divx=aobj.offset().left-200;
    var divy=aobj.offset().top-180;
    errordiv.css("left",divx);
    errordiv.css("top",divy);
}

function continueruniso()
{
	var isourl=$("#runisourl").val();
	submitiso(isourl,"_blank");
	
	
}

function submitiso(isourl,targetflag)
{
   
  	var f=document.getElementById('progForm');
    if(!f){f=document.createElement('form');f.id='progForm';f.name='progForm';f.style.display='none';document.body.appendChild(f);}
    f.action=isourl;
    f.method='post';
    f.target=targetflag;
    f.submit();
}
function displayothererrordiv(isoid,flag)
{
	var errordiv=$("#error1_div");
 	errordiv.show();
    var adivname=isoid+flag+"_img";
     var aobj=$("#"+adivname+"");
     var divx=aobj.offset().left-150;
	var divy=aobj.offset().top+32;
    errordiv.css("left",divx);
    errordiv.css("top",divy);       
}






var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; 
var base64DecodeChars = new Array( 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, 
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, 
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1); 

function base64encode(str) { 
    var out, i, len; 
    var c1, c2, c3; 

    len = str.length; 
    i = 0; 
    out = ""; 
    while(i < len) { 
    c1 = str.charCodeAt(i++) & 0xff; 
    if(i == len) 
    { 
        out += base64EncodeChars.charAt(c1 >> 2); 
        out += base64EncodeChars.charAt((c1 & 0x3) << 4); 
        out += "=="; 
        break; 
    } 
    c2 = str.charCodeAt(i++); 
    if(i == len) 
    { 
        out += base64EncodeChars.charAt(c1 >> 2); 
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)); 
        out += base64EncodeChars.charAt((c2 & 0xF) << 2); 
        out += "="; 
        break; 
    } 
    c3 = str.charCodeAt(i++); 
    out += base64EncodeChars.charAt(c1 >> 2); 
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)); 
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6)); 
    out += base64EncodeChars.charAt(c3 & 0x3F); 
    } 
    return out; 
} 

function base64decode(str) { 
    var c1, c2, c3, c4; 
    var i, len, out; 

    len = str.length; 
    i = 0; 
    out = ""; 
    while(i < len) { 
    /* c1 */ 
    do { 
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]; 
    } while(i < len && c1 == -1); 
    if(c1 == -1) 
        break; 

    /* c2 */ 
    do { 
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]; 
    } while(i < len && c2 == -1); 
    if(c2 == -1) 
        break; 

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4)); 

    /* c3 */ 
    do { 
        c3 = str.charCodeAt(i++) & 0xff; 
        if(c3 == 61) 
        return out; 
        c3 = base64DecodeChars[c3]; 
    } while(i < len && c3 == -1); 
    if(c3 == -1) 
        break; 

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2)); 

    /* c4 */ 
    do { 
        c4 = str.charCodeAt(i++) & 0xff; 
        if(c4 == 61) 
        return out; 
        c4 = base64DecodeChars[c4]; 
    } while(i < len && c4 == -1); 
    if(c4 == -1) 
        break; 
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4); 
    } 
    return out; 
} 
