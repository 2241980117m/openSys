window.onload = function() {
    var numMin = 4;
    var numMax = 7;
    var dataMin = 1;
    var dataMax = 50;
    var array; //存储产生的随机数组 或者 记录输入的数据
    var rHeight = 1;
    var flag = 1; //默认升序
    // var flagAnimation = 1;   //默认有动画效果
    var trans;
    var count = 1; //记录动画的执行次数
    var downCount = 1;
    var upCount = 1;

    var pauseAction = new Array();
    var TIME = 1250;
    var loop = 0; //循环的圈数
    var pauseFlag = 0; //设置动画执行标志

    //定义定时器及定时器数组
    var timer = new Array();
    var timerEvery, changeTimer, upTimer, timer1, timer2;


    var svg = document.getElementById("svg");
    svg.setAttribute("height", document.defaultView.getComputedStyle(document.getElementById("doing-1"), null).height);
    svg.setAttribute("width", document.defaultView.getComputedStyle(document.getElementById("doing-1"), null).width);
    var H = svg.getAttribute("height");
    H = parseInt(H) / 2;
    var Width = svg.getAttribute("width");
    Width = parseInt(Width);

    //在不同的分辨率下设置不同的最大数组长度值

    if (parseInt(svg.getAttribute("width")) <= 425) {
        var numMax = 6;
    } else if (parseInt(svg.getAttribute("width")) <= 768) {
        var numMax = 8;
    } else {
        var numMax = 10;
    }

    var colorObj = {
        'finish': 'rgb(242, 182, 75)',
        'switch': 'red',
        'start': 'rgba(57, 149, 222, 0.84)',
        'left': 'rgba(226, 12, 12, 0.66)',
        'right': 'rgb(242, 182, 75)'
    }


    var explain = {
        0: '将数据进行划分',
        1: '两个数组进行排序',
        2: '左右数组排序完毕',
        3: '排序完毕'
    }


    autoCreate();


    document.getElementsByClassName("click-random")[0].onclick = autoCreate;

    document.getElementsByClassName("click-freedom-2")[0].onclick = function selectDate() {

        /*if(pauseFlag == 1){
          console.log("动画正在执行中,请稍后再试");
        }else{*/
        var flag; //判断是否符合范围
        array = new Array();
        pause();
        var data = document.getElementsByClassName("click-input")[0].value;
        verifyChar(data);
        array = data.split(','); //筛选的是字符串
        console.log(array);
        //判断是否符合范围
        flag = verify(array);
        if (flag) {
            clearAll();
            var rectItem = getRectItem(array.length);
            trans = rectShape(array, rectItem);
            //  document.getElementsByClassName("click-freedom-2")[0].disabled = false;
        }
        /*else{
                                document.getElementsByClassName("click-freedom-2")[0].disabled = true;
                             }
        */
        // }
    }

    //显示直接排序结果
    document.getElementsByClassName("click-add")[0].onclick = function() {
        if(pauseFlag == 0){
            //pause();
            noAnimationMerge(array, trans);
        }

    }

    //设置为升序排序
    document.getElementsByClassName("click-add1")[0].onclick = function() {
        flag = 1;
        //升序算法显示，降序算法隐藏
        document.getElementById("add_algorithm").style.display = "block";
        document.getElementById("de_algorithm").style.display = "none";
    }


    //设置为降序排序
    document.getElementsByClassName("click-add1")[1].onclick = function() {
        flag = 0;
        //升序算法隐藏，降序算法显示
        document.getElementById("add_algorithm").style.display = "none";
        document.getElementById("de_algorithm").style.display = "block";
    }


    //改变延时时间
    function changeTime() {
        TIME = 2500;
        TIME = TIME - 200 * $(".click-speed-1").attr("value");
        console.log("TIME:" + TIME);
    }

    $(".click-speed-1").RangeSlider({ min: 0, max: 10, step: 0.1, callback: changeTime });

    function autoCreate() {
        clearAll();
        pause();
        pauseFlag = 0;
        array = new Array();
        array = getRandomArray(numMin, numMax, dataMin, dataMax);
        document.getElementsByClassName("click-input")[0].value = array;
        var rectItem = getRectItem(array.length);
        trans = rectShape(array, rectItem);
    }


    document.getElementsByClassName("kaishi")[0].onclick = function() {
        if (pauseFlag == 0) {
            count = 1;
            merge_sort(array, trans);
        }
        pauseFlag = 1;

    }





    //产生随机数
    function getRandom(min, max) {
        var rand = 0;
        while (rand == 0) {
            rand = Math.random();
        }

        var range = max - min;
        return min + Math.round(rand * range);
    }

    //根据产生的随机数确定数组的数目，并且实现产生随机数组
    function getRandomArray(numMin, numMax, dataMin, dataMax) {
        var num = getRandom(numMin, numMax);
        var array = new Array();
        for (var i = 0; i < num; i++) {
            array[i] = getRandom(dataMin, dataMax);
            console.log(array[i]);
        }
        return array;
    }

    //动态产生第一个矩形的左边距
    function getRectItem(num) {

        var Width = document.getElementsByTagName("svg")[0].getAttribute("width");

        Width = parseInt(Width);

        var rectItem = {
            margin: 5,
            rWidth: 40,
            marginLeft: 100
        }

        console.log("width:" + Width);

        var marginLeft = (Width - num * rectItem.rWidth - (num - 1) * rectItem.margin) / 2;

        rectItem.marginLeft = marginLeft;

        return rectItem;

    }


    function createRect(height, marginLeft, content) {
        console.log("hhh:" + H);
        console.log("height:"+height);
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.style.transform = "translate(" + marginLeft + "px," + (H - height) + "px)";
        var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        r.setAttribute("fill", colorObj.start);
        r.setAttribute("x", 0 + "rem");
        r.setAttribute("y", 0 + "px");
        r.setAttribute("width", "40px");
        r.setAttribute("height", height + "px");
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.textContent = content;
        if (content >= 10) {
            text.setAttribute("x", "1.0rem");
        } else {
            text.setAttribute("x", "1.3rem");
        }

        text.setAttribute("y", height - 10 + "px");
        g.appendChild(r);
        g.appendChild(text);
        svg.appendChild(g);

    }

    function rectShape(array, rect) {
         var per = getPer(array,H);
        
        for (i = 0; i < array.length; i++) {
            console.log(i);
            if (i == 0) {
                if (parseInt(document.body.clientWidth) < 768) {
                    createRect(array[i] * per, rect.marginLeft, array[i]);
                } else {
                    createRect(array[i] * per, rect.marginLeft, array[i]);
                }
            } else {
                if (parseInt(document.body.clientWidth) < 768) {
                    createRect(array[i] * per, rect.marginLeft + rect.margin * i + i * rect.rWidth, array[i]);
                } else {
                    createRect(array[i] * per, rect.marginLeft + rect.margin * i + i * rect.rWidth, array[i]);
                }
            }

        }
        var trans = new Array();
        var og = document.getElementsByTagName("g");
        for (var k = 0; k < og.length; k++) {
            trans[k] = getX(og[k]);
        }
        console.log("转换前的transX:" + trans);
        return trans;
    }

    //升序动画
    function merge_sort(arr, trans) {
        var og = document.getElementsByTagName("g");
        var merge_length = 1;
        var nn = arr.length;
        var arrIndex = new Array();

        function merge(arr1, arr2, loc, arr3, arr4) {

            var i = 0,
                j = 0;
            var temp;
            var k;

            var arrIn1 = new Array();
            var arrIn2 = new Array();

            console.log("arr1:" + arr1);
            console.log("arr2:" + arr2);
            console.log("arr3:" + arr3);
            console.log("arr4:" + arr4);

            if (flag > 0) {
                arr1.push(Number.POSITIVE_INFINITY);
                arr2.push(Number.POSITIVE_INFINITY);
                //将准备比较的几个数改变颜色
                for (var m = 0; m < arr1.length - 1; m++) {
                    var temp = getIndex(og, arr1[m], 0);
                    if (arrIndex.length) {
                        for (k = 0; k < arrIndex.length;) {
                            if (arrIndex[k] == temp) {
                                k = 0;
                                temp = getIndex(og, arr1[m], temp + 1);
                            } else {
                                k++;
                            }
                        }
                    }

                    arrIndex.push(temp);
                    arrIn1.push(temp);
                }
                for (var r = 0; r < arr2.length - 1; r++) {
                    var temp = getIndex(og, arr2[r], 0);

                    if (arrIndex.length) {
                        for (k = 0; k < arrIndex.length;) {
                            if (arrIndex[k] == temp) {
                                k = 0;
                                temp = getIndex(og, arr2[r], temp + 1);
                            } else {
                                k++;
                            }
                        }

                    }
                    arrIndex.push(temp);
                    arrIn2.push(temp);
                }


                timerEvery = setTimeout(function() {
                    if (arr1.length == 2 && count == 1) {
                        setTimeout(function() {
                            lightBackground(0);
                        }, TIME * count);
                        count++;
                    }
                    changeTimer = setTimeout(function() {
                        var temp = 0;

                        changeLeftColor(arrIn1);

                        changeRightColor(arrIn2);
                        lightBackground(1);
                        var content = "Left=[" + arr1.toString() + "],Right=[" + arr2.toString() + "]";
                        fillExplainContent(content + "进行排序");
                    }, TIME * count);
                    timer.push(changeTimer);
                    count++;

                    compare(arr1, arr2, loc, arr, arrIn1, arrIn2);


                    upTimer = setTimeout(function() {
                        var temp = 0;
                        animationUp(arrIn1);
                        animationUp(arrIn2);
                        var content = "Left=[" + arr1.toString() + "],Right=[" + arr2.toString() + "]";
                        fillExplainContent(content + "排序完毕");

                        //找arrIn2[]里的最大值
                        for (var i = 0; i < arrIn2.length; i++) {
                            if (temp < arrIn2[i]) {
                                temp = arrIn2[i];
                            }
                        }


                        if (og.length - 1 - temp <= og.length % (arrIn1.length + arrIn2.length)) {

                            lightBackground(6, 7);
                        }

                        //动画结束时  将图标改为开始并且显示排序结束
                        if (og.length - arrIn1.length - arrIn2.length <= 0) {

                            fillExplainContent(explain[3]);
                            //pauseFlag = 0;
                            changeFinish();
                            lightBackground(6, 7);
                        }
                    }, TIME * count);
                    timer.push(upTimer);
                    count++;
                }, 0); //升序结束  
                timer.push(timerEvery);
            } else {
                arr1.push(Number.NEGATIVE_INFINITY);
                arr2.push(Number.NEGATIVE_INFINITY);
                //将准备比较的几个数改变颜色
                for (var m = 0; m < arr1.length - 1; m++) {
                    var temp = getIndex(og, arr1[m], 0);
                    if (arrIndex.length) {
                        for (k = 0; k < arrIndex.length;) {
                            if (arrIndex[k] == temp) {
                                k = 0;
                                temp = getIndex(og, arr1[m], temp + 1);
                            } else {
                                k++;
                            }
                        }
                    }

                    arrIndex.push(temp);
                    arrIn1.push(temp);
                }

                for (var r = 0; r < arr2.length - 1; r++) {
                    var temp = getIndex(og, arr2[r], 0);

                    if (arrIndex.length) {
                        for (k = 0; k < arrIndex.length;) {
                            if (arrIndex[k] == temp) {
                                k = 0;
                                temp = getIndex(og, arr2[r], temp + 1);
                            } else {
                                k++;
                            }
                        }

                    }
                    arrIndex.push(temp);
                    arrIn2.push(temp);
                }


                timerEvery = setTimeout(function() {
                    if (arr1.length == 2 && count == 1) {
                        setTimeout(function() {
                            lightBackground(0);
                        }, TIME * count);
                        count++;
                    }

                    //   if(flagAnimation){
                    changeTimer = setTimeout(function() {
                        var temp = 0;

                        changeLeftColor(arrIn1);

                        changeRightColor(arrIn2);
                        lightBackground(1);
                        var content = "Left=[" + arr1.toString() + "],Right=[" + arr2.toString() + "]";
                        fillExplainContent(content + "进行排序");

                    }, TIME * count);
                    timer.push(changeTimer);
                    count++;

                    compareDown(arr1, arr2, loc, arr, arrIn1, arrIn2);


                    upTimer = setTimeout(function() {
                        var temp = 0;
                        animationUp(arrIn1);
                        animationUp(arrIn2);
                        var content = "Left=[" + arr1.toString() + "],Right=[" + arr2.toString() + "]";
                        fillExplainContent(content + "排序完成");

                        //找arrIn2[]里的最大值
                        for (var i = 0; i < arrIn2.length; i++) {
                            if (temp < arrIn2[i]) {
                                temp = arrIn2[i];
                            }
                        }


                        if (og.length - 1 - temp <= og.length % (arrIn1.length + arrIn2.length)) {
                            fillExplainContent(explain[0]);
                            lightBackground(6, 7);
                        }

                        //动画结束时  将图标改为开始并且显示排序结束
                        if (og.length - arrIn1.length - arrIn2.length <= 0) {
                            /* document.getElementById("zanting").style.display="none";
                             document.getElementById("kaishi").style.display="block";*/

                            fillExplainContent(explain[3]);
                            changeFinish();
                            //pauseFlag = 0;
                            lightBackground(6, 7);
                        }
                    }, TIME * count);
                    timer.push(upTimer);
                    count++;
                }, 0);
                timer.push(timerEvery);
                count++;
            }
        }
        //merge函数结束
        function fun() {

            var timer_1 = setTimeout(function() {
                arrT = new Array();


                var og = document.getElementsByTagName("g");


                for (var i = 0; i + 2 * merge_length < nn; i = i + 2 * merge_length) {
                    merge(arr.slice(i, i + merge_length), arr.slice(i + merge_length, i + 2 * merge_length), i, trans.slice(i, i + merge_length), trans.slice(i + merge_length, i + 2 * merge_length));
                }

                if (i + merge_length < nn) {
                    merge(arr.slice(i, i + merge_length), arr.slice(i + merge_length, nn), i, trans.slice(i, i + merge_length), trans.slice(i + merge_length, nn));
                }

                merge_length *= 2;
                loop++;
                arrIndex = new Array();

                arrT = new Array();
                fun();

            }, 0);
            timer.push(timer_1);
        }
        fun();
        return arr;
    }

    function getX(obj) {
        return Number(obj.style.transform.match(/[\d|.]+/g)[0]);
    }

    function getY(obj) {
        return Number(obj.style.transform.match(/[\d|.]+/g)[1]);
    }


    function verify(arr) {
        if (arr.length > numMax) {
            alert("输入数据请不要超过" + numMax + "组！");
            return false;
        }

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > 100 || arr[i] < 1) {
                alert("请确保每个数据的大小介于1~100之间");
                return false;
            }
        }
        return true;
    }


    //验证输入的数据是否是合法数据
    function verifyChar(str) {
        if (!/^(\d+,?)+$/.test(str)){
           alert("输入的数据有误");
        }
    }

    function getContent(obj) {
        return obj.getElementsByTagName("text")[0].textContent;
    }

    function getIndex(obj, data, i) {
        for (var index = i; index < obj.length; index++) {
            if (getContent(obj[index]) == data) {
                return index;
            }
        }

    }

    //清除所有的svg子元素
    function clearAll() {
        var oSvg = document.getElementsByTagName("svg")[0];
        var oG = document.getElementsByTagName("g");
        while (oG.length) {
            for (var i = 0; i < oG.length; i++) {
                oSvg.removeChild(oG[i]);
            }
        }

    }

    function animationdown(obj, num, pos, loc, d1) {
        var x = getX(obj);
        var h = document.getElementById("svg").getAttribute("height");
        h = parseInt(h) / 3;
        if (x <= num) {

            addAnimation(obj, num, getY(obj) + h, pos, loc, d1);
            count++;
        } else if (x > num) {

            deAnimation(obj, num, getY(obj) + h, pos, loc, d1);
            count++;
        }
    }

    function animationUp(args) {
        var og = document.getElementsByTagName("g");
        var h = document.getElementById("svg").getAttribute("height");
        h = parseInt(h) / 3;

        for (var i = 0; i < args.length; i++) {
            transition(og[args[i]], getX(og[args[i]]), getY(og[args[i]]) - h);
        }

    }

    function addAnimation(obj, num, height, pos, loc, d1) {
        var og = document.getElementsByTagName("g");
        //  if(flagAnimation){
        timer1 = setTimeout(function() {
            var x = getX(obj);

            transition(obj, num, height, pos, loc, d1);

        }, TIME * count);
        timer.push(timer1);

        //  }

    }

    function deAnimation(obj, num, height, pos, loc, d1) {
        var og = document.getElementsByTagName("g");
        // if(flagAnimation){
        timer2 = setTimeout(function() {
            transition(obj, num, height, pos, loc, d1);
        }, TIME * count);
        timer.push(timer2);
        // }

    }

    //改变颜色
    function changeLeftColor(args1) {
        var og = document.getElementsByTagName("g");

        for (var j = 0; j < og.length; j++) {
            og[j].getElementsByTagName("rect")[0].setAttribute("fill", colorObj.start);
        }

        for (var i = 0; i < args1.length; i++) {
            og[args1[i]].getElementsByTagName("rect")[0].setAttribute('fill', colorObj.left)

        }

    }

    function transition(obj, num1, num2, pos, loc, d1) {
        var explain = document.getElementById("explain");
        obj.style.transform = "translate(" + num1 + "px," + num2 + "px)";
        obj.style.webkitTransform = "translate(" + num1 + "px," + num2 + "px)";
        obj.style.mozTransform = "translate(" + num1 + "px," + num2 + "px)";
        obj.style.oTransform = "translate(" + num1 + "px," + num2 + "px)";
        if (pos == 1) {
            lightBackground(2, 3);
            if (flag == 1) {
                fillExplainContent(obj.getElementsByTagName("text")[0].innerHTML + "<=" + d1 + ",arr[" + loc + "]=" + obj.getElementsByTagName("text")[0].innerHTML + ";i++;loc++");
            } else {
                fillExplainContent(obj.getElementsByTagName("text")[0].innerHTML + ">=" + d1 + ",arr[" + loc + "]=" + obj.getElementsByTagName("text")[0].innerHTML + ";i++;loc++");
            }

        } else if (pos == 0) {
            lightBackground(4, 5);
            if (flag == 1) {

                fillExplainContent(d1 + "&gt;" + obj.getElementsByTagName("text")[0].innerHTML + ",arr[" + loc + "]=" + obj.getElementsByTagName("text")[0].innerHTML + ";j++;loc++");
            } else {
                fillExplainContent(d1 + "&lt;" + obj.getElementsByTagName("text")[0].innerHTML + ",arr[" + loc + "]=" + obj.getElementsByTagName("text")[0].innerHTML + ";j++;loc++");

            }
        }

    }



    function changeRightColor(args) {
        var og = document.getElementsByTagName("g");
        for (var i = 0; i < args.length; i++) {
            console.log("og index:" + args[i]);
            og[args[i]].getElementsByTagName("rect")[0].setAttribute('fill', colorObj.right);
        }
    }

    function changeFinish() {
        var og = document.getElementsByTagName("g");
        for (var i = 0; i < og.length; i++) {

            og[i].getElementsByTagName("rect")[0].setAttribute('fill', colorObj.finish);
        }
    }
    //升序比较
    function compare(arr1, arr2, loc, arr, arrIn1, arrIn2) {

        var og = document.getElementsByTagName("g");
        var i = 0;
        var j = 0;
        var m;
        var temp;
        var pos;

        var n1 = arr1.length - 1;
        var n2 = arr2.length - 1;
        var arrT = new Array(); //用arrT记录下此时需要比较的g的下标


        for (m = 0; m < arrIn1.length; m++) {
            arrT.push(arrIn1[m]);
        }
        for (m = 0; m < arrIn2.length; m++) {
            arrT.push(arrIn2[m]);
        }

        while (i + j < n1 + n2) {
            if (Number(arr1[i]) <= Number(arr2[j])) {
                arr[loc] = arr1[i];
                i++;
                pos = 1; //当arr1[i] <= arr2[j]的时候

            } else {
                arr[loc] = arr2[j];
                j++;
                pos = 0;

            }

            temp = getIndex(og, arr[loc], 0);
            for (m = 0; m < arrT.length; m++) {

                if (Number(getContent(og[arrT[m]])) == arr[loc]) {
                    temp = arrT[m];
                    arrT.splice(m, 1);
                    break;
                }
            }
            var content = "Left=[" + arr1.toString() + "]," + "Right=[" + arr2.toString() + "]";

            //知道另外一个数是什么
            if (parseInt(og[temp].getElementsByTagName("text")[0].innerHTML) == arr1[i - 1]) {
                animationdown(og[temp], trans[loc], pos, loc, arr2[j]);
            } else {
                animationdown(og[temp], trans[loc], pos, loc, arr1[i]);
            }
            loc++;
        }

    }

    //降序比较
    function compareDown(arr1, arr2, loc, arr, arrIn1, arrIn2) {

        var og = document.getElementsByTagName("g");
        var i = 0;
        var j = 0;
        var m;
        var temp;
        var pos;

        var n1 = arr1.length - 1;
        var n2 = arr2.length - 1;
        var arrT = new Array();
        //用arrT记录下此时需要比较的g的下标

        for (m = 0; m < arrIn1.length; m++) {
            arrT.push(arrIn1[m]);
        }
        for (m = 0; m < arrIn2.length; m++) {
            arrT.push(arrIn2[m]);
        }

        while (i + j < n1 + n2) {
            if (Number(arr1[i]) >= Number(arr2[j])) {
                arr[loc] = arr1[i];
                i++;
                pos = 1; //当arr1[i] <= arr2[j]的时候

            } else {
                arr[loc] = arr2[j];
                j++;
                pos = 0;

            }

            temp = getIndex(og, arr[loc], 0);
            for (m = 0; m < arrT.length; m++) {

                if (Number(getContent(og[arrT[m]])) == arr[loc]) {
                    temp = arrT[m];
                    arrT.splice(m, 1);
                    break;
                }
            }

            if (parseInt(og[temp].getElementsByTagName("text")[0].innerHTML) == arr1[i - 1]) {
                animationdown(og[temp], trans[loc], pos, loc, arr2[j]);
            } else {
                animationdown(og[temp], trans[loc], pos, loc, arr1[i]);
            }

            loc++;
        }

    }


    function noAnimationMerge(arr, trans) {
        var og = document.getElementsByTagName("g");
        var merge_length = 1;
        var nn = arr.length;
        var arrT = new Array(); //避免因为出现重复的数字而导致排序结果出错

        function merge(arr1, arr2, loc) {

            var i = 0,
                j = 0;
            var temp;

            if (flag > 0) {
                arr1.push(Number.POSITIVE_INFINITY);
                arr2.push(Number.POSITIVE_INFINITY);

                var n1 = arr1.length - 1;
                var n2 = arr2.length - 1;
                while (i + j < n1 + n2) {
                    if (Number(arr1[i]) <= Number(arr2[j])) {
                        arr[loc] = arr1[i];
                        i++;

                    } else {
                        arr[loc] = arr2[j];
                        j++;
                    }
                    console.log("arr[loc]:" + arr[loc]);
                    temp = getIndex(og, arr[loc], 0);
                    for (var k = 0; k < arrT.length;) {
                        if (arrT[k] == temp) {
                            temp = getIndex(og, arr[loc], temp + 1);
                            k = 0;
                        } else {
                            k++;
                        }
                    }
                    console.log("temp:" + temp);
                    arrT.push(temp);
                    transition(og[temp], trans[loc], getY(og[temp]));
                    //  animation(og[temp],trans[loc]);

                    loc++;

                }
            } else {
                arr1.push(Number.NEGATIVE_INFINITY);
                arr2.push(Number.NEGATIVE_INFINITY);

                var n1 = arr1.length - 1;
                var n2 = arr2.length - 1;
                while (i + j < n1 + n2) {
                    if (Number(arr1[i]) >= Number(arr2[j])) {
                        arr[loc] = arr1[i];
                        i++;

                    } else {
                        arr[loc] = arr2[j];
                        j++;
                    }
                    console.log("arr[loc]:" + arr[loc]);
                    temp = getIndex(og, arr[loc], 0);
                    for (var k = 0; k < arrT.length;) {
                        if (arrT[k] == temp) {
                            temp = getIndex(og, arr[loc], temp + 1);
                            k = 0;
                        } else {
                            k++;
                        }
                    }
                    console.log("temp:" + temp);
                    arrT.push(temp);
                    transition(og[temp], trans[loc], getY(og[temp]));
                    //  animation(og[temp],trans[loc]);

                    loc++;

                }
            }

        }
        //merge结束

        while (merge_length <= nn) {

            for (var i = 0; i + 2 * merge_length < nn; i = i + 2 * merge_length) {
                merge(arr.slice(i, i + merge_length), arr.slice(i + merge_length, i + 2 * merge_length), i);
            }

            if (i + merge_length < nn) {
                merge(arr.slice(i, i + merge_length), arr.slice(i + merge_length, nn), i);
            }

            merge_length *= 2;
            arrT = new Array();

        }
        return arr;


    }

    //填充解释说明
    function fillExplainContent(string) {
        var oExplain = document.getElementById("explain");
        var oli = oExplain.getElementsByTagName("li")[0];
        oli.innerHTML = string;
    }

    function lightBackground() {
        //alert("args:"+arguments);
        console.log("args:" + arguments);
        if (flag == 1) {
            var algorithm = document.getElementById("add_algorithm");
        } else {
            var algorithm = document.getElementById("de_algorithm");
        }

        var oli = algorithm.getElementsByTagName("li");
        for (var i = 0; i < oli.length; i++) {
            oli[i].style.transition = "backgroundColor 0ms linear";
            oli[i].style.backgroundColor = "transparent";
        }
        for (i = 0; i < arguments.length; i++) {
            oli[arguments[i]].style.backgroundColor = "rgba(241, 199, 73, 0.83)";
        }


    }

    function pause() {
        count = 1;
        if (timer.length != 0) {
            for (var i = 0; i < timer.length; i++) {
                clearTimeout(timer[i]);
            }
        }
        //改变颜色
        var code2 = document.getElementsByClassName("code-2")[0];
        var oli = code2.getElementsByTagName("li");
        for (i = 0; i < oli.length; i++) {
            oli[i].style.backgroundColor = "transparent";
        }
        //清空解释区的内容
        var explain = document.getElementById("explain");
        explain.getElementsByTagName("li")[0].innerHTML = "";
    }
    }

    function getPer(arr, h) {

        var max = getMax(arr);
        console.log("最大值是:"+max);
        return h / max;
    }
    function getMax(arr){
        var max = Number(arr[0]);
        
        for(var m=1;m<arr.length;m++){
           if(max<Number(arr[m])){
            max = Number(arr[m]);
            console.log("遍历到的数组元素是:"+arr[m]);
           }
        }
        //alert(max);
        return max;
    }