@JS('firebase.database')
library firebase3.database_interop;

import 'package:func/func.dart';
import 'package:js/js.dart';

import 'app_interop.dart';
import 'firebase_interop.dart';

external void enableLogging([logger, bool persistent]);

/// A placeholder value for auto-populating the current timestamp
/// (time since the Unix epoch, in milliseconds) as determined
/// by the Firebase servers.
///
/// See: <https://firebase.google.com/docs/reference/js/firebase.database#.ServerValue>.
@JS()
abstract class ServerValue {
  external static Object get TIMESTAMP;
}

@JS('Database')
abstract class DatabaseJsImpl {
  external AppJsImpl get app;
  external void set app(AppJsImpl a);
  external void goOffline();
  external void goOnline();
  external ReferenceJsImpl ref([String path]);
  external ReferenceJsImpl refFromURL(String url);
}

@JS('Reference')
abstract class ReferenceJsImpl extends QueryJsImpl {
  external String get key;
  external void set key(String s);
  external ReferenceJsImpl get parent;
  external void set parent(ReferenceJsImpl r);
  external ReferenceJsImpl get root;
  external void set root(ReferenceJsImpl r);
  external ReferenceJsImpl child(String path);
  external OnDisconnectJsImpl onDisconnect();
  external ThenableReferenceJsImpl push([value, Func1 onComplete]);
  external PromiseJsImpl remove([Func1 onComplete]);
  external PromiseJsImpl set(value, [Func1 onComplete]);
  external PromiseJsImpl setPriority(priority, [Func1 onComplete]);
  external PromiseJsImpl setWithPriority(newVal, newPriority,
      [Func1 onComplete]);
  external PromiseJsImpl<TransactionJsImpl> transaction(Func1 transactionUpdate,
      [Func3 onComplete, bool applyLocally]);
  external PromiseJsImpl update(values, [Func1 onComplete]);
}

@JS('Query')
abstract class QueryJsImpl {
  external ReferenceJsImpl get ref;
  external void set ref(ReferenceJsImpl r);
  external QueryJsImpl endAt(value, [String key]);
  external QueryJsImpl equalTo(value, [String key]);
  external bool isEqual(QueryJsImpl other);
  external QueryJsImpl limitToFirst(int limit);
  external QueryJsImpl limitToLast(int limit);
  external void off([String eventType, Func2Opt1 callback, context]);
  external Func0 on(String eventType, Func2Opt1 callback,
      [cancelCallbackOrContext, context]);
  external PromiseJsImpl<dynamic> once(String eventType,
      [Func2Opt1 successCallback, failureCallbackOrContext, context]);
  external QueryJsImpl orderByChild(String path);
  external QueryJsImpl orderByKey();
  external QueryJsImpl orderByPriority();
  external QueryJsImpl orderByValue();
  external QueryJsImpl startAt(value, [String key]);
  @override
  external String toString();
}

@JS('DataSnapshot')
abstract class DataSnapshotJsImpl {
  external String get key;
  external void set key(String s);
  external ReferenceJsImpl get ref;
  external void set ref(ReferenceJsImpl r);
  external DataSnapshotJsImpl child(String path);
  external bool exists();
  external dynamic exportVal();
  external bool forEach(Func1 action);
  external dynamic getPriority();
  external bool hasChild(String path);
  external bool hasChildren();
  external int numChildren();
  external dynamic val();
}

@JS('OnDisconnect')
abstract class OnDisconnectJsImpl {
  external PromiseJsImpl cancel([Func1 onComplete]);
  external PromiseJsImpl remove([Func1 onComplete]);
  external PromiseJsImpl set(value, [Func1 onComplete]);
  external PromiseJsImpl setWithPriority(value, priority, [Func1 onComplete]);
  external PromiseJsImpl update(values, [Func1 onComplete]);
}

@JS('ThenableReference')
abstract class ThenableReferenceJsImpl extends ReferenceJsImpl
    implements ThenableJsImpl {
  @override
  external ThenableJsImpl JS$catch([Func1 onReject]);
  @override
  external ThenableJsImpl then([Func1 onResolve, Func1 onReject]);
}

@JS()
@anonymous
class TransactionJsImpl {
  external bool get committed;
  external void set committed(bool c);
  external DataSnapshotJsImpl get snapshot;
  external void set snapshot(DataSnapshotJsImpl s);

  external factory TransactionJsImpl(
      {bool committed, DataSnapshotJsImpl snapshot});
}
