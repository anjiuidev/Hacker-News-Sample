import React from 'react';

class More extends React.Component<any, any> {
    render() {
        const { moreClick } = this.props;

        return (
            <div className="load-more">
                <strong onClick={moreClick}>More</strong>
            </div>
        )
    }
}

export default More;