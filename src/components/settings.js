import React, { Component } from 'react';
import {
  Panel,
  Button,
  Col,
  PageHeader,
  ControlLabel,
  FormControl,
  HelpBlock,
  FormGroup,
  Checkbox,
  Form,
  Radio,
  InputGroup,
  Glyphicon } from 'react-bootstrap';

import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';
import FormControlStatic from 'react-bootstrap/lib/FormControlStatic';
import InputGroupAddon from 'react-bootstrap/lib/InputGroupAddon';

import JobSettings from '../components/JobSettings';


import axios from 'axios';

import Loader from 'react-loader';
const title = 'Forms Test';

class Setting extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            hpsmForm: '',
            hpsmURL: 'http://10.4.50.192:13083/SM/7',
            hpsmUserName: '',
            hpsmUserPassword: '',
            hpsmUserAuthenticated: false,
            jiraURL: 'https://emaratech.atlassian.net',
            jiraUserName: '',
            jiraPassword: '',
            jiraUserAuthenticated: false,
            username: '',
            persons: [],
            hpsmUserObj: [],
            selectedTeam: "",
            validationError: "",
            hpsmLoader: true,
            jiraLoader: true,
            userAuthenticated: false
        };
    }


    handleChange(e) {
      e.preventDefault();
      this.setState({
          [e.target.name]: e.target.value
      });

      console.log("Fields : " + this.state.hpsmUserName)
    }

    doHPSMLogin = (e) => {
      e.preventDefault();
      console.log(this.state);

      this.setState( {hpsmLoader: false})

      const user = {
        name: this.state.hpsmUserName
      };

      /*axios.post('https://jsonplaceholder.typicode.com/users', { user })
          .then(res => {
            console.log(res);
            console.log(res.data);
          });*/


       // Passing req param directly -- axios.post('http://localhost:8080/sum/?hpsmUrl='+this.state.hpsmURL+'&hpsmUserName='+this.state.hpsmUserName+'&hpsmPassword='+this.state.hpsmUserPassword)
        // another method to pass data
        axios.post('http://localhost:8080/validatehpsm',
            {
                'hpsmUrl': this.state.hpsmURL,
                'hpsmUserName': this.state.hpsmUserName,
                'hpsmPassword': this.state.hpsmUserPassword
            }).then(response => {
              this.setState( {hpsmUserAuthenticated: response.data, hpsmLoader:true});
            console.log(response.data);
          }).catch(error => {
              alert(error);
      });

    }

    doJIRALogin = (e) => {
        e.preventDefault();
        this.setState( {jiraLoader: false});

        axios.post('http://localhost:8080/authenticatejira',
            {
                'jiraURL': this.state.jiraURL,
                'jiraUserName': this.state.jiraUserName,
                'jiraPassword': this.state.jiraPassword
            }).then(response => {
            this.setState( {jiraUserAuthenticated: response.data, jiraLoader:true, userAuthenticated:true});
            console.log(response.data);
        }).catch(error => {
            alert(error);
        });

    }

    loadData = (e)  => {
      e.preventDefault();
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState( {persons: res.data});
            });
    }

    handlePersonChange = event => {
      this.setState( {username: event.target.value} );
    }

    render() {
        return(
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <PageHeader>Setting</PageHeader>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">

                  <form onSubmit={this.loadData}>
                    <button type="submit">Load Data</button>
                  </form>

                  <Panel header={<span>Basic Form Elements</span>} >
                    <div className="row">
                      <div className="col-lg-6">

                        <Form>
                          <Panel bsStyle="primary">
                            <Panel.Heading>
                              <Panel.Title componentClass="h3">HPSM Login</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                              <FormGroup controlId="hpsmURLId">
                                <ControlLabel>URL</ControlLabel>
                                <FormControl type="text" name="hpsmURL" value={this.state.hpsmURL}
                                       onChange={ e => this.handleChange(e)} />
                                <FormControlFeedback />
                                <HelpBlock>HPSM server URL</HelpBlock>
                              </FormGroup>

                              <FormGroup controlId="hpsmUserNameId">
                                <ControlLabel>User Name</ControlLabel>
                                <FormControl
                                    name="hpsmUserName"
                                    type="text"
                                    placeholder="User Name"
                                    onChange={ e => this.handleChange(e)}
                                />
                                <FormControlFeedback />
                              </FormGroup>

                              <FormGroup controlId="hpsmPasswordId">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    name="hpsmUserPassword"
                                    type="password"
                                    placeholder="Password"
                                    onChange={ e => this.handleChange(e)}
                                />
                                <FormControlFeedback />
                              </FormGroup>

                              <select className="form-control" value={this.state.selectedTeam}
                                      onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>>
                                <option value="" >Select One</option>
                                  {
                                      this.state.persons.map(function(user) {
                                          return <option key={user._id}
                                                         value={user.name}>{user.name}</option>;
                                      })
                                  }
                              </select>

                              <div style={{color: 'red', marginTop: '5px'}}>
                                  {this.state.validationError}
                              </div>

                              <FormGroup controlId="formControlsDisabledButton">
                                <Button bsStyle="primary" type="submit" onClick={e => this.doHPSMLogin(e)} >Sign In</Button>
                              </FormGroup>

                              <div>
                                  <Loader loaded={this.state.hpsmLoader}>
                                      <b>{this.state.hpsmUserAuthenticated ? 'Login Success' : 'Login Failed'}</b>.
                                  </Loader>
                              </div>

                            </Panel.Body>
                          </Panel>
                        </Form>
                      </div>


                      <div className="col-lg-6">
                        <Form>
                          <Panel bsStyle="primary">
                            <Panel.Heading>
                              <Panel.Title componentClass="h3">JIRA Login</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                              <FormGroup controlId="jiraURLId">
                                <ControlLabel>URL</ControlLabel>
                                <FormControl type="text" name="jiraURL" value="https://emaratech.atlassian.net"/>
                                <FormControlFeedback />
                                <HelpBlock>JIRA server URL</HelpBlock>
                              </FormGroup>

                              <FormGroup controlId="jiraUserId">
                                <ControlLabel>User Name</ControlLabel>
                                <FormControl controlId="jiraUserNameId"
                                    type="text"
                                    name="jiraUserName"
                                    placeholder="User Name"
                                    onChange={this.handleChange}
                                />
                                <FormControlFeedback />
                              </FormGroup>

                              <FormGroup controlId="jiraPasswordId">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    name="jiraPassword"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                />
                                <FormControlFeedback />
                              </FormGroup>

                              <FormGroup controlId="formControlsDisabledButton">
                                  <Button bsStyle="primary" type="submit" onClick={e => this.doJIRALogin(e)}>Sign In</Button>
                              </FormGroup>

                              <div>
                                  <Loader loaded={this.state.jiraLoader}>
                                      <b>{this.state.jiraUserAuthenticated ? 'Login Success' : 'Login Failed'}</b>.
                                  </Loader>
                              </div>

                            </Panel.Body>
                          </Panel>
                        </Form>

                      </div>
                    </div>
                  </Panel>

                </div>
              </div>

              <div className="row">
                  <div className="col-lg-12">
                      <b>{this.state.userAuthenticated ? <JobSettings/> : ''}</b>.
                  </div>
              </div>

                <JobSettings/>
            </div> /* Main Div */
        )
    }
}

export default Setting;

