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
import ProfileInfo from './pages/profile-info';
import PrivacyPolicy from './pages/policies/privacy-policy';
import TermsPage from './pages/policies/terms';
import AGuideToNFTs from './pages/getting-started/a-guide-to-nfts';
import RecentlyAddedPage from './pages/recently-added';
import BlogPage from './pages/blog/single';
import BlogListPage from './pages/blog';
import CollectionPage from './pages/collection';

export default [
	{
	  path: "/",
	  title: "Explore",
	  component: Explore,
	  exact: true,
		nav: true
	},
	{
	  path: "/recently-added",
	  title: "Recently Added",
	  component: RecentlyAddedPage,
	  exact: true
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
	{
		path: "/profile-info",
		title: "Profile Info",
		component: ProfileInfo,
		exact: true
	},
	{
		path: "/privacy-policy",
		title: "Privacy Policy",
		component: PrivacyPolicy,
		exact: true
	},
	{
		path: "/terms",
		title: "Terms",
		component: TermsPage,
		exact: true
	},
	{
		path: "/collection/:id",
		title: "Collection",
		component: CollectionPage,
		exact: false
	},
	{
		path: "/blog",
		title: "Blog",
		component: BlogListPage,
		exact: true
	},
	{
		path: "/blog/:slug",
		title: "Blog",
		component: BlogPage,
		exact: false
	},

	// GETTING STARTED GUIDES
	{
		path: "/getting-started/a-guide-to-nfts",
		title: "A Guide To NFTs",
		component: AGuideToNFTs,
		exact: true
	},
];