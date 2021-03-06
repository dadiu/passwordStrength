# 密码强度

## 一：插件说明
### 最近更新
- V1.1.3 :  增加默认弱密码
- V1.1.2 :  如果密码可用，则代码提示位置的data-boo=1，否则一出data-boo
- V1.1.1 :  增加tipSet 提示语位置可自定义
- V1.1.0 :  增加判断定义模式+callback；删除id和len属性
- V1.0.1 :  优化-如果是 小于等于 IE8 则隐藏 点击密码可见功能
- V1.0.0 ： 创建该插件
 
### 兼容性
- IE9+（支持可见可选）
- IE8-（暂时不支持可见功能）

### 线上地址
- [戳这里](http://whj.fayfox.com/demo/plugIn.passwordStrength/)

### 参数说明
<pre>
 * 以下均为必填参数
 * 无
 *
 * 以下均为可选参数
 * judgeType ：number	//标准类型; 默认0;  0 = 只要长度够，都可以; 1 = 数字加字母组合
 * color : arr			//显示强度颜色	["默认色"，"强度色"]
 * weak : arr			//弱密码数组
 * tips ：object		//提示语		{"0":"友情提示提示"，"1":"长度不对","2":"弱密码，建议修改","3":"请输入数字+字母组合","success":"可用"}
 * tipSet : null		//提示语位置，默认null，出现在input后面,如果传入值，则出现在传入的值内
 * eyes : boolean		//是否出现密码可见icon true = 出现; false = 隐藏
 * eyesArr : arr 		//可见icon的地址或内容 eyes=true时，必填
 * call ：function		//回调方法
 *
 * 默认弱密码
 * ["123456","1234567","12345678","123456789","123123","456456","789789","asdasd","zxczxc","qweqwe","1234567890","789456","521521","888888","666666","000000"]
</pre>

### 使用方法
下次来补充。。


<mark> 已包含特殊符号的计分</mark>
## 二：分数计算
<mark> 初始分数 = 0 </mark>
### 1.判断长度
<table>
	<thead>
		<tr>
			<th width="284">条件</th>
			<th width="284">分数</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Length&lt;6</td>
			<td>+0</td>
		</tr>
		<tr>
			<td>Length&gt;= 6 &amp;&amp; length &lt;= 10</td>
			<td>+10</td>
		</tr>
		<tr>
			<td>Length&gt; 10</td>
			<td>+25</td>
		</tr>
	</tbody>
</table>

### 2. 判断字母大小写
<table>
	<thead>
		<tr>
			<th width="284">条件</th>
			<th width="284">分数</th>
		</tr>
	</thead>
	<tdoby>
		<tr>
			<td>没有字母</td>
			<td>+0</td>
		</tr>
		<tr>
			<td>1.包含了小写但没有大写<br />2.包含了大写但没有小写</td>
			<td>+10</td>
		</tr>
		<tr>
			<td>既有大写 又有 小写</td>
			<td>+25</td>
		</tr>
	</tbody>
</table>


### 3. 判断数字个数
<table>
	<thead>
		<tr>
			<th width="284">条件</th>
			<th width="284">分数</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>没有数字</td>
			<td>+0</td>
		</tr>
		<tr>
			<td>大于0个 &amp;&amp; 小于等于2个</td>
			<td>+10</td>
		</tr>
		<tr>
			<td>大于2个</td>
			<td>+20</td>
		</tr>
	</tbody>
</table>

### 4. 检查非单词字符（即特殊字符）

<table>
	<thead>
		<tr>
			<th width="284">条件</th>
			<th width="284">分数</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>没有非单词字符</td>
			<td>+0</td>
		</tr>
		<tr>
			<td>1个非单词字符</td>
			<td>+10</td>
		</tr>
		<tr>
			<td>1个以上非单词字符</td>
			<td>+25</td>
		</tr>
	</tbody>
</table>

### 5. 额外奖励
<table>
	<thead>
		<tr>
			<th width="284">条件</th>
			<th width="284">分数</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>数字+字母</td>
			<td>+2</td>
		</tr>
		<tr>
			<td>1.数字+非单词字母<br />2.字母+非单词字母</td>
			<td>+3</td>
		</tr>
		<tr>
			<td>数字+字母+非单词字母</td>
			<td>+5</td>
		</tr>
	</tbody>
</table>

## 三：强度计算

<table>
	<thead>
		<tr>
			<th width="284">密码总分</th>
			<th width="284">密码等级</th>
			<th width="284">密码强度</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>&gt;=90</td>
			<td>8</td>
			<td>强</td>
		</tr>
		<tr>
			<td>&gt;=80 &amp;&amp; &lt; 90</td>
			<td>7</td>
			<td>强</td>
		</tr>
		<tr>
			<td>&gt;=70 &amp;&amp; &lt; 80</td>
			<td>6</td>
			<td>强</td>
		</tr>
		<tr>
			<td>&gt;=60 &amp;&amp; &lt;70</td>
			<td>5</td>
			<td>强</td>
		</tr>
		<tr>
			<td>&gt;=30 &amp;&amp; &lt;60</td>
			<td>4</td>
			<td>中</td>
		</tr>
		<tr>
			<td>&gt;=25 &amp;&amp; &lt;30</td>
			<td>3</td>
			<td>弱</td>
		</tr>
		<tr>
			<td>&gt;0</td>
			<td>2</td>
			<td>弱</td>
		</tr>
		<tr>
			<td>=0</td>
			<td>1</td>
			<td>不可用</td>
		</tr>
	</tbody>
</table>
