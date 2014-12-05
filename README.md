csc4402
=======
Functional dependency algorithms for relational database design used in CSC 4402 at LSU.


**Note:** If you are taking CSC 4402, I encourage you to attempt this on your own before looking at my solutions.

The pseudo code for the algorithms used can be found in Dr. Jianhua Chen's lecture notes:
* [http://csc.lsu.edu/~jianhua/fd_slide_09.pdf](http://csc.lsu.edu/~jianhua/fd_slide_09.pdf)
* [http://csc.lsu.edu/~jianhua/fd_slide2_09.pdf](http://csc.lsu.edu/~jianhua/fd_slide2_09.pdf)


Feel free to check your work or to use this code professionally, it is available under the MIT license.

There are definitely improvements that can be made with my implementation, and contributions are very welcome.

Todo
---
* ~~Calculate closure of keys~~
* ~~Generate combinations of relation attributes~~
* ~~Use combinations to generate the closure given a relation and set of functional dependencies~~
* ~~Calculate minimal cover given a relation and set of functional dependencies~~
* ~~Calculate candidate keys given a relation and set of functional dependencies~~
* Berstein Algorithm to calculate 3rd normal form given a relation and set of functional dependencies
* BCNF Algorithm to calculate Boyce-Codd normal form given a relation and set of functional dependencies
* Add comments before I forget what things do, rename things sanely & consistently, and clean up redundant logic
* Actually use underscore?
* Find a good way to organize code into separate files
* Find a good way to do unit testing
* npm package?

Output
---
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
X:
[ 'A', 'B', 'C', 'D', 'E', 'G' ]
F:
[ [ [ 'A', 'B' ], [ 'C', 'D' ] ],
  [ [ 'A' ], [ 'B' ] ],
  [ [ 'B' ], [ 'C' ] ],
  [ [ 'C' ], [ 'E' ] ],
  [ [ 'B', 'D' ], [ 'A' ] ] ]
Testing candidate keys...
CK:
OK: Test passed
[ [ 'A', 'G' ], [ 'B', 'D', 'G' ] ]
X:
[ 'A', 'B', 'C', 'D', 'E' ]
F:
[ [ [ 'A' ], [ 'B' ] ],
  [ [ 'A' ], [ 'C' ] ],
  [ [ 'C' ], [ 'A' ] ],
  [ [ 'B', 'D' ], [ 'E' ] ] ]
Testing bernstein step one...
bernstein_one:
OK: Test passed
[ [ [ 'A' ], [ 'B', 'C' ] ],
  [ [ 'C' ], [ 'A' ] ],
  [ [ 'B', 'D' ], [ 'E' ] ] ]
Testing bernstein step two...
bernstein_two:
OK: Test passed
[ [ 'A', 'B', 'C' ], [ 'C', 'A' ], [ 'B', 'D', 'E' ] ]
Testing bernstein step three...
bernstein_three:
OK: Test passed
[ [ 'A', 'B', 'C' ], [ 'B', 'D', 'E' ] ]
Testing bernstein step four...
bernstein_four:
OK: Test passed
[ [ 'A', 'B', 'C' ], [ 'B', 'D', 'E' ], [ 'A', 'D' ] ]

```
