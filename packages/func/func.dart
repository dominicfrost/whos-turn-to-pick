// Copyright (c) 2015, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

/// Typedefs defining commonly used function types to make it simpler to
/// define members that return specific function types.
library func;

typedef R Func0<R>();
typedef R Func1<A, R>(A a);
typedef R Func2<A, B, R>(A a, B b);
typedef R Func3<A, B, C, R>(A a, B b, C c);
typedef R Func4<A, B, C, D, R>(A a, B b, C c, D d);

typedef R Func1Opt1<A, R>([A a]);
typedef R Func2Opt1<A, B, R>(A a, [B b]);
typedef R Func3Opt1<A, B, C, R>(A a, B b, [C c]);
typedef R Func4Opt1<A, B, C, D, R>(A a, B b, C c, [D d]);

typedef void VoidFunc0();
typedef void VoidFunc1<A>(A a);
typedef void VoidFunc2<A, B>(A a, B b);
typedef void VoidFunc3<A, B, C>(A a, B b, C c);
typedef void VoidFunc4<A, B, C, D>(A a, B b, C c, D d);

typedef void VoidFunc1Opt1<A>([A a]);
typedef void VoidFunc2Opt1<A, B>(A a, [B b]);
typedef void VoidFunc3Opt1<A, B, C>(A a, B b, [C c]);
typedef void VoidFunc4Opt1<A, B, C, D>(A a, B b, C c, [D d]);
