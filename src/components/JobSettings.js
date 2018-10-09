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

            hpsmBusinessServices: [
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

            jiraProjects: [
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
            selectedHpsmJiraProjectMappings: [
                {id: "Vision-TVIS", name: "Vision [TVIS]"}
            ]
        };
    }


    handleChange(e) {
      e.preventDefault();
      this.setState({
          [e.target.name]: e.target.value
      });

      console.log("Fields : " + this.state.hpsmUserName)
    }



    render() {
        return(
            <div>
                <b>more configuration panel...</b>.
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
                          <FormControl componentClass="select" multiple placeholder="select">
                              {
                                  this.state.hpsmBusinessServices.map(function(jiraProject) {
                                      return <option key={jiraProject.id}
                                                     value={jiraProject.id}>{jiraProject.name}</option>;
                                  })
                              }
                          </FormControl>
                      </FormGroup>
                  </div>
                  <div className="col-lg-6">
                      <FormGroup controlId="formControlsSelect">
                          <ControlLabel>JIRA Projects</ControlLabel>
                          <FormControl componentClass="select" multiple placeholder="select">
                              {
                                  this.state.jiraProjects.map(function(jiraProject) {
                                      return <option key={jiraProject.id}
                                                     value={jiraProject.id}>{jiraProject.name}</option>;
                                  })
                              }
                          </FormControl>
                      </FormGroup>
                  </div>
              </div>

              <div className="row">
                  <div className="col-md-2 col-md-offset-5">
                      <FormGroup controlId="formControlsDisabledButton">
                          <Button type="submit" onClick={e => this.doHPSMLogin(e)} >Add</Button>
                          <Button type="submit" onClick={e => this.doHPSMLogin(e)}>Remove</Button>
                      </FormGroup>
                  </div>
              </div>

              <div className="row">
                  <div className="col-md-2 col-md-offset-5">
                      <FormControl componentClass="select" multiple placeholder="select">
                          {
                              this.state.selectedHpsmJiraProjectMappings.map(function(jiraProject) {
                                  return <option key={jiraProject.id}
                                                 value={jiraProject.id}>{jiraProject.name}</option>;
                              })
                          }
                      </FormControl>
                  </div>
              </div>

            </div> /* Main Div */
        )
    }
}

export default JobSettings;

