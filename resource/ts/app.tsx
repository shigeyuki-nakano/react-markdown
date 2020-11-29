import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Editor } from '@/pages/Editor';
import { History } from '@/pages/History';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { useStateWithStorage } from '@/hooks/useStateWithStorage';
import { Constants } from '@/Constants';

const { useState } = React;

const GlobalStyle = createGlobalStyle`
    body * {
        box-sizing: border-box;
    }
`

const Main: React.FC = () => {
    const [text, setText] = useStateWithStorage('', Constants.STORAGE_KEY);
    
    return (
        <>
            <GlobalStyle/>
            <Router>
                <Switch>
                    <Route exact path="/editor">
                        <Editor
                            text={text}
                            setText={setText}
                        />
                    </Route>
                    <Route exact path="/history">
                        <History
                            setText={setText}
                        />
                    </Route>
                    <Redirect to="/editor" path="*"/>
                </Switch>
            </Router>
        </>
    )
}

render(<Main/>, document.getElementById('app'));