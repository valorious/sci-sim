function saveSimulation() {
    var args = {};
    args.title = $("#sim-info")[0].children[0].children[0].children[1].children[0].value;
    args.password = $("#sim-info")[0].children[0].children[1].children[1].children[0].value;
    args.desc = $("#sim-info")[0].children[0].children[2].children[1].children[0].value;
    var pages = $("#pages > div");
    
    
    var model = new SimulationModel(args);
    
    for (var i=0; i<pages.length; i++) {
        var page = {};
        page.id = pages[i].getElementsByClassName("page-header")[0].children[0].innerHTML;
        page.title = pages[i].getElementsByClassName("header")[1].value;
        
        
        var p = new SimulationPageModel(page);
        
        //TODO: add sections
        
        //TODO: add actions for pages
        var attrs = pages[i].getElementsByClassName("page-attrs")[0];
        if (attrs.getElementsByClassName("is-popup")[0]) {
            p.addModifier(new SimulationPageModifierModel("POPUP_WINDOW", true));
        }
        if (attrs.getElementsByClassName("min-choices")[0].value > 0) {
            p.addModifier(new SimulationPageModifierModel("MINIMUM_CHOICES", true));
            p.addModifier(new SimulationPageModifierModel("MINIMUM_CHOICES_REACHED", attrs.getElementsByClassName("min-choices")[0].value));
        }
        if (attrs.getElementsByClassName("random-choices")[0].value) {
            p.addModifier(new SimulationPageModifierModel("RANDOM_CHOICES", true));
        }
        
        model.addPage(p);
    }
    
}