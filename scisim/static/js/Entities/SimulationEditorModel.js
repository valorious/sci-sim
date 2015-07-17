var SimulationEditorModel = function(simulations) {

    // simulations passed in will usually be null
    this.simulations = simulations;

    // loaded will be set after the Simulation Editor is loaded, but this class is created before then
    this.loaded = false;

    // ready will be set after initial simulations have been loaded from database and are ready for rendering into menu
    this.ready = false;

    // state of the editor will be used to drive logic and change display
    this.state = SimulationEditorModel.STATE.NOT_READY;
};

SimulationEditorModel.STATE = Object.freeze({
    NOT_READY: "Not ready or not loaded",
    MENU: "Initial menu showing simulations to edit"

});

/**
 * Adds a simulation to the current list of simulations. If no simulations
 * exist already, create new list.
 * @param {SimulationModel} simulation [Model representing a simulation]
 */
SimulationEditorModel.prototype.addSimulation = function(simulation) {
    console.log(simulation);
    if (this.simulations) {
        this.simulations.push(simulation);
    } else {
        this.simulations = [simulation];
    }
    console.log(this.simulations);
};

/**
 * Set ready. Should be called by controller after simulations have been initialized
 */
SimulationEditorModel.prototype.setReady = function() {
    this.ready = true;
};

/**
 * Set loaded. Should be called by controller after it has been loaded. (run by the Engine)
 */
SimulationEditorModel.prototype.setLoaded = function() {
    this.loaded = true;
};

/**
 * @return {Boolean} [true if editor is ready to start]
 */
SimulationEditorModel.prototype.isReady = function() {
    return this.ready;
};

/**
 * @return {[] or null} [List of simulations or null]
 */
SimulationEditorModel.prototype.getSimulations = function() {
    return this.simulations;
};
