
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

Session.setDefault('finished', false);

class TransitionContent extends React.Component {
  componentWillEnter (done) {
    this.el = React.findDOMNode(this);

    this.el.classList.add('content-enter-before');
    requestAnimationFrame(() => {
      this.el.classList.remove('content-enter-before');
      this.el.classList.add("content-enter");

      requestAnimationFrame(() => {
        this.el.classList.add("content-enter-active");
        function done2 () {
          done();
          Session.set('finished', true);
          console.log('setting finished true')
        }
        arrival(this.el, done2);
      });

    });
  }

  componentDidLeave () {
    this.el.classList.remove('content-leave-before');
    this.el.classList.remove('content-leave');
  }

  componentWillLeave (done) {
    this.el = React.findDOMNode(this);

    this.el.classList.remove('content-enter');
    this.el.classList.remove('content-enter-active');
    Tracker.autorun((c) => {
      console.log('autorunning finished', Session.get('finished'))
      if (Session.equals('finished', true)) {
        this.el.classList.add('content-leave-before');
        requestAnimationFrame(() => {
          this.el.classList.remove('content-leave-before');
          this.el.classList.add("content-leave");

          requestAnimationFrame(() => {
            this.el.classList.add("content-leave-active");
            function done2 () {
              done()
              Session.set('finished', false);
              c.stop();
            }
            arrival(this.el, done2);

          });
        });

      }
    });
  }
}

class Home extends TransitionContent {

  render () {
    return (
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
            <a className="navigate-right" href="/profile" data-transition="slide-in">
              <span className="media-object icon icon-pages pull-left"></span>
              <div className="media-body">
                All inboxes
              </div>
            </a>
          </li>
          <li className="table-view-cell media">
            <a className="navigate-right" href="/profile" data-transition="slide-in">
              <span className="media-object icon icon-pages pull-left"></span>
              <div className="media-body">
                All inboxes
              </div>
            </a>
          </li>
          <li className="table-view-cell media">
            <a className="navigate-right" href="/profile" data-transition="slide-in">
              <span className="media-object icon icon-pages pull-left"></span>
              <div className="media-body">
                All inboxes
              </div>
            </a>
          </li>
        </ul>
    );
  }
}

class Profile extends TransitionContent {

  render () {
    return (
      <ul className="table-view">
        <li className="table-view-cell media">
          <a className="navigate-right" href="/" data-transition="slide-in">
            <span className="media-object icon icon-person pull-left"></span>
            <div className="media-body">
              Personal email
            </div>
          </a>
        </li>
        <li className="table-view-cell media">
          <a className="navigate-right" href="/" data-transition="slide-in">
            <span className="media-object icon icon-person pull-left"></span>
            <div className="media-body">
              Personal email
            </div>
          </a>
        </li>
        <li className="table-view-cell media">
          <a className="navigate-right" href="/" data-transition="slide-in">
            <span className="media-object icon icon-person pull-left"></span>
            <div className="media-body">
              Personal email
            </div>
          </a>
        </li>
        <li className="table-view-cell media">
          <a className="navigate-right" href="/" data-transition="slide-in">
            <span className="media-object icon icon-person pull-left"></span>
            <div className="media-body">
              Personal email
            </div>
          </a>
        </li>
      </ul>
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
