import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import AppUrls  from '../../AppSettings';
import { UserContext } from '../../context/user-context';

const appUrls = {
	fomoHost: AppUrls.fomoHost,
	fomoHostApi: AppUrls.fomoHostApi,
	fomoClient: AppUrls.fomoClient
};

export default function Wallet(props) {
	const [walletAddresses, setWalletAddresses] = useState([]);
	const userContext = useContext(UserContext);

	console.log(props);

	useEffect(() => {
		init();
	  }, []);
	
	function init(){
		getAllUserWalletAddresses();
	}

	const getAllUserWalletAddresses = () => {
		axios({
			method: "GET",
			url: `${appUrls.fomoHostApi}/api/services/app/Nft/GetMyWalletAddress`,
			headers: {
			"Authorization": "Bearer " +  props.accessToken + ""
			}
		  })
		  .then(function (response) {
			console.log(response)
			setWalletAddresses([response.data.result]);
		  })
		  .catch(function (response) {
			console.log(response);
		  });

		// axios({
		//   method: "GET",
		//   url: `${appUrls.fomoHostApi}/api/services/app/Wallets/GetAllWalletAddressForCurrentUser`,
		//   headers: {
		// 	"Authorization": "Bearer " + props.accessToken + ""
		//   }
		// })
		// .then(function (response) {
		// 	console.log(response);
		// 	if(response.data.result){
		// 	   setWalletAddresses(response.data.result.walletAddresses);
		// 	}
		// })
		// .catch(function (response) {
		//   console.log(response);
		// });
	}

	return (  
		<div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
			<div>
				<h3 className="text-lg leading-6 font-bold text-gray-900">Wallets</h3>
			</div>
			<div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
				<div className="pt-6 sm:pt-5">
					<div role="group" aria-labelledby="label-notifications">
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
							<div>
								<div
								className="text-base font-bold text-gray-900 sm:text-sm sm:text-gray-700"
								id="label-notifications"
								>
								Addresses
								</div>
							</div>
							<div className="sm:col-span-2">
								<div className="max-w-lg">
									<div className="mt-4 space-y-4">
										{walletAddresses && walletAddresses.length ? (
											walletAddresses.map((walletAddress, i) =>
												<div key={i}>
													<span>{walletAddress}</span>
													<br />
													<br />
												</div>
											)
										) : (
											<div>
												<p className="text-sm text-gray-600">No linked addresses</p>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
	);
	
	
}