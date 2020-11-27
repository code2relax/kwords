import React from 'react';

import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tabletop from 'tabletop';
import ListGroup from 'react-bootstrap/ListGroup';
import { Redirect } from 'react-router';

class Download extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: "fill",
      data: [{"word": "one"},{"word":"two"}]
    };
    // This binding is necessary to make `this` work in the callback
    this.onChange = this.onChange.bind(this);
    this.download = this.download.bind(this);
    this.save = this.save.bind(this);
  }

  onChange (e) {
    
    console.log(e.target.name+": "+e.target.value);
    this.setState({ [e.target.name]: e.target.value });
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

    download () {
      //  // const { handle } = this.props.match.params
    
      //   fetch(`https://api.twitter.com/user/${handle}`)
      //     .then((user) => {
      //       this.setState(() => ({ user }))
      //     })
    
      Tabletop.init({
        key: this.state.url,//'https://docs.google.com/spreadsheets/d/1bclciJRaAnyBU4PduWsAB2qgBEYlmf0SEATnE-i9vsQ/edit?usp=sharing',
        callback: googleData => {
          
          this.setState({
            data: googleData,
            stage: "save"
          });
          console.log('google sheet data --->', googleData);

        },
        simpleSheet: true,
        wanted: [this.state.sheetName]
      })
      }

      save () {
        const lname = JSON.parse(localStorage.getItem("wordlists"));
        lname[lname.length] = this.state.listName; 
        localStorage.setItem("wordlists", JSON.stringify(lname) );
        localStorage.setItem(this.state.listName, JSON.stringify(this.state.data));
        this.setState({
          stage: "done"
        });
      }

    render() {
      const items = [];
      for (const [index, value] of this.state.data.entries()) {
        items.push(<ListGroup.Item>{value.word}</ListGroup.Item>)
      }
      if (this.state.stage === "fill") {
        return (
          <Card.Body>
              <Form>
                <Form.Group controlId="formSheetUrl">
                  <Form.Label>Google Sheet Link</Form.Label>
                  <Form.Control type="email" placeholder="Enter google file link" name="url" onChange={this.onChange.bind(this)} />
                  <Form.Text className="text-muted">
                  Create a Google sheet with words, share it and paste that link here.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formSheetName">
                  <Form.Label>Sheet Tab Name</Form.Label>
                  <Form.Control type="text" placeholder="Name of your tab in Google sheet" name="sheetName" onChange={this.onChange.bind(this)}  />
                  <Form.Text className="text-muted">
                  Leave it blank if you have only one tab in your sheet.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formListName">
                  <Form.Label>Name of the List on App</Form.Label>
                  <Form.Control type="text" placeholder="Name this list of words" name="listName" onChange={this.onChange.bind(this)} />
                  <Form.Text className="text-muted">
                  Leave it blank if you want to call it with same name as sheet tab name.
                  </Form.Text>
                </Form.Group>
                

                <Button variant="primary" onClick={this.download}>
                  Download
                </Button>
              </Form>
     
        </Card.Body>

      );
      }
      else if (this.state.stage === "save") {
          return (

            <ListGroup>
                  {items}
                
                <Button variant="primary" onClick={this.save}>
                  Save
                </Button>
                </ListGroup>
          );
      } else {
        const list = this.state.listName
        if (!list)
        this.setState(state => ({
          listName: this.state.sheetName
        }));
        return <Redirect to={{ pathname: "/main", list: this.state.listName }} />;
      }
    }
}

  export default Download;