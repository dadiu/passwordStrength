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
			tips : {"0":"默认的友情提示", "1":"长度不对","2":"弱密码，建议修改","success":"可用"},
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
			levelColor : $("<span>").addClass("m_pLevelColor"),
			eyes : $("<i>").addClass("ic_eyes iconfont"),
			tips : $("<span>").addClass("u_tips")
		};
		dfunc = {

			init : function(){

				//组装DOM
				domName.parent().append(objs.bar);
				objs.bar.append(domName);
				if(options.eyes == true){
					objs.bar.append(objs.eyes);
				};
				objs.levelBar.append(objs.levelColor);
				objs.bar.append(objs.levelBar);

				//var _t = this;

			},

			//controller
			C : {}
		};

		dfunc.init(options,objs);

	};

})(jQuery);