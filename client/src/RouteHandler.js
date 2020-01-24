import React, { Component } from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import Chat from "./pages/chat/chat";
import MapContainer from "./pages/map/MapContainer"
import Notification from "./pages/notification/notification";

export class RouteHandler extends Component {

	render() {
		return (
				<Switch>
                    <Route
                        exact
                        path="/Map"
                        component={MapContainer}
                    />
                    <Route
                        path="/Chat"
                        component={Chat}
                    />
                    <Route
                        path="/notification"
                        component={Notification}
                    />
                </Switch>
		)
	}
}