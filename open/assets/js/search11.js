window.onload = function(){
	var TIME = 1250;
	var timer = -1;
	  //改变延时时间
	  var svg = document.getElementsByTagName("svg")[0];
      svg.setAttribute("height",document.defaultView.getComputedStyle(document.getElementById("doing-1"),null).height);
      svg.setAttribute("width",document.defaultView.getComputedStyle(document.getElementById("doing-1"),null).width);
	var H = svg.getAttribute("height");
	    H = parseInt(H);

     function changeTime(){
         TIME = 2500;
         TIME = TIME - 200 * $(".click-speed-1").attr("value");
         console.log("TIME:"+TIME);
     }  //改变延时时间
            
    $('.click-speed-1').RangeSlider({ min: 0,   max: 10,  step: 0.1,  callback: changeTime});
	getRandomArray();

	//随机产生
	$('.click-random').click(function(){
		//clearAll();
		getRandomArray();
		if(timer != -1){
			clearInterval(timer);//当动画还在运行，点击随机数停止动画，重新生成
		}
	
		//将所有算法内的颜色改为初始颜色
		$('.code-2 p').css("background","transparent");
		//需要将其改为初始  有问题
		$('.code-3').text("");
		$('.submit').attr("disabled",false)


	});
	function  getRandomArray(){
		var RandomArray=[];
		for(var i=0;i<8;i++){
			var temp = parseInt(Math.random()*99+1); 
			RandomArray.push(temp);
		}
		addSvg(RandomArray);
	}

	//获取输入数字
	$('.submit').click(function(){
		$('.submit').attr("disabled",false)
		$(".result").html("");
		// clearAll(); 
		 var numArray=  getNumber();
		 if(numArray!=0){
		 	addSvg(numArray);
		 clearAll();
		 $('.submit').attr("disabled",true)
		 	var searchNum = $('.search').val(); 
		console.log(searchNum);
		var judge =/^-?\\d+$/　;//整数判断
		var judgef =/^(-?\d+)(\.\d+)?$/;//浮点数判断
		if(judge.test(searchNum) || judgef.test(searchNum) ){

		var result= search(searchNum, numArray)		
		}else{
			alert("请输入合适的数字");
		}
	  }
		//addSvg( numArray);
		// clearAll();
		
		
	})

	function addSvg( numArray){
		$('.input').val(numArray);
		var SVG  = document.getElementsByTagName('svg')[0];
	
		clearSvgChild();
		var per = getPer(numArray,H/2);
            console.log("得到的per值为:"+per);
            var rect = getRectItem(numArray.length);
          //  rectShape(H,arr,rect,per); 

		rectShape(H,numArray,rect,per);
		/*for(var i=0;i<numArray.length;i++){

			var rect =createRect(i,numArray[i]);
			SVG.appendChild(rect);
			var text = createText(i,numArray[i]);
			SVG.appendChild(text);

		}*/
	}
	   //创建所有的g元素
   function rectShape(H,array,rect,per){
       for(var i=0;i<array.length;i++){
       	  console.log(i);
         if(i==0){
            createRect(array[i]*per,rect.marginLeft,array[i]);
             
          }else{
            createRect(array[i]*per,rect.marginLeft+rect.margin*i+i*rect.rWidth,array[i]);  
          }
       	  
        }
    }

	//判断svg是否存在子元素，存在提交时候进行清除，防止覆盖
	function clearSvgChild(){
		while(document.getElementsByTagName("rect").length!=0){
			$('rect')[0].remove();
		}
	}
	//获得数组
	function getNumber(){
		var inputNum = $('.input').val();
		// console.log(inputNum);
		var patrn= /^(\d+,?)+$/;  //验证逗号分隔；
		  if(!patrn.test( inputNum)){
		        alert("输入数据格式不正确");
		        return 0;
		        //737,527,202,345,111,999,435,333
		    }
		    var numArray = inputNum.split(',');
		    if(numArray.length>10){

			        alert("输入数据请不要超过10组!");
			        return 0;
			}
		    return numArray;
	}
	//判断最长数字的length
		function maxNumlen(arr){
			// console.log(arr)
		    var max=Math.max.apply(null,arr)
		    var Smax =max +"";
		  if(max==10){
		  	return 1;
		  }	
		    return (Smax.length)
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
	//生成数字显示
	function createText(index,number){
		var showWidth = $('.showexe').width();//没有单位  .css("width");有单位
		var showHeight = $('.showexe').height();
		var numArray =  getNumber();
		var Len = maxNumlen(numArray);
		var text = document.createElementNS("http://www.w3.org/2000/svg","text");
		var textNode = document.createTextNode(number);
		text.style.textAnchor = "middle";//文字上下左右居中
		text.appendChild(textNode);
		text.setAttribute('y',showHeight-5);
		text.setAttribute('x',(index+1.5)*showWidth/12);


		return text;
	}

	//算法
	function search(num,arr){
		//var speed = $(".click-speed-1").val();
		/*if(speed>95) {
			//防止速度过快
			speed = 90;}
		console.log(speed);
		speed =speed*30;*/
		$('.code-2 p').eq(1).css("background","rgba(241, 199, 73, 0.83)")
		var i=0;
		 timer = setInterval(function(){

		 clearAll();
		$('rect').eq(i).css('fill',"rgb(242, 182, 75)");
		//$('rect').eq(i).css('fill',"red");
		clearBack();
		$('.code-2 p').eq(2).css("background","rgba(241, 199, 73, 0.83)")
		
			if(num==arr[i]){
				setTimeout(function(){
					console.log(i,arr[i]);
				clearBack()
				$('.code-2 p').eq(3).css("background","rgba(241, 199, 73, 0.83)")
			
				$('.result').html("下标为："+i);
				$('.moveresult').html("相等,下标为："+i);
				$('.submit').attr("disabled",false)
				clearInterval(timer);
				return i;
			},TIME)
				
				
			}else{setTimeout(function(){
				i++;
				$('.moveresult').html("不相等");
				clearBack()
				$('.code-2 p').eq(1).css("background","rgba(241, 199, 73, 0.83)")
				},TIME)
			}
			if(i>7){
				// clearBack()
				
			
				$(".result").html("没有找到");

				$('.submit').attr("disabled",false)
				setTimeout(function(){
					$('rect').eq(i-2).css('fill',"rgb(242, 182, 75)");
					clearBack()
					$('.code-2 p').eq(5).css("background","rgba(241, 199, 73, 0.83)")
					clearInterval(timer);
				},TIME)

			}
		},TIME*3)
		return -1;

	}
	function clearAll(){
		for(var j=0;j<7;j++){
			$('rect').eq(j).css('fill',"rgba(57, 149, 222, 0.84)");
		}
	}
	function clearBack(){
		for(var j=0;j<6;j++){
			$('.code-2 p').eq(j).css("background","transparent")
		}
	}

	  //产生per
    function getPer(arr,h){
        //   var min = getMin(arr);
           var max = getMax(arr);
           return h / max;
    }

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


}
