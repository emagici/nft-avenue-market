import Explore from './pages/explore'
import ItemDetail from './pages/item-detail';
import LiveDrop from './pages/live-drop'
import Profile from './pages/profile'

export default [
	{
	  path: "/",
	  title: "Explore",
	  component: Explore,
	  exact: true,
		nav: true
	},
	{
	  path: "/live-drop",
		title: "Live Drop",
	  component: LiveDrop,
		exact: true,
		nav: true
	},
	{
	  path: "/profile",
		title: "Profile",
	  component: Profile,
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