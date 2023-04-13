import React from 'react'
import {app} from '../config/firebaseConfig'
import Router from 'next/router'
import {onAuthStateChanged, getAuth} from 'firebase/auth'

const ProtectedRoute = (WrappedComponent) => {
    return class extends React.Component {
        componentDidMount() {
            const auth = getAuth(app);
            onAuthStateChanged(auth, (authUser) => {
                if (!authUser) {
                    Router.push('/') // redirect to login page if user is not authenticated
                }
            })
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default ProtectedRoute