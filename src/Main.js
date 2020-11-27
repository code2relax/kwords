import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge'
import './App.css';


  class Main extends React.Component {
    

    constructor(props) {
        super(props);
        const list = props.location.list;
        const words = localStorage.getItem(list);
        this.state = {
            "current": 0,
            "words": JSON.parse(words),
            "pass": 0,
            "passp": 0,
            "fail": 0,
            "failp": 0,
            "badge": "success",
            "done": 0
        };
    
        // This binding is necessary to make `this` work in the callback
        this.right = this.right.bind(this);
        this.wrong = this.wrong.bind(this);
        this.retry = this.retry.bind(this);
      }

    right() {
        if (this.state.pass >= this.state.fail) {
            this.setState(state => ({
                badge: "success"
            }));
        }

        if (this.state.current >= this.state.words.length -1 ) {
            this.setState(state => ({
                done: 1
            }));
        } 
        this.setState(state => ({
            pass: state.pass + 1,
            passp: Math.ceil(((state.pass + 1)/state.words.length)*100),
            unread: ((state.words.length - 1 - (state.pass + state.fail))/state.words.length)*100,
            current: state.current + 1
        }));
        if (this.state.current+1 < this.state.words.length  ) {
            var msg = new SpeechSynthesisUtterance(this.state.words[this.state.current+1].word);
            window.speechSynthesis.speak(msg);  
        }
        
    }

    wrong() {
        
        if (this.state.fail > this.state.pass) {
            this.setState(state => ({
                badge: "danger"
            }));
        }

        if (this.state.current >= this.state.words.length -1 ) {
            this.setState(state => ({
                done: 1
            }));
        }
        this.setState(state => ({
            fail: state.fail + 1,
            failp: Math.ceil(((state.fail + 1)/state.words.length)*100),
            unread: ((state.words.length - (state.pass + state.fail))/state.words.length)*100,
            current: state.current + 1
        }));
        
        var msg = new SpeechSynthesisUtterance(this.state.words[this.state.current+1].word);
        window.speechSynthesis.speak(msg);  
    }

    retry() {
        
        this.setState(state => ({
            fail: 0,
            failp: 0,
            pass: 0,
            passp: 0,
            current: 0,
            done: 0
        }));
        this.setState(state => ({
            unread: ((state.words.length - (state.pass + state.fail))/state.words.length)*100,
        }));
        
        var msg = new SpeechSynthesisUtterance(this.state.words[0].word);
        window.speechSynthesis.speak(msg);  
        
       
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

        var msg = new SpeechSynthesisUtterance(this.state.words[this.state.current].word);
        window.speechSynthesis.speak(msg);  
    }
    render() {
        if (this.state.done) {
            // return <Redirect to="/stats" state={this.state}/>;
            return (
                <Card.Body className="text-center">
        
                      <ProgressBar  variant="success" now={this.state.passp} label={`${this.state.pass}`} key={1} />
                      <ProgressBar variant="danger" now={this.state.failp} label={`${this.state.fail}`} key={3} />
                    
            <Card.Title class="main-text">
                <Badge pill variant={this.state.badge}>
                    Score: {this.state.passp}%
                </Badge>{' '}
                </Card.Title>

                    <footer className="blockquote-footer">
                      <Nav className="justify-content-center">
                          <Nav.Item>
                              <Nav.Link onClick={this.retry}>
                             
                                      <Button variant="primary">Retry</Button>
                               
                              </Nav.Link>
                          </Nav.Item>
                          </Nav>
                  </footer>
               </Card.Body>
            )
        }
        return (
        <Card.Body className="text-center">
        <ProgressBar>
          <ProgressBar  variant="success" now={this.state.passp} label={`${this.state.pass}`} key={1} />
          <ProgressBar variant="danger" now={this.state.failp} label={`${this.state.fail}`} key={3} />
          <ProgressBar variant="warning" now={this.state.unread} key={this.state.unread} />
        </ProgressBar>
        
        <Card.Title class="main-text">{this.state.words[this.state.current].word}</Card.Title>

        <Nav className="justify-content-center">
          <Nav.Item  class="check-size">
              
                  <Nav.Link class="check-size" onClick={this.right}>
                  <span class="check-size" >
                  ✅
                  </span>
                  </Nav.Link>
         
          </Nav.Item>
          <Nav.Item>
          
                  <Nav.Link class="check-size" onClick={this.wrong}>
                  <span class="check-size" >
                  ❌
                  </span>
                  </Nav.Link>
          </Nav.Item>
      </Nav>
      <footer className="blockquote-footer">
         
      </footer>
</Card.Body>
        );
    }
  }
  
  export default Main;