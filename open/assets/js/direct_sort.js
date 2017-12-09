var maxHeight = 230,
    doc = document,
    delayTimeInput = doc.getElementById("click-speed-1"),
    sortedFlag = 0;
var delayTime = 1250;
// 添加svg元素
var doing = document.getElementById("doing-1"),
    svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var setFlag = 0;
var up_sorted =0;
var down_sort = 0;
/*svg1.style.width = "1344px";
svg1.style.height = "657px";*/

//修改
svg1.setAttribute("height", document.defaultView.getComputedStyle(document.getElementById("doing-1"), null).height);
svg1.setAttribute("width", document.defaultView.getComputedStyle(document.getElementById("doing-1"), null).width);

//在不同的分辨率下设置不同的最大数组长度值

if (parseInt(svg1.getAttribute("width")) <= 425) {
    var NUM = 6;
} else if (parseInt(svg1.getAttribute("width")) <= 768) {
    var NUM = 8;
} else {
    var NUM = 10;
}

var upflag = 1;

doing.insertBefore(svg1, doing.childNodes[0]);

baseX = parseInt(svg1.getAttribute("width")) / 2;
baseY = parseInt(svg1.getAttribute("height")) / 2;

function explain() {
    explainText = new Array();
    /*    explainText[0] = "直接插入排序的基本方法：每次从无序表中取出第一个元素，把它插入到有序表的合适位置，使有序表仍然有序。"*/

    if (upflag == 1) {
        explainText[0] = "i<sortArray.length，执行循环"
        explainText[1] = "未排序数小于其之前前数组单元数值。"
        explainText[2] = "哨兵记录下当前sortArray的值。"
        explainText[3] = "当前位置之前仍存在数组单元， 且未排序数小于其之前数组单元数值。"
        explainText[4] = "未排序数之前数组单元向后移动。"
        explainText[5] = "将未排序数插入数组中。至此，数组单元下标为i之前为有序数组。"
    } else {
        explainText[0] = "i<sortArray.length，执行循环"
        explainText[1] = "未排序数大于其之前前数组单元数值。"
        explainText[2] = "哨兵记录下当前sortArray的值。"
        explainText[3] = "当前位置之前仍存在数组单元，且未排序数大于其之前数组单元数值。"
        explainText[4] = "未排序数之前数组单元向后移动。"
        explainText[5] = "将未排序数插入数组中。至此，数组单元下标为i之前为有序数组。"
    }

    explainText[6] = "上述代码中，sortArray为待排序数组，sortArray[0].value指获取数组下标为0的单元的值。"
    explainText[7] = "temp称为监视哨或哨兵(Sentinel)，保存了当前sortArray[i]的值。"

    explainNode = new Array();
    for (var i = explainText.length - 1; i >= 0; i--) {
        explainNode[i] = document.createElement("p");
        explainNode[i].appendChild(document.createTextNode(explainText[i]));
        explainNode[i].style.paddingLeft = "8px";
        explainNode[i].style.paddingTop = "5px";
    }

    var code3 = document.getElementsByClassName("code-3");
    code3[0].appendChild(explainNode[6]);
    code3[0].appendChild(explainNode[7]);
}

function autoCreate() {
    up_sorted = 0;
    down_sorted = 0;

    var up_sort = document.getElementById("up-sort");
    var down_sort = document.getElementById("down-sort");
    up_sort.removeAttribute("disabled");
    down_sort.removeAttribute("disabled");

    for(var i=setFlag;i<setFlag+200;i++){
        clearTimeout(i);
    }

    var code3 = document.getElementsByClassName("code-3"),
        code2 = document.getElementsByClassName("code-2");
    code2[0].style.paddingTop="10px";
    if(sortedFlag==1){
        // 重置下方解释区域
        while(code3[0].hasChildNodes()){
            code3[0].removeChild(code3[0].firstChild);
        }
        while(code2[0].hasChildNodes()){
            code2[0].removeChild(code2[0].firstChild);
        }
        createAlgorithmDirection();
        explain();
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
    var base = parseInt(baseX - count * 25);

    var rectMax = 0;
    //生成rect大小
    var rectHeight = new Array();
    for (var i = 0; i < count; i++) {
        do {
            rectHeight[i] = parseInt(Math.random() * 45);
        } while (rectHeight[i] == 0)
        if (rectHeight[i] > rectMax) {
            rectMax = rectHeight[i];
        }
    }
    var per = parseInt(maxHeight / rectMax);

    // 添加元素
    for (var i = 0; i < count; i++) {
        // 生成group元素
        var g = createG(base, i, maxHeight, rectHeight[i], parseInt(per));
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
};

// 通过输入创建待排序队列
function inputCreate() {
    up_sorted = 0;
    down_sorted = 0;

    var up_sort = document.getElementById("up-sort");
    var down_sort = document.getElementById("down-sort");
    up_sort.removeAttribute("disabled");
    down_sort.removeAttribute("disabled");

    for(var i=setFlag;i<setFlag+200;i++){
        clearTimeout(i);
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
        explain();
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
            alert("请确保每个数据的大小介于1~100之间");
            return false;
        }
        /*if (parseInt(inputArray[i]) <= 1) {
            alert("请确保每个数据的大于等于1");
            return false;
        }*/
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
    var base = parseInt(baseX - inputArray.length * 25);
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
    var translate = "translate(" + translateX.toString() + "," + translateY.toString() + ")";
    g.setAttribute("transform", translate);
    g.style.position = "relative";
    g.style.transform = "translate3d(" + translateX.toString() + "px," + translateY.toString() + "px," + "0px)";
    console.log(translateX.toString + "," + translateY.toString);
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
    text.setAttribute("x", "19");
    if (rectHeight * per < 28) {
        text.setAttribute("y", "-15");
    } else {
        var y = rectHeight * per - 15;
        text.setAttribute("y", y)
    }
    return text;
}

// ok
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

// 更改颜色为蓝色
function turnBlue(r1) {
    r1.style.fill = "rgb(76, 162, 204)";
}
// 更改颜色为原色
function turnLight(r1) {
    r1.style.fill = "rgb(173, 216, 230)";
}
// 更改颜色为红色
function turnRed(r1) {

    r1.style.fill = "rgba(226, 12, 12, 0.66)";
}
// 更改颜色为黄色
function turnYellow(r1) {
    r1.style.fill = "rgb(242, 182, 75)";
}

function createAlgorithmDirection() {
    // 将算法内容插入至右边框内
    var i = 0,
        p = new Array(),
        sort_code = new Array(),
        sort_text = new Array(),
        ul = document.createElement("ul"),
        code2 = document.getElementsByClassName("code-2")[0];

    if (upflag == 1) {
        sort_code[0] = "for(i=1;i<sortArray.length;i++){";
        sort_code[1] = "    if(sortArray[i].value<sortArray[i-1].value){";
        sort_code[2] = "        temp = sortArray[i].value;";
        sort_code[3] = "        for(j=i-1;j>=0&&a[j]>temp;j--)";
        sort_code[4] = "            a[j+1] = a[j];";
        sort_code[5] = "        a[j+1] = temp;";
        sort_code[6] = "    }";
        sort_code[7] = "}";
    } else {
        sort_code[0] = "for(i=1;i<sortArray.length;i++){";
        sort_code[1] = "    if(sortArray[i].value>sortArray[i-1].value){";
        sort_code[2] = "        temp = sortArray[i].value;";
        sort_code[3] = "        for(j=i-1;j>=0&&a[j]<temp;j--)";
        sort_code[4] = "            a[j+1] = a[j];";
        sort_code[5] = "        a[j+1] = temp;";
        sort_code[6] = "    }";
        sort_code[7] = "}";
    }

    for (var i = 0; i < sort_code.length; i++) {
        p[i] = document.createElement("p");
        p[i].style.whiteSpace = "pre";
        p[i].style.fontSize = "16px";
        p[i].style.padding = "5px 0px 5px 10px";
        p[i].style.marginBottom = "0px";
        p[i].appendChild(document.createTextNode(sort_code[i]));
        code2.appendChild(p[i]);
    }
}

function directSortUp(delayTime) {
    // 将速度、升序、降序按钮设置为不可用
    var range = document.getElementsByClassName("click-speed-1")[0];
    range.setAttribute("disabled", "true");

    var up_sort = document.getElementById("up-sort");
    var down_sort = document.getElementById("down-sort");
    up_sort.setAttribute("disabled","true");
    down_sort.setAttribute("disabled","true")

    // 判断是否已经进行过排序
    if (sortedFlag == 1) {
        return false;
    } else {
        window.movedI = new Array();
    }

    sortG = getAllG();
    var sortRect = getAllRect();
    var sortValue = getAllText();
    var code2 = document.getElementsByClassName("code-2");
    var code3 = document.getElementsByClassName("code-3");
    var sortCode = code2[0].getElementsByTagName("p");

    clearColor(sortCode);

    // 模拟直接插入排序
    function simulationDirect() {
        for (q = 0; q < sortValue.length; q++) {
            origin[q] = sortValue[q].innerHTML;
            iTime[q] = 0;
            jTime[q] = 0;
        }
        for (q = 1; q < sortG.length; q++) {
            if (parseInt(origin[q]) < parseInt(origin[q - 1])) {
                iTime[q] = 1;
                var initTemp = origin[q];
                for (p = q - 1; p >= 0 && parseInt(origin[p]) > parseInt(initTemp); p--) {
                    origin[p + 1] = origin[p];
                    jTime[q]++;
                }
                origin[p + 1] = initTemp;
            }
        }
    }

    // 清除解释标志
    function clearColor(sortText) {
        for (var i = 0; i < sortText.length; i++) {
            sortText[i].style.background = "#e5e3e3";
        }
    }

    function textNowColor(text) {
        text.style.background = "rgba(241, 199, 73, 0.83)";
    }

    var x = 0,
        i = 0,
        j = 0;

    // 初始化，move作用的对象需要具有'relative属性'
    var temp = new Array();
    for (i = 0; i < sortG.length; i++) {
        temp[i] = sortValue[i].innerHTML;
        movedI[i] = parseInt(i);
        sortG[i].style.position = "relative";
        sortValue[i].style.position = "relative";
        sortRect[i].style.position = "relative";
    }

    var iTime = new Array(), // 	i执行的次数。
        jTime = new Array(), //	j执行的次数。
        origin = new Array(),
        p = 0,
        q = 0;

    simulationDirect();
    x = 1;
    //符合条件则入队
    // 当前比对的两个rect标记为蓝色。
    // movedI是排序后队伍的顺序。 moved[i]则代表排序后i位置上为第几个g块。
    for (i = 0; i < sortG.length; i++) {
        // 用来模仿
        // 进行延时。
        setFlag = setTimeout(function() {
            textNowColor(sortCode[0]);
        }, 0);
        (function(i, iTime, jTime) {
            setTimeout(function() {
                //如果符合移动条件
                // 当前比较的是i。排序后队伍的顺序是moved[i-1],即i前边的g块。和i进行比较
                if (iTime[i] != 0) { //iTime[i]!=0,说明需要交换
                    (function(i) {
                        setTimeout(function() {
                            turnRed(sortRect[i]);
                            clearColor(sortCode);
                            textNowColor(sortCode[1]);
                            clearExplain(code3);
                            code3[0].appendChild(explainNode[0]);
                        }, x * delayTime);
                    })(i);
                    x++;
                    (function(i) {
                        setTimeout(function() {
                            // 向下移动，与是否被移v动过无关。
                            var symbolX = sortG[i].getAttribute("transform").match(/\d+/g)[0]; //获取的是i原本的横坐标。无误。
                            var symbolY = sortG[i].getAttribute("transform").match(/\d+/g)[1]; //获取的是i原本的纵坐标。无误。

                            move(sortG[i])
                                .translate(symbolX, parseInt(symbolY) + 230)
                                .end();

                            clearColor(sortCode);
                            textNowColor(sortCode[2]);
                            clearExplain(code3);
                            code3[0].appendChild(explainNode[2]);
                        }, x * delayTime);
                    })(i);
                    x++;
                    for (j = i - 1; j >= 0 && jTime[i] > 0; j--, jTime[i]--) {
                        (function(i, j) {
                            setTimeout(function() {
                                clearColor(sortCode);
                                turnBlue(sortRect[movedI[j]]);
                                textNowColor(sortCode[3])
                                clearExplain(code3);
                                code3[0].appendChild(explainNode[3]);
                            }, x * delayTime);
                        })(i, j);
                        x++;
                        (function(i, j) {
                            setTimeout(function() {
                                var translateXI = sortG[i].style.transform.match(/\d+/g)[1]; //XI是新的横坐标，给J元素，无误。
                                var translateYI = sortG[i].getAttribute("transform").match(/\d+/g)[1]; // YI是I原本的纵坐标。再加230就是下边的位置 无误
                                if (sortG[movedI[j]].style.transform != "") {
                                    var translateXJ = sortG[movedI[j]].style.transform.match(/\d+/g)[1]; //X坐标为改变过的
                                } else {
                                    var translateXJ = sortG[movedI[j]].getAttribute("transform").match(/\d+/g)[0]; //j元素坐标。有误。
                                }
                                var translateYJ = sortG[movedI[j]].getAttribute("transform").match(/\d+/g)[1]; // j元素原本高度，无误。
                                move(sortG[i]).translate(translateXJ, parseInt(translateYI) + 230).end();
                                move(sortG[movedI[j]]).translate(translateXI, translateYJ).end(); //无误。
                                // 交换在数组中的位置
                                movedI[j + 1] = movedI[j];
                                movedI[j] = i;
                                clearColor(sortCode);
                                textNowColor(sortCode[4]);
                                clearExplain(code3);
                                code3[0].appendChild(explainNode[4]);
                            }, x * delayTime)
                        })(i, j);
                        x++;
                        (function(i, j) {
                            setTimeout(function() {
                                turnYellow(sortRect[movedI[j + 1]]);
                            }, x * delayTime);
                        })(i, j);
                        x++;
                    }

                    // 向上移动
                    (function(i) {
                        setTimeout(function() {
                            var newX = sortG[i].style.transform.match(/\d+/g)[1];
                            var oldY = sortG[i].getAttribute("transform").match(/\d+/g)[1];
                            move(sortG[i]).translate(newX, oldY).end();
                            turnYellow(sortRect[i]);
                            clearColor(sortCode);
                            textNowColor(sortCode[5]);
                            clearExplain(code3);
                            code3[0].appendChild(explainNode[5]);
                        }, x * delayTime);
                    })(i);
                    x++;
                    if (i == sortG.length - 1) {
                        (function(i) {
                            setTimeout(function() {
                                clearColor(sortCode);
                            }, x * delayTime)
                        })(i)
                    }
                } else {
                    (function(i) {
                        setTimeout(function() {
                            turnYellow(sortRect[i]);
                            if (i != sortG.length - 1) {
                                clearColor(sortCode)
                                textNowColor(sortCode[0]);
                            } else {
                                clearColor(sortCode);
                            }
                        }, x * delayTime);
                    })(i);
                    x++;
                }
            }, 200)
        })(i, iTime, jTime);
    }

    (function(){
        setTimeout(function(){
            up_sort.removeAttribute("disabled");
            down_sort.removeAttribute("disabled")
        },x*delayTime)
    })()

    up_sorted = 1;

    // sortedFlag = 1 时为已排序。
    sortedFlag = 1;
    // 删除disabled属性，恢复为可用。
    range.removeAttribute("disabled");
}

function directSortDown(delayTime) {
    // 将速度、升序、降序按钮设置为不可用
    var range = document.getElementsByClassName("click-speed-1")[0];
    range.setAttribute("disabled", "true");

    var up_sort = document.getElementById("up-sort");
    var down_sort = document.getElementById("down-sort");
    up_sort.setAttribute("disabled","true");
    down_sort.setAttribute("disabled","true")


    // 判断是否已经进行过排序
    if (sortedFlag == 1) {
        return false;
    } else {
        window.movedI = new Array();
    }

    sortG = getAllG();
    var sortRect = getAllRect();
    var sortValue = getAllText();
    var code2 = document.getElementsByClassName("code-2");
    var code3 = document.getElementsByClassName("code-3");
    var sortCode = code2[0].getElementsByTagName("p");

    clearColor(sortCode);

    // 模拟直接插入排序
    function simulationDirect() {
        for (q = 0; q < sortValue.length; q++) {
            origin[q] = sortValue[q].innerHTML;
            iTime[q] = 0;
            jTime[q] = 0;
        }
        for (q = 1; q < sortG.length; q++) {
            if (parseInt(origin[q]) > parseInt(origin[q - 1])) {
                iTime[q] = 1;
                var initTemp = origin[q];
                for (p = q - 1; p >= 0 && parseInt(origin[p]) < parseInt(initTemp); p--) {
                    origin[p + 1] = origin[p];
                    jTime[q]++;
                }
                origin[p + 1] = initTemp;
            }
        }
    }

    // 清除解释标志
    function clearColor(sortText) {
        for (var i = 0; i < sortText.length; i++) {
            sortText[i].style.background = "#e5e3e3";
        }
    }

    function textNowColor(text) {
        text.style.background = "rgba(241, 199, 73, 0.83)";
    }

    var x = 0,
        i = 0,
        j = 0;

    // 初始化，move作用的对象需要具有'relative属性'
    var temp = new Array();
    for (i = 0; i < sortG.length; i++) {
        temp[i] = sortValue[i].innerHTML;
        movedI[i] = parseInt(i);
        sortG[i].style.position = "relative";
        sortValue[i].style.position = "relative";
        sortRect[i].style.position = "relative";
    }

    var iTime = new Array(), // 	i执行的次数。
        jTime = new Array(), //	j执行的次数。
        origin = new Array(),
        p = 0,
        q = 0;

    simulationDirect();
    x = 1;
    //符合条件则入队
    // 当前比对的两个rect标记为蓝色。
    // movedI是排序后队伍的顺序。 moved[i]则代表排序后i位置上为第几个g块。
    for (i = 0; i < sortG.length; i++) {
        // 用来模仿
        // 进行延时。
        setFlag = setTimeout(function() {
            textNowColor(sortCode[0]);
        }, 0);
        (function(i, iTime, jTime) {
            setTimeout(function() {
                //如果符合移动条件
                // 当前比较的是i。排序后队伍的顺序是moved[i-1],即i前边的g块。和i进行比较
                if (iTime[i] != 0) { //iTime[i]!=0,说明需要交换
                    (function(i) {
                        setTimeout(function() {
                            turnRed(sortRect[i]);
                            clearColor(sortCode);
                            textNowColor(sortCode[1]);
                            clearExplain(code3);
                            code3[0].appendChild(explainNode[0]);
                        }, x * delayTime);
                    })(i);
                    x++;
                    (function(i) {
                        setTimeout(function() {
                            // 向下移动，与是否被移v动过无关。
                            var symbolX = sortG[i].getAttribute("transform").match(/\d+/g)[0]; //获取的是i原本的横坐标。无误。
                            var symbolY = sortG[i].getAttribute("transform").match(/\d+/g)[1]; //获取的是i原本的纵坐标。无误。

                            move(sortG[i])
                                .translate(symbolX, parseInt(symbolY) + 230)
                                .end();

                            clearColor(sortCode);
                            textNowColor(sortCode[2]);
                            clearExplain(code3);
                            code3[0].appendChild(explainNode[2]);
                        }, x * delayTime);
                    })(i);
                    x++;
                    for (j = i - 1; j >= 0 && jTime[i] > 0; j--, jTime[i]--) {
                        (function(i, j) {
                            setTimeout(function() {
                                clearColor(sortCode);
                                turnBlue(sortRect[movedI[j]]);
                                textNowColor(sortCode[3])
                                clearExplain(code3);
                                code3[0].appendChild(explainNode[3]);
                            }, x * delayTime);
                        })(i, j);
                        x++;
                        (function(i, j) {
                            setTimeout(function() {
                                var translateXI = sortG[i].style.transform.match(/\d+/g)[1]; //XI是新的横坐标，给J元素，无误。
                                var translateYI = sortG[i].getAttribute("transform").match(/\d+/g)[1]; // YI是I原本的纵坐标。再加230就是下边的位置 无误
                                if (sortG[movedI[j]].style.transform != "") {
                                    var translateXJ = sortG[movedI[j]].style.transform.match(/\d+/g)[1]; //X坐标为改变过的
                                } else {
                                    var translateXJ = sortG[movedI[j]].getAttribute("transform").match(/\d+/g)[0]; //j元素坐标。
                                }
                                var translateYJ = sortG[movedI[j]].getAttribute("transform").match(/\d+/g)[1]; // j元素原本高度。
                                move(sortG[i]).translate(translateXJ, parseInt(translateYI) + 230).end();
                                move(sortG[movedI[j]]).translate(translateXI, translateYJ).end(); 
                                // 交换在数组中的位置
                                movedI[j + 1] = movedI[j];
                                movedI[j] = i;
                                clearColor(sortCode);
                                textNowColor(sortCode[4]);
                                clearExplain(code3);
                                code3[0].appendChild(explainNode[4]);
                            }, x * delayTime)
                        })(i, j);
                        x++;
                        (function(i, j) {
                            setTimeout(function() {
                                turnYellow(sortRect[movedI[j + 1]]);
                            }, x * delayTime);
                        })(i, j);
                        x++;
                    }

                    // 向上移动
                    (function(i) {
                        setTimeout(function() {
                            var newX = sortG[i].style.transform.match(/\d+/g)[1];
                            var oldY = sortG[i].getAttribute("transform").match(/\d+/g)[1];
                            move(sortG[i]).translate(newX, oldY).end();
                            turnYellow(sortRect[i]);
                            clearColor(sortCode);
                            textNowColor(sortCode[5]);
                            clearExplain(code3);
                            code3[0].appendChild(explainNode[5]);
                        }, x * delayTime);
                    })(i);
                    x++;
                    if (i == sortG.length - 1) {
                        (function(i) {
                            setTimeout(function() {
                                clearColor(sortCode);
                            }, x * delayTime)
                        })(i)
                    }
                } else {
                    (function(i) {
                        setTimeout(function() {
                            turnYellow(sortRect[i]);
                            if (i != sortG.length - 1) {
                                clearColor(sortCode)
                                textNowColor(sortCode[0]);
                            } else {
                                clearColor(sortCode);
                            }
                        }, x * delayTime);
                    })(i);
                    x++;
                }
            }, 200)
        })(i, iTime, jTime);
    };

    (function(){
        setTimeout(function(){
            up_sort.removeAttribute("disabled");
            down_sort.removeAttribute("disabled");
        },x*delayTime)
    })();

    down_sorted = 1;
    // sortedFlag = 1 时为已排序。
    sortedFlag = 1;
    // 删除disabled属性，恢复为可用。
    range.removeAttribute("disabled");
}

// 初始化input框
function init() {
    var i = 0,
        svg = document.getElementsByTagName("svg"),
        sortText = svg[0].getElementsByTagName("text"),
        showArray = document.getElementsByClassName("click-input"),
        l = sortText.length,
        showStr = "",
        code3 = document.getElementsByClassName("code-3");

    // 显示原排序数列
    for (i = 0; i < l - 1; i++) {
        showStr = showStr + sortText[i].innerHTML + ","
    }
    showStr = showStr + sortText[i].innerHTML;
    showArray[0].value = showStr;
}

// 查看结果
function result() {

    if (upflag == 1 && up_sorted == 0) directSortUp(delayTime);
    else if(down_sorted == 0) directSortDown(delayTime);
}

// 直接查看排序结果
function directResult() {
    if(sortedFlag==1){
        return false;
    }
    if (upflag == 1 && up_sorted == 0) directSortUp(0);
    else if(down_sorted == 0) directSortDown(0);
}

function up_sort_algorithm(a,b){
    return a-b;
}

function down_sort_algorithm(a,b){
    return b-a;
}

// 清除解释区
function clearExplain(code3) {
    while (code3[0].hasChildNodes()) {
        code3[0].removeChild(code3[0].firstChild);
    }
}

function up() {
    if(upflag == 1) return false;
    // 如果当前已排序，则将排序结果输入到input框中，并重新生成svg内的图形。
    if(sortedFlag == 1){
        // 重新生成click-input值
        var click_input = document.getElementsByClassName("click-input");
        var arr = click_input[0].value.split(",");
        var sorted_arr = arr.sort(down_sort_algorithm);
        var str = sorted_arr.join(",");
        click_input[0].value = str;
        console.log("click up: "+str);
        
        // 重新生成svg元素 
        inputCreate();
    }

    upflag = 1;
    var code3 = document.getElementsByClassName("code-3");
    clearExplain(code3);

    var code2 = document.getElementsByClassName("code-2");
    while (code2[0].hasChildNodes()) {
        code2[0].removeChild(code2[0].firstChild);
    }

    explain();
    createAlgorithmDirection();
}

function down() {
    if(upflag == 0) return false;
    // 如果当前已排序，则将排序结果输入到input框中，并重新生成svg内的图形。
    if(sortedFlag == 1){
        // 重新生成click-input值
        let click_input = document.getElementsByClassName("click-input");
        let arr = click_input[0].value.split(",");
        let sorted_arr = arr.sort(up_sort_algorithm);
        let str = sorted_arr.join(",");
        click_input[0].value = str;
        console.log("click down: "+str)
        // 重新生成svg元素 
        inputCreate();
    }

    upflag = 0;
    var code3 = document.getElementsByClassName("code-3");
    clearExplain(code3);

    //清除解释区
    var code2 = document.getElementsByClassName("code-2");
    while (code2[0].hasChildNodes()) {
        code2[0].removeChild(code2[0].firstChild);
    }

    explain();
    createAlgorithmDirection();
}

window.onload = function() {
    explain();

    autoCreate();
    createAlgorithmDirection();
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