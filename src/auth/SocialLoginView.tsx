import React from "react";
// import SocialLogin from "react-social-login";
import { Button } from "antd";
import { GoogleIcon } from "../common/icons/GoogleIcon";
import { FacebookIcon } from "../common/icons/FacebookIcon";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import { FacebookProvider, Login } from "react-facebook";
const FB_ID = "140998283196181";

interface SocialLoginBtnViewProps {
  name: string;
  Icon: React.ReactElement;
  onClick(): void;
  loading?: boolean;
}

const SocialLoginBtnView = ({
  name,
  Icon,
  ...props
}: SocialLoginBtnViewProps) => {
  return (
    <Button block {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {Icon}
        Sign up with {name}
      </div>
    </Button>
  );
};

export type SocialUser = {
  name: string;
  email: string;
};

interface SocialLoginViewProps {
  onSocialLogin(user: SocialUser): void;
}

export const SocialLoginView = ({ onSocialLogin }: SocialLoginViewProps) => {
  const handleSocialLogin = (user: any) => {
    // login only if we get user
    if (user.id) {
      const { name, email } = user;
      onSocialLogin({ name, email });
    }
  };

  return (
    <div className="socialView">
      <div className="socialView__btnView">
        <Button block>
          <div style={{ display: "flex", alignItems: "center" }}>
            <GoogleIcon />
            Sign up with Google
          </div>
        </Button>
      </div>
      <div className="socialView__btnView">
        <FacebookLogin
          appId={FB_ID}
          autoLoad
          callback={handleSocialLogin}
          fields="name,email"
          render={(renderProps: any) => (
            <SocialLoginBtnView
              onClick={() => {
                renderProps.onClick();
              }}
              name="Facebook"
              Icon={<FacebookIcon />}
              // loading={renderProps.isProcessing}
            />
          )}
        />
      </div>
    </div>
  );
};
