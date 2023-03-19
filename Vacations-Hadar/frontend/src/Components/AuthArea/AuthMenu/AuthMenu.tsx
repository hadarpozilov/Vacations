import { Button } from "@mui/material";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    private unsubscribeMe: Unsubscribe;

    public componentDidMount() {

        this.setState({ user: store.getState().authState.user });

        this.unsubscribeMe = store.subscribe(() => {
            const user = store.getState().authState.user;
            this.setState({ user });
        });

    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">
                {!this.state?.user &&
                    <>
                        <span>Hello Guest</span>
                        <NavLink to="/login">
                            <Button variant="contained" color="inherit">
                                Sign In
                            </Button>
                        </NavLink>

                    </>
                }
                {this.state?.user &&
                    <>
                        <span>Hello {this.state.user.firstName}</span>
                        <NavLink to="/logout">
                            <Button variant="contained" color="error">
                                Logout
                            </Button>
                        </NavLink>
                    </>
                }

            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }
}

export default AuthMenu;
