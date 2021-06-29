import Explore from './pages/explore'
import Featured from './pages/featured';
import ItemDetail from './pages/item-detail';
import User from './pages/user'

export default [
	{
	  path: "/",
	  title: "Explore",
	  component: Explore,
	  exact: true,
		nav: true
	},
	{
	  path: "/featured",
		title: "Featured",
	  component: Featured,
		exact: true,
		nav: true
	},
	{
	  path: "/user",
		title: "My Items",
	  component: User,
		exact: true,
		nav: true
	},
	{
	  path: "/item-detail",
		title: "Item Detail",
	  component: ItemDetail,
		exact: true,
	},
];