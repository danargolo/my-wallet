import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class HandleStates extends Component {

  change = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  save(e) {
    const dispatch = this.props;
    console.log(dispatch, e);
    
  }
  render(){
    const {finance} = this.props
    console.log(finance);
    return (
      <button type="button" onClick={ () => this.handle.save(this.state) }>Adicionar Receita</button>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state.wallet,
});

HandleStates.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(HandleStates);
