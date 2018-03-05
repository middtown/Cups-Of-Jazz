import React, { Component, Fragment } from 'react';
import { Input, Row, Button } from 'react-materialize';
import Header from './Header';
import Teas from './Teas';
import TeaForm from './TeaForm';
import initialTeas from '../initialTeas';
import base from '../base';

class App extends Component {

  state = {
    teas: {},
  };

  addTea = (tea) => {
    console.log('adding a tea');
    const teas = { ...this.state.teas };

    teas[`tea${Date.now()}`] = tea;

    this.setState({ teas });
  };

  componentDidMount() {
    console.log('component did mount');
    this.ref = base.syncState('teas', {
      context: this,
      state: 'teas',
    });
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSampleTeas = () => {
    this.setState({ teas: initialTeas });
  };

  render() {
    return (
      <Fragment>
      <Header tea={this.state.teas}/>
        <div className='container'>
          <h1> Teas </h1>
            <div className="section">
              {Object.keys(this.state.teas)
                .map(key => <Teas key={key} details={this.state.teas[key]} />)}
                <div className="divider"></div>
            </div>
        </div>
        <TeaForm addTea={this.addTea} tea={this.state.teas}/>
      <Button onClick={this.loadSampleTeas} className='btn-floating yellow darken-1'>
        <i className="material-icons">control_point</i></Button>
      </Fragment>
    );
  }
}

export default App;
