csc4402
=======

**Note:** If you are taking CSC 4402, I encourage you to attempt this on your own before looking at my solutions.

Functional dependency algorithms for relational database design used in CSC 4402 at LSU.

Feel free to check your work or use this code professionally, it is avaliable under the MIT license.

There are definitely improvements that could be made, and contributions are very welcome.

Output as of commit a1a87473a201a0186d929ebb8d2e9e9fbb0f8666

```sh
Hello, World
Hello, World
Hello, World
Hello, World
Hello, World
OK: Test passed
X:
[ 'A', 'B', 'C' ]
F:
[ [ [ 'A', 'B' ], [ 'C' ] ],
  [ [ 'C' ], [ 'B' ] ],
  [ [ 'C' ], [ 'A' ] ] ]
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
[]
[ 'A' ]
[ 'A', 'B' ]
[]
[ 'E' ]
[]
[]
Testing min-cover part 3...
F` (3/3):
OK: Test passed
[ [ [ 'C' ], [ 'A' ] ],
  [ [ 'C' ], [ 'B' ] ],
  [ [ 'D' ], [ 'E' ] ],
  [ [ 'D' ], [ 'H' ] ],
  [ [ 'A' ], [ 'C' ] ],
  [ [ 'B' ], [ 'D' ] ] ]

```
