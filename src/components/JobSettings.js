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


import axios from 'axios';

import Loader from 'react-loader';

class JobSettings extends Component {
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
            userAuthenticated: false,


            hpsmBusinessServices: [],
            jiraProjects: [],
            selectedHPSMProjectId: '',
            selectedJIRAProjectId: '',
            selectedProjectIndexToRemove: '',

            hpsmBusinessServices1: [
                {id: "Vision.Core", name: "Vision.Core"},
                {id: "Vision.BorderControl", name: "Vision.BorderControl"},
                {id: "FIS.Backend", name: "FIS.Backend"},
                {id: "LegacyeDNRD", name: "LegacyeDNRD"},
                {id: "VisioneDNRD", name: "VisioneDNRD"},
                {id: "VisioneDNRD.Portal", name: "VisioneDNRD.Portal"},
                {id: "VisioneDNRD.Portal.ETA", name: "VisioneDNRD.Portal.ETA"},
                {id: "LegacyeForm", name: "LegacyeForm"},
                {id: "LegacyeForm.Portal", name: "LegacyeForm.Portal"},
                {id: "VisioneForm.ChannelPartners.Registration", name: "VisioneForm.ChannelPartners.Registration"}
            ],
            jiraProjects1: [
                {id: "TVIS", name: "Vision"},
                {id: "VFIS", name: "FIS"},
                {id: "TARA", name: "ARA"},
                {id: "TGATES", name: "Gates"},
                {id: "TEDNRD", name: "eDNRD"},
                {id: "TNOQ", name: "Mobile"},
                {id: "TVIS", name: "Noqodi (Legacy)"},
                {id: "TEAP", name: "EAP"},
                {id: "TIQC", name: "IQC"},
                {id: "TNGE", name: "NGE"},
            ],
            selectedHpsmJiraProjectMappings: [],
            problemsToMigrate: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/hpsmProjects')
        .then(res => {
            this.setState( {hpsmBusinessServices: res.data});
        });

        axios.get('http://localhost:8080/jiraProjects')
        .then(res => {
            this.setState( {jiraProjects: res.data});
        });
    }


    handleChange(e) {
      e.preventDefault();
      this.setState({
          [e.target.name]: e.target.value
      });

      console.log("Fields : " + this.state.hpsmUserName)
    }

    addBusinessServiceMappings = ()  => {
        axios.get('http://localhost:8080/addBusinessMappings/?selectedHPSMProjectName='+this.state.selectedHPSMProjectId+'&selectedJIRAProjectName='+this.state.selectedJIRAProjectId)
        .then(response => {
            this.setState({selectedHpsmJiraProjectMappings: response.data});
        });
    };

    removeBusinessServiceMappings = ()  => {
        axios.post('http://localhost:8080/removeBusinessMappings/?selectedProjectIndexToRemove='+this.state.selectedProjectIndexToRemove)
        .then(response => {
            this.setState({selectedHpsmJiraProjectMappings: response.data});
        });
    };

    saveConfiguration = ()  => {
        axios.get('http://localhost:8080/saveConfiguration')
            .then(response => {
            //this.setState({selectedHpsmJiraProjectMappings: response.data});
        });
    };

    loadHPSMProblems = ()  => {
        axios.get('http://localhost:8080/loadHPSMProblems')
            .then(response => {
            this.setState({problemsToMigrate: response.data});
        });
    };


    render() {
        return(
            <div>
                <hr/>
              <div className="row">
                  <div className="col-lg-6">
                      <FormGroup controlId="formControlsSelect">
                          <ControlLabel>HPSM Services Type</ControlLabel>
                          <FormControl componentClass="select" placeholder="select">
                              <option value="1">Problem</option>
                              <option value="2">Change Request</option>
                          </FormControl>
                      </FormGroup>
                  </div>
                  <div className="col-lg-6">
                      <FormGroup controlId="formControlsSelect">
                          <ControlLabel>JIRA Type</ControlLabel>
                          <FormControl componentClass="select" placeholder="select">
                              <option value="1">Problem</option>
                              <option value="2">Story</option>
                          </FormControl>
                      </FormGroup>
                  </div>
              </div>

              <div className="row">
                  <div className="col-lg-6">
                      <FormGroup controlId="formControlsSelectMultiple">
                          <ControlLabel>HPSM Business Services</ControlLabel>
                          <FormControl componentClass="select" multiple placeholder="select"
                               onChange={(e) => this.setState({selectedHPSMProjectId: e.target.value})}>
                              {
                                  this.state.hpsmBusinessServices.map(function(hpsmProject) {
                                      return <option key={hpsmProject.projectId}
                                                     value={hpsmProject.projectName}>{hpsmProject.projectName}</option>;
                                  })
                              }
                          </FormControl>
                      </FormGroup>
                  </div>
                  <div className="col-lg-6">
                      <FormGroup controlId="formControlsSelect">
                          <ControlLabel>JIRA Projects</ControlLabel>
                          <FormControl componentClass="select" multiple placeholder="select"
                               onChange={(e) => this.setState({selectedJIRAProjectId: e.target.value})}>
                              {
                                  this.state.jiraProjects.map(function(jiraProject) {
                                      return <option key={jiraProject.projectId}
                                                     value={jiraProject.projectId}>{jiraProject.projectName}</option>;
                                  })
                              }
                          </FormControl>
                      </FormGroup>
                  </div>
              </div>

              <div className="row">
                  <div className="col-md-2 col-md-offset-5">
                      <FormGroup controlId="formControlsDisabledButton">
                          <Button type="submit" onClick={e => this.addBusinessServiceMappings(e)} >Add</Button>
                          <Button type="submit" onClick={e => this.removeBusinessServiceMappings(e)}>Remove</Button>
                      </FormGroup>
                  </div>
              </div>

              <div className="row">
                  {/*<div className="col-md-2 col-md-offset-5">*/}
                      <FormControl componentClass="select" multiple placeholder="select"
                      onChange={ (e) => this.setState({selectedProjectIndexToRemove: e.target.selectedIndex})}>
                          {
                              this.state.selectedHpsmJiraProjectMappings.map(function(selectedProject) {
                                  return <option key={selectedProject.projectId}
                                                 value={selectedProject.projectId}>{selectedProject.projectName}</option>;
                              })
                          }
                      </FormControl>
                  {/*</div>*/}
              </div>

                <div className="row" style={{marginTop : '15px'}}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Schedule Type</InputGroup.Addon>
                            <FormControl type="text" placeholder="Hourly"/>
                        </InputGroup>
                    </FormGroup>

                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <FormGroup controlId="saveConfiguration">
                            <Button type="submit" bsStyle="primary" onClick={e => this.loadHPSMProblems(e)}>Load HPSM Problem</Button>
                        </FormGroup>
                    </div>
                </div>



                <ul>
                    {this.state.problemsToMigrate.map(problem => (
                        <li key={problem.problemNo}>{problem.problemNo} {problem.problemDescription} {problem.problemAssignee} {problem.problemTitle}</li>
                    ))}
                </ul>

            </div> /* Main Div */
        )
    }
}

export default JobSettings;

