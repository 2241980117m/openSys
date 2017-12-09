var setFlag = 0;

// 添加伪代码描述
function createAlgorithmDirection() {
    var i = 0,
        p = new Array,
        sort_code = new Array(),
        code2 = document.getElementsByClassName("code-2");
    
    code2[0].style.paddingTop = "10px";

    sort_code[0] = "sortEdge(edgeList);"
    sort_code[1] = "for(i = 0;i < edgeList.length && "
    sort_code[2] = "hasAddedEdge.length<vertex.length-1;i++){"
    sort_code[3] = "        if(edgeList[i].start or edgeList[i].end"
    sort_code[4] = "        not exist in hasAddedVertex){"
    sort_code[5] = "                hasAddedEdge.push(edgeList[i]);"
    sort_code[6] = "                i=0;"
    sort_code[7] = "        }"
    sort_code[8] = "}"
    sort_code[9] = "sort complete!"

    for (var i = 0; i < sort_code.length; i++) {
        p[i] = document.createElement("p");
        p[i].style.whiteSpace = "pre";
        p[i].style.fontSize = "16px";
        p[i].style.padding = "5px 0px 5px 10px";
        p[i].style.marginBottom = 0;
        p[i].id = "p" + i;
        p[i].appendChild(document.createTextNode(sort_code[i]));
        code2[0].appendChild(p[i]);
    }
}

// 清除解释区
function clearExplain(delayTime, delay) {
    console.log("clear explain on time :" + x);
    (function(delayTime) {
        setTimeout(function() {
            var code3 = document.getElementsByClassName("code-3");
            while (code3[0].hasChildNodes()) {
                code3[0].removeChild(code3[0].firstChild);
            }
        }, delay * delayTime);
    })(delayTime)
}

// 初始化解释
function explain() {
    var code3 = document.getElementsByClassName("code-3");
    explainText = new Array();
    explainText[0] = "kruskal算法基本思想：把n个顶点看成看成n棵分离的树（每棵树只有一个顶点），每次选取可连接两个分离树中权值最小的边把两个分离的树合成一个新的树取代原来的两个分离树，如果重复n-1步后便得到最小生成树。"
    explainText[1] = "代码中,sortEdge(edgeList)函数将数组edgeList中的元素按权值大小从小到大排列."
    explainText[2] = "degeList为图中所有边."
    explainText[3] = "hasAddedVertex及hasAddedEdge分别为'已取顶点'及'已取边'"
    explainText[4] = "将剩余边按权值从小到大进行排序"
    explainText[5] = "当前已添加边的数量小于所有点的数量-1,且所有边未遍历完毕,执行循环体内代码"
    explainText[6] = "当前已添加边的数量不小于所有点的数量-1,跳出循环"
    explainText[7] = "当前所取出边i的起始点及终点存在于已添加的集合内,继续执行循环"
    explainText[8] = "当前所取出边i的起始点或终点不存在于已添加点的集合内"
    explainText[9] = "将当前边加入到已添加边的集合中"
    explainText[10] = "算法演示完毕"

    explainNode = new Array();
    for (var i = explainText.length - 1; i >= 0; i--) {
        explainNode[i] = document.createElement("p");
        explainNode[i].appendChild(document.createTextNode(explainText[i]));
        explainNode[i].style.paddingLeft = "8px";
        explainNode[i].style.paddingTop = "5px";
    }

    // 初始化code-3class内容
    for (i = 1; i < 4; i++) {
        code3[0].appendChild(explainNode[i]);
    }
}

// 添加解释
function appendExplain(dataset, delayTime, delay) {
    (function(delayTime, dataset) {
        setTimeout(function() {
            var code3 = document.getElementsByClassName("code-3");
            for (var t = 0; t < dataset.length; t++) {
                var p = document.createElement("p");
                p.appendChild(document.createTextNode(dataset[t]));
                p.style.paddingLeft = "5px";
                p.style.paddingTop = "5px";
                code3[0].appendChild(p);
            }
        }, delay * delayTime);
    })(delayTime, dataset)
}

// 清除解释标志
function clearColor(delayTime, delay) {
    d3.select(".code-2")
        .selectAll("p")
        .transition()
        .delay(delayTime * delay)
        .style("background", "#e5e3e3");
}

// 设置伪代码部分代码高亮
function textNowColor(id, delayTime, delay) {
    d3.select(id)
        .transition()
        .delay(delayTime * delay)
        .style("background", "rgba(241, 199, 73, 0.83)");
}

// 创建图
function createFS() {
    /* 添加svg元素 */
    var doing = document.getElementById("doing-1"),
        svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    if (parseInt(window.innerWidth) <= 768) {
        svg1.style.width = window.innerWidth;
        svg1.style.height = "420px";
        svg1.style.display = "block"
    } else if(parseInt(window.innerWidth) <= 1919 && parseInt(window.innerWidth)>= 769){
        svg1.style.width = "70vw";
        svg1.style.height = "657px";
        svg1.style.display = "inline-block";
    }else {
        svg1.style.width = "670px";
        svg1.style.height = "657px";
        svg1.style.display = "inline-block";
    }

    // svg1.style.width = "1344px";
    // svg1.style.height = "657px";

    doing.insertBefore(svg1, doing.childNodes[0]);

    // 该语句指定图案的位置
    if (parseInt(window.innerWidth) <= 768) {
        baseX = parseInt(svg1.style.width) / 2;
        baseY = 300;
    } else {
        baseX = parseInt(svg1.clientWidth) / 2;
        baseY = parseInt(svg1.style.height) / 2;
    }

    var body = d3.select("body"),
        svg = d3.select("body").select("svg");

    /* 添加table元素 */
    var showTableTd = new Array(),
        showTableTh = new Array(),
        showTableTr = new Array(),
        showTableThText = new Array(),
        thead = document.createElement("thead"),
        tbody = document.createElement("tbody"),
        showTableDiv = document.createElement("div");

    // // 
    if(parseInt(window.innerWidth) <= 1919 && parseInt(window.innerWidth)>= 769){
        showTableDiv.style.display = "none";
    }

    showTable = document.createElement("table");

    showTableThText[0] = "当前执行步数";
    showTableThText[1] = "已取顶点";
    showTableThText[2] = "已取边及其权值";
    showTableThText[3] = "总权值";
    showTableThText[4] = "剩余点";
    showTableThText[5] = "剩余边及其权值";

    // 添加thead
    showTableTr[0] = document.createElement("tr");
    for (i = 0; i < 6; i++) {
        showTableTh[i] = document.createElement("th");
        showTableTh[i].appendChild(document.createTextNode(showTableThText[i]));
        showTableTh[i].id = "th" + (i + 1);
        showTableTr[0].appendChild(showTableTh[i]);
    }
    thead.appendChild(showTableTr[0]);
    showTable.appendChild(thead);

    // 添加tbody

    showTableTr[1] = document.createElement("tr");
    for (i = 0; i < 6; i++) {
        showTableTd[i] = document.createElement("td");
        showTableTr[1].appendChild(showTableTd[i]);
    }
    tbody.appendChild(showTableTr[1]);
    showTable.appendChild(tbody);

    // 添加table

    showTable.rules = "all";
    showTable.style.tableLayout = "fixed";

    showTableDiv.id = "show-table-div";
    showTableDiv.appendChild(showTable);
    doing.insertBefore(showTableDiv, doing.childNodes[1])

    if (parseInt(window.innerWidth) <= 768) {
        var cmPoint = [
            [baseX, baseY - 250],
            [baseX + 170, baseY - 150],
            [baseX + 100, baseY + 40],
            [baseX - 100, baseY + 40],
            [baseX - 170, baseY - 150]
            // [450,50],
            // [620,150],
            // [550,340],
            // [350,340],
            // [280,150]
        ];
    } else {
        var cmPoint = [
            [baseX, baseY - 250],
            [baseX + 170, baseY - 150],
            [baseX + 100, baseY + 40],
            [baseX - 100, baseY + 40],
            [baseX - 170, baseY - 150]
            // [450,50],
            // [620,150],
            // [550,340],
            // [350,340],
            // [280,150]
        ];
    }

    var n = 0,
        m = 0,
        edge = new Array(),
        edgeValue = new Array();

    //生成容纳边的数组及其相应权值，起点为m点序号，终点为n点序号。
    var length = cmPoint.length;
    for (var m = 0, i = 0; m < length; m++) {
        for (var n = m + 1; n < length; n++) {
            edge[i] = new Array();
            edge[i][0] = cmPoint[m][0];
            edge[i][1] = cmPoint[m][1];
            edge[i][2] = cmPoint[n][0];
            edge[i][3] = cmPoint[n][1];
            edge[i][4] = m;
            edge[i][5] = n;
            do {
                edgeValue[i] = parseInt(Math.random() * 20);
            } while (edgeValue[i] == 0);
            i++;
        }
    }

    // 生成路径 十条
    var allPath = svg.selectAll("path")
        .data(edge)
        .enter()
        .append("path")
        .attr("d", (d, i) => {
            var str = "M" + edge[i][0] + "," + edge[i][1] +
                "L" + edge[i][2] + "," + edge[i][3];
            return str;
        })
        .attr("stroke", "#333")
        .attr("stroke-width", "3")
        .attr("start", (d, i) => (edge[i][4] + 1))
        .attr("end", (d, i) => (edge[i][5]) + 1)
        .attr("id", (d, i) => ("e" + i));

    // 生成权值
    var allValue = svg.selectAll("text")
        .data(edge)
        .enter()
        .append("text")
        .attr("font-size", "16")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("text-decoration", "underline")

    // 生成text元素
    var allTextPath = svg.selectAll("text") //选中svg下的所有text元素
        .data(edgeValue) //绑定数据
        .append("textPath") //数组中的所有元素添加一个textPath元素
        .attr("href", (d, i) => ("#e" + i)) //d:当前数组下标所对应的值。i:当前数组下标
        .attr("startOffset", "50%")

    // 生成权值
    var allTspan = svg.selectAll("textPath")
        .data(edgeValue)
        .append("tspan")
        .attr("dy", "-5")
        .text((d, i) => (edgeValue[i]));

    // 为所有边添加权值属性
    svg.selectAll("path")
        .data(edgeValue)
        .attr("value", (d, i) => (edgeValue[i]));

    // 生成圆形
    var allCircle = svg.selectAll("circle")
        .data(cmPoint)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => (cmPoint[i][0]))
        .attr("cy", (d, i) => (cmPoint[i][1]))
        .attr("id", (d, i) => ("c" + i))
        .attr("r", 14)
        .attr("fill", "rgb(173, 216, 230)")

    // 生成点
    var allText = allCircle.select("text")
        .data(cmPoint)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            return i < 10 ? cmPoint[i][0] - 5 : cmPoint[i][0] - 8;
        })
        .attr("y", (d, i) => (cmPoint[i][1] + 6))
        .attr("font-size", "16")
        .attr("id", (d, i) => ("t" + i))
        .text((d, i) => (i + 1));


    // 计算剩余点
    var str0 = new String(),
        length = allText._groups[0].length,
        at = allText._groups[0];
    for (var i = 0; i < length - 1; i++) {
        str0 += at[i].innerHTML + ",";
    }
    str0 += at[i].innerHTML;

    // 计算剩余边
    var length = allPath._groups[0].length,
        ap = allPath._groups[0];
    str1 = new String();
    for (var i = 0; i < length - 1; i++) {
        str1 += "(" + ap[i].getAttribute("start") +
            "," + ap[i].getAttribute("end") +
            "," + ap[i].getAttribute("value") +
            "),";
    }
    str1 += "(" + ap[i].getAttribute("start") +
        "," + ap[i].getAttribute("end") +
        "," + ap[i].getAttribute("value") +
        ")";

    // 生成表格数据,tBody的第一个tr
    var tBody = document.getElementsByTagName("tbody"),
        td = tBody[0].getElementsByTagName("td");

    td[0].innerHTML = "未执行";
    td[1].innerHTML = "无";
    td[2].innerHTML = "无";
    td[3].innerHTML = "0";
    td[4].innerHTML = str0;
    td[5].innerHTML = str1;
}

function kruskal(delay, time) {
    var allCircle = document.getElementsByTagName("circle"),
        allText = document.getElementsByTagName("text"),
        allPath = document.getElementsByTagName("path"),
        vertexReady = new Array(),
        vertexFinished = new Array(),
        vertexNum = 0,
        edgeReady = new Array(),
        edgeFinished = new Array(),
        edgeNum = 0,
        delayTime = 0;


    // 取边的起点、终点、权值、元素等信息
    var d = new Array();
    for (var i = 0; i < allPath.length; i++) {
        d[i] = new Array();
        d[i][0] = allPath[i].getAttribute("start"); // 起点序号
        d[i][1] = allPath[i].getAttribute("end"); // 终点序号
        d[i][2] = allPath[i].getAttribute("value"); // 权值
        d[i][3] = allPath[i]; // 当前边
    }

    // 给边数组按权值进行排序
    function ascend(x, y) {
        return x[2] - y[2];
    }
    d.sort(ascend);

    console.log("warning:---------->"+d);

    // 取点的序号及元素。
    var length = allCircle.length;
    for (var i = 0; i < length; i++) {
        vertexReady[i] = new Array();
        vertexReady[i][0] = allText[i] // 点的序号元素
        vertexReady[i][1] = allCircle[i] // 点元素
    }

    // 获取表格元素
    var table = document.getElementsByTagName("tbody"),
        tr = table[0].getElementsByTagName("tr"),
        td = tr[0].getElementsByTagName("td");

    // 用来填充表格的元素
    var dataset = new Array()

    var now = 0,
        length = vertexReady.length,
        firstFlag = 0;

    setFlag = setTimeout(function(){},0);

    clearColor(delayTime, delay);
    textNowColor("#p0", delayTime, delay);
    sortData(dataset, td, d);
    addElementTd(dataset, time, delayTime, delay);
    clearExplain(delayTime, delay);
    appendExplain([explainText[4]], delayTime, delay);
    delayTime++;

    while (vertexFinished.length != length) {
        // 找到当前需要取出的边和顶点
        for (; now < d.length && vertexFinished.length != length; now++) {
            clearColor(delayTime, delay);
            textNowColor("#p1", delayTime, delay);
            textNowColor("#p2", delayTime, delay);
            clearExplain(delayTime, delay);
            appendExplain([explainText[5]], delayTime, delay);
            delayTime++;
            var sflag = 0,
                eflag = 0;
            // 判断当前顶点是否存在于已排序顶点中
            for (var j = 0; j < vertexFinished.length; j++) {
                if (vertexFinished[j] == d[now][0]) {
                    sflag = 1; //第一个顶点已经存在
                } else if (vertexFinished[j] == d[now][1]) {
                    eflag = 1;
                }
            }
            if (sflag == 1 && eflag == 1) {
                clearColor(delayTime, delay);
                textNowColor("#p1", delayTime, delay);
                textNowColor("#p2", delayTime, delay);
                clearExplain(delayTime, delay);
                appendExplain([explainText[7]], delayTime, delay);
                delayTime++;
                continue;
            }
            clearColor(delayTime, delay);
            textNowColor("#p3", delayTime, delay);
            textNowColor("#p4", delayTime, delay);
            clearExplain(delayTime, delay);
            appendExplain([explainText[8]], delayTime, delay);
            delayTime++;
            clearColor(delayTime, delay);
            textNowColor("#p5", delayTime, delay);
            textNowColor("#p6", delayTime, delay);
            clearExplain(delayTime, delay);
            appendExplain([explainText[9]], delayTime, delay);
            // 将两个顶点加入已排序中
            if (firstFlag == 0 && sflag != 1 && eflag != 1) {
                vertexFinished[vertexNum++] = d[now][0];
                vertexFinished[vertexNum++] = d[now][1];

                // 寻找相应边,并将其加入已排序中
                edgeFinished[edgeNum] = new Array();
                findEdge(edgeFinished, edgeNum, d, now);

                // 获取更改后table的dataset
                setChangeData(dataset, d, now, sflag);

                // 改变dom属性

                // 更改table
                addElementTd(dataset, time, delayTime, delay);

                // 改变circle及edge的颜色
                var cc1 = "#c" + (parseInt(d[now][0]) - 1).toString(),
                    cc2 = "#c" + (parseInt(d[now][1]) - 1).toString();
                // t1 = "#t" + (parseInt(d[now][0]) - 1).toString(),
                // t2 = "#t" + (parseInt(d[now][1]) - 1).toString();
                changeVertexColor(cc1, time, delayTime, delay);
                changeVertexColor(cc2, time, delayTime, delay);
                // changeTextColor(t1, time, delayTime, delay);
                // changeTextColor(t2, time, delayTime, delay);
                changeEdgeColor("#" + d[now][3].id, time, delayTime, delay);

                delayTime++;
                firstFlag = 1;
            } else if (sflag == 1 && eflag != 1) {
                // start点已经存在，加入end点
                vertexFinished[vertexNum++] = d[now][1];

                // 寻找相应边,并将其加入已排序中
                edgeFinished[edgeNum] = new Array();
                findEdge(edgeFinished, edgeNum, d, now)

                // table变化
                setChangeData(dataset, d, now, sflag);

                // 表格添加一行
                addElementTd(dataset, time, delayTime, delay);

                var cc2 = "#c" + (parseInt(d[now][1]) - 1).toString();
                changeVertexColor(cc2, time, delayTime, delay);
                changeEdgeColor("#" + d[now][3].id, time, delayTime, delay);

                delayTime++;
                now=0;
            } else if (sflag != 1 && eflag == 1) {
                // end点已经存在，加入start点
                vertexFinished[vertexNum++] = d[now][0];

                // 寻找相应边,并将其加入已排序中
                edgeFinished[edgeNum] = new Array();
                findEdge(edgeFinished, edgeNum, d, now);

                // table变化
                setChangeData(dataset, d, now, sflag);

                // 表格添加一行
                addElementTd(dataset, time, delayTime, delay);

                var cc1 = "#c" + (parseInt(d[now][0]) - 1).toString();
                changeVertexColor(cc1, time, delayTime, delay);
                console.log(cc1 + "  changed!");
                changeEdgeColor("#" + d[now][3].id, time, delayTime, delay);

                delayTime++;
                now=0;
            }
        }
        clearColor(delayTime, delay);
        textNowColor("#p9", delayTime, delay);
        clearExplain(delayTime, delay);
        appendExplain([explainText[10]], delayTime, delay);
        delayTime++;
    }
}

function findEdge(edgeFinished, edgeNum, d, now) {
    edgeFinished[edgeNum][0] = d[now][0]
    edgeFinished[edgeNum][1] = d[now][1]
    edgeFinished[edgeNum][2] = d[now][2]
    edgeNum++;
}

// 初始化获取表格中生成元素，赋给数组dataset
function setInitData(dataset, td) {
    dataset[0] = 0;
    dataset[1] = new String();
    dataset[2] = new String();
    dataset[3] = 0;
    dataset[4] = td[4].innerHTML;
    dataset[5] = td[5].innerHTML;
}

// 将未排序边进行排序，设置新增tr中td元素具体值
function sortData(dataset, td, d) {
    // td[0]
    dataset[0] = "1";
    // td[1]
    dataset[1] = "无";
    dataset[2] = "无";
    dataset[3] = "0";
    dataset[4] = "1,2,3,4,5";

    var str = new String();
    for (var i = 0; i < d.length - 1; i++) {
        str += "(" + d[i][0] + "," + d[i][1] + "," + d[i][2] + "),"
    }
    str += "(" + d[i][0] + "," + d[i][1] + "," + d[i][2] + ")";
    dataset[5] = str;
}

// 设置新增tr中td元素的具体值
function setChangeData(dataset, d, now, sflag) {
    // table变化
    dataset[0] = parseInt(dataset[0]) + 1;
    if (dataset[0] == 2) {
        dataset[1] = "";
        dataset[1] += d[now][0] + "," + d[now][1];
    } else if (sflag == 0) {
        dataset[1] += "," + d[now][0];
    } else {
        dataset[1] += "," + d[now][1];
    }
    if (dataset[2] == "无") {
        dataset[2] = "";
    }
    dataset[2] += "(" + d[now][0] + "," + d[now][1] + "," + d[now][2] + ")";
    console.log("dataset[3]=" + dataset[3] + "  d[now][2] = " + dataset[2]);
    dataset[3] = parseInt(dataset[3]) + parseInt(d[now][2]);

    // 找到相应的t4 
    var count = dataset[0] == 2 ? 2 : 1;
    if (dataset[0] == 2) {
        setD4(dataset, d, now, 0);
        setD4(dataset, d, now, 1);
    } else if (dataset[0] == 5) {
        dataset[4] = "无";
    } else {
        setD4(dataset, d, now, sflag);
    }


    // 找到相应的t5 
    var tempEdge = String();
    tempEdge = "(" + d[now][0] + "," + d[now][1] + "," + d[now][2] + ")";
    var a = "," + tempEdge + ",",
        b = "," + tempEdge,
        c = tempEdge + ",",
        cutNum = 0;

    if ((cutNum = dataset[5].indexOf(a)) != -1) {
        dataset[5] = dataset[5].slice(0, cutNum + 1) + dataset[5].slice(-dataset[5].length + cutNum + a.length);
    } else if ((cutNum = dataset[5].indexOf(b)) != -1) {
        dataset[5] = dataset[5].slice(0, cutNum);
    } else if ((cutNum = dataset[5].indexOf(c)) != -1) {
        dataset[5] = dataset[5].slice(-dataset[5].length + c.length);
    }
}

// 设置d4
function setD4(dataset, d, now, sflag) {
    var cutNum;
    if ((cutNum = dataset[4].indexOf("," + d[now][sflag] + ",")) != -1) {
        dataset[4] = dataset[4].slice(0, cutNum) + dataset[4].slice(-dataset[4].length + cutNum + 2)
    } else if ((cutNum = dataset[4].indexOf("," + d[now][sflag])) != -1) {
        dataset[4] = dataset[4].slice(0, cutNum);
    } else {
        dataset[4] = dataset[4].slice(-dataset[4].length + 2);
    }
    if (dataset[4] == "") {
        dataset[4] = "null";
    }
}

// 改变顶点颜色
function changeVertexColor(cc, time, delayTime, delay) {
    d3.select(cc)
        .transition()
        .duration(time)
        .delay(delayTime * delay)
        .attr("fill", "rgb(255,0,0)");
}

// 改变边的颜色
function changeEdgeColor(ce, time, delayTime, delay) {
    d3.select(ce)
        .transition()
        .duration(time)
        .delay(delayTime * delay)
        .attr("stroke", "#ff0000")
}

function changeTextColor(ce, time, delayTime, delay) {
    d3.select(ce)
        .transition()
        .duration(time)
        .delay(delayTime * delay)
        .attr("stroke", "rgb(173, 216, 230)");
}

// 创建tr标签，并插入到表格中。
function addElementTd(dataset, time, delayTime, delay) {
    var newTr = d3.select("tbody").append("tr");
    newTr.selectAll("td")
        .data(dataset)
        .enter()
        .append("td")
        .style("border", "0")
        .transition()
        .duration(time)
        .delay(delayTime * delay)
        .style("border", "1px #000000 solid")
        .text((d, i) => (dataset[i]));
}

// 刷新
function refresh() {
    for(var i=0;i<setFlag+200;i++){
        clearTimeout(i);
    }

    // 清除现有内容
    var svg = document.getElementsByTagName("svg");
    svg[0].parentNode.removeChild(svg[0]);
    var showTableDiv = document.getElementById("show-table-div");
    showTableDiv.parentNode.removeChild(showTableDiv);
    clearColor(0, 0);
    // 创建图
    createFS();
    // 初始化code-3class内容
    var code3 = document.getElementsByClassName("code-3");
    while (code3[0].hasChildNodes()) {
        code3[0].removeChild(code3[0].firstChild);
    }
    for (i = 1; i < 4; i++) {
        code3[0].appendChild(explainNode[i]);
    }
}

// 查看结果
function result() {
    // 获取延时时间
    var clickSpeed = document.getElementsByClassName("click-speed-1");
    var delay = (10 - clickSpeed[0].value) * 200;
    var time = delay;
    kruskal(delay, time);
}

// 直接查看结果
function directResult() {
    kruskal(0, 0)
}


// 添加事件
window.onload = function() {
    // 创建图
    createFS();
    createAlgorithmDirection();
    explain();
    // 得到点
    var show = document.getElementsByClassName("kaishi");
    show[0].addEventListener("click", result);

    // 刷新
    var clickRandom = document.getElementsByClassName("click-random");
    clickRandom[0].addEventListener("click", refresh);

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