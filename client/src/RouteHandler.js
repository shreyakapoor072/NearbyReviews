import React, { Component } from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Chat from "./pages/chat/chat";
import  MapContainer from "./MapContainer";

export class RouteHandler extends Component {

	render() {
		return (
				<Switch>
                    <Route
                        exact
                        path="/"
                        component={MapContainer}
                    />
                    <Route
                        path="/Chat"
                        component={Chat}
                    />
                </Switch>
		)
	}
}