import React, { Component } from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Chat from "./pages/chat/chat";

export class RouteHandler extends Component {

	render() {
		return (
				<Switch>
                    <Route
                        exact
                        path="/Map"
                        // component={}
                    />
                    <Route
                        path="/Chat"
                        component={Chat}
                    />
                </Switch>
		)
	}
}