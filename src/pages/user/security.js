import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { UserContext } from '../../context/user-context';
import AppUrls  from '../../AppSettings';

const appUrls = {
    fomoHost: AppUrls.fomoHost,
    fomoHostApi: AppUrls.fomoHostApi,
    fomoClient: AppUrls.fomoClient
};

export default function Security() {
    const [accessToken, setAccessToken] = useState();
    const userContext = useContext(UserContext);
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [qrCodeSetupImageUrl, setQrCodeSetupImageUrl] = useState("");
    const [isGoogleAuthenticatorEnabled, setIsGoogleAuthenticatorEnabled] = useState(false);
    
    useEffect(() => {
        setAccessToken(userContext.state.accessToken);
    }, [userContext.state.accessToken]);
    
    useEffect(() => {
        if(accessToken){
            setHasLoggedIn(true);
            getCurrentUserProfileForEdit();
        }
    }, [accessToken]);

    useEffect(() => {
        //UI
        toggleGoogleAuthenticator();
        
        //process
        if(isToggled){
            getCurrentUserProfileForEdit();
        }
        else{
            if(isGoogleAuthenticatorEnabled){
                disableGoogleAuthenticator();
            }
        }
    }, [isToggled]);

    useEffect(() => {
        if(isToggled && 
            !isGoogleAuthenticatorEnabled){
             updateQrCodeSetupImageUrl();
         }
    });

    useEffect(() => {
         if(!isToggled && 
            isGoogleAuthenticatorEnabled){
                setIsToggled(true);
         }
    }, [isGoogleAuthenticatorEnabled]);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    }

    const getCurrentUserProfileForEdit = () => {
        console.log(accessToken);

        axios({
          method: "GET",
          url: `${appUrls.fomoHostApi}/api/services/app/Profile/GetCurrentUserProfileForEdit`,
          headers: {
            "Authorization": "Bearer " + accessToken + ""
          }
        })
        .then(function (response) {
            console.log(response);
            if(response.data.result){
                let userProfile = response.data.result;
                setIsGoogleAuthenticatorEnabled(userProfile.isGoogleAuthenticatorEnabled);
                setQrCodeSetupImageUrl(userProfile.qrCodeSetupImageUrl);
            }
        })
        .catch(function (response) {
          console.log(response);
        });
    }

    const updateQrCodeSetupImageUrl = () => {
        console.log(accessToken);

        axios({
          method: "PUT",
          url: `${appUrls.fomoHostApi}/api/services/app/Profile/UpdateGoogleAuthenticatorKey`,
          headers: {
            "Authorization": "Bearer " + accessToken + ""
          }
        })
        .then(function (response) {
            console.log(response);
            if(response.data.result.qrCodeSetupImageUrl){
                setIsGoogleAuthenticatorEnabled(true);
                setQrCodeSetupImageUrl(response.data.result.qrCodeSetupImageUrl);
            }
        })
        .catch(function (response) {
          console.log(response);
        });
    }

    const disableGoogleAuthenticator = () => {
        console.log(accessToken);

        axios({
          method: "POST",
          url: `${appUrls.fomoHostApi}/api/services/app/Profile/DisableGoogleAuthenticator`,
          headers: {
            "Authorization": "Bearer " + accessToken + ""
          }
        })
        .then(function (response) {
            console.log(response);
            if(response.data.success){
                setQrCodeSetupImageUrl("");
                setIsGoogleAuthenticatorEnabled(false);
            }
        })
        .catch(function (response) {
          console.log(response);
        });
    }

    const toggleGoogleAuthenticator = () => {
        var x = document.getElementById("toggleGoogleAuthenticatorOff");
        var y = document.getElementById("toggleGoogleAuthenticatorOn");
        
        //already toggled on
        if(isToggled &&
           x.style.display === "none" && 
           y.style.display != "none") {
               return;
        }

        //already toggled off
        if(!isToggled &&
            y.style.display === "none" && 
            x.style.display != "none") {
                return;
         }

        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
        
        if (y.style.display === "none") {
          y.style.display = "block";
        } else {
          y.style.display = "none";
        }
    }

    const toggleOffContainerStyle = {
        cursor: "pointer"
    };

    const toggleOnContainerStyle = {
        display: "none",
        cursor: "pointer"
    };

    const toggleOnButtonStyle = {
        backgroundColor: "rgba(29, 78, 216)"
    };

    return (  
        <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
                <h3 className="text-lg leading-6 font-bold text-gray-900">Security</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Additional layer of security for your account
                </p>
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
                        Google Authenticator
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="max-w-lg">
                        <div className="mt-4 space-y-4">
                            <div 
                                id="toggleGoogleAuthenticatorOff" 
                                className="m-6" 
                                onClick={handleToggle} 
                                style={toggleOffContainerStyle}>
                                
                                <div className="w-12 h-6 rounded-full flex items-center my-1 bg-gray-300">
                                    <div className="absolute w-4 h-4 ml-1 rounded-full bg-white"></div>
                                </div>
                            </div>

                            <div 
                                id="toggleGoogleAuthenticatorOn" 
                                className="m-6" 
                                onClick={handleToggle} 
                                style={toggleOnContainerStyle}>

                                <div 
                                    className="w-12 h-6 rounded-full flex items-center my-1" 
                                    style={toggleOnButtonStyle}>

                                    <div className="w-4 h-4 ml-auto mr-1 rounded-full bg-white"></div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            { isGoogleAuthenticatorEnabled ? (
                <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5" >
                    <div>
                        <h3 className="text-lg leading-6 font-bold text-gray-900">Google Authenticator</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Scan this QR code with your mobile app
                        </p>
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
                                        
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="max-w-lg">
                                            <div className="mt-4 space-y-4">
                                                <div class="text-center">
                                                    <img src={qrCodeSetupImageUrl} />
                                                </div>
                                                <div className="mt-4 space-y-4">
                                                    Not sure what this screen means? You may need to check this:  <a href="https://support.google.com/accounts/answer/1066447" 
                                                       target="_blank" 
                                                       rel="noopener noreferrer"
                                                       className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Google Authenticator</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null 
            }
        </div>
        
        
    );
    
    
}