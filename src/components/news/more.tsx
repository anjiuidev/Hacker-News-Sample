import React from 'react';

class More extends React.Component<any, any> {
    render() {
        const { moreClick, page } = this.props;

        return (
            <div className="load-more">
                <strong onClick={() => moreClick(false)} className={page > 0 ? '' : 'disabled'}>Previous</strong> | 
                <strong onClick={() => moreClick(true)}> Next</strong>
            </div>
        )
    }
}

export default More;