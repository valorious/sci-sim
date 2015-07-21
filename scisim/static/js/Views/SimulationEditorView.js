var SimulationEditorView = function(editor) {
    this.editor = editor;
    
    this.template = _.template(' \
    <table id="sim-info"> \
        <tbody>\
             <tr><td>Simulation name:</td>\
                <td><input type="text" value="<%= this.editor.title %>"></td></tr>\
             <tr><td>Simulation password:</td>\
                <td><input type="text" value="<%= this.editor.password %>"></td></tr>\
             <tr><td>Simulation description:</td>\
                <td><textarea value="<%= this.editor.desc %>"></textarea></td></tr>\
        </tbody>\
    </table>\
    <div id="pages">\
    <% var i=0; %>\
    <% _.each(this.editor.pages, function(page) { %> \
        <div class="page" id="page-num-<%= i %>\
           <div class="page-header"><h3 onclick="updateTitle(this)"><%= page.id %></h3></div>\
           <table><tbody><tr><td><div class="header">Page Title: </div></td>\
                <td><input type="text" class="header" value="<%= page.title %>"></td></tr>\
                </tbody></table><span></span>\
            <% _.each(page.sections, function(section) {  %>\
                               \
                               \
            <% }); %>\
            <div id="add-elem-<%= i %>">\
            <button class="glyphicon glyphicon-font" onClick="addElement("text",<%= i %>)">   Text</button>\
            <button class="glyphicon glyphicon-picture" onClick="addElement("image",<%= i %>)">   Media</button>\
            <button class="glyphicon glyphicon-edit" onClick="addElement("input",<%= i %>)">   Input</button>\
            <button class="glyphicon glyphicon-share" onClick="addElement("button",<%= i %>)">   Button</button>\
            <button class="glyphicon glyphicon-share" onClick="addElement("link", <%= i %>)">   Link</button>\
            </div>\
            <span></span>\
        </div>\
    <% }); %>\
    </div>\
    ');
};
