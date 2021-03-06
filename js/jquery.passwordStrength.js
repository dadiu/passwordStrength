/**
 * @url     --
 * @data    2015.09.16
 * @author  wuhaijing
 * @mail    1004609378@qq.com
 * @version V1.1.2 - 增加,如果密码可用，则代码提示位置的data-boo=1，否则一出data-boo
 */
/********************* 传参说明 *********************/
/**
 * 以下均为可选参数
 * judgeType ：number	//标准类型; 默认0;  0 = 只要长度够，都可以; 1 = 数字加字母组合
 * color : arr			//显示强度颜色	["默认色"，"强度色"]
 * weak : arr			//弱密码数组
 * tips ：object			//提示语		{"0":"友情提示提示"，"1":"长度不对","2":"弱密码，建议修改","3":"请输入数字+字母组合","success":"可用"}
 * tipSet : null		//提示语位置，默认null，出现在input后面,如果传入值，则出现在传入的值内
 * eyes : boolean		//是否出现密码可见icon true = 出现; false = 隐藏
 * eyesArr : arr 		//可见icon的地址或内容 eyes=true时，必填
 * call ：function		//回调方法
 */
/******************** 开始 ********************/


(function($){
	$.fn.passwordStrength = function(options){

		/**
		 * 声明全局变量
		 */
		var domName = this, defaults, options, objs, dfunc, regObj;

		defaults = {
			judgeType : 0,
			color : ["gray","orange"],
			weak : ["123456","1234567","12345678","123456789","123123","456456","789789","asdasd","zxczxc","qweqwe","1234567890","789456","521521","888888","666666","000000"],
			tips : {"0":"请输入密码", "1":"长度不对","2":"弱密码，建议修改","3":"请输入数字+字母组合","success":"可用"},
			tipSet : null,
			eyes : true,
			eyesArr : ["&#xe638;","&#xe639;"],
			callback : null
		};
		options = $.extend(defaults, options);
		objs = {
			bar : $("<div>").addClass("m_pBar"),
			levelBar : $("<p>").addClass("m_pLevelBar"),
			levelColor : $("<span>").addClass("m_pLevelColor").css("background",options.color[1]),
			eyes : $("<a>").attr("href","javascript:;").addClass("ic_eyes iconfont"),
			tips : $("<span>").addClass("u_tips").html(options.tips[0])
		};
		dfunc = {

			init : function(){

				//组装DOM
				domName.parent().append(objs.bar);
				objs.bar.append(domName);
				//是否显示密码可见按钮
				if(options.eyes == true){

					objs.eyes.html(options.eyesArr[0]);
					objs.bar.append(objs.eyes);

					//如果是 小于等于 IE8 则隐藏 点击密码可见功能
					if($.browser.msie && $.browser.version <= 8.0){
						objs.eyes.hide();
					};

					//鼠标按下
					objs.eyes.mousedown(function(){
						$(this).html(options.eyesArr[1]);
						domName.prop("type","text");
					});
					objs.eyes.mouseup(function(){
						$(this).html(options.eyesArr[0]);
						domName.prop("type","password");
					});
				};

				//提示位置
				if(options.tipSet){
					objs.tips = options.tipSet;
				} else {
					objs.bar.append(objs.tips);
				};

				//等级显示
				objs.levelBar.append(objs.levelColor);
				objs.bar.append(objs.levelBar);

				domName.keyup(function(){
					dfunc.ver($(this).val());
				});

				//回调方法
				if(options.callback){
					options.callback();
				};
			},

			//验证
			ver : function(num){
				var vLen = num.length,
					weakList = options["weak"].length,
					i = 0;
				objs.tips.removeAttr("data-boo");

				//1. 如果长度小于6
				if(vLen < 6){
					objs.tips.html(options.tips[1]);
					dfunc.countResult(0);
					return false;
				};

				//2. 如果是弱密码
				for(; i < weakList; i++){
					if(num == options["weak"][i]){
						objs.tips.html(options.tips[2]);
						//直接显示弱LV0
						dfunc.countResult(2);
						return false;
					};
				};

				//如果必须要包含数字加字母组合
				if(options.judgeType == 1 && (regObj.allNum.test(num)||regObj.allEn.test(num))) {
					objs.tips.html(options.tips[3]);
					//直接显示0 不可用
					dfunc.countResult(0);
					return false;
				};

				//其他情况 计算分数
				dfunc.countScroe(num);
				objs.tips.attr("data-boo", 1).html(options.tips.success);

			},

			//计算分数
			countScroe : function(num){
				var score = 0,
					vLen = num.length,
					rLit = /[a-z]/, rCap = /[A-Z]/, LitBoo = rLit.test(num), rCapBoo = rCap.test(num),
					rNumLen = num.replace(/\D/g,"").length,
					rSignLen = num.replace(/[a-zA-Z0-9]/g,"").length,
					bStr = bAbc = bSign = false;

				//1.判断长度
				if(vLen < 6){
					score += 0;
				} else if(vLen >=6 && vLen <= 10){
					score += 10;
				} else if(vLen > 10){
					score += 25;
				};

				//2.判断字母大小写
				if(LitBoo == false && rCapBoo == false){
					score += 0;
				} else if(LitBoo == true && rCapBoo == true){
					score += 25;
				} else {
					score += 10;
				};

				//3.判断数字个数
				if(rNumLen > 0 && rNumLen <=2 ){
					score  += 10;
				} else if(rNumLen > 2){
					score  += 20;
				}

				//4. 检查非单词字符（即特殊字符）
				if(rSignLen == 1 ){
					score  += 10;
				} else if(rSignLen > 1){
					score  += 25;
				}

				//5. 额外奖励
				if(rNumLen > 0) { bStr = true };
				if(LitBoo == true || rCapBoo == true) { bAbc = true };
				if(rSignLen >0 ) { bSign = true };

				if(bStr && bSign && bAbc){
					score += 5;
				} else if(!bAbc && bStr && bSign){
					score += 3;
				} else if(bAbc && !bStr && bSign){
					score += 3;
				} else if(bAbc && bStr && !bSign){
					score += 2;
				};

				//计算密码强度
				dfunc.countResult(dfunc.countLevel(score));
			},
			//计算密码等级
			countLevel : function(score){
				var LV = 0;
				if(score >= 90){
					LV = 8;
				} else if(score >= 80 && score < 90){
					LV = 7;
				} else if(score >= 70 && score < 80){
					LV = 6;
				} else if(score >= 60 && score < 70){
					LV = 5;
				} else if(score >= 30 && score < 60){
					LV = 4;
				} else if(score >= 25 && score < 30){
					LV = 3;
				} else if(score > 0){
					LV = 2;
				} else if(score = 0){
					LV = 1;
				}

				return LV;
			},

			//计算密码强度
			countResult : function(LV){

				if(LV >= 5) {	//强
					objs.levelColor.animate({"width":"100%"},300);
				} else if( LV ==4 ){	//中
					objs.levelColor.animate({"width":"66.7%"},300);
				} else if( LV > 1 && LV < 4 ) {	//弱
					objs.levelColor.animate({"width":"33.4%"},300);
				} else {	//不可用
					objs.levelColor.animate({"width":0},300);
				}
			}
		};

		regObj = {
			allNum: /^[1-9]\d*$/,		//纯数字
			allEn: /^[A-Za-z]+$/		//纯字母
		};

		dfunc.init(options,objs);

	};

})(jQuery);

