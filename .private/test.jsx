
import React from 'react';

class Header extends React.Component {
  render () {
    return (
      <header className="bar bar-nav">
        <a href="/" className="btn btn-link btn-nav pull-left">
          <span className="icon icon-left-nav"></span>
          Left
        </a>
        <button className="btn btn-link btn-nav pull-right">
          Right
          <span className="icon icon-right-nav"></span>
        </button>
        <h1 className="title">Title</h1>
      </header>
    );
  }
}

class Footer extends React.Component {
  render () {
    return (
      <nav className="bar bar-tab">
        <a className="tab-item active" href="#">
          <span className="icon icon-home"></span>
          <span className="tab-label">Home</span>
        </a>
        <a className="tab-item" href="#">
          <span className="icon icon-person"></span>
          <span className="tab-label">Profile</span>
        </a>
        <a className="tab-item" href="#">
          <span className="icon icon-star-filled"></span>
          <span className="tab-label">Favorites</span>
        </a>
        <a className="tab-item" href="#">
          <span className="icon icon-search"></span>
          <span className="tab-label">Search</span>
        </a>
        <a className="tab-item" href="#">
          <span className="icon icon-gear"></span>
          <span className="tab-label">Settings</span>
        </a>
      </nav>
    );
  }
}

class Home extends React.Component {
  render () {
    var className = 'content initial ' + this.props.className;
    return (
      <div className={className}>
        <ul className="table-view">
          <li className="table-view-cell media">
            <a className="navigate-right" href="/profile" data-transition="slide-in">
              <span className="media-object icon icon-pages pull-left"></span>
              <div className="media-body">
                All inboxes
              </div>
            </a>
          </li>
          <li className="table-view-cell media">
            <a className="navigate-right" href="inbox.html" data-transition="slide-in">
              <span className="media-object icon icon-person pull-left"></span>
              <div className="media-body">
                Personal email
              </div>
            </a>
          </li>
          <li className="table-view-cell media">
            <a className="navigate-right" href="inbox.html" data-transition="slide-in">
              <span className="media-object icon icon-star-filled pull-left"></span>
              <div className="media-body">
                Starred
              </div>
            </a>
          </li>
          <li className="table-view-cell media">
            <a className="navigate-right" href="inbox.html" data-transition="slide-in">
              <span className="media-object icon icon-trash pull-left"></span>
              <div className="media-body">
                Trash
              </div>
            </a>
          </li>
        </ul>

        <h5 className="content-padded">Other accounts</h5>
        <ul className="table-view">
          <li className="table-view-cell media">
            <a className="navigate-right" href="inbox.html" data-transition="slide-in">
              <span className="media-object icon icon-more pull-left"></span>
              <div className="media-body">
                Misc
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

class App extends React.Component {
  constructor () {
    super();
    this.state = {prevContent: 'Home'}
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.content === nextProps.content) {
      return;
    }

    this.setState({
      'prevContent': this.props.content
    });
  }

  render () {
    var child;
    var content;

    if (this.props.fade) {
      content = this.state.prevContent;
    } else {
      content = this.props.content;
    }

    if (content == 'Home') {
      child = Home;
    } else {
      child = Profile;
    }

    return (
      <div>
        <Header />
        {React.createElement(child, {className: this.props.fade})}
        <Footer />
      </div>
    );
  }
}

class Profile extends React.Component {

  render () {
    var className = 'content initial ' + this.props.className;
    return (
      <div className={className}>Profile here</div>
    );
  }
}

FlowRouter.route('/', {
  name: 'Home',
  action: function () {
    Session.set('fade', 'fade');
    Tracker.autorun(function () {
      React.render(<App content={FlowRouter.getRouteName()} fade={Session.get('fade')}></App>, document.body);
    });
  }
});

FlowRouter.route('/profile', {
  name: 'Profile',
  action: function () {
    Session.set('fade', 'fade');
    Tracker.autorun(function () {
      React.render(<App content={FlowRouter.getRouteName()} fade={Session.get('fade')}></App>, document.body);
    });
  }
});

Tracker.autorun(function () {
  FlowRouter.getRouteName();
  Meteor.setTimeout(function () {
    Session.set('fade', '');
  }, 250);
});
