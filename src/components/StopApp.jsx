var StopApp = React.createClass({
  displayName: 'StopApp',
  render: function() {
    // The second parameter is an object of attributes for the element (if any)
    return <div>
      Something something Dark Side
      </div>;
  }
});

ReactDOM.render(
  <StopApp />,
  document.getElementById('app')
);
