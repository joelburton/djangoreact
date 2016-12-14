function Cat(props) {
    return ( <div><b>{ props.name }</b> <i>({ props.iq })</i></div> );
};


var CatsTable = React.createClass({

    getInitialState: function () {
        return {
            cats: [],   // list of cats from API calls
            cat: null,  // currently selected cat data
        };
    },

    componentWillMount: function () {
        // get data about all cats from server

        fetch("/api/cats/")
            .then(r => r.json())
            .then(j => this.setState({cats: j}))
    },

    render: function () {
        var detail;
        var cats = this.state.cats;

        if (this.state.cat) {
            detail = <Cat name={this.state.cat.name} iq={this.state.cat.iq}/>;
        }

        return (
            <div>
                <ul>
                    {cats.map((cat, idx) =>
                        <li key={idx}
                            onClick={e => this.setState({cat: cats[idx]})}
                        >{cat.name }</li>
                    )}
                </ul>
                { detail }
            </div>
        );
    }
});


ReactDOM.render(
    <CatsTable />,
    document.getElementById("root")
);