import Connect from './pages/connect';
import Explore from './pages/explore'
import FaqSection from './pages/faq';
import Featured from './pages/featured';
import ItemDetail from './pages/item-detail';
import Create from './pages/create'
import User from './pages/user'
import UserSettings from './pages/user/settings';
import FeaturedDrop from './pages/featured-drop';
import SearchPage from './pages/search';
import TransferItem from './pages/transfer-item';

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
	  path: "/featured-drop",
		title: "Featured Drop",
	  component: FeaturedDrop,
		exact: true,
	},
	{
	  path: "/user",
		title: "My Profile",
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
	  path: "/transfer-item",
		title: "Transfer Item",
	  component: TransferItem,
		exact: true,
	},
	{
	  path: "/search",
		title: "Search",
	  component: SearchPage,
		exact: true,
	},
	{
	  path: "/create",
		title: "Create",
	  component: Create,
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