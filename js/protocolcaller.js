var protocaller_url = '',
    protocaller_success = {},
    protocaller_fail = {};
function protocolcaller(){
    return this;
}
//外部调用检测isSupport需要延迟200毫秒
protocolcaller.prototype.isSupport = false;

protocolcaller.prototype.callForIE = function(protocolUrl,cbSuccess,cbFail){
    var flag = false;
    location.href = protocolUrl;
    window.onbeforeunload = function(){
        if(flag){
            flag = false;
            if(typeof cbFail == 'function'){
                cbFail();                    //调用失败后执行的回调函数
            }

            window.onbeforeunload = {};     //消除页面关闭绑定函数
            _closeMe();                     //关闭页面
        }
        flag = true;
    }
    setTimeout(function(){
       window.onbeforeunload = {};
        if(flag){
            if(typeof cbSuccess == 'function'){
                cbSuccess();  //成功调用后执行的回调函数
            }
            _closeMe();   //关闭页面
        }
    },1)

    function _closeMe(){
        window.opener = null;
        window.open('', '_self');
        window.close();
    }

}

protocolcaller.prototype.callForFF = function(link,cbSuccess,cbFail){
    var ifr = '<iframe id="callIfr" src="#" style="display: none;"></iframe>';
    document.body.innerHTML += ifr;

    var ifrTarget = document.getElementById('callIfr');
//alert(link)
    var flagTarget = false;
    
   // setTimeout(function(){
        try{
            ifrTarget.contentWindow.location.href = link;
            flagTarget = true;
        }catch (ex){
            flagTarget = false;
            cbFail();  //调用失败后执行的回调函数
        }
        protocolcaller.prototype.isSupport = flagTarget;
        if(flagTarget){
            cbSuccess(); //成功调用后执行的回调函数
        }

   // },1000);  
}