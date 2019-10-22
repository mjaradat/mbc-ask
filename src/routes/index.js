import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { AdminPage, AskPage, QuestionsView } from 'components';

const MainRoutes = (props) => {
    return (
        <main>
            <Switch>
                <Route path={`/admin`} render={(props) => (
                    <AdminPage {...props} />
                )} />

                <Route path={`/all-hands-questions`} render={(props) => (
                    <QuestionsView {...props} />
                )} />

                <Route path={`/`} render={(props) => (
                    <AskPage {...props} />
                )} />
            </Switch>
        </main >
    )
}


export default withRouter(MainRoutes);

