import React from 'react';
import './App.css';
import { Home } from './containers';
import Header from './components/header';

interface InitialState {
  menu: any,
  activeItem: string
}

class App extends React.Component<any,InitialState> {
  constructor(props) {
    super(props);
    this.state = {
      menu: ['top', 'active'],
      activeItem: 'top'
    }

    this.menuItemClick = this.menuItemClick.bind(this);
  }

  menuItemClick(menuItem){
    this.setState({ activeItem : menuItem });
  }

  render() {
    const { menu, activeItem } = this.state;
    return (
      <div className="App" >
        <Header menu={menu} activeItem={activeItem} navClick={this.menuItemClick} />
        <Home />
      </div>
    );
  }
}

export default App;
