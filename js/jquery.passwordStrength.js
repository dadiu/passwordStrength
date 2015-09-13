/**
 * @url     --
 * @data    2015.08.26
 * @author  wuhaijing
 * @mail    1004609378@qq.com
 * @version V1.0.0
 */
/********************* 传参说明 *********************/
/**
 * 以下均为可选参数
 * id : string		//该dom的id号
 * color : arr		//显示强度颜色	["默认色"，"描边色"，"强度色"]
 * weak : arr		//弱密码数组
 * tips ：object		//提示语		{"0":"友情提示提示"，"1":"长度不对","2":"弱密码，建议修改","success":"可用"}
 * eyes : boolean	//是否出现密码可见icon true = 出现; false = 隐藏
 * len : arr[number,number]		//长度区间	[最小值，最大值]
 * type ：number		//标准 0 = 只要长度够，都可以; 1 = 数字加字母组合; 2 = 数字加字母加符号
 * call ：function	//回调方法
 */
/******************** 开始 ********************/
(function($){
	$.fn.passwordStrength = function(options){

		/**
		 * 声明全局变量
		 */
		var defaults, options, domName = this, objs, dfunc;

		defaults = {
			id : null,
			color : ["gray","orange"],
			weak : ["asdfgh","qwerty","zxcvbn","Password","Passwd","Woaini","Iloveyou","Woaiwojia","521521","5201314","7758521","1314520","1314521","520520","201314","211314","7758258","147258369","159357","123456","1234567","12345678","123456789","654321","123123","123321","123abc"],
			tips : {"0":"请输入密码", "1":"长度不对","2":"弱密码，建议修改","success":"可用"},
			eyes : true,
			eyesArr : ["&#xe638;","&#xe639;"],
			len : [6,20],
			type : 0,
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

					//鼠标按下
					objs.eyes.mousedown(function(){
						$(this).html(options.eyesArr[1]);
						domName.prop("type","text");
						//alert("11");
					});
					objs.eyes.mouseup(function(){
						$(this).html(options.eyesArr[0]);
						domName.prop("type","password");
						//alert(domName.prop("type"));
					});
				};

				//提示位置
				objs.bar.append(objs.tips);

				//等级显示
				objs.levelBar.append(objs.levelColor);
				objs.bar.append(objs.levelBar);

				domName.keyup(function(){
					dfunc.ver($(this).val());
				});

			},

			//验证
			ver : function(num){
				var vLen = num.length,
					weakList = options["weak"].length,
					i = 0;

				//1. 如果长度小于6
				if(vLen < 6){
					objs.tips.html(options.tips[1]);
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

				//其他情况 计算分数
				dfunc.countScroe(num);
				objs.tips.html(options.tips.success);
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

				if(LV >= 5) {
					objs.levelColor.animate({"width":"100%"});
				} else if( LV ==4 ){
					objs.levelColor.animate({"width":"66.7%"});
				} else if( LV > 1 && LV < 4 ) {
					objs.levelColor.animate({"width":"33.4%"});
				} else {
					objs.levelColor.animate({"width":0});
				}
			}
		};

		dfunc.init(options,objs);

	};

})(jQuery);
