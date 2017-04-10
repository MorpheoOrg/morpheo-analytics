/**
 * Created by guillaume on 3/16/17.
 */
import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'

import { LOCATION_CHANGE } from 'react-router-redux'

class ConnectedRouter extends Component {
    static propTypes = {
        store: PropTypes.object,
        history: PropTypes.object,
        children: PropTypes.node
    };

    static contextTypes = {
        store: PropTypes.object
    };

    state = {
        history: null,
        location: {
            key: null
        }
    };

    unlisten = null;

    componentDidMount() {
        this.handleProps(this.props);
        this.handleLocation(this.props.history.location)
    }

    componentDidUpdate() {
        this.handleProps(this.props)
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten()
        }
    }

    handleProps(props) {
        const { history } = props;
        if (history !== this.state.history) {
            if (this.unlisten) {
                this.unlisten()
            }
            this.setState({ history, location: history.location });
            this.unlisten = history.listen(this.handleLocation.bind(this))
        }
    }

    handleLocation(nextLocation) {
        const store = this.props.store || this.context.store;
        if (nextLocation.key !== this.state.location.key ||
            nextLocation.pathname !== this.state.location.pathname ||
            nextLocation.search !== this.state.location.search ||
            nextLocation.hash !== this.state.location.hash) {
            this.setState({
                location: nextLocation
            }, () => store.dispatch({
                type: LOCATION_CHANGE,
                payload: nextLocation
            }));
        }
    }

    render() {
        return <Router {...this.props}/>;
    }
}

export default ConnectedRouter
