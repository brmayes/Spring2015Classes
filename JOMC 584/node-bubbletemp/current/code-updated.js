$(function(){ // on dom ready


 console.log("build graphic")
var cy = cytoscape({

  container: document.getElementById('cy'),

  maxZoom: 2,
  minZoom: .5,
  zoomingEnabled: true,
  grabbable: false,
  locked: true,
  // width: 50,


  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 1,
        'text-outline-color': '#bdebf6',
        'shape': 'square',
        'width': 'mapData(weight, 10, 10, 10, 10)',
        'background-size': '50%',
        'font-color': '#111519',
        'font-family': 'Montserrat'
      })
    .selector('edge')
      .css({
        'target-arrow-shape': 'triangle',
        'width': 3,
        'line-color': '#6e757a',
        'target-arrow-color': '#6e757a'
      })
    .selector('.highlighted')
      .css({
        'background-color': '#f28a61',
        'line-color': '#f28a61',
        'target-arrow-color': '#f28a61',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.015s'
      })
    .selector('edge.static')
      .css({
        'target-arrow-shape': 'none',
        'line-style': 'dashed',
        'line-color': '#6e757a'
      })
    .selector('#a') //main level - Kennedy Imedi
      .css({
        'background-color': '#bdebf6',
        'width': 150,
        'height': 45,
        //'background-image': 'https://farm6.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg',
        'text-valign': 'none'
      })
    .selector('#b, #h, #t, #k, #s') //first level
      .css({
        'background-color': '#99d7e7',
        'text-outline-color': '#99d7e7',
        'width': 160,
        'height': 45,
      })
    .selector('#c, #d3, #i, #j, #l, #m, #p, #r, #q') // second level
      .css({
        'background-color': '#5092a2',
        'text-outline-color': '#5092a2',
        'width': 150,
        'height': 45
      }),


  elements: {


      nodes: [
        { data: { id: 'a', name: 'Kennedy Imedi' } },
        { data: { id: 'b', name: 'Family'  } },
        { data: { id: 'c', name: 'Wife'  } },
        { data: { id: 'd3', name: 'Daughters', weight: 100 } },
        { data: { id: 'h', name: 'School Community', weight: 100  } },
        { data: { id: 'i', name: 'Teachers'  } },
        { data: { id: 'j', name: 'Students'  } },
        { data: { id: 'l', name: 'Mothers Group'  } },
        { data: { id: 'm', name: 'Youth Club'  } },
        { data: { id: 'p', name: 'Champiti FC'  } },
        { data: { id: 'r', name: 'Secret Men'  } },
        { data: { id: 's', name: 'Youth'  } },
        { data: { id: 't', name: 'Group Village'  } }
      ],

      edges: [
        // first level
        { data: { id: 'a"b', weight: 1, source: 'a', target: 'b' }, classes: 'first-level'  }, //Kennedy to family
        { data: { id: 'ah', weight: 1, source: 'a', target: 'h' }, classes: 'first-level'  }, //Kennedy to school
        { data: { id: 'as', weight: 1, source: 'a', target: 's' }, classes: 'first-level'  }, //Kennedy to youth
        { data: { id: 'at', weight: 1, source: 'a', target: 't' }, classes: 'first-level'  }, //Kennedy to group village


        //second level
          //family connections
            { data: { id: 'bc', weight: 3, source: 'b', target: 'c' } }, //family to wife
            { data: { id: 'bd3', weight: 4, source: 'b', target: 'd3' } }, //family to daughters

          //school connections
            { data: { id: 'hj', weight: 7, source: 'h', target: 'j' } }, //school to students
            { data: { id: 'hi', weight: 7, source: 'h', target: 'i' } }, //school to teachers

          //youth connections
            { data: { id: 'sp', weight: 7, source: 's', target: 'p' } }, //youth to soccer team
            { data: { id: 'sm', weight: 7, source: 's', target: 'm' } }, //youth to youth club

          //group villiage
            { data: { id: 'tr', weight: 7, source: 't', target: 'r' } }, //GVH to secret men
            { data: { id: 'tl', weight: 7, source: 't', target: 'l' } }, //GVH to Mother's group

        //static transitions
        { data: { id: 'd3h', source: 'd3', target: 'h'}, classes: 'static'}, //daughters to school
        { data: { id: 'is', source: 'i', target: 's'}, classes: 'static'}, //teachers to youth
        { data: { id: 'mt', source: 'm', target: 't'}, classes: 'static'}, //youth club to gvh

      ],


    },

  layout: {
    name: 'breadthfirst',
    directed: true,
    roots: '#a',
    padding: 3
  }
});



var bfs = cy.elements().bfs('#a', function(){}, true);

var i = 0;
var highlightNextEle = function(){

  bfs.path[i].addClass('highlighted');
  if( i < bfs.path.length ){
    i++;
    setTimeout(highlightNextEle, 200);
  }

  //stopZoom();
};

var stopZoom = function() {
cy.
  animate({
    fit: { eles: '#a'}
  }, {duration: 2000});

  setTimeout(function() {
    cy.stop();
  }, 1000);
}

var zoomToFit = function() {
cy
  .animate({
    fit: { eles: '#a' }
  })

  .delay(1000);
};

// kick off first highlight

console.log("right before zoom");

highlightNextEle();

//ungrabify
cy.$('#a').ungrabify();
cy.$('#b').ungrabify();
cy.$('#c').ungrabify();
cy.$('#d3').ungrabify();
cy.$('#h').ungrabify();
cy.$('#i').ungrabify();
cy.$('#j').ungrabify();
cy.$('#l').ungrabify();
cy.$('#m').ungrabify();
cy.$('#p').ungrabify();
cy.$('#r').ungrabify();
cy.$('#s').ungrabify();
cy.$('#t').ungrabify();

//TOOLTIPS
cy.$('#a').qtip({
  content: 'Kennedy  is a husband, a father and a large impact on the community. Scroll around and click to view his impact on those around him.',
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});

cy.$('#d3').qtip({
  content: 'Kennedy has three daughters',
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});

cy.$('#c').qtip({
  content: 'His wife takes care of the children and works hard everyday. Imedi focuses on providing enough food for the family throughout the year by working on the farm.',
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});

cy.$('#r').qtip({
  content: 'Imedi is an active member of the Secret Men, a group of males who encourage each other to discuss the topic of maternal health. The group builds allies and provides resources to men in the community.',
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});

cy.$('#h').qtip({
  content: 'Imedi serves is a chair of the school committee. He also currently serves as the vice secretary for the group. Through this group he networks with teachers and speaks to students about his passions.',
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});

cy.$('#p').qtip({
  content: 'He serves as the coach of Champiti FC, a local football team of over eleven teenage boys. Imedi coaches the boys both through life and in the sport.',
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});

cy.$('#t').qtip({
  content: 'Although Imedi is not directly related to the health care center, he visits to gain valuable information to spread to his community.',
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});

cy.$('#k').qtip({
  content: 'The Champiti Community Action Group was created by the CARE Maternal Health Alliance Project. It is a collection of community members who work towards safer motherhood through open conversation.',
  style: {
    classes: 'qtip-bootstrap',
    tip: {
      width: 16,
      height: 8
    }
  }
});






}); // on dom ready
