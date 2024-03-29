import React, { useEffect, useState } from 'react'
import ToDoList from './Components/ToDo/ToDoContainer'
import { BrowserRouter, Redirect, Route, Switch, withRouter, useLocation } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import './App.css'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd-mobile/dist/antd-mobile.css'
import store, { AppStateType } from './redux/store'
import { Layout, Spin, Result, Button } from 'antd'
import { compose } from 'redux'
import { initializeApp, addLocation } from './redux/appReducer'
import { credsType, login } from './redux/authReducer'
import Header from './Components/Header/HeaderContainer'
import { isMobile } from "react-device-detect"
import Login from './Components/Login/LoginContainer'
import Orders from './Components/Orders/OrdersContainer'
import TasksTree from './Components/TasksTree/TasksTreeContainer'
import Register from './Components/Register/RegisterContainer'
import Users from './Components/Users/UsersContainer'
import CurrentUser from './Components/Users/CurrentUser/CurrentUserContainer'
import Projects from './Components/Development/Projects/ProjectsContainer'
import CurrentProject from './Components/Development/Projects/CurrentProject/CurrentProjectContainer'
import English from './Components/English/EnglishContainer'
import ProvidersContainer from './Components/Providers/ProvidersContainer'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void,
    addLocation: (location: string) => void,
    login: (data: credsType) => void,
}

const App = (props: MapPropsType & DispatchPropsType) => {
    const [location, setLocation] = useState(useLocation().pathname)

    useEffect(() => {
        if (!props.initialized) {
            let instanseCreds = parseQueryString()
            if (instanseCreds.email && instanseCreds.password) {
                instanseCreds.remember = true
                props.login(instanseCreds)
            }

            if (location === '/front1/') {
                props.addLocation(location)
                setLocation(location)
            }
            props.initializeApp()
        }
    }, [props, location])


    if (!props.initialized) {
        return <Spin key="spin" size="large" />
    }

    return (
        <Layout>
            <Header />
            <Switch>
                {!props.isAuth ?
                    <Route exact path={props.appLocation}
                        render={() => <Redirect to={props.appLocation + 'login'} />} />
                    :
                    <Route exact path={props.appLocation}
                        render={() => <Redirect to={props.appLocation + 'toDoList'} />} />
                }

                {props.isAuth ?
                    <Route exact path={props.appLocation + 'login'}
                        render={() => <Redirect to={props.appLocation + 'toDoList'} />}
                    />
                    :
                    null
                }

                <Route path={props.appLocation + 'login'}
                    render={() => <Login />} />

                <Route path={props.appLocation + 'toDoList'}
                    render={() => <ToDoList />} />

                <Route path={props.appLocation + 'tasksTree'}
                    render={() => <TasksTree />} />

                <Route path={props.appLocation + 'orders'}
                    render={() => <Orders />} />

                <Route path={props.appLocation + 'providers'}
                    render={() => <ProvidersContainer />} />

                <Route path={props.appLocation + 'vocabulary'}
                    render={() => <English />} />

                <Route path={props.appLocation + 'register'}
                    render={() => <Register />} />

                <Route path={props.appLocation + 'users/:userId'}
                    component={props.userStatus === 'admin' || props.userStatus === 'superAdmin' ? CurrentUser : Page404} />

                <Route exact path={props.appLocation + 'users'}
                    component={props.userStatus === 'admin' || props.userStatus === 'superAdmin' ? Users : Page404} />

                <Route path={props.appLocation + 'projects/:userId'}
                    component={props.userStatus === 'admin' || props.userStatus === 'superAdmin' ? CurrentProject : Page404} />

                <Route exact path={props.appLocation + 'projects'}
                    component={props.userStatus === 'admin' || props.userStatus === 'superAdmin' ? Projects : Page404} />

                {/* <Route path={props.appLocation + '*'} component={Page404} /> */}
                <Route path={props.appLocation + '*'} component={English} />

            </Switch>
        </Layout>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    appLocation: state.app.location,
    isAuth: state.auth.isAuth,
    userStatus: state.auth.user?.status
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { initializeApp, addLocation, login }))(App)

const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className={isMobile ? "" : "container"}>
                    <AppContainer />
                </div>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp

const parseQueryString = (): any => {
    const params: any = {}
    document.location.search.substr(1).split('&').forEach((pair) => {
        const [key, value] = pair.split('=')
        params[key] = value
    })
    return params;
};

const Page404: React.FC<any> = (props) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}