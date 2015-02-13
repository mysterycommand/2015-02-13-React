////////////////////////////////////////////////////////////////////////////////
// Excercise:
// - make these tabs work when you click them
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var assign = require('react/lib/Object.assign');

var DATA = [
    { name: 'USA', description: 'Land of the free, home of the brave.' },
    { name: 'China', description: 'Lots of concrete.' },
    { name: 'Russia', description: 'World Cup 2018!' },
];

var App = React.createClass({
    getInitialState() {
        return {
            activeIndex: 0
        };
    },

    onClickTab(activeIndex) {
        this.setState({ activeIndex });
    },

    renderTabs() {
        return this.props.countries.map((country, index) => {
            return (
                <div
                    style={index === this.state.activeIndex ? styles.activeTab : styles.tab}
                    onClick={this.onClickTab.bind(this, index)}
                    key={index}
                >
                    {country.name}
                </div>
            );
        });
    },

    renderPanel() {
        var country = this.props.countries[this.state.activeIndex];
        return (
            <div>
                <p>{country.description}</p>
            </div>
        );
    },

    render() {
        return (
            <div style={styles.app}>
                <div style={styles.tabs}>
                    {this.renderTabs()}
                </div>
                <div style={styles.tabPanels}>
                    {this.renderPanel()}
                </div>
            </div>
        );

    }
});

var styles = {};

styles.tab = {
    display: 'inline-block',
    padding: 10,
    margin: 10,
    borderBottom: '4px solid',
    borderBottomColor: '#ccc',
    cursor: 'pointer'
};

styles.activeTab = assign({}, styles.tab, {
    borderBottomColor: '#000'
});

styles.tabPanels = {
    padding: 10
};

React.render(<App countries={DATA}/>, document.body);

