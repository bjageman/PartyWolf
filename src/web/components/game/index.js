import React from 'react'
import { Route, Switch } from 'react-router'

import RoleAssign from 'web/components/game/RoleAssign'
import Menu from 'web/components/game/menu/index'
import FinalSummary from 'web/components/game/summary/Final'
import Security from 'web/components/utils/Security'

const GameRouter = ({ match }) => (
    <Security>
        <Switch>
            <Route exact path={`${match.url}/assignment`} component={RoleAssign} />
            <Route path={`${match.url}/menu`} component={Menu} />
            <Route path={`${match.url}/result/winner`} component={FinalSummary} />
        </Switch>
    </Security>
)

export default GameRouter
