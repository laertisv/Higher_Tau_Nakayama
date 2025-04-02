/* Initial declarations */
let showEdges = true;

let nakayamaAlgebra = {};
let cy;





let init_d = 2;
let init_p = 4;
let init_l = 3;

let chosenRigid = [];
let chosenSupport = [];
let notAllowedRigid = [];
let notAllowedSupport = [];
let torsionModules = [];

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
          'curve-style': 'bezier',
          'opacity':1,
        }
    },
    {
        selector: '[headType]',
        style: {
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'data(headType)',
            'line-color': '#ccc',
        }
    },
    {
        selector: '[lineType]',
        style: {
            'line-style': 'data(lineType)',
            'line-color': '#ccc',
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
            'label':'\u2297',
            'font-weight':'bold',
            'font-size':30,
            'color':'cornflowerblue',
        }
    },
    {
        selector: '.notrigid',
        style: {
            'label':'\u00D7',
            'font-size':30,
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
        selector: '.torsion',
        style: {
            'background-color': 'forestgreen',
        }
    },
    {
        selector: '.neitherrigidnorsupport',
        style: {
            'label':'\u22A0',
            'font-weight':'bold',
            'color':'black',
            'font-size':30,
        }
    },
    {
        selector: '.taudArrow',
        style: {
            'line-color':'green',
            'target-arrow-color': 'green',
            'target-arrow-shape': 'triangle',
        }
    },
]

/* Context menu */

class makeInteractiveMenu {
    constructor(addM=true,addP=true,selectors) {
        this.menuRadius = function(ele){ return 80; }; 
        this.selector = selectors; // elements matching this Cytoscape.js selector will trigger cxtmenus
        this.commands = []; 
        if (addM) {
            this.commands.push(
                {
                    fillColor: 'rgba(178,34,34,0.75)',
                    content: 'Add to M',
                    select: function(ele) {
                    addRigid(ele);
                    },
                    enabled: true,
                }
            );
        } else {
            this.commands.push(
                {
                    fillColor: 'rgba(178,34,34,0.25)',
                    content: 'Add to M',
                    select: function(ele) {
                    addRigid(ele);
                    },
                    enabled: false,
                }
            );
        }
        if (addP) {
            this.commands.push(
                {
                    fillColor: 'rgba(100,149,237,0.75)',
                    content: 'Add to P',
                    select: function(ele) {
                        addSupport(ele);
                    },
                    enabled: true,
                }
            );
        } else {
            this.commands.push(
                {
                    fillColor: 'rgba(100,149,237,0.25)',
                    content: 'Add to P',
                    select: function(ele) {
                        addSupport(ele);
                    },
                    enabled: false,
                }
            );
        }
        this.fillColor = 'rgba(0, 0, 0, 0.5)'; // the background colour of the menu
        this.activeFillColor = 'rgba(0, 0, 0, 0.5)'; // the colour used to indicate the selected command
        this.activePadding = 20; // additional size in pixels for the active command
        this.indicatorSize = 24; // the size in pixels of the pointer to the active command, will default to the node size if the node size is smaller than the indicator size, 
        this.separatorWidth = 3; // the empty spacing in pixels between successive commands
        this.spotlightPadding = 4; // extra spacing in pixels between the element and the spotlight
        this.adaptativeNodeSpotlightRadius = false; // specify whether the spotlight radius should adapt to the node size
        this.minSpotlightRadius = 24; // the minimum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
        this.maxSpotlightRadius = 38; // the maximum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
        this.openMenuEvents = 'cxttapstart taphold'; // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
        this.itemColor = 'white'; // the colour of text in the command's content
        this.itemTextShadowColor = 'transparent'; // the text shadow colour of the command's content
        this.zIndex = 9999; // the z-index of the ui div
        this.atMouse = false; // draw menu at mouse position
        this.outsideMenuCancel = true; // if set to a number, this will cancel the command if the pointer is released outside of the spotlight, padded by the number given 
    }
}

let menuNotProjectiveNotChosen = new makeInteractiveMenu(true,false,'.ClusterTiltingSummand.notchosen.notprojective');
let menuProjectiveNotChosen = new makeInteractiveMenu(true,true,'.ClusterTiltingSummand.notchosen.projective');
let menuNotProjectiveNotRigidSelectable = new makeInteractiveMenu(false,false,'.ClusterTiltingSummand.notrigid.notprojective');
let menuProjectiveNotSupportSelectable = new makeInteractiveMenu(true,false,'.ClusterTiltingSummand.notsupport.projective');
let menuProjectiveNotRigidSelectable = new makeInteractiveMenu(false,true,'.ClusterTiltingSummand.notrigid.projective');
let menuProjectiveNotSupportNotRigidSelectable = new makeInteractiveMenu(false,false,'.ClusterTiltingSummand.neitherrigidnorsupport.projective');


