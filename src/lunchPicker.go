package lunchpicker

import (
    "net/http"
    "appengine"
    "appengine/datastore"
)

type LoginResponse struct {
	Result		string		`json:"result"`
	Author		string		`json:"author"`
}

// Team Member
type TeamMember struct {
	Name 		string		`json:"name"`
	Team 		string		`json:"team"`
	LastPicked	string		`json:"lastPicked"`
	HasPicked	bool		`json:"hasPicked"`
}

type addTeamMemberResponse struct {
	Result		string		`json:"result"`
	TeamMember 	TeamMember 	`json:"teamMember"`
}

type getTeamMembersResponse struct {
	Result		string			`json:"result"`
	TeamMembers []TeamMember 	`json:"teamMembers"`
	Team 		Team 			`json:"team"`
}

type updateTeamMemberResponse struct {
	Result		string		`json:"result"`
}

type removeTeamMemberResponse struct {
	Result		string		`json:"result"`
	TeamMember 	TeamMember 	`json:"teamMember"`
}

// Teams
type Team struct {
	Name 		string		`json:"name"`
}

type getTeamsResponse struct {
	Result		string		`json:"result"`
	Teams 		[]Team 		`json:"teams"`
}

type createTeamResponse struct {
	Result		string		`json:"result"`
	Team 		Team 		`json:"team"`
}

type removeTeamResponse struct {
	Result		string		`json:"result"`
	Team 		Team 		`json:"team"`
}

func init() {
    http.HandleFunc("/loginHandler", loginHandler)

    http.HandleFunc("/addTeamMemberHandler", addTeamMemberHandler)
    http.HandleFunc("/getTeamMembersHandler", getTeamMembersHandler)
    http.HandleFunc("/updateTeamMembersHandler", updateTeamMembersHandler)
    http.HandleFunc("/removeTeamMemberHandler", removeTeamMemberHandler)

    http.HandleFunc("/createTeamHandler", createTeamHandler)
    http.HandleFunc("/getTeamsHandler", getTeamsHandler)
    http.HandleFunc("/removeTeamHandler", removeTeamHandler)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var response LoginResponse
	response.Result = "OK"

	c := appengine.NewContext(r)

	response.Author = getUserName(c)

	// c.Infof("%s", response.Author)

	SendJSONResponse(w, response)
}

func addTeamMemberHandler(w http.ResponseWriter, r *http.Request) {
	var response addTeamMemberResponse
	var newMember TeamMember

	response.Result = "OK"

	c := appengine.NewContext(r)
	err := ParseJSONRequest(r, &newMember)
	
	if err != nil {
		c.Infof("Failed to parse JSON request", err)
		SendErrorResponse(w, "Failed to Parse JSON Request", err)
		return
	}

	key := datastore.NewKey(c, "TeamMember", newMember.Name, 0, nil)
	_, err = datastore.Put(c, key, &newMember)

	if err != nil {
		c.Infof("Failed to write to datastore", err)
		SendErrorResponse(w, "Failed to write to datastore", err)
		return
	}

	c.Infof("Successfully added user to the data store!")

	response.TeamMember = newMember

	SendJSONResponse(w, response)
}

func getTeamMembersHandler(w http.ResponseWriter, r *http.Request) {
	var response getTeamMembersResponse
	var err error
	var team Team

	response.Result = "OK"

	c := appengine.NewContext(r)
	err = ParseJSONRequest(r, &team)
	
	if err != nil {
		c.Infof("Failed to parse JSON request", err)
		SendErrorResponse(w, "Failed to Parse JSON Request", err)
		return
	}

	response.TeamMembers, err = getTeamMembers(c, team.Name)

	if err != nil {
		c.Infof("Failed to query for all team members", err)
		SendErrorResponse(w, "Failed to query for all team members", err)
	}

	response.Team = team

	SendJSONResponse(w, response)
}

func getTeamMembers(c appengine.Context, teamName string) ([]TeamMember, error) {
	var teamMembers []TeamMember

	q := datastore.NewQuery("TeamMember").Filter("Team =", teamName)

	_, err := q.GetAll(c, &teamMembers)

	if err != nil {
		return teamMembers, err
	}

	return teamMembers, nil
}

func updateTeamMembersHandler(w http.ResponseWriter, r *http.Request) {
	var response updateTeamMemberResponse
	response.Result = "OK"
	var oldMember []TeamMember
	var updatedMembers []TeamMember


	c := appengine.NewContext(r)
	err := ParseJSONRequest(r, &updatedMembers)

	if err != nil {
		c.Infof("Failed to parse JSON request", err)
		SendErrorResponse(w, "Failed to Parse JSON Request", err)
		return
	}

	for i := range updatedMembers {
		updatedMember := updatedMembers[i]
		q := datastore.NewQuery("TeamMember").Filter("Name =", updatedMember.Name)
		key, err := q.GetAll(c, &oldMember)

		_, err = datastore.Put(c, key[0], &updatedMember)


		if err != nil {
			c.Infof("Failed to update the team member", err)
			SendErrorResponse(w, "Failed to update the team member", err)
			return
		}
	}

	SendJSONResponse(w, response)
}

func removeTeamMemberHandler(w http.ResponseWriter, r *http.Request) {
	var response removeTeamMemberResponse
	response.Result = "OK"
	var removedMember TeamMember

	c := appengine.NewContext(r)
	err := ParseJSONRequest(r, &removedMember)

	if err != nil {
		c.Infof("Failed to parse JSON request", err)
		SendErrorResponse(w, "Failed to Parse JSON Request", err)
		return
	}

	key := datastore.NewKey(c, "TeamMember", removedMember.Name, 0, nil)
	err = datastore.Delete(c, key)

	if err != nil {
		c.Infof("Failed to delete user from the datastore")
		SendErrorResponse(w, "Failed to delete user from the datastore", err)
	}
	response.TeamMember = removedMember

	SendJSONResponse(w, response)
}

func createTeamHandler(w http.ResponseWriter, r *http.Request) {
	var response createTeamResponse
	response.Result = "OK"

	var newTeam Team

	c := appengine.NewContext(r)
	err := ParseJSONRequest(r, &newTeam)

	if err != nil {
		c.Infof("Failed to parse JSON request", err)
		SendErrorResponse(w, "Failed to Parse JSON Request", err)
		return
	}

	key := datastore.NewKey(c, "Team", newTeam.Name, 0, nil)
	_, err = datastore.Put(c, key, &newTeam)

	if err != nil {
		c.Infof("Failed to write to datastore", err)
		SendErrorResponse(w, "Failed to write to datastore", err)
		return
	}

	response.Team = newTeam

	SendJSONResponse(w, response)
}

func getTeamsHandler(w http.ResponseWriter, r *http.Request) {
	var response getTeamsResponse
	var err error
	response.Result = "OK"

	c := appengine.NewContext(r)

	response.Teams, err = getTeams(c)

	if err != nil {
		c.Infof("Failed to query for all teams", err)
		SendErrorResponse(w, "Failed to query for all teams", err)
	}

	SendJSONResponse(w, response)
}

func getTeams(c appengine.Context) ([]Team, error) {
	var teams []Team
	q := datastore.NewQuery("Team")

	_, err := q.GetAll(c, &teams)

	if err != nil {
		return teams, err
	}

	return teams, nil
}

func removeTeamHandler(w http.ResponseWriter, r *http.Request) {
	var response removeTeamResponse
	var removedTeam Team

	var teamMembers []TeamMember

	response.Result = "OK"

	c := appengine.NewContext(r)
	err := ParseJSONRequest(r, &removedTeam)

	if err != nil {
		c.Infof("Failed to parse JSON request", err)
		SendErrorResponse(w, "Failed to Parse JSON Request", err)
		return
	}

	key := datastore.NewKey(c, "Team", removedTeam.Name, 0, nil)
	err = datastore.Delete(c, key)

	if err != nil {
		c.Infof("Failed to delete team from the datastore")
		SendErrorResponse(w, "Failed to delete team from the datastore", err)
	}

	q := datastore.NewQuery("TeamMember").Filter("Team =", removedTeam.Name)
	keys, err := q.GetAll(c, &teamMembers)

	if err != nil {
		c.Infof("Failed to get team members from the datastore")
		SendErrorResponse(w, "Failed to get team members from the datastore", err)
	}

	err = datastore.DeleteMulti(c, keys)

	if err != nil {
		c.Infof("Failed to delete team members from the datastore")
		SendErrorResponse(w, "Failed to delete team members from the datastore", err)
	}

	response.Team = removedTeam

	SendJSONResponse(w, response)
}




