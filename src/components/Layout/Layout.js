import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Participate from '../Participate/Participate'
import Contestants from '../../containers/Contestants/Contestants'
import ParticipationForm from '../../containers/Static Participation Form/ParticipationForm'

const Layout =(props) =>{
    return(
        <div>
            <NavigationItems />
            <Switch>
                <Route path="/participation-form" component={ParticipationForm} />
                <Route path="/contestants" component={Contestants} />
                <Route to="/" exact component={Participate} />
            </Switch>
        </div>
    );
}

export default Layout;