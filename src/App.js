import React from 'react';
import './style/custom-antd.css';
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { history } from "./Utils/history";
import { Router, Route, Switch } from "react-router-dom";
import Landing from "./Screens/Landing/Landing";
import FormulaResult from "./Screens/FormulaResult/FormulaResult";
import MedDetails from "./Screens/MedDetails/MedDetails";

export default class App extends React.Component {
  render() {
    console.error = () => {};
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path='/formula-result' component={FormulaResult}/>
              <Route path='/medicine-detail' component={MedDetails}/>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}