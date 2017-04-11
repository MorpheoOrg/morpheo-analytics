/**
 * Created by guillaume on 7/11/16.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from '../../actions';
import trialActions from '../../../trial/actions';
import algoActions from '../../../algo/actions';
import learnupletActions from '../../../learnuplet/actions';
import {getItemError, getQuery, getTrials, getAlgos} from '../../selector';

import Top from './top';
import Tabs from './tabs';

import CreateModalHOC from '../../../../../components/hoc/createModal';
import AlgoForm from '../../../algo/form/algo';

const CreateAlgoForm = CreateModalHOC(AlgoForm);

class Detail extends React.PureComponent {

    constructor(props) {
        super(props);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        if (!this.props.loading.experiment && this.props.id && !this.props.item) {
            this.props.loadItem(this.props.id);
        }
        else if (this.props.id) {
            // set current item in store
            this.props.setItem(this.props.id);
        }
    }

    onConfirm(formValue) {
        const parameters = formValue.parameters.split(',')
            .map(m => m.replace(/\s+/g, ''))
            .filter(m => m !== '');

        this.props.createAlgo({
            name: formValue.name,
            parameters,
            experiment: this.props.id,
        });
    }

    onCancel() {
        this.props.setCreateModalAlgo(false);
    }

    render() {
        const {item, id, algo, setCreateModalAlgo} = this.props;

        return item ? (
            <div>
                <CreateAlgoForm
                    isVisible={algo.modal.create}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                />
                <Top item={item} id={id} setCreateModalAlgo={setCreateModalAlgo}/>
                <Tabs {...this.props} />
            </div>
        ) : null;
    }
}

Detail.propTypes = {
    query: PropTypes.shape({
        update: PropTypes.string,
    }),
    item: PropTypes.shape({}),
    loading: PropTypes.shape({}).isRequired,
};

Detail.defaultProps = {
    item: null,
    query: null,
};

function mapStateToProps(s, ownProps) {
    const state = s.models.experiment;

    const id = ownProps.match.params.id || state.item.id,
        item = id ? state.item.results[id] : null;

    return {
        user: s.user,
        algo: s.models.algo,
        modal: state.modal,
        filters: state.filters,
        error: getItemError(state),
        item,
        trials: getTrials(s),
        algos: getAlgos(s),
        learnuplet: s.models.learnuplet,
        loading: {
            experiment: state.item.loading,
            algo: s.models.algo.item.loading,
            trial: s.models.trial.item.loading,
        },
        id,
        query: getQuery(ownProps),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setItem: actions.item.set,
        loadItem: actions.item.get.request,
        deleteExperiment: actions.item.delete.request,
        setIsExpanded: trialActions.item.isExpanded.set,

        loadTrials: trialActions.item.get.request,
        deleteTrial: trialActions.item.delete.request,

        loadLearnuplet: learnupletActions.list.request,

        createAlgo: algoActions.item.create.request,
        postAlgo: algoActions.item.post.request,
        deleteAlgo: algoActions.item.delete.request,
        setCreateModalAlgo: algoActions.modal.create.set,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

