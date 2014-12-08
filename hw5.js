/**
 * #2
 */

// Relation R as array of attributes
var R = ['A','B','C'];

//  Functional dependencies F1, F2, F3 are defined as arrays tuples
var F1 = [
  [['A'], ['B']],
  [['A'], ['C']]
];

var F2 = [
  [['A'], ['B']],
  [['B'], ['C']]
];

// Print relation to check for correct value
console.log('R:');
console.log(R);

// Print functional dependencies F1 & F2 to check for correct values
console.log('F1:');
console.log(F1);
console.log('F2:');
console.log(F2);

// Calculate closures for F1 & F2 as F1c & F2c
var F1c = fd_closure(R, F1);
var F2c = fd_closure(R, F2);

// Print calculated closures for F1 & F2
console.log('F1+:');
console.log(F1c);
console.log('F2+:');
console.log(F2c);

// Check if F1+ & F2+ are equivalent to determine
// whether F1 & F2 are equivalent and print the result
if(F1c.equals(F2c))
  console.log('F1 and F2 are equivalent');
else
  console.log('F1 and F2 are NOT equivalent');

//  Functional dependencies F3 are defined as array tuples
var F3 = [
  [['A'], ['B']],
  [['B'], ['C']],
  [['A'], ['C']]
];

// Print functional dependencies F3 to check for correct value
console.log('F3:');
console.log(F3);

// Calculate closure for F3 as F3c
var F3c = fd_closure(R, F3);

// Print calculated closure for F3
console.log('F3+:');
console.log(F3c);

// Check if F2+ & F3+ are equivalent to determine
// whether F2 & F3 are equivalent and print the result
if(F2c.equals(F3c))
  console.log('F2 and F3 are equivalent');
else
  console.log('F2 and F3 are NOT equivalent');

/**
 * #3
 */

// Relation R as array of attributes
var R = ['A','B','C','D','E'];

//  Functional dependencies F1, F2, F3 are defined as arrays tuples
var F = [
  [['A', 'B'], ['E']],
  [['B', 'E'], ['C']],
  [['C', 'E'], ['D']],
  [['E'], ['B']],
  [['B', 'C'], ['A']]
];

// Print relation to check for correct value
console.log('R:');
console.log(R);

// Print functional dependencies F1 & F2 to check for correct values
console.log('F:');
console.log(F);

// Calculate closure for F as Fc
var Fc = fd_closure(R, F);

// Print calculated closures for F1 & F2
console.log('F+:');
console.log(Fc);

// Functional dependencies to test
var fd_test_array = [
  [['A', 'B'], ['D']],
  [['A'], ['D']],
  [['E'], ['D']],
  [['B', 'C'], ['E']]
];

// Check if each fd in fd_test_array is in Fc
fd_test_array.forEach(function(fd){
  var in_F = false;
  for(i = 0; i < Fc.length; ++i){
    var is_key_eq = fd[0].equals(Fc[i][0]);
    var is_attr_subset = fd[1].is_subset_of(Fc[i][1]);
    //console.log('keys eq:', is_key_eq, ' comp=>', fd[0],' == ', Fc[i][0]);
    //console.log('attr subset:', is_attr_subset, ' comp=>', fd[1],' subset? ', Fc[i][1]);
    if(is_key_eq && is_attr_subset){
      in_F = true;
      break;
    }
  }
  if(in_F)
    console.log('Functional dependency ', fd, ' is contained in F');
  else
    console.log('Functional dependency ', fd, ' is NOT contained in F');
});

var Fmin = minimal_cover(R, F);
console.log('F-:');
console.log(Fmin);

if(F.equals(Fmin))
  console.log('F IS already minimal');
else
  console.log('F is NOT already minimal');

// die
//process.exit(1);

/**
 * #4
 */

// Relation R as array of attributes
var R = ['A','B','C','D','E', 'G'];

//  Functional dependencies F1, F2, F3 are defined as arrays tuples
var F = [
  [['A', 'B'], ['C', 'D']],
  [['B', 'C', 'D'], ['E']],
  [['B'], ['C']],
  [['E'], ['B']]
];

console.log('R:');
console.log(R);
console.log('F:');
console.log(F);

var min_cover = minimal_cover(R, F);
console.log('F-:');
console.log(min_cover);

var bcnf_llj = bcnf(R,F)
console.log('Fsomething:');
console.log(bcnf_llj);

/**
 * #5
 */

// Relation R as array of attributes
var R = ['A','B','C','D','E'];

//  Functional dependencies F1, F2, F3 are defined as arrays tuples
var F = [
  [['A'], ['B']],
  [['A', 'B'], ['C']],
  [['A', 'B'], ['D']],
  [['B', 'E'], ['A']],
  [['D'], ['B']]
];

console.log('R:');
console.log(R);
console.log('F:');
console.log(F);

var min_cover = minimal_cover(R, F);
console.log('F-:');
console.log(min_cover);

var _3NFdecomp = bernstein(R,F);
console.log('3NF decomposition:');
console.log(_3NFdecomp);
