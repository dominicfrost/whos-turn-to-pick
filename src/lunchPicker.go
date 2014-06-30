package lunchpicker

import (
    "net/http"
    "appengine"
)

type userData struct {
	Author	string		`json:"author"`
}


func init() {
    http.HandleFunc("/loginHandler", loginHandler)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var result userData
	c := appengine.NewContext(r)

	result.Author = getUserName(c)

	c.Infof("%s", result.Author)

	SendJSONResponse(w, result)
}
