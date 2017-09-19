import React from 'react'
import { Route, Switch } from 'react-router'

import RoleAssign from 'web/components/game/RoleAssign'
import Menu from 'web/components/game/menu/index'
import FinalResult from 'web/components/game/summary/Final'
import TurnResult from 'web/components/game/summary/Turn'
import Security from 'web/components/utils/Security'

const GameRouter = ({ match }) => (
    <Security>
        <Switch>
            <Route exact path={`${match.url}/assignment`} component={RoleAssign} />
            <Route path={`${match.url}/menu`} component={Menu} />
            <Route path={`${match.url}/result/winner`} component={FinalResult} />
            <Route path={`${match.url}/result/round`} component={TurnResult} />
        </Switch>
    </Security>
)

export default GameRouter
