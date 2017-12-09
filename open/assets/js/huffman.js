/*√.生成数组的函数（random/input） 
 *2.排序选择最小和次小数字
 *3.创建哈夫曼树
 *√.动态生成哈夫曼树
 *4.动画控制进度（上一步下一步，暂定开始，重来）
 * 4.code高亮显示&当前步骤解释
 * */
	
//===========================================================================================数据定义
var numMin = 10; //数据最小值
var numMax = 100; //数据最大值
var Range = 30; //数据最大差
var numlist = new Array; //存储生成的数组
var nodes = new Array; //存储最终生成的哈夫曼树
var ArrayMaxSize = 15;
var ArrayMinSize = 1;
var currentStep; //当前步数
var transitionTime = 7000; //动画时间控制
var isPlaying; //是否动画正在运行
var TreeCurrent = new Array; //存储的是每一个非叶子节点是在第几步时生成的，和非叶子节点中的step构成对应关系。
var nodeid = 1;
var windowWid;//屏幕宽度 实现移动端效果
var windowHeig;
var circleWid =1.2;
var animStep;
var animStepCount = 0;
//====================================================loading
$(function() {
	windowWid = $(window).width();
	windowHeig = $(window).height();
	if(windowWid <= 560){
		$("svg")[0].setAttribute("width","100vw");
		$("svg")[0].setAttribute("height","35vh");
		$("svg")[1].setAttribute("width","100vw");
		$("svg")[1].setAttribute("height","12vh");
		$("#parentSvg").css("margin-left","50px");
		ArrayMaxSize =11;
		circleWid = 2.2;
	}
	document.getElementsByClassName("click-random")[0].onclick = function() {
		isPlaying = false;
		pauseTrans();
		//将背景颜色改为transparent
		$(".code-2 p").css("background","transparent");
		document.getElementById("code-tips").innerHTML = "";
		createArray('random');
	};
	document.getElementsByClassName("click-freedom-2")[0].onclick = function() {
		pauseTrans();
		createArray('input');
	};
	var start = document.getElementsByClassName('kaishi')[0];
/*	var pause = document.getElementById('zanting');*/
	start.onclick = function() {
		if(!isPlaying)  playTrans();
		/*start.style.display = "none";
		pause.style.display = "block";*/
	}
	/*pause.onclick = function() {
		pauseTrans();
		start.style.display = "block";
		pause.style.display = "none";
	}*/
/*	document.getElementsByClassName("click-speed-1")[0].onchange = function() {
		var inputTime = this.value;
		setAnimationDuration(inputTime);
	};*/
	$('input[class = "click-input" ]')[0].onchange = function() {
		var patrn = /^(\d+,?)+$/;
		if(!patrn.exec(this.value)) {
			alert("请使用英文逗号分隔元素");
			return false;
		}
	};
	document.getElementsByClassName("click-add")[0].onclick = function(){
		//pauseTrans();
		//clearInterval(animInterval);
		//isPlaying = true ;
		if(!isPlaying){
			setAnimationDuration(1);
		}
	}
	createArray('random');
	populatePseudocode([
		'while list.length > 1',
		'  sort(list)',
		'  creat new node',
		'  node.value =firstElement.value + secondElement.value',
		'  insert(node)',
		'  delete(firstElement)',
		'  delete(secondElement)',
		'  node.left = firstElement',
		'  node.right = secondElement',
	]);

});

//============================================================================================生成数组
function createArray(type) {
	numlist = []; //每次创建数组需要先清空
	nodes = [];
	TreeCurrent = [];
	currentStep = 0; //清空当前进行的步数
	if(type == 'random') {
		var min = numMin;
		var max = numMax;
		var size = 5 + parseInt((ArrayMaxSize - 5)* Math.random()); //随机数组长度在15以内
		for(var i = size; i > 0; i--) {
			numlist.push(min + parseInt(Range * Math.random())); //计算出给定范围内允许的值
		}
		var arrayinput = $('input[class = "click-input" ]')[0];
		arrayinput.value = numlist.join();
		createHufuTree(numlist);
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
			if(arrayTemp[i] < 0 || arrayTemp[i] > numMax) { //数据超出范围
				alert("请确保每个数据的大小介于1~100之间");
				return false;
			}
		}
		for(var i = 0; i < arrayTemp.length; i++) {
			numlist.push(parseInt(arrayTemp[i]));
		}
		if(createHufuTree(numlist) > 6) {
			alert("树的深度大于6，请减少元素！");
			return false;
		}
	}
	drawcircle();
}
//============================================算法
/*根据每次排序后的数组
 */
function Node(num) { //定义结点信息  
	this.num = num;
	this.left = null;
	this.right = null;
	this.xposition = 0; //存储结点在画布上展现的位置
	this.yposition = 0;
}

function createHufuTree(numlist) {
	/*初始化结点*/
	for(var i = 0; i < numlist.length; i++) {
		nodes.push(new Node(numlist[i]));
	}
	while(nodes.length > 1) {
		nodes.sort(function(a, b) {
			return a.num - b.num;
		});
		var one = nodes.shift(); //删除数组中第一个元素并返回。
		var two = nodes.shift();
		var sum = one.num + two.num;
		/*构造结点*/
		var root = new Node(sum);
		root.left = one;
		root.right = two;
		TreeCurrent.push(root);
		nodes.unshift(root); //在数组的前端添加任意项并返回新数组的长度。
	}
	return getDepth(nodes[0]);
}

function getDepth(root) {
	if(root === null) return 0;
	var a = getDepth(root.left);
	var b = getDepth(root.right);
	if(a > b) return(a + 1)
	return(b + 1)
}

//======================================================生成图形并计算他们的位置
var svgWidth;
var circleShowFst;
var circleShowSed;

function drawcircle() {
	$("svg")[0].innerHTML = ''; //清空画布
	$("svg")[1].innerHTML = '';
	circleShowFst = 7;
	circleShowSed = 7;
	svgWidth = parseInt($("svg")[0].getAttribute("width"));
	if(windowWid < 560) svgWidth =	svgWidth -5 ;
	var tempNode = nodes[0];
	var marginTop = 5;

	transitionTime = 7000;
	if(tempNode != null) {
		creatCircleNode(tempNode, 1, marginTop, 1.0);
		creatLineConnect(tempNode);
		for(var i = 0; i < TreeCurrent.length; i++)
			creatParentNode(i);
	}
}

function creatCircleNode(tempNode, n, Top, aparam) {
	tempNode.xposition = aparam * svgWidth / Math.pow(2, n) - circleWid;
	tempNode.yposition = Top;
	var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	g.style.transform = "translate(" + tempNode.xposition + "vw," + tempNode.yposition + "vh)";
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c.setAttribute("stroke", "rgba(57, 149, 222, 0.84)");
	c.setAttribute("fill", "white");
	c.setAttribute("stroke-width", "3px");
	c.setAttribute("cx", "0vw");
	c.setAttribute("cy", "0vh");
	if(n < 6)
		c.setAttribute("r", circleWid+"vw");
		else c.setAttribute("r", circleWid - circleWid/6.0 +"vw");
	var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	text.textContent = tempNode.num;
	text.setAttribute("fill", "black");
	// console.log("datanum" + tempNode.num);
	
	if(windowWid < 560){
		text.setAttribute("font-size","10px");
		if(tempNode.num > 99) {
		text.setAttribute("x", "-2.1vw");
	} else if(tempNode.num > 9) {
		text.setAttribute("x", "-1.2vw");
	} else {
		text.setAttribute("x", "-0.35vw");
	}
	}
	else
	{
		if(tempNode.num > 99) {
		text.setAttribute("x", "-1.0vw");
	} else if(tempNode.num > 9) {
		text.setAttribute("x", "-0.7vw");
	} else {
		text.setAttribute("x", "-0.35vw");
	}
	}
	text.setAttribute("y", "0.5vh");
	g.appendChild(c);
	g.appendChild(text);
	g.style.display = "none";
	g.style.transition = "all " + (transitionTime / 2.0) / 1000 + "s ease ";
	var gidName = parseInt(tempNode.xposition) + "and" + parseInt(tempNode.yposition);
	g.id = gidName;
	$('svg')[0].appendChild(g);
	aparam = 2 * aparam - 1;
	if(tempNode.left == null && tempNode.right == null) //则该节点不是叶子节点
	{
		var c1 = c.cloneNode(true);
		c1.setAttribute("r", circleWid /1.2 * 1.5+"vw");
		var text1 = text.cloneNode(true);
		var g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
		g1.style.transform = "translate(" + circleShowFst + "vw," +  5+ "vh)";
		circleShowFst = circleShowFst + circleWid * 3.3;
		var g1idName = "1g" + parseInt(tempNode.xposition) + "and" + parseInt(tempNode.yposition);
		g1.appendChild(c1);
		g1.appendChild(text1);
		g1.id = g1idName;

		$("svg")[1].appendChild(g1);
	}
	if(tempNode.left != null) creatCircleNode(tempNode.left, n + 1, Top + 7, aparam);
	else return;
	if(tempNode.right != null) {
		aparam = aparam + 2;
		creatCircleNode(tempNode.right, n + 1, Top + 7, aparam);
	} else return;
}

function creatParentNode(i) {
	var tempNode = TreeCurrent[i];
	var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	if(windowWid > 560) g.style.transform = "translate(" + circleShowSed + "vw," + 12 + "vh)";
	else g.style.transform = "translate(" + circleShowSed + "vw," + 9 + "vh)";
	circleShowSed = circleShowSed + circleWid * 3.3;
	var gidName = "1g" + parseInt(tempNode.xposition) + "and" + parseInt(tempNode.yposition);
	g.id = gidName;
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c.setAttribute("stroke", "rgba(57, 149, 222, 0.84)");
	c.setAttribute("fill", "white");
	c.setAttribute("stroke-width", "3px");
	c.setAttribute("cx", "0vw");
	c.setAttribute("cy", "0vh");
	c.setAttribute("r", circleWid /1.2 * 1.5+ "vw");
	var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	text.textContent = tempNode.num;
	text.setAttribute("fill", "black");
	if(windowWid < 560){
		text.setAttribute("font-size","10px");
		if(tempNode.num > 99) {
		text.setAttribute("x", "-2.1vw");
	} else if(tempNode.num > 9) {
		text.setAttribute("x", "-1.2vw");
	} else {
		text.setAttribute("x", "-0.35vw");
	}
	}
	else
	{
		if(tempNode.num > 99) {
		text.setAttribute("x", "-1.0vw");
	} else if(tempNode.num > 9) {
		text.setAttribute("x", "-0.7vw");
	} else {
		text.setAttribute("x", "-0.35vw");
	}
	}
	text.setAttribute("y", "0.5vh");
	g.appendChild(c);
	g.appendChild(text);
	g.style.display = "none";
	$("svg")[1].appendChild(g);
}

function creatLineConnect(tempNode) { //画连接线

	var nodeId = parseInt(tempNode.xposition) + "and" + parseInt(tempNode.yposition);
	if(tempNode.left != null) {
		var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		if(windowWid > 560){
			line1.setAttribute("x1", - circleWid /2.0 -0.5 + "vw");
		line1.setAttribute("y1", circleWid / 2.0 +0.5+ "vh");
		line1.setAttribute("x2", tempNode.left.xposition - tempNode.xposition+circleWid/2.0 -0.9+"vw");
		line1.setAttribute("y2", tempNode.left.yposition - tempNode.yposition -circleWid/2.0 + "vh");
		}
		else{
		line1.setAttribute("x1", - circleWid /2.0 + "vw");
		line1.setAttribute("y1", circleWid / 2.0 + "vh");
		line1.setAttribute("x2", tempNode.left.xposition - tempNode.xposition+circleWid/2.0  +"vw");
		line1.setAttribute("y2", tempNode.left.yposition - tempNode.yposition -circleWid/2.0 + "vh");
		}
		//		line1.style.transition = "all " + (transitionTime / 2.0)/1000 +"s ease " ;
		line1.style = "stroke:rgb(0,0,0);stroke-width:4";
		$("#" + nodeId).append(line1);
		creatLineConnect(tempNode.left);
	}
	if(tempNode.right != null) {
		var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
		
		if(windowWid > 560){
		line2.setAttribute("x1", circleWid /2.0 +0.5 + "vw");
		line2.setAttribute("y1", circleWid /2.0  +0.5+ "vh");
		line2.setAttribute("x2", tempNode.right.xposition - tempNode.xposition-circleWid/2.0 +0.9 + "vw");
		line2.setAttribute("y2", tempNode.right.yposition - tempNode.yposition -circleWid/2.0 + "vh");
		}
		else{
		line2.setAttribute("x1", circleWid /2.0  + "vw");
		line2.setAttribute("y1", circleWid /2.0  + "vh");
		line2.setAttribute("x2", tempNode.right.xposition - tempNode.xposition-circleWid/2.0  + "vw");
		line2.setAttribute("y2", tempNode.right.yposition - tempNode.yposition -circleWid/2.0 + "vh");
		}
		line2.style = "stroke:rgb(0,0,0);stroke-width:4";
		$("#" + nodeId).append(line2);
		creatLineConnect(tempNode.right);
	}

}
//============================================代码
var populatePseudocode = function(x) {
	var i = 1;
	for(; i <= 9 && i <= x.length; i++) {
		var codechanges = x[i - 1].replace(/^\s+/, function(m) {
			return m.replace(/\s/g, "&nbsp;");
		});
		var newCode = document.createElement("p");
		newCode.id = "code-2-" + i;
		newCode.innerHTML = "" + codechanges;
		document.getElementsByClassName("code-2")[0].appendChild(newCode);
	}
	var newtab = document.createElement("p");
	newtab.id = "code-tips";
	document.getElementsByClassName("code-3")[0].appendChild(newtab);
}
//=============================================动画
var animInterval;

function ShowNode(gNodeID) {
	$("#" + gNodeID).css("display", "block");
}

function turnRed(gNodeID) {
	var c = document.getElementById(gNodeID).getElementsByTagName("circle")[0];
	var t = document.getElementById(gNodeID).getElementsByTagName("text")[0];
	c.setAttribute("stroke", "rgba(226, 12, 12, 0.66)");
	t.setAttribute("fill", "rgba(226, 12, 12, 0.66)");
}

function turnGreen(gNodeID) {
	var c = document.getElementById(gNodeID).getElementsByTagName("circle")[0];
	var t = document.getElementById(gNodeID).getElementsByTagName("text")[0];
	c.setAttribute("stroke", "rgb(242, 182, 75)");
	t.setAttribute("fill", "rgb(242, 182, 75)");
}

function turnGray(gNodeID) {
	var c = document.getElementById(gNodeID).getElementsByTagName("circle")[0];
	var t = document.getElementById(gNodeID).getElementsByTagName("text")[0];
	c.setAttribute("stroke", "rgb(208,197,197)");
	t.setAttribute("fill", "rgb(208,197,197)");
}

function turnBlack(gNodeID) {
	var c = document.getElementById(gNodeID).getElementsByTagName("circle")[0];
	var t = document.getElementById(gNodeID).getElementsByTagName("text")[0];
	c.setAttribute("stroke", "rgba(57, 149, 222, 0.84)");
	t.setAttribute("fill", "black");
}

function turnHightlight(codeID) {
	$("#" + codeID).css({
		'background': 'rgba(241, 199, 73, 0.83)',
		'color': 'black'
	});
}

function turnDefault(codeID) {
	$("#" + codeID).css({
		'background': 'rgba(0, 0, 0, 0)',
		'color': 'black'
	});
}

function circleAnim(currentStep) {
	var tempNode = TreeCurrent[currentStep].left;
	var tempNode2 = TreeCurrent[currentStep].right;
	var g1IDName = "1g" + parseInt(TreeCurrent[currentStep].xposition) + "and" + parseInt(TreeCurrent[currentStep].yposition);
	var g1IDName1 = "1g" + parseInt(tempNode.xposition) + "and" + parseInt(tempNode.yposition);
	var g1IDName2 = "1g" + parseInt(tempNode2.xposition) + "and" + parseInt(tempNode2.yposition);
	var gIDName = parseInt(TreeCurrent[currentStep].xposition) + "and" + parseInt(TreeCurrent[currentStep].yposition);
	var gIDName1 = parseInt(tempNode.xposition) + "and" + parseInt(tempNode.yposition);
	var gIDName2 = parseInt(tempNode2.xposition) + "and" + parseInt(tempNode2.yposition);
	if(animStepCount >= 6) {animStepCount = 0;}
	animStep = setInterval(function(){
	if(animStepCount ==0 ){
		animStepCount++;
		turnHightlight("code-2-1");
		document.getElementById("code-tips").innerHTML = '当数组长度大于1时，进入循环。';}
	else if(animStepCount ==1 ){
		animStepCount++;
		turnRed(g1IDName1);
		turnRed(g1IDName2);
		turnHightlight("code-2-2");
		turnDefault("code-2-1")
		document.getElementById("code-tips").innerHTML = '对数组进行升序排序，取出最小元素 {first} 和次小元素{second}。'.replace("{first}", TreeCurrent[currentStep].left.num).replace("{second}", TreeCurrent[currentStep].right.num);
	}
	else if(animStepCount ==2 ){
		animStepCount++;
		ShowNode(gIDName1);
		ShowNode(gIDName2);
		turnRed(gIDName1);
		turnRed(gIDName2);
	}
	else if(animStepCount ==3 ){
		animStepCount++;
		ShowNode(g1IDName);
		turnGreen(g1IDName);
		turnDefault("code-2-2");
		turnHightlight("code-2-3");
		turnHightlight("code-2-4");
		turnHightlight("code-2-5");
		document.getElementById("code-tips").innerHTML = '创建元素，元素值为选中元素的和，即{value}。将新元素插入数组中。'.replace("{value}", TreeCurrent[currentStep].num);
	}
	else if(animStepCount ==4){
		animStepCount++;
		turnGray(g1IDName1);
		turnGray(g1IDName2);
		turnBlack(g1IDName);
		turnDefault("code-2-3");
		turnDefault("code-2-4");
		turnDefault("code-2-5");
		turnHightlight("code-2-6");
		turnHightlight("code-2-7");
		document.getElementById("code-tips").innerHTML = '将最小元素和次小元素从数组中删除。';
	}
	else if(animStepCount ==5 ){
		animStepCount++;
		ShowNode(gIDName);
		turnGreen(gIDName);
		turnDefault("code-2-6");
		turnDefault("code-2-7");
		turnHightlight("code-2-8");
		turnHightlight("code-2-9");
		document.getElementById("code-tips").innerHTML = '新元素生成一个结点，结点的左右孩子为最小元素和次小元素。';
	}
	else if(animStepCount ==6){
		animStepCount++;
		turnBlack(gIDName);
		turnBlack(gIDName1);
		turnBlack(gIDName2);
		turnDefault("code-2-8");
		turnDefault("code-2-9");
		document.getElementById("code-tips").innerHTML = '本轮结束。'
		setTimeout( clearInterval(animStep),0);
		
	}
	console.log("animStepCount"+animStepCount);
	},transitionTime / 7.0);
}
function setAnimationDuration(x) {
	transitionTime = x;
	//(isPlaying) {
		clearInterval(animInterval);
		playTrans();
	//}
}

function playTrans() {
	isPlaying = true;
	document.getElementById("code-tips").innerHTML = '开始创建哈夫曼树。';
	
	animInterval = setInterval(function() {
		var tempNode = TreeCurrent[currentStep].left;
	var tempNode2 = TreeCurrent[currentStep].right;
	var g1IDName = "1g" + parseInt(TreeCurrent[currentStep].xposition) + "and" + parseInt(TreeCurrent[currentStep].yposition);
	var g1IDName1 = "1g" + parseInt(tempNode.xposition) + "and" + parseInt(tempNode.yposition);
	var g1IDName2 = "1g" + parseInt(tempNode2.xposition) + "and" + parseInt(tempNode2.yposition);
	var gIDName = parseInt(TreeCurrent[currentStep].xposition) + "and" + parseInt(TreeCurrent[currentStep].yposition);
	var gIDName1 = parseInt(tempNode.xposition) + "and" + parseInt(tempNode.yposition);
	var gIDName2 = parseInt(tempNode2.xposition) + "and" + parseInt(tempNode2.yposition);
			if(animStepCount > 6)
			{
				animStepCount =0;
				// console.log("大于6啦！！");
				currentStep++;
			}
			if(currentStep < TreeCurrent.length ){
				// console.log("current:"+currentStep+"treecurrent"+TreeCurrent.length);
				if(animStepCount ==0 ){
				animStepCount++;
				turnHightlight("code-2-1");
				document.getElementById("code-tips").innerHTML = '当数组长度大于1时，进入循环。';}
				else if(animStepCount ==1 ){
				animStepCount++;
				turnRed(g1IDName1);
				turnRed(g1IDName2);
				turnHightlight("code-2-2");
				turnDefault("code-2-1")
				document.getElementById("code-tips").innerHTML = '对数组进行升序排序，取出最小元素 {first} 和次小元素{second}。'.replace("{first}", TreeCurrent[currentStep].left.num).replace("{second}", TreeCurrent[currentStep].right.num);
			}
			else if(animStepCount ==2 ){
				animStepCount++;
				ShowNode(gIDName1);
				ShowNode(gIDName2);
				turnRed(gIDName1);
				turnRed(gIDName2);
			}
			else if(animStepCount ==3 ){
				animStepCount++;
				ShowNode(g1IDName);
				turnGreen(g1IDName);
				turnDefault("code-2-2");
				turnHightlight("code-2-3");
				turnHightlight("code-2-4");
				turnHightlight("code-2-5");
				document.getElementById("code-tips").innerHTML = '创建元素，元素值为选中元素的和，即{value}。将新元素插入数组中。'.replace("{value}", TreeCurrent[currentStep].num);
			}
			else if(animStepCount ==4){
				animStepCount++;
				turnGray(g1IDName1);
				turnGray(g1IDName2);
				turnBlack(g1IDName);
				turnDefault("code-2-3");
				turnDefault("code-2-4");
				turnDefault("code-2-5");
				turnHightlight("code-2-6");
				turnHightlight("code-2-7");
				document.getElementById("code-tips").innerHTML = '将最小元素和次小元素从数组中删除。';
			}
			else if(animStepCount ==5 ){
				animStepCount++;
				ShowNode(gIDName);
				turnGreen(gIDName);
				turnDefault("code-2-6");
				turnDefault("code-2-7");
				turnHightlight("code-2-8");
				turnHightlight("code-2-9");
				document.getElementById("code-tips").innerHTML = '新元素生成一个结点，结点的左右孩子为最小元素和次小元素。';
			}
			else if(animStepCount ==6){
				animStepCount++;
				turnBlack(gIDName);
				turnBlack(gIDName1);
				turnBlack(gIDName2);
				turnDefault("code-2-8");
				turnDefault("code-2-9");
				document.getElementById("code-tips").innerHTML = '本轮结束。'
			}
			}
			else{
				/*document.getElementById('kaishi').style.display = "block";
				document.getElementById('zanting').style.display = "none";*/
				document.getElementById("code-tips").innerHTML = '哈夫曼树创建完成。';
				clearInterval(animInterval);
			}
		}, transitionTime / 6.0);
}
function pauseTrans() {
	isPlaying = false;
	/*document.getElementById('kaishi').style.display = "block";
	document.getElementById('zanting').style.display = "none";*/
	clearInterval(animStep);
	clearInterval(animInterval);
}

     function changeTime(){
         transitionTime = 12000;
         transitionTime = transitionTime - 1000 * $(".click-speed-1").attr("value");
         console.log("TIME:"+transitionTime);
     }
  
  $(".click-speed-1").RangeSlider({min:0,max:10,step:0.1,callback:changeTime});
