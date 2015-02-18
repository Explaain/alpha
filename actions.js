var runTests = false; //RUN TESTS AT START OR NOT


//NEW - Global Variables

var MouseOverLink = false;
var arena = {};
var block = [];
var blocksShowing = []; //Anything except hidden or hidden+delayed
var doit = false;
var margin = 5;
var inlineManualStep2 = false;
var skipInlineManual = false;


//NEW - Populate Global Variables

block = block.concat(blockPopulation([$('.block.gist')], 'gist', false));
block = block.concat(blockPopulation($('.block.gist li'), 'detail', false));
block = block.concat(blockPopulation(evidence, 'evidence', true));

function blockPopulation(newBlockGroup, section, objects) { //object is true (array of objects) or false (array of values)
	var newBlocks = [];

	$.each( newBlockGroup, function(i, b) {
		console.log(b);
		newBlocks[i] = {};
		newBlocks[i].status = 'hidden'; //initial status
		newBlocks[i].expansion = 'normal';
		newBlocks[i].position = {};
		newBlocks[i].size = {};
		newBlocks[i].margin = {};
		newBlocks[i].padding = {};
		newBlocks[i].fullSize = {}; //including padding
		newBlocks[i].outerSize = {}; //including padding and margin

		newBlocks[i].potential = {};
		newBlocks[i].potential.position = {};
		newBlocks[i].potential.size = {};

		newBlocks[i].section = section;
		newBlocks[i].keywords = [];
		switch (section) {
			case 'evidence':
				console.log('watch');
				console.log(newBlocks[i]);
				newBlocks[i].name = section + '-' + b.name;
				newBlocks[i].title = b.title;
				newBlocks[i].type = b.type;
				newBlocks[i].content = collectProperty(newBlocks[i].title, 'AbstractText', b.content);
				newBlocks[i].keywords = [b.title].concat(b.keywords);
				newBlocks[i].source = b.source;
				newBlocks[i].sourceUrl = b.sourceUrl;
				newBlocks[i].image = b.image;
				break;
			case 'detail':
				var ii = i + 1;
				newBlocks[i].name = section + '-' + i;
				newBlocks[i].content = $('#gist .text-content')/*.html().split('</h2>')[1]*/.find('li:nth-child(' + ii + ')').html();
				//newBlocks[i].content = $('#' + newBlocks[i].name).find('.text-content').html();

				if (section == 'gist') {
					console.log('Here we go...');
					//console.log(extractGist($('#' + newBlocks[i].name).find('.text-content').html()));
				} else if (section == 'detail') {
					console.log('Here we go:');
					//console.log(extractDetail($('#' + newBlocks[i].name).find('.text-content').html(), i));
				}
				//console.log(newBlocks[i].content);
				break;
			case 'gist':
				newBlocks[i].name = section + '-' + i;
				newBlocks[i].content = $('#arena .text-content').html().split('<h3>')[0];

				if (section == 'gist') {
					console.log('Here we go...');
					//console.log(extractGist($('#' + newBlocks[i].name).find('.text-content').html()));
				} else if (section == 'detail') {
					console.log('Here we go:');
					//console.log(extractDetail($('#' + newBlocks[i].name).find('.text-content').html(), i));
				}
				//console.log(newBlocks[i].content);
				newBlocks[i].title = 'The Gist';
				break;
		}
	});

	//newBlocks[0].title = 'The Gist';

	return newBlocks;
};


function collectProperty(myTitle, myProperty, firstSource) {
	var myProperty;
	if (firstSource != undefined) {
		myProperty = firstSource;
	} else {
		//myProperty = scrapeMissingData(myTitle, myProperty, 'DuckDuckGo');
	}

	return myProperty;
}


function scrapeMissingData(myTitle, myProperty, mySource) {
	var myQuery = getQuery(myTitle, mySource);
	$.getJSON( myQuery, function( data ) {
		var myContent = data.AbstractText;//[myProperty];
		console.log(myContent);
	});

	return undefined;// myContent;
}

function getQuery(myTitle, mySource) {
	var myQuery = 'http://api.duckduckgo.com/?q=' + myTitle + '&format=json&pretty=1';
	return myQuery;
}


function extractGist(myString) {
	var myGist = myString.split('</ hr>')[0];
	
	return myGist;
}

function extractDetail(myString, i) {
	var myDetail = myString.split('</ hr>')[1];
	/*myDetails = myDetails.split('</ hr>');
	console.log(myDetails);
	myDetails = myDetails.slice(1);
	var myDetail = myDetails[i];*/
	return myDetail;
}


//NEW - link everything up with hyperlinks

$.each(block, function(i, b) {
	$.each(b.keywords, function(j, w) {
		$.each(block, function(k, bb) {
			if (bb.section != 'gist' && bb != b && typeof bb.content == 'string') { //Avoids gist, and avoids blocks linking to themselves
				var splitString = bb.content.split(w); //Temporarily takes out all of the keywords
				var splitInsert = '<a href="' + nameToID(b.name) + '" class="' + b.section + ' ' + b.type + '">' + w + '</a>'; //Puts back in +links
				bb.content = splitString.join(splitInsert);
			}
		});
	});
});


//NEW - Create title & body

$('body').css('background-image','url(' + story.image + ')');


//NEW - Sort Arena

getArenaPosition();
getArenaSize();
//$('#arena').css({ 'height': arena.size.height, 'width': arena.size.width });

function getArenaPosition() {
	var windowSize = getWindowSize();
	var position = {};
	position.top = $('.entry-header').outerHeight(true) + margin;
	position.left = margin;
	position.right = windowSize.width - margin;
	position.bottom = windowSize.height- margin;

	arena.position = position;
	return position;
};

function getArenaSize() {
	var size = {};
	var position = getArenaPosition();
	size.height = position.bottom - position.top;
	size.width = position.right - position.left;

	arena.size = size;
	return size;
};

function getWindowSize() {
	var size = {};
	size.width  = $( window ).width();
	size.height = $( window ).height();

	return size;
};


//NEW - Create Block Divs & fill with content


createAndFillBlockDivs();
recordGistBlock();
placeGistBlock();

function createAndFillBlockDivs() {
	$.each(block, function(i, b) {
		var blockContainerID = b.name;
		var blockContainerClass = 'block-container ' + b.section;
		var blockClass = 'block ' + b.section + ' ' + b.type;
		var blockTitle = b.title;
		var blockContent = b.content;
		var blockImage = b.image;
		
		if (b.section == 'evidence') {
			getSectionDiv(b).append('<div id="' + blockContainerID + '" + class="' + blockContainerClass + '"></div>');
			getBlockContainerDiv(b).append('<div class="' + blockClass + ' expansion-normal"><div class="block-content"><div class="block-overflow"></div></div></div>');
			//getBlockDiv(b).append('<img src="' + blockImage + '">');
			getBlockDiv(b).prepend('<a class="boxclose"></a>');
			getBlockDiv(b).find('.block-overflow').append('<h1>' + blockTitle + '</h1>');
			getBlockDiv(b).find('.block-overflow').append('<div class="text-content"><p>' + blockContent + '</p></div>');
			//getBlockDiv(b).append('<div class="expander"></div>');
			//getBlockDiv(b).css('background-image', blockImage);
			getBlockDiv(b).append('<div class="arrow"><div class="expand"><svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M14.77,23.795L5.185,14.21c-0.879-0.879-0.879-2.317,0-3.195l0.8-0.801c0.877-0.878,2.316-0.878,3.194,0  l7.315,7.315l7.316-7.315c0.878-0.878,2.317-0.878,3.194,0l0.8,0.801c0.879,0.878,0.879,2.316,0,3.195l-9.587,9.585  c-0.471,0.472-1.104,0.682-1.723,0.647C15.875,24.477,15.243,24.267,14.77,23.795z" fill="#fff"/></svg></div><div class="condense"><svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z" fill="#fff"/></svg></div></div>');
			
		}

		if (b.section == 'gist') {
			var gistBefore = '';
			var gistAfter = '';
			//$('#gist .text-content').html(gistBefore + blockContent + gistAfter);
		}

		if (b.section == 'detail') {
			var j = i-1;
			var detailBefore = '<div id="detail-' + j + '" class="block-container detail">'
			+ '<div class="block detail undefined expansion-normal">'
			+ '<div class="block-content">'
			+ '<div class="block-overflow">'
			+ '<div class="text-content"><p>';
			var detailAfter = '</p></div></div></div></div></div>';
			$('#detail').append(detailBefore + blockContent + detailAfter);
		}
		
		getBlockPosition(b);
		getBlockSize(b);
		getBlockMargin(b);
		getBlockPadding(b);
		

		if (i !== 0) {getBlockDiv(b).css({'top': 0, 'left': 0, 'width': 500}  ); }
		//if (i != 0) {getBlockDiv(b).css('display', 'none');}

		//setPotentialBlockPosition(getBlockPosition);

		setBlockZIndex(b, 0);
	});
}


function recordGistBlock() {
	block[0].status = 'showing';
	addBlockShowing(block[0]);
};


function placeGistBlock() {
	var myBlock = block[0];
	var myPosition = { left: ( getArenaSize().width - getBlockSize(myBlock).width )/2,
					  top: 0 };
	setBlockPosition(myBlock, myPosition);
};


//Run testAfterPageLoads

if (runTests) {
	testAfterPageLoads();
	setTimeout(testOneSecondAfterPageLoads(), 1000);
}


//NEW - General element-data conversion functions

function nameToData(myName) { //returns single
	var myBlock = $.grep(block, function(b) { return b.name == myName; })[0];
	return myBlock;
}

function sectionToData(mySection) { //returns array
	var myBlocks = $.grep(block, function(b) { return b.section == mySection; });
	return myBlocks;
}

function getID(myDiv) {
	return myDiv.attr('id');
}

function nameToID(name) {
	return '#' + name;
}

function idToName(myID) {
	return myID.split('#')[1];
}

function getSectionDiv(myBlock) {
	return $(nameToID(myBlock.section));
}

function getBlockContainerDiv(myBlock) {
	return $(nameToID(myBlock.name));
}

function getBlockDiv(myBlock) {
	return $(nameToID(myBlock.name) + ' .block');
}

function linkToName(object) {
	return idToName(object.attr('href'));
}

function elementToData(myElement) { //from JQuery selected element (div/p/a/h1 etc) within (or equal to) block container
	var blockContainerDiv = myElement.closest('.block-container');
	var myName = getID(blockContainerDiv);
	var databaseBlock = nameToData(myName);
	return databaseBlock;
}

function filterByStatus(myBlocks, status) {
	var myNewBlocks = $.grep(myBlocks, function(b) { return b.status == status });
	return myNewBlocks;
}

function filterByNotStatus(myBlocks, status) {
	var myNewBlocks = $.grep(myBlocks, function(b) { return b.status != status });
	return myNewBlocks;
}

function filterNotMe(myBlocks, myBlock) {
	var myNewBlocks = $.grep(myBlocks, function(b) { return b.name != myBlock.name });
	return myNewBlocks;
}



//NEW - Mouse Actions (tidy more?)

$('a:not(.boxclose):not(.about-link)').click(function(event) {
	mouseOverLink = true;
	blockSwitch($(this), 'a', true, event);
});



$('a.boxclose').click(function(event) {
	mouseOverLink = true;
	console.log('hi');
	console.log(elementToData($(this)));
	if ( $('#background').css('z-index') > 10 ) {
		$('#background').css({ 'z-index': 1, 'opacity': 0.4 });
		$('#about-lightbox').velocity('slideUp', 300);
		setTimeout(startHelp, 8000);
	} else {
		blockSwitch($(this), 'close-button', false, event);
		openCloseBlockFull(($(this)), false);
	}
});

$('#background').click(function(event) {
	if ( $('#background').css('z-index') > 10 ) {
		$('#background').css({ 'z-index': 1, 'opacity': 0.4 });
		$('#about-lightbox').velocity('slideUp', 300);
		setTimeout(startHelp, 8000);
	} else {
		$.each(blocksShowing, function(i, b) {
			if (i !== 0 && b.section == 'evidence' && b.open === true) {
				openCloseBlockFull(b, false);
			}
		});
		blockSwitch($(this), 'background', false, event);
	}
});

$('.block.evidence').click(function(event) {
	if (!mouseOverLink) {
		openCloseBlockFull(elementToData($(this)));
	}
});

$('.block.evidence').mouseover(function(event) {
	console.log(getBlockDiv($(this)).find('a.boxclose'));
	$(this).find('a.boxclose').css('visibility', 'visible');
	//startPulsating($(this).find('.arrow'));
});

$('.block.evidence').mouseout(function(event) {
	$(this).find('a.boxclose').css('visibility', 'hidden');
	//stopPulsating($(this).find('.arrow'));
});




$('a').mouseout(function(event) {
	mouseOverLink = false;
});



//Help Tutorial - Inline Manual

/*$( window ).unload(function() {
	// check if any topic is active
	if (inline_manual_player.current_topic) {
		// reset the topic to step 0
		inline_manual_player.activateStep(inline_manual_player.current_topic, 0);
	}
});
*/

function startHelp() {
	if (!skipInlineManual) {
		if (block[4].status == 'hidden') {
			inline_manual_player.activateTopic(1534);
		} else {
			inline_manual_player.activateStep(1534, 1);
		}

		inline_manual_player.setCallbacks({
			onStepActivate: function (player, topic_id, step_id) {
				console.log(player);
				console.log(topic_id);
				console.log(step_id);
				if (topic_id == 1534 && step_id == 1) {
					inlineManualStep2 = true;
					console.log('Step 2!');
				}
			}
		});
	}
}




//NEW - General switch for actions that show/hide blocks (tidy more)

function blockSwitch(trigger, triggerType, on, event) {

	console.log('=======================' + trigger + ', ' + triggerType + ', ' + on + ', ' + event);

	var input = elementToData(trigger);
	var output = findOutput(trigger, triggerType, input);
	var sectionSpecific = getSectionSpecific(input, output);
	triggerOutput(output, on, false, input, event, triggerType, sectionSpecific);

	return output;
};

function findOutput(trigger, triggerType, input) {
	var myOutput;
	switch (triggerType) {
		case 'background':
			myOutput = blocksShowing.slice(1);
			break;
		case 'close-button':
			myOutput = elementToData(trigger);
			break;
		case 'a':
			myOutput = nameToData(linkToName(trigger));
			break;
		case 'self':
			myOutput = input;
			break;
		default:
			myOutput = input;
	}

	return myOutput;
};


function getSectionSpecific(input, output) {
	var sectionSpecific = {};
	if(output.section == 'detail') { sectionSpecific.onlyMe = true; }

	return sectionSpecific;
};


function triggerOutput(myBlocks, show, immediately, input, event, triggerType, sectionSpecific) {

	if (myBlocks.constructor !== Array) {
		myBlocks = [myBlocks];
	}

	$.each(myBlocks, function(i, myBlock) {

		var onlyMe = false;
		var display = getDisplay(show);
		var animation = getAnimation(show); //animation properties object
		var duration = getDuration(show);
		var easing = getEasing(show);
		var delay = getDelay(show, immediately, myBlock, event);
		var interrupt = true;

		var visibility = getVisibility(show);

		var myDiv = getBlockDiv(myBlock);


		if(show && sectionSpecific.onlyMe) {
			var blocksToHide = filterNotMe(filterByNotStatus(sectionToData(myBlock.section), 'hidden'), myBlock);
			triggerOutput(blocksToHide, false, true, input, event, triggerType, sectionSpecific);
			console.log(blocksToHide);
		}

		if (triggerType == 'a')  { reduceAllShowingBlocks('condensed'); }

		if(show) { addBlockShowing(myBlock); }
		changeBlockStatus(myBlock, show, false, false, input);

		//Temporary (without animation)
		if (show && triggerType == 'a') {slotBlock(input, myBlock, event);}
		//myDiv.css({'display': display, 'opacity': animation.opacity});
		//changeBlockStatus(myBlock, show, false, false, input);


		//NEW - may not need manual animation?

		myDiv.css({'visibility': 'visible', 'opacity': 1});
		if (show) {
			//myDiv.addClass('animated flipInX');
			myDiv.velocity("slideDown", 300);
		}
		else {
			myDiv.velocity("slideUp", 300);
		}

		/*

      myDiv.css('display', 'block');
      myDiv.animate(animation, duration, function() {
          myDiv.css('display', display);
          changeBlockStatus(myBlock, show, false, false, input);
        });
      */

		zRiseToTop(myBlock);
	});

};


function slotBlock(input, output, event) { //This sets off the whole trial-and-error-process

	var mousePosition = getMousePosition(event);
	var mySide = preferredSide(input, mousePosition);
	var myDirection = preferredDirection(input);

	switch (myDirection) {
		case 'h': alignBlock(output, input, mySide.h, mousePosition.y - 27, true); break;
		case 'v': findNextAvailableSpace(output, input, mySide.v, getBlockPosition(input).left); break;
	}
};


function preferredSide(input, mousePosition) { //Decides which out of left&right, and which out of top&bottom, are better
	var hSide, vSide;
	switch (mousePosition.x - getBlockPosition(input).left < getBlockPosition(input).right - mousePosition.x) {
		case true: hSide = 'left'; break;
		case false: hSide = 'right'; break;
	}
	switch (mousePosition.y - getBlockPosition(input).top < getBlockPosition(input).bottom - mousePosition.y) {
		case true: vSide = 'top'; break;
		case false: vSide = 'bottom'; break;
	}
	var mySide = {h: hSide, v: vSide};

	return mySide;
};


function preferredDirection(input) { //Decides if we're looking at a horizontal or vertical closest side
	var preferredDirection;
	switch (input.section) {
		case 'gist' : preferredDirection = 'h'; break;
		case 'detail' : preferredDirection = 'v'; break;
		case 'evidence' : preferredDirection = 'v'; break;
	}

	return preferredDirection;
};


function findNextAvailableSpace(newBlock, existingBlock, initialDirection, otherDimension) {
	var i = 0;
	var j = 0;
	var referenceBlock = existingBlock;
	var arenaBoundaryCrossed;
	var arenaBoundaryCurrent = null;
	var direction = initialDirection;
	var hop;
	var hopDirection;

	alignBlock(newBlock, referenceBlock, direction, otherDimension, true); // Actually put the block in starting position/size

	hopDirection = getSmartestHorizontalDirection(newBlock);        // console.log('hopDirection: ' + hopDirection);
	var startPosition = getBlockPosition(newBlock);
	var startSize = getBlockSize(newBlock);

	while (i < 3 && !(referenceBlock == null && arenaBoundary == null) ) { //Begin this with block actually in new column
		console.log('New Column i=' + i);
		/*if (i == 2) {
        newBlock.expansion = condensed;
        getBlockDiv(newBlock).removeClass('expansion-normal');
        getBlockDiv(newBlock).addClass('expansion-condensed');
      }*/
		j = 0;
		arenaBoundaryCrossed = { top: false, bottom: false};
		arenaBoundary = checkArenaBoundary(newBlock);   // console.log('arenaBoundary: ' + arenaBoundary);

		while (j == 0 || (j < 8 && direction != null && !(referenceBlock == null && arenaBoundary == null) ) ) {

			console.log('j=' + j + ' -----------------------');

			switch (arenaBoundary) {
				case 'top':
					arenaBoundaryCrossed.top = true;
					break;
				case 'bottom':
					arenaBoundaryCrossed.bottom = true;
					break;
				case null:
					break;
			}


			if (arenaBoundary != null) {
				alignBlockOnBoundary(newBlock, arenaBoundary, false);
			}
			else if (referenceBlock != null) {
				alignBlock(newBlock, referenceBlock, direction, getBlockPosition(referenceBlock).left, false);
			}

			referenceBlock = checkOverlap(newBlock);        // console.log('referenceBlock:');  console.log(referenceBlock);
			arenaBoundary = checkArenaBoundary(newBlock);   // console.log('arenaBoundary: ' + arenaBoundary);

			direction = findNextDirection(arenaBoundaryCrossed);

			j++;
		}

		if (!(referenceBlock == null && arenaBoundary == null)) {

			actualisePotential(newBlock);
			// console.log(getPotentialBlockSize(newBlock));
			hop = hopDirection * getPotentialBlockSize(newBlock).width;     // console.log('hop: ' + hop);

			var hopAlign = {};
			switch (hopDirection) {
				case 1:  hopAlign = {h: 'left', v: 'top'}; break;
				case -1: hopAlign = {h: 'right', v: 'top'}; break;
			}                                                           // console.log('hopAlign:'); console.log(hopAlign);

			setPotentialBlockPosition(newBlock, {
				left: getPotentialBlockPosition(newBlock).left + hop,
				top: startPosition.top
			} );                                                    // console.log('PotentialPosition.left: ' + getPotentialBlockPosition(newBlock).left);
			setPotentialBlockSize(newBlock, startSize, hopAlign);             // console.log('PotentialSize.width: ' + getPotentialBlockSize(newBlock).width);

			console.log('Now hopped to... left: ' + getPotentialBlockPosition(newBlock).left + ', top: ' + getPotentialBlockPosition(newBlock).top);

			actualisePotential(newBlock);
		}

		i++
	}
	actualisePotential(newBlock);
};


function getSmartestHorizontalDirection(myBlock) {
	var direction;

	// console.log(getPotentialBlockPosition(myBlock));
	// console.log(getPotentialBlockSize(myBlock));
	// console.log(getArenaSize().width);

	if (getPotentialBlockPosition(myBlock).left*2 + getPotentialBlockSize(myBlock).width < getArenaSize().width ) {
		direction = 1;
	}
	else {
		direction = -1;
	}

	return direction;
};


function checkArenaBoundary(myBlock) {
	var bPos = getPotentialBlockPosition(myBlock);
	var aSize = getArenaSize();
	var boundaryViolated;

	if      ( bPos.top < 0 )                { boundaryViolated = 'top'; }
	else if ( bPos.bottom > aSize.height )  { boundaryViolated = 'bottom'; }
	//else if ( bPos.left < 0 )               { boundaryViolated = 'left'; }
	//else if ( bPos.right > aSize.width )    { boundaryViolated = 'right'; }
	else { boundaryViolated = null; }

	return boundaryViolated;
};


function findNextDirection(arenaBoundaryCrossed) {
	var direction;

	if      (arenaBoundaryCrossed.top == false) { direction = 'top'; }
	else if (arenaBoundaryCrossed.bottom == false) { direction = 'bottom'; }
	/* else if (arenaBoundaryCrossed.right == false) { direction = 'right'; }
    else if (arenaBoundaryCrossed.left == false) { direction = 'left'; } */
	else { direction = null; }

	return direction;
}


function checkOverlap(myBlock) {
	for (i = 0; i < blocksShowing.length; i++) {
		// console.log('CheckOverlap i: ' + i);
		// console.log(getBlockPosition(blocksShowing[i]));
		// console.log(getPotentialBlockPosition(myBlock));

		if( blocksShowing[i] != myBlock
		   && getBlockPosition(blocksShowing[i]).left < getPotentialBlockPosition(myBlock).right
		   && getBlockPosition(blocksShowing[i]).right > getPotentialBlockPosition(myBlock).left
		   && getBlockPosition(blocksShowing[i]).top < getPotentialBlockPosition(myBlock).bottom
		   && getBlockPosition(blocksShowing[i]).bottom > getPotentialBlockPosition(myBlock).top ) {

			// console.log('found overlap:');
			// console.log(blocksShowing[i]);
			return blocksShowing[i];
		}
	}

	return null;
};


function alignBlock(newBlock, existingBlock, existingSide, otherDimension, actual) { //Repeats through trial-and-error process
	var myDimension;
	var newPosition = {};
	switch (existingSide) { //existingSide is side of the existing block upon which to place new block
		case 'left':
			newPosition.right = getBlockPosition(existingBlock).left;
			newPosition.top = otherDimension;
			createPointer(newBlock, false);
			break;
		case 'right':
			newPosition.left = getBlockPosition(existingBlock).right;
			newPosition.top = otherDimension;
			createPointer(newBlock, true);
			break;
		case 'top':
			newPosition.bottom = getBlockPosition(existingBlock).top;
			newPosition.left = otherDimension;
			break;
		case 'bottom':
			newPosition.top = getBlockPosition(existingBlock).bottom;
			newPosition.left = otherDimension;
			break;
		case null:
			newPosition = getPotentialBlockPosition(newBlock);
			break;
	}

	fitSize(newBlock, existingBlock, existingSide, actual);
	if (actual) {
		setBlockPosition(newBlock, newPosition);
		// console.log('Actualise: newPosition'); console.log(getPotentialBlockPosition(newBlock));
	}
	else {
		// console.log('existingSide: ' + existingSide);
		// console.log('Try this:');
		// console.log(newPosition);
		setPotentialBlockPosition(newBlock, newPosition);
	}
};


function alignBlockOnBoundary(newBlock, arenaBoundary, actual) { //Repeats through trial-and-error process
	var newPosition = {};
	switch (arenaBoundary) { //existingSide is side of the existing block upon which to place new block
		case 'top':
			newPosition.top = 0;
			newPosition.left = getPotentialBlockPosition(newBlock).left;
			break;
		case 'bottom':
			newPosition.bottom = getArenaSize().height;
			newPosition.left = getPotentialBlockPosition(newBlock).left;
			break;
		case null:
			newPosition = getPotentialBlockPosition(newBlock);
			break;
	}

	if (actual) {
		setBlockPosition(newBlock, newPosition);
		// console.log('Actualise (boundary): newPosition'); console.log(getPotentialBlockPosition(newBlock));
	}
	else {
		// console.log('arenaBoundary: ' + arenaBoundary);
		// console.log('Try this boundary align:');
		// console.log(newPosition);
		setPotentialBlockPosition(newBlock, newPosition);
	}
};


function fitSize(newBlock, existingBlock, direction, actual) {
	var newSize = {};
	if (actual) {
		newSize.height = getBlockSize(newBlock).height;
	}
	else {
		newSize.height = getPotentialBlockSize(newBlock).height;
	}

	switch (direction) {
		case 'left':
			newSize.width = getBlockPosition(existingBlock).left;
			break;
		case 'right':
			newSize.width = getArenaSize().width - getBlockPosition(existingBlock).right;
			break;
		case 'top':
			newSize.width = getBlockSize(existingBlock).width;
			break;
		case 'bottom':
			newSize.width = getBlockSize(existingBlock).width;
			break;
	}

	if (actual) {
		setBlockSize(newBlock, newSize);
		// console.log('Actualise: newSize'); console.log(newSize);
	}
	else {
		setPotentialBlockSize(newBlock, newSize);
	}
};


function actualisePotential(myBlock) {
	var myPotentialPosition = getPotentialBlockPosition(myBlock);   // console.log('Pre-Actualise: myPotentialPosition'); console.log(myPotentialPosition);
	var myPotentialSize = getPotentialBlockSize(myBlock);           // console.log('Pre-Actualise: myPotentialSize'); console.log(myPotentialSize);

	setBlockPosition(myBlock, myPotentialPosition);   // console.log('Actualise: myPotentialPosition'); console.log(myPotentialPosition);
	setBlockSize(myBlock, myPotentialSize);           // console.log('Actualise: myPotentialSize'); console.log(myPotentialSize);

	setPotentialBlockPosition(myBlock, getBlockPosition(myBlock));    // console.log('Post-Actualise: getPotentialPosition'); console.log(getPotentialBlockPosition(myBlock));
	setPotentialBlockSize(myBlock, getBlockSize(myBlock));              // console.log('Post-Actualise: getPotentialSize'); console.log(getPotentialBlockSize(myBlock));
};





//NEW - Moves block to top of z-index (and moves all other blocks below it)

function zRiseToTop(myBlock) {
	$.each(block, function(i, d) {
		if(getBlockZIndex(d) > getBlockZIndex(myBlock)) {
			setBlockZIndex(d, getBlockZIndex(d) - 1);
		}
	});

	setBlockZIndex(myBlock, block.length);
};

function setBlockZIndex(myBlock, z) {
	getBlockDiv(myBlock).css('z-index', z);
	myBlock.zIndex = z;
};

function getBlockZIndex(myBlock) {
	var z = myBlock.zIndex;
	return z;
};


//NEW - Changes the block's status (tidy up?)

function changeBlockStatus(myBlock, show, inProgress, delayed, triggerBlock) {
	if (blocksShowing.length > 2) {
		skipInlineManual = true;
	}
	switch (delayed) {
		case true:
			block.status = 'delayed';
			break;
		case false:
			switch (show) {
				case true:
					switch (inProgress) {
						case true:  myBlock.status = 'fading-in';
							break;
						case false: myBlock.status = 'showing';
							break;
					}
					break;
				case false:

					if (inlineManualStep2) {
						console.log('topic ending');
						inline_manual_player.endTopic(1534);
						inlineManualStep2 = false;
						console.log('topic ended');
					}
					switch (inProgress) {
						case true:  myBlock.status = 'fading-out';
							break;
						case false: myBlock.status = 'hidden';
							removeBlockShowing(myBlock);
							break;
					}
					break;
			}
			break;
	}

	cleanBlocksShowing(); //remove any extra ones
	hideShowArrows();

};

function addBlockShowing(newBlock) {
	if (blocksShowing.indexOf(newBlock) == -1) {
		blocksShowing.push(newBlock);
	}
	console.log('blocksShowing');
	console.log(blocksShowing);
};

function removeBlockShowing(myBlock) {
	blocksShowing = $.grep(blocksShowing, function(b) { return b.name != myBlock.name });
};

function cleanBlocksShowing() {
	blocksShowing = $.grep(blocksShowing, function(b) { return b.status != 'hidden' });
};


//NEW - Functions for calculating animation properties etc (tidy up)

function getDisplay(on) {
	var display;

	switch (on) {
		case true:
			display = 'block';
			break;
		case false:
			display = 'none';
			break;
	}

	return display;
};

function getAnimation(on) {
	var animation = {};

	switch (on) {
		case true:
			animation.opacity = 1;
			break;
		case false:
			animation.opacity = 0;
			break;
	}

	return animation;
};

function getDuration(on) {
	var duration;

	switch (on) {
		case true:
			duration = 300;
			break;
		case false:
			duration = 100;
			break;
	}

	return duration;
};

function getEasing(on) {
	var easing = {};

	switch (on) {
		case true:
			easing.opacity = 'easeInExpo';
			break;
		case false:
			easing.opacity = 'easeInExpo';
			break;
	}

	return easing;
};

function getDelay(on, immediately, myBlock, event) {
	var delay;

	switch (on) {
		case true:
			delay = 0;
			break;
		case false:
			delay = 0;//(Math.pow(myBlock.position.left - parseInt(event.pageX), 2) + Math.pow(myBlock.position.top - parseInt(event.pageY), 2))/2000;
			break;
	}

	if (immediately) {
		delay = 0;
	}

	return delay;
};

function getVisibility(on) {
	var visibility;

	switch (on) {
		case true:
			visibility = 'visible';
			break;
		case false:
			visibility = 'hidden';
			break;
	}

	return visibility;
};



// Expansion


function openCloseBlockFull(myBlock, open) {
	if (open == true) {myBlock.open = false;}
	if (open == false) {myBlock.open = true;}

	//$('body').scrollTop( 0 );
	getBlockDiv(myBlock).find('.block-content').scrollTop( 0 );

	if (myBlock.open == true) {
		myBlock.open = false;
		getBlockDiv(myBlock).css('z-index', getBlockZIndex(myBlock));
		var myMaxHeight;
		switch (myBlock.expansion) {
			case 'condensed': myMaxHeight = 94; break;
			case 'normal': myMaxHeight = 138; break; 
		}
		getBlockDiv(myBlock).find('.block-content').css({ 'max-height': myMaxHeight, 'overflow': 'hidden', 'padding-right': 0 });
		getBlockDiv(myBlock).velocity({ scale: 1, translateY: 0, translateX: 0, boxShadowBlur: 2 }, 500, "spring");
		getBlockDiv(myBlock).find('.arrow .expand').css( 'display', 'block');
		getBlockDiv(myBlock).find('.arrow .condense').css( 'display', 'none');

	} else {
		myBlock.open = true;
		getBlockDiv(myBlock).css('z-index', 200);
		getBlockDiv(myBlock).find('.block-content').css({ 'max-height': getArenaSize().height - 120, 'overflow-y': 'auto', 'padding-right': 5 });
		var yDisplace = myBlock.position.top + parseInt(getBlockDiv(myBlock).css('height')) - getArenaSize().height + 20;
		if (yDisplace < 0 ) {
			yDisplace = 0;
		}

		console.log('yDisplace');
		console.log(myBlock.position.top);
		console.log(parseInt(getBlockDiv(myBlock).css('height')));
		console.log(getArenaSize().height);
		console.log(yDisplace);

		getBlockDiv(myBlock).velocity({ scale: 1.02, translateY: -yDisplace-20, translateX: 0, boxShadowBlur: 10 }, 500, "spring", function() {
			$('body').scrollTop( 0 );
		});
		getBlockDiv(myBlock).find('.arrow .expand').css( 'display', 'none');
		getBlockDiv(myBlock).find('.arrow .condense').css( 'display', 'block');
	}
	//$('body').scrollTop( 0 );
};



function reduceAllShowingBlocks(myExpansion) {
	$.each(blocksShowing, function(i, b) {
		if (i != 0) {
			expansionUpdate(b, myExpansion);
		}
	});
};


function expansionUpdate(b, newExpansion) {
	b.expansion = newExpansion;
	var expansionTypes = ['small', 'normal', 'large', 'full'];
	$.each(expansionTypes, function(i, e) {
		getBlockDiv(b).removeClass('expansion-' + e);
	});
	getBlockDiv(b).addClass('expansion-' + newExpansion);
	hideShowArrows();
};

function hideShowArrows() {
	$.each(blocksShowing, function(i, b) {
		if (i != 0) {
			hideShowArrow(b);
		}
	});
}

function hideShowArrow(b) {
	if (parseInt(getBlockDiv(b).find('.block-content').css('height')) > parseInt(getBlockDiv(b).find('.block-overflow').css('height'))) {
		getBlockDiv(b).find('.arrow').css('display', 'none');
	} else {
		getBlockDiv(b).find('.arrow').css('display', 'block');
	}
}


function startPulsating(myObject) {
	myObject.animate({ opacity: 0.2 }, 500, 'linear')
	.animate({ opacity: 1 }, 500, 'linear', pulsate);
}
function stopPulsating(myObject) {
	myObject.animate({ opacity: 1 }, 500, 'linear').stop();
}



//NEW - Functions for getting/setting physical properties

function getMousePosition(event) {
	var mousePosition = { x: event.pageX - getArenaPosition().left - 2*margin,
						 y: event.pageY - getArenaPosition().top - 2*margin};
	return mousePosition;
};

function getBlockPosition(myBlock) { //outer, including margin + padding
	var mySize = getBlockSize(myBlock);
	var myMargin = getBlockMargin(myBlock);
	var myPadding = getBlockPadding(myBlock);
	var myPosition = {};
	myPosition.left = parseInt(getBlockDiv(myBlock).css('left')) /*- getArenaPosition().left - myMargin.left*/;
	myPosition.top = parseInt(getBlockDiv(myBlock).css('top')) /*- getArenaPosition().top - myMargin.top*/;
	myPosition.right = myPosition.left + mySize.width;
	myPosition.bottom = myPosition.top + mySize.height;

	myBlock.position = myPosition;
	getBlockSize(myBlock);
	return myPosition;
};

function getBlockSize(myBlock) { //outer, including margin + padding
	var mySize = {};
	mySize.width = getBlockDiv(myBlock).outerWidth(true);
	mySize.height = getBlockDiv(myBlock).outerHeight(true);

	myBlock.size = mySize;
	return mySize;
};

function getBlockMargin(myBlock) {
	var myMargin = {};
	myMargin.left = getBlockCSS(myBlock, 'margin-left');
	myMargin.top = getBlockCSS(myBlock, 'margin-top');
	myMargin.right = getBlockCSS(myBlock, 'margin-right');
	myMargin.bottom = getBlockCSS(myBlock, 'margin-bottom');

	myBlock.margin = myMargin;
	return myMargin;
};

function getBlockPadding(myBlock) {
	var myPadding = {};
	myPadding.left = getBlockCSS(myBlock, 'padding-left');
	myPadding.top = getBlockCSS(myBlock, 'padding-top');
	myPadding.right = getBlockCSS(myBlock, 'padding-right');
	myPadding.bottom = getBlockCSS(myBlock, 'padding-bottom');

	myBlock.padding = myPadding;
	return myPadding;
};

function getBlockCSS(myBlock, property) {
	return parseInt(getBlockDiv(myBlock).css(property));
};

function setBlockPosition(myBlock, myPosition) { //outer, including margin + padding
	var mySize = getBlockSize(myBlock); // console.log('getBlockSize'); console.log(getBlockSize(myBlock));
	var myMargin = getBlockMargin(myBlock);
	var myPadding = getBlockPadding(myBlock);

	if (!myPosition.hasOwnProperty('left')) {
		myPosition.left = myPosition.right - mySize.width;
	}
	else if (!myPosition.hasOwnProperty('right')) {
		myPosition.right = myPosition.left + mySize.width;
	}

	if (!myPosition.hasOwnProperty('top')) {
		myPosition.top = myPosition.bottom - mySize.height;
	}
	else if (!myPosition.hasOwnProperty('bottom')) {
		myPosition.bottom = myPosition.top + mySize.height;
	}

	// console.log(myPosition);

	var realLeft = myPosition.left /*+ getArenaPosition().left + myMargin.left*/;
	var realTop = myPosition.top /*+ getArenaPosition().top + myMargin.top*/;

	getBlockDiv(myBlock).css({ left: realLeft, top: realTop });
	getBlockPosition(myBlock);
	setPotentialBlockPosition(myBlock, myPosition);
};


function setBlockSize(myBlock, mySize, align) { //outer, including margin + padding

	if (align === undefined) {
		align = {h: 'left', v: 'top'};
	}

	var myMargin = getBlockMargin(myBlock);
	var myPadding = getBlockPadding(myBlock);

	var initialPosition = getBlockPosition(myBlock);
	var newPosition = {};

	setBlockCSS(myBlock, 'width', mySize.width - myMargin.left - myMargin.right /*- myPadding.left - myPadding.right*/);
	mySize.height = getBlockDiv(myBlock).outerHeight(true);

	if (align.h == 'right') {
		newPosition.right = initialPosition.right;
	}
	else {
		newPosition.left = initialPosition.left;
	}
	if (align.v == 'bottom') {
		newPosition.bottom = initialPosition.bottom;
	}
	else {
		newPosition.top = initialPosition.top;
	}

	setBlockPosition(myBlock, newPosition);

	getBlockSize(myBlock);
	setPotentialBlockSize(myBlock, mySize);
};


function setBlockCSS(myBlock, property, value) {
	return getBlockDiv(myBlock).css(property, value);
};


function outerToInner() {

};




//Functions for getting/setting POTENTIAL physical properties

function getPotentialBlockPosition(myBlock) { //outer, including margin + padding
	var myPotentialSize = getPotentialBlockSize(myBlock);
	var myPotentialPosition = {};
	myPotentialPosition.left = myBlock.potential.position.left;//       console.log('myPotentialPosition.left: ' + myPotentialPosition.left);
	myPotentialPosition.top = myBlock.potential.position.top; //        console.log('myPotentialPosition.top: ' + myPotentialPosition.top);
	myPotentialPosition.right = myPotentialPosition.left + myPotentialSize.width;
	myPotentialPosition.bottom = myPotentialPosition.top + myPotentialSize.height;

	myBlock.potential.position = myPotentialPosition;
	return myPotentialPosition;
};


function getPotentialBlockSize(myBlock) { //outer, including margin + padding
	var myPotentialSize = myBlock.potential.size;
	var backupPotentialSize = getBlockSize(myBlock);

	if (isNaN(myPotentialSize.width)) {
		myPotentialSize.width = backupPotentialSize.width;
	}
	if (isNaN(myPotentialSize.height)) {
		myPotentialSize.height = backupPotentialSize.height;
	}

	myBlock.potential.size = myPotentialSize;

	return myPotentialSize;
};


function setPotentialBlockPosition(myBlock, myPotentialPosition) { //outer, including margin + padding
	//console.log('Setting:');
	//console.log(myPotentialPosition);
	var myPotentialSize = getPotentialBlockSize(myBlock);
	//console.log(myPotentialSize);

	if (!myPotentialPosition.hasOwnProperty('left')) {
		myPotentialPosition.left = myPotentialPosition.right - myPotentialSize.width;
	}
	else if (!myPotentialPosition.hasOwnProperty('right')) {
		myPotentialPosition.right = myPotentialPosition.left + myPotentialSize.width;
	}

	if (!myPotentialPosition.hasOwnProperty('top')) {
		myPotentialPosition.top = myPotentialPosition.bottom - myPotentialSize.height;
	}
	else if (!myPotentialPosition.hasOwnProperty('bottom')) {
		myPotentialPosition.bottom = myPotentialPosition.top + myPotentialSize.height;
	}

	myBlock.potential.position.left = myPotentialPosition.left;
	myBlock.potential.position.top = myPotentialPosition.top;
	myBlock.potential.position.right = myPotentialPosition.right;
	myBlock.potential.position.bottom = myPotentialPosition.bottom;

	getPotentialBlockPosition(myBlock);
};


function setPotentialBlockSize(myBlock, myPotentialSize, align) { //outer, including margin + padding

	if (align === undefined) {
		align = {h: 'left', v: 'top'};
	}

	var initialPosition = getPotentialBlockPosition(myBlock);
	var newPosition = {};

	myBlock.potential.size.width = myPotentialSize.width;
	myBlock.potential.size.height = myPotentialSize.height;

	if (align.h == 'right') {
		newPosition.right = initialPosition.right;
	}
	else {
		newPosition.left = initialPosition.left;
	}
	if (align.v == 'bottom') {
		newPosition.bottom = initialPosition.bottom;
	}
	else {
		newPosition.top = initialPosition.top;
	}

	setPotentialBlockPosition(myBlock, newPosition);

	getPotentialBlockSize(myBlock);
};






//NEEDS UPDATING


function createPointer(myBlock, left) {
	if (left) {
		getBlockDiv(myBlock).find('.pointer').remove();
		getBlockDiv(myBlock).prepend( '<div class="pointer"><svg height="30" width="30" class="block-pointer left">'
									 + '<polygon points="30,0 30,30 0,15" style="fill:white;" />'
									 + '</svg></div>');
	}
	else {
		getBlockDiv(myBlock).find('.pointer').remove();
		getBlockDiv(myBlock).prepend( '<div class="pointer"><svg height="30" width="30" class="block-pointer right">'
									 + '<polygon points="0,0 0,30 30,15" style="fill:white;" />'
									 + '</svg></div>');
	}
};



$('#about-lightbox').css('left', (getArenaSize().width - parseInt($('#about-lightbox').css('width')) )/2);
	openAbout();

$(".about-link").click( function() {
	openAbout();
});

function openAbout() {
	$('#about-lightbox').css({'visibility': 'visible', 'opacity': 1});
	$('#about-lightbox').velocity("slideDown", 300);
	$('#background').css({ 'z-index': 999, 'opacity': 0.7 });
}


//TESTS


function testAfterPageLoads() {
	var myEvent = {pageX: 666, pageY: 146};
	console.log(blockSwitch($('a[href$="#detail-5"]'), 'a', true, myEvent));

	//    $('.block').velocity({ top: 500 }, 500);
};

function testOneSecondAfterPageLoads() {
	var myEvent = {pageX: 666, pageY: 136};
	//console.log(blockSwitch($('a[href$="#detail-1"]'), 'a', false, myEvent));
};
