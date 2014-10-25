/**
 * Require importants libraries & dependancies
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.0
 * 
 */

//# Include common libraries to the application 
Alloy.Globals.libs = {};
Alloy.Globals.libs.helper = require('helper');
Alloy.Globals.libs.transporters = require('transporters').client();
Alloy.Globals.libs.DBmanager = require('databaseConnector').DBmanager;