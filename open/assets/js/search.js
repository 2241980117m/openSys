window.onload = function(){
  //修改per
  //修改样式
  //在动画演示过程中点击go的完善
	var svg = document.getElementsByTagName("svg")[0];
      svg.setAttribute("height",document.defaultView.getComputedStyle(document.getElementById("doing-1"),null).height);
      svg.setAttribute("width",document.defaultView.getComputedStyle(document.getElementById("doing-1"),null).width);
	var H = svg.getAttribute("height");
	    H = parseInt(H);


    var random = document.getElementsByClassName("click-random")[0];
    var search = document.getElementsByClassName("click-freedom-2")[0]
        search.setAttribute("pauseFlag",1);

    var arr = autoCreate(H);
    var pauseFlag = 0;
    random.onclick = function(){
      if(timer.length!=0){
        for(var n=0;n<timer.length;n++){
           clearTimeout(timer[n]);
        }
        arr = autoCreate(H);
       
        //将解释区清空
        document.getElementById("explain").innerHTML="";
        //将代码演示颜色变为初始颜色
        var oli = document.getElementsByClassName("code-2")[0].getElementsByTagName("li");
        for(var i=0;i<oli.length;i++){
           oli[i].style.backgroundColor="transparent";
        }
      }else{
        arr = autoCreate(H);
      }
    	
    }

 

    search.onclick = function(){ 
      
      if(this.getAttribute("pauseFlag") == 1){

    
         arr = new Array();      
         var data = document.getElementsByClassName("click-input")[0].value;
         verifyChar(data);
     
         arr = data.split(',');   //筛选的是字符串
         
         //将arr转换成数字数组
         for(var i=0;i<arr.length;i++){
            arr[i] = Number(arr[i]);
         }

       

         arr = arr.sort(compare);
         console.log(arr);
         var searchNum = document.getElementsByClassName("search")[0].value;

         //判断输入的查找数字是否符合规范
         var flag1 = verify(searchNum);
         var flag2 = verifyNum(arr);
       
         if(flag1&&flag2){
            clearAll();
           
            var per = getPer(arr,H/2);
            console.log("得到的per值为:"+per);
            var rect = getRectItem(arr.length);
            rectShape(H,arr,rect,per); 
            BiSearch(arr,Number(searchNum),0,arr.length-1);
            this.setAttribute("pauseFlag",0);
         }
       }    

    }


     //改变延时时间
     function changeTime(){
         TIME = 2500;
         TIME = TIME - 200 * $(".click-speed-1").attr("value");
         console.log("TIME:"+TIME);
     }
  
  $(".click-speed-1").RangeSlider({min:0,max:10,step:0.1,callback:changeTime});

  

    //查找按钮的弹出效果
      var x1=document.getElementById("chu");
      var y1=document.getElementById("tan");
      var i=1;
      y1.onclick=function(){
        if(i==1)
        {
          x1.className="button-3";
          i=2;
        }
        else if(i==2)
        {
          x1.className="button-2"
          i=1;
        }
      };

}

    var TIME = 1250;
     //定义定时器
    var timer0;
    var timer = new Array();
    var svg = document.getElementsByTagName("svg")[0];
        svg.setAttribute("height",document.defaultView.getComputedStyle(document.getElementById("doing-1"),null).height);
        svg.setAttribute("width",document.defaultView.getComputedStyle(document.getElementById("doing-1"),null).width);
        
    //在不同的分辨率下设置不同的最大数组长度值
      if(parseInt(svg.getAttribute("width"))<=425){
        var numMax = 6;
      }else if(parseInt(svg.getAttribute("width"))<=768){
        var numMax = 8;
      }else{
        var numMax = 10;
      }

//随机生成数组，并且生成svg图形,返回生成的随机数组
function autoCreate(height){
   clearAll();
  
   var svg = document.getElementsByTagName("svg")[0];
   var Width = svg.getAttribute("width");
   var H = parseInt(svg.getAttribute("height")) / 2;
   Width = parseInt(Width); 


   var arr = getRandomArray(4,numMax,5,50).sort(compare);
   arr = clearSame(arr);
   console.log("产生的随机数是:"+arr);
   document.getElementsByClassName("click-input")[0].value = arr;
   var per = getPer(arr,H);
   console.log("得到的per值为"+per);
   var rect = getRectItem(arr.length);
   rectShape(height,arr,rect,per); 
   return arr; 
}

//动画中加入注释    此时的low=,high,mid=
function BiSearch(data,x,beg,last){  
	var explain = document.getElementById("explain");
    var count = 1;
    var mid;//中间位置 
    var search = document.getElementsByClassName("click-freedom-2")[0]; 
    if (beg > last){  
         return -1;  
    }  
    timer0 = setTimeout(function(){
    	lightBackground(0);
    },TIME*count);
    timer.push(timer0);
    count++;

    while(beg <= last){  
        mid =Math.floor((beg + last) / 2);  
        (function(beg,mid,last){
         timer0 = setTimeout(function(){
              	 explain.innerHTML = "此时的low="+data[beg]+",high="+data[last]+",mid="+data[mid];
              	 changeRectBackground(beg,last,mid);
              	 lightBackground(1);
              	},TIME*count);
         })(beg,mid,last); 
         timer.push(timer0);
         count++;

        timer0 = setTimeout(function(){

        	lightBackground(2);

        },TIME*count);
        timer.push(timer0);
        count++;

        if (x == data[mid] ){ 

	        (function(data,mid){
             timer0 =  setTimeout(function(){
                lightBackground(3);
                explain.innerHTML = data[mid]+"=="+x+",查找结束";
                search.setAttribute("pauseFlag",1);
              },TIME*count);
             timer.push(timer0);
          })(data,mid);
	        count++; 

            return mid;  

        }  
        else if (data[mid] < x){ 
	        (function(data,mid){
             timer0 =  setTimeout(function(){
                  lightBackground(4);
                  explain.innerHTML = data[mid]+"<"+x+",low=mid+1";
                },TIME*count);
             timer.push(timer0);
          })(data,mid);
	        count++; 

            beg = mid + 1; 
        }  
        else if (data[mid] > x){  
	        (function(data,mid){
           timer0 = setTimeout(function(){
                lightBackground(5);
                explain.innerHTML = data[mid]+">"+x+",high=mid-1";
              },TIME*count);
           timer.push(timer0);
          })(data,mid);
	        count++;
          last = mid - 1;  
        }  
         
    } 
   timer0 = setTimeout(function(){
       lightBackground(7);
       explain.innerHTML = "没有找到对应数据";
       search.setAttribute("pauseFlag",1);
    },TIME*count);
   timer.push(timer0);
    count++;

    return -1;  
  }  


 	//产生随机数
   function getRandom(min,max){
       var rand = 0;
       while(rand == 0){
       	 rand = Math.random();
       }
       
       var range = max - min;
       return min+Math.round(rand * range);       
   }

   //根据产生的随机数确定数组的数目，并且实现产生随机数组
   function getRandomArray(numMin,numMax,dataMin,dataMax){
   		var num = getRandom(numMin,numMax);
   		var array = new Array();
   		for(var i = 0;i < num;i++){
   			array[i] = getRandom(dataMin,dataMax);
   			console.log(array[i]);
   		}
   		return array;
   }

   //动态产生第一个矩形的左边距
   function getRectItem(num){
   	    
    	var Width = document.getElementsByTagName("svg")[0].getAttribute("width");
    	
          Width = parseInt(Width);
          var rectItem = {      
            margin:5,
            rWidth:40,
            marginLeft:100
          }       

     console.log("width:"+Width);
      
      var marginLeft = ( Width - num*rectItem.rWidth -(num - 1)*rectItem.margin) / 2;
    
      rectItem.marginLeft=marginLeft;
      
      return rectItem;
    }


    function createRect(height,marginLeft,content){
            var svg = document.getElementsByTagName("svg")[0];
            var H = svg.getAttribute("height");
                H = parseInt(H)/2;

            var g = document.createElementNS("http://www.w3.org/2000/svg","g");
            g.style.transform="translate("+marginLeft+"px,"+ (H - height) +"px)";
              
              var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
              r.setAttribute("fill", "rgba(57, 149, 222, 0.84)");
              r.setAttribute("x",0+"rem");
              r.setAttribute("y", 0+"px");
              r.setAttribute("width", "40px");
              r.setAttribute("height", height+"px");
              var text = document.createElementNS("http://www.w3.org/2000/svg","text");
              text.textContent = content;
              if(content>=1000){
                  text.setAttribute("x","0.2rem");
              }else if(content>=100){
                 text.setAttribute("x","0.6rem");
              }
              else if(content>=10){
                text.setAttribute("x","1rem");
              }else{
                text.setAttribute("x","1.5rem");
              }

              text.setAttribute("y",height-10+"px");
                  g.appendChild(r);
                  g.appendChild(text);
              svg.appendChild(g); 
    }

     //清除所有的svg子元素
     function clearAll(){
     	 var oSvg = document.getElementsByTagName("svg")[0];
     	 var oG = document.getElementsByTagName("g");
     	while(oG.length){
     	   for(var i=0;i<oG.length;i++){
     	 	  oSvg.removeChild(oG[i]);     	 	
     	   }
     	}
     	 
     }

   //创建所有的g元素
   function rectShape(H,array,rect,per){
       for(i=0;i<array.length;i++){
       	  console.log(i);
         if(i==0){
            createRect(array[i]*per,rect.marginLeft,array[i]);
             
          }else{
            createRect(array[i]*per,rect.marginLeft+rect.margin*i+i*rect.rWidth,array[i]);  
          }
       	  
        }
    }

   //检验输入的数据是否是合法字符
   function verify(data){
   	  if(data.length == 0){
   	  	 alert("输入查找数据不能为空");
   	  }else{
   	  	for(var i=0;i<data.length;i++){
   	  		if(!(data[i]>='0' && data[i]<='9')){
   	  				alert("输入查找数据不合法");
   	  				return false;
   	  				break;
   	  		}
   	  	}
   	  	return true;
   	  }
   }

   //作为sort函数的比较函数
   function compare(value1,value2){
   	   if(value1<value2){
   	   	 return -1;
   	   }else if(value1 == value2){
   	   	 return 0;
   	   }else{
   	   	return 1;
   	   }
   }

    //背景高亮
    function lightBackground(){    
             console.log("args:"+arguments);
             var algorithm = document.getElementById("al");
             var oli = algorithm.getElementsByTagName("li");
             for(var i=0;i<oli.length;i++){
               oli[i].style.backgroundColor = "transparent";
             }
             for(i=0;i<arguments.length;i++){
               oli[arguments[i]].style.backgroundColor = "rgba(241, 199, 73, 0.83)";
             }
      }

   //改变此时的low,high,mid的颜色
   function changeRectBackground(low,high,mid){
       var rect = document.getElementsByTagName("rect");
       for(var i=0;i<rect.length;i++){
       	  rect[i].setAttribute("fill","rgba(57, 149, 222, 0.84)");
       }

       rect[low].setAttribute("fill","rgb(242, 182, 75)");
       rect[high].setAttribute("fill","rgb(242, 182, 75)");
       rect[mid].setAttribute("fill","rgba(226, 12, 12, 0.66)");
   }

   //如果arr中存在相同的数，则去掉重复的数
   function clearSame(arr){
   	console.log("去重之前的数组:"+arr);
   	  for(var i=0;i<arr.length;i++){
   	  	
   	  	 for(j=i+1;j<arr.length;){
   	  	 	if(arr[i] == arr[j]){
   	  	 		arr.splice(j,1);          
   	  	 	}else{
            j++;
          }
   	  	 }
   	  	
   	  }
   
   	console.log("去重之后的数组:"+arr);
   	  return arr;
   }

      
    //找出arr中的最大值
    function getMax(arr){
      var max = arr[0];
       for(var i=1;i<arr.length;i++){
           if(max<arr[i]){
              max = arr[i];
              console.log("最大值是:"+max);
           }
       }
       return max;
    }


     //产生per
    function getPer(arr,h){
        //   var min = getMin(arr);
           var max = getMax(arr);
           return h / max;
    }

    //清除所有的svg子元素
     function clearAll(){
       var oSvg = document.getElementsByTagName("svg")[0];
       var oG = document.getElementsByTagName("g");
      while(oG.length){
         for(var i=0;i<oG.length;i++){
          oSvg.removeChild(oG[i]);        
         }
      }
       
     }

     //验证输入的数据是否是合法数据
     function verifyChar(str){    
           if(!/^(\d+,?)+$/.test(str)){
             alert("输入的数据有误");
           }    
     }
    function verifyNum(arr){
 
       if(arr.length > numMax){
          alert("输入数据请不要超过" + numMax + "组！");
          return false;
       }
          return true;
     }

