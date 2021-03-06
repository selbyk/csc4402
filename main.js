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
    if (array.length >= this.length)
        return false;

    for (var i = 0; i<array.length; ++i) {
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
    if (array.length > this.length)
        return false;

    for (var i = 0; i<array.length; ++i) {
      if(this.indexOf(array[i]) == -1) {
        return false;
      }
    }
    return true;
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.is_subset_of = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length > array.length)
        return false;

    for (var i = 0; i<this.length; ++i) {
      if(array.indexOf(this[i]) == -1) {
        return false;
      }
    }
    return true;
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.includes_fd = function (element) {
    // if the other array is a falsy value, return
    if (!element)
        return false;

    // compare lengths - can save a lot of time
    if (element instanceof Array){
      for (var i = 0; i < this.length; ++i) {
        if(this[i] instanceof Array && this[i][0].equals(element[0]) && element[1].is_subset_of(this[i][1])) {
          return true;
        }
      }
    }
    return false;
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.merge = function (that) {
    var this_index = 0;
    var that_index = 0;
    var this_and_that = [].concat(this);
    that.forEach(function(element){
      if(this_and_that.indexOf(element) == -1)
        this_and_that.push(element)
    })
    //while(this_index < this.length || that_index < that.length){
    //
    //}
    return this_and_that;
}

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

var necessary_keys_of = function(a_keys, kva_fds){
  var necessary_keys = [];
  a_keys.forEach(function(key){
    var in_lhs = false;
    var in_rhs = false;
    kva_fds.forEach(function(fd){
      if(in_lhs === false)
        if(fd[0].indexOf(key) != -1)
          in_lhs = true;
      if(in_rhs === false)
        if(fd[1].indexOf(key) != -1)
          in_rhs = true;
    })
    if(in_lhs && !in_rhs || !in_lhs && !in_rhs)
      necessary_keys.push(key)
  })
  return necessary_keys;
}

var useless_keys_of = function(a_keys, kva_fds){
  var useless_keys = [];
  a_keys.forEach(function(key){
    var in_lhs = false;
    var in_rhs = false;
    kva_fds.forEach(function(fd){
      if(in_lhs === false)
        if(fd[0].indexOf(key) != -1)
          in_lhs = true;
      if(in_rhs === false)
        if(fd[1].indexOf(key) != -1)
          in_rhs = true;
    })
    if(!in_lhs && in_rhs)
      useless_keys.push(key)
  })
  return useless_keys;
}

var middle_ground_keys_of = function(a_keys, kva_fds){
  var middle_ground_keys = [];
  var necessary_keys = necessary_keys_of(a_keys, kva_fds);
  var useless_keys = useless_keys_of(a_keys, kva_fds);
  var middle_ground_test_array = necessary_keys + useless_keys;
  a_keys.forEach(function(key){
    if(middle_ground_test_array.indexOf(key) == -1)
      middle_ground_keys.push(key)
  })
  return middle_ground_keys;
}

var candidate_keys_of = function(a_keys, kva_fds){
  //console.log(possible_keys)
  var candidate_keys = [];
  var necessary_keys = necessary_keys_of(a_keys, kva_fds);
  //console.log(necessary_keys);
  var useless_keys = useless_keys_of(a_keys, kva_fds);
  var middle_ground_keys = middle_ground_keys_of(a_keys, kva_fds);
  var possible_keys = function(){
    var tmp_keys = combinations(middle_ground_keys);
    var possible = [];
    tmp_keys.forEach(function(a_keys){
      possible.push(a_keys.concat(necessary_keys));
    })
    return possible;
  }();
  //console.log(possible_keys);
  while(possible_keys.length > 0){
    var possible_key = possible_keys.shift();
    var possible_key_closure = closure_of(possible_key, kva_fds);
    var tmp_cks = [];
    //console.log(closure_of(possible_key, kva_fds));
    if(possible_key_closure.equals(a_keys)){
      possible_keys.forEach(function(ck){
        if(ck.subset(possible_key) == false)
          tmp_cks.push(ck)
      })
      candidate_keys.push(possible_key)
      possible_keys = tmp_cks
    }
  }
  return candidate_keys;
}

/**
 * Bernstein's Algorithm
 *
 */

 /*
   From course:
   Group together all fd's which have the same L.H.S. If X → Y1, X → Y2, ...,
   X → Yk are all the fd's with the SAME L.H.S. X, then replace all of them
   by the single fd X → Y1, Y2, ...Yk.
 */
 var combine_lhs = function(kva_fds){
   var new_fds = []
   var tmp_fds = kva_fds
   kva_fds.forEach(function(fd){
     var already_exists = false
     for(i=0;i<new_fds.length;++i){
       if(new_fds[i][0].equals(fd[0])){
         already_exists = true
         break
       }
     }
     if(already_exists === false){
       new_fd_key = fd[0];
       new_fd_attrs = [];
       kva_fds.forEach(function(deeper_fd){
         if(new_fd_key.equals(deeper_fd[0])){
           new_fd_attrs = new_fd_attrs.concat(deeper_fd[1])
         }
       })
       new_fds.push([new_fd_key,new_fd_attrs])
     }
   })
   return new_fds
 }

 var decompose_fds_to_relations = function(kva_fds){
   var relations = []
   kva_fds.forEach(function(fd){
     relations.push(fd[0].concat(fd[1]))
   })
   return relations
 }

 var remove_redundant_relations = function(relations){
   var new_relations = []
   relations.forEach(function(relation){
     var is_redundant = false;
     for(i = 0; i < new_relations.length; ++i){
       if(new_relations[i].subset(relation)){
         //console.log(relation, ' subset? ', new_relations[i])
         is_redundant = true
         break
       }
     }
     if(is_redundant === false)
       new_relations.push(relation)
   })
   return new_relations
 }

var bernstein = function(a_keys, kva_fds){
    var cks = candidate_keys_of(a_keys, kva_fds)
    var fds = combine_lhs(kva_fds)
    var relations = decompose_fds_to_relations(fds)
    var no_cks = true
    relations = remove_redundant_relations(relations)
    for(i = 0; i < relations.length; ++i){
        for(j = 0; j < cks.length; ++j)
            if(cks[j].equals(relations[i])){
                no_cks = false
                break
            }
        if(no_cks == false)
          break
    }
    if(no_cks)
      relations.push(cks.shift())
    return relations
 }

 /**
  * BCNF Algorithm
  */

var bcfn_one = function(a_keys, kva_fds){
    var fds = combine_lhs(kva_fds)
    return fds
 }

var bcnf = function(a_keys, kva_fds){
    var fds = combine_lhs(kva_fds)
    var result = a_keys;
    var bcnf_relations = [];

    var f_plus = fd_closure(a_keys, fds);

    console.log(f_plus);

    var recursive_bcnf = function(a_keys, kva_fds){
        var tmp_fds = []
        var nontrivial_fd = false;

        for(i = 0; i < f_plus.length; ++i){
          if(!f_plus[i][1].is_subset_of(f_plus[i][0])){
            console.log(f_plus[i], ' is not trivial')
            for(j = 0; j < kva_fds.length; ++j){
              if(kva_fds[j][0].equals(f_plus[i][0]) ){
                console.log(f_plus[i], ' it holds on Ri');
                break;
              }
            }
          }
        }

        /*for(i = 0; i < kva_fds.length; ++i){
          if(!kva_fds[i][1].is_subset_of(kva_fds[i][0])){
            console.log(kva_fds[i], ' is not trivial lol');
            if(!f_plus.includes_fd([kva_fds[i][0], a_keys])){
              console.log([kva_fds[i][0], a_keys], ' isnt in ');
              tmp_fds.push(kva_fds[i])
            }
          }
        }*/
        return tmp_fds
     }

    return recursive_bcnf(result, fds);
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

/* Lecutre notes:
Consider the relation R(ABCDEG) with set of fd’
sF = {AB→C,C→D, AD→E}
*/


// Set of attributes
var X = ['A','B','C','D','E','G'];

// Set of functional dependencies
var F = [
  [['A', 'B'], ['C']],
  [['C'], ['D']],
  [['A', 'D'], ['E']]
];

var expected_necessary_keys = ['A','B','G'];

var expected_useless_keys = ['E'];

var expected_middle_ground_keys = ['C','D'];


console.log('X:');
console.log(X);
console.log('F:');
console.log(F);

console.log('Testing necessary keys...');
var necessary_keys = necessary_keys_of(X, F);

console.log('NKs:');
test_output(necessary_keys, expected_necessary_keys);
console.log(necessary_keys);

console.log('Testing useless keys...');
var useless_keys = useless_keys_of(X, F);

console.log('UKs:');
test_output(useless_keys, expected_useless_keys);
console.log(useless_keys);

console.log('Testing middle ground keys...');
var middle_ground_keys = middle_ground_keys_of(X, F);

console.log('MGKs:');
test_output(middle_ground_keys, expected_middle_ground_keys);
console.log(middle_ground_keys);


/*
Lecture notes:
Example. (Computing all candidate k
eys of R.)
Let R = R(ABCDEG) and F = {AB→CD, A→B, B→C, C→E, BD→A}.

CKs:
{AG, BDG}
*/


// Set of attributes
var X = ['A','B','C','D','E','G'];

// Set of functional dependencies
var F = [
  [['A', 'B'], ['C', 'D']],
  [['A'], ['B']],
  [['B'], ['C']],
  [['C'], ['E']],
  [['B', 'D'], ['A']]
];

var expected_candidate_keys = [
  ['A', 'G'],
  ['B', 'D', 'G']
];

console.log('X:');
console.log(X);
console.log('F:');
console.log(F);

var candidate_keys = candidate_keys_of(X, F);
console.log('Testing candidate keys...');
console.log('CK:');
test_output(candidate_keys, expected_candidate_keys);
console.log(candidate_keys);


/*Eliminate redundancy in the left hand side.The fd CD→Aisreplaced by C
→A. This is becauseC→D∈(F′)+,hence C→CD∈(F′)+;from C→CD∈(F′)+and CD→
A∈F′,bytransitivity,wehav eC→A∈(F′)+and henceCD→Ashould be replaced by C→
A. Similarly,CD→Bis replaced by C→B, AE→Cisreplaced by A→C. F′=
{C→A, C→B, C→D, D→E, D→H, A→C, B→D}after step (2).
*/

/**
 * Tests for Bernstein's Algorithm
 */
/*
 Example from lecture slides
This e
xample sho
ws the need for steps 1, 3 and 4.GivenR(ABCDE) and F = {A→B, A→C, C→A, BD→E}.
Step 1.{A→BC, C→A, BD→E}.
Step 2.R1(ABC),R2(CA),R3(BDE)
Step 3.R1(ABC),R3(BDE)
Step 4.R1(ABC),R3(BDE) and R4(AD)
*/

 // Set of attributes
 var X = ['A','B','C','D','E'];

 // Set of functional dependencies
 var F = [
    [['A'], ['B']],
    [['A'], ['C']],
    [['C'], ['A']],
    [['B', 'D'], ['E']]
 ];

 var expected_set_one = [
    [['A'], ['B', 'C']],
    [['C'], ['A']],
    [['B', 'D'], ['E']]
 ];

var expected_bernstein_two = [
   ['A', 'B', 'C'],
   ['C', 'A'],
   ['B', 'D', 'E']
];

var expected_bernstein_three = [
   ['A', 'B', 'C'],
   ['B', 'D', 'E']
];

var expected_bernstein_four = [
   ['A', 'B', 'C'],
   ['B', 'D', 'E'],
   ['A', 'D']
];

 console.log('X:');
 console.log(X);
 console.log('F:');
 console.log(F);

console.log('Testing bernstein step one...');
var bernstein_one = combine_lhs(F);
console.log('bernstein_one:');
test_output(bernstein_one, expected_set_one);
console.log(bernstein_one);

console.log('Testing bernstein step two...');
var bernstein_two = decompose_fds_to_relations(bernstein_one);
console.log('bernstein_two:');
test_output(bernstein_two, expected_bernstein_two);
console.log(bernstein_two);

console.log('Testing bernstein step three...');
var bernstein_three = remove_redundant_relations(bernstein_two);
console.log('bernstein_three:');
test_output(bernstein_three, expected_bernstein_three);
console.log(bernstein_three);

console.log('Testing bernstein step four...');
var bernstein_four = bernstein(X,F);
console.log('bernstein_four:');
test_output(bernstein_four, expected_bernstein_four);
console.log(bernstein_four);

/**
 * Tests for BCNF's Algorithm
 */
/*
 Example from lecture slides
Let R = R(ABCDEGH) and F = {B→E,B→H, E→A, E→D, AH→C}. The decomposition according
to the given algorithm is as follows:
*/

 // Set of attributes
 var X = ['A','B','C','D','E', 'G', 'H'];

 // Set of functional dependencies
 var F = [
    [['B'], ['E']],
    [['B'], ['H']],
    [['E'], ['A']],
    [['E'], ['D']],
    [['A', 'H'], ['C']],
 ];

 var expected_bcnf_one = [
    [['B'], ['E', 'H']],
    [['E'], ['A', 'D']],
    [['A', 'H'], ['C']]
 ];

var expected_bcnf_two = [
   ['A', 'H', 'C'],
   ['E', 'A', 'D'],
   ['B', 'E', 'H'],
   ['B', 'G']
];


console.log('X:');
console.log(X);
console.log('F:');
console.log(F);

console.log('Testing bcfn step one...');
var bcfn_one = combine_lhs(F);
console.log('bcfn_one:');
test_output(bcfn_one, expected_bcnf_one);
console.log(bcfn_one);

console.log('Testing bcfn step two...');
var bcfn_two = bcnf(X,F)
console.log('bcfn_two:');
test_output(bcfn_two, expected_bcnf_two);
console.log(bcfn_two);
