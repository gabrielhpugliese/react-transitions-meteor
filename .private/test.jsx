
import React from 'react/addons';
import arrival from 'arrival';

let { TransitionGroup } = React.addons;

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
  componentWillLeave (done) {
    this.el = React.findDOMNode(this);

    // Before state applied immediately
    this.el.classList.add("content-leave-before");

    requestAnimationFrame(() => {
      this.el
        .classList.remove('content-leave-before');
      this.el
        .classList.add("content-leave");

      requestAnimationFrame(() => {
        this.el.classList.add("content-leave-active");
        arrival(this.el, done);
      });

    });
  }

  render () {
    return (
      <div>
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

class Profile extends React.Component {
  componentWillEnter (done) {
    debugger;
    this.el = React.findDOMNode(this);

    requestAnimationFrame(() => {
      this.el
        .classList.add("content-enter");

      requestAnimationFrame(() => {
        this.el.classList.add("content-enter-active");
        arrival(this.el, done);
      });

    });
  }

  componentWillLeave (done) {
    this.el = React.findDOMNode(this);


    requestAnimationFrame(() => {
      this.el
        .classList.add("content-leave");

      requestAnimationFrame(() => {
        this.el.classList.add("content-leave-active");
        arrival(this.el, done);
      });

    });
  }

  render () {
    return (
      <div>Profile here</div>
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
    var children = [<Home key="Home" />, <Profile key="Profile" />];

    if (this.props.content == 'Home') {
      children.pop();
    } else {
      children.shift();
    }

    return (
      <div>
        <Header />
        <TransitionGroup className="content">
          {children}
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

Meteor.startup(function () {
  Tracker.autorun(function () {
    React.render(<App content={FlowRouter.getRouteName()}></App>, document.body);
  });
});

FlowRouter.route('/', {
  name: 'Home'
});

FlowRouter.route('/profile', {
  name: 'Profile'
});



// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
