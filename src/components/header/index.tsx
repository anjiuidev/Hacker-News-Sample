import React from 'react';
import logo from '../../logo.gif';

class Header extends React.Component<any, any> {
    render() {
        const { menu, activeItem, navClick } = this.props;
        const list = menu.map(item => (
            <li className={activeItem === item ? 'active': ''} onClick={() => navClick(item)} key={item} data-testid={item}>{item}</li>
        ))

        return (
            <header>
                <div id="logo"><img src={logo} alt="Logo" /></div>
                <ul className="menu">
                    {list}
                </ul>
            </header>
        )
    }
}

export default Header;