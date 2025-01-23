
function drawARquiver(d,p,l,containerId,chosenPair){
    cy = cytoscape({
        container: document.getElementById(containerId),
        elements:  generateGraphElements(d,p,l,chosenPair), 
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
    cy.cxtmenu( menuNotProjectiveNotChosen );
    cy.cxtmenu( menuProjectiveNotChosen );
    cy.cxtmenu( menuProjectiveNotRigidSelectable );
    cy.cxtmenu( menuProjectiveNotSupportSelectable );
    cy.cxtmenu( menuNotProjectiveNotRigidSelectable );
    cy.cxtmenu( menuProjectiveNotSupportNotRigidSelectable );

    let displayNumberSummands = document.getElementById('numberSimplesAlgebra');
    displayNumberSummands.innerHTML = nakayamaAlgebra.n;
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
        notAllowedRigid = [];
        notAllowedSupport = [];
        drawARquiver(d,p,l,'displayDivForARQuiver');
    }
    cancelButton.hidden = true;
    continueButton.hidden = true;
    errBox.innerHTML = "";
    tapOnBackground();
    toggleEdgeView();
}

function updateSelectionOnUserInput(){
    let b = document.forms["menuChooseWithInput"];
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
        support_input = support_input.map(x=>x.trim());
    }
    let regex = /M-[0-9]+-[0-9]+/i;
    for (let i in rigid_input){
        if (!regex.test(rigid_input[i])){
            errBox.innerHTML = "Input should be a comma-separated list of elements on the form 'M-a-b', where a and b are numbers such that \\( 1\\leq a \\leq b \\leq n \\).";
            MathJax.typeset();
            return;
        }
        if (!nakayamaAlgebra.dctModules.includes(rigid_input[i])){
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
        if (!nakayamaAlgebra.projectives.includes(support_input[i])){
            errBox.innerHTML = support_input[i] + " is not a projective module";
            return;
        }
    }
    if (checkIfRigid(rigid_input,support_input)){
        errBox.innerHTML = "";
        chosenRigid = rigid_input;
        chosenSupport = support_input;
        updateNotAllowed(chosenRigid,chosenSupport);
        addClassWhenAddRigidOrSupport();
        tapOnBackground();
    } else {
        errBox.innerHTML = "Selection do not give a \\(\\tau_d\\)-rigid pair."; 
        MathJax.typeset();
    }
}


function toggleEdgeView(){
    let b = document.forms["menuConstructTaudPairForm"];
    let edgesVisible = b["edgeShow"];
    let c = cy.filter('edge');
    c.removeClass('noShow');
    if (!(edgesVisible.checked)) {
        c.addClass('noShow');
    }
}

function addClassWhenAddRigidOrSupport(){
    cy.nodes().removeClass("notrigid");
    cy.nodes().removeClass("notsupport");
    cy.nodes().removeClass("rigid");
    cy.nodes().removeClass("support");
    cy.nodes().addClass("notchosen");
    cy.nodes().removeClass('neitherrigidnorsupport');
    for (let i in notAllowedRigid){
        let M = cy.filter('node[id=' + '"' + notAllowedRigid[i] +'"' + ']');
        M.addClass('notrigid');
        M.removeClass('notchosen');
    }
    for (let i in notAllowedSupport) {
        let P = cy.filter('node[id=' + '"' + notAllowedSupport[i] +'"' + ']');
        P.removeClass('notchosen');
        if (notAllowedRigid.includes(notAllowedSupport[i])){
            P.removeClass('notrigid');
            P.addClass('neitherrigidnorsupport');
        } else {
            P.addClass('notsupport');
        }
    }
    for (let i in chosenRigid){
        let M = cy.filter('node[id=' + '"' + chosenRigid[i] +'"' + ']');
        M.addClass("rigid");
        M.removeClass('notchosen');
    }
    for (let i in chosenSupport){
        let P = cy.filter('node[id=' + '"' + chosenSupport[i] +'"' + ']');
        P.addClass("support");
        P.removeClass('notchosen');
    }
}

function addRigid(node){
    chosenRigid.push(node.data().id)
    updateNotAllowed(chosenRigid,chosenSupport);
    addClassWhenAddRigidOrSupport();
    node_temp = node;
    node.unselect();
    node_temp.select();
}

function addSupport(node){
    chosenSupport.push(node.data().id);
    updateNotAllowed(chosenRigid,chosenSupport);
    addClassWhenAddRigidOrSupport();
    node_temp = node;
    node.unselect();
    node_temp.select();
}

function removeRigid(node) {
    chosenRigid=chosenRigid.filter(x=>x!==node.id());
    updateNotAllowed(chosenRigid,chosenSupport);
    addClassWhenAddRigidOrSupport();
    node_temp = node;
    node.unselect();
    node_temp.select();
}

function removeSupport(node) {
    chosenSupport=chosenSupport.filter(x=>x!==node.id());
    updateNotAllowed(chosenRigid,chosenSupport);
    addClassWhenAddRigidOrSupport();
    node_temp = node;
    node.unselect();
    node_temp.select();
}

function tapOnBackground(){
    /* Find text fields */
    let printName = document.getElementById('addSumModuleSelected');
    let printIsProjective = document.getElementById('addSumModuleProjective');
    let printTaud = document.getElementById('addSumModuledARtranslate');
    /* Find buttons and reset their events*/
    var addRigidButton_old = document.getElementById('addSummandToRigid');
    var addRigidButton = addRigidButton_old.cloneNode(true);
    addRigidButton_old.parentNode.replaceChild(addRigidButton,addRigidButton_old);

    var addSupportButton_old = document.getElementById('addSummandToSupport');
    var addSupportButton = addSupportButton_old.cloneNode(true);
    addSupportButton_old.parentNode.replaceChild(addSupportButton,addSupportButton_old);

    let removeButton_old = document.getElementById('RemoveSummand');
    let removeButton = removeButton_old.cloneNode(true);
    removeButton_old.parentNode.replaceChild(removeButton,removeButton_old);

    /* Remove previous interactions */
    printName.innerHTML = "No module selected";
    printIsProjective.innerHTML = "";
    printTaud.innerHTML = "";
    addRigidButton.disabled=true;
    addSupportButton.disabled=true;
    removeButton.disabled=true;
    addRigidButton.title="";
    addSupportButton.title="";
    removeButton.title="";

    cy.remove('edge[id="taud"]');
    cy.remove('edge[id="taudInv"]');
    cy.elements().unselect();
}

function selectedSummand(evt) {
    let node = evt.target;
    let nodeInfo = node.data();
    /* Find text fields */
    let printName = document.getElementById('addSumModuleSelected');
    let printIsProjective = document.getElementById('addSumModuleProjective');
    let printTaud = document.getElementById('addSumModuledARtranslate');
    /* Find buttons and reset their events*/
    let addRigidButton_old = document.getElementById('addSummandToRigid');
    let addRigidButton = addRigidButton_old.cloneNode(true);
    addRigidButton_old.parentNode.replaceChild(addRigidButton,addRigidButton_old);

    let addSupportButton_old = document.getElementById('addSummandToSupport');
    let addSupportButton = addSupportButton_old.cloneNode(true);
    addSupportButton_old.parentNode.replaceChild(addSupportButton,addSupportButton_old);

    let removeButton_old = document.getElementById('RemoveSummand');
    let removeButton = removeButton_old.cloneNode(true);
    removeButton_old.parentNode.replaceChild(removeButton,removeButton_old);


    /* Print text */
    printName.innerHTML = "M("+nodeInfo.socle+","+nodeInfo.top+")";;
    if (nodeInfo.isProjective){
        printIsProjective.innerHTML = 'P'+nodeInfo.top;
    } else {
        printIsProjective.innerHTML = 'Not projective';
    }
    let nodeTaud = nodeInfo.taud;
    if (nodeInfo.isProjective){
        printTaud.innerHTML = 0;
    } else {
        printTaud.innerHTML = "M("+nodeTaud[0]+","+nodeTaud[1]+")";
    };

    /* Add functions */
    if ( chosenRigid.includes(node.id())){
        addRigidButton.disabled = true;
        addSupportButton.disabled = true;
        addRigidButton.title = "Already chosen";
        addSupportButton = "Already chosen";
        removeButton.disabled =false;
        removeButton.title = "Remove summand from M";
        removeButton.addEventListener('click',function(){
            removeRigid(node)
        });
    } else if (chosenSupport.includes(node.id())){
        addRigidButton.disabled = true;
        addSupportButton.disabled = true;
        addRigidButton.title = "Already chosen";
        addSupportButton = "Already chosen";
        removeButton.disabled =false;
        removeButton.title = "Remove summand from P";
        removeButton.addEventListener('click',function(){
            removeSupport(node)
        });
    } else {
        removeButton.disabled = true;
        removeButton.title = "";
        if ((!notAllowedRigid.includes(node.id())) ){
            addRigidButton.addEventListener('click',function(){
                addRigid(node);
            });
            addRigidButton.disabled=false;
            addRigidButton.title ="Add summand to M";
        } else {
            addRigidButton.disabled=true;
            addRigidButton.title = "This summand can't be added while preserving tau_d-rigidity.";
        }
        if (  (nodeInfo.isProjective) && ( !notAllowedSupport.includes(node.id()) )  ) {
            addSupportButton.addEventListener('click',function(){
                addSupport(node);
            });
            addSupportButton.disabled=false;
            addSupportButton.title="Add summand to P";
        } else {
            addSupportButton.disabled=true;
            addSupportButton.title="This projective summands is in the support of M.";
        }
    }
    toggleARdTranslate(nodeInfo);
    
}

function toggleARdTranslate(nodeInfo){
    cy.remove('edge[id="taud"]');
    cy.remove('edge[id="taudInv"]');
    if (!(nodeInfo.taud==0)){
        let targetNode =   "M-" + nodeInfo.taud[0] + "-" + nodeInfo.taud[1] ;
        cy.add(
            {
                group: 'edges', 
                data: {
                    id: 'taud', 
                    target: targetNode, 
                    source: nodeInfo.id, 
                    selectable: false,
                },
                classes: ['taudArrow'],
            }
        );
    }
    if (!(nodeInfo.taudInverse==0)){
        let sourceNode =   "M-" + nodeInfo.taudInverse[0] + "-" + nodeInfo.taudInverse[1] ;
        cy.add(
            {
                group: 'edges', 
                data: {
                    id: 'taudInv', 
                    source: sourceNode, 
                    target: nodeInfo.id, 
                    selectable: false,
                },
                classes: ['taudArrow'],
            }
        );
    }

}



function updateNotAllowed(chosenRigid,chosenSupport){
    let notAllowedRigid_temp = [];
    let notAllowedSupport_temp = [];
    let numberChosen = document.getElementById('sumOfChosenSummands');
    numberChosen.innerHTML = chosenRigid.length+chosenSupport.length;
    updateDisplayedSummandList();
    for (let i in chosenRigid){
        let idKey = chosenRigid[i];
        let M = nakayamaAlgebra.modules.find(m => m.id == idKey);
        notAllowedRigid_temp.push(... M.notRigidCompatible);
        notAllowedSupport_temp.push(... M.notSupportCompatible);
    }
    for (let i in chosenSupport){
        let idKey = chosenSupport[i];
        let P = nakayamaAlgebra.modules.find(m => m.id == idKey);
        notAllowedRigid_temp.push(... P.isSupportOf);
    }
    notAllowedRigid = [...new Set(notAllowedRigid_temp)];
    notAllowedSupport = [...new Set(notAllowedSupport_temp)];
}

function checkIfMaximal(algebra,chosenRigid,chosenSupport,notAllowedRigid,notAllowedSupport){
    let dCtSubcat = algebra.modules.filter(x=> x.isDCT);
    let modules = new Set(dCtSubcat.map(x=>x.id));
    let concatenatedArray = [...chosenRigid];
    concatenatedArray.push(... chosenSupport);
    concatenatedArray.push(... notAllowedRigid);
    concatenatedArray.push(... notAllowedSupport);
    for (let i in concatenatedArray){
        modules.delete(concatenatedArray[i]);
    }
    return modules;
}

function checkIfRigid(rigid,support){
    let notAllowedRigid_temp = new Set();
    let notAllowedSupport_temp = new Set();
    let rigidSet = new Set(rigid);
    let supportSet = new Set(support);
    if (rigidSet.intersection(supportSet).size>0){
        return false
    }
    for (let i in rigid){
        if (!notAllowedRigid_temp.has(rigid[i])){
            notAllowedRigid_temp = notAllowedRigid_temp.union(new Set(nakayamaAlgebra.modules.filter(x=> x.id == rigid[i])[0].notRigidCompatible));
            notAllowedSupport_temp = notAllowedSupport_temp.union(new Set(nakayamaAlgebra.modules.filter(x=> x.id == rigid[i])[0].notSupportCompatible));
        } else {
            return false
        }
    }
    for (let i in support){
        if (notAllowedSupport_temp.has(support[i])){
            return false
        }
    }
    return true;
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