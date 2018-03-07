
function Jtrim(str)
{
        var k = 0;
        var len =str.length;
        if ( str == "" ) return( str );
        t= len -1;
        flagbegin = true;
        flagend = true;
        while ( flagbegin == true && k< len)
        {
           if ( str.charAt(k) == " " )
                {
                  k=k+1;
                  flagbegin=true;
                }
                else
                {
                        flagbegin=false;
                }
        }

        while  (flagend== true && t>=0)
        {
            if (str.charAt(t)==" ")
                {
                       t=t-1;
                        flagend=true;
                }
                else
                {
                        flagend=false;
                }
        }

        if ( k > t ) return ("")

        trimstr = str.substring(k,t+1);
        return trimstr;
        
}

function checkerrorstr(str)
{
  if (str.indexOf("=")!=-1 | str.indexOf("%")!=-1 | str.indexOf("?")!=-1 | str.indexOf("&")!=-1 |str.indexOf(";")!=-1 | str.indexOf("'")!=-1 )
  {
    return false;
  }
  return true;
}

String.prototype.length2 = function() {
    var cArr = this.match(/[^\x00-\xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
}
function isemail (s)
{
        // Writen by david, we can delete the before code
        if (s.length > 255)
        {
                window.alert("email地址长度不能超过255位！");
                return false;
        }

         var regu = "^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$";
         var re = new RegExp(regu);
         if (s.search(re) != -1) {
               return true;
         } else {
               window.alert ("请输入有效合法的E-mail地址 ！");
               return false;
         }
}

function ISEMAIL (s)
{
        // Writen by david, we can delete the before code
        if (s.length > 255)
        {
               // window.alert("email地址长度不能超过255位！");
                return false;
        }

         var regu = "^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$";
         var re = new RegExp(regu);
         if (s.search(re) != -1) {
               return true;
         } else {
            //   window.alert ("请输入有效合法的E-mail地址 ！");
               return false;
         }
}
function istel(s)
{
         //var regu = "^[0-9][0-9-]{1,24}$";
         //var regu = "^\d{8}\d*$";
         var regu = "0\\d{2,3}-\\d{7,8}"; 
         var re = new RegExp(regu); 
         //alert(s+"|"+re);
         if (s.search(re) != -1) {
               return true;
         } else {
               return false;
         }
}

function isnum(s)
{
         var regu = "^[0-9]{1,24}$";
         var re = new RegExp(regu);
         if (s.search(re) != -1) {
               return true;
         } else {
               return false;
         }
}

function isIP(str)
{
     var re = /^((0{0,2}[1-9])|(0?[1-9][0-9])|(1[0-9][0-9])|(2[0-2][0-9])|(23[0-3]))\.((0{0,2}[0-9])|(0?[1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))\.((0{0,2}[0-9])|(0?[1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))\.((0{0,2}[0-9])|(0?[1-9][0-9])|(1[0-9][0-9])|(2[0-4][0-9])|(25[0-5]))$/;     
	 
     if ((str.search(re) == -1))
     {         
         return false;
	 }
     return true;   
}

function replacePos(strObj, pos, replacetext)
{
   var str = strObj.substr(0, pos-1) + replacetext + strObj.substring(pos, strObj.length);
   return str;
}

function checkcustomer()
{
   var flag=true;
   var returntext="";
   var cname = Jtrim(document.getElementById("cname").value);
   var cnameimg_src="images/right.gif";
   var cnameStr="";
   document.getElementById("returnflag").value="true"
   document.getElementById("cnameflag").style.display="";
   if(cname=="")
   {
	   returntext="用户名不能为空！"
	   document.getElementById("returnflag").value="false"
	   flag=false; 
   }
   if(flag)
   {
	     checkajax(cname,"1")
   }
   else
   {
	     cnameimg_src="images/wrong.gif";
	     cnameStr=returntext;
		 document.getElementById("cnameStr").innerText =cnameStr
		 document.getElementById("cnameimg").src=cnameimg_src;		            

   }
   
 //  alert(document.getElementById("returnflag").value)
 
   
   return flag;           
} 

function checkajax(tempcname,type)  //type 1：表示根据用户名去查找  2 ：表示根据学校代码去查找
{
	var http_request = false;
	
	 var returntext="";
	if(window.XMLHttpRequest) 
	  { 
	     
	  	http_request = new XMLHttpRequest();
	      if (http_request.overrideMimeType) {//设置MiME类别
	          http_request.overrideMimeType("text/xml");
	      }
	  }
	  else 
	  if (window.ActiveXObject)
	  { 
	      try 
	      {
	          http_request = new ActiveXObject("Msxml2.XMLHTTP");
	      } 
	      catch (e) {
	          try {
	              http_request = new ActiveXObject("Microsoft.XMLHTTP");
	          } catch (e) {}
	      }
	  }
	  if (!http_request) {
	      return true;
	  }
	  objxml = new ActiveXObject("Microsoft.XMLDOM");
	  objxml.async=false;
	  
	  http_request.onreadystatechange = function()
	  {
	    if (http_request.readyState == 4) // 调用完毕
	    {
	         if (http_request.status == 200) // 加载成功
	         {
	            returntext=http_request.responseText
	            
	    	    var cnameimg_src="images/right.gif";
	    	    var cnameStr="";
	    	     if(returntext!="")
	    	     {
	    		     cnameimg_src="images/wrong.gif";
	    		     cnameStr=returntext;
	    		     document.getElementById("returnflag").value="false";  //用于前面的判断
	    	         
	    	     }
	    	     if(type==1)
	    	     {
	    		   document.getElementById("cnameStr").innerText =cnameStr
	    		   document.getElementById("cnameimg").src=cnameimg_src;	
	    	     }
	    	     else
	    	     {
		    		   document.getElementById("scodeStr").innerText =cnameStr
		    		   document.getElementById("scodeimg").src=cnameimg_src;	
	    	    	 
	    	     }
	            
	         }
	     }
	   }  
	   var cname=encodeURI(encodeURI(tempcname))
	   var url="../cloudcenter/CheckCustomer?cname="+cname+"&type="+type
	   http_request.open("post", url,true);
	   http_request.send(objxml); 
}

function checkpassword1()
{
  var flag=true;
  var password1=Jtrim(document.getElementById("mypassword1").value);
  document.getElementById("mypassword1flag").style.display="";
   var mypassword1img_src="images/right.gif";
  var passwordStr1="";
  
  if(password1=="")
  {
    mypassword1img_src="images/wrong.gif";
    passwordStr1="输入密码不能为空！";
    flag=false;
  }
  if(password1.length<6)
  {
	    mypassword1img_src="images/wrong.gif";
	    passwordStr1="输入的密码位数不能小于6位！";
	    flag=false;
	  
  }
  document.getElementById("passwordStr1").innerText =passwordStr1
  document.getElementById("mypassword1img").src=mypassword1img_src;
  return flag
}

function checkpassword2()
{
   var flag=true;
   var passowrd1=document.getElementById("mypassword1").value;
   var passowrd2=document.getElementById("mypassword2").value;
   document.getElementById("mypassword2flag").style.display="";
   var mypassword2img_src="images/right.gif";
   var passwordStr2="";
   if((passowrd2=="") || (passowrd1!= passowrd2))
   {
      mypassword2img_src="images/wrong.gif";
      passwordStr2 ="密码确认错误！"
      flag=false;
    }
  document.getElementById("passwordStr2").innerText =passwordStr2
  document.getElementById("mypassword2img").src=mypassword2img_src;
  return flag;

}

function checkschoolname()
{
  var flag=true;
  var sname=Jtrim(document.getElementById("sname").value);
  document.getElementById("snameflag").style.display="";
   var snameimg_src="images/right.gif";
  var snameStr="";
  if(sname=="")
  {
    snameimg_src="images/wrong.gif";
    snameStr="输入学校名称不能为空！";
    flag=false;
  }
 document.getElementById("snameStr").innerText =snameStr
 document.getElementById("snameimg").src=snameimg_src;
 return flag;
}

function checkserverip()
{
  var flag=true;
  var serverip=Jtrim(document.getElementById("serverip").value);
  document.getElementById("serveripimg").style.display="";
   var serveripimg_src="images/right.gif";
  var serveripStr="";
  if(serverip=="")
  {
    serveripimg_src="images/wrong.gif";
    serveripStr="服务器IP不能为空！";
    flag=false;
  }
  if(!isIP(serverip))
  {
     serveripimg_src="images/wrong.gif";
     serveripStr="请输入正确的IP地址！";
     flag=false;
  }
  document.getElementById("serveripStr").innerText =serveripStr
 document.getElementById("serveripimg").src=serveripimg_src;
  return flag;
}
function checkwebip()
{
	var flag=true;
    var webip=Jtrim(document.getElementById("webip").value);
    document.getElementById("webipimg").style.display="";
     var webipimg_src="images/right.gif";
    var webipStr="";
    if(webip=="")
    {
      webipimg_src="images/wrong.gif";
      webipStr="网站IP不能为空！";
      flag=false;
    }
    if(!isIP(webip))
    {
       webipimg_src="images/wrong.gif";
       webipStr="请输入正确的IP地址！";
       flag=false;
    }
    document.getElementById("webipStr").innerText =webipStr
   document.getElementById("webipimg").src=webipimg_src;
    return flag;
 }



function checkscode()
{
  var flag=true;
   var scode=Jtrim(document.getElementById("scode").value);
   document.getElementById("returnflag").value="true"
   document.getElementById("scodeimg").style.display="";
    var scodeimg_src="images/right.gif";
   var scodeStr="";
   if(scode=="")
   {
     scodeimg_src="images/wrong.gif";
     scodeStr="学校代码不能为空！";
     flag=false;
   }
   if(flag)
   {
	     checkajax(scode,"2")
   }
   /*
   else
   {
	     cnameimg_src="images/wrong.gif";
	     cnameStr=returntext;
		 document.getElementById("cnameStr").innerText =cnameStr
		 document.getElementById("cnameimg").src=cnameimg_src;		            

   }
   */
    document.getElementById("scodeStr").innerText =scodeStr
   document.getElementById("scodeimg").src=scodeimg_src;
    return flag
}


function checkremail()
{
	var flag=true;
   var remail=Jtrim(document.getElementById("remail").value);
   document.getElementById("remailflag").style.display="";
    var remailimg_src="images/right.gif";
   var remailStr="";
    if(remail!="")
   {
     if(!ISEMAIL(remail))
     {
          remailimg_src="images/wrong.gif";
         remailStr="请输入有效的Email！";
         flag=false;
       
     }
   }
   document.getElementById("remailStr").innerText =remailStr
   document.getElementById("remailimg").src=remailimg_src;
   return flag;
}