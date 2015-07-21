//adds a new page to the simulation
function addPage() {
    var newPage = '<button onClick="promptRemove('+getPageNumToAdd()+')">Remove Page</button><div class="page-header"><h3 onClick="updateTitle(this)">'+getPageNumToAdd()+'</h3></div><table><tr><td><div class=\'header=\'>Page Title: </td><td><input type=\'text\' class=\'header\'></input></div></td></tr></table><div id="add-elem-'+getPageNumToAdd()+'"><span></span><button class="glyphicon glyphicon-font" onClick="addElement(\'text\','+getPageNumToAdd()+')">   Text</button><button class="glyphicon glyphicon-picture" onClick="addElement(\'image\','+getPageNumToAdd()+')">   Media</button><button class="glyphicon glyphicon-edit" onClick="addElement(\'input\','+getPageNumToAdd()+')">   Input</button><button class="glyphicon glyphicon-share" onClick="addElement(\'button\','+getPageNumToAdd()+')">   Button</button><button class="glyphicon glyphicon-share" onClick="addElement(\'link\', '+getPageNumToAdd()+')">   Link</button><button class="glyphicon glyphicon-font" onClick="addElement(\'header\', '+getPageNumToAdd()+')">   Heading</button><span></span><div class=\'linked-page\'>Links to:<div><button class="dropdown-tag" onClick="createDropdownOfPages(this)">No page selected</button></div></div></div><div class="page-attrs"> Page Attributes: <p>This is a popup: <input type="checkbox" class="is-popup"></input></p><p>Minimum Choices: <input type="text" class="min-choices" value="0"></input></p><p>Randomize Choices: <input type="checkbox" class="random-choices"></input></p></div>';
    var pages = document.getElementById('pages');
    var newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'page-num-'+ getPageNumToAdd());
    newdiv.setAttribute('class', 'page');
    newdiv.innerHTML = newPage;
    pages.appendChild(newdiv);
    removeAllPageLinkLists();
}


//adds a new element to the page
//type: the type of element to be added
//num: the number id of the page the element is being added to
function addElement(type, num) {
    var sectionToAdd = "<div class= 'content";
    switch(type.trim()) {
            case "text":
                            sectionToAdd += " text-content'><textarea class='paratext'></textarea>";
                            sectionToAdd += "<div> <button onClick='removeSection(this)'>Remove Section</button> </div>";
                            break;
            case "input":
                            sectionToAdd += " input-content'><p>Text input field</p>";
                            sectionToAdd += "<div>Question: <input type='text' class='question'></input> </div><div>Tag:<input type='text' class='tag'></input></div><div><button onClick='removeSection(this)'>Remove Section</button> </div>";
                            break;
            case "button":
                            sectionToAdd += " button-content'><p>Button text: <textarea class='btn-desc'></textarea></p>";
                            sectionToAdd += "<p>Button link: <button class='dropdown-tag' onclick='createDropdownOfPages(this)'>No page selected</button></p>";
                            sectionToAdd += "<div> <button onClick='removeSection(this)'>Remove Section</button></div>";
                            break;
            case "image" :
                            sectionToAdd += " image-content'><p>Upload image: (still to add)</p>";
                            sectionToAdd += "<div> <button onClick='removeSection(this)'>Remove Section</button></div>";
                            break;
            case "radio" :
            
                            break;
            case "dropdown" :
                            break;
            case "link" :
                            sectionToAdd += " link-content'><p>Link:</p>";
                            sectionToAdd += "<p>Text: <input type='text' class='link-text'></input></p>";
                            sectionToAdd += "<p>Link: <input type='text' class='link-hyper'></input></p>";
                            sectionToAdd += "<div> <button onClick='removeSection(this)'>Remove Section</button></div>";
                            break;
            case "header" :
                            sectionToAdd += " header-content'><textarea class='headertext'></textarea>";
                            sectionToAdd += "<p>Header type: <select><option value='heading-big'>Large heading</option>";
                            sectionToAdd += "<option value='heading-medium'>Medium heading</option>";
                            sectionToAdd += "<option value='heading-small'>Small heading</option></select></p>";
                            sectionToAdd += "<div> <button onClick='removeSection(this)'>Remove Section</button></div>";
                            break;
        
    }
    sectionToAdd += "</div>";
    
    $('#add-elem-'+num).before(sectionToAdd);
}

//creates a prompt asking the user if they want to delete a page
function promptRemove(num) {
    var newPrompt = '<div id="btn-for-remove-'+num+'">Are you sure you want to remove this page?<button onClick="removePage('+num+')">Yes</button><button onClick="removeConfirm('+num+')">No</button></div>';
    //document.getElementById('pages').insertBefore(newPrompt[0], $('page-num-'+num)[0]);
    $('#page-num-'+num).before(newPrompt);
}
//removes a page
function removePage(num) {
    //TODO: check if any pages link to this
    
    //remove page
    $('#page-num-'+num).remove();
    removeConfirm(num);
    removeAllPageLinkLists();
}

//removes the confirmation section that asks if a page should be removed
function removeConfirm(num) {
    $('#btn-for-remove-'+num).remove();
}

//removes a specific element of the page
function removeSection(e) {
    e.parentNode.parentNode.remove();
}

//Updates the title of a page
function updateTitle(item) {
    var html = item.innerHTML;
    var content = '<div><input type="text" value="'+html+'"></input><button onClick="finishUpdate(this)">Update</button></div>';
    $(item).before(content);
    item.remove();
}


function finishUpdate(item) {
    var html = item.parentNode.children[0].value;
    var content = '<h3 onClick="updateTitle(this)">'+html+'</h3>';
    var num = item.parentNode.parentNode.parentNode.id.split("-")[2];
    for(var i=0;i<$(".linkedpage").length;i++) {
        if ($(".linkedpage")[i].classList[0] == num) {
            $(".linkedpage")[i].children[0].innerHTML = html;
        }
    }
    for(var i=0;i<$(".dropdown-tag").length;i++) {
        if ($(".dropdown-tag")[i].classList[1] == num) {
            $(".dropdown-tag")[i].innerHTML = html;
        }
    }
    $(item.parentNode).before(content);
    item.parentNode.remove();
}

function createDropdownOfPages(element) {
    var pages = $("#pages > div");
    var title;
    var num;
    var listings = "<div class='dropdown'><ul>";
    if(element.parentNode.children[1]) {
        element.parentNode.children[1].remove();
    } else {
        for(var i=0;i<pages.length;i++) {
            num = pages[i].id.split("-")[2];
            if (pages[i].getElementsByClassName("page-header")[0].children[0].tagName == "H3") {
                title = pages[i].getElementsByClassName("page-header")[0].children[0].innerHTML;
            } else {
                title = pages[i].getElementsByClassName("page-header")[0].children[0].children[0].value;
            }
            listings += "<li class='"+num+" linkedpage'><button onClick='linkPageToCurrent(this)'>"+title+"</button></li>";
        }
        listings += "</ul></div>";
        $(element.parentNode).append(listings);
    }
}

function removeAllPageLinkLists() {
    var links = $(".dropdown");
    for (var i=0;i<links.length;i++) {
        links[i].remove();
    }
}


function linkPageToCurrent(element) {
    var pageId = element.parentNode.classList[0];
    var pageTitle = element.innerHTML;
    element.parentNode.parentNode.parentNode.parentNode.children[0].innerHTML = pageTitle;
    element.parentNode.parentNode.parentNode.parentNode.children[0].className = "dropdown-tag "+ pageId;
    element.parentNode.parentNode.parentNode.remove();
}

function getPageNumToAdd() {
    return Number($("#pages > div").last()[0].id.split("-")[2]) + 1;
}
