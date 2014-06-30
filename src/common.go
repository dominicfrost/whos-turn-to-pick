package lunchpicker

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "appengine/user"
    "appengine"
)

type ErrorResponse struct {
    Result string        `json:"result"`
    Message string       `json:"message"`
}

//Parse a JSON request and write the values into v.
func ParseJSONRequest(request *http.Request, v interface{}) error {
    body, err := ioutil.ReadAll(request.Body)
    if err != nil {
        return err
    }
    err = json.Unmarshal(body, v)
    if err != nil {
        return err
    }
    return nil
}

func SendJSONResponse(w http.ResponseWriter, response interface{}) {
    w.Header().Set("Content-Type", "application/json")

    var j []byte
    j, err := json.Marshal(response)
    if(err != nil){
        fmt.Fprintf(w, "{ \"result\": \"Failed to encode JSON response. %s\" }", err)
    } else {
        fmt.Fprint(w, string(j))
    }
}

func SendErrorResponse(w http.ResponseWriter, result string, err error) {
    var response ErrorResponse
    response.Result = result
    response.Message = err.Error()
    SendJSONResponse(w, response)
}

func getUserName(c appengine.Context) string {
    u := user.Current(c)
    if u == nil {
        return ""
    } else {
        return u.String()
    }
}

func init() {
    http.HandleFunc("/favicon.ico", faviconHandler)
}

func faviconHandler(w http.ResponseWriter, r *http.Request) {
    http.NotFound(w, r)
}