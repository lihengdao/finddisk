    var lock=0;
    var iscountrycenter=0;//用于判断全国中心检索之后是否已经有列表列出
    var globservernum=0;      
    var tempservernum=0;
     function getCookie(name){ //获取cookes
           var r = new RegExp("(^|;|\s)*"+name+"=([^;]*)(;|$)");
           var m = document.cookie.match(r);
           return (!m?"":m[2]);
        }
        
     function setCookie(name,value)
     {
        var nowdate= new Date();
        nowdate.setMinutes(nowdate.getMinutes()+1); //cookes的有效时间为1分钟，在这地分钟里面，上次请求不成功能的服务器将被抛掉
        document.cookie = name+"="+value+";expires="+nowdate.toGMTString();
      }
      
      function deleteCookie(name)
     {
       document.cookie = name+"=;expires="+(new Date(0)).toGMTString();
     }
     //判断prog是否安装
      function checksetupprog()  
      {
    	  return true;
    	 if (window.ActiveXObject)  //只有IE才判断
        {
 	     try{
			 var   Player;
			
			 Player=new   ActiveXObject("ProgInstallCheck.CheckClass");
			 delete Player;
			 return true;
		  }catch(e){
			alert("请首先下载安装ProG网络虚拟光驱！");
			document.location.href = "download/Setup_WebClient.exe";
			return false;
		  }

        }
    	else
    		return true;

    	  
 
      }

    function Send_request(url,serverip) 
    {
        var resultstr="";
            var ind=0;
            var http_request = false;
        http_request = false;
      
        if(window.XMLHttpRequest) 
        { 
          
        	http_request = new XMLHttpRequest();
          //  if (http_request.overrideMimeType) {//设置MiME类别
           //     http_request.overrideMimeType("text/xml");
           // }
        }
        else if (window.ActiveXObject)
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
            return resultstr;
        }
        objxml = new ActiveXObject("Microsoft.XMLDOM");
        objxml.async=false;
        
        http_request.onreadystatechange = function()
         {
         
          if (http_request.readyState == 4) // 调用完毕
          {
          lock=0;
       
           if (http_request.status == 200) // 加载成功
           {
               var xmlstr;
               xmlstr=http_request.responseText;
               now=new Date(); 
               
               Send=now.getSeconds(); 
               
               Mend=now.getMinutes(); 
               Milliseconds_end=now.getMilliseconds();
                seconds=(Mend*60+Send)-(Mstart*60+Sstart);//计算时间
               Mseconds=(Mend*60*1000+Send*1000+Milliseconds_end)-(Mstart*60*1000+Sstart*1000+Milliseconds_start);
               returnlength=xmlstr.length;
               pingnum=(returnlength/(Mseconds/1000)/1024); //得到的带宽
               
               parseXmlAndGreatTb(xmlstr,seconds,pingnum);  //根据返回的xml,把记录插入到表格中,即显示光盘列表
               
               var exitips=getCookie("exitips");  //全国中心不需要访问的ips
               if(exitips.indexOf(serverip)<0) 
            	   exitips=exitips+" "+ serverip;
               setCookie("exitips",exitips);
               
               
               
          
           }
           else
           {
              var ips=getCookie("myips"); //如果调用不成功，则将服务器IP记录到Cookies中，在接下去的一分种将不会再次调用
              if(ips.indexOf(serverip)<0) 
              {
                 ips=ips+" "+serverip;
                 setCookie("myips",ips);
              }
           }
          }
         }  
         
         now=new Date(); 
         Sstart=now.getSeconds(); 
         Mstart=now.getMinutes(); 
         Milliseconds_start=now.getMilliseconds();
        // alert("2")
        // alert(Sstart)
         http_request.open("post", url,true);
               
        http_request.send(objxml);                   

        return "";
    }
    

  
  function theupdata()
  {
     var isbnstr=getISBN();
     var thenode = window.document.getElementsByTagName("TABLE");
     var subnode=thenode[0]; 
     child = subnode.getElementsByTagName("tr");
     var count=child.length;
     var ips=getCookie("myips");
      if(count>=1)  //表示有分中心的IP
     {
    	 
       var mytr=child[0];
       var ipliststr=mytr.innerText;
       
       var iplist=ipliststr.split("||");
       if(ipliststr!="")
       {
         for(i=0 ;i<iplist.length;i++)
         {
        	
           locationurl=window.location.toString();
           var thisstr = iplist[i].split(":");
            if(locationurl.indexOf(thisstr[0])<0)  //本机的就不需要列出来了
            {
            	
              // setTimeout("delay()", 5000);	
               var theurl="findOtherISO?uri="+iplist[i]+"&isbn="+isbnstr;
          
              var xmlstr;
              
	          lock=1;
	          if(ips.indexOf(iplist[i])<0) //去除上次调用不成功的服务器
	          {
	        	 
	              xmlstr=Send_request(theurl,iplist[i]);
	          }
            }
         }
         
       }
     }


     
  }

 
function delay()
{
	//alert("test");
  return "";
}
  
function startdata()
{
  setTimeout("theupdata()", 300);

}

 function parseXmlAndGreatTb(xmlstr,theseconds,pingnum)   //pingnum:客户端连资源服务器商的带宽值
  {
 	if (xmlstr!="")
    {
      
        var queryinfoxml = new ActiveXObject("Microsoft.XMLDOM");
      queryinfoxml.async=false;
      queryinfoxml.loadXML(xmlstr);
      var items = queryinfoxml.selectNodes("resource/ISO");
      for(j=0;j<items.length;j++)
      {
         var doc=items[j];
         var url=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/uri").text;
         var isoid=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/isoid").text;
         var hitcount=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/hitcount").text;
         var title=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/title").text;
         var downcount=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/downcount").text;
         var filesize=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/filesize").text;
         var drive=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/drive").text;
         var source=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/source").text;
         var WebShowRun=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/WebShowRun").text;
         var minBandWidthNode=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/minBandWidth"); //光盘类型所对应的最小带宽
         var CDHelpNode=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/CDHELP"); //光盘说明
         var XunLanDownTypeNode=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/XunLanDownType"); // 迅雷下载时通过FTP方式还是HTTP方式  0：FTP 1：HTTP 2:单服务器的http 

         var CDHelp="";
         if(CDHelpNode!=null)
        	 CDHelp=CDHelpNode.text;

         var minBandWidth=0;
         
         if(minBandWidthNode!=null)
        	 minBandWidth=minBandWidthNode.text;
         var XunLanDownTyp="";
         if(XunLanDownTypeNode!=null)
        	 XunLanDownTyp=XunLanDownTypeNode.text;

         var titlestr=title;
         var ckurl="";
         if(CDHelp.length>0)
         {
        	var ckurl="http://"+url+"/cdhelp.do?status=showhelp&ISOID="+isoid;
            titlestr=title+"&nbsp;&nbsp;<a href='"+ckurl+"'>说明</a>";
         }
  		 var filesizefloat=filesize/1024
		 filesizefloat=( Math.round(filesizefloat*100)/100);
  		 var tempdownload=hitcount+"/"+downcount
 
 		 //var resourcesys=document.getElementById("ResourceSys").value;  ////表示是省中心还是本地  0：本地  1：中心
        // var isopacurl=document.getElementById("isopacurl").value;  
         var tempstr=GetRunAndDownHtml2(isoid,url,"0",filesize,title,XunLanDownType);
    	 var isoidname="serverisoinfotd"+isoid;  
    	 $("<table width='700' border='0' align='center' cellpadding='0' cellspacing='0' background='images/new4.0_18.gif'>" +
         "<tr>" +
         "<td width='180' height='180' align='center' valign='middle' class='lan_14_02_b'><a title='"+source+"'><img src='images/new4.0_21.gif' width='118' height='118'></a></td>" +
         "<td width='520' align='left' valign='bottom' class='lan_14_02_b' id='"+isoidname+"'></td>" +
         "</tr>" +
         "<tr><td colspan='2' height='6' align='center' valign='middle' class='lan_14_02_b' background='images/new4.0_20.gif' ></td> </tr>"+
         "</table>").appendTo("#isorestable");
         
         $("<table width='518' border='0'cellpadding='0' cellspacing='0' class='hei_14_28h'>" +
         "<tr>" +
         "<td height='100' colspan='2' valign='top' >"+
         "<span class='juhuang'>光盘：</span>"+titlestr+"<br>" +
         "<span class='juhuang'>大小：</span>"+filesizefloat+"M<br>" +
         "<span class='juhuang'>浏览/下载：</span>"+tempdownload+"<br>" +
         "<td height='100' colspan='2' valign='top' ><input type='hidden' name='isovolume_center' value='"+titlestr+"'><input type='hidden' name='isoid_center' value='"+isoid+"'>" +
         "</td>" +
         "</tr>"+tempstr+
        
         "</table>").appendTo("#"+isoidname);
    }
   }

    
  }
 
  function parseXmlAndGreatTb_firfox(xmlstr,theseconds,pingnum)   //pingnum:客户端连资源服务器商的带宽值
  {
 	if (xmlstr!="")
    {
 	   queryinfoxml = document.implementation.createDocument("text/xml", "", null);
 	   queryinfoxml.loadXML(xmlstr);
       var items = queryinfoxml.selectNodes("resource/ISO");
       for(j=0;j<items.length;j++)
       {
  		 var url=items[j].selectSingleNode("uri").textContent;
         var isoid=items[j].selectSingleNode("isoid").textContent; 
         var hitcount=items[j].selectSingleNode("hitcount").textContent;  
         var title=items[j].selectSingleNode("title").textContent;  
         var downcount=items[j].selectSingleNode("downcount").textContent;  
         var filesize=items[j].selectSingleNode("filesize").textContent;   
         var drive=items[j].selectSingleNode("drive").textContent;   
         var source=items[j].selectSingleNode("source").textContent;   
         var minBandWidthNode=items[j].selectSingleNode("minBandWidth").textContent;   //光盘类型所对应的最小带宽
         var CDHelpNode=items[j].selectSingleNode("CDHELP");  //光盘说明
         var XunLanDownTypeNode=items[j].selectSingleNode("XunLanDownType");  // 迅雷下载时通过FTP方式还是HTTP方式  0：FTP 1：HTTP 2:单服务器的http
         var CDHelp="";
         if(CDHelpNode!=null)
        	 CDHelp=CDHelpNode.textContent; 

         var minBandWidth=0;
         
         if(minBandWidthNode!=null)
        	 minBandWidth=minBandWidthNode.textContent; 
         var XunLanDownTyp="1";
         if(XunLanDownTypeNode!=null)
        	 XunLanDownTyp=XunLanDownTypeNode.textContent; 

         var titlestr=title;
         var ckurl="";
         if(CDHelp.length>0)
         {
        	 //ckurl="http://"+url+"/CDHelp.jsp?ISOID="+isoid;
        	 ckurl="http://"+url+"/cdhelp.do?status=showhelp&ISOID="+isoid;
        	if(CDHelp.length>17)
        	{
        		CDHelp=CDHelp.substring(0,17); 
        		CDHelp=CDHelp+"&nbsp;&nbsp;<a href='"+ckurl+"' target='_blank'>查看</a>";
		   	}
 		  }
  		 var filesizefloat=filesize/1024
		 filesizefloat=( Math.round(filesizefloat*100)/100);
  		 var tempdownload=hitcount+"/"+downcount
 
 		 //var resourcesys=document.getElementById("ResourceSys").value;  ////表示是省中心还是本地  0：本地  1：中心
        // var isopacurl=document.getElementById("isopacurl").value;  
         var tempstr=GetRunAndDownHtml2(isoid,url,"0",filesize,title,XunLanDownType);
    	 var isoidname="serverisoinfotd"+isoid;  
    	 $("<table width='700' border='0' align='center' cellpadding='0' cellspacing='0' background='images/new4.0_19.gif'>" +
         "<tr>" +
         "<td width='180' height='180' align='center' valign='top' class='lan_14_02_b'><br><a title='"+source+"'><img src='images/new4.0_21.gif' width='120' height='140'></a><br></td>" +
         "<td width='520' align='left' valign='bottom' class='lan_14_02_b' id='"+isoidname+"'></td>" +
         "</tr>" +
         "<tr><td colspan='2' height='6' align='center' valign='middle' class='lan_14_02_b' background='images/new4.0_20.gif' ></td> </tr>"+
         "</table>").appendTo("#isorestable");
    	 var isoresstr="<span class='juhuang'>光盘：</span>"+titlestr+"<br>" +
				       "<span class='juhuang'>大小：</span>"+filesizefloat+"M<br>" +
				       "<span class='juhuang'>浏览/下载：</span>"+tempdownload+"<br>" ;
    	 if(ckurl!="")
    		 isoresstr=isoresstr+ "<span class='juhuang'>光盘说明：</span>"+CDHelp+"<br>" ;
         
         $("<table width='340' border='0'cellpadding='0' cellspacing='0' class='hei_14_28h'>" +
         "<tr><td height='20' colspan='2'></td></tr>"+
         "<tr>" +
         "<td height='100' colspan='2' valign='top'  background='images/new4.0_19_01.gif' style='table-layout:word-wrap:break-word;word-break:break-all'>"+isoresstr+
         "<td height='100' colspan='2' valign='top' ><input type='hidden' name='isovolume_center' value='"+titlestr+"'><input type='hidden' name='isoid_center' value='"+isoid+"'>" +
         "</td>" +
         "</tr>"+tempstr+
        
         "</table>").appendTo("#"+isoidname);

         
 
                  
    }
      
      
    
    }

    
  }
  
  function getimagefile(second)
  {
    var s;
    s=second;
    if (second>20)
      second=20;
    if(second % 2==0 && second!=0)
      s=second-1;
    s=10-parseInt(s/2);
    fileurl="qingqiu_"+s+".gif";
    //alert(fileurl);
    return fileurl;
    
  }
  
  function getSelectdisk(seldisk)
  {
   str="<input type='hidden' name='tempdrive'>";
   str=str+"<select name='Thedrive' tempname='1'>";
   if(seldisk=="Z")
     str=str+"<option value='Z' selected>Z</option>";
   else
     str=str+"<option value='Z'>Z</option>";
     
   if(seldisk=="Y")
     str=str+"<option value='Y' selected>Y</option>";
   else
     str=str+"<option value='Y'>Y</option>";
     
   if(seldisk=="X")
     str=str+"<option value='X' selected>X</option>";
   else
     str=str+"<option value='X'>X</option>";

   if(seldisk=="W")
     str=str+"<option value='W' selected>W</option>";
   else
     str=str+"<option value='W'>W</option>";

   if(seldisk=="U")
     str=str+"<option value='U' selected>U</option>";
   else
     str=str+"<option value='U'>U</option>";
   

   if(seldisk=="T")
     str=str+"<option value='T' selected>T</option>";
   else
     str=str+"<option value='T'>T</option>";


   if(seldisk=="S")
     str=str+"<option value='S' selected>S</option>";
   else
     str=str+"<option value='S'>S</option>";

   if(seldisk=="R")
     str=str+"<option value='R' selected>R</option>";
   else
     str=str+"<option value='R'>R</option>";
   str=str+"</select>";   
     return str;

  }
  
  
  
  function getISBN()
  {
     
	  var isbn=document.getElementById("isbn").value ;

     return isbn;
  }
  
  //通过ajax实现
  function SearchCountryCenter()
  {
	    //return true;
	    var globservernum=0;       //资源服务器的个数
	    var yunimgobj=window.document.getElementById("searchyunimg");
	    yunimgobj.src="images/no3.0_yun.gif";
	    var countryisotalble=window.document.getElementById("countryisotalble");
	     countryisotalble.style.display="";
	     var ccenterserverip=window.document.getElementById("ccenterserver").value;
	     var isbnstr=getISBN();
	     var thenode = window.document.getElementsByTagName("TABLE");
	     var exitips=getCookie("exitips");
	      if(ccenterserverip>="")  //表示共享资源服务中心
	     {
	    
	       var ipliststr=ccenterserverip;
	       var iplist=ipliststr.split("||");
	       if(ipliststr!="")
	       {
	    	 
	         for(i=0 ;i<iplist.length;i++)
	         {
	        	
	           locationurl=window.location.toString();
	          
	           var thisstr = iplist[i].split(":");
	           
	            if(locationurl.indexOf(thisstr[0])<0)  //本机的就不需要列出来了
	            { 
	               var theurl="findOtherISO?uri="+iplist[i]+"&isbn="+isbnstr;
	          
	               var xmlstr;
	              
		           lock=1;
		           if(exitips.indexOf(iplist[i])<0) //去除分中心已经被调用过的服务器
		          {
		        	   globservernum=globservernum+1;
		        	  
		               xmlstr=Send_countryrequest(theurl,iplist[i]);
		           }
	            }
	         }
	         
	       }
	     }	  
	    //  yunimgobj.src="images/3.0_yun.gif";
  }
  //通过JSON实现跨域请求
  function SearchCountryCenter_Json()
  {
	 iscountrycenter= $("#ISCountryCenter").val();
	 if(iscountrycenter=="1")   //表示没有启动全国中心
	 {
		 var isocount=$("#locisocount");  
		 if(isocount=="0")
            window.document.getElementById("noisotd").style.display="";
		 return;
	 }
		

	 if(iscountrycenter==0)
	 {
		  $("#isorestableyun").html("");  
		 window.status= " " ;
	     var ccenterserverip=window.document.getElementById("ccenterserver").value;
       // ccenterserverip="58.194.172.26";
 	    tempservernum=0;
	    
	    window.document.getElementById("noisotd").style.display="";
	    window.document.getElementById("noisodisp").style.display="none";
	    window.document.getElementById("findisotr").style.display="";
	    
	     var isbnstr=getISBN();
	     var thenode = window.document.getElementsByTagName("TABLE");
	     var exitips=getCookie("exitips");
	      if(ccenterserverip>="")  //表示共享资源服务中心
	     {
	       var ipliststr=ccenterserverip;
	       var iplist=ipliststr.split("||");
     	   $.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
	       if(ipliststr!="")
	       {
	    	   globservernum=iplist.length;   //服务器总个数
	    	 locationurl=window.location.toString();
	         for(i=0 ;i<iplist.length;i++)
	         {
	           var thisstr = iplist[i].split(":");
	            if(locationurl.indexOf(thisstr[0])>=0)
	            {
	            	globservernum=globservernum-1;  //表示本机也是资源服务器，那总个数要减1
	            }
	            if(locationurl.indexOf(thisstr[0])<0)  //本机的就不需要列出来了
	            { 
	              // alert(iplist[i])
	            	var theurl="http://"+iplist[i]+"/findisoforjson?callback=?&isbn="+isbnstr+"&uri="+iplist[i]+"&date="+new Date;
	                 var xmlstr;
	                 now=new Date(); 
	                 Sstart=now.getSeconds(); 
	                 Mstart=now.getMinutes(); 
 	                 $.jsonp({
	                	 url: theurl,
	                	 timeout:15000,
	                	 success: function(json) 
	                	 {   
 	                	      now=new Date(); 
                	          Send=now.getSeconds(); 
                	          Mend=now.getMinutes(); 
 	                	          
	                	      seconds=(Mend*60+Send)-(Mstart*60+Sstart);//计算时间
	                	     
	                	      render(json,seconds);      
	                	 },     
	                	 error: function(XMLHttpRequest, textStatus, errorThrown) {jsonerror(XMLHttpRequest,textStatus,errorThrown);}
	                	   
	                	 });
	                
	                /*
	            	request=$.ajax({
	 					  url: theurl,
	 					  dataType: 'json',
	 					  success: function (data) {render(data)},
	 				 	  error:function(){
	 				  			alert("bbb")
	 				  		}
	 				});
	 				*/
	            }
	           
	         }
	         
	       }
	     }	
	  }
	}  
  function jsonerror(req,status,errorth)
  {
	  
	  tempservernum=tempservernum+1;
	  changeimge();
	
  
  }
  function changeimge()
  {
	  if((tempservernum==globservernum) || (iscountrycenter==1))
	  {
	    window.document.getElementById("noisotd").style.display="none";
	  }
	  if((tempservernum==globservernum) && (iscountrycenter==0))
	  {
		  //alert("bb")
		  window.document.getElementById("noisotd").style.display="";
		  window.document.getElementById("findisotr").style.display="none";
		  window.document.getElementById("noisodisp").style.display="";
		  var locisocount=$("#locisocount").val();  //本地光盘个数
		  if(locisocount!="0")
		    $("#noisospan").html("云中心没有找到光盘资源");  
		 
 		  
	  }
	  
	  
  }
  function render(data,seconds)
  { 
	  tempservernum=tempservernum+1;
	  changeimge();
	   if(iscountrycenter==0)
	   {
	      var xmlstr=data.isoxml;
		  if (navigator.userAgent.indexOf("MSIE")>0)  //ie            if (window.DOMParser)  //firfox
		  {	
 			  parseXmlAndGreatTb_Country(xmlstr,seconds,"0");  //根据返回的xml,把记录插入到表格中,即显示光盘列表  

		  }
		  else   //其他
		  {
			 
			  parseXmlAndGreatTb_Country_firfox(xmlstr,seconds,"0");  //根据返回的xml,把记录插入到表格中,即显示光盘列表
		  }

         
	   }
	   
   }   

  function GetCenterInfo()
  {
	  var utlstr="getcenterinfo?callback=?";
      request=$.ajax({
    	  type:"post",
		  url: utlstr,
		  dataType: 'json',
		  async: false,
		  timeout:1,
		  success: function (data) {setcenterinfo(data);},
	 	  error:function(XMLHttpRequest, textStatus, errorThrown){
	  			alert("不能获取全国中心服务器！");
	  		}
		  
	});
		  
  }
  
  function setcenterinfo(data)
  {
	  var ccenterserver=data.countrycenter;
	  var ISRegCenter=data.ISRegCenter;
	  window.document.getElementById("ccenterserver").value=ccenterserver;
	  document.getElementById("isregcenter").value=ISRegCenter;
	 
  }

  
  function Send_countryrequest(url,serverip) 
  {
      var resultstr="";
      var ind=0;
      var http_request = false;
       http_request = false;
      if(window.XMLHttpRequest) 
      { 
        
      	http_request = new XMLHttpRequest();
          //if (http_request.overrideMimeType) {//设置MiME类别
          //    http_request.overrideMimeType("text/xml");
         // }
      }
      else if (window.ActiveXObject)
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
          return resultstr;
      }
      objxml = new ActiveXObject("Microsoft.XMLDOM");
      objxml.async=false;
      
      http_request.onreadystatechange = function()
       {
       	
        if (http_request.readyState == 4) // 调用完毕
        {
        lock=0;
     
         if (http_request.status == 200) // 加载成功
         {
        	 var xmlstr;
             xmlstr=http_request.responseText;
             now=new Date(); 
             
             Send=now.getSeconds(); 
             
             Mend=now.getMinutes(); 
             Milliseconds_end=now.getMilliseconds();
             seconds=(Mend*60+Send)-(Mstart*60+Sstart);//计算时间
             Mseconds=(Mend*60*1000+Send*1000+Milliseconds_end)-(Mstart*60*1000+Sstart*1000+Milliseconds_start);
              returnlength=xmlstr.length;
             pingnum=(returnlength/(Mseconds/1000)/1024) ;//得到的带宽
              parseXmlAndGreatTb_Country(xmlstr,seconds,pingnum);  //根据返回的xml,把记录插入到表格中,即显示光盘列表
        
         }
         else
         {
        	//alert(url)
        	 //yunimgobj.src="images/3.0_yun.gif";
        	 var ips=getCookie("exitips"); //如果调用不成功，则将服务器IP记录到Cookies中，在接下去的一分种将不会再次调用
            if(ips.indexOf(serverip)<0) 
            {
               ips=ips+" "+serverip;
               setCookie("exitips",ips);
            }
         }
        }
       }  

       now=new Date(); 
       Sstart=now.getSeconds(); 
       Mstart=now.getMinutes(); 
       Milliseconds_start=now.getMilliseconds();
        var sendurl=url+"&date="+new Date;
        http_request.open("post", sendurl,true);
        http_request.send(objxml); 
        if((iscountrycenter==1))
        {
        	http_request.abort(); // 终止XMLHttpRequest对象

        }
        var clean = setTimeout(function()   //设置延迟
               {
        	       http_request.abort(); // 终止XMLHttpRequest对象
 	   		       var yunimgobj=window.document.getElementById("searchyunimg");
			       yunimgobj.src="images/3.0_yun.gif";
        	     
  	        	   //alert("超时或网络异常，请您刷新页面或稍后再试");
    		    },30000); //如果请求不成功 设定个时间执行该函数
                         
      return "";
  }
  
  function  parseXmlAndGreatTb_Country(xmlstr,theseconds,pingnum)
  {
	if (xmlstr!="")
	{
	      if(iscountrycenter==0)
	      {
	    	var queryinfoxml;
		    	  
	    	  
	    	  var isxunlaidown=document.getElementById("isxunlaidown").value;  //是否允许迅雷下载    
	    	  queryinfoxml = new ActiveXObject("Microsoft.XMLDOM");
	    	  
		      queryinfoxml.async=false;

		      queryinfoxml.loadXML(xmlstr);
		      var items = queryinfoxml.selectNodes("resource/ISO");
  		      for(j=0;j<items.length;j++)
		      {
		    	  
		    	  var doc=items[j];
		    	 
		         var url=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/uri").text;
		         
		         var isoid=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/isoid").text;
		         var hitcount=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/hitcount").text;
		         var title=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/title").text;
		         var downcount=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/downcount").text;
		         var filesize=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/filesize").text;
		         var drive=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/drive").text;
		         var source=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/source").text;
		         var WebShowRun=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/WebShowRun").text;
		         var minBandWidthNode=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/minBandWidth"); //光盘类型所对应的最小带宽
		         var CDHelpNode=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/CDHELP"); //光盘说明
		         
		         XunLanDownTypeNode=queryinfoxml.selectSingleNode("resource/ISO["+j+"]/XunLanDownType");
                 
		         var CDHelp="";
		         if(CDHelpNode!=null)
		        	 CDHelp=CDHelpNode.text;
		         var minBandWidth=15;
		         
		         if(minBandWidthNode!=null)
		        	 minBandWidth=minBandWidthNode.text;
                         
                         var XunLanDownType="";
		         if(XunLanDownTypeNode!=null)
		         {
		           
		             XunLanDownType=XunLanDownTypeNode.text; 
		          
		         }
                 var tempdownload=hitcount+"/"+downcount;
                 var titlestr=title;
                 var ckurl=""
 		         if(CDHelp.length>0)
		         {
		        	 //ckurl="http://"+url+"/CDHelp.jsp?ISOID="+isoid;
		        	 ckurl="http://"+url+"/cdhelp.do?status=showhelp&ISOID="+isoid;
		        	if(CDHelp.length>17)
		        	{
		        		//CDHelp=CDHelp.substring(0,17); 
		        		//CDHelp=CDHelp+"&nbsp;&nbsp;<a href='"+ckurl+"' target='_blank'>查看</a>";
		        	}
 		         }
		         var filesizefloat=filesize/1024
		         filesizefloat=( Math.round(filesizefloat*100)/100);
                  var XunLanDownType="1";
		         if(XunLanDownTypeNode!=null)
		         {
		           
		             XunLanDownType=XunLanDownTypeNode.text; 
		          
		         }
 		        // var resourcesys=document.getElementById("ResourceSys").value;  ////表示是省中心还是本地  0：本地  1：中心
		         //var isopacurl=document.getElementById("isopacurl").value;  
		         var tempstr=GetRunAndDownHtml2(isoid,url,"-1",filesize,title,XunLanDownType);
		    	 var isoidname="yunisoinfotd"+isoid;
		    	 $("<table width='700' border='0' align='center' cellpadding='0' cellspacing='0' background='images/new4.0_19.gif'>" +
	             "<tr>" +
	             "<td width='180' height='180' align='center' valign='top' class='lan_14_02_b'><br><a title='全国中心'><img src='images/new4.0_22.gif' width='120' height='140'></a><br></td>" +
	             "<td width='520' align='left' valign='bottom' class='lan_14_02_b' id='"+isoidname+"'></td>" +
	             "</tr>" +
	             "<tr><td colspan='2' height='6' align='center' valign='middle' class='lan_14_02_b' background='images/new4.0_20.gif' ></td> </tr>"+
	             "</table>").appendTo("#isorestableyun");
		    	 var isoresstr="<span class='juhuang'>光盘：</span>"+titlestr+"<br>" +
						       "<span class='juhuang'>大小：</span>"+filesizefloat+"M<br>" +
						       "<span class='juhuang'>浏览/下载：</span>"+tempdownload+"<br>" ;
		    	 if(ckurl!="")
		    		 isoresstr=isoresstr+ "<span class='juhuang' style='white-space:nowrap'>说明：</span>"+CDHelp+"<br>" ;
	              var isxunlaidown=document.getElementById("isxunlaidown").value ; //是否允许迅雷下载
	              if(isxunlaidown=="0")  //表示允行迅雷下载
	            	  isoresstr=isoresstr+ "<a style='color:#cc2900;text-decoration:underline'  tempthunderHref='' thunderHref=''  thunderPid='57029' thunderResTitle='"+isoid+"' onClick=XunLanDownISO_Http(this,'"+url+"','"+isoid+"','-1','"+filesize+"') target='_blank' style='cursor:hand' title='使用迅雷工具下载光盘。'>迅雷下载</a>" ;
	
		    	 
		    	 
		    	 
		         $("<table width='518' border='0'cellpadding='0' cellspacing='0' class='hei_14_28h' >" +
		         "<tr><td height='20' colspan='2'></td></tr>"+
	             "<tr>" +
	             "<td height='100' colspan='2' valign='top' background='images/new4.0_19_01.gif' style='table-layout:word-wrap:break-word;word-break:break-all'>"+isoresstr
	              +
	             "<td height='100' colspan='2' valign='top' ><input type='hidden' name='isovolume_center' value='"+titlestr+"'><input type='hidden' name='isoid_center' value='"+isoid+"'>" +
	             "</td>" +
	             "</tr>"+tempstr+
	            
	             "</table>").appendTo("#"+isoidname);
		         
	        }
   	        if(items.length>0)
		    {
 				  iscountrycenter=1;  //表示全国中心已经找到记录并显示，如果为1了，下次就不需要再列出来了
 				  window.document.getElementById("noisotd").style.display="none";
		    }

 
	      }
	}	  
  
  }
 
  //firfox解析xml
   function  parseXmlAndGreatTb_Country_firfox(xmlstr,theseconds,pingnum)
  {
	  
	if (xmlstr!="")
	{
	      if(iscountrycenter==0)
	      {
	    	var queryinfoxml;
		    	  
	    	  
	    	  var isxunlaidown=document.getElementById("isxunlaidown").value;  //是否允许迅雷下载    
		      
			 // 创建 XML 文档对象
			   queryinfoxml = document.implementation.createDocument("text/xml", "", null);
 			   queryinfoxml.loadXML(xmlstr);
			 
	   		      
		      var items = queryinfoxml.selectNodes("resource/ISO");
           
		      for(j=0;j<items.length;j++)
		      {
		         var url=items[j].selectSingleNode("uri").textContent;
		         var isoid=items[j].selectSingleNode("isoid").textContent; 
		         var hitcount=items[j].selectSingleNode("hitcount").textContent;  
		         var title=items[j].selectSingleNode("title").textContent;  
		         var downcount=items[j].selectSingleNode("downcount").textContent;  
		         var filesize=items[j].selectSingleNode("filesize").textContent;   
		         var drive=items[j].selectSingleNode("drive").textContent;   
		         var source=items[j].selectSingleNode("source").textContent;   
		         var minBandWidthNode=items[j].selectSingleNode("minBandWidth").textContent;   //光盘类型所对应的最小带宽
		         var CDHelpNode=items[j].selectSingleNode("CDHELP");  //光盘说明
		         var XunLanDownTypeNode=items[j].selectSingleNode("XunLanDownType");  
		         var CDHelp="";
		         if(CDHelpNode!=null)
		        	 CDHelp=CDHelpNode.textContent;
		         var minBandWidth=15;
		         
		         if(minBandWidthNode!=null)
		        	 minBandWidth=minBandWidthNode.text;
                  var XunLanDownType="1";
		         if(XunLanDownTypeNode!=null)
		         {
		             XunLanDownType=XunLanDownTypeNode.textContent; 
		         }
                 var tempdownload=hitcount+"/"+downcount;
                 var titlestr=title;
                 var ckurl="";
		         if(CDHelp.length>0)
		         {
		        	 //ckurl="http://"+url+"/CDHelp.jsp?ISOID="+isoid;
		        	 ckurl="http://"+url+"/cdhelp.do?status=showhelp&ISOID="+isoid;
		        	if(CDHelp.length>40)
		        	{
		        		//CDHelp=CDHelp.substring(0,40); 
		        		//CDHelp=CDHelp+"&nbsp;&nbsp;<a href='"+ckurl+"' target='_blank'>查看</a>";
		        	}
 		         }
		         
		         var filesizefloat=filesize/1024
		         filesizefloat=( Math.round(filesizefloat*100)/100);
		         var tempstr=GetRunAndDownHtml2(isoid,url,"-1",filesize,title,XunLanDownType);
		    	 var isoidname="yunisoinfotd"+isoid;
		    	 $("<table width='700' border='0' align='center' cellpadding='0' cellspacing='0' background='images/new4.0_19.gif'>" +
		    	 "<tr><td height='20' colspan='2'></td></tr>"+
	             "<tr>" +
	             "<td width='180' height='180' align='center' valign='top' class='lan_14_02_b'><br><a title='全国中心'><img src='images/new4.0_22.gif' width='120' height='140'></a><br></td>" +
	             "<td width='520' align='left' valign='bottom' class='lan_14_02_b' id='"+isoidname+"'></td>" +
	             "</tr>" +
	             "<tr><td colspan='2' height='6' align='center' valign='middle' class='lan_14_02_b' background='images/new4.0_20.gif' ></td> </tr>"+
	             "</table>").appendTo("#isorestableyun");
		    	 var isoresstr="<span class='juhuang'>光盘：</span>"+titlestr+"<br>" +
					       "<span class='juhuang'>大小：</span>"+filesizefloat+"M<br>" +
					       "<span class='juhuang'>浏览/下载22：</span>"+tempdownload+"<br>" ;
	    	     if(ckurl!='')
	    	     {
	    	    	 isoresstr=isoresstr+ "<span class='juhuang'>光盘说明：</span>"+CDHelp+"<br>" ;
	    	     }
	    		    
	              var isxunlaidown=document.getElementById("isxunlaidown").value ; //是否允许迅雷下载
	              if(isxunlaidown=="0")  //表示允行迅雷下载
	            	  isoresstr=isoresstr+ "<a style='color:#cc2900;text-decoration:underline'  tempthunderHref='' thunderHref=''  thunderPid='57029' thunderResTitle='"+isoid+"' onClick=XunLanDownISO_Http(this,'"+url+"','"+isoid+"','-1','"+filesize+"') target='_blank' style='cursor:hand' title='使用迅雷工具下载光盘。'>迅雷下载</a>" ;

		         $("<table width='518' border='0'cellpadding='0' cellspacing='0' class='hei_14_28h'>" +
		         "<tr><td height='20' colspan='2'></td></tr>"+
	             "<tr>" +
	             "<td height='100' colspan='2' valign='top' background='images/new4.0_19_01.gif' style='table-layout:word-wrap:break-word;word-break:break-all'>"+isoresstr
	             +
	             "<td height='100' colspan='2' valign='top' ><input type='hidden' name='isovolume_center' value='"+titlestr+"'><input type='hidden' name='isoid_center' value='"+isoid+"'>" +
	             "</td>" +
	             "</tr>"+tempstr+
	            
	             "</table>").appendTo("#"+isoidname);
		         
	        }
   	        if(items.length>0)
		    {
 				  iscountrycenter=1;  //表示全国中心已经找到记录并显示，如果为1了，下次就不需要再列出来了
 				  window.document.getElementById("noisotd").style.display="none";
		    }

	      }
	}	  
  
  }
   
  function GetRunAndDownHtml2(isoid,url,flag,filesize,filename,TempXunLanDownType)  //isrunfirst:true 表示在线运行优先   false: 下载优先,XunLanDownType:迅雷下载时通过FTP方式还是HTTP方式  0：FTP 1：HTTP 2:单服务器的http(从服务器端获取的) 
  {
    
    var resourcesys=document.getElementById("ResourceSys").value;  ////表示是省中心还是本地  0：本地  1：中心
    var isopacurl=document.getElementById("isopacurl").value;  
    var tempstr="";
    if(resourcesys=="1" && isopacurl=="0" )
     {
    	 tempstr="<tr><td colspan='2'>" +
    	 "<table border='0' cellpadding='8' cellspacing='1' bgcolor='#FFAA66' >"+
         "<tr><td align='left' valign='middle' bgcolor='#FFCC66' class='hong_14'>请通过本馆OPAC进行访问</td>"+
         "</tr>"+
         "</table></td></tr>";
     }
    else
    {
    	
  	     var isregcenter=document.getElementById("isregcenter").value;  //全国中心是否注册过
     	 tempstr="<tr><td colspan='2'>" +
    	 "<table border='0' cellpadding='8' cellspacing='1' bgcolor='#FFAA66' >"+
         "<tr><td align='left' valign='middle' bgcolor='#FFCC66' class='hong_14'>全国中心未注册过</td>"+
         "</tr>"+
         "</table></td></tr>";
 	     if(isregcenter=="0")  //为0表示注册过了
		 {
  		  	 var dowloadurl="http://"+url+"/";         
             var runurl="http://"+url+"/";
             var WebShowRun=document.getElementById("WebShowRun").value ; //是否很允许显示下载按钮
             var Ischeckareadownload=document.getElementById("Ischeckareadownload").value ; //是否有区域控制
              var imgid=isoid+flag+"_img";
             if(Ischeckareadownload=="1")  //1表示没有控制
             {
            	 var imgid=isoid+flag+"_img";
	           	 tempstr="<tr>"+
	             "<td width='170' height='80' valign='middle'><a onclick=opendirwindwow('"+isoid+"','"+url+"','"+filesize+"')  style='cursor:hand' title='根据光盘目录或资源类型查看光盘，并可在线播放或浏览光盘内的资源。目前只提供音频、视频、文档、图片四类资源的在线播放。'><img src='images/opendir.jpg' width='127' height='31' border='0'></a></td>"+
	           	 "<td width='170' height='80' valign='middle'><a onClick=WebRunISOClick('"+runurl+"','"+isoid+"','"+flag+"','"+filesize+"') style='cursor:hand' title='直接在线打开整张光盘，查看光盘内所有文件。需要先安装网碟ProG。（网速较快时可选择）'><img src='images/new4.0_24.jpg' width='140' height='32' border='0' id='"+imgid+"'></a></td>";   
	             if(WebShowRun=="0")  //显示下载按钮
	             {  
	            	 tempstr=tempstr+ "<td width='170' valign='middle'>"+
	 			                 "<a onClick=DownISOClick('"+dowloadurl+"','"+isoid+"','"+flag+"','"+filesize+"') style='cursor:hand' class='link_e' title='使用网碟ProG工具高速下载光盘。需要先安装网碟ProG。'><img src='images/new4.0_25.gif' width='140' height='32' border='0'></a><br>";
	
	            	// var isxunlaidown=document.getElementById("isxunlaidown").value ; //是否允许迅雷下载
	                // if(isxunlaidown=="0")  //表示允行迅雷下载
	                // {
	                //	 if(TempXunLanDownType=="1")
	                //	   tempstr=tempstr+"<a tempthunderHref='' thunderHref=''  thunderPid='57029' thunderResTitle='"+isoid+"' onClick=XunLanDownISO_Http(this,'"+url+"','"+isoid+"','"+flag+"','"+filesize+"') target='_blank' style='cursor:hand' title='使用迅雷工具下载光盘。'><img src='images/new4.0_26.gif' width='140' height='23' border='0'></a>";
	                //     else
	                 // 	   tempstr=tempstr+"<a tempthunderHref='' thunderHref=''  thunderPid='57029' thunderResTitle='"+isoid+"' onClick=XunLanDownISO(this,'"+url+"','"+isoid+"','"+flag+"','"+filesize+"','"+TempXunLanDownType+"') target='_blank' style='cursor:hand' title='使用迅雷工具下载光盘。'><img src='images/new4.0_26.gif' width='140' height='23' border='0'></a>";
	
	                 //}
	                 tempstr=tempstr+"</td>";
	             }
	             else
	             {
	            	 tempstr=tempstr+"<td>&nbsp;</td>";
	             }
             }
             else  //0:表示有控制，只允许同步请求
             {
 	           	 tempstr="<tr>"+
	             "<td width='170' height='80' valign='middle'><a onClick=AddSynchrRes_area('"+filesize+"','"+filename+"','201') style='cursor:hand' ><img src='images/tb_request.jpg' width='140' height='31' border='0'></a></td>"+
	             "<td width='170' height='80' valign='middle'><a onClick=DownISOClick_area('"+dowloadurl+"','"+isoid+"','"+flag+"','"+filesize+"') style='cursor:hand' title='由于本校作了访问流量控制，如果要继续下载将产生流量费用！'><img src='images/new4.0_25.gif' width='140' height='32' border='0' id='"+imgid+"'></a></td>";

             }

            tempstr=tempstr+ "</tr>" ;
          }
     }
    return tempstr;
  }

  
  function AddSynchrRes(filesize,filename,actionid)  //加入资源同步请求表  action:201表示下载   202：运行
  {
          var resultstr=false;
         var http_request = false;
        http_request = false;
       
        if(window.XMLHttpRequest) 
        { 
        	http_request = new XMLHttpRequest();
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
            return resultstr;
        }
       
        http_request.onreadystatechange = function()
        {
        	
          if (http_request.readyState == 4) // 调用完毕
          {
 	          lock=0;
	          
	           if (http_request.status == 200) // 加载成功
	           {
	               var xmlstr;
	               xmlstr=http_request.responseText;
	             
	               if(xmlstr!="")
	               {
	                 resultstr=true;
	                  
	               }
	           }
           }
         }  
        
         var isbn=document.getElementById("isbn").value ;
         var title=document.getElementById("thetitle").value ;
         var schoolcode=document.getElementById("SchoolCode").value ;
         title=encodeURI(encodeURI(title));
         tempfilename=encodeURI(encodeURI(filename));
          url="AddSynchrRes?isbn="+isbn+"&title="+title+"&filesize="+filesize+"&filename="+tempfilename+"&scode="+schoolcode+"&actionid="+actionid;
          http_request.open("post", url,true);
         http_request.send("");                
  
         return resultstr;
  }
  
   function AddSynchrRes_area(filesize,filename,actionid)
   {
          var resultstr=false;
         var http_request = false;
        http_request = false;
       
        if(window.XMLHttpRequest) 
        { 
        	http_request = new XMLHttpRequest();
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
            return resultstr;
        }
       
        http_request.onreadystatechange = function()
        {
        	
          if (http_request.readyState == 4) // 调用完毕
          {
 	          lock=0;
	          
	           if (http_request.status == 200) // 加载成功
	           {
	               var xmlstr;
	               xmlstr=http_request.responseText;
	             
	               if(xmlstr!="")
	               {
	                  alert("同步请求成功！")
	                  
	               }
	           }
           }
         }  
        
         var isbn=document.getElementById("isbn").value ;
         var title=document.getElementById("thetitle").value ;
         var schoolcode=document.getElementById("SchoolCode").value ;
         title=encodeURI(encodeURI(title));
         tempfilename=encodeURI(encodeURI(filename));
          url="AddSynchrRes?isbn="+isbn+"&title="+title+"&filesize="+filesize+"&filename="+tempfilename+"&scode="+schoolcode+"&actionid="+actionid;
          http_request.open("post", url,true);
         http_request.send("");                
  
         return resultstr;
   }
  
   function DownISOClick_area(WEBSTR,ISOID,flag,filesize)
   {
	   if(window.confirm('点击下载会产生流量，确认是否继续下载？'))
	   {
		   DownISOClick(WEBSTR,ISOID,flag,filesize);
	   }

   }
  function getRootPath()
  {
		var strFullPath=window.document.location.href;
		var strPath=window.document.location.pathname;
		var pos=strFullPath.indexOf(strPath);
		var prePath=strFullPath.substring(0,pos);
		var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
		return (prePath+postPath);
 
  }
  function savefeedback(metaid,PropertyID,SSH)
  {   
        var fbtypesel= $("#fbtypesel").val();
        var emailtxt= $("#emailtxt").val();
        emailtxt=$.trim(emailtxt);
        if(emailtxt=="")
        {
        //	alert("请输入Email地址!");
        //	return ;
        }
        	
        if(emailtxt!=""&&!ISEMAIL(emailtxt))
        {
        	alert("输入的Email地址错误!");
        	return ;
        }
        	
        
	    jQuery.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
	     $.getJSON("savefeedback?callback=?&metaid="+metaid+"&fbtype="+fbtypesel+"&email="+emailtxt+"&PropertyID="+PropertyID+"&SSH="+SSH, 
		function(data)
		{ 
	    	 var flag=data.flag;
    		 document.getElementById('feedbackdiv').style.display='none';
	    	 document.getElementById('returndiv').style.display='';
             var returnimgobj=document.getElementById('returnimg');
	    	 if(flag==true)
	    	  {
	    		 $("#returninfo").html("反馈信息提交成功！");  
	    		 returnimgobj.src="images/succeed.gif"
	    	  }
	    	  else
	    	  {
		         $("#returninfo").html("反馈信息提交失败！");  
	    		 returnimgobj.src="images/error.gif"

	    	  }
	    	  
		 // alert(data.flag);
		}); 

  }
  
$(document).ready(function () {
	
    var iscountrycenter= $("#ISCountryCenter").val();
	if(iscountrycenter=="0")   //表示启动全国中心
	{
		 var isbn=$("#isbn").val();
		 var CountryCenterUrl=$("#CountryCenterUrl").val();  //全国中心地址
		 var tlt="";
		 var aur="";
	   	 jQuery.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
	     $.getJSON(CountryCenterUrl+"/opacweb/getbookinfo?callback=?&isbn="+isbn+"&title="+encodeURI(encodeURI(tlt))+"&author="+encodeURI(encodeURI(aur)), 
		function(data)
		{ 
		   var imgpath=data.imgpath;
		   if(imgpath!="")
		   {
			   imgpath=CountryCenterUrl+"/opacweb/img/"+imgpath;
			   var bookimageobj=window.document.getElementById("bookimage");
			   bookimageobj.src=imgpath; 
		   }
		}); 
	     var isocount= $("#locisocount").val();  //得到本地光盘个数
	     if(isocount=="0")
	       SearchCountryCenter_Json();
	}


 });
