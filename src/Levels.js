import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router';

class Levels extends React.Component {


  constructor(props) {
    super(props);
    const lname = localStorage.getItem("wordlists") || "[]";
    if (lname == "[]") {
      localStorage.setItem("wordlists", JSON.stringify([]) );  
    }
    this.state = {
      lname: JSON.parse(lname),
      selected: undefined
    };
    this.selectList = this.selectList.bind(this);
  }

  selectList (list) {
    this.setState({
      selected: list
    });
  }

  componentDidMount () {
    const lname = localStorage.getItem("wordlists");
    if (lname == undefined) {
      localStorage.setItem("wordlists", JSON.stringify([]) );  
    }
  }

  render () {
    const items = [];
    
    for (const [index, value] of this.state.lname.entries()) {
      items.push(<ListGroup.Item  onClick={this.selectList.bind(this, value)} action>
          {value}
          </ListGroup.Item>
        )
    }
    if (this.state.selected) {
      return <Redirect to={{ pathname: "/main", list: this.state.selected }} />;
    }
    else
      return (
      <Card.Body>
              <ListGroup>
                {items}
              </ListGroup>
            </Card.Body>
    );
    
  }

}


export default Levels;
