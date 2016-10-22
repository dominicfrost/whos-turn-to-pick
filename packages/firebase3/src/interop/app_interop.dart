@JS('firebase.app')
library firebase3.app_interop;

import 'package:js/js.dart';

import 'auth_interop.dart';
import 'database_interop.dart';
import 'firebase_interop.dart';
import 'storage_interop.dart';

@JS('App')
abstract class AppJsImpl {
  external String get name;
  external FirebaseOptions get options;
  external AuthJsImpl auth();
  external DatabaseJsImpl database();
  external PromiseJsImpl delete();
  external StorageJsImpl storage();
}
