window.onload = function(){
	
	var search = document.getElementById("search");
    var temp;
    var ul = document.getElementById("result");
    var count = 1;

    //使得ul的width=input的width
    var owidth = document.defaultView.getComputedStyle(search).width;
    /*alert(owidth);*/
    console.log("owidth:"+owidth);
	ul.style.width = owidth;
	search.oninput = function(){

		var oli = ul.getElementsByTagName("li");

		//当框内数据为空时删除之前的li
    	if(this.value == ''){
    		while(oli.length){
    			ul.removeChild(oli[0]);
    		}
    	}else{
    		//用node 实现请求后台数据
    		  $.ajax({
				   url:"http://localhost:8000/",
				   type:'GET',
				   dataType:'jsonp',
				   data: {'data':search.value},                                                                                     
				   jsonp : "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)  
		           jsonpCallback:"handler",		  
				   success:handler
	         }); 
    	}	  		
	}

	    function handler(arr){
	    	var oli = ul.getElementsByTagName("li");
	    	while(oli.length){
	    		ul.removeChild(oli[0]);
	    	}

			for(var i=0;i<arr.length;i++){
				var li = document.createElement("li");
				
				var a = document.createElement("a");
				a.href=arr[i].href;
				a.innerHTML = arr[i].name;
               
				li.appendChild(a);
				ul.appendChild(li);
			}



			
			
	   }  

    //search添加focus事件
    search.onfocus = function(){
    	ul.style.display="block";
    	return false;
    }


   //search添加失去焦点事件  为了防止blur事假与a 的href冲突，所以采用setTimeout
   search.onblur = function(){
      setTimeout(function(){
      		ul.style.display="none";
      },100*count);

      count++;
    }
    return false;
}