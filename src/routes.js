import Connect from './pages/connect';
import Explore from './pages/explore'
import FaqSection from './pages/faq';
import Featured from './pages/featured';
import ItemDetail from './pages/item-detail';
import User from './pages/user'
import UserSettings from './pages/user/settings';

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
	  path: "/settings",
		title: "User Settings",
	  component: UserSettings,
		exact: true,
	},
	{
	  path: "/item-detail",
		title: "Item Detail",
	  component: ItemDetail,
		exact: true,
	},
	{
	  path: "/connect",
		title: "Connect",
	  component: Connect,
		exact: true,
	},
	{
	  path: "/faq",
		title: "FAQ",
	  component: FaqSection,
		exact: true,
	},
];