/**
 * path 菜单的路径
 * filePath  菜单文件的位置 ，用'/'分割成数组，最后一项作为路由name
 * title 菜单的中文名称
 * icon 菜单的图标
 * show 菜单是否显示
 * alwaysShow 当只有一个子菜单时，父菜单自动隐藏，为true显示父菜单
 * tag 菜单的标签，如hot,new等等
 * children 子菜单
 * hiddenTag 为true不加进tagsView中
 */
export default [
	{
		path: '/dashboard',
		filePath: '/dashboard',
		title: '操作台',
		icon: 'icon-tubiaozhizuomoban-86',
		show: true,
		// alwaysShow: true,
		children: [
			{
				path: 'index',
				filePath: '/dashboard/index',
				title: '首页',
				icon: '',
				show: true,
				children: []
			}
		]
	},
	{
		path: '/goods',
		filePath: '/goods',
		title: '商品管理',
		icon: 'icon-tubiaozhizuomoban-56',
		show: true,
		children: [
			{
				path: 'view',
				filePath: '/goods/view',
				title: '商品列表',
				icon: '',
				show: true,
				children: []
			},
			{
				path: 'update',
				filePath: '/goods/update',
				title: '分类管理',
				icon: '',
				show: true,
				children: []
			},
			{
				path: 'carry',
				filePath: '/goods/carry',
				title: '单位管理',
				icon: '',
				show: true,
				children: []
			}
		]
	},
	{
		path: '/system',
		filePath: '/system',
		title: '系统管理',
		icon: 'icon-tubiaozhizuomoban-45',
		show: true,
		children: [
			{
				path: 'user',
				filePath: '/system/user',
				title: '用户管理',
				icon: '',
				show: true,
				children: []
			},
			{
				path: 'role',
				filePath: '/system/role',
				title: '角色管理',
				icon: '',
				show: true,
				children: []
			},
			{
				path: 'menu',
				filePath: '/system/menu',
				title: '菜单管理',
				icon: '',
				show: true,
				tag: 'NEW',
				children: []
			}
		]
	}
]
