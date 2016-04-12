/**
 * @jsx React.DOM
 */


var TestComponent = React.createClass({
  render: function() {
    return (
      <div style={{marginLeft: 30, width: 400}}>
        <h3>Tags - no input. Default tag type is 'default'</h3>
        <TagHolder tags={[]} type='default' />
        <h3>Tags - input strings</h3>
        <TagHolder tags={['tag1', 'tag2', 'tag3']} />
        <h3>Tags - input strings and types. Default type is 'default'</h3>
        <TagHolder tags  = {[['tag1', 'info'], ['tag2', 'warning'], ['tag3', 'danger'], ['tag4', 'success'], ['tag5', 'default']]}
        />
      </div>
    );
  }
});

React.renderComponent(
  <TestComponent />,
  document.getElementById('testdiv')
);
