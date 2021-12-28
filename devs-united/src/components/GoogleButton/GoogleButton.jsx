import { GoogleLogin } from "react-google-login";
import "./GoogleButton.css"

export const GoogleButton = () => {

    const responseGoogle = (response) => {
        console.log(response.profileObj);
      };
    


  return (
    <GoogleLogin
      clientId="141550570435-721ct27r4e9u6ifl7heom8cm8dr4r4h9.apps.googleusercontent.com"
      render={(renderProps) => (
        <div className="button-cover">
          <div className="google-logo-cover">
            <img
              class="google-icon-svg"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <button
            className="google-button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign In with Google
          </button>
        </div>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
