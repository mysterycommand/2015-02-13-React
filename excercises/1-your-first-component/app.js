////////////////////////////////////////////////////////////////////////////////
// Excercise:
//
// Render `DATA` to the page
// - put the title in an h1
// - only render mexican food (hint: arrays have a "filter" method)
// - sort the items in alphabetical order by name
//   (might want to use `sort-by` https://github.com/staygrimm/sort-by#example)
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var sortBy = require('sort-by');

var DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'hush puppies', type: 'southern' }
  ]
};

var Menu = React.createClass({
  render: function render() {
    var items = this.props.items
        .filter(function(item) { return item.type === 'mexican'; })
        .sort(function(a, b) { return (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0); })
        .map(function(item, key) {
            return <li id={item.id} key={item.id} className={item.type}>{item.name}</li>;
        });

    return (
        <div>
            <h1>{this.props.title}</h1>
            <ul>{items}</ul>
        </div>
    );
  }
});

React.render(<Menu {...DATA}/>, document.body, function() {
  require('./tests').run();
});

