import Discover from './pages/discover'
import LiveDrop from './pages/live-drop'

export default [
	{
	  path: "/",
	  title: "Discover",
	  component: Discover,
	  exact: true,
	},
	{
	  path: "/live-drop",
		title: "Live Drop",
	  component: LiveDrop,
		exact: true,
	},
];