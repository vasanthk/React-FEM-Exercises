////////////////////////////////////////////////////////////////////////////////
// Exercise:
// - make these tabs work when you click them
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var assign = require('react/lib/Object.assign');

var DATA = [
    {name: 'USA', description: 'Land of the Free, Home of the brave'},
    {name: 'China', description: 'Lots of concrete'},
    {name: 'India', description: 'Cricket crazy'}
];

var styles = {};

// Camel case all style propery names
styles.tab = {
    display: 'inline-block',
    padding: 10,
    margin: 10,
    borderBottom: '4px solid',
    borderBottomColor: '#ccc',
    cursor: 'pointer'
};

// assign() is used to inherit styles from styles.tab
styles.activeTab = assign({}, styles.tab, {
    borderBottomColor: '#000'
});

styles.tabPanels = {
    padding: 10
};

var App = React.createClass({

    getInitialState() {
        return {
            activeTabIndex: 0
        };
    },

    handleTabClick (activeTabIndex) {
        // ES6
        this.setState({activeTabIndex});
        // This is the same as this.setState({activeTabindex: activeTabIndex});
    },

    renderTabs() {
        return this.props.countries.map((country, index) => {
            var style = this.state.activeTabIndex === index ? styles.activeTab : styles.tab;
            var clickHandler = this.handleTabClick.bind(this, index);

            // Anytime you call map() on some data and return some UI, drop a key on it.
            return (
                <div key={country.name} style={style} onClick={clickHandler}>
                    {country.name}
                </div>
            );
        });
    },

    renderPanel() {
        var country = this.props.countries[this.state.activeTabIndex];
        return (
            <div>
                <p>{country.description}</p>
            </div>
        );
    },


    render () {
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

React.render(<App countries={DATA}/>, document.body);

