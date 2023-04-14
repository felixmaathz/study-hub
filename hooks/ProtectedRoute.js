import React from 'react';
import { app } from '../config/firebaseConfig';
import Router from 'next/router';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Loading from '../components/Loading';

const ProtectedRoute = (WrappedComponent) => {
    return class extends React.Component {
        state = {
            loading: true,
        };

        componentDidMount() {
            const auth = getAuth(app);
            onAuthStateChanged(auth, (authUser) => {
                if (!authUser) {
                    Router.push('/'); // redirect to login page if user is not authenticated
                }
                this.setState({ loading: false }); // authentication state has been checked
            });
        }

        render() {
            const { loading } = this.state;
            if (loading) {
                return <Loading/>; // render loading page
            }else{
                return <WrappedComponent {...this.props} />; // render the component
            }
        }
    };
};

export default ProtectedRoute;