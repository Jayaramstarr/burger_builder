import React, { useEffect } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const app = props => {

  const { onTryAutoSignup } = props

  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    )

    if(props.isAuthenticated)
     routes = (
        <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" exact component={Orders}/>
            <Route path='/logout' exact component={Logout}/>
            <Route path="/auth" exact component={Auth}/>
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/"/>
        </Switch>
     ) 

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
        
      </div>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToprops = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToprops)(app))
