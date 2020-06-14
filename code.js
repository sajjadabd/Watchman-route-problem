class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	
	printPoint(){
		console.log("X : " + this.x + " Y : " + this.y);
	}
}


class line{
	constructor(a,b,start,end,slope,direction){
		this.a = a;
		this.b = b;
		// y = a*x + b
		this.start = start;// start = new Point(startX,startY);
		this.end = end; // end = new Point(endX,endY);
		this.slope = slope;// number : 1 , -1 , 1.5 
		this.direction = direction; // "right" Or "left"
	}
}


class LineCollision{
	constructor(x,y,next,prev,whichLine,fromWhichLine) {
		this.x = x;
		this.y = y;
		this.next = next;
		this.prev = prev;
		this.whichLine = whichLine;
		this.fromWhichLine = fromWhichLine;
	}
}


class node{
	constructor(x,y,next,prev,angle,lines){
		if(arguments.length == 6){
			this.x = x;
			this.y = y;
			this.next = [];
			this.next.push(next);
			this.prev = [];
			this.prev.push(prev);
			this.angle = "=="; 
			this.lines = [];
			this.lines.push(lines);
			this.visited = 1; // prev.length
			// >    ==> bigger than 180
			// <    ==> less than 180
			// ==    ==> equal to 180
		} else {
			this.x = x;
			this.y = y;
			this.next = [];
			this.next.push(next);
			this.prev = [];
			this.prev.push(prev);
			this.angle = ""; 
			this.lines = [];
			this.visited = 1; // prev.length
			// >    ==> bigger than 180
			// <    ==> less than 180
			// ==    ==> equal to 180
		}
	}

	increaseVisited(){
		this.visited++;
	}

	decreaseVisited(){
		this.visited--;
	}
	
	printNode(){
		console.log("X : " + this.x + " Y : " + this.y);
	}
}


class listForCollisions {

	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	addCollision(x,y,counter2,counter) {
		if(this.head == null) {
			this.tail = 
			this.head = 
			new LineCollision(x,y,null,null,counter2,counter);
		} else {
			let temp = this.head;
			while ( temp.next != null ) {
				temp = temp.next;
			}

			this.tail = 
			temp.next = 
			new LineCollision(x,y,null,null,counter2,counter);
		}
		this.size++;
	}


	returnMaxIndex() {
		if(this.head == null){
			return null;
		}

		let temp = this.head;
		let index = 1;
		let counter = 1;
		let max = temp.x;
		while( temp.next != null ) {
			temp = temp.next;
			counter++;
			if(temp.x > max){
				max = temp.x;
				index = counter;
			}
		}

		return index;
	}




	returnMinIndex(){
		if(this.head == null){
			return null;
		}

		let temp = this.head;
		let index = 1;
		let counter = 1;
		let max = temp.x;
		while( temp.next != null ) {
			temp = temp.next;
			counter++;
			if(temp.x < max) {
				max = temp.x;
				index = counter;
			}
		}

		return index;
	}



	removeExceptMaxIndex(){
		let maxIndex = this.returnMaxIndex();

		let temp = this.head;
		
		let counter = 1;
		while( temp != null ) {

			if( counter == maxIndex ) {
				return temp;
			} else if ( this.head.next != null) {
				this.head == this.head.next;
			}

			temp = temp.next;
			counter++;
			
		}
	}




	removeExceptMinIndex() {
		let minIndex = this.returnMinIndex();

		let temp = this.head;
		
		let counter = 1;
		while( temp != null ) {

			if( counter == minIndex ) {
				return temp;
			} else if ( this.head.next != null) {
				this.head == this.head.next;
			}

			temp = temp.next;
			counter++;
			
		}
	}



	removeAllExceptHead(){
		
		if(this.head == null || this.tail == null){
			return null;
		}
		
		this.head.next = null;
		this.tail = this.head;

		this.size = 1;
	}
	
	removeAllExceptTail(){
		
		if(this.head == null || this.tail == null){
			return null;
		}

		this.head = this.tail;
		
		this.size = 1;
	}
	

	printListForCollisions(){
		let temp = this.head ;
		while( temp != null ) {
			console.log(temp);
			temp = temp.next;
		}
	}

}


class list {
	constructor() {
		this.listOfNodes = [];
		this.head = null;
		this.tail = null;
		this.size = 0;
	}
	
	add(x,y){
		if(this.head == null){
			this.tail = this.head = new node(x,y,null,null);
			this.listOfNodes.push(this.tail);
		} else {
			let temp = this.head;
			while(temp.next[0] != null){
				temp = temp.next[0];
			}
			this.tail = temp.next[0] = new node(x,y,null,temp);
			this.listOfNodes.push(this.tail);
		}
		this.size++;
	}
	
	downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj) {

		console.log("downwards");

		temp.next[ii] = new node(
		collision.x,
		collision.y,
		oldNext2,
		temp,
		"==",
		null,//here_to
		);


		//this.listOfNodes.push(temp.next[ii]);
		//this.insertToArrayIndex(ii,temp.next[ii])
		
		oldNext2.prev.pop();
		oldNext2.prev.push(temp.next[ii]);
		//oldNext.prev[oldNext.prev.length-1] = temp.next[j];
		
		//this.size++;

		temp.next[ii].next.push(oldNext);
		oldNext.prev.pop();
		oldNext.prev.push(temp.next[ii]);
		oldNext.visited++;

		//temp2.next.pop();
		//temp2.next.push(temp.next[ii]);
		temp2.next[jj] = temp.next[ii];
		temp.next[ii].prev.push(temp2);
		//oldNext.prev[oldNext.prev.length-1] = temp.next[j];

		this.listOfNodes.push(temp.next[ii]);
		
		this.size++;
	}


	upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj) {

		console.log("upwards");

		temp.next[ii] = new node(
		collision.x,
		collision.y,
		oldNext,
		temp,
		"==",
		null,//here_to
		);

		//this.listOfNodes.push(temp.next[ii]);

		oldNext.prev.pop();
		oldNext.prev.push(temp.next[ii]);
		//oldNext.prev[oldNext.prev.length-1] = temp.next[j];
		
		//this.size++;

		//temp2.next.pop();
		//temp2.next.push(temp.next[ii]);
		temp2.next[jj] = temp.next[ii];
		temp.next[ii].prev.push(temp2);
		//oldNext.prev[oldNext.prev.length-1] = temp.next[j];

		temp.next[ii].next.push(oldNext2);
		oldNext2.prev.pop();
		oldNext2.prev.push(temp.next[ii]);
		oldNext2.visited++;

		this.size++;

		this.listOfNodes.push(temp.next[ii]);
	}
	
	
	insertAfterIndexForDashedLine(collision,counter,ii,counter2,jj) {

		//console.log("counter : " + counter + " ii : " + ii);
		//console.log("counter2 : " + counter2 + " jj : " + jj);

		let temp;
		let temp2;
		let firstLine;
		let secondLine;
		let oldNext;
		let oldNext2;
		let SIZE = l.listOfNodes.length;

		for(let i=0;i<SIZE;i++){
			temp = l.listOfNodes[i];
			if( i == counter ) {
				for(let iCounter = 0 ; iCounter < temp.next.length ; iCounter++ ) {

					if( iCounter == ii ) {
						oldNext = temp.next[iCounter];
						firstLine = createLine(temp.x,temp.y,oldNext.x,oldNext.y);
						for( let j=0;j<SIZE;j++ ) {
							temp2 = l.listOfNodes[j];
							if( j == counter2 ) {
								for( let jCounter = 0 ; jCounter < temp2.next.length; jCounter++ ){
									if( jCounter == jj ) {
										oldNext2 = temp2.next[jCounter];
										secondLine = createLine(temp2.x,temp2.y,oldNext2.x,oldNext2.y);
										//console.log("counter : " + i + " ii : " + iCounter);
										//console.log("counter2 : " + j + " jj : " + jCounter);
										console.log("firstLine : ");
										console.log(firstLine);
										console.log("secondLine : ");
										console.log(secondLine);
										// first split the collided line and then
										// split the collider line 
										// it has an important effect on coloring kernel
										
										// downwards means select oldNext first
										// upwards means select oldNext2 first
										
										if( firstLine.slope < 0 && firstLine.direction == "right" ) {
											if( secondLine.slope < 0 && secondLine.direction == "right" ) {
												if( firstLine.slope < secondLine.slope ) {
													this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
												} else {
													this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
												}
											} else if( secondLine.slope < 0 && secondLine.direction == "left" ) {
												this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope > 0 && secondLine.direction == "right" ) {
												this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope > 0 && secondLine.direction == "left" ) {
												this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											}
										} else if( firstLine.slope < 0 && firstLine.direction == "left" ) {
											if( secondLine.slope < 0 && secondLine.direction == "right" ) {
												this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope < 0 && secondLine.direction == "left" ) {
												if( firstLine.slope < secondLine.slope ) {
													this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
												} else {
													this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
												}
											} else if( secondLine.slope > 0 && secondLine.direction == "right" ) {
												this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope > 0 && secondLine.direction == "left" ) {
												this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											}
										} else if( firstLine.slope > 0 && firstLine.direction == "right" ) {
											if( secondLine.slope < 0 && secondLine.direction == "right" ) {
												this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope < 0 && secondLine.direction == "left" ) {
												this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope > 0 && secondLine.direction == "right" ) {
												if( firstLine.slope > secondLine.slope ) {
													this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
												} else {
													this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
												}
											} else if( secondLine.slope > 0 && secondLine.direction == "left" ) {
												this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											}
										} else if( firstLine.slope > 0 && firstLine.direction == "left" ) {
											if( secondLine.slope < 0 && secondLine.direction == "right" ) {
												this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope < 0 && secondLine.direction == "left" ) {
												this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope > 0 && secondLine.direction == "right" ) {
												this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
											} else if( secondLine.slope > 0 && secondLine.direction == "left" ) {
												if( firstLine.slope < secondLine.slope ) {
													this.upwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
												} else {
													this.downwards(collision,temp,oldNext,temp2,oldNext2,ii,jj);
												}
											}
										} 
										
										break;
									}
								}
							}
						}
					}
				}
			}
		}
	}


	
	
	insertAfterIndex(index,collision){

		let temp = this.head;
		let counter = 1;
		while( counter < index && temp.next[0] != null ){
			temp = temp.next[0];
			counter++;
		}
		
		let oldNext = temp.next[0];
		
		let till_here = createLine(temp.x,temp.y,collision.x,collision.y);
		let here_to = createLine(collision.x,collision.y,oldNext.x,oldNext.y);
		

		
		temp.lines[0] = till_here;
		
		
		temp.next[0] = new node(
		collision.x,
		collision.y,
		temp.next[0],
		temp,
		"==",
		here_to
		);


		this.insertToArrayIndex(index,temp.next[0]);
		
		oldNext.prev[0] = temp.next[0];
		
		if( temp == this.tail ){
			this.tail = temp.next[0];
		}
		
		this.size++;
		
		return temp.next[0];
	}


	insertToArrayIndex(index,temp){
		for(let i=this.listOfNodes.length;i>index;i--){
			this.listOfNodes[i] = this.listOfNodes[i-1];
		}
		this.listOfNodes[index] = temp;
	}
	
	returnLast() {
		let temp = this.head ;
		if ( temp == null ){
			return null;
		}
		
		let counter = 1;
		while( counter < this.size &&  temp.next[0] != null) {
			temp = temp.next[0];
			counter++;
		}
		return temp;
	}
	
	returnIndex(index){
		let temp = this.head ;
		if ( temp == null ){
			return null;
		}
		
		let counter = 1;
		while(counter < index && temp.next[0] != null) {
			temp = temp.next[0];
			counter++;
		}
		return temp;
	}
	
	
	returnAfterIndex(index){
		let temp = this.head ;
		
		if ( temp == null ){
			return null;
		}
		
		let counter = 1;
		while(counter < index && temp.next[0] != null) {
			temp = temp.next[0];
			counter++;
		}
		return temp.next[0];
	}
	
	
	
	returnPrevIndex(index){
		let temp = this.head ;
		
		if ( temp == null ){
			return null;
		}
		
		let counter = 1;
		while(counter < index && temp.next[0] != null) {
			temp = temp.next[0];
			counter++;
		}
		return temp.prev[0];
	}
	
	
	
	
	returnOneBeforeLast() {
		let temp = this.head ;
		if ( temp == null ){
			return null;
		}
		
		let counter = 1;
		while(counter < this.size && temp.next[0] != null) {
			temp = temp.next[0];
			counter++;
		}
		return temp;
	}
	
	returnFirst(){
		return this.head ;
	}
	
	printHead(){
		this.head.printNode();
	}
	
	printTail(){
		this.tail.printNode();
	}

	
	printList() {
		let temp = this.head ;

		while( true ){ // counter <= this.size && temp.next[0] != null
			temp = temp.next[0];

			if( temp == this.head) {
				break;
			}
		}
	}
	
	
	yellowBasedOnAngle(temp) {
		ctx.beginPath();
		if( temp.angle == ">" ) {
			ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
		} else if( temp.angle == "<" ) {
			ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
		} else if( temp.angle == "==" ) {
			ctx.arc(temp.x, temp.y, 3, 0, 2 * Math.PI);
		} else {
			
		}
		ctx.fillStyle = "yellow";
		ctx.fill();
		ctx.stroke();
	}


	colorBasedOnAngle(temp,color) {
		ctx.beginPath();
		if( temp.angle == ">" ) {
			ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
		} else if( temp.angle == "<" ) {
			ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
		} else if( temp.angle == "==" ) {
			ctx.arc(temp.x, temp.y, 3, 0, 2 * Math.PI);
		} else {
			
		}
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
	}
	
	
	analizeNodesStepByStep(whichNode) {
		
		for(let i=0;i<this.listOfNodes.length;i++) {
			let temp = this.listOfNodes[i];
			if( i == whichNode-1 ) {
				//console.log(temp);
				this.yellowBasedOnAngle(temp);
				return;
			}
		}

	}
	
	printListOfNodesInArray() {
		for(let i = 0;i<this.listOfNodes.length;i++){
			console.log(this.listOfNodes[i]);
		}
	}
	
	makeAllNodesFalse() {

		for(let i=0;i<this.listOfNodes.length;i++){
			let temp = this.listOfNodes[i];
			temp.visited = temp.prev.length;
		}

	}
}




let l = new list();

let canvasWidth = 800;
let canvasHeight = 500;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let addNodes = true;

canvas.addEventListener("click", printMousePos);


function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { Top: _y, Left: _x };
}


let canvasYOffset = getOffset( document.getElementById('myCanvas') ).Top;
let canvasXOffset = getOffset( document.getElementById('myCanvas') ).Left;


function printMousePos(event) {

	ctx.setLineDash([0]);

	if(addNodes == true) {
		
	} else {
		return;
	}

	var x = event.clientX - canvasXOffset; // Get the horizontal coordinate
	var y = event.clientY - canvasYOffset; // Get the vertical coordinate
	
	l.add(x,y);
	draw(false);
	drawCirclesBasedOnAngle();
}


let analizeCounter = 1;
let stepCounter = 1;
let hitTheSpot = false;
let vertex = 0;


let showDetails = document.getElementById("showDetails");
showDetails.addEventListener("click",function(){
	if( hitTheSpot == true ) {
		drawCompletely(true);
		if(showDetails.checked == true){
			drawCirclesBasedOnAngle();
		} else {
			drawCirclesForInerCollisions();
		}
		
	} else {
		draw();
		if(showDetails.checked == true){
			drawCirclesBasedOnAngle();
		} else {
			
		}
	}
	
	if ( alreadyHit == true ) {
		HitTheSpot();
	}
});

document.addEventListener("keypress", function (event) {
	//console.log(event);
	if ( event.keyCode == 13 ) {
		closePathFunction();
		checkAngles();
		hitTheSpot = true;
	}
	else if(event.key == 'k') {
		checkAngles();
	} else if(event.key == 'd') {
		stepBystep();
		hitTheSpot = true;
	} else if(event.key == 'f') {
		l.printListOfNodesInArray();
	} else if(event.key == 'c') {
		console.clear();
	} else if(event.key == 'i') {
		hitTheSpot = true;
		doTheJobOfInerCollisions();
	} else if(event.key == 'a') {
		if( analizeCounter > l.size  ) {
			l.makeAllNodesFalse();
			analizeCounter = 1;
			drawCirclesBasedOnAngle();
		} else {
			l.analizeNodesStepByStep(analizeCounter,true);
			analizeCounter++;
		}
	} else if (event.key == 'o') {
		FindKernel();
	} else if (event.key == 's') {
		saveAs();
	} else if (event.key == 'x') {
		clearCanvasFunction();
	} else if (event.key == 'u') {
		if( hitTheSpot == false ) {
			//closePathFunction();
			//checkAngles();
			hitTheSpot = true;
		} else {
			HitTheSpot();
		}
	} else if(event.key == 'e') {
		istep();
	} 
});


function istep(){
	//console.log(vertex);
	if( vertex >= l.listOfNodes.length ) {

	} else {
		checkInterLinesCollisionStepByStep(vertex);
		closePathFunction();
		vertex++;
	}
}


let istepButton = document.getElementById("istep");
istepButton.addEventListener("click", istep);



let coloring = document.getElementById("coloring");
coloring.addEventListener("click",HitTheSpot);

let alreadyHit = false;

function HitTheSpot(){
	traverseGraphForFindingLoop();
	l.makeAllNodesFalse();
	if(alreadyHit == false){
		alreadyHit = true;
	} else {
		
	}
}



let interCollisions = document.getElementById("interCollisions");
interCollisions.addEventListener("click",function(){
	doTheJobOfInerCollisions();
});


let InerCollisionDone = false;


function doTheJobOfInerCollisions() {
	if( InerCollisionDone == false ){
		
		for(let i=vertex; i < l.listOfNodes.length ; i++) {
			checkInterLinesCollisionStepByStep(i);
			//checkInterLinesCollisionStepByStepv2(i)
		}
		//checkInterLinesCollisionCompletely();
		
		//checkInterLinesCollisionStepByStep(vertex,true);
		vertex = l.listOfNodes.length;
	}
	
	closePathFunction();
	InerCollisionDone = true;
}


let clear = document.getElementById("clear");
clear.addEventListener("click",clearCanvasFunction);

function clearCanvasFunction() {
	//console.clear();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	l = new list();
	addNodes = true;
	checkAnglesBoolean = false;
	stepCounter = 1;
	analizeCounter = 1;
	hitTheSpot = false;
	InerCollisionDone = false;
	vertex = 0;
}


let save = document.getElementById("save");
save.addEventListener("click",saveAs);

function saveAs(){
	exportCanvasAsPNG("myCanvas","shape.png");
}


let closepath = document.getElementById("closePath");
closePath.addEventListener("click",function(){
	closePathFunction();
	checkAngles();
	hitTheSpot = true;
});



function closePathFunction() { 
	
	if(l.head == null){
		return;
	}

	if(addNodes == true){
		l.head.prev = [];
		l.head.prev.push(l.tail);
		
		l.tail.next = [];
		l.tail.next.push(l.head);
	}
	
	drawCompletely(true);//cloth path
	if(showDetails.checked == true){
		drawCirclesBasedOnAngle();
	} else {
		drawCirclesForInerCollisions();
	}
	
	addNodes = false;
}




let checkAnglesBoolean = false;

let angles = document.getElementById("angles");
angles.addEventListener("click",checkAngles);


let lines = new list();

kernel = document.getElementById("kernel");
kernel.addEventListener("click",FindKernel);



function FindKernel(){

	if( stepCounter < l.listOfNodes.length ) {
		for(let i = stepCounter-1 ; i < l.listOfNodes.length ; i++ ){
			stepBystepForKernel();
			drawWholeGraphAgian();
		}
	} else {
		drawWholeGraphAgian();
	}

}


let step = document.getElementById("step");

step.addEventListener("click",stepBystep);


function stepBystepForKernel() {
	if(checkAnglesBoolean == true) {
		stepCounter++;
		makeListOfLines();
		checkCollisionOfLinesStepByStep(stepCounter);
	}
}

function stepBystep() {
	if(checkAnglesBoolean == true) {
		stepCounter++;
		//console.clear();
		makeListOfLines();
		checkCollisionOfLinesStepByStep(stepCounter);
		drawWholeGraphAgian();
	}
}




function calculateSlope() {
	let oneBeforeLast = l.returnOneBeforeLast();
	let lastNode = l.returnLast();
	
	
	let dy = lastNode.y - oneBeforeLast.y;
	let dx = lastNode.x - oneBeforeLast.x;
	
	let m = dy / dx ;
}



function draw(closePath) {
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.strokeStyle = "black";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.beginPath();
	let SIZE;
	if(closePath) {
		SIZE = l.size+1;
	} else {
		SIZE = l.size;
	}

	for(let i=0;i<l.listOfNodes.length;i++){
		let temp = l.listOfNodes[i];

		if( i == 0 ){
			ctx.moveTo(temp.x, temp.y);
		} else {
			ctx.lineTo(temp.x, temp.y);
			
			//let m = calculateSlope();
			//let oneBeforeLast = l.returnPrevIndex(counter);
			let oneBeforeLast = temp.prev[0];
			let from = new Point(oneBeforeLast.x,oneBeforeLast.y);
			let to = new Point(temp.x,temp.y);
			let middleX = (to.x+from.x)/2;
			let middleY = (to.y+from.y)/2;
			let middle = new Point(middleX,middleY);

			drawArrowhead(ctx,from,middle,6);
			
			ctx.moveTo(to.x,to.y);
		}
	}

	ctx.stroke();
}




function drawTo(temp,i,line) {
	
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.lineCap = "round";
	ctx.setLineDash([0]);
	ctx.strokeStyle = "black";
	
	if(line == true){
		ctx.setLineDash([0]);
	} else {
		ctx.setLineDash([5]);
	}
	

	ctx.moveTo(temp.x,temp.y);
	ctx.lineTo(temp.next[i].x, temp.next[i].y);

	//let m = calculateSlope();
	let oneBeforeLast = temp;
	let from = new Point(oneBeforeLast.x,oneBeforeLast.y);
	let to = new Point(temp.next[i].x,temp.next[i].y);
	let middleX = (to.x+from.x)/2;
	let middleY = (to.y+from.y)/2;
	let middle = new Point(middleX,middleY);
	ctx.stroke();

	if(showDetails.checked == true){
		ctx.beginPath();
		ctx.setLineDash([0]);
		drawArrowhead(ctx,from,middle,6);
		ctx.stroke();
	}
	
}



function drawCompletely(closePath) {
	
	let reachToEnd = false;

	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.strokeStyle = "black";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	
	ctx.beginPath();
	let SIZE;
	if(closePath) {
		SIZE = l.size+1;
		//SIZE = l.listOfNodes.length + 1;
	} else {
		SIZE = l.size;
		//SIZE = l.listOfNodes.length;
	}

	let HEAD = l.listOfNodes[0];

	for(let i=0;i<l.listOfNodes.length;i++) {
		let temp = l.listOfNodes[i];
		
		ctx.beginPath();
		ctx.moveTo(temp.x, temp.y);
		ctx.stroke();

		for(let j=0;j<temp.next.length;j++) {
			//let temp2 = temp.next[j];
			if( j == 0 ){
				if(reachToEnd == false) {
					drawTo(temp,j,true);
				} else {
					//if( showDetails.checked == true ) {
						drawTo(temp,j,false);
					//}
				}
			} else {
				//if( showDetails.checked == true ) {
					drawTo(temp,j,false);
				//}
			}
		}

		if(temp.next[0] == HEAD) {
			reachToEnd = true;
		}
	}

	//ctx.setLineDash([5,10]);
	//dashes are 5px and spaces are 10px
}


function drawCirclesForInerCollisions(){
	let reachToEnd = false;

	let HEAD = l.listOfNodes[0];

	let temp;

	for(let i=0;i<l.listOfNodes.length;i++){
		temp = l.listOfNodes[i];

		if( reachToEnd == true ) {
			if(temp.angle == "==") {
				ctx.beginPath();
				ctx.arc(temp.x, temp.y, 3, 0, 2 * Math.PI);
				ctx.fillStyle = "purple";
				ctx.fill();
			}
		}

		if( temp.next[0] == HEAD ) {
			reachToEnd = true;
		}
	}
	ctx.stroke();
}



function drawCirclesBasedOnAngle(){
	
	let reachToEnd = false;
	let HEAD = l.listOfNodes[0];

	let temp;
	for(let i=0;i<l.listOfNodes.length;i++){
		temp = l.listOfNodes[i];

		if( reachToEnd == false) {

			ctx.beginPath();
			if(temp.angle == "<" ){
				ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
				ctx.fillStyle = "blue";
			} else if ( temp.angle == "==" ) {
				ctx.arc(temp.x, temp.y, 3, 0, 2 * Math.PI);
				ctx.fillStyle = "purple";
			} else if ( temp.angle == ">" ){
				ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
				ctx.fillStyle = "red";
			} else {
				ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
				ctx.fillStyle = "green";
			}
			ctx.fill();

		} else {
			
			if(showDetails.checked == true){
				ctx.beginPath();
				if(temp.angle == "<" ){
					ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
					ctx.fillStyle = "blue";
				} else if ( temp.angle == "==" ) {
					ctx.arc(temp.x, temp.y, 3, 0, 2 * Math.PI);
					ctx.fillStyle = "purple";
				} else if ( temp.angle == ">" ){
					ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
					ctx.fillStyle = "red";
				} else {
					ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
					ctx.fillStyle = "green";
				}
				ctx.fill();
			} else {
				ctx.beginPath();
				if(temp.angle == "<" ){
					ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
					ctx.fillStyle = "blue";
				} else if ( temp.angle == ">" ){
					ctx.arc(temp.x, temp.y, 5, 0, 2 * Math.PI);
					ctx.fillStyle = "red";
				}
				ctx.fill();
			}

		}
		
		
		if( temp.next[0] == HEAD ) {
			reachToEnd = true;
		}

	}

	ctx.stroke();
	//ctx.setLineDash([5,10]);
	//dashes are 5px and spaces are 10px
}






function exportCanvasAsPNG(id, fileName) {

    var canvasElement = document.getElementById(id);

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}





function drawArrowhead(context, from, to, radius) {
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	ctx.fillStyle = "black";
	ctx.lineCap = "round";

	var x_center = to.x;
	var y_center = to.y;

	var angle;
	var x;
	var y;
	


	angle = Math.atan2(to.y - from.y, to.x - from.x);
	let mainx = x = radius * Math.cos(angle) + x_center;
	let mainy = y = radius * Math.sin(angle) + y_center;

	context.moveTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI);
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	context.lineTo(x, y);
	
	context.moveTo(mainx, mainy);

	angle += (1.0/3.0) * (2 * Math.PI);
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	context.lineTo(x, y);
}


function createLine(x1,y1,x2,y2) {
	let dy = y2 - y1;
	let dx = x2 - x1;
	
	let m;
	let a;
	let b;
	if(dx == 0){
		m = "infinity" ;
	} else {
		m = dy / dx ;
		a = m;
		b = ( -1 * m * x1 ) + y1 ;
	}
	
	let start = new Point(x1,y1);
	let end = new Point(x2,y2);
	
	let slope = m;
	
	let direction = "";
	
	if( x2 >= x1 ) {
		direction = "right";
	} else {
		direction = "left";
	}
	
	let newline;
	if( m == 0 ){
		newline = new line(0,0,start,end,slope,direction);
	} else {
		newline = new line(a,b,start,end,slope,direction);
	}
	
	return newline;
}




function checkAngles() {

	console.log("checkAngles");
	//ctx.setLineDash([0]);
	ctx.setLineDash([5]);

	for(let i=0;i<l.listOfNodes.length;i++) {
		let temp = l.listOfNodes[i];

		if( temp.angle == "" && checkAnglesBoolean == false ){
			let current = temp;

			let prev = current.prev[0];
			let after = current.next[0];
	
			let newline = createLine(prev.x,prev.y,after.x,after.y);
			
			console.log(newline);
			
			if( newline.a == 0 ) {
				if( newline.direction == "right" ){
					if(current.y < prev.y){
						current.angle = "<";
					} else if(current.y > prev.y) {
						current.angle = ">";
					} else {
						current.angle = "==";
					}
				} else if( newline.direction == "left" ) {
					if(current.y < prev.y){
						current.angle = ">";
					} else if(current.y > prev.y) {
						current.angle = "<";
					} else {
						current.angle = "==";
					}
				}
			} else {
				let comparision = ((newline.a * current.x) + newline.b );
				
				if ( current.y == comparision ) {
					current.angle = "==";
				} else if( current.y < comparision ) {
					if(newline.direction == "left"){
						current.angle = "<";
					} else if(newline.direction == "right"){
						current.angle = ">";
					}
				} else if ( current.y > comparision ) {
					if(newline.direction == "left"){
						current.angle = ">";
					} else if(newline.direction == "right"){
						current.angle = "<";
					}
				}
		
				//reverse because of canvas --y-- is reverse
				if(current.angle == ">") {
					current.angle = "<";
				} else if(current.angle == "<") {
					current.angle = ">";
				}
			}
		}
	}
	
	checkAnglesBoolean = true;
	drawCirclesBasedOnAngle();
}



function makeListOfLines(){
	let temp = l.head;
	
	let counter = 1;
	while( counter <= l.size && temp.next[0] != null ){
		
		let newline = createLine(temp.x,temp.y,temp.next[0].x,temp.next[0].y);
		
		temp.lines.pop();
		temp.lines.push(newline);
		
		temp = temp.next[0];
		counter++;
	}
}


let roundMeterForInerLines = 3;
//let offsetForInerLines = 0.2;


let roundMeter = 3;
let offset = 0.2;


function returnCollisionOfTwoInterLines(firstLine,secondLine){
	let a1 = firstLine.a;
	let a2 = secondLine.a;
	let b1 = firstLine.b;
	let b2 = secondLine.b;
	
	let da = a1 - a2;
	let db = b2 - b1;
	
	let x = db / da ;
	
	let y =	a1 * x + b1 ;
	
	let collision = null ;
	
	
	x = Number(x.toFixed(roundMeterForInerLines));
	y = Number(y.toFixed(roundMeterForInerLines));
	
	if( firstLine.direction == "right" ) {
		if ( x > firstLine.start.x && x < firstLine.end.x  ) {
			if( secondLine.direction == "right" ) {
				if ( x > secondLine.start.x && x < secondLine.end.x  ) {
					collision = new Point(x,y);
				}
			}
		}
	}
	
	
	if( firstLine.direction == "right" ) {
		if ( x > firstLine.start.x && x < firstLine.end.x  ) {
			if( secondLine.direction == "left" ) {
				if ( x > secondLine.end.x && x < secondLine.start.x  ) {
					collision = new Point(x,y);
				}
			}
		}
	}
	
	
	
	
	if( firstLine.direction == "left" ) {
		if ( x > firstLine.end.x && x < firstLine.start.x  ) {
			if( secondLine.direction == "right" ) {
				if ( x > secondLine.start.x && x < secondLine.end.x  ) {
					collision = new Point(x,y);
				}
			}
		}
	}
	
	
	if( firstLine.direction == "left" ) {
		if ( x > firstLine.end.x && x < firstLine.start.x  ) {
			if( secondLine.direction == "left" ) {
				if ( x > secondLine.end.x && x < secondLine.start.x  ) {
					collision = new Point(x,y);
				}
			}
		}
	}
	
	return collision;
}





function returnCollisionOfTwoLines(firstLine,secondLine){
	let a1 = firstLine.a;
	let a2 = secondLine.a;
	let b1 = firstLine.b;
	let b2 = secondLine.b;
	
	let da = a1 - a2;
	let db = b2 - b1;
	

	if ( a1 == a2 ) {
		return null;
	} 


	let x;
	
	if( da == 0 ){
		//x = 0
		if( a1 == 0 ){
			x = b1 - b2 / a2;
		} else if ( a2 == 0 ) {
			x = b2 - b1 / a1;
		}
		cosnole.log("da == 0");
	} else {
		x = db / da ;
	}
	
	
	let y =	a1 * x + b1 ;
	
	let collision = null ;

	
	x = Number(x.toFixed(roundMeter));
	y = Number(y.toFixed(roundMeter));

	if( secondLine.direction == "right" ) {
		
		if ( x > secondLine.start.x && x < secondLine.end.x  ) {
			
			if( firstLine.direction == "right" ) {
				//if ( x > firstLine.start.x  && x < firstLine.end.x  ) {
				if( Math.abs(x - firstLine.start.x) > offset &&
					Math.abs( x - firstLine.end.x ) < offset ) {
					collision = null;
				} else {
					collision = new Point(x,y);
				}
			} else if( firstLine.direction == "left" ) {
				//if ( x > firstLine.end.x && x < firstLine.start.x ) {
				if( Math.abs(x - firstLine.end.x) > offset &&
					Math.abs( x - firstLine.start.x ) < offset ) {
					collision = null;
				} else {
					collision = new Point(x,y);
				}
			}
		}
	} else if ( secondLine.direction == "left" ) {
		
		if ( x > secondLine.end.x && x < secondLine.start.x  ) {
			
			if( firstLine.direction == "right" ) {
				//if ( x > firstLine.start.x && x < firstLine.end.x ) {
				if( Math.abs(x - firstLine.start.x) > offset &&
					Math.abs( x - firstLine.end.x ) < offset ) {
					collision = null;
				} else {
					collision = new Point(x,y);
				}
			} else if( firstLine.direction == "left" ) {
				//if ( x > firstLine.end.x && x < firstLine.start.x  ) {
				if( Math.abs(x - firstLine.end.x) > offset &&
					Math.abs( x - firstLine.start.x ) < offset ) {	
					collision = null;
				} else {
					collision = new Point(x,y);
				}
			}
		}
	}
	//console.log(collision);
	return collision;
}


function drawCollisionPoint(collision) {
	ctx.beginPath();
	ctx.arc(collision.x, collision.y, 2, 0, 2 * Math.PI);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.stroke();
}



function checkCollisionOfLinesStepByStep(stepCounter) {

	let listOfRightCollisions = new listForCollisions();
	let listOfLeftCollisions = new listForCollisions();
	

	let increaseMeterForRight = 0;	
	let increaseMeterForLeft = 0;
	
	
	let myStepCounter = 1;
	let counter = 1;
	let temp = l.head;
	while ( counter <= l.size && temp.next[0] != null ) {
		
		if( temp.angle == ">"  ) {

			myStepCounter++;

			if( myStepCounter < stepCounter ) {
				temp = temp.next[0];
				counter++;
				continue;
			} else if( myStepCounter == stepCounter ){
				
			} else if( myStepCounter > stepCounter ){
				break;
			}


			
			let firstLine = temp.lines[0];
			let preVfirstLine = temp.prev[0].lines[0];
			let secondLine;
			let collision;
			let temp2 = l.head;
			let counter2 = 1;
			while ( counter2 <= l.size && temp2.next[0] != null ) {
					
				if( counter2 == counter ) {
					// we check the collision of this line 
					// to every other line except the line itself
				} else {
					secondLine = temp2.lines[0];
					collision = returnCollisionOfTwoLines(firstLine,secondLine);

					if(collision == null){
						
					} else {
						
						if(  
						firstLine.direction == "right" && 
						firstLine.slope != 0 &&
						collision.x > firstLine.end.x ) {

						} else if(  
							firstLine.direction == "left" && 
							firstLine.slope != 0 &&
							collision.x < firstLine.end.x ) {

						} else {
							listOfRightCollisions.addCollision(collision.x,collision.y,counter2,counter);
							
						}	
					}
				}
				temp2 = temp2.next[0];
				counter2++;
			}
			
			
			//firstLine = temp.prev[0].lines[0];
			temp2 = l.head;
			counter2 = 1;
			while ( counter2 <= l.size && temp2.next[0] != null ) {
				
				if( counter2 == counter-1 ) { // counter-1 (why?) because we are in temp.prev
					// we check the collision of this line 
					// to every other line except the line itself
				} else {
					secondLine = temp2.lines[0];
					collision = returnCollisionOfTwoLines(preVfirstLine,secondLine);
					
					if( collision == null ) {
						
					} else {

						if(  
							preVfirstLine.direction == "right" && 
							//preVfirstLine.slope < 0 &&
							firstLine.slope != 0 &&
							collision.x < preVfirstLine.start.x ) {
	
						} else if(  
							preVfirstLine.direction == "left" && 
							//preVfirstLine.slope < 0 &&
							firstLine.slope != 0 &&
							collision.x > preVfirstLine.start.x ) {

						} else {
							listOfLeftCollisions.addCollision(collision.x,collision.y,counter2,counter-1);
						
						}
					}
				}
				temp2 = temp2.next[0];
				counter2++;
			}
			

			console.log("listOfRightCollisions :");
			console.log(listOfRightCollisions);
			


			firstLine = temp.lines[0];

			console.log(firstLine);
			let correctRightCollision;

			if( firstLine.direction == "right" ) {
				console.log("reach here");
				if ( listOfRightCollisions.tail.x < firstLine.start.x  ) {
					correctRightCollision = listOfRightCollisions.removeExceptMaxIndex();
					console.log("right--1");
				} else  if ( listOfRightCollisions.tail.x > firstLine.end.x ) {
					correctRightCollision = listOfRightCollisions.removeExceptMinIndex();
					console.log("right--2");
				}  else if( listOfRightCollisions.head.x < firstLine.start.x ) {
					correctRightCollision = listOfRightCollisions.removeExceptMaxIndex();
					console.log("right--3");
				} else { // error , this should not happen
					correctRightCollision = listOfRightCollisions.removeExceptMaxIndex();
					console.log("right--4");
				}
			} else if ( firstLine.direction == "left" ) {
				console.log("reach here 2");
				if ( listOfRightCollisions.tail.x > firstLine.end.x ) {
					correctRightCollision = listOfRightCollisions.removeExceptMinIndex();
					console.log("left--1");
				} else if ( listOfRightCollisions.tail.x < firstLine.start.x ) {
					correctRightCollision = listOfRightCollisions.removeExceptMaxIndex();
					console.log("left--2");
				} else if( listOfRightCollisions.head.x < firstLine.start.x ) {
					correctRightCollision = listOfRightCollisions.removeExceptMaxIndex();
					console.log("left--3");
				} else { // error , this should not happen
					correctRightCollision = listOfRightCollisions.removeExceptMinIndex();
					console.log("left--4");
				}
			}

			console.log("listOfLeftCollisions :");
			console.log(listOfLeftCollisions);

			let correctLeftCollision;

			firstLine = temp.prev[0].lines[0];
			console.log(firstLine);
			if( firstLine.direction == "right" ) {
				console.log("reach here 3");
				if( listOfLeftCollisions.tail.x > firstLine.end.x ) {
					correctLeftCollision = listOfLeftCollisions.removeExceptMinIndex();
					console.log("right--11");
				} else if( listOfLeftCollisions.tail.x < firstLine.start.x ) {
					correctLeftCollision = listOfLeftCollisions.removeExceptMaxIndex();
					console.log("right--22");
				} else if ( listOfLeftCollisions.head.x < firstLine.start.x ) {
					correctLeftCollision = listOfLeftCollisions.removeExceptMaxIndex();
					console.log("right--33");
				} else { // error , this should not happen
					correctLeftCollision = listOfLeftCollisions.removeExceptMinIndex();
					console.log("right--44");
				}
			} else if ( firstLine.direction == "left" ) {
				console.log("reach here 4");
				if ( listOfLeftCollisions.tail.x > firstLine.end.x ) {
					correctLeftCollision = listOfLeftCollisions.removeExceptMinIndex();
					console.log("left--11");
				} else if( listOfLeftCollisions.tail.x < firstLine.start.x ) {
					correctLeftCollision = listOfLeftCollisions.removeExceptMaxIndex();
					console.log("left--22");
				} else if( listOfLeftCollisions.head.x < firstLine.start.x ) {
					correctLeftCollision = listOfLeftCollisions.removeExceptMaxIndex();
					console.log("left--33");
				} else { // error , this should not happen
					correctLeftCollision = listOfLeftCollisions.removeExceptMinIndex();
					console.log("left--44");
				}
			}

			console.log("listOfRightCollisions :");
			console.log(listOfRightCollisions);
			//let lineCollision = listOfRightCollisions.tail;

			if(correctRightCollision.whichLine < correctRightCollision.fromWhichLine) {
				increaseMeterForLeft = 1;
			} else {
				increaseMeterForRight = 1;
			}

			//console.log("listOfLeftCollisions :");
			//console.log(listOfLeftCollisions);
			//lineCollision = listOfLeftCollisions.tail;
	
			if(correctLeftCollision.whichLine < correctLeftCollision.fromWhichLine) {
				increaseMeterForLeft = 1;
			} else {
				increaseMeterForRight = 1;
			}

			//console.log("incrementMeterForLeft : " + increaseMeterForLeft);
			//console.log("incrementMeterForRight : " + increaseMeterForRight);
			

			let increaseMeter = increaseMeterForLeft - increaseMeterForRight ;

			if( increaseMeter == 0 ) {
				//increaseMeterForLeft = 0;
				increaseMeterForRight = 0;
			} else if (increaseMeter < 0 ) {
				increaseMeterForLeft = 0;
				increaseMeterForRight = 0;
			} else if (increaseMeter > 0 ) {
				increaseMeterForLeft = 0;
				increaseMeterForRight = 0;
			}



			collision = new Point(correctRightCollision.x,correctRightCollision.y);
			let newNode = l.insertAfterIndex(
				correctRightCollision.whichLine + increaseMeterForRight ,
				collision);//split the coliided line into two line
			
			newNode.next.push(temp);
			temp.prev.push(newNode);
			temp.increaseVisited();
			//let tempLine = createLine(collision.x,collision.y,temp.x,temp.y);


			collision = new Point(correctLeftCollision.x,correctLeftCollision.y);
					
			newNode = l.insertAfterIndex(
				correctLeftCollision.whichLine + increaseMeterForLeft ,
				collision);
			temp.next.push(newNode);
			newNode.prev.push(temp);
			newNode.increaseVisited();
			//let tempLine2 = createLine(temp.x,temp.y,collision.x,collision.y);

		}
		temp = temp.next[0];
		counter++;
	}
}



/*
function checkCollisionOfLines(){
	
	let listOfRightCollisions = new listForCollisions();
	let listOfLeftCollisions = new listForCollisions();
	
	let counter = 1;
	let temp = l.head;
	while ( counter <= l.size && temp.next[0] != null ) {
		if( temp.angle == ">" ) {
			let firstLine = temp.lines[0];
			let secondLine;
			let collision;
			let tempLine;
			let temp2 = l.head;
			let counter2 = 1;
			while ( counter2 <= l.size && temp2.next[0] != null ) {
				if( counter2 == counter ) {
					// we check the collision of this line 
					// to every other line except the line itself
				} else {
					secondLine = temp2.lines[0];
					collision = returnCollisionOfTwoLines(firstLine,secondLine);
					
					if(collision == null){
						
					} else {
						listOfRightCollisions.addCollision(collision.x,collision.y,counter2);
					}
				}
				temp2 = temp2.next[0];
				counter2++;
			}
			

			firstLine = temp.prev[0].lines[0];
			temp2 = l.head;
			counter2 = 1;
			while ( counter2 <= l.size && temp2.next[0] != null ) {
				if( counter2 == counter-1 ) { // counter-1 (why?) because we are in temp.prev
					// we check the collision of this line 
					// to every other line except the line itself
				} else {
					secondLine = temp2.lines[0];
					collision = returnCollisionOfTwoLines(firstLine,secondLine);
					
					if( collision == null ) {
						
					} else {
						listOfLeftCollisions.addCollision(collision.x,collision.y,counter2);
					}
					
				}
				temp2 = temp2.next[0];
				counter2++;
			}

			
			listOfRightCollisions.removeAllExceptHead();
			let collisionCounter = listOfRightCollisions.head;
			let increaseMeter = 1;
			// we use increase meter
			// because the number of line varies during 
			// adding lines 
			// and we can not rely on whichLine variables unfotunately
			while(collisionCounter != null){
				
				collision = new Point(collisionCounter.x,collisionCounter.y);
				
				let newNode = l.insertAfterIndex(collisionCounter.whichLine ,collision);//split the coliided line into two line
				
				drawCollisionPoint(collision);
				newNode.next.push(temp);
				temp.prev.push(newNode);
				tempLine = createLine(collision.x,collision.y,temp.x,temp.y);
				newNode.lines.push(tempLine);
				
				collisionCounter = collisionCounter.next;
				increaseMeter++;
			}
			
			listOfRightCollisions.removeFirstCollision();
			
			
			listOfLeftCollisions.removeAllExceptHead();
			collisionCounter = listOfLeftCollisions.head;
			increaseMeter = 1; 
			// we use increase meter
			// because the number of line varies during 
			// adding lines 
			// and we can not rely on whichLine variables unfotunately
			while(collisionCounter != null){
				
				collision = new Point(collisionCounter.x,collisionCounter.y);
				
				let newNode = l.insertAfterIndex(collisionCounter.whichLine ,collision);
						
				drawCollisionPoint(collision);

				temp.next.push(newNode);
				newNode.prev.push(temp);
				tempLine = createLine(temp.x,temp.y,collision.x,collision.y);
				temp.lines.push(tempLine);
				
				collisionCounter = collisionCounter.next;
				increaseMeter++;
			}
			
			listOfLeftCollisions.removeFirstCollision();
		}
		temp = temp.next[0];
		counter++;
	}
}
*/



function drawWholeGraphAgian(){
	drawCompletely(true);//cloth path
	if(showDetails.checked == true){
		drawCirclesBasedOnAngle();
	} else {
		drawCirclesForInerCollisions();
	}
}








function checkInterLinesCollisionStepByStep(vertex){

	let finishStep = false;
	let temp;
	let temp2;
	let mainLine;
	let otherLine;
	let collision;


	for(let i=0;i<l.listOfNodes.length;i++) {
		temp = l.listOfNodes[i];
		
		for(let iCounter = 0 ; iCounter < temp.next.length ; iCounter++ ) {
			
			mainLine = createLine(
				temp.x,temp.y,
				temp.next[iCounter].x,temp.next[iCounter].y
			);
			
			for( let j=0;j<l.listOfNodes.length;j++ ) {

				temp2 = l.listOfNodes[j];
				if( i == j ){
	
				} else {

					for( let jCounter = 0 ; jCounter < temp2.next.length; jCounter++ ){
						otherLine = createLine(temp2.x,temp2.y,temp2.next[jCounter].x,temp2.next[jCounter].y);
							
						collision = returnCollisionOfTwoInterLines(mainLine,otherLine);
						
						if(collision != null){
							//console.log(collision);
							
							/*
							setTimeout( function(){ 
								l.yellowBasedOnAngle(temp);
								//l.yellowBasedOnAngle(temp.next[iCounter]);

								l.yellowBasedOnAngle(temp2);
								//l.yellowBasedOnAngle(temp.next[jCounter]);
							}, 500);
							*/
							
							l.insertAfterIndexForDashedLine(collision,i,iCounter,j,jCounter);//split the coliided line into two line
							finishStep = true;
							break;
						}

					}
				}

				if(finishStep == true ) {
					break;
				}
			}
		}

		if( vertex == i ) {
			break; 
		}
	}
}









function checkInterLinesCollisionStepByStepv2(vertex){

	let finishStep = false;
	let temp;
	let temp2;
	let mainLine;
	let otherLine;
	let collision;


	//for(let i=0;i<l.listOfNodes.length;i++) {
		temp = l.listOfNodes[vertex];
		
		for(let iCounter = 0 ; iCounter < temp.next.length ; iCounter++ ) {
			
			mainLine = createLine(
				temp.x,temp.y,
				temp.next[iCounter].x,temp.next[iCounter].y
			);
			
			for( let j=0;j<l.listOfNodes.length;j++ ) {

				temp2 = l.listOfNodes[j];
				if( vertex == j ){
	
				} else {

					for( let jCounter = 0 ; jCounter < temp2.next.length; jCounter++ ){
						otherLine = createLine(temp2.x,temp2.y,temp2.next[jCounter].x,temp2.next[jCounter].y);
							
						collision = returnCollisionOfTwoInterLines(mainLine,otherLine);
						
						if(collision != null){
							//console.log(collision);
							
							/*
							setTimeout( function(){ 
								l.yellowBasedOnAngle(temp);
								//l.yellowBasedOnAngle(temp.next[iCounter]);

								l.yellowBasedOnAngle(temp2);
								//l.yellowBasedOnAngle(temp.next[jCounter]);
							}, 500);
							*/
							
							l.insertAfterIndexForDashedLine(collision,vertex,iCounter,j,jCounter);//split the coliided line into two line
							finishStep = true;
							break;
						}

					}
				}
				
				if(finishStep == true ) {
					break;
				}
			}
		}
		
		/*
		if( vertex == i ) {
			break; 
		}
		*/
	//}
}










function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}





function checkInterLinesCollision(){

	let temp;
	let temp2;
	let mainLine;
	let otherLine;
	let collision;

	let SIZE = l.listOfNodes.length;


	for(let i=0;i<SIZE;i++) {
		temp = l.listOfNodes[i];
		for(let iCounter = 0 ; iCounter < temp.next.length ; iCounter++ ) {
			
			mainLine = createLine(
				temp.x,temp.y,
				temp.next[iCounter].x,temp.next[iCounter].y
			);
			
			for( let j=0;j<SIZE;j++ ) {

				temp2 = l.listOfNodes[j];
				if( i == j ){
	
				} else {

					for( let jCounter = 0 ; jCounter < temp2.next.length; jCounter++ ){
						otherLine = createLine(temp2.x,temp2.y,temp2.next[jCounter].x,temp2.next[jCounter].y);
							
						collision = returnCollisionOfTwoInterLines(mainLine,otherLine);
						
						if(collision != null){
							//console.log(collision);
							l.insertAfterIndexForDashedLine(collision,i,iCounter,j,jCounter);//split the coliided line into two line
						}
					}
				}
			}
		}
	}
}



function fillWatchManRoute(start) {

	//ctx.lineWidth = 2;
	let temp = start ;
	//ctx.setLineDash([5,10]);
	//dashes are 5px and spaces are 10px

	//l.colorBasedOnAngle(temp,"Orange");
	ctx.setLineDash([1,100]);
	ctx.fillStyle = "rgba(3, 252, 223,0.5)";
	ctx.beginPath();
	
	ctx.moveTo(temp.x, temp.y);
	temp.visited = 0;


	while ( true ) {		
		
		temp = temp.next[temp.next.length-1];

		if( temp.visited == 0 ){
			//ctx.lineTo(temp.x, temp.y);
			ctx.closePath();
			ctx.fill();
			ctx.stroke(); 
			break;
		}
		
		ctx.lineTo(temp.x, temp.y);

		temp.visited = 0;
	}
}



function makeLoopVisitedFalse(start) {

	let temp = start ;
	temp.visited = temp.prev.length;
	while ( true ) {

		if( temp.next.length == 1 ) {
			temp = temp.next[temp.next.length-1];
		} else if ( temp.next[0].visited == 0 ) {
			temp = temp.next[0];
		} else if ( temp.next[1].visited == 0 ) {
			temp = temp.next[1];
		} else {
			temp = temp.next[temp.next.length-1];
		}

		temp.visited = temp.prev.length;
		
		if(temp == start) {
			break;
		}
	}
}


function loopFinder(start) {
	let temp = start ;

	while ( true ){

		if(temp.visited == 0) {
			break;
		}
		
		temp.visited = 0;

		temp = temp.next[temp.next.length-1];

		if( temp.visited == 0 ) {
			console.log("Find Loop");
			l.makeAllNodesFalse();
			fillWatchManRoute(temp);
			break;
		}

	}
}



function traverseGraphForFindingLoop(){
	let temp = l.head;

	while( true ) {

		if( temp.angle == ">" ) {
			//console.log("Find Angle +180");
			loopFinder(temp);
		}

		temp = temp.next[0];

		if( temp == l.head ) {
			break;
		}
	}
}