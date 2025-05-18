let selectedPath = []; // Store the sequence of selected edges

function createGraph(d,l) {
    const graph = {
      nodes: [],
      edges: []
    };
  
    if (l === 2) {
      graph.nodes.push({
        shortName: `DEmpty`,
        label: `\\mathcal{D}^{\\downarrow}(0)`,
        type: 'both'
      });
  
      graph.nodes.push({
        shortName: `DFull`,
        label: `\\mathcal{D}`,
        type: 'both'
      });
      
      graph.edges.push({
        from: `DEmpty`,
        to: `DEmpty`,
        shortName: `g`,
        label: `\\gamma`,
        type: 'both'
      });
  
      graph.edges.push({
        from: `DFull`,
        to: `DFull`,
        shortName: `e`,
        label: `\\epsilon`,
        type: 'both'
      });
  
      graph.edges.push({
        from: `DFull`,
        to: `DEmpty`,
        shortName: `b`,
        label: `\\beta`,
        type: 'both' 
      });
  
      for (let h = 0; h <= d; h++) {
        graph.edges.push({
          from: `DEmpty`,
          to: `DFull`,
          shortName: `d${h}`,
          label: `\\delta_{${h}}`,
          type: 'both'
      });
      }
    } else {
      graph.nodes.push({
        shortName: `DEvenFull`,
        label: `\\mathcal{D}_{2t}`,
        type: 'even'
      });
      
      graph.nodes.push({
        shortName: `DEvenEmpty`,
        label: `\\mathcal{D}_{2t}^{\\downarrow}(0)`,
        type: 'even'
      });
      
      for (let h = 1; h <= l-2; h++) {
        graph.nodes.push({
          shortName: `DEven${h}`,
          label: `\\mathcal{D}^{\\downarrow}_{2t}(${h})`,
          type: 'even'
        });
      }
      
      graph.nodes.push({
        shortName: `DOddFull`,
        label: `\\mathcal{D}_{2t+1}`,
        type: 'odd'
      });
      
      graph.nodes.push({
        shortName: `DOddOne`,
        label: `\\mathcal{D}_{2t+1}^{\\downarrow}(1)`,
        type: 'odd'
      });
      
      graph.nodes.push({
        shortName: `DOddEmpty`,
        label: `\\mathcal{D}_{2t+1}^{\\downarrow}(0)`,
        type: 'odd'
      });
      
      for (let h = 2; h <= l-1; h++) {
        graph.nodes.push({
          shortName: `DOdd${h}`,
          label: `\\mathcal{{D}}_{{2t+1}}^{\\uparrow}(${h})`,
          type: 'odd'
        });
      }
  
      graph.edges.push({
        from: `DEvenFull`,
        to: `DOddFull`,
        shortName: `i-`, // Edge name
        label: `\\iota^{-}`, // LaTeX-style label
        type: 'even'
      });
  
      graph.edges.push({
        from: `DEvenFull`,
        to: `DOddEmpty`,
        shortName: `b-`, // Edge name
        label: `\\beta^{-}`, // LaTeX-style label
        type: 'even'
      });
  
      graph.edges.push({
        from: `DEvenEmpty`,
        to: `DOddEmpty`,
        shortName: `g-`, // Edge name
        label: `\\gamma^{-}`, // LaTeX-style label
        type: 'even'
      });
  
      graph.edges.push({
        from: `DEvenEmpty`,
        to: `DOddOne`,
        shortName: `h-`, // Edge name
        label: `\\eta^{-}`, // LaTeX-style label
        type: 'even'
      });
  
      for (let h = 0; h <= Math.floor((d / 2) * l); h++) {
        graph.edges.push({
          from: `DEvenEmpty`,
          to: `DOddFull`,
          shortName: `k${h}`,
          label: `\\kappa_{${h}}`,
          type: 'even'
        });
      }
  
      for (let h = 2; h < l; h++) {
        graph.edges.push({
          from: `DOdd${h}`,
          to: `DEvenFull`,
          shortName: `e${h}`,
          label: `\\epsilon_{${h}}`,
          type: 'odd'
        });
  
        for (let k = 0; k <= l - h; k++) {
          graph.edges.push({
            from: `DEvenEmpty`,
            to: `DOdd${h}`,
            shortName: `z${h}${k}`,
            label: `\\zeta_{${h},${k}}`,
            type: 'even'
          });
        }
      }
  
      for (let h = 1; h < l - 1; h++) {
        graph.edges.push({
          from: `DEven${h}`,
          to: `DOddOne`,
          shortName: `8${h}`,
          label: `\\theta_{${h}}`,
          type: 'even'
        });
  
        graph.edges.push({
          from: `DEven${h}`,
          to: `DOddEmpty`,
          shortName: `d-${h}`,
          label: `\\delta^{-}_{${h}}`,
          type: 'even'
        });
  
        graph.edges.push({
          from: `DOddEmpty`,
          to: `DEven${h}`,
          shortName: `d${h}`,
          label: `\\delta_{${h}}`,
          type: 'odd'
        });
  
        for (let k = 0; k < l - h; k++) {
          graph.edges.push({
            from: `DEven${h}`,
            to: `DOddFull`,
            shortName: `l${h}${k}`,
            label: `\\lambda_{${h},${k}}`,
            type: 'even'
          });
        }
      }
  
      graph.edges.push({
        from: `DOddOne`,
        to: `DEvenEmpty`,
        shortName: `h`,
        label: `\\eta`,
        type: 'odd'
      });
  
      graph.edges.push({
        from: `DOddFull`,
        to: `DEvenFull`,
        shortName: `i`,
        label: `\\iota`,
        type: 'odd'
      });
  
      graph.edges.push({
        from: `DOddEmpty`,
        to: `DEvenEmpty`,
        shortName: `g`,
        label: `\\gamma`,
        type: 'odd'
      });
  
      for (let h = 0; h <= Math.floor(((d - 2) / 2) * l + 2); h++) {
        graph.edges.push({
          from: `DOddEmpty`,
          to: `DEvenFull`,
          shortName: `b${h}`,
          label: `\\beta_{${h}}`,
          type: 'odd'
        });
      }
  
      if (d === 2) {
        for (let h = 1; h < l - 2; h++) {
          for (let k = 2; k < l - h; k++) {
            for (let m = 0; m < l - (h + k); m++) {
              graph.edges.push({
                from: `DEven${h}`,
                to: `DOdd${k}`,
                shortName: `m${h}${m}${k}`, // Edge name
                label: `\\mu_{${h},${m}}^{${k}}`, // LaTeX-style label
                type: 'even'
              });
            }
          }
        }
      }
    }
    return graph;
  }

  function createSequentialDropdowns(p) {
    const container = document.getElementById("sequential-dropdowns");
    container.innerHTML = ""; // Clear existing dropdowns
    
    // Create p-1 dropdowns
    for (let i = 0; i < p-1; i++) {
        const dropdownDiv = document.createElement("div");
        dropdownDiv.className = "dropdown";
        dropdownDiv.innerHTML = `
            <button id="dropdownButton${i}" class="dropbtn" ${i > 0 ? 'disabled' : ''}>Arrow ${i+1}</button>
            <div id="dropdown-content${i}" class="dropdown-content"></div>
        `;
        container.appendChild(dropdownDiv);
    }
}

function updateDropdownChoices(graph, buttonIndex, currentNode = null) {
    const dropdownContent = document.getElementById(`dropdown-content${buttonIndex}`);
    dropdownContent.innerHTML = "";
    
    const nodeMap = graph.nodes.reduce((map, node) => {
        map[node.shortName] = node.label;
        return map;
    }, {});
    
    graph.edges.forEach((edge) => {
        // Only show edges that start from the current node
        if (currentNode && edge.from !== currentNode) return;
        
        // For even-numbered steps (0-based), show odd/both edges
        // For odd-numbered steps, show even/both edges
        const isEvenStep = buttonIndex % 2 === 0;
        if ((isEvenStep && (edge.type === 'odd' || edge.type === 'both')) ||
            (!isEvenStep && (edge.type === 'even' || edge.type === 'both'))) {
            
            const edgeOption = document.createElement("a");
            edgeOption.href = "#";
            edgeOption.innerHTML = `\\(${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}\\)`;
            edgeOption.onclick = function(event) {
                event.preventDefault();
                selectChoice(buttonIndex, edge, nodeMap);
            };
            dropdownContent.appendChild(edgeOption);
        }
    });
    
    if (MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

function selectChoice(buttonIndex, edge, nodeMap) {
    // Store the selected edge
    selectedPath[buttonIndex] = edge;

    // Update current button text
    const button = document.querySelector(`#dropdownButton${buttonIndex}`);
    button.innerHTML = `\\(${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}\\)`;
    
    // Disable all previous buttons
    for (let i = 0; i < buttonIndex; i++) {
        const prevButton = document.querySelector(`#dropdownButton${i}`);
        prevButton.disabled = true;
        // Add disabled class to MathJax elements
        prevButton.querySelectorAll('.MathJax').forEach(element => {
          element.classList.add('disabled-math');
        });
    }
    
    // Enable next button if it exists
    const nextButton = document.querySelector(`#dropdownButton${buttonIndex + 1}`);
    if (nextButton) {
        nextButton.removeAttribute('disabled');
        // Update choices for next dropdown
        updateDropdownChoices(graph, buttonIndex + 1, edge.to);
    }
    
    // Close current dropdown
    document.getElementById(`dropdown-content${buttonIndex}`).classList.remove('show');
    
    if (MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }

    // Add event listener to the buttons children to toggle the dropdown
    for (let element of button.children){
        element.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event bubbling
            button.nextElementSibling.classList.toggle('show');
        });
    }
}

// Add reset functionality
function resetDropdowns() {
    selectedPath = []; // Clear the stored path

    // Reset dropdowns
    const p = parseInt(document.getElementById("constructTaudPair_p").value, 10);
    createSequentialDropdowns(p);
    updateDropdownChoices(graph, 0);

    // Clear torsion class display
    cy.nodes().removeClass("torsion");
    cy.nodes().addClass("notchosen");
    torsionModules = [];
    
    // Clear path description
    const textDiv = document.getElementById('torsionClassDescription');
    const pathDiv = document.getElementById('thePath');
    if (textDiv) textDiv.innerHTML = '';
    if (pathDiv) pathDiv.innerHTML = '';
}


  
// Generate graph and populate dropdown
function generateGraph() {
    const l = 3; // Initial value
    const d = 2; // Initial value
    const p = 4; // Initial value
    graph = createGraph(d, l);
    createSequentialDropdowns(p);
    updateDropdownChoices(graph, 0); // Initialize first dropdown
}



// Generate the graph and populate dropdown on page load
document.addEventListener("DOMContentLoaded", function() {
    generateGraph()
});

// Add event delegation for dropdown toggles
document.addEventListener("click", function(event) {
    if (event.target.classList.contains('dropbtn') && !event.target.hasAttribute('disabled')) {
        const dropdownContent = event.target.nextElementSibling;
        dropdownContent.classList.toggle('show');
        
        // Close other dropdowns
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let dropdown of dropdowns) {
            if (dropdown !== dropdownContent && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    } 
});
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};


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

function updateAllVerification(){
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
        continueButton.onclick = function(){ updateAll(d_input,p_input,l_input,true); };
        cancelButton.onclick = function(){ updateAll(d_input,p_input,l_input,false);};
    }
}

// Add this new combined update function
function updateAll(d,p,l,proceed) {
    let errBox = document.getElementById("ErrorMessageConstructMenu");
    let continueButton = document.getElementById("resetConfirmation");
    let cancelButton = document.getElementById("resetCancel");
    if (proceed) {
        // Update the graph dropdown
        graph = createGraph(d, l);
        createSequentialDropdowns(p);
        updateDropdownChoices(graph, 0);
    
        // Update the AR quiver
        drawARquiver(d, p, l, "displayDivForARQuiver");
    }
    cancelButton.hidden = true;
    continueButton.hidden = true;
    errBox.innerHTML = "";
}

function calculateBase(nodeIndex, d, l) {
    if (nodeIndex % 2 === 1) { // odd index
        return (nodeIndex - 1) * ((d - 1) / 2) * l + nodeIndex;
    } else { // even index
        return (nodeIndex - 1) * (((d - 1) / 2) * l + 1) + l / 2;
    }
}

function processNode(nodeName, nodeIndex, d, l) {
    const base = calculateBase(nodeIndex, d, l);

    const modules = [];

    if (nodeName === 'DEmpty') {
        return []; // Don't add any modules
    }
    
    if (nodeName === 'DFull') {
        return [`M-${base}-${base}`];
    }

    if (nodeIndex % 2 === 1) { // Odd index
        if (nodeName === 'DOddOne') {
            return [`M-${base}-${base}`];
        }
        if (nodeName === 'DOddFull') {
            for (let i = 0; i < l-1; i++)
            {
                modules.push(`M-${base}-${base+i}`);
            }
            return modules;
        }
        const match = nodeName.match(/^DOdd(\d+)$/);
        if (match) {
            const h = parseInt(match[1]);
            for (let i = h-1; i < l-1; i++)
                {
                    modules.push(`M-${base}-${base+i}`);
                }
                return modules;
        }
    } else { // Even index
        if (nodeName === 'DEvenFull') {
            for (let i = 0; i < l-1; i++)
            {
                modules.push(`M-${base-i}-${base}`);
            }
            return modules;
        }
        const match = nodeName.match(/^DEven(\d+)$/);
        if (match) {
            const h = parseInt(match[1]);
            for (let i = 0; i < h; i++)
            {
                modules.push(`M-${base-i}-${base}`);
            }
            return modules;
        }
    }
    
    return [];
}

function processEdge(edge, position, d, l) {
    const modules = [];
    const name = edge.shortName;
    const startingBase = calculateBase(position, d, l);
    const endingBase = calculateBase(position + 1, d, l);

    // Special case for l=2
    if (l === 2) {
        const maxNumber = d;
        if (name === 'e') {
            for (let j = 0; j < maxNumber; j++) {
                modules.push(`M-${startingBase + j}-${startingBase + (l - 1) + j}`);
            }
            return modules;
        }
        const matchD = name.match(/^d(\d+)$/);
        if (matchD) {
            const h = parseInt(matchD[1]);
            for (let j = 0; j < h; j++) {
                modules.push(`M-${endingBase - (l - 1) - j}-${endingBase - j}`);
            }
            return modules;
        }
        return [];
    }

    if (position % 2 === 1) {
        const maxNumber = Math.floor(((d - 2) / 2) * l + 2);
        
        const matchE = name.match(/^e(\d+)$/);
        if (matchE) {
            for (let j = 0; j < maxNumber; j++) {
                modules.push(`M-${startingBase + j}-${startingBase + (l - 1) + j}`);
            }
            return modules;
        }
        
        if (name === 'i') {
            for (let j = 0; j < maxNumber; j++) {
                modules.push(`M-${startingBase + j}-${startingBase + (l - 1) + j}`);
            }
            return modules;
        }
        
        const matchB = name.match(/^b(\d+)$/);
        if (matchB) {
            const h = parseInt(matchB[1]);
            for (let j = 0; j < h; j++) {
                modules.push(`M-${endingBase - (l - 1) - j}-${endingBase - j}`);
            }
            return modules;
        }
    } else {
        const maxNumber = Math.floor((d / 2) * l);
        
        if (name === 'i-') {
            for (let j = 0; j < maxNumber; j++) {
                modules.push(`M-${startingBase - (l - 1) + 1 + j}-${startingBase + 1 + j}`);
            }
            return modules;
        }
        
        const matchK = name.match(/^k(\d+)$/);
        if (matchK) {
            const h = parseInt(matchK[1]);
            for (let j = 0; j < h; j++) {
                modules.push(`M-${endingBase - 1 - j}-${endingBase - 1 + (l - 1) - j}`);
            }
            return modules;
        }
        
        const matchZ = name.match(/^z(\d+)(\d+)$/);
        if (matchZ) {
            const h = parseInt(matchZ[1]);
            const k = parseInt(matchZ[2]);
            if (h >= 2 && k <= l - h) {
                for (let j = 0; j < k; j++) {
                    modules.push(`M-${endingBase - 1 - j}-${endingBase - 1 + (l - 1) - j}`);
                }
                return modules;
            }
        }
        const matchL = name.match(/^l(\d+)(\d+)$/);
        if (matchL) {
            const h = parseInt(matchL[1]);
            const k = parseInt(matchL[2]);
            if (h >= 1 && h < l - 1 && k < l - h) {
                for (let j = 0; j < maxNumber - (l - 1) + (h+k); j++) {
                    modules.push(`M-${endingBase - 1 - j}-${endingBase - 1 + (l - 1) - j}`);
                }
                return modules;
            }
        }
        if (d === 2) {
            const matchM = name.match(/^m(\d+)(\d+)(\d+)$/);
            if (matchM) {
                const h = parseInt(matchM[1]);
                const m = parseInt(matchM[2]);
                const k = parseInt(matchM[3]);
                if (h >= 1 && h < l - 2 && k >= 2 && k < l - h && m < l - (h + k)) {
                    for (let j = 0; j < maxNumber - (l - 1) + (h + m); j++) {
                        modules.push(`M-${endingBase - 1 - j}-${endingBase - 1 + (l - 1) - j}`);
                    }
                    return modules;
                }
            }
        }
    }
    
    return modules;
}

// Add new function to process the selected path
function updateTorsionClass() {
    if (selectedPath.length === 0) {
        console.log("Please select a path first");
        return;
    }
    
    const d = parseInt(document.getElementById("constructTaudPair_d").value);
    const l = parseInt(document.getElementById("constructTaudPair_l").value);
    

   // Process each node in the path
   selectedPath.forEach((edge, index) => {
    const nodeModules = processNode(edge.from, index + 1, d, l);
    const edgeModules = processEdge(edge, index + 1, d, l);
    torsionModules = [...torsionModules, ...nodeModules, ...edgeModules];
});

// Add the last node in the path
const lastEdge = selectedPath[selectedPath.length - 1];
const lastNodeModules = processNode(lastEdge.to, selectedPath.length + 1, d, l);
torsionModules = [...torsionModules, ...lastNodeModules];
    
    
    // Update the display
    addTorsionClass();

    // Create nodeMap to map shortNames to labels
    const nodeMap = graph.nodes.reduce((map, node) => {
        map[node.shortName] = node.label;
        return map;
    }, {});
    
    // Create path description with proper LaTeX notation
    let pathText = `\\text{This is the }${d}\\text{-torsion class corresponding to the path:}`;
    let pathDescription = '';
    
    // Add first node
    if (selectedPath.length > 0) {
        pathDescription += nodeMap[selectedPath[0].from];
    }
    
    // Add arrows and subsequent nodes
    selectedPath.forEach((edge, index) => {
        pathDescription += ` \\xrightarrow{${edge.label}} ${nodeMap[edge.to]}`;
    });
    
    pathDescription += "."; // Add fullstop

    // Update the description divs
    const textDiv = document.getElementById('torsionClassDescription');
    const pathDiv = document.getElementById('thePath');
    textDiv.innerHTML = `\\(${pathText}\\)`;
    pathDiv.innerHTML = `\\[${pathDescription}\\]`; // Using display math mode for better centering
    
    // Render math
    if (MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

function addTorsionClass() {
    cy.nodes().removeClass("torsion");
    cy.nodes().addClass("notchosen");
    
    for (let i in torsionModules) {
        let M = cy.filter('node[id=' + '"' + torsionModules[i] + '"' + ']');
        M.addClass("torsion");
        M.removeClass('notchosen');
    }
}
