import React from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends React.Component<any, any> {
    constructor(props) {
        super(props);
        console.log(props);


        const { ids, votes } = this.getlabelsData();
        this.state = {
            graphData: {
                labels: ids,
                datasets: [
                    {
                        label: '',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: '#056cb5',
                        borderWidth: 2,
                        data: votes
                    }
                ]
            }
        }
    }

    getlabelsData = () => {
        const { data } = this.props;
        const ids: any = [], votes: any = [];
        data && data.forEach(item => {
            const { objectID, points } = item;
            ids.push(objectID);
            votes.push(points ? points : 0);
        });
        return { ids, votes };
    }

    updateState = () => {
        const { ids, votes } = this.getlabelsData();
        const graphData = { ...this.state.graphData };
        graphData.labels = ids;
        graphData.datasets[0].data = votes;
        this.setState({ graphData })
    }

    componentDidUpdate(prevProps) {
        if ((JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data))) {
            this.updateState();
        }
    }

    render() {
        const options = {
            legend: {
                display: false,
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Votes',
                    },
                    ticks: {
                        min: 0,
                        maxTicksLimit: 5
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'ID'
                    }
                }]
            }
        }

        return (
            <div className="chart">
                <Line
                    data={this.state.graphData}
                    options={options}
                />
            </div>
        )
    }
}

export default Chart;