/*
 * Search package
 * @author Yanis Adoui & Damien Lehericy
 * @version 1.0.1
 *
 * DEMO : 6C02661973266
 * 
 */
var search = {
    helper: Alloy.Globals.libs.helper,
    parameters: require('transporterProvider'),
    DB: Alloy.Globals.libs.DBmanager,

    /**
     * Push transporter
     * @param  {String} Code tracking
     * @param  {String} Transporter name
     * @param  {String} Status of tracking
     */
    add: function (code, transporter, status) {
        "use strict";
         if(_.isEmpty(search.DB.fetch(code))) {
            $.addPackage.show();
            $.addPackage.addEventListener('click', function (e) {
                if (e.index === 0) {
                    search.DB.save({
                        alias: '',
                        code: code,
                        status: status,
                        transporter: transporter
                    });
                }
            });
        }
    },

    /**
     * Transporter selection
     * @param  {Array} librarie Array with list of transporter
     * @return {Integer}        Number index of select
     */
    select: function (librarie) {
        "use strict";
        Alloy.Globals.loading.hide();
        $.dialog.options = librarie;
        $.dialog.show();
        $.dialog.addEventListener('click', function (e) {
            Alloy.Globals.loading.show('Patientez, nous recherchons...', false);
            return $.dialog.options[$.dialog.selectedIndex];
        });
    },
    load: function () {
        "use strict";
        var librarie, currentParams;
        $.searchLoad.addEventListener('click', function (e) {
            $.searchCode.blur();
            if (!search.helper.methods.isValid($.searchCode.value)) return alert('Indiquez votre numéro de suivi.');
            Alloy.Globals.loading.show('Patientez, nous recherchons...', false);
            if (librarie = search.helper.methods.whatIs($.searchCode.value)) {
                // Define a transporter name
                if(!search.helper.methods.isValid(librarie)) {
                    Alloy.Globals.loading.hide();
                    return alert('Livreur non-pris en charge !');
                } else if(librarie.length > 1) {
                    librarie = search.select(librarie);
                } else {
                    librarie = librarie[0];
                }
                switch (librarie) {
                    // TODO : Créer une librairie pour y entreposer un callback d'éxécution selon le transporteur.
                    case 'colissimo':
                        if (!search.parameters.of(librarie)) {
                            Alloy.Globals.loading.hide();
                            return alert('Une erreur est survenue.');
                        } else {
                            currentParams = search.parameters.of(librarie);
                            currentParams.request.params = {code: $.searchCode.value};
                            Alloy.Globals.libs.transporters.client(currentParams.request.name, $.searchCode.value, currentParams.request.method, currentParams.request, function (data) {
                                Alloy.Globals.loading.hide();
                                $.display.setData([]);
                                if(!data.response || _.isEmpty(data.response)) return alert('Colis introuvable.');
                                search.add($.searchCode.value, librarie, 'En cours'); // TODO : Extraire l'état actuel.
                                _.each(data.response, function(data) { 
                                    $.display.appendRow(Alloy.createController('elements/searchResults', data).getView());
                                });
                            });
                        }
                        break;
                    default:
                        Alloy.Globals.loading.hide();
                        return alert('Livreur non-pris en charge.');
                        break;
                }
            }
        });
    }
};

search.load();