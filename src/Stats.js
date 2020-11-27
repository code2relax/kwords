import React from 'react';

import Card from 'react-bootstrap/Card';


import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

import Button from 'react-bootstrap/Button';
import './App.css';

const pass = 60;
const fail = 100 - pass;

class Stats extends React.Component {

  constructor(props) {
    super(props);
   
    console.log(props);
    // This binding is necessary to make `this` work in the callback
    // this.right = this.right.bind(this);
    // this.wrong = this.wrong.bind(this);
  }

  componentDidMount () {
    //  // const { handle } = this.props.match.params
  
    //   fetch(`https://api.twitter.com/user/${handle}`)
    //     .then((user) => {
    //       this.setState(() => ({ user }))
    //     })
        this.setState(state => ({
            unread: 100
        }));
    }
    render() {
      return (
        <Card.Body>

              {/* <ProgressBar  variant="success" now={this.state.passp} label={`${this.state.passp}%`} key={1} />
              <ProgressBar variant="danger" now={this.state.failp} label={`${fail}%`} key={3} />
             */}

            <footer className="blockquote-footer">
              <Nav className="justify-content-center">
                  <Nav.Item>
                      <Nav.Link>
                      <LinkContainer to="/main">
                              <Button variant="primary">Retry</Button>
                      </LinkContainer>    
                      </Nav.Link>
                  </Nav.Item>
                  </Nav>
          </footer>
       </Card.Body>

    );
    }
}
// const Stats = () => (
//               <Card.Body>
    
//                     <ProgressBar  variant="success" now={pass} label={`${pass}%`} key={1} />
//                     <ProgressBar variant="danger" now={fail} label={`${fail}%`} key={3} />
                  

//                   <footer className="blockquote-footer">
//                     <Nav className="justify-content-center">
//                         <Nav.Item>
//                             <Nav.Link>
//                             <LinkContainer to="/main">
//                                     <Button variant="primary">Retry</Button>
//                             </LinkContainer>    
//                             </Nav.Link>
//                         </Nav.Item>
//                         </Nav>
//                 </footer>
//              </Card.Body>
   
//   );
  
  export default Stats;