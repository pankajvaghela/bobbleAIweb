import React from "react";
import "./AuthScreen.scss";
import { GoogleLoginButton } from "react-social-login-buttons";
import { FacebookLoginButton } from "./social/SocialBtns";
import { SignUpView } from "./SignUpView";
import { Divider, Typography, Button } from "antd";

import { GoogleIcon } from "../common/icons/GoogleIcon";

import { FacebookIcon } from "../common/icons/FacebookIcon";

interface AuthScreenProps {}

export const AuthScreen: React.FC<AuthScreenProps> = React.forwardRef(
  (_, __) => {
    return (
      <section id="authSection">
        <div id="authBox">
          <div className="text-center actionNameView">
            <span>SIGN UP</span>
          </div>
          <div className="text-center">
            <div className="heading">Create your account</div>
            <div className="subtitle">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </div>
          </div>
          <div className="socialView">
            <div className="socialView__btnView">
              {/* <GoogleLoginButton /> */}
              <Button block>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <GoogleIcon />
                  Sign up with Google
                </div>
              </Button>
            </div>
            <div className="socialView__btnView">
              {/* <FacebookLoginButton /> */}
              <Button block>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FacebookIcon />
                  Sign up with Facebook
                </div>
              </Button>
            </div>
          </div>

          <Divider>
            <span className="dividerText">or</span>
          </Divider>
          <SignUpView />
        </div>
      </section>
    );
  }
);
