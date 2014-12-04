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

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.proper_subset = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length == 0 || array.length == 0 || this.length < array.length)
        return false;

    for (var i = 0, l=array.length; i < l; i++) {
      if(this.indexOf(array[i]) == -1) {
        return false;
      }
    }
    return true;
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.subset = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length == 0 || array.length == 0 || this.length <= array.length)
        return false;

    for (var i = 0, l=array.length; i < l; i++) {
      if(this.indexOf(array[i]) == -1) {
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
From course:
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
      new_fds.push([fd[0],[attr]]);
    });
  });
  return new_fds;
}

//
/*
From course:
Eliminate redundancy in the left hand side.The fd CD→A is replaced by C
→A. This is because C→D ∈ (F′)+, hence C→CD ∈ (F′)+; from C→CD ∈(F′)+ and CD→A ∈ F′,
by transitivity, we have C→A∈(F′)+ and hence CD→A should be replaced by C→A. Similarly,
CD→B is replaced by C→B, AE→C is replaced by A→C. F′= {C→A, C→B, C→D, D→E, D→H, A→C, B→D}
after step (2).
*/
var elim_lhs_redundancy = function(a_keys, kva_fds){
  var fm = break_rhs(kva_fds);
  do{
    var contin = false;
    var new_fm = [];
    var fmc = fd_closure(a_keys, fm);
    fm.forEach(function(fd){
      if(fd[0].length > 1){ // it is a composite key
        // CSC 4402 Notes
        // X is a composite attribute and
        // Z ⊂ X is a proper subset of X and Z → A ∈ (F′)+, do replace X → A
        // with Z → A.
        var replaced = false;
        for(i=0;i<fmc.length;++i){
          var is_proper_subset = fd[0].proper_subset(fmc[i][0]);
          //console.log(fd[0] + '->' + fd[1] + ':' + fmc[i][0] + '->' + fmc[i][1]);
          //console.log(is_proper_subset);
          if(is_proper_subset && fmc[i][1].indexOf(fd[1][0]) != -1){
            replaced = true;
            var already_included = false;
            for(j = 0; j < fm.length; ++j)
              if(fm[j].equals([fmc[i][0],fd[1][0]])){
                already_included = true;
                break;
              }
            if(already_included == false)
              new_fm.push([fmc[i][0],fd[1]]);
            break;
          }
        }
        if(replaced == false)
          new_fm.push([fd[0],fd[1]]);
      }else{
        new_fm.push([fd[0],fd[1]]);
      }
    })
    if(fm.equals(new_fm) === false){
      fm = new_fm;
      contin = true;
    }
  }while(contin);
  return fm;
}

var remove_redundant_fds = function(a_keys, kva_fds){
  // F′= {C→A, C→B, C→D, D→E, D→H, A→C, B→D}
  // CSC 4402 Notes
  // The fd C→D is eliminated because it can be derived from C→B and B→D and hence it is
  // redundant. The F′now becomes {C→A, C→B, D→E, D→H, A→C, B→D}, which is the only
  // minimal cover of F.♣
  var fm = elim_lhs_redundancy(a_keys, kva_fds),
      new_fm = [],
      X = [],
      coX = [],
      attrs = []

  fm.forEach(function(fd){
    if(fd[0].equals(X) === false){
      X = fd[0]
      attrs = []
    }
    //console.log(attrs);
    var redundant = false;
    for(i=0;i<attrs.length;++i){
      for(j=0;j<fm.length;++j){
        if(fm[j][0].indexOf(attrs[i]) > -1 && fm[j][1].indexOf(fd[1][0]) > -1)
          redundant = true;
      }
      if(redundant)
        break;
    }
    if(redundant === false){
      new_fm.push([fd[0],fd[1]])
      attrs.push(fd[1][0])
    }
  })

  return new_fm
}

var minimal_cover = function(a_keys, kva_fds){
  return remove_redundant_fds(a_keys, kva_fds)
}

var candidate_keys_of = function(a_keys, kva_fds){
  var possible_keys = combinations(a_keys);
  var candidate_keys = [];
  while(possible_keys.length > 0){
    var possible_key = possible_keys.shift();
    var possible_key_closure = closure_of(possible_key, kva_fds);
    var tmp_cks = [];
    //console.log(closure_of(possible_key, kva_fds));
    if(possible_key_closure.equals(a_keys))

      candidate_keys.forEach(function(ck){
        if(possible_key.subset(ck) == false)
          tmp_cks.push(ck)

      })
      tmp_cks.push(possible_key)
      candidate_keys = tmp_cks
  }
  return candidate_keys;
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

console.log('X:');
console.log(X);
console.log('F:');
console.log(F);
console.log('Testing closure calculations...');
var closure_calculated = fd_closure(X, F);
test_output(closure_calculated, expected_closure);
console.log('F+:');
console.log(closure_calculated);

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

// F′= {C→A, C→B, C→D, D→E, D→H, A→C, B→D} after step (2).
var expected_elim = [
  [['C'], ['A']],
  [['C'], ['B']],
  [['C'], ['D']],
  [['D'], ['E']],
  [['D'], ['H']],
  [['A'], ['C']],
  [['B'], ['D']]
];

// F′now becomes {C→A, C→B, D→E, D→H, A→C, B→D}
var expected_min_cover = [
  [['C'], ['A']],
  [['C'], ['B']],
  [['D'], ['E']],
  [['D'], ['H']],
  [['A'], ['C']],
  [['B'], ['D']]
];

console.log('X:');
console.log(X);
console.log('F:');
console.log(F);
var break_calculated = break_rhs(F);
console.log('Testing min-cover part 1...');
console.log('F` (1/3):');
test_output(break_calculated, expected_break);
console.log(break_calculated);
var elim_calculated = elim_lhs_redundancy(X, F);
console.log('Testing min-cover part 2...');
console.log('F` (2/3):');
test_output(elim_calculated, expected_elim);
console.log(elim_calculated);
var min_cover_calculated = minimal_cover(X, F);
console.log('Testing min-cover part 3...');
console.log('F` (3/3):');
test_output(min_cover_calculated, expected_min_cover);
console.log(min_cover_calculated);


var candidate_keys = candidate_keys_of(X, F);
console.log('Testing candidate keys...');
console.log('CK:');
test_output(candidate_keys, expected_min_cover);
console.log(candidate_keys);


/*Eliminate redundancy in the left hand side.The fd CD→Aisreplaced by C
→A. This is becauseC→D∈(F′)+,hence C→CD∈(F′)+;from C→CD∈(F′)+and CD→
A∈F′,bytransitivity,wehav eC→A∈(F′)+and henceCD→Ashould be replaced by C→
A. Similarly,CD→Bis replaced by C→B, AE→Cisreplaced by A→C. F′=
{C→A, C→B, C→D, D→E, D→H, A→C, B→D}after step (2).
*/
