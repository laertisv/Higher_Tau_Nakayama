/* Initial declarations */
let cy;

let currentAlgebra;

let previousPair=[];
let chosenRigid = [];
let chosenSupport = [];
let possibleMutations = [];

/* Styling of graph */
var init_style = [
  {
      selector: 'node',
      style: {
          
      }
  },
  {
      selector: '.ClusterTiltingSummand',
      style: {
        'background-color': 'gray',
        'opacity':.8,
      }
  },
  {
      selector: '.ClusterTiltingSummand:selected',
      css: {
          'border-width': 3,
          'border-color': 'black',
      }
  },
  {
      selector: '.notClusterTiltingSummand',
      style: {
        'background-color': 'grey',
        'opacity':.2,
      }
  },
  {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'curve-style': 'bezier',
        'opacity':1,
      }
  },
  {
      selector: '[headType]',
      style: {
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'data(headType)',
      }
  },
  {
      selector: '[lineType]',
      style: {
          'line-style': 'data(lineType)',
      }
  },
  {
      selector: '.noShow',
      style: {
          'opacity':0,
      }
  },
  {
      selector: '.notsupport',
      style: {
          'label':'X',
          'font-weight':'bold',
          'color':'cornflowerblue',
      }
  },
  {
      selector: '.notrigid',
      style: {
          'label':'X',
          'text-background-color': 'gray',
          'text-background-opacity':.3,
          'text-background-shape': 'round-rectangle',
          'text-background-padding':'2px',
          'font-weight':'bold',
          'color':'firebrick',
      }
  },
  {
      selector: '.rigid',
      style: {
          'background-color': 'firebrick',
      }
  },
  {
      selector: '.support',
      style: {
          'background-color': 'cornflowerblue',
      }
  },
  {
      selector: '.neitherrigidnorsupport',
      style: {
          'label':'X',
          'text-background-color': 'black',
          'text-background-opacity':.8,
          'text-background-shape': 'round-rectangle',
          'text-background-padding':'2px',
          'font-weight':'bold',
          'color':'white',
          'background-color': 'grey',
          'opacity':.7,
      }
  },
  {
    selector: '.mutableSummand.rigid',
    style: {
      'border-width': 4,
      'border-color': 'lawngreen ',
      'background-color': 'firebrick',
      'label': '\u2B07 ',
    }
  },
  {
    selector: '.mutableSummand.support',
    style: {
      'border-width': 4,
      'border-color': 'darkorange',
      'background-color': 'cornflowerblue',
      'label': '\u2B07 ',
    }
  },
  {
    selector: '.mutableSummand:selected',
    css: {
        'border-width': 3,
        'border-color': 'black',
    }
},
]

// code 


  function drawARquiver(d,p,l,containerId){
    currentAlgebra = new generateModuleCategory(d,p,l);
    let elmts = {
      nodes : currentAlgebra.modules,
      edges : currentAlgebra.edges
    };
    cy = cytoscape({
        container: document.getElementById(containerId),
        elements: elmts , 
        layout: {
            name:'preset'
        },
        autolock: true,
        selectionType: 'single',
        style: init_style,
        boxSelectionEnabled: false,
        });
    cy.on('select', 'node, edge', e => cy.elements().not(e.target).unselect()); /* Deselect previous selected element, even when shift is pressed. */
    cy.on('select','node', e => selectedSummand(e));
    cy.on('tap', function(event){
        // target holds a reference to the originator
        // of the event (core or element)
        var evtTarget = event.target;
      
        if( evtTarget === cy ){
            tapOnBackground();
        } 
      });   
}

function updateARquiverOnInput(){
  let a = document.forms["menuConstructTaudPairForm"];
  let d_input = Number(a["constructTaudPair_d"].value);
  let p_input = Number(a["constructTaudPair_p"].value);
  let l_input = Number(a["constructTaudPair_l"].value);
  let errBox = document.getElementById("ErrorMessageConstructMenu");
  if (( l_input > 2) && ((p_input%2 == 1) || (d_input%2 == 1))){
      errBox.innerHTML = "For Loewy length larger than 2, both d and p need to be even numbers!";
  } else {
      errBox.innerHTML = "This action will delete the current selection. Proceed anyway?";
      let continueButton = document.getElementById("resetConfirmation");
      let cancelButton = document.getElementById("resetCancel");
      continueButton.hidden = false;
      cancelButton.hidden = false;
      continueButton.onclick = function(){ resetGraph(d_input,p_input,l_input,true); };
      cancelButton.onclick = function(){ resetGraph(d_input,p_input,l_input,false);};
  }
}
function resetGraph(d,p,l,proceed){
  let errBox = document.getElementById("ErrorMessageConstructMenu");
  let continueButton = document.getElementById("resetConfirmation");
  let cancelButton = document.getElementById("resetCancel");
  if (proceed) {
      chosenRigid = [];
      chosenSupport = [];
      possibleMutations = [];
      drawARquiver(d,p,l,'displayDivForARQuiver');
  }
  cancelButton.hidden = true;
  continueButton.hidden = true;
  errBox.innerHTML = "";
  /*tapOnBackground();*/
}

function colorChosenPair(){
  cy.nodes().removeClass('rigid');
  cy.nodes().removeClass('support');
  for (let i in chosenRigid){
    let M = cy.filter('node[id=' + '"' + chosenRigid[i] +'"' + ']');
    M.addClass('rigid');
  }
  for (let i in chosenSupport){
    let P = cy.filter('node[id=' + '"' + chosenSupport[i] +'"' + ']');
    P.addClass('support');
  }
}

function showMutable(){
  cy.nodes().unselectify();
  cy.nodes().removeClass('mutableSummand');
  let mutableNodesId = possibleMutations.map(y => y[2]);
  for (let i in mutableNodesId){
    let M = cy.filter('node[id=' + '"' + mutableNodesId[i] +'"' + ']');
    M.addClass('mutableSummand');
    M.selectify();
  }
}

function MutateAtSummand(rigid,support,undoActive=true){
  previousPair.push([
    [...chosenRigid],[...chosenSupport]
  ]);
  chosenRigid = rigid;
  chosenSupport = support;
  possibleMutations = findPossibleMutations(rigid,support);
  colorChosenPair();
  cy.elements().deselect();
  showMutable();
  tapOnBackground();
  let btnUndoMutate_old = document.getElementById('undoMutateButton');
  let btnUndoMutate = btnUndoMutate_old.cloneNode(true);
  btnUndoMutate_old.parentNode.replaceChild(btnUndoMutate,btnUndoMutate_old);
  if (!undoActive){
    btnUndoMutate.disabled = true;
  } else {
    btnUndoMutate.disabled = false;
    btnUndoMutate.addEventListener('click',function(){
      undoMutation();
    });
  }
  updateDisplayedSummandList();
}


function selectedSummand(evt){
  let node = evt.target;
  let nodeInfo = node.data();
  let new_rigid = possibleMutations.filter(x=> x[2]== nodeInfo.id)[0][0];
  let new_support = possibleMutations.filter(x=> x[2]== nodeInfo.id)[0][1];

  let btnMutate_old = document.getElementById('MutateButton');
  let btnMutate = btnMutate_old.cloneNode(true);
  btnMutate_old.parentNode.replaceChild(btnMutate,btnMutate_old);
  btnMutate.disabled = false;
  btnMutate.addEventListener('click',function(){
    MutateAtSummand(new_rigid,new_support);
  });
}

function tapOnBackground(){
  let btnMutate_old = document.getElementById('MutateButton');
  let btnMutate = btnMutate_old.cloneNode(true);
  btnMutate_old.parentNode.replaceChild(btnMutate,btnMutate_old);
  btnMutate.disabled = true;
}

function undoMutation(){
  let lastModule = previousPair.pop();
  chosenRigid = lastModule[0];
  chosenSupport = lastModule[1];
  possibleMutations = findPossibleMutations(chosenRigid,chosenSupport);
  colorChosenPair();
  cy.elements().deselect();
  showMutable();
  tapOnBackground();
  if (previousPair.length==0){
    let btnUndoMutate_old = document.getElementById('undoMutateButton');
    let btnUndoMutate = btnUndoMutate_old.cloneNode(true);
    btnUndoMutate_old.parentNode.replaceChild(btnUndoMutate,btnUndoMutate_old);
    btnUndoMutate.disabled = true;
  }
}

// Interactions

// Choose own start

function checkIfRigidAndMaximal(rigid,support){
  let notAllowedRigid_temp = new Set();
  let notAllowedSupport_temp = new Set();
  let rigidSet = new Set(rigid);
  let supportSet = new Set(support);
  if (rigidSet.intersection(supportSet).size>0){
      return false
  }
  for (let i in rigid){
      if (!notAllowedRigid_temp.has(rigid[i])){
          notAllowedRigid_temp = notAllowedRigid_temp.union(new Set(currentAlgebra.modules.filter(x=> x.data.id == rigid[i])[0].data.notRigidCompatible));
          notAllowedSupport_temp = notAllowedSupport_temp.union(new Set(currentAlgebra.modules.filter(x=> x.data.id == rigid[i])[0].data.notSupportCompatible));
      } else {
          return false
      }
  }
  for (let i in support){
      if (notAllowedSupport_temp.has(support[i])){
          return false
      }
  }
  if (rigidSet.union(supportSet).size== currentAlgebra.n){
    return true;
  } else {
    return false;
  }
}

function updateDisplayedSummandList(){
  let rigidList = document.getElementById('chooseRigidSummands');
  let rigidList_temp = '';
  let supportList = document.getElementById('chooseSupportSummands');
  let supportList_temp = '';
  for (let i in chosenRigid){
      rigidList_temp = rigidList_temp+chosenRigid[i]+',';
  }
  for (let i in chosenSupport){
      supportList_temp = supportList_temp + chosenSupport[i]+',';
  }
  rigidList.value=rigidList_temp;
  supportList.value=supportList_temp;
}

// Start buttons

function startWithRigid(){
  chosenRigid = [];
  chosenSupport = [];
  MutateAtSummand(currentAlgebra.projectives,[],false);
  previousPair = [];
}

function startWithSupport(){
  chosenRigid = [];
  chosenSupport = [];
  MutateAtSummand([],currentAlgebra.projectives,false);
  previousPair = [];
}

function startWithChosen(){
  let b = document.forms["menuChooseOwnMutationStart"];
  let errBox = document.getElementById('ErrorMessageOwnSelection');
  let rigid_input_temp = b["chooseRigidSummands"].value;
  let support_input_temp = b["chooseSupportSummands"].value;
  let rigid_input = [];
  let support_input = [];
  if (rigid_input_temp){
      rigid_input = rigid_input_temp.split(",").filter(x=>x);
      rigid_input = rigid_input.map(x=>x.trim());
  }
  if (support_input_temp) {
      support_input = support_input_temp.split(",").filter(x=>x);
      rigid_input = rigid_input.map(x=>x.trim());
  }
  let regex = /M-[0-9]+-[0-9]+/i;
  for (let i in rigid_input){
      if (!regex.test(rigid_input[i])){
          errBox.innerHTML = "Input should be a comma-separated list of elements on the form 'M-a-b', where a and b are numbers such that \\( 1\\leq a \\leq b \\leq n \\).";
          MathJax.typeset();
          return;
      }
      if (!currentAlgebra.dctCat.includes(rigid_input[i])){
          errBox.innerHTML = rigid_input[i] + " is not in the d-cluster tilting subcategory";
          return;
      }
  }
  for (let i in support_input){
      if (!regex.test(support_input[i])){
          errBox.innerHTML = "Input should be a comma-separated list of elements on the form 'M-a-b', where a and b are numbers such that \\( 1\\leq a \\leq b \\leq n \\).";
          MathJax.typeset();
          return;
      }
      if (!currentAlgebra.projectives.includes(support_input[i])){
          errBox.innerHTML = support_input[i] + " is not a projective module";
          return;
      }
  }
  if (checkIfRigidAndMaximal(rigid_input,support_input)){
      errBox.innerHTML = "";
      errBox.style.display = "none";
      chosenRigid = rigid_input;
      chosenSupport = support_input;
      chosenRigid = [];
      chosenSupport = [];
      MutateAtSummand(rigid_input,support_input,false);
      tapOnBackground();
  } else {
      errBox.innerHTML = "Selection do not give a \\(\\tau_d\\)-rigid pair with enough summands."; 
      MathJax.typeset();
  }
}