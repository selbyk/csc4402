csc4402
=======
Functional dependency algorithms for relational database design used in CSC 4402 at LSU.


**Note:** If you are taking CSC 4402, I encourage you to attempt this on your own before looking at my solutions.

The pseudo code for the algorithms used can be found in Dr. Jianhua Chen's lecture notes:
* [http://csc.lsu.edu/~jianhua/fd_slide_09.pdf](http://csc.lsu.edu/~jianhua/fd_slide_09.pdf)
* [http://csc.lsu.edu/~jianhua/fd_slide2_09.pdf](http://csc.lsu.edu/~jianhua/fd_slide2_09.pdf)


Feel free to check your work or to use this code professionally, it is avaliable under the MIT license.

There are definitely improvements that can be made, and contributions are very welcome.

Output as of commit 4034bec41c8666682569a331311c713cc05537d0

```sh
Hello, World
Hello, World
Hello, World
Hello, World
Hello, World
X:
[ 'A', 'B', 'C' ]
F:
[ [ [ 'A', 'B' ], [ 'C' ] ],
  [ [ 'C' ], [ 'B' ] ],
  [ [ 'C' ], [ 'A' ] ] ]
Testing closure calculations...
OK: Test passed
F+:
[ [ [ 'A' ], [ 'A' ] ],
  [ [ 'B' ], [ 'B' ] ],
  [ [ 'C' ], [ 'A', 'B', 'C' ] ],
  [ [ 'A', 'B' ], [ 'A', 'B', 'C' ] ],
  [ [ 'A', 'C' ], [ 'A', 'B', 'C' ] ],
  [ [ 'B', 'C' ], [ 'A', 'B', 'C' ] ],
  [ [ 'A', 'B', 'C' ], [ 'A', 'B', 'C' ] ] ]
X:
[ 'A', 'B', 'C', 'D', 'E', 'G', 'H' ]
F:
[ [ [ 'C', 'D' ], [ 'A', 'B' ] ],
  [ [ 'C' ], [ 'D' ] ],
  [ [ 'D' ], [ 'E', 'H' ] ],
  [ [ 'A', 'E' ], [ 'C' ] ],
  [ [ 'A' ], [ 'C' ] ],
  [ [ 'B' ], [ 'D' ] ] ]
Testing min-cover part 1...
F` (1/3):
OK: Test passed
[ [ [ 'C', 'D' ], [ 'A' ] ],
  [ [ 'C', 'D' ], [ 'B' ] ],
  [ [ 'C' ], [ 'D' ] ],
  [ [ 'D' ], [ 'E' ] ],
  [ [ 'D' ], [ 'H' ] ],
  [ [ 'A', 'E' ], [ 'C' ] ],
  [ [ 'A' ], [ 'C' ] ],
  [ [ 'B' ], [ 'D' ] ] ]
Testing min-cover part 2...
F` (2/3):
OK: Test passed
[ [ [ 'C' ], [ 'A' ] ],
  [ [ 'C' ], [ 'B' ] ],
  [ [ 'C' ], [ 'D' ] ],
  [ [ 'D' ], [ 'E' ] ],
  [ [ 'D' ], [ 'H' ] ],
  [ [ 'A' ], [ 'C' ] ],
  [ [ 'B' ], [ 'D' ] ] ]
Testing min-cover part 3...
F` (3/3):
OK: Test passed
[ [ [ 'C' ], [ 'A' ] ],
  [ [ 'C' ], [ 'B' ] ],
  [ [ 'D' ], [ 'E' ] ],
  [ [ 'D' ], [ 'H' ] ],
  [ [ 'A' ], [ 'C' ] ],
  [ [ 'B' ], [ 'D' ] ] ]
X:
[ 'A', 'B', 'C', 'D', 'E', 'G' ]
F:
[ [ [ 'A', 'B' ], [ 'C' ] ],
  [ [ 'C' ], [ 'D' ] ],
  [ [ 'A', 'D' ], [ 'E' ] ] ]
Testing necessary keys...
NKs:
OK: Test passed
[ 'A', 'B', 'G' ]
Testing useless keys...
UKs:
OK: Test passed
[ 'E' ]
Testing middle ground keys...
MGKs:
OK: Test passed
[ 'C', 'D' ]
Testing candidate keys...
CK:
OK: Test passed
[ [ 'A', 'G' ], [ 'B', 'D', 'G' ] ]

```
