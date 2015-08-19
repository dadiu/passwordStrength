# 密码强度


<mark> 已包含特殊符号的计分</mark>
## 一：验证流程


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
