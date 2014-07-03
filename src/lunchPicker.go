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

type TeamMember struct {
	Name 		string		`json:"name"`
	LastPicked	string		`json:"lastPicked"`
	HasPicked	bool		`json:"hasPicked"`
}

type getTeamMembersResponse struct {
	Result		string			`json:"result"`
	TeamMembers []TeamMember 	`json:"teamMembers"`
}

type addTeamMemberResponse struct {
	Result		string		`json:"result"`
}

func init() {
    http.HandleFunc("/loginHandler", loginHandler)
    http.HandleFunc("/addTeamMemberHandler", addTeamMemberHandler)
    http.HandleFunc("/getTeamMembersHandler", getTeamMembersHandler)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var response LoginResponse
	response.Result = "OK"

	c := appengine.NewContext(r)

	response.Author = getUserName(c)

	c.Infof("%s", response.Author)

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

	c.Infof(newMember.Name)
	key := datastore.NewKey(c, "TeamMember", newMember.Name, 0, nil)
	_, err = datastore.Put(c, key, &newMember)

	if err != nil {
		c.Infof("Failed to write to datastore", err)
		SendErrorResponse(w, "Failed to write to datastore", err)
		return
	}

	c.Infof("Successfully added user to the data store!")

	SendJSONResponse(w, response)
}

func getTeamMembersHandler(w http.ResponseWriter, r *http.Request) {
	var response getTeamMembersResponse
	var err error
	response.Result = "OK"

	c := appengine.NewContext(r)
	
	response.TeamMembers, err = getTeamMembers(c)

	if err != nil {
		c.Infof("Failed to query for all team members", err)
		SendErrorResponse(w, "Failed to query for all team members", err)
	}

	SendJSONResponse(w, response)
}

func getTeamMembers(c appengine.Context) ([]TeamMember, error) {
	var teamMembers []TeamMember
	q := datastore.NewQuery("TeamMember")

	_, err := q.GetAll(c, &teamMembers)

	if err != nil {
		return teamMembers, err
	}

	return teamMembers, nil
}


