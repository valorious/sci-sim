var PageChain = function(){
	this.currentPointer = -1;
	this.chain = [];
    this.activePointer = -1;
};

PageChain.prototype.add = function (page) {
	if(this.chain.length >= 1){ // the first page is where simulation starts
		for (var i = 0; i < this.chain.length; i++) {
			if(_.isEqual(this.chain[i], page)){
				this.currentPointer = i;
                this.activePointer = this.currentPointer;
				return;
			}
		}
	}
	
	this.chain.push(page);
	this.currentPointer += 1;
    this.activePointer = this.currentPointer;
};

PageChain.prototype.goBack = function(){
	var current = this.currentPointer;
	this.currentPointer -= 1;
    this.activePointer = this.currentPointer;
	
	this.revivePage(current, this.currentPointer);
};

PageChain.prototype.goForward = function(){
	var current = this.currentPointer;
	this.currentPointer += 1;
    this.activePointer = this.currentPointer;
	
	this.revivePage(current, this.currentPointer);
};

PageChain.prototype.revivePage = function(current, newPage){
	this.chain[current].sleep();
	this.chain[newPage].revive();
};

PageChain.prototype.revivePageWithoutCurrent = function(newPage){
    this.getLastPage().sleep();
    this.chain[newPage].revive();
    this.activePointer = newPage;
};


PageChain.prototype.isThisLastPage = function(currentPage, currentDest) {
    if (this.currentPointer >= 0 && this.getLastPage().page_id != currentPage.page_id) {
        return this.chain[this.currentPointer].page_id;
    } else {
        return currentDest;
    }
}

PageChain.prototype.getLastPage = function(){
	return this.chain[this.chain.length - 1];
}

PageChain.prototype.getActivePage = function() {
    return this.chain[this.activePointer];
}

PageChain.prototype.count = function(){
	return this.chain.length;
};