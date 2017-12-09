/* 还想尝试一下函数式编程

实际是一个十六进制转二进制的程序，提供了一些选项，使生成报文头更方便。
调查一下一个tcp报文是如何生成的？

模拟：源端口、目的端口等内容 全部随机生成 
模拟TCP三次握手过程，将每一次的报文显示出来，可以随机生成，也可手动输入。

左边放一个Client,右边一个Server。然后是两条竖线，和书上的内容一样。

tcp的三个阶段也可以。


*/

// ------------------------------分割线------------------------------

var timeout_flag = 0;

// 绑定按钮事件
$(function() {
    $("#message-tabs li").bind("click", changeTabs);
    $("#begin-show").bind("click", show);
    $("#random-header").bind("click", createFixedHeader);
    $("#custom-header").bind("click", customData);
    $("#end-show").bind("click", endShow);
})

// 切换到某报文页 若该报文存在，则在上图中该报文变红。
function changeTabs() {
    // 改变标签卡
    $("#message-tabs li").removeClass("active");
    $(this).addClass("active");

    // 改变报文显示
    for (let i = 1; i <= 3; i++) {
        $("#message" + i).addClass("hide");
    }
    var text = $(this).text();
    var ret = /\d/;
    var number = text.match(ret)[0];
    $("#message" + number).removeClass("hide");
}

// 开始演示
function show() {
    // 检测是否存在报文。不存在需要进行生成
    if ($("#message1 input:first").attr("class") == "hide") {
        $("#checkData").modal();
        return false;
    }

    // 添加svg节点
    var clientOffset = $("p").offset();
    var clientHeight = $(".handshake-img-client").css("height");
    var synPosition = [
        [clientOffset.left, clientOffset.top + parseInt(clientHeight) / 3]
    ];
    var svg = document.getElementsByTagName("svg");

    // 生成所有点坐标
    var point_position = [
        [0, parseInt(clientHeight) / 3 - 20],
        [svg[0].width.animVal.value, parseInt(clientHeight) / 3 + 20],
        [0, 2 * parseInt(clientHeight) / 3],
        [svg[0].width.animVal.value, 2 * parseInt(clientHeight) / 3 + 40]
    ]

    // 创建代表报文发送的四个点。
    d3.select("svg")
        .selectAll("circle")
        .data(point_position)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => (point_position[i][0]))
        .attr("cy", (d, i) => (point_position[i][1]))
        .attr("id", (d, i) => ("syn-message" + i))
        .attr("r", 14)
        .classed("hide", true)
        .attr("fill", "rgb(173,216,230)");

    // 创建四个路径
    var message_status = ["message_status_syn", "message_status_synack", "message_status_ack"];

    d3.select("svg")
        .selectAll("line")
        .data(message_status)
        .enter()
        .append("line")
        .attr("id", (d, i) => (message_status[i]))
        .attr("class", "hide")
        .attr("x1", (d, i) => {
            if (i == 1) return point_position[i][0] - 13;
            else return point_position[i][0] + 13;
        })
        .attr("y1", (d, i) => (point_position[i][1]))
        .attr("x2", (d, i) => {
            if (i == 1) return point_position[i + 1][0] + 13;
            else return point_position[i + 1][0] - 13;
        })
        .attr("y2", (d, i) => (point_position[i + 1][1]))
        .attr("stroke", "#333")
        .attr("stroke-width", "1");

    // 创建端口号说明文字
    var port_data = [
        [0, 15, "port:" + $("#message1 input:eq(0)").attr("value")],
        [svg[0].width.animVal.value, 15, "port:" + $("#message1 input:eq(1)").attr("value")],
    ]

    // 创建路径图
    d3.select("svg")
        .selectAll("path")
        .data(port_data)
        .enter()
        .append("text")
        .attr("x", (d, i) => (port_data[i][0]))
        .attr("y", (d, i) => (port_data[i][1]))
        .style("stroke", "black")
        .attr("text-anchor", (d, i) => {
            if (i == 1) return "end";
        })
        .text((d, i) => (port_data[i][2]));

    // 获取所有的circle节点和text节点
    var circle_all = $("circle"),
        text_all = $("text");

    var time = 1;

    // 动画开始
    // 发送第一个报文
    // 显示发送点

    var delay = 1500;

    // 我要和Bob建立通信
    (function(){
        timeout_flag = setTimeout(function(){
            $("#client-explain").text("我想要和Bob建立通信..");
        },delay*time)
    })();
    time++;

    (function(){
        setTimeout(function(){
            $("#client-explain").text("发送SYN包,询问Bob是否可以建立通信");
        },delay*time)
    })();
    time++;

    (function() {
        setTimeout(function() {
            $("circle:eq(0)").attr("class", "");
        }, delay * time)
    })();
 
    
    // 获取图片节点
    (function() {
        setTimeout(function() {
            var message_image = document.getElementById("message_image");
            message_image.setAttribute("class","");
        }, delay * time)
    })();


    // 显示第一条路径
    (function() {
        setTimeout(function() {
            $("line:eq(0)").attr("class", "");
        }, delay * time)
    })();

    // 显示接收点
    (function() {
        setTimeout(function() {
            $("circle:eq(1)").attr("class", "");
        }, delay * time)
    })();
    time++;

    // 第一个报文进行发送的动画
    for (let i = 0; i < delay; i++) {
        (function(i) {
            setTimeout(function() {
            	message_image.style.marginLeft = parseInt(-205+410*i/delay)+"px";
            	message_image.style.marginTop = parseInt(-54+40*i/delay)+"px";
            }, delay * time+i)
        })(i);
  	}
    time++;

    // 显示第二个报文内容
    (function(){
    	setTimeout(function(){
  		  $("#message-tabs li:eq(0)").removeClass("active");
   		  $("#message-tabs li:eq(1)").addClass("active");
   		  $("#message1").addClass("hide");
   		  $("#message2").removeClass("hide");
   		  // 在此处添加报文

    	},delay*time)
    })()

    // 停留一秒
    time++;

    // 发送第二个报文

    (function(){
        setTimeout(function(){
            $("#server-explain").text("收到一个TCP报文,Alice想要和我进行通信!");
        },delay*time)
    })();
    time++;

    (function(){
        setTimeout(function(){
            $("#server-explain").text("没问题!发送SYNACK包,告诉Alice,我已经做好了通信准备!")
        },delay*time)
    })();
    
    // 显示接收点
    (function() {
        setTimeout(function() {
            $("circle:eq(2)").attr("class", "");
        }, delay * time)
    })();
    // 显示第二条路径
    (function() {
        setTimeout(function() {
            $("line:eq(1)").attr("class", "");
        }, delay * time)
    })();
    time++;
    
    // 第二个报文发送动画
    for(let i=0; i<delay;i++){
	    (function(i){
	    	setTimeout(function(){
	    		message_image.style.marginLeft = parseInt(205-410*i/delay)+"px";
            	message_image.style.marginTop = parseInt(-14+40*i/delay)+"px";
	    	},delay*time+i)
	    })(i)
	}
	time++;

    // 收到后的反应
    (function(){
        setTimeout(function(){
            $("#client-explain").text("好的!发送ACK包,告知Bob我已收到消息,然后开始传输数据!");
        },delay*time)
    })();
    time++;

	// 显示第三个报文内容
	(function(){
		setTimeout(function(){
			$("#message-tabs li:eq(1)").removeClass("active");
   			$("#message-tabs li:eq(2)").addClass("active");
   			$("#message2").addClass("hide");
   			$("#message3").removeClass("hide");
		},delay*time)
	})();
	time++;

    //  发送第三个报文
    // 显示接收点
    (function() {
        setTimeout(function() {
            $("circle:eq(3)").attr("class", "");
        }, delay * time)
    })();

    // 显示第三条路径
    (function() {
        setTimeout(function() {
            $("line:eq(2)").attr("class", "");
        }, delay * time)
    })();

    time++;

    // 第三个报文发送动画
    for(let i=0; i<delay;i++){
	    (function(i){
	    	setTimeout(function(){
	    		message_image.style.marginLeft = parseInt(-205+410*i/delay)+"px";
            	message_image.style.marginTop = parseInt(24+46*i/delay)+"px";
	    	},delay*time+i)
	    })(i)
	}
    time++;

    (function(){
        setTimeout(function(){
            $("#server-explain").text("连接已建立,开始接收信息!");
        },delay*time)
    })();
}

// 将部分元素移动及显示
function moveText() {
    var num;

    // 显示input框
    for (let i = 1; i <= 3; i++) {

        $("#message" + i + " input").removeClass("hide");
    }
    
    // 文字左移
    $(".message-row-one-thirtytwo a").addClass("a-move-left");
}

// 自定义报文信息
function customData() {
    // 显示input框
    moveText();
}

// 生成固定报文头
function createFixedHeader(){
    // 检查是否存在报文，若存在则不再随机生成。
    if($("#message1 input:first").attr("class") != "hide") {
        return false;
    }

    // 移动部分字段
    moveText();

    // 储存报文信息
    var message_data = new Array();

    // 添加报文1信息
    message_data[0] = [
        33302,80,
        0,
        0,
        40,0,0,0,0,0,1,0,29200,
        "0xf169",0,
        20+"  Mss,SACK Permitted,Timestap,NOP,Window scale",
        0,
        0
    ];
    message_data[1] = [
        80,33302,
        0,
        1,
        40,
        0,0,1,0,0,1,0,
        8192,
        "0xbbe9",0,
        20+"  Mss,SACK Permitted,NOP",
        0,
        0
    ];
    message_data[2] = [
        33302,80,
        1,
        1,
        20,0,0,1,0,0,0,0,229,
        "0x3fa5",0,
        0,0,
        0
    ]
    
    var message_tab = [];
    for(let j=0;j<3;j++){
        message_tab[j] = d3.select("#message"+(j+1));
        message_tab[j].selectAll("input")
        .data(message_data[j])
        .attr("value", (d, i) => (message_data[j][i]))
        .attr("disabled", "true")
        .style("background-color", "#fff")
        .style("color", "#e6003e");
        console.log(message_tab[j]);
    }

}

// 随机生成报文头
function createRandomHeader() {

    // 检查是否存在报文，若存在则不再随机生成。
    if ($("#message1 input:first").attr("class") != "hide") {
        return false;
    }

    // 移动部分字段
    moveText();

    // 储存报文信息
    var message_data = new Array();

    // 添加报文1信息
    message_data[0] = randomData(433);
    var message = d3.select("#message1");
    message.selectAll("input")
        .data(message_data[0])
        .attr("value", (d, i) => (message_data[0][i]))
        .attr("disabled", "true")
        .style("background-color", "#fff")
        .style("color", "#e6003e");

    // 添加报文2信息
    message = d3.select("#message2");
    message_data[1] = [
        message_data[0][1],
        message_data[0][0],
        0,
        1,
        // 首部长度
        20,
        0,
        0,
        // ACK
        1,
        0,
        0,
        // SYN
        1,
        0,
        29200,
        // 检验和 暂时不知道如何计算
        "0xfa0d",
        0,
        12,
        1360,
        0
    ]
    // 计算首部长度
    message_data[1][4] += message_data[1][15];

}

// 报文首部长度=选项字段长度+最小报文长度

// 随机生成报文信息,目的端口由源报文提供。返回报文对象。
function randomData(destinationPort) {
    var message_data = new Object();
    message_data.source = parseInt(Math.random() * 64551 + 1024);
    message_data.destinationPort = destinationPort;
    message_data.sequence = 0; //一般默认为0
    message_data.ack_num = 0; //默认为0;
    // 首部长度通过最小长度+选项长度得出
    message_data.header = 20;
    message_data.reserve = 0;
    message_data.urg = 0;
    message_data.ack = 0;
    message_data.psh = 0;
    message_data.rst = 0;
    message_data.syn = 1;
    message_data.fin = 0;
    message_data.reciveWindow = 8192; //常用值\
    message_data.checkSum = 502; //暂时不知道如何计算。
    message_data.urgentPointer = 0; //默认为0；
    message_data.option = 12;
    message_data.mssValue = 1460;
    message_data.dataValue = 0;

    message_data.header += message_data.option;

    var message_data_list = [
        message_data.source,
        message_data.destinationPort,
        message_data.sequence,
        message_data.ack_num,
        message_data.header,
        message_data.reserve,
        message_data.urg,
        message_data.ack,
        message_data.psh,
        message_data.rst,
        message_data.syn,
        message_data.fin,
        message_data.reciveWindow,
        message_data.checkSum,
        message_data.urgentPointer,
        message_data.option,
        message_data.mssValue,
        message_data.dataValue
    ]

    return message_data_list;
}

// 结束演示
function endShow() {
    // 清除所有队列中未执行的动画
    for (let i = timeout_flag; i < timeout_flag + 5000; i++) {
        clearTimeout(i);
    }

    // 删除SVG内的元素
    $("svg").empty();
    
    // 添加hide class
    for (let i = 1; i < 4; i++) {
        $("#message" + i + " input").addClass("hide").attr("value", "");
    	$("#message"+i).addClass("hide");
    	$("#message-tabs li:eq("+(i-1)+")").removeClass("active");
    }
    $("#message1").removeClass("hide");
    $("#message-tabs li:eq(0)").addClass("active");

    // 隐藏图片，并将其位置复原
    $("#message_image").addClass("hide").css("margin-left","-205px").css("margin-top","-54px");

    // 清除解释文字
    $("#client-explain").text("我是客户端Alice~");
    $("#server-explain").text("我是服务器Bob~");
}