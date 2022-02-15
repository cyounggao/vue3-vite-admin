<script lang="jsx">
import { getAssetsUrl } from "@/utils"
export default defineComponent({
	setup: () => {
		return () => (
			// <div class="loading">
			// 	<div class="sk-chase">
			// 		<div class="sk-chase-dot"></div>
			// 		<div class="sk-chase-dot"></div>
			// 		<div class="sk-chase-dot"></div>
			// 		<div class="sk-chase-dot"></div>
			// 		<div class="sk-chase-dot"></div>
			// 		<div class="sk-chase-dot"></div>
			// 	</div>
			// </div>
			<div class="loading">
				<svg width="122" height="150" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#3c9"><rect x="0" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0s;animate.end+0s" values="10;10;30;30;30;30;30;30;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0s;animate.end+0s" values="0;0;0 -15;0 -15;0 -15;0 -15;0 -15;0 -15;0;0" repeatCount="indefinite"></animateTransform></rect><rect x="14" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0.0555556turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0.11s;animate.end+0.11s" values="10;10;60;60;60;60;60;60;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0.11s;animate.end+0.11s" values="0;0;0 -30;0 -30;0 -30;0 -30;0 -30;0 -30;0;0" repeatCount="indefinite"></animateTransform></rect><rect x="28" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0.111111turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0.22s;animate.end+0.22s" values="10;10;80;80;80;80;80;80;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0.22s;animate.end+0.22s" values="0;0;0 -40;0 -40;0 -40;0 -40;0 -40;0 -40;0;0" repeatCount="indefinite"></animateTransform></rect><rect x="42" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0.166667turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0.33s;animate.end+0.33s" values="10;10;90;90;90;90;90;90;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0.33s;animate.end+0.33s" values="0;0;0 -30;0 -30;0 -30;0 -30;0 -30;0 -30;0;0" repeatCount="indefinite"></animateTransform></rect><rect x="56" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0.222222turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0.44s;animate.end+0.44s" values="10;10;90;90;90;90;90;90;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0.44s;animate.end+0.44s" values="0;0;0 -20;0 -20;0 -20;0 -20;0 -20;0 -20;0;0" repeatCount="indefinite"></animateTransform></rect><rect x="70" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0.277778turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0.55s;animate.end+0.55s" values="10;10;90;90;90;90;90;90;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0.55s;animate.end+0.55s" values="0;0;0 -30;0 -30;0 -30;0 -30;0 -30;0 -30;0;0" repeatCount="indefinite"></animateTransform></rect><rect x="84" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0.333333turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0.66s;animate.end+0.66s" values="10;10;80;80;80;80;80;80;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0.66s;animate.end+0.66s" values="0;0;0 -40;0 -40;0 -40;0 -40;0 -40;0 -40;0;0" repeatCount="indefinite"></animateTransform></rect><rect x="98" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0.388889turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0.77s;animate.end+0.77s" values="10;10;60;60;60;60;60;60;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0.77s;animate.end+0.77s" values="0;0;0 -30;0 -30;0 -30;0 -30;0 -30;0 -30;0;0" repeatCount="indefinite"></animateTransform></rect><rect x="112" y="60" rx="5" ry="5" width="10" height="10" style="filter: hue-rotate(0.444444turn);"><animate id="animate" attributeName="height" attributeType="XML" dur="1.6s" begin="0.88s;animate.end+0.88s" values="10;10;30;30;30;30;30;30;10;10" repeatCount="indefinite"></animate><animateTransform attributeName="transform" dur="1.6s" begin="0.88s;animate.end+0.88s" values="0;0;0 -15;0 -15;0 -15;0 -15;0 -15;0 -15;0;0" repeatCount="indefinite"></animateTransform></rect></svg>
			</div>
		)
	}
})
</script>

<style lang="scss" scoped>
.loading {
	position: absolute;
	z-index: 2000;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: $mainBg;
	padding-top: 120px;
	text-align: center;
}
.sk-chase {
	width: 60px;
	height: 60px;
	position: relative;
	left: 50%;
	margin-left: -30px;
	animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot::before {
	content: "";
	display: block;
	width: 25%;
	height: 25%;
	background-color: $mainColor;
	border-radius: 100%;
	animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
	animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
	animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
	animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
	animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
	animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
	animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1)::before {
	animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2)::before {
	animation-delay: -1s;
}
.sk-chase-dot:nth-child(3)::before {
	animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4)::before {
	animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5)::before {
	animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6)::before {
	animation-delay: -0.6s;
}

@keyframes sk-chase {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes sk-chase-dot {
	80%,
	100% {
		transform: rotate(360deg);
	}
}

@keyframes sk-chase-dot-before {
	50% {
		transform: scale(0.4);
	}
	100%,
	0% {
		transform: scale(1);
	}
}
</style>