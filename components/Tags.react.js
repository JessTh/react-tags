/**
 * @jsx React.DOM
 */

/* Tag
*  ---------------
* Passes delete action on to parent component.
* Properties:
*  - value 		: tag text
*  - type     : tag class (optional)
*  - id				: tag id
*  - handler  : parent function for handling tag deletion
*/

var Tag = React.createClass({

  getDefaultProps: function() {
    return { type: 'info' };
  },

  render: function() {
    return (
      <span className={'tag '+ this.props.type}>
        {this.props.value}
        <span
          id				= {this.props.id}
          data-role	= 'remove'
          onClick		= {this.props.handler}
        ></span>
      </span>
    );
  },

});


/* TagHolder
*  ---------------
* Creates Tag objects from input strings or arrays.
* Enable addition/removal of tags.
* Properties:
*  - tags	   : Array of strings (tag texts) or Array of Arrays ['tag text', 'tag type']
*              type is one of bootstrap label classes (default, primary, success, info, waring, danger)
*  - type    : String (optional) default class for all tags, default is 'info'
*  - onEdit  : Function (optional) for updating data in parent component.
* State:
*  - tags    : tag object (internal representation), {value, type}
*  - input   : value for text input field, where new tags are added. default ''
*/

var TagHolder = React.createClass({

  getInitialState: function() {
    return {
      tags  : this.getTags(this.props.tags),
      input : '',
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({ tags: this.getTags(newProps.tags) });
  },

  render: function() {
    var tags    = this.state.tags;
    var handler = this._onRemove;
    if (tags.length > 0) {
      var tags = tags.map(function(t, i) {
        return <Tag value={t.value} type={t.type} handler={handler} id={i} key={i} />;
      });
    }

    return (
      <div
        className	= {'tagholder '+this.props.className}
        style			= {this.props.style}
        id 				= {this.props.id}
      >
        {tags}
        <input type	= 'text'
          className	= {this.props.className}
          onKeyDown	= {this._onKeyDown}
          onBlur 		= {this._addTag}
          onChange 	= {this._onChange}
          value			= {this.state.input} />
      </div>
    );
  },

  // on text input, update text to display:
  _onChange: function(event) {
    this.setState({ input: event.target.value});
  },

  _addTag: function(event) {
    var tags = this.state.tags;
    var newTag = {
      value : event.target.value,
      type  : this.props.type,
    };
    if (newTag.value) tags.push(newTag);
    this.setState({
      tags  : tags,
      input : '',
    });
    if (this.props.onEdit) {
      var parentEl = event.target.parentNode.parentNode;
      var values 	 = this.getValues(thi.state.tags);
      this.props.edit(parentEl, values);
    }
  },

  // on enter, add new tag
  _onKeyDown: function(event) {
    if (event.keyCode == 13) {
      this._addTag(event);
    }
  },

  _onRemove: function(event) {
    var tags = this.state.tags;
    tags.splice(event.target.id, 1);
    this.setState({ tags: tags });
    if (this.props.onEdit) {
      var parentEl  = event.target.parentNode.parentNode.parentNode;
      var values    = this.getValues(thi.state.tags);
      this.props.edit(parentEl, values);
    }
  },

  // get input values (from tags), for parent component after edits
  getValues: function(tags) {
    if (tags.length === 0) return [];
    return tags.map(function(f) {
      if (typeof(this.props.tags[0]) === 'string') {
        return t.value;
      } else {
        return [t.value, t.type];
      }
    });
  },

  // Get tags (from props.tags)
  getTags: function(values) {
    if (!values || values.length === 0) return [];
    return values.map(function(v, i) {
      if (typeof(v) === 'string') {
        return { value: v };
      } else {
        return { value: v[0], type: v[1] };
      }
    });
  },

});
