/*√.生成数组的函数（random/input） 
 *2.排序
 *√.根据生成的数组动态生成矩形（矩形位置，矩形高）
 *4.动画控制进度（上一步下一步，暂定开始，重来）
 * 4.code高亮显示&当前步骤解释
 * */

//===========================================================================================数据定义
var numMin = 1; //数据最小值
var numMax = 100; //数据最大值
var Range; //数据最大差
var numlist = new Array; //存储生成的数组
var ArrayMaxSize = 14;
var ArrayMinSize = 1;
var arrayTemp; //在arraytemp上进行排序操作,并存储最终结果
var arrayStatusList = new Array; //用来存储每一步操作状态的数组，arrayStatusList的长度为进行交换的步数
var marginLeft;
var currentStep; //当前步数
var transitionTime =1250; //动画时间控制
var isPlaying; //是否动画正在运行
var arrayCurrent; //动画进行到的数组状态
var windowWid;//屏幕宽度 实现移动端效果
var windowHeig;
var rectWid = 3;//矩形宽度默认为3vw
var sortWay = "大于";//排序方式，用来在代码展示时修改文字内容
//===========================================================================================loading
window.onload = function() {
	windowWid = $(window).width();
	windowHeig = $(window).height();
	if(windowWid <= 560){
		$("svg")[0].setAttribute("width","100vw");
		ArrayMaxSize = 8;
		$("svg")[0].setAttribute("height","45vh");
		//$(".code-2").css("height","250px");
		rectWid = 6;
	}
	createArray('random'); //加载时生成一个随机数组并展示出来。
	drawRect(numlist); //生成数组之后直接绘制矩形
	BubbleSort();
	$(".click-add1")[0].onclick = function(){
		if(!isPlaying){
		pauseTrans();
		createArray('input');
		sortWay ="大于";
		BubbleSort();
		}
	}
	$(".click-add1")[1].onclick = function(){
		if(!isPlaying){
		pauseTrans();
		createArray('input');
		sortWay ="小于";
		BubbleSort();
		}
	}
	document.getElementsByClassName("click-random")[0].onclick = function() {
		pauseTrans();
		createArray('random');
		drawRect(numlist); //生成数组之后直接绘制矩形
		//将背景颜色改为transparent
		$(".code-2 p").css("background","transparent");
		document.getElementById("code-tips").innerHTML = "";
		BubbleSort();
	};
	document.getElementsByClassName("click-freedom-2")[0].onclick = function() {
		pauseTrans();
		createArray('input');
		drawRect(numlist); //生成数组之后直接绘制矩形
		BubbleSort();
	};
	var start = document.getElementsByClassName('kaishi')[0];
	/*var pause = document.getElementById('zanting');*/
	start.onclick = function() {
		if(!isPlaying && (currentStep<=arrayStatusList.length) )playTrans();
		/*start.style.display = "none";
		pause.style.display = "block";*/
	}
	/*pause.onclick = function() {
		pauseTrans();
		start.style.display = "block";
		pause.style.display = "none";
	}*/
/*	document.getElementsByClassName("click-speed-1")[0].onchange = function() {
		var inputTime = Number(this.value);
		setAnimationDuration(2500-inputTime);
	};*/
	$('input[class = "click-input" ]')[0].onchange = function() {
		var patrn = /^(\d+,?)+$/;
		if(!patrn.exec(this.value)) {
			alert("请使用英文逗号分隔元素");
			return false;
		}
	};
	document.getElementsByClassName("click-add")[0].onclick = function(){
		
		if(!isPlaying){
			pauseTrans();
			arrayDrectString = arrayStatusList[arrayStatusList.length - 1];
		arrayDrectStatus = arrayDrectString.split(",");
		arrayDraw = arrayDrectStatus.slice(3);
		drawRect(arrayDraw);
		clearInterval(animInterval);
		numlist = []; //每次创建数组需要先清空
		arrayStatusList = []; //每次重新创建数组需要重新计算排序状态数组
		currentStep = 1;
		}
	}
	populatePseudocode([
		'do',
		'  swapped = false',
		'  for i = 1 to indexOfLastUnsortedElement-1',
		'    if leftElement > rightElement',
		'      swap(leftElement, rightElement)',
		'      swapped = true',
		'while swapped'
	]);
	// console.log("all step :"+ arrayStatusList.length);
}
//============================================================================================生成数组
function createArray(type) {
	numlist = []; //每次创建数组需要先清空
	arrayStatusList = []; //每次重新创建数组需要重新计算排序状态数组
	currentStep = 1;
	if(type == 'random') {
		var min = numMin;
		var max = numMax;
		Range = max - min;
		var size = 4 + parseInt((ArrayMaxSize - 4) * Math.random()); //随机数组长度在20以内
		for(var i = size; i > 0; i--) {
			numlist.push(min + parseInt(Range * Math.random())); //计算出给定范围内允许的值
		}
		var arrayinput = $('input[class = "click-input" ]')[0];
		arrayinput.value = numlist.join();
	} else if(type == 'input') {
		var arrayinput = $('input[class = "click-input" ]')[0].value;
		var arrayTemp = arrayinput.split(","); //暂时存入该数组，用于检测数组是否合法
		if(arrayTemp.length > ArrayMaxSize) { //长度大于最大长度
			alert("数组长度不应大于"+ArrayMaxSize);
			return false;
		}

		for(var i = 0; i < arrayTemp.length; i++) {
			if(arrayTemp[i].trim() == "") { //缺失参数  
				alert("两个逗号之间缺少数字！");
				return false;
			}
			if(isNaN(arrayTemp[i])) { //存在无限大的数
				alert("存在无限大的数！");
				return false;
			}
			if(arrayTemp[i] < numMin || arrayTemp[i] > numMax) { //数据超出范围
				alert("请输入1~100之间的数字！");
				return false;
			}
		}
	for(var i = 0; i < arrayTemp.length; i++) {
				numlist.push(parseInt(arrayTemp[i]));
			}
	}
	console.log(numlist.join());

	
}
//================================================================================================绘制矩形
function drawRect(numlist) {
	//确定边距，位置
	document.getElementsByTagName("svg")[0].innerHTML = ''; //清空画布
	var length = numlist.length;
	var svgWidth = parseInt($("svg")[0].getAttribute("width")); 
	// console.log("marginleff：" + svgWidth);
	//获取数组确定高生成矩形
	for(var i = 0; i < length; i++) {
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		var className = "rect" + i;
		g.classList.add(className);
		var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		r.setAttribute("fill", "rgba(57, 149, 222, 0.84)");
		r.setAttribute("x", "0vw");
		r.setAttribute("y", "0vh");
		r.setAttribute("width", rectWid + "vw");
			marginLeft = (svgWidth - 1  - length * (rectWid+1)) / 2;
		if(windowWid <= 560){
			g.style.transform = "translate(" + (marginLeft + i * (rectWid+1)) + "vw," + (45 - numlist[i] / 2.5) + "vh)";
		}
		else{
			g.style.transform = "translate(" + (marginLeft + i * (rectWid+1)) + "vw," + (60 - numlist[i] / 2.5) + "vh)";
		}
		r.setAttribute("height", numlist[i] / 2.5 + "vh");
		var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.textContent = numlist[i];
		if(numlist[i] > 9) {
			text.setAttribute("x","0.6vw");
		} else {
			text.setAttribute("x","1.2vw");
		}
		text.setAttribute("y", (numlist[i] / 2.5 - 1) + "vh");
		g.appendChild(r);
		g.appendChild(text);
		document.getElementsByTagName("svg")[0].appendChild(g);
	}

}

//================================================================================================动画控制
//进行动画时所需要的数据定义
var animInterval;
var arrayCurrentStatusString ;
var arrayCurrentStatus ;
var swap ;
var turns;
var arrayIndexFirst ;
var arrayIndexSecond ;

var populatePseudocode = function(x) {//=================代码
	var i = 1;
	for(; i <= 7 && i <= x.length; i++) {
		var codechanges = x[i - 1].replace(/^\s+/, function(m) {
			return m.replace(/\s/g, "&nbsp;");
		});
		var newCode = document.createElement("p");
		newCode.id = "code" + i;
		newCode.innerHTML = "" + codechanges;
		document.getElementsByClassName("code-2")[0].appendChild(newCode);
	}
	var newtab = document.createElement("p");
	newtab.id = "code-tips";
	document.getElementsByClassName("code-3")[0].appendChild(newtab);
}

function rectTrans() { //矩形动画变换
	/*获取到arraystate数组和当前进行到的步数*/
	// console.log("rect currentstep:" + currentStep);
	var CompClassNameFst = "rect" + arrayIndexFirst;
	var CompClassNameSed = "rect" + arrayIndexSecond;
	var CompFirst = document.getElementsByClassName(CompClassNameFst)[0];
	var CompSecond = document.getElementsByClassName(CompClassNameSed)[0];
	setTimeout(function() {
		var flag
		if(swap == 1)  {
			flag=true;
			document.getElementById("code-tips").innerHTML ='检查：{val1} &gt; {val2}？如果{sortWay}，则进行交换.</p><p>当前交换标记的值为：swap = {swap}.'.replace("{val1}", arrayCurrent[arrayIndexSecond]).replace("{val2}",arrayCurrent[arrayIndexFirst] ).replace("{swap}", flag).replace("{sortWay}",sortWay);
		}
		else {
			flag=false;
			document.getElementById("code-tips").innerHTML ='检查：{val1} &gt; {val2}？如果{sortWay}，则进行交换.</p><p>当前交换标记的值为：swap = {swap}.'.replace("{val1}", arrayCurrent[arrayIndexFirst]).replace("{val2}", arrayCurrent[arrayIndexSecond]).replace("{swap}", flag).replace("{sortWay}",sortWay);
		}
		
		CompFirst.getElementsByTagName("rect")[0].setAttribute("fill", "rgb(242, 182, 75)");
		CompSecond.getElementsByTagName("rect")[0].setAttribute("fill", "rgb(242, 182, 75)");
		bgBlack("code4");

	}, 0);
	setTimeout(function() {
		bgGray("code4");
		CompFirst.getElementsByTagName("rect")[0].setAttribute("fill", "rgba(57, 149, 222, 0.84)");
		CompSecond.getElementsByTagName("rect")[0].setAttribute("fill", "rgba(57, 149, 222, 0.84)");
	}, transitionTime - transitionTime/6.0);
}

function animation() {

	//获取到了初始的g坐标
	var ClassNameFst = "rect" + arrayIndexFirst;
	var ClassNameSed = "rect" + arrayIndexSecond;
	var rectTransFirst = document.getElementsByClassName(ClassNameFst)[0];
	var rectTransSecond = document.getElementsByClassName(ClassNameSed)[0];
	var FirstTransX = parseFloat(marginLeft + arrayIndexFirst * (rectWid+1));
	var SecondTransX = parseFloat(marginLeft + arrayIndexSecond * (rectWid+1));
	
if(windowWid <= 560){
			var FirstTransY = 45 - arrayCurrent[arrayIndexFirst] / 2.5;
	var SecondTransY = 45 - arrayCurrent[arrayIndexSecond] / 2.5;
		}
		else{
			var FirstTransY = 60 - arrayCurrent[arrayIndexFirst] / 2.5;
	var SecondTransY = 60 - arrayCurrent[arrayIndexSecond] / 2.5;
		}
	// console.log("anim:currentstp" + currentStep);
	rectTransFirst.style.transition = "transform " + transitionTime / 1000 + "s ease";
	rectTransSecond.style.transition = "transform " + transitionTime / 1000 + "s ease";
	rectTransFirst.style.transform = "translate(" + SecondTransX + "vw," + SecondTransY + "vh)";
	rectTransSecond.style.transform = "translate(" + FirstTransX + "vw," + FirstTransY + "vh)";
	//更改g标签的class，和当前数组状态相对应
	rectTransFirst.classList.remove(ClassNameFst);
	rectTransFirst.classList.add(ClassNameSed);
	rectTransSecond.classList.remove(ClassNameSed);
	rectTransSecond.classList.add(ClassNameFst);
	setTimeout(function() {
		document.getElementById("code-tips").innerHTML = '交换 值为{val1}的元素 和值为 {val2}的元素的位置.</p><p>将swap置为true.'.replace("{val1}", arrayCurrent[arrayIndexFirst]).replace("{val2}", arrayCurrent[arrayIndexSecond]);
		rectTransFirst.getElementsByTagName("rect")[0].setAttribute("fill", "rgb(242, 182, 75)");
		rectTransSecond.getElementsByTagName("rect")[0].setAttribute("fill", "rgb(242, 182, 75)");
		bgBlack("code5");
		bgBlack("code6");
	}, 0);

	setTimeout(function() {
		rectTransFirst.getElementsByTagName("rect")[0].setAttribute("fill", "rgba(57, 149, 222, 0.84)");
		rectTransSecond.getElementsByTagName("rect")[0].setAttribute("fill", "rgba(57, 149, 222, 0.84)");
	}, transitionTime - transitionTime / 6.0);

}

function bgBlack(codeID){
	$("#"+codeID).css({"background":"rgba(241, 199, 73, 0.83)","color":"black"});
}
function bgGray(codeID){
	$("#"+codeID).css({"background":"rgba(160, 160, 160,0)","color":"black"}); 
}
function transAllStop(){

}
function playTrans() {
	var some = arrayStatusList[currentStep - 1];
	isPlaying = true;
	var flag = 0; //判断应该进行比较或是交换的标志
	var turnsflag = 0; //标志是否进行了每一轮开始的代码高亮（for。。高亮）
	var transAlready = 0;//判断在一轮结束时是否进行过应有的交换或比较，如果进行过，则为1，表示可以将最后一个矩形标志为已经排序完成的矩形。
	setTimeout(function() {
		if(currentStep == 1)
		document.getElementById("code-tips").innerHTML = '开始排序！'; 
	animInterval = setInterval(function() {
		if(currentStep <= arrayStatusList.length) {
			arrayCurrentStatusString = arrayStatusList[currentStep - 1];
			arrayCurrentStatus = arrayCurrentStatusString.split(",");
			swap = parseInt(arrayCurrentStatus[0]);
			turns = parseInt(arrayCurrentStatus[2]);
			arrayIndexFirst = parseInt(arrayCurrentStatus[1]);
			arrayIndexSecond = arrayIndexFirst + 1;
			arrayCurrent = arrayCurrentStatus.slice(3);
		}
		if(currentStep > arrayStatusList.length ) {
						document.getElementById("code-tips").innerHTML = '该轮没有进行过交换.<div>排序结束.';
						setTimeout(function() {
							document.getElementById("code-tips").innerHTML = '排序完成!'+arrayCurrent.join();
							for(var i = 0; i < numlist.length; i++)
								document.getElementsByClassName("rect" + i)[0].getElementsByTagName("rect")[0].setAttribute("fill", "rgba(226, 12, 12, 0.66)")
						}, transitionTime * 2.0);
						clearInterval(animInterval);
					}
			for(var i = 1; i <= 7; i++)
				bgGray("code" + i);
			if(numlist.length - parseInt(turns) == parseInt(arrayIndexSecond) && transAlready == 1) {
				setTimeout(function() {
					transAlready = 0;
					currentStep++;
					// console.log("zher?");
					 document.getElementById("code-tips").innerHTML = '将最后一个元素标志为已排序.</p><p>本轮排序已完成,继续下一步.';
					bgBlack("code7");
					document.getElementsByClassName("rect" +arrayIndexSecond)[0].getElementsByTagName("rect")[0].setAttribute("fill", "rgba(226, 12, 12, 0.66)");
				}, transitionTime / 2.0);
			} else if(flag == 0) {
				if((arrayIndexFirst == 0) && (turnsflag == 0)) {
					setTimeout(function() {
						 document.getElementById("code-tips").innerHTML = '将交换标志swap置为false.<div>然后从第1个到第{endIdx}个元素进行排序.</div>'.replace("{endIdx}", numlist.length - turns +1);
						bgBlack("code2");
						bgBlack("code3");
						turnsflag = 1;
					}, transitionTime / 4.0);
					setTimeout(function() {
						bgGray("code2");
						bgGray("code3");
					}, transitionTime);

				} else {
					turnsflag = 0;
					rectTrans();
					if(currentStep >= arrayStatusList.length  && swap == 0) {
						// console.log("是在rect这里结束哒！");
						document.getElementById("code-tips").innerHTML = '该轮没有进行过交换.<div>排序结束.';
						setTimeout(function() {
							document.getElementById("code-tips").innerHTML = '排序完成!'+arrayCurrent.join();
							for(var i = 0; i < numlist.length; i++)
								document.getElementsByClassName("rect" + i)[0].getElementsByTagName("rect")[0].setAttribute("fill", "rgba(226, 12, 12, 0.66)")
						}, transitionTime * 2.0);
						clearInterval(animInterval);
					}
					var changeflag = arrayStatusList[currentStep - 1].split(",")[0]; //changeflag=1时需要进行交换环节，将flag职位1，否则不需要交换进行下依次比较环节，currentstep++；
					if(numlist.length - parseInt(turns) == parseInt(arrayIndexSecond) && parseInt(swap) == 0)
						transAlready = 1;//表示进行过比较
					else if(parseInt(changeflag) == 1) {
						flag = 1;
					} 
					else if(parseInt(changeflag) == 0 && currentStep < arrayStatusList.length) {
						currentStep++;
						// console.log("是这里加的？");
					}	
				}
			}
		 else if(flag == 1) {
		 	// console.log("当前数组："+arrayCurrent);
			animation();
			flag = 0;
			if(numlist.length - parseInt(turns) == parseInt(arrayIndexSecond) && parseInt(swap)==1)
						transAlready = 1;//表示进行过交换
					else if(currentStep >= arrayStatusList.length  ) {
						// console.log("在交换的地方停下来的！");
						document.getElementById("code-tips").innerHTML = '该轮没有进行过交换.<div>排序结束.';
						setTimeout(function() {
							document.getElementById("code-tips").innerHTML = '排序完成!'+arrayCurrent.join();
							for(var i = 0; i < numlist.length; i++)
								document.getElementsByClassName("rect" + i)[0].getElementsByTagName("rect")[0].setAttribute("fill", "rgb(242, 182, 75)")
						}, transitionTime * 2.0);
						clearInterval(animInterval);
					}
			else if(currentStep <= arrayStatusList.length)
				{currentStep++;
					// console.log("buhuishizherba?");
				}
		}

	}, transitionTime);
	}, transitionTime / 4);
}

function pauseTrans() {
	isPlaying = false;
/*	document.getElementById('kaishi').style.display = "block";
	document.getElementById('zanting').style.display = "none";*/
	clearInterval(animInterval);
}

function setAnimationDuration(x) {
	transitionTime = x;
	
	if(isPlaying) {
		clearInterval(animInterval);
		playTrans();
	}
}

//===================================================================================================排序
function CreatArrayStatus(swap, index, turns, arrayCurrent) { //是否进行交换，比较时第一个元素下标，轮次，当前数组状态
	var arrayStatus = "";
	arrayStatus += swap + "," + index + "," + turns + "," + arrayCurrent.join().toString();
	return arrayStatus;
}

function change(index1, index2) { //swap
	var changetemp = arrayTemp[index1];
	arrayTemp[index1] = arrayTemp[index2];
	arrayTemp[index2] = changetemp;
};

function BubbleSort() { //bubble
	var countStep = 1; //步数从1开始计算，即存入字符串数组的第一个字符串是第一步进行的交换和交换后最终结果。
	arrayTemp = numlist;
	var length = arrayTemp.length;
	arrayStatusList = [];
	var flag = 1; //当进行交换flag为1，未进行交换flag为0；当一个轮次未进行交换时，排序完成。（优化）
	if(sortWay == "大于"){
		for(var i = 0; i < length; i++) {
		if(flag == 0) break; //上一轮未进行交换
		else {
			flag = 0;
			for(var j = 0; j < length - 1 - i; j++) {
				if(arrayTemp[j] > arrayTemp[j + 1]) {
					change(j, j + 1);
					flag = 1;
					var arrayCurrentStatus = CreatArrayStatus(1, j, i + 1, arrayTemp);
					arrayStatusList.push(arrayCurrentStatus);
					countStep++;
				} else {
					var arrayCurrentStatus = CreatArrayStatus(0, j, i + 1, arrayTemp);
					arrayStatusList.push(arrayCurrentStatus);
					countStep++;
				}

			}
		}
	}
	}
	else if (sortWay == "小于"){
		for(var i = 0; i < length; i++) {
		if(flag == 0) break; //上一轮未进行交换
		else {
			flag = 0;
			for(var j = 0; j < length - 1 - i; j++) {
				if(arrayTemp[j] < arrayTemp[j + 1]) {
					change(j, j + 1);
					flag = 1;
					var arrayCurrentStatus = CreatArrayStatus(1, j, i + 1, arrayTemp);
					arrayStatusList.push(arrayCurrentStatus);
					countStep++;
				} else {
					var arrayCurrentStatus = CreatArrayStatus(0, j, i + 1, arrayTemp);
					arrayStatusList.push(arrayCurrentStatus);
					countStep++;
				}
			}
		}
	}
	}

	currentStep = 1;
	//setAnimationDuration(2500-Number(document.getElementsByClassName("click-speed-1")[0].value)*200);
  function changeTime(){
         TIME = 2500;
         TIME = TIME - 200 * $(".click-speed-1").attr("value");
         console.log("TIME:"+TIME);
     }
  
  $(".click-speed-1").RangeSlider({min:0,max:10,step:0.1,callback:changeTime});

	clearInterval(animInterval);
	// console.log("stepnum:"+arrayStatusList.length);
}    function changeTime(){
         transitionTime = 2500;
         transitionTime = transitionTime - 200 * $(".click-speed-1").attr("value");
         console.log("TIME:"+transitionTime);
     }
  
  $(".click-speed-1").RangeSlider({min:0,max:10,step:0.1,callback:changeTime});

