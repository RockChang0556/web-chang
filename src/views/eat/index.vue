<template>
	<div class="eat-page">
		<!-- <img alt="干饭人阿畅" src="../../assets/IMG_1875.jpg" /> -->
		<ul class="roulette-wrap">
			<li v-for="item in arr" :key="item.id" :class="itemActiveClass(item)">
				<span>{{ item.label }}</span>
			</li>
			<li @click="luckdraw">
				<button :disabled="disabled">开始</button>
			</li>
		</ul>
		<search></search>
		<!-- 		<com-upload-img></com-upload-img> -->
	</div>
</template>

<script>
const PRIZE = [
	{
		id: '001',
		label: '土豆豆角',
	},
	{
		id: '002',
		label: '炒合菜',
	},
	{
		id: '003',
		label: '黄焖鸡',
	},
	{
		id: '004',
		label: '红烧排骨',
	},
	{
		id: '005',
		label: '炒饼/炒面',
	},
	{
		id: '006',
		label: '辣炒豆角丝',
	},
	{
		id: '007',
		label: '土豆豆角焖面',
	},
	{
		id: '008',
		label: '粉丝包菜',
	},
];
export default {
	name: 'Game',
	components: { search },
	data() {
		return {
			disabled: false, // 是否禁用按钮
			select: null, // 存放当前选中的奖品
			arr: [], // 存放奖品列表
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getPrize() {
			// 获取奖品
			// Promise.resolve 会返回一个Promise并把传入的值传入then里
			// Promise.reject 会返回一个Promise并把传入的值传入catch里
			return Promise.resolve(PRIZE);
		},
		getData() {
			// 获取数据
			this.getPrize().then((res) => {
				this.arr = res;
			});
		},
		alert(val) {
			// 弹框
			let dom = document.createElement('div');
			dom.style.cssText = `
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translate(-50%);
          padding: 15px;
          border-radius: 10px;
          background-color: #ccc;
        `;
			dom.innerText = val;
			document.body.appendChild(dom);
			setTimeout(() => {
				document.body.removeChild(dom);
			}, 1000);
		},
		luckdraw() {
			// 抽奖
			this.disabled = true;
			this.animation(function (result) {
				this.disabled = false;
				this.alert(`恭喜你选中了${result.label}`);
			});
		},
		generateIndex() {
			// 生成索引
			return Math.round(Math.random() * this.arr.length);
		},
		generateCount(min, max) {
			// 生成min~max范围的圈数
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		generateArr(rndCount, rndIndex) {
			// 生成动画所需数组
			let arr = [];
			for (let i = 0; i < rndCount; i++) {
				// 这个循环控制转旋转几圈
				arr = arr.concat(this.arr);
			}
			for (let i = 0; i <= rndIndex; i++) {
				// 这个循环为了平滑转到抽中奖品
				arr.push(arr[i]);
			}
			return arr;
		},
		animation(cb) {
			// 开始动画
			let rndIndex = this.generateIndex(); // 生成随机索引
			let rndCount = this.generateCount(2, 5); // 生成随机旋转圈数
			let arr = this.generateArr(rndCount, rndIndex);
			let len = arr.length - 1;
			arr.forEach((item, index) => {
				// 遍历数组依次把item设置成this.select并且通过time来延迟每次循环
				let time = (len + index) * index;
				setTimeout(() => {
					this.select = item;
					index === len && cb.call(this, item); // 完成最后一次动画调用回调函数通知它
				}, time);
			});
		},
		itemActiveClass(item) {
			// 当前选中的类名
			return {
				active: this.select === item,
			};
		},
	},
};
</script>

<style lang="less" scoped>
.eat-page {
	> img {
		width: 200px;
	}
}
.roulette-wrap {
	position: relative;
	list-style: none;
	width: 500px;
	height: 500px;
	margin: 0 auto;
	padding: 0;
	border: 1px solid #000;
	box-sizing: border-box;

	li {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		box-sizing: border-box;
		width: 33.333333333333336%;
		height: 33.333333333333336%;
		border: 1px solid #000;
	}
	li.active {
		background-color: #ccc;
	}
	li:nth-child(1) {
		top: 0;
		left: 0;
	}
	li:nth-child(2) {
		top: 0;
		left: 33.333333333333336%;
	}
	li:nth-child(3) {
		top: 0;
		left: 66.66666666666667%;
	}
	li:nth-child(4) {
		top: 33.333333333333336%;
		left: 66.66666666666667%;
	}
	li:nth-child(5) {
		top: 66.66666666666667%;
		left: 66.66666666666667%;
	}
	li:nth-child(6) {
		top: 66.66666666666667%;
		left: 33.333333333333336%;
	}
	li:nth-child(7) {
		top: 66.66666666666667%;
		left: 0;
	}
	li:nth-child(8) {
		top: 33.333333333333336%;
		left: 0;
	}
	li:nth-child(9) {
		top: 33.333333333333336%;
		left: 33.333333333333336%;
		background-color: rgba(255, 102, 0, 0.637);
	}

	button {
		color: #fff;
		width: 100%;
		height: 100%;
		padding: 0;
		border: none;
		background-color: inherit;
		outline: none;
		cursor: pointer;
		font-size: 16px;
	}
}
</style>
