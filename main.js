var _ = require('underscore')

function sayHello() {
  console.log('Hello, World');
}

_.times(5, sayHello);

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

/*
Your previous Plain Text content is preserved below:

var _ = require('underscore');
var crypto = require('crypto');

function sayHello() {
  console.log('Hello, World');
}

_.times(1, sayHello);


var BreakException= {};

// set of attributes

/*
'A'
'B'
'C'
'A'
*/

function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;
  if (k > set.length || k <= 0) {
    return [];
  }
  if (k == set.length) {
    return [set];
  }
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  // Assert {1 < k < set.length}
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

function combinations(set) {
  var k, i, combs, k_combs;
  combs = [];
  // Calculate all non-empty k-combinations
  for (k = 1; k <= set.length; k++) {
    k_combs = k_combinations(set, k);
    for (i = 0; i < k_combs.length; i++) {
      combs.push(k_combs[i]);
    }
  }
  return combs;
}

var closure_of = function(a_keys, kva_fds){
  var result = [].concat(a_keys);
  var fds = [].concat(kva_fds);
  do{
    var found = false;
    for (var j = 0; j < fds.length; j++) {
      var fd = fds[j];
      var Y = fd[0];
      var Z = fd[1];
      var count = 0;
      for (var i = 0; i < Y.length; i++) {
        if(result.indexOf(Y[i]) > -1)
            count++;
          else
            break;
      }
      if(count == Y.length){
          found=true;
          Z.forEach(function(attr){
            //console.log(result.indexOf(attr));
            if(result.indexOf(attr) == -1)
              result.push(attr);
            //else
              //console.log(attr);
          });
          //result = result.concat(Z);
          fds.splice(j--,1);
          //console.log('found:'  );
          break;
        }
    }
  } while(found==true);
  return result.sort();
}

var fd_closure = function(a_attrs, kva_fds){
  var left_hand_sides = combinations(a_attrs);
  var closure = [];
  left_hand_sides.forEach(function(lhs){
    var closure_of_x = [lhs, closure_of(lhs, kva_fds)];
    closure.push(closure_of_x);
  });
  return closure;
}

/*
MINIMAL COVERS
Let F 1 and F 2 be two sets of functional dependencies.
If F1 ≡ F2,then we say the F1 is a cover ofF2 and F2 is a cover of
F1.We also say thatF1coversF2and vice versa. It easy to showthat every
set of functional dependencies Fis covered by a set of
functional dependencies G, in which the right hand side of each fd has
only one attribute.We say a set of dependencies F isminimalif:(1) Ev
ery right hand side of each fd in F is a single attribute.(2) The left hand
side of each fd does not have any redundantattribute, i.e., for every fd
X→AinFwhere X is a compos- attribute, and for anyproper subset Z of X, the functional
dependencyZ→A∉F+.(3) Fis reduced (without redundant fd’s). Thismeans that for
ev ery X→AinF,the set F−{X→A} is NOTequivalentto F.
Minimal Covers of F.It is easy to see that for each set F offunctional dependencies,
there exists a set of functional dependen-cies F′such that F≡F′and F′is minimal.
We call such F′amini-mal coverof F
.
*/
var break_rhs = function(kva_fds){
  var new_fds = [];
  kva_fds.forEach(function(fd){
    fd[1].forEach(function(attr){
      new_fds.push([fd[0],attr]);
    });
  });
  return new_fds;
}

//
/*Eliminate redundancy in the left hand side.The fd CD→Aisreplaced by C
→A. This is becauseC→D∈(F′)+,hence C→CD∈(F′)+;from C→CD∈(F′)+and CD→
A∈F′,bytransitivity,wehav eC→A∈(F′)+and henceCD→Ashould be replaced by C→
A. Similarly,CD→Bis replaced by C→B, AE→Cisreplaced by A→C. F′=
{C→A, C→B, C→D, D→E, D→H, A→C, B→D}after step (2).
*/
var elim_lhs_redundancy = function(kva_fds){
  fm = break_rhs(kva_fds);

  return fm;
}

var minimal_cover = function(kva_fds){
  var left_hand_sides = combinations(a_attrs);
  var closure = [];
  left_hand_sides.forEach(function(lhs){
    var closure_of_x = [lhs, closure_of(lhs, kva_fds)];
    closure.push(closure_of_x);
  });
  return closure;
}

/*
  Functional Dependencies
  AB → C
  C → B
  C → A
*/

// Set of attributes
var X = ['A','B','C'];

// Set of functional dependencies
var F = [
  [['A', 'B'], ['C']],
  [['C'], ['B']],
  [['C'], ['A']]
];
/*
Closure should be:
A → A
B → B
C → ABC
AB → ABC
AC → ABC
BC → ABC
ABC → ABC
*/

var test_output = function(output, expected){
  var passed = output.equals(expected);
  if(passed === true)
    console.log('OK: Test passed');
  else
    console.log('ERROR: Test failed');
  return passed;
};

var expected_closure = [
  [['A'], ['A']],
  [['B'], ['B']],
  [['C'], ['A', 'B', 'C']],
  [['A', 'B'], ['A', 'B', 'C']],
  [['A', 'C'], ['A', 'B', 'C']],
  [['B', 'C'], ['A', 'B', 'C']],
  [['A', 'B', 'C'], ['A', 'B', 'C']]
];

var closure_calculation = fd_closure(X, F);

test_output(closure_calculation, expected_closure);
console.log('X:');
console.log(X);
console.log('F:');
console.log(F);
console.log('F+:');
console.log(closure_calculation);

// Test min covers
/*
Let R = R(ABCDEGH) and F = {CD→AB, C→D, D→EH,
AE→C, A→C, B→D}. Theprocess of computing a minimalcovero
fFisasfollows:(1)Break down the right hand side of each fd’s.
After per-forming step (1) in the algorithm, we get F′={
CD→A, CD→B, C→D, D→E, D→H, AE→C, A→C, B→D}.
*/

// Set of attributes
var X = ['A','B','C','D','E','G','H'];

// Set of functional dependencies
var F = [
  [['C', 'D'], ['A', 'B']],
  [['C'], ['D']],
  [['D'], ['E', 'H']],
  [['A', 'E'], ['C']],
  [['A'], ['C']],
  [['B'], ['D']]
];

var expected_break = [
  [['C', 'D'], ['A']],
  [['C', 'D'], ['B']],
  [['C'], ['D']],
  [['D'], ['E']],
  [['D'], ['H']],
  [['A', 'E'], ['C']],
  [['A'], ['C']],
  [['B'], ['D']]
];

console.log('X:');
console.log(X);
console.log('F:');
console.log(F);
var break_calculated = break_rhs(F);
console.log('Testing min-cover part 1...');
console.log('F`:');
test_output(break_calculated, expected_break);
console.log(break_calculated);

/*Eliminate redundancy in the left hand side.The fd CD→Aisreplaced by C
→A. This is becauseC→D∈(F′)+,hence C→CD∈(F′)+;from C→CD∈(F′)+and CD→
A∈F′,bytransitivity,wehav eC→A∈(F′)+and henceCD→Ashould be replaced by C→
A. Similarly,CD→Bis replaced by C→B, AE→Cisreplaced by A→C. F′=
{C→A, C→B, C→D, D→E, D→H, A→C, B→D}after step (2).
*/
