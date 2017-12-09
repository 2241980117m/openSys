//需要修改

//动画颜色
//explain() upflag =0 时解释的内容
//createAlgorithmDirection() upflag=0时算法的内容


var doc = document,
	delayTimeInput = doc.getElementById("click-speed-1"),
	sortedFlag = 0,
	setFlag = 0;

//默认延时时间为1250
var delayTime = 1250;

// 默认1升序,0为降序
var upflag = 1;

// 添加svg元素
var doing = document.getElementById("doing-1"),
	svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

/*svg1.style.width = "1344px";
svg1.style.height = "657px";*/


var up_sorted_flag = 0;
var down_sorted_flag = 0;

//修改
svg1.setAttribute("height", document.defaultView.getComputedStyle(document.getElementById("doing-1"), null).height);
svg1.setAttribute("width", document.defaultView.getComputedStyle(document.getElementById("doing-1"), null).width);

var maxHeight = 210;



//在不同的分辨率下设置不同的最大数组长度值

if (parseInt(svg1.getAttribute("width")) <= 425) {
	var NUM = 6;
} else if (parseInt(svg1.getAttribute("width")) <= 768) {
	var NUM = 8;
} else {
	var NUM = 10;
}


doing.insertBefore(svg1, doing.childNodes[0]);

baseX = parseInt(svg1.getAttribute("width")) / 2;
baseY = parseInt(svg1.getAttribute("height")) / 2;

// 创建待排序元素ok
function autoCreate() {
	up_sorted_flag = 0;
	down_sorted_flag = 0;

	for(var i=setFlag;i<setFlag+500;i++){
		clearTimeout(i)
	}

	var code3 = document.getElementsByClassName("code-3"),
		code2 = document.getElementsByClassName("code-2");

	code2[0].style.paddingTop = "10px";
	if(sortedFlag==1){
		// 重置下方解释区域
		while(code3[0].hasChildNodes()){
			code3[0].removeChild(code3[0].firstChild);
		}
		while(code2[0].hasChildNodes()){
			code2[0].removeChild(code2[0].firstChild);
		}
		createAlgorithmDirection();
	}


	var svg = document.getElementsByTagName("svg");
	while (svg[0].hasChildNodes()) {
		svg[0].removeChild(svg[0].firstChild);
	}
	do {
		var count = parseInt(Math.random() * 10);
		if (count >= 4 && count <= NUM) {
			break;
		}
	} while (1);
	var base = baseX - count * 25;
	var rectMax = 0;
	//生成rect大小
	var rectHeight = new Array();
	for (var i = 0; i < count; i++) {
		do {
			rectHeight[i] = parseInt(Math.random() * 50);
		} while (rectHeight[i] == 0)
		if (rectHeight[i] > rectMax) {
			rectMax = rectHeight[i];
		}
	}
	var per = parseInt(maxHeight / rectMax);

	// 添加元素
	for (var i = 0; i < count; i++) {
		// 生成group元素
		var g = createG(base, i, maxHeight, rectHeight[i], per);
		// 生成rect元素
		var rect = createRect(per, rectHeight[i]);
		// 生成text元素
		var text = createText(per, rectHeight[i]);
		// 将元素rect、text添加至g，将元素g添加至svg。
		g.appendChild(rect);
		g.appendChild(text);
		svg[0].appendChild(g);
	}
	appendId();

	// 改变input框为随机数值。
	init();
	sortedFlag = 0;

	var up_sort_button = document.getElementById("up-sort");
	var down_sort_button = document.getElementById("down-sort");
	up_sort_button.removeAttribute("disabled");
	down_sort_button.removeAttribute("disabled");	
};

// 通过输入创建待排序队列
function inputCreate() {
	up_sorted_flag = 0;
	down_sorted_flag = 0;

	for(var i=setFlag;i<setFlag+500;i++){
		clearTimeout(i)
	}

	var code3 = document.getElementsByClassName("code-3"),
		code2 = document.getElementsByClassName("code-2");
	if(sortedFlag==1){
		// 重置下方解释区域
		while(code3[0].hasChildNodes()){
			code3[0].removeChild(code3[0].firstChild);
		}
		while(code2[0].hasChildNodes()){
			code2[0].removeChild(code2[0].firstChild);
		}
		createAlgorithmDirection();
		code3[0].appendChild(explainNode[0]);
	}


	var input = document.getElementsByClassName("click-input"),
		inputArray = input[0].value.split(","),
		svg = document.getElementsByTagName("svg"),
		i = 0,
		max = 0,
		baseX = parseInt(svg1.getAttribute("width")) / 2,
		baseY = parseInt(svg1.getAttribute("height")) / 2;
	// 先对内容进行检验
	for (i = 0; i < inputArray.length; i++) {
		if (inputArray.length == 0) {
			alert("请输入数据！");
			return false;
		}
		if (inputArray.length > NUM) {
			alert("输入数据请不要超过" + NUM + "组！");
			return false;
		}
		if (parseInt(inputArray[i]) > 100 || parseInt(inputArray[i]) < 1) {
			alert("请确保每个数据的大小介于1~100之间。");
			return false;
		}
		if (max < parseInt(inputArray[i])) {
			max = parseInt(inputArray[i]);
		}
	}

	// 删除所有元素
	var svg = document.getElementsByTagName("svg");
	while (svg[0].hasChildNodes()) {
		svg[0].removeChild(svg[0].firstChild);
	}
	//准备工作
	var base = baseX - inputArray.length * 25;
	var per = parseInt(maxHeight / max);
	var rectMax = 0;
	// 插入新元素
	for (i = 0; i < inputArray.length; i++) {
		var g = createG(base, i, maxHeight, inputArray[i], per);
		var rect = createRect(per, inputArray[i]);
		var text = createText(per, inputArray[i]);
		g.appendChild(rect);
		g.appendChild(text);
		svg[0].appendChild(g);
	}
	appendId();
	sortedFlag = 0;

	var up_sort_button = document.getElementById("up-sort");
	var down_sort_button = document.getElementById("down-sort");
	up_sort_button.removeAttribute("disabled");
	down_sort_button.removeAttribute("disabled");	
}

function createAlgorithmDirection() {
	var i = 0,
		p = new Array,
		sort_code = new Array(),
		code2 = document.getElementsByClassName("code-2");

	// sort_code[0] = "tempQueue.push(createObj(leftGuard,rightGuard-1));"
	// sort_code[1] = "    while(tempQueue.length!=0){";
	// sort_code[2] = "        var tempObj = tempQueue.shift(),";
	// sort_code[3] = "       	    key = tempObj.start,";
	// sort_code[4] = "            leftGuard = key,";
	// sort_code[5] = "            rightGuard = tempObj.end;";
	// sort_code[6] = "        while(leftGuard!=rightGuard){";
	// sort_code[7] = "            while(value[rightGuard] >= value[key] && rightGuard > leftGuard){";
	// sort_code[8] = "                rightGuard--;";
	// sort_code[9] = "            }";
	// sort_code[10] = "        if(leftGuard<rightGuard){"
	// sort_code[11] = "            swap(value,key,rightGuard)"
	// sort_code[12] = "            key = rightGuard;";
	// sort_code[13] = "        {"


	if (upflag == 1) {
		sort_code[0] = "void quick_sort(int s[],int l,int r){"
		sort_code[1] = "    if(l<r){"
		sort_code[2] = "        int i = l, j = r, x = s[l];  "
		sort_code[3] = "        while (i < j){"
		sort_code[4] = "            while(i < j && s[j] >= x)    j--;"
		sort_code[5] = "            if(i < j)            s[i++] = s[j];"
		sort_code[6] = "            while(i < j && s[i] < x)     i++;"
		sort_code[7] = "            if(i < j)            s[j--] = s[i];"
		sort_code[8] = "        }"
		sort_code[9] = "        s[i] = x";
		sort_code[10] = "        if(l != i)    quick_sort(s,l,i-1);"
		sort_code[11] = "        if(i != r)    quick_sort(s,i+1,r);"
		sort_code[12] = "    }"
		sort_code[13] = "}"
	} else {
		sort_code[0] = "void quick_sort(int s[],int l,int r){"
		sort_code[1] = "    if(l<r){"
		sort_code[2] = "        int i = l, j = r, x = s[l];  "
		sort_code[3] = "        while (i < j){"
		sort_code[4] = "            while(i < j && s[j] <= x)    j--;"
		sort_code[5] = "            if(i < j)            s[i++] = s[j];"
		sort_code[6] = "            while(i < j && s[i] > x)     i++;"
		sort_code[7] = "            if(i < j)            s[j--] = s[i];"
		sort_code[8] = "        }"
		sort_code[9] = "        s[i] = x";
		sort_code[10] = "        if(l != i)    quick_sort(s,l,i-1);"
		sort_code[11] = "        if(i != r)    quick_sort(s,i+1,r);"
		sort_code[12] = "    }"
		sort_code[13] = "}"
	}

	for (var i = 0; i < sort_code.length; i++) {
		p[i] = document.createElement("p");
		p[i].style.whiteSpace = "pre";
		p[i].style.fontSize = "16px";
		if(parseInt(window.innerWidth) >= 1919 || parseInt(window.innerWidth) <= 769){
			p[i].style.padding = "5px 0px 5px 10px";
		}else{
			p[i].style.padding = "2px 0px 2px 10px";
		}
		p[i].style.marginBottom = 0;
		p[i].id = "p" + i;
		p[i].appendChild(document.createTextNode(sort_code[i]));
		code2[0].appendChild(p[i]);
	}
}

function explain() {
	explainText = new Array();
	/*explainText[0] = "快速排序基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。"
	explainText[1] = "上述代码为C语言版本。"*/
	if (upflag == 1) {
		explainText[0] = "s为待排序数组，l为左哨兵，r为右哨兵。"
		explainText[1] = "如果当前左右哨兵没有相遇"
		explainText[2] = "记录当前的左哨兵、右哨兵的位置，并取出基准数"
		explainText[3] = "如果当前左哨兵右哨兵未相遇，并且右哨兵的值大于等于基准数"
		explainText[4] = "将右哨兵向左移动"
		explainText[5] = "将右哨兵移动至基准数位置，同时将左哨兵右移一位"
		explainText[6] = "如果当前左哨兵右哨兵未相遇，并且左哨兵的值小于等于基准数"
		explainText[7] = "将左哨兵向右移动"
		explainText[8] = "将左哨兵移动到基准数位置，同时将右哨兵左移一位"
		explainText[9] = "将基准数移动到左右哨兵相遇的位置处"
		explainText[10] = "以l作为左哨兵，i-1作为右哨兵进行快速排序"
		explainText[11] = "以i+1作为左哨兵，r作为右哨兵进行快速排序"
		explainText[12] = "排序完毕"
		explainText[13] = "红色代表基准数，黄色代表当前与基准数比较的数，浅蓝色代表与基准数交换的元素"
	} else {
		explainText[0] = "s为待排序数组，l为左哨兵，r为右哨兵。"
		explainText[1] = "如果当前左右哨兵没有相遇"
		explainText[2] = "记录当前的左哨兵、右哨兵的位置，并取出基准数"
		explainText[3] = "如果当前左哨兵右哨兵未相遇，并且右哨兵的值大于等于基准数"
		explainText[4] = "将右哨兵向左移动"
		explainText[5] = "将右哨兵移动至基准数位置，同时将左哨兵右移一位"
		explainText[6] = "如果当前左哨兵右哨兵未相遇，并且左哨兵的值小于等于基准数"
		explainText[7] = "将左哨兵向右移动"
		explainText[8] = "将左哨兵移动到基准数位置，同时将右哨兵左移一位"
		explainText[9] = "将基准数移动到左右哨兵相遇的位置处"
		explainText[10] = "以l作为左哨兵，i-1作为右哨兵进行快速排序"
		explainText[11] = "以i+1作为左哨兵，r作为右哨兵进行快速排序"
		explainText[12] = "排序完毕"
		explainText[13] = "红色代表基准数，黄色代表当前与基准数比较的数，浅蓝色代表与基准数交换的元素"
	}

	explainNode = new Array();
	for (var i = explainText.length - 1; i >= 0; i--) {
		explainNode[i] = document.createElement("p");
		explainNode[i].appendChild(document.createTextNode(explainText[i]));
		explainNode[i].style.paddingLeft = "8px";
		//explainNode[i].style.paddingTop = "5px";
	}

}

// 给绘图相关元素加上ID属性 ok
function appendId() {
	var sortG = document.getElementsByTagName("g");
	var svg = d3.select("svg");
	svg.selectAll("g")
		.attr("id", (d, i) => ("g" + i));
	svg.selectAll("rect")
		.attr("id", (d, i) => ("r" + i));
	svg.selectAll("text")
		.attr("id", (d, i) => ("t" + i))
}

// 创建g标签，容纳rect及text标签 ok
function createG(base, i, maxHeight, rectHeight, per) {
	var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	var translateX = base + i * 45;
	var translateY = maxHeight - rectHeight * per;
	console.log(rectHeight[i]);
	var translate = "translate(" + translateX.toString() + "," + translateY.toString() + ")";
	g.setAttribute("transform", translate);
	return g;
}
// 创建rect标签。绘制长方形 ok
function createRect(per, rectHeight) {
	var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	rect.setAttribute("height", per * rectHeight);
	rect.setAttribute("width", 40);
	rect.style.fill = "rgba(57, 149, 222, 0.84)";
	return rect;
}
// 创建text标签。 ok
function createText(per, rectHeight) {
	var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
	var textNode = document.createTextNode(rectHeight);
	text.style.textAnchor = "middle";
	text.appendChild(textNode);
	text.setAttribute("dy", ".35em");
	text.setAttribute("x", "22");
	if (rectHeight * per < 28) {
		text.setAttribute("y", "-15");
	} else {
		var y = rectHeight * per - 15;
		text.setAttribute("y", y)
	}
	return text;
}

// 创建队列元素
function createObj(start, end) {
	var obj = new Object();
	obj.start = start;
	obj.end = end;
	return obj;
};

function getAllG() {
	var svg = document.getElementsByTagName("svg");
	var gAll = svg[0].getElementsByTagName("g");
	return gAll;
}

// ok
function getAllRect() {
	var svg = document.getElementsByTagName("svg");
	var sortRect = svg[0].getElementsByTagName("rect");
	return sortRect;
}

// ok
function getAllText() {
	var svg = document.getElementsByTagName("svg");
	var sortValue = svg[0].getElementsByTagName("text");
	return sortValue;
}
// 获取权值
function getTextValue(sortText) {
	var arr = new Array(),
		length = sortText.length;
	for (var i = 0; i < length; i++) {
		arr[i] = sortText[i].innerHTML;
	}
	return arr;
}

// 交换value数组leftGuard和rightGuard序号的值
function swap(value, leftGuard, rightGuard) {
	var temp = value[leftGuard];
	value[leftGuard] = value[rightGuard];
	value[rightGuard] = temp;
}

// 改变图形的颜色
function d3ChangeColor(id, time, x, delayTime, color) {
	d3.select(id)
		.transition()
		.duration(time)
		.delay(x * delayTime)
		.style("fill", color);
}

// 去除旗标以外的颜色
function d3ClearColorExceptRed(key, count, x, delayTime) {
	for (var j = 0; j < count; j++) {
		if (j != key) {
			d3.select("#r" + j)
				.transition()
				.delay(x * delayTime)
				.style("fill", "rgba(57, 149, 222, 0.84)");
		}
	}
}

// 所有元素恢复原色
function d3ClearColor(count, x, delayTime) {
	d3.selectAll("rect")
		.transition()
		.delay(x * delayTime)
		.style("fill", "rgba(57, 149, 222, 0.84)");
}

// 改变图形的位置
function d3ChangeTransform(id, time, x, delayTime, moved, from, to) {
	var from_position = document.getElementById("g" + moved[from]).getAttribute("transform").split(","),
		to_position = document.getElementById("g" + to).getAttribute("transform").split(",");
	var a = to_position[0],
		b = from_position[1];
	console.log("position:"+a);
	return d3.select(id)
		.transition()
		.duration(time)
		.delay(x * delayTime)
		.attr("transform", "translate(" + a.match(/\d+/g)[0] + "," + b.match(/\d+/g)[0] + ")");
}

// 清除解释标志
function clearColor(x, delayTime) {
	d3.select(".code-2")
		.selectAll("p")
		.transition()
		.delay(x * delayTime)
		.style("background", "#e5e3e3");
}

function textNowColor(id, x, delayTime) {
	d3.select(id)
		.transition()
		.delay(x * delayTime)
		.style("background", "rgba(241, 199, 73, 0.83)");
}

// 清除解释区
function clearExplain(x, delayTime) {
	console.log("clear explain on time :" + x);
	(function(x) {
		setTimeout(function() {
			var code3 = document.getElementsByClassName("code-3");
			while (code3[0].hasChildNodes()) {
				code3[0].removeChild(code3[0].firstChild);
			}
		}, x * delayTime);
	})(x)
}

// 添加解释
function appendExplain(dataset, x, delayTime) {
	(function(x, dataset) {
		setTimeout(function() {
			var code3 = document.getElementsByClassName("code-3");
			for (var t = 0; t < dataset.length; t++) {
				var p = document.createElement("p");
				p.appendChild(document.createTextNode(dataset[t]));
				p.style.paddingLeft = "5px";
				p.style.paddingTop = "5px";
				code3[0].appendChild(p);
			}
		}, x * delayTime);
	})(x, dataset)
}

// 进行快排
function quickSortUp(delayTime) {

	var up_sort_button = document.getElementById("up-sort");
	var down_sort_button = document.getElementById("down-sort");
	up_sort_button.setAttribute("disabled","true");
	down_sort_button.setAttribute("disabled","true");	

	if (sortedFlag == 1) {
		return false;
	} else {
		window.movedI = new Array();
	}
	// 获取与图形有关标签
	var sortG = getAllG(),
		sortRect = getAllRect(),
		sortText = getAllText();
	// 获取点的值
	var tempQueue = new Array(),
		arr = new Array(),
		leftGuard = 0,
		rightGuard = sortG.length,
		value = getTextValue(sortText),
		moved = new Array(),
		tempKey = 0;
	// 获取与绘图有关标签
	var svg = d3.select("body")
		.select("svg"),
		svgRect = svg.selectAll("svg"),
		svgG = svg.selectAll("g"),
		svgText = svg.selectAll("Text"),
		x = 0,
		time = delayTime / 2,
		colorKey = 0;

	var f1 = 0,
		f2 = 0,
		t1 = 0,
		t2 = 0,
		f = "",
		t = "";


	// 获取所有文字内容
	var code2 = document.getElementsByClassName("code-2"),
		sortCode = code2[0].getElementsByTagName("p"),
		code3 = document.getElementsByClassName("code-3");

	for (var i = 0; i < sortG.length; i++) {
		moved[i] = parseInt(i);
	}
	setFlag = setTimeout(function(){console.log("1")},0);
	tempQueue.push(createObj(leftGuard, rightGuard - 1));
	while (tempQueue.length != 0) {
		var tempObj = tempQueue.shift(),
			key = tempObj.start,
			leftGuard = key,
			rightGuard = tempObj.end,
			colorKey = moved[key];

		clearColor(x, delayTime);
		textNowColor("#p0", x, delayTime);
		textNowColor("#p1", x, delayTime);
		textNowColor("#p2", x, delayTime);
		clearExplain(x, delayTime);
		appendExplain([explainText[1]], x, delayTime);
		appendExplain([explainText[2]], x, delayTime);
		appendExplain([explainText[3]], x, delayTime);
		// 旗标，颜色为红色		
		d3ChangeColor("#r" + moved[key], time, x, delayTime, "rgb(220, 20, 60)");
		x++;
		// 当该循环为结束时候
		while (leftGuard != rightGuard) {
			// 从后向前排序
			for (; parseInt(value[rightGuard]) >= parseInt(value[key]) && rightGuard > leftGuard; rightGuard--) {
				// 当前数据变为黄色
				clearColor(x, delayTime);
				textNowColor("#p4", x, delayTime);
				clearExplain(x, delayTime);
				appendExplain([explainText[3],
					[explainText[4]]
				], x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				d3ChangeColor("#r" + moved[rightGuard], time, x, delayTime, "rgb(242, 182, 75)")
				x++;
			}
			// 交换二者值
			if (leftGuard < rightGuard) {

				// 执行动画
				// 先变色，后移动
				clearColor(x, delayTime);
				textNowColor("#p5", x, delayTime);
				clearExplain(x, delayTime);
				appendExplain([explainText[5]], x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				// 变为黄色
				d3ChangeColor("#r" + moved[rightGuard], time, x, delayTime, "rgb(76, 162, 204)");
				x++;
				// key移动到left,left移动到key
				d3ChangeTransform("#g" + moved[key], time, x, delayTime, moved, key, rightGuard);
				d3ChangeTransform("#g" + moved[rightGuard], time, x, delayTime, moved, rightGuard, key);
				x++;
				// 变为原来的颜色
				d3ChangeColor("#r" + moved[rightGuard], time, x, delayTime, "rgb(173, 216, 230)");

				// 交换用于记录1,2,3,4,5……位置的值的数组的值。
				swap(value, key, rightGuard);
				// 交换用于记录1,2,3,4,5……位置的g标签序号的数组的值
				swap(moved, key, rightGuard);
				leftGuard++;
				key = rightGuard;
			}
			// 从前向后排序
			for (;
				(parseInt(value[leftGuard]) <= parseInt(value[key]) && rightGuard > leftGuard); leftGuard++) {
				clearColor(x, delayTime);
				textNowColor("#p6", x, delayTime);
				clearExplain(x, delayTime);
				appendExplain([explainText[6], explainText[7]], x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				d3ChangeColor("#r" + moved[leftGuard], time, x, delayTime, "rgb(242, 182, 75)")
				x++;
			}
			// 交换二者值
			if (leftGuard < rightGuard) {
				swap(value, leftGuard, key);

				// 执行动画
				// 先变色，后移动
				clearColor(x, delayTime);
				textNowColor("#p7", x, delayTime);
				clearExplain(x, delayTime);
				appendExplain([explainText[8]], x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				d3ChangeColor("#r" + moved[leftGuard], time, x, delayTime, "rgb(242, 182, 75)");

				d3ChangeTransform("#g" + moved[key], time, x, delayTime, moved, key, leftGuard);
				d3ChangeTransform("#g" + moved[leftGuard], time, x, delayTime, moved, leftGuard, key);
				x++;
				d3ChangeColor("#r" + moved[leftGuard], time, x, delayTime, "rgb(173, 216, 230)");
				x++;

				swap(moved, leftGuard, key);
				rightGuard--;
				key = leftGuard;
			}
		}
		if (leftGuard != tempObj.start) {
			clearColor(x, delayTime);
			textNowColor("#p10", x, delayTime);
			clearExplain(x, delayTime);
			appendExplain([explainText[10]], x, delayTime);
			tempQueue.push(createObj(tempObj.start, leftGuard - 1));
			x++;
		}
		if (rightGuard != tempObj.end) {
			clearColor(x, delayTime);
			textNowColor("#p11", x, delayTime);
			clearExplain(x, delayTime);
			appendExplain([explainText[11]], x, delayTime);
			tempQueue.push(createObj(rightGuard + 1, tempObj.end));
			x++;
		}
		// 清除所有旗标颜色v
		clearColor(x, delayTime);
		d3ClearColor(sortRect.length, x, delayTime);
		x++;
	}
	clearExplain(x, delayTime);
	appendExplain([explainText[12]], x, delayTime);

	for (var i = 0; i < sortText.length; i++) {
		console.log(value[i]);
	}

	(function(){
		setTimeout(function(){
			up_sort_button.removeAttribute("disabled");
			down_sort_button.removeAttribute("disabled");	
		},x*delayTime)
	})();
	up_sorted_flag =1;
	sortedFlag = 1;

}

function quickSortDown(delayTime) {
	var up_sort_button = document.getElementById("up-sort");
	var down_sort_button = document.getElementById("down-sort");
	up_sort_button.setAttribute("disabled","true");
	down_sort_button.setAttribute("disabled","true");	

	if (sortedFlag == 1) {
		return false;
	} else {
		window.movedI = new Array();
	}
	// 获取与图形有关标签
	var sortG = getAllG(),
		sortRect = getAllRect(),
		sortText = getAllText();
	// 获取点的值
	var tempQueue = new Array(),
		arr = new Array(),
		leftGuard = 0,
		rightGuard = sortG.length,
		value = getTextValue(sortText),
		moved = new Array(),
		tempKey = 0;
	// 获取与绘图有关标签
	var svg = d3.select("body")
		.select("svg"),
		svgRect = svg.selectAll("svg"),
		svgG = svg.selectAll("g"),
		svgText = svg.selectAll("Text"),
		x = 0,
		time = delayTime / 2,
		colorKey = 0;

	var f1 = 0,
		f2 = 0,
		t1 = 0,
		t2 = 0,
		f = "",
		t = "";


	// 获取所有文字内容
	var code2 = document.getElementsByClassName("code-2"),
		sortCode = code2[0].getElementsByTagName("p"),
		code3 = document.getElementsByClassName("code-3");

	for (var i = 0; i < sortG.length; i++) {
		moved[i] = parseInt(i);
	}

	tempQueue.push(createObj(leftGuard, rightGuard - 1));
	while (tempQueue.length != 0) {
		var tempObj = tempQueue.shift(),
			key = tempObj.start,
			leftGuard = key,
			rightGuard = tempObj.end,
			colorKey = moved[key];


		clearColor(x, delayTime);
		textNowColor("#p0", x, delayTime);
		textNowColor("#p1", x, delayTime);
		textNowColor("#p2", x, delayTime);
		clearExplain(x, delayTime);
		appendExplain([explainText[1]], x, delayTime);
		appendExplain([explainText[2]], x, delayTime);
		appendExplain([explainText[3]], x, delayTime);
		// 旗标，颜色为红色		
		d3ChangeColor("#r" + moved[key], time, x, delayTime, "rgb(220, 20, 60)");
		x++;
		// 当该循环未结束时候
		while (leftGuard != rightGuard) {
			// 从后向前排序
			for (; parseInt(value[rightGuard]) <= parseInt(value[key]) && rightGuard > leftGuard; rightGuard--) {
				// 当前数据变为黄色
				clearColor(x, delayTime);
				textNowColor("#p4", x, delayTime);
				clearExplain(x, delayTime);
				appendExplain([explainText[3],
					[explainText[4]]
				], x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				d3ChangeColor("#r" + moved[rightGuard], time, x, delayTime, "rgb(242, 182, 75)")
				x++;
			}
			// 交换二者值
			if (leftGuard < rightGuard) {

				// 执行动画
				// 先变色，后移动
				clearColor(x, delayTime);
				textNowColor("#p5", x, delayTime);
				clearExplain(x, delayTime);
				appendExplain([explainText[5]], x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				// 变为黄色
				d3ChangeColor("#r" + moved[rightGuard], time, x, delayTime, "rgb(76, 162, 204)");
				x++;
				// key移动到left,left移动到key
				d3ChangeTransform("#g" + moved[key], time, x, delayTime, moved, key, rightGuard);
				d3ChangeTransform("#g" + moved[rightGuard], time, x, delayTime, moved, rightGuard, key);
				x++;
				// 变为原来的颜色
				d3ChangeColor("#r" + moved[rightGuard], time, x, delayTime, "rgba(57, 149, 222, 0.84)");

				// 交换用于记录1,2,3,4,5……位置的值的数组的值。
				swap(value, key, rightGuard);
				// 交换用于记录1,2,3,4,5……位置的g标签序号的数组的值
				swap(moved, key, rightGuard);
				leftGuard++;
				key = rightGuard;
			}
			// 从前向后排序
			for (;
				(parseInt(value[leftGuard]) >= parseInt(value[key]) && rightGuard > leftGuard); leftGuard++) {
				clearColor(x, delayTime);
				textNowColor("#p6", x, delayTime);
				clearExplain(x, delayTime);
				appendExplain([explainText[6], explainText[7]], x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				d3ChangeColor("#r" + moved[leftGuard], time, x, delayTime, "rgb(242, 182, 75)")
				x++;
			}
			// 交换二者值
			if (leftGuard < rightGuard) {
				swap(value, leftGuard, key);

				// 执行动画
				// 先变色，后移动
				clearColor(x, delayTime);
				textNowColor("#p7", x, delayTime);
				clearExplain(x, delayTime);
				appendExplain([explainText[8]], x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				d3ClearColorExceptRed(colorKey, sortRect.length, x, delayTime);
				d3ChangeColor("#r" + moved[leftGuard], time, x, delayTime, "rgb(242, 182, 75)");

				d3ChangeTransform("#g" + moved[key], time, x, delayTime, moved, key, leftGuard);
				d3ChangeTransform("#g" + moved[leftGuard], time, x, delayTime, moved, leftGuard, key);
				x++;
				d3ChangeColor("#r" + moved[leftGuard], time, x, delayTime, "rgb(173, 216, 230)");
				x++;

				swap(moved, leftGuard, key);
				rightGuard--;
				key = leftGuard;
			}
		}
		if (leftGuard != tempObj.start) {
			clearColor(x, delayTime);
			textNowColor("#p10", x, delayTime);
			clearExplain(x, delayTime);
			appendExplain([explainText[10]], x, delayTime);
			tempQueue.push(createObj(tempObj.start, leftGuard - 1));
			x++;
		}
		if (rightGuard != tempObj.end) {
			clearColor(x, delayTime);
			textNowColor("#p11", x, delayTime);
			clearExplain(x, delayTime);
			appendExplain([explainText[11]], x, delayTime);
			tempQueue.push(createObj(rightGuard + 1, tempObj.end));
			x++;
		}
		// 清除所有旗标颜色v
		clearColor(x, delayTime);
		d3ClearColor(sortRect.length, x, delayTime);
		x++;
	}
	clearExplain(x, delayTime);
	appendExplain([explainText[12]], x, delayTime);
	for (var i = 0; i < sortText.length; i++) {
		console.log(value[i]);
	}

	(function(){
		setTimeout(function(){
			up_sort_button.removeAttribute("disabled");
			down_sort_button.removeAttribute("disabled");	
		},x*delayTime)
	})();
	down_sorted_flag =1;
	sortedFlag = 1;
}

// 初始化input框
function init() {
	var i = 0,
		svg = document.getElementsByTagName("svg"),
		sortText = svg[0].getElementsByTagName("text"),
		showArray = document.getElementsByClassName("click-input"),
		l = sortText.length,
		showStr = "";

	// 显示原排序数列
	for (i = 0; i < l - 1; i++) {
		showStr = showStr + sortText[i].innerHTML + ","
	}
	showStr = showStr + sortText[i].innerHTML;
	showArray[0].value = showStr;

	var code3 = document.getElementsByClassName("code-3");
	while (code3[0].hasChildNodes()) {
		code3[0].removeChild(code3[0].firstChild);
	}

	code3[0].appendChild(explainNode[0]);
}

// 查看结果
function result() {
	if(sortedFlag==1){
		return false;
	}

	if (upflag == 1 && up_sorted_flag == 0){
		quickSortUp(delayTime);

	}
	else if(down_sorted_flag == 0) quickSortDown(delayTime);
}

// 直接查看排序结果
function directResult() {
	if(sortedFlag==1){
		return false;
	}

	if (upflag == 1) {
		quickSortUp(0);
		/*var rect = doc.getElementsByTagName("rect");
		console.log("length:"+rect.length);
        for(var j=0;j<rect.length;j++){
        	rect[j].setAttribute("fill","red");
        }*/
       }
	else quickSortDown(0);
}

function up() {
	if(upflag == 1)	return false;
	// 如果当前已排序，则将排序结果输入到input框中，并重新生成svg内的图形。
	if(sortedFlag == 1){
		// 重新生成click-input值
		let click_input = document.getElementsByClassName("click-input");
		let arr = click_input[0].value.split(",");
		let sorted_arr = arr.sort(down_sort);
		let str = sorted_arr.join(",");
		click_input[0].value = str;
		
		// 重新生成svg元素 
		inputCreate();
	}

	upflag = 1;
	
	var code2 = document.getElementsByClassName("code-2");
	while (code2[0].hasChildNodes()) {
		code2[0].removeChild(code2[0].firstChild);
	}

	explain();
	createAlgorithmDirection();

	sortedFlag = 0;
}

function up_sort(a,b){
	return a-b;
}

function down_sort(a,b){
	return b-a;
}

function down() {
	if(upflag == 0)	return false;
	// 如果当前已排序，则将排序结果输入到input框中，并重新生成svg内的图形。
	if(sortedFlag == 1){
		// 重新生成click-input值
		let click_input = document.getElementsByClassName("click-input");
		let arr = click_input[0].value.split(",");
		let sorted_arr = arr.sort(up_sort);
		let str = sorted_arr.join(",");
		click_input[0].value = str;
		
		// 重新生成svg元素 
		inputCreate();
	}

	// 设置为降序
	upflag = 0;

	var code2 = document.getElementsByClassName("code-2");
	while (code2[0].hasChildNodes()) {
		code2[0].removeChild(code2[0].firstChild);
	}

	explain();
	createAlgorithmDirection();
}

window.onload = function() {

	explain();
	createAlgorithmDirection();
	autoCreate();
	init();

	// 绑定升序
	var clickAdd1 = document.getElementsByClassName("click-add1");
	clickAdd1[0].addEventListener("click", up);

	// 绑定降序
	clickAdd1[1].addEventListener("click", down);

	// 绑定排序事件 ok 
	var direct = document.getElementsByClassName("kaishi");
	direct[0].addEventListener("click", result);

	// 直接查看排序结果
	var clickAdd = document.getElementsByClassName("click-add");
	clickAdd[0].addEventListener("click", directResult);

	// 手动输入排序数列  
	var create = document.getElementsByClassName("click-freedom-2");
	create[0].addEventListener("click", inputCreate);

	// 自动生成排序数列 
	var auto = document.getElementsByClassName("click-random");
	auto[0].addEventListener("click", autoCreate);

	//改变延时时间
	function changeTime() {
		delayTime = 2000;
		delayTime = delayTime - 150 * $(".click-speed-1").attr("value");
		console.log("delayTime:" + delayTime);
	}

	$(".click-speed-1").RangeSlider({
		min: 0,
		max: 10,
		step: 0.1,
		callback: changeTime
	});
}