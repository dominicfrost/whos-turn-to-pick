part of picker_core;

class FirebaseClient implements PickerClient {
  firebase.GoogleAuthProvider _fbGoogleAuthProvider;
  firebase.Auth _fbAuth;
  firebase.Database _fbDatabase;

  firebase.DatabaseReference _fbGroups;
  firebase.DatabaseReference get fbGroups => _fbGroups;

  firebase.DatabaseReference _fbGroupItems;
  firebase.DatabaseReference get fbGroupItems => _fbGroupItems;

  firebase.User user;

  StreamTransformer<firebase.QueryEvent, Group> _groupAddedTransformer =
    new StreamTransformer<firebase.QueryEvent, Group>((Stream<firebase.QueryEvent> input, bool cancelOnError) {
      StreamController<Group> controller;
      StreamSubscription<firebase.QueryEvent> subscription;
      controller = new StreamController<Group>(
        onListen: () {
          subscription = input.listen((data) {
              controller.add(new Group.fromJson(data.snapshot.val()));
            },
            onError: controller.addError,
            onDone: controller.close,
            cancelOnError: cancelOnError);
        },
        onPause: () { subscription.pause(); },
        onResume: () { subscription.resume(); },
        onCancel: () { subscription.cancel(); },
        sync: true);
      return controller.stream.listen(null);
    });

  StreamTransformer<firebase.QueryEvent, GroupItem> _groupItemAddedTransformer =
    new StreamTransformer<firebase.QueryEvent, GroupItem>((Stream<firebase.QueryEvent> input, bool cancelOnError) {
      StreamController<GroupItem> controller;
      StreamSubscription<firebase.QueryEvent> subscription;
      controller = new StreamController<GroupItem>(
        onListen: () {
          subscription = input.listen((data) {
              controller.add(new GroupItem.fromJson(data.snapshot.val()));
            },
            onError: controller.addError,
            onDone: controller.close,
            cancelOnError: cancelOnError);
        },
        onPause: () { subscription.pause(); },
        onResume: () { subscription.resume(); },
        onCancel: () { subscription.cancel(); },
        sync: true);
      return controller.stream.listen(null);
    });

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

  // PickerClient implementation

  // streams

  Stream<Group> get groupAdded => _fbGroups.onChildAdded.transform(_groupAddedTransformer);

  Stream<Group> get groupRemoved => null;

  Stream<GroupItem> get groupItemAdded => _fbGroupItems.onChildAdded.transform(_groupItemAddedTransformer);

  Stream<GroupItem> get groupItemRemoved => null;

  // update methods

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
