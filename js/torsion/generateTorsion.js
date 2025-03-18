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
            <button id="dropdownButton${i}" class="dropbtn" ${i > 0 ? 'disabled' : ''}>Step ${i+1}</button>
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
    // Update current button text
    const button = document.querySelector(`#dropdownButton${buttonIndex}`);
    button.innerHTML = `\\(${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}\\)`;
    
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
}


  
// Generate graph and populate dropdown
function generateGraph() {
    const l = 3; // Example value
    const d = 2; // Example value
    const p = 4; // Example value
    graph = createGraph(d,l);
    populateDropdownOdd(graph);
}

// Modify the existing updateGraphDropdown function:
function updateGraphDropdown() {
    let d_input = parseInt(document.getElementById("constructTaudPair_d").value, 10);
    let l_input = parseInt(document.getElementById("constructTaudPair_l").value, 10); 
    let p_input = parseInt(document.getElementById("constructTaudPair_p").value, 10);
    
    graph = createGraph(d_input, l_input);
    createSequentialDropdowns(p_input);
    updateDropdownChoices(graph, 0); // Initialize first dropdown
}

/**
 * Populates the dropdown with the odd and both type edges of the graph.
 * @param {Object} graph - The graph object containing nodes and edges.
 */
function populateDropdownOdd(graph) {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.innerHTML = ""; // Clear existing content

    const nodeMap = graph.nodes.reduce((map, node) => {
        map[node.shortName] = node.label;
        return map;
    }, {});

    graph.edges.forEach((edge) => {
        if (edge.type === 'odd' || edge.type === 'both') {
            const edgeOption = document.createElement("a");
            edgeOption.href = "#"; // No actual link, just for UI
            edgeOption.innerHTML = `\\(${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}\\)`; // Use LaTeX
            edgeOption.onclick = function(event) {
                event.preventDefault();  // Prevent page from scrolling up
                changeButtonText(`${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}`); // Change button text on selection
            };
            dropdownContent.appendChild(edgeOption);
        }
    });

    // Trigger MathJax rendering for dropdown items
    if (MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

function populateDropdownEven(graph) {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.innerHTML = ""; // Clear existing content

    const nodeMap = graph.nodes.reduce((map, node) => {
        map[node.shortName] = node.label;
        return map;
    }, {});

    graph.edges.forEach((edge) => {
        if (edge.type === 'even' || edge.type === 'both') {
            const edgeOption = document.createElement("a");
            edgeOption.href = "#"; // No actual link, just for UI
            edgeOption.innerHTML = `\\(${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}\\)`; // Use LaTeX
            edgeOption.onclick = function(event) {
                event.preventDefault();  // Prevent page from scrolling up
                changeButtonText(`${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}`); // Change button text on selection
            };
            dropdownContent.appendChild(edgeOption);
        }
    });

    // Trigger MathJax rendering for dropdown items
    if (MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

/**
 * Changes the button text when an option is selected.
 * @param {string} selectedLabel - The label to display on the button.
 */
function changeButtonText(selectedLabel) {
    const button = document.querySelector(".dropbtn"); // Find the button
    button.innerHTML = `\\(${selectedLabel}\\)`; // Use LaTeX
    if (MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    /**
     * Toggles the visibility of the dropdown.
     */
    function toggleDropdown(event) {
        const dropdownContent = document.getElementById("dropdown-content");
        dropdownContent.classList.toggle("show");
    }

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

    /**
     * Populates the dropdown with the odd and both type edges of the graph.
     * @param {Object} graph - The graph object containing nodes and edges.
     */
    function populateDropdown(graph) {
        const dropdownContent = document.getElementById("dropdown-content");
        dropdownContent.innerHTML = ""; // Clear existing content

        const nodeMap = graph.nodes.reduce((map, node) => {
            map[node.shortName] = node.label;
            return map;
        }, {});

        graph.edges.forEach((edge) => {
            if (edge.type === 'odd' || edge.type === 'both') {
                const edgeOption = document.createElement("a");
                edgeOption.href = "#"; // No actual link, just for UI
                edgeOption.innerHTML = `\\(${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}\\)`; // Use LaTeX
                edgeOption.onclick = function(event) {
                    event.preventDefault();  // Prevent page from scrolling up
                    changeButtonText(`${nodeMap[edge.from]} \\overset{${edge.label}}{\\longrightarrow} ${nodeMap[edge.to]}`); // Change button text on selection
                    toggleDropdown(event); // Close dropdown after selection
                };
                dropdownContent.appendChild(edgeOption);
            }
        });

        // Trigger MathJax rendering for dropdown items
        if (MathJax.typesetPromise) {
            MathJax.typesetPromise();
        }
    }

    /**
     * Changes the button text when an option is selected.
     * @param {string} selectedLabel - The label to display on the button.
     */
    function changeButtonText(selectedLabel) {
    const button = document.querySelector(".dropbtn");
    button.innerHTML = `\\(${selectedLabel}\\)`;
    
    // Ensure MathJax rendering is complete before adding styles
    if (MathJax.typesetPromise) {
        MathJax.typesetPromise().then(() => {
            // Make MathJax elements clickable
            const mathJaxElements = button.getElementsByClassName('MathJax');
            for (let element of mathJaxElements) {
                element.style.pointerEvents = 'none';
            }
        });
    }
}

// Update click handler to use event delegation
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".dropbtn").addEventListener("click", function(event) {
        // Check if click is on button or any of its children
        if (event.currentTarget.contains(event.target)) {
            const dropdownContent = document.getElementById("dropdown-content");
            dropdownContent.classList.toggle("show");
        }
    });
    
});

    // Add event listener to the dropdown button to toggle the dropdown
    document.getElementById("dropdownButton").addEventListener("click", toggleDropdown);

    // Generate the graph and populate dropdown on page load
    window.generateGraph = function() {
        graph = createGraph(2, 3); // Example parameters
        populateDropdown(graph);
    };
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