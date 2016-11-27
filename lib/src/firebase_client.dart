part of picker_core;

class FirebaseClient {
  firebase.GoogleAuthProvider _fbGoogleAuthProvider;
  firebase.Auth _fbAuth;
  firebase.Database _fbDatabase;

  firebase.DatabaseReference _fbGroups;
  firebase.DatabaseReference get fbGroups => _fbGroups;

  firebase.DatabaseReference _fbGroupItems;
  firebase.DatabaseReference get fbGroupItems => _fbGroupItems;

  firebase.User user;

  FirebaseClient() {
    firebase.initializeApp(
        apiKey: "AIzaSyCH4P6kWIjafR7in1lHL3fi2a3hby2OodI",
        authDomain: "lunch-picker-7d65b.firebaseapp.com",
        databaseURL: "https://lunch-picker-7d65b.firebaseio.com",
        storageBucket: "lunch-picker-7d65b.appspot.com"
        // messagingSenderId: "311466877980"
        );

    _fbGoogleAuthProvider = new firebase.GoogleAuthProvider();
    _fbAuth = firebase.auth();

    _fbAuth.onAuthStateChanged.listen(_authChanged);

    _fbDatabase = firebase.database();

    _fbGroups = _fbDatabase.ref('groups');
    _fbGroupItems = _fbDatabase.ref('groupItems');
  }

  void _authChanged(firebase.AuthEvent event) {
    user = event.user;
  }

  Future signIn() async {
    try {
      await _fbAuth.signInWithPopup(_fbGoogleAuthProvider);
    } catch (error) {
      print("$runtimeType::signIn() -- $error");
    }
  }

  void signOut() {
    _fbAuth.signOut();
  }

  Future createGroup(Group group) async {
    try {
      await _fbGroups.push(group.toJson());
    } catch (error) {
      print("$runtimeType::createGroup() -- $error");
    }
  }

  // TODO: remove group
  Future removeGroup(Group group) async {
    try {
      // await _fbGroups.push(group.toJson());
    } catch (error) {
      print("$runtimeType::createGroup() -- $error");
    }
  }

  Future createGroupItem(GroupItem groupItem) async {
    try {
      await _fbGroupItems.push(groupItem.toJson());
    } catch (error) {
      print("$runtimeType::createGroup() -- $error");
    }
  }

  // TODO: remove group item
  Future removeGroupItem(GroupItem groupItem) async {
    try {
      // await _fbGroups.push(group.toJson());
    } catch (error) {
      print("$runtimeType::createGroup() -- $error");
    }
  }
}
