var React = require('react');
var db = require('../db.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      subscriptions: this.props.subscriptions
    };
  },
  render: function() {
    // console.log(this.props.subscriptions[1].data);
    var list_of_subscriptions = this.state.subscriptions.map(function(subscription){
      return (
        <tr>
          <td>{subscription.id.toString()}</td>
          <td>{subscription.email}</td>
          <td>{subscription.subscribed.toString()}</td>
          <td>{JSON.stringify(subscription.createdAt)}</td>
          <td>{JSON.stringify(subscription.updatedAt)}</td>
        </tr>
      );
    });
    return (
      <html>
        <head>
          <title>menu_index</title>

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

        </head>
        <body>

          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Steakout Backoffice</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                  <li><a href="#">Link</a></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">One more separated link</a></li>
                    </ul>
                  </li>
                </ul>
                <form className="navbar-form navbar-left" role="search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                  </div>
                  <button type="submit" className="btn btn-default" onClick={this.handleButtonPress}>Submit</button>
                </form>
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#">Link</a></li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>


          <h3>Subscriptions</h3>

          <div className="container-fluid">
            <div className="row-fluid">
              <div className="form-group col-sm-4">
                <label>Query by ID:</label>
                <input type="text" className="form-control" id="usr"/>
              </div>
              <div className="form-group col-sm-4">
                <label>Query by Email:</label>
                <input type="text" className="form-control" id="usr"/>
              </div>
              <div className="form-group col-sm-4">
                <label>Query by Status:</label>
                <input type="text" className="form-control" id="usr"/>
              </div>
              <div className="form-group col-sm-12">
                <button style={{display: 'block', width: '100%'}} type="button" className="btn btn-primary" onSelect={function() {alert("left")}}>Search for Subscriptions</button>
              </div>

            </div>
          </div>

          <div className="container-fluid">
            <div className="row-fluid">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Subscription Date</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {list_of_subscriptions}
                </tbody>
              </table>
            </div>
          </div>



        </body>
      </html>
    );
  },
  subscriptionSubmitClick: function(event) {
    console.log('i was clicked');
  }
});
