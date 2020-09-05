import React from "react";
import "./AuthScreen.scss";

import { SignUpView } from "./SignUpView";
import { notification, Divider, Button, Result } from "antd";

import { GoogleIcon } from "../common/icons/GoogleIcon";
import { FacebookIcon } from "../common/icons/FacebookIcon";

interface AuthScreenProps {}

type UserInfo = {
  firstName?: string;
  lastName?: string;
  email: string;
};

//data that will be sent to signup api
export type UserInfoForm = UserInfo & {
  password: string;
};

// status of reqres.in API request
const API_STATUS = {
  IDLE: 0,
  LOADING: 1,
  RESOLVED: 2,
  REJECTED: 3,
};

export const AuthScreen: React.FC<AuthScreenProps> = React.forwardRef(
  (_, __) => {
    // holds state of auth, usually lives in redux
    const [authState, setAuthState] = React.useState({
      status: API_STATUS.IDLE,
      isLoggedIn: false,
      data: null,
    });
    const [userInput, setUserInput] = React.useState<UserInfo | null>(null);

    //Make api request to reqres.in on signup
    const onSignUpUserByForm = (user: UserInfoForm) => {
      const { firstName, lastName, email } = user;
      setAuthState({ ...authState, status: API_STATUS.LOADING });
      setUserInput({ firstName, lastName, email });
      fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json()) // parse json data
        .then((data) => {
          // If error show error in notification with message
          if (data.error) {
            setAuthState({
              isLoggedIn: false,
              status: API_STATUS.REJECTED,
              data: null,
            });
            notification["error"]({
              message: "Error",
              description: data.error,
            });
          } else {
            // if success store in state
            setAuthState({
              isLoggedIn: true,
              status: API_STATUS.RESOLVED,
              data,
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    // This will log out user and show sign up form again
    const onSignUpAgain = React.useCallback(() => {
      setAuthState({ isLoggedIn: false, status: API_STATUS.IDLE, data: null });

      setUserInput(null);
    }, []);

    return (
      <section id="authSection">
        <div id="authBox">
          {authState.isLoggedIn && (
            <SuccessView
              name={userInput?.firstName || ""}
              onSignUpAgain={onSignUpAgain}
            />
          )}
          {!authState.isLoggedIn && (
            <>
              <div className="text-center actionNameView">
                <span>SIGN UP</span>
              </div>
              {/* Labels on top */}
              <div className="text-center">
                <div className="heading">Create your account</div>
                <div className="subtitle">
                  {"Lorem ipsum dolor sit amet consectetur, adipisicing elit."}
                </div>
              </div>
              {/* Social login buttons */}
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
              <SignUpView
                onSignUp={onSignUpUserByForm}
                loading={authState.status === API_STATUS.LOADING}
              />
            </>
          )}
        </div>
      </section>
    );
  }
);

interface SuccessViewProps {
  name: string;
  onSignUpAgain(): void;
}

const SuccessView: React.FC<SuccessViewProps> = (props) => {
  return (
    <Result
      status="success"
      title="Successfully Signed up!"
      subTitle={`Welcome onboard, ${props.name}!`}
      extra={[
        <Button key="signup" onClick={props.onSignUpAgain}>
          Sign up Again
        </Button>,
      ]}
    />
  );
};
