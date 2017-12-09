window.onload = function(){
//需要修改   
//将svg置于页面中间
//其他按键将动画取消
var osb = document.getElementsByClassName("click-freedom-2")[0];
   // osb.setAttribute("pauseFlag",0);
var data = document.getElementsByClassName("click-input")[0];
var random = document.getElementsByClassName("click-random")[0];
var graph = new Graph();
var explain = document.getElementById("explain");
var svg = document.getElementById("svg");
    svg.setAttribute("height",document.defaultView.getComputedStyle(document.getElementById("doing-1"),null).height);
    svg.setAttribute("width",document.defaultView.getComputedStyle(document.getElementById("doing-1"),null).width);


var arr=autoCreate();
document.getElementsByClassName("click-freedom-2")[0].setAttribute("pauseFlag",1);  
osb.onclick = function(){

	var temp;
  if(this.getAttribute("pauseFlag") == 1){
        if(data.value == ''){
           alert("请先输入开始遍历的节点名称");   
        }else{
          this.setAttribute("pauseFlag",0);
           temp = verify(data.value,arr);     
           if(temp){
              graph.bfs(data.value.toUpperCase(),arr);
           }
        }
  }
  //}
   
}

 //改变延时时间
     function changeTime(){
         TIME = 2500;
         TIME = TIME - 200 * $(".click-speed-1").attr("value");
         console.log("TIME:"+TIME);
     }
  
  $(".click-speed-1").RangeSlider({min:0,max:10,step:0.1,callback:changeTime});

random.onclick=function(){
         pause();
         document.getElementsByClassName("click-freedom-2")[0].setAttribute("pauseFlag",1);
         clearAll();
         arr=autoCreate();
}


	function autoCreate(){
		var posArr = new Array();
		//自定义14个元素
		var myVertices = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];
		var length = getRandom(4,10);
		myVertices.length = length;
		console.log("length:",myVertices.length);
		var arr = new Array().concat(myVertices.slice(0,length));  //存储随机产生的字母
		var linePos;

		for (var i=0; i<myVertices.length; i++){
   		 graph.addVertex(myVertices[i]);
		}


		console.log("随机产生的字母是:");
		for(i=0;i<arr.length;i++){
			console.log(arr[i]);
		}

		linePos = addE();
		console.log(graph.toString());
		posArr = createPosition(length);
		createGraph(posArr,arr,linePos);


//动态增加边
	function addE(){
	  var linePos = new Array();
	  for(var i=0;i<myVertices.length;i++){
		 var random = getRandom(1,2);
		 console.log("random:",random);
		 var arr = new Array(1); //存储每个点相连接的点
		 for(var j=0;j<random;){
		 	  var r = getRandom(0,length-1);
		 	    //根据随机数不能选择重复的点
		 	  	 for(var m=0;m<arr.length;m++){
		 	  	 	 if(myVertices[r]==arr[m]||myVertices[r] == myVertices[i]){
		 	  	 	    	break;
		 	  	 	 }
		 	  	 }
		 	  	//产生的随机数和之前产生的点不能重复
		 	  	 if(m==arr.length&&graph.repeat(r,myVertices[i])){  
		 	  	 		arr.push(myVertices[r]);
		 	  	 	    graph.addEdge(myVertices[i],myVertices[r]);
                j++;   
		 	  	 }
		 	  	 
		 	 
		 }
	       linePos.push(arr);	
	}
	return linePos;
  }
   return arr;
 }




}

var TIME = 1250;
//定义定时器及定时器数组
var timer = new Array();
var timer0;
	//定义字典
function Dictionary(){
    var items = {};
    this.set = function(key, value){
        items[key] = value; 
    };
    this.remove = function(key){
        if (this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    };
    this.has = function(key){
        return items.hasOwnProperty(key);
    };
    this.get = function(key){
        return this.has(key)? items[key] : undefined;
    };
    this.clear = function(){
        items = {};
    };
    this.size = function(){
        return Object.keys(items).length;
    };
    this.keys = function(){
        return Object.keys(items);
    };
    this.values = function(){
        var values = [];
        for (var k in items) {
            if (this.has(k)) {
                values.push(items[k]);
            }
        }
        return values;
    };
    this.each = function(fn){
        for (var k in items) {
            if (this.has(k)) {
                fn(k, items[k]);
            }
        }
    };
    this.getItems = function(){
        return items;
    }
}


//定义队列
function Queue() {
  var items = [];
  this.enqueue = function(element){//向队列尾部添加一个（或是多个）元素
    items.push(element);
  };
  this.dequeue = function(){//移除队列的第一个元素，并返回被移除的元素
    return items.shift();
  };
  this.front = function(){//返回队列的第一个元素——最先被添加的,也将是最先被移除的元素。队列不做任何变动。（不移除元素，只返回元素信息。与stack的peek方法类似）
    return items[0];
  };
  this.isEmpty = function(){//如果队列内没有任何元素就返回true，否则返回false
    return items.length == 0;
  };
  this.clear = function(){//移除队列里的所有元素
    items = [];
  };
  this.size = function(){//返回队列里的元素个数
    return items.length;
  };
  this.print = function(){
    return items.toString();
  };
 }

 //定义图
function Graph(){
    var vertices = []; //存储图中所有的顶点名字
    var adjList = new Dictionary();//用之前的一个字典来存储邻接表

    this.addVertex = function(v){ //添加顶点
        vertices.push(v);
        adjList.set(v, []); //顶点为键，字典值为空数组
    };
    this.addEdge = function(v, w){ //添加边
        adjList.get(v).push(w); //基于有向图
        adjList.get(w).push(v); //基于无向图
    };
   /* this.toString = function(){
        var s = '';
        for (var i=0; i<vertices.length; i++){
            s += vertices[i] + ' -> ';
            var neighbors = adjList.get(vertices[i]);
            for (var j=0; j<neighbors.length; j++){
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    };
*/    this.repeat = function(random,m){
       var temp = adjList.get(m);
       for(var n=0;n<temp.length;n++){
       	   if(vertices[random] == temp[n]){
       	   	break;
       	   }
       }
       return n==temp.length;
    }

    var initializeColor = function(){
        var color = [];
        for (var i=0;i<vertices.length; i++){
            color[vertices[i]] = 'white';
        }
        return color;
    };
      this.bfs = function(v,arr){
      var color = initializeColor(),
          queue = new Queue(); //创建一个队列
          queue.enqueue(v); //入队列
    
      var count = 1;
       
      var temp = v;
      var circle = document.getElementsByTagName("circle");
      var line = document.getElementsByTagName("line");
      //在动画执行期间设置pauseFlag为1
     //document.getElementsByClassName("click-freedom-2")[0].setAttribute("pauseFlag",1);   
      	    
             timer0 = setTimeout(function(){
                  lightBackground(0);
             },count*TIME);
             count++;
             timer.push(timer0);

             while(!queue.isEmpty()){

              var u = queue.dequeue(), //出队列
                  neighbors = adjList.get(u); //邻接表
                  arr.push(u);
                  len=0;
                 color[u] = 'grey'; //发现了但还未完成对其的搜素
	           
                 //指出源节点
                  readSource(temp,count,u,queue.print());
                  count++;
                  //点亮while循环并指出此时的队列是什么
                /* (function(arr){
                     timer0 = setTimeout(function(){
                        lightBackground(1);
                         explain.innerHTML="此时的队列是"+arr;
                     },TIME*count);
                     count++;
                     timer.push(timer0);
                 })(queue.print());*/

                  


		         for (var i=0;i<neighbors.length;i++){
		              var w = neighbors[i]; //顶点名
		              if(color[w] === 'white'){
		              	 
		                  color[w] = 'grey'; //发现了它
		                  queue.enqueue(w); //入队列循环
                      var t = queue.print();
                      (function(u,w,t){
                         timer0=setTimeout(function(){
                          //将u节点改变颜色
                          var index1 = getIndex(u);
                          circle[index1].setAttribute("fill","rgb(255, 0, 0)");
                          //将uv连线改变颜色
                          for(var i=0;i<line.length;i++){
                              if(line[i].getAttribute("data") == u+w || line[i].getAttribute("data")==w+u){
                                 line[i].setAttribute("stroke","rgba(255, 103, 34, 0.86)");
                                 break;
                              }
                          }
                          lightBackground(2,3,4);
                          explain.innerHTML="此时的源节点是"+u+",从该节点访问到节点"+w+",入队列后得到队列是:"+t;
                          //将v改变颜色
                          var index2 = getIndex(w);
                          circle[index2].setAttribute("fill","rgb(242, 182, 75)");
                        },TIME*count);
                         timer.push(timer0);
                      })(u,w,t);

                      count++;
		              }else{

                     (function(u,w){
                         timer0=setTimeout(function(){
                         /* for(var i=0;i<line.length;i++){
                              if(line[i].getAttribute("data") == u+w || line[i].getAttribute("data")==w+u){
                                 line[i].setAttribute("stroke","rgb(242, 182, 75)");
                                 break;
                              }
                          }*/
                          lightBackground(2,3);
                          explain.innerHTML="此时的源节点是"+u+",从该节点访问到节点"+w+",但"+w+"节点之前遍历被访问过";
                        },TIME*count);
                        timer.push(timer0);
                     })(u,w);
                     count++;

                  }
		          }

         		 color[u] = 'black'; //已搜索过		       
		     }
        timer0 = setTimeout(function(){
           lightBackground(1);
           document.getElementsByClassName("click-freedom-2")[0].setAttribute("pauseFlag",1);
           document.getElementById("explain").innerHTML = "队列为空,遍历结束";
         },count*TIME);
       timer.push(timer0);
  };
}


function readSource(temp,count,u,arr){
	timer0=setTimeout(function(){
		      //  explain.innerHTML = "此时的源节点是"+u;
            var index = getIndex(u);
            var circle = document.getElementsByTagName("circle");
            for(var i=0;i<circle.length;i++){
               if(circle[i].getAttribute("fill")=='rgb(255, 0, 0)'){
                     circle[i].setAttribute("fill","#eee");
               }
            }
            circle[index].setAttribute("fill","rgb(255, 0, 0)");
            lightBackground(1);
            if(arr.length!=0){
              explain.innerHTML = "此时的队列是:"+u+','+arr;
            }else{
              explain.innerHTML = "此时的队列是:"+u;
            }
            
		       /* if(temp == u){
		        	lightBackground(0);
		        }*/
    },TIME*count);
   timer.push(timer0);		         		 
}

//根据节点名称得到节点index
function getIndex(value){
  var temp;
     switch(value){
       case 'A':temp=0;break;
       case 'B':temp=1;break;
       case 'C':temp=2;break;
       case 'D':temp=3;break;
       case 'E':temp=4;break;
       case 'F':temp=5;break;
       case 'G':temp=6;break;
       case 'H':temp=7;break;
       case 'I':temp=8;break;
       case 'J':temp=9;break;
       case 'K':temp=10;break;
       case 'L':temp=11;break;
       case 'M':temp=12;break;
       case 'N':temp=13;break;
       default:temp=14;
   }
   return temp;
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


   function createPosition(len){
   /*  var arr=[{x:50,y:5},{x:54,y:13},{x:70,y:13},{x:35,y:13},
     {x:80,y:21},{x:25,y:21},{x:40,y:21},{x:55,y:21},{x:70,y:21},
     {x:30,y:29},{x:50,y:29},{x:70,y:29},{x:40,y:38},{x:60,y:38}];  //定义14个固定点的坐标*/
    /* var arr=[{x:50,y:5},{x:40,y:10},{x:51,y:13},{x:63,y:16},{x:26,y:29},{x:43,y:20},{x:57,y:20},{x:67,y:22},{x:43,y:32},
     {x:57,y:32},{x:36,y:25},{x:63,y:25}];*/
     var showexeH = parseInt(document.getElementsByTagName("svg")[0].getAttribute("height"));
     var showexeW = parseInt(document.getElementsByTagName("svg")[0].getAttribute("width")) * 0.7;
     console.log("showexeH:"+showexeH);
     console.log("showexeW:"+showexeW);
     var arr = [{x:showexeW*0.4,Y:showexeH*0.4},
        {x:showexeW*0.2,Y:showexeH*0.2},
        {x:showexeW*0.6,Y:showexeH*0.6},
        {x:showexeW*0.4,Y:showexeH*0.1},
        {x:showexeW*0.8,Y:showexeH*0.7},
        {x:showexeW*0.7,Y:showexeH*0.5},
        {x:showexeW*0.1,Y:showexeH*0.6},
        {x:showexeW*0.9,Y:showexeH*0.2},
        {x:showexeW*0.3,Y:showexeH*0.7},
        {x:showexeW*0.5,Y:showexeH*0.8},
        {x:showexeW*0.1,Y:showexeH*0.4},
        {x:showexeW*0.6,Y:showexeH*0.1}];
    // var length = arr.length;
     var tempArr=new Array(1);
     //根据选出的点的个数随机产生点的坐标,不能选取重复的
     for(var i=0;i<len;i++){
     	while(1){
      
     		var random = getRandom(0,arr.length);

     		for(var j=0;j<tempArr.length;j++){
     			if(arr[random] == tempArr[j]){
     			 	break;
     			}
     		}
     		if(j == tempArr.length){
     			 tempArr.push(arr[random]);
     			 break;
     		}
     	}
     }
      console.log("产生的坐标为:");
      for(var m=1;m<tempArr.length;m++){
      	console.log(tempArr[m]);
      }
      return tempArr;
   }


   //创造circle line text
   function createGraph(arr,arr1,linePos){
   	console.log("传递的数组为:");
     var showexeW = parseInt(document.getElementsByTagName("svg")[0].getAttribute("width")) * 0.7;
      for(var m=1;m<arr.length;m++){
      	console.log(arr);
      }

       	console.log("传递的linePos为:");
       	for(m=0;m<linePos.length;m++){
       		console.log(linePos[m]);
       	}
   	  var svg = document.getElementsByTagName("svg")[0];
     //让svg居中显示
     //得到横坐标的最大，最小值
     var minW = getMinW(arr);
     var maxW = getMaxW(arr);
    // svg.style.paddingLeft = (parseInt(svg.getAttribute("width"))-maxW+minW)/2;

     //得到纵坐标的最大,最小值
     var minH = getMinH(arr);
     var maxH = getMaxH(arr);
    // svg.style.paddingTop =  (parseInt(svg.getAttribute("height"))-maxH+minH)/2;

     console.log("width:"+parseInt(svg.getAttribute("width")));
     console.log("heigth:"+parseInt(svg.getAttribute("height")));
     console.log("paddingLeft:"+svg.style.paddingLeft);
     console.log("paddingTop:"+svg.style.paddingTop);

   	  var g1 = document.createElementNS("http://www.w3.org/2000/svg","g");
   	  var g2 = document.createElementNS("http://www.w3.org/2000/svg","g");
   	  var g3 = document.createElementNS("http://www.w3.org/2000/svg","g");
      
      //增加circle
   	  for(var i=1;i<arr.length;i++){
   	  	var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
   	  	circle.setAttribute("cx",arr[i].x+"px");
   	  	circle.setAttribute("cy",arr[i].Y+"px");
   	  	circle.setAttribute("r",showexeW/55);
   	  	circle.setAttribute("stroke","black");
   	  	circle.setAttribute("stroke-width",1);
   	  	circle.setAttribute("fill","rgba(57, 149, 222, 0.84)");
   	  	g1.appendChild(circle);
   	  }

      svg.appendChild(g1);   
      //增加text
      for(var j=0;j<arr1.length;j++){
      	var text = document.createElementNS("http://www.w3.org/2000/svg","text");
      	text.textContent = arr1[j];
      	text.setAttribute("x",arr[j+1].x+"px");
      	text.setAttribute("y",arr[j+1].Y+"px");
      	text.setAttribute("text-anchor",'middle');
      	text.setAttribute("dominant-baseline","middle"); 
      	text.setAttribute("fill","#333");
      	text.style.fontSize="1.2em";
      	g2.appendChild(text);
      } 
      svg.appendChild(g2); 
      //增加line
      for(var m=0;m<linePos.length;m++){
      	
      	 var temp=0;
      	   for(var n=1;n<linePos[m].length;n++){	   	 
      	 	  switch(linePos[m][n]){
      	 	  	case 'A': temp=1;break;
      	 	  	case 'B': temp=2;break; 
      	 	  	case 'C': temp=3;break;
      	 	  	case 'D': temp=4;break;
      	 	  	case 'E': temp=5;break;
      	 	  	case 'F': temp=6;break;
      	 	  	case 'G': temp=7;break;
      	 	  	case 'H': temp=8;break;
      	 	  	case 'I': temp=9;break;
      	 	  	case 'J': temp=10;break;
      	 	  	case 'K': temp=11;break;
      	 	  	case 'L': temp=12;break;
      	 	  	case 'M': temp=13;break;
      	 	  	case 'N': temp=14;break;
      	 	  	default:temp=0;break;
      	 	  }
      	 	  if(temp != 0){
      	 	  	var line = document.createElementNS("http://www.w3.org/2000/svg","line");
      	   	  line.setAttribute("x1",arr[m+1].x+"px");
      	 	    line.setAttribute("y1",arr[m+1].Y+"px");
      	 	  	line.setAttribute("x2",arr[temp].x+"px");
      	 	    line.setAttribute("y2",arr[temp].Y+"px");
      	 	    line.setAttribute("data",arr1[m]+arr1[temp-1]);
      	 	    line.setAttribute("stroke","rgb(99,99,99)");
      	 	    g3.appendChild(line);
      	 	  }
      	 	  
      	   }
      }
      svg.appendChild(g3);
   }

  //检验输入的数是否符合规范
   function verify(data,arr){
   	  if(data.length>1){
   	  	 alert("您输入的字符数目超过1");
   	  }else{
        for(var i=0;i<arr.length;i++){
        	 if(data.toUpperCase() == arr[i]){
        	 	return true;
        	 }  
        }
        if(i==arr.length){
        	alert("您输入的字符没有在以上的节点范围之内，请重新输入");
        	return false;
        }
   	  }
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

      function getMinW(arr){
          var min = arr[1].x;
          for(var i=2;i<arr.length;i++){
            console.log("arrW:"+arr[i].x);
            if(min>arr[i].x){
              min = arr[i].x;
            }
          }

          console.log("minW:"+min);
          return min;
      }

      function getMaxW(arr){
          var max = arr[1].x;
          for(var i=2;i<arr.length;i++){
            
            if(max < arr[i].x){
              max = arr[i].x;
            }
          }
          console.log("maxW:"+max);
          return max;

      }

      function getMinH(arr){
            var min = arr[1].Y;
          for(var i=2;i<arr.length;i++){
            
            if(min > arr[i].Y){
              min = arr[i].Y;
            }
          }
          return min;
      }

      function getMaxH(arr){
          var max = arr[1].Y;
          for(var i=2;i<arr.length;i++){
            
            if(max < arr[i].Y){
              max = arr[i].Y;
            }
          }
          return max;
      }
      
        //终止所有的动画
         function pause(){
            count=1;
            if(timer.length!=0){
              for(var i=0;i<timer.length;i++){
                  clearTimeout(timer[i]);
              }
            }
            //改变颜色
            var code2 = document.getElementsByClassName("code-2")[0];
            var oli = code2.getElementsByTagName("li");
            for(i=0;i<oli.length;i++){
              oli[i].style.backgroundColor = "transparent";
            }
            //清空解释区的内容
            var explain = document.getElementById("explain");
            explain.innerHTML="";
        }

/*      //将所有的circle的颜色改为初始颜色
    function changeOrigin(){
      var circle = document.getElementsByTagName("circle");
      for(var i=0;i<circle.length;i++){
         circle[i].svg.getAttribute("fill")="rgba(57, 149, 222, 0.84)";
      }
    }*/