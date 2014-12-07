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
* ~~Berstein Algorithm to calculate 3rd normal form given a relation and set of functional dependencies~~
* BCNF Algorithm to calculate Boyce-Codd normal form given a relation and set of functional dependencies
* Add comments before I forget what things do, rename things sanely & consistently, and clean up redundant logic
* Actually use underscore?
* Find a good way to organize code into separate files
* Find a good way to do unit testing
* npm package?

### Prerequisites

You will need the following things properly installed on your computer.

#### Git
* [Getting Started Installing Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

#### Node.js
* [How to Install Node.js](http://howtonode.org/how-to-install-nodejs)


### Installation

```bash
$ git clone git://github.com/selbyk/csc4402.git
$ cd csc4402
$ npm install
```

### Running / Development

* `node main.js`

### Output

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
X:
[ 'A', 'B', 'C', 'D', 'E', 'G', 'H' ]
F:
[ [ [ 'B' ], [ 'E' ] ],
  [ [ 'B' ], [ 'H' ] ],
  [ [ 'E' ], [ 'A' ] ],
  [ [ 'E' ], [ 'D' ] ],
  [ [ 'A', 'H' ], [ 'C' ] ] ]
Testing bcfn step one...
bcfn_one:
OK: Test passed
[ [ [ 'B' ], [ 'E', 'H' ] ],
  [ [ 'E' ], [ 'A', 'D' ] ],
  [ [ 'A', 'H' ], [ 'C' ] ] ]
Testing bcfn step two...
bcfn_two:
ERROR: Test failed
[ [ [ 'B' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'E' ], [ 'A', 'D', 'E' ] ],
  [ [ 'A', 'B' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'E' ], [ 'A', 'D', 'E' ] ],
  [ [ 'A', 'H' ], [ 'A', 'C', 'H' ] ],
  [ [ 'B', 'C' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'D' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'E' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'C', 'E' ], [ 'A', 'C', 'D', 'E' ] ],
  [ [ 'D', 'E' ], [ 'A', 'D', 'E' ] ],
  [ [ 'E', 'G' ], [ 'A', 'D', 'E', 'G' ] ],
  [ [ 'E', 'H' ], [ 'A', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'C' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'D' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'E' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'C', 'E' ], [ 'A', 'C', 'D', 'E' ] ],
  [ [ 'A', 'D', 'H' ], [ 'A', 'C', 'D', 'H' ] ],
  [ [ 'A', 'E', 'G' ], [ 'A', 'D', 'E', 'G' ] ],
  [ [ 'A', 'E', 'H' ], [ 'A', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'G', 'H' ], [ 'A', 'C', 'G', 'H' ] ],
  [ [ 'B', 'C', 'D' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'C', 'E' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'C', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'D', 'E' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'D', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'E', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'C', 'D', 'E' ], [ 'A', 'C', 'D', 'E' ] ],
  [ [ 'C', 'E', 'G' ], [ 'A', 'C', 'D', 'E', 'G' ] ],
  [ [ 'C', 'E', 'H' ], [ 'A', 'C', 'D', 'E', 'H' ] ],
  [ [ 'D', 'E', 'G' ], [ 'A', 'D', 'E', 'G' ] ],
  [ [ 'D', 'E', 'H' ], [ 'A', 'C', 'D', 'E', 'H' ] ],
  [ [ 'E', 'G', 'H' ], [ 'A', 'C', 'D', 'E', 'G', 'H' ] ],
  [ [ 'A', 'B', 'C', 'D' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'C', 'E' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'C', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'D', 'E' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'D', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'E', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'C', 'E', 'G' ], [ 'A', 'C', 'D', 'E', 'G' ] ],
  [ [ 'A', 'C', 'E', 'H' ], [ 'A', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'D', 'E', 'H' ], [ 'A', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'D', 'G', 'H' ], [ 'A', 'C', 'D', 'G', 'H' ] ],
  [ [ 'A', 'E', 'G', 'H' ], [ 'A', 'C', 'D', 'E', 'G', 'H' ] ],
  [ [ 'B', 'C', 'D', 'E' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'C', 'D', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'C', 'E', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'B', 'D', 'E', 'H' ], [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'C', 'D', 'E', 'G' ], [ 'A', 'C', 'D', 'E', 'G' ] ],
  [ [ 'C', 'D', 'E', 'H' ], [ 'A', 'C', 'D', 'E', 'H' ] ],
  [ [ 'C', 'E', 'G', 'H' ], [ 'A', 'C', 'D', 'E', 'G', 'H' ] ],
  [ [ 'D', 'E', 'G', 'H' ], [ 'A', 'C', 'D', 'E', 'G', 'H' ] ],
  [ [ 'A', 'B', 'C', 'D', 'E' ],
    [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'C', 'D', 'H' ],
    [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'C', 'E', 'H' ],
    [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'B', 'D', 'E', 'H' ],
    [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'A', 'C', 'E', 'G', 'H' ],
    [ 'A', 'C', 'D', 'E', 'G', 'H' ] ],
  [ [ 'A', 'D', 'E', 'G', 'H' ],
    [ 'A', 'C', 'D', 'E', 'G', 'H' ] ],
  [ [ 'B', 'C', 'D', 'E', 'H' ],
    [ 'A', 'B', 'C', 'D', 'E', 'H' ] ],
  [ [ 'C', 'D', 'E', 'G', 'H' ],
    [ 'A', 'C', 'D', 'E', 'G', 'H' ] ] ]
```
