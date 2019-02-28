/*
Copyright 2015, 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

var React = require('react');
import SettingsStore from 'matrix-react-sdk/lib/settings/SettingsStore';

module.exports = React.createClass({
    displayName: 'VectorLoginFooter',
    statics: {
        replaces: 'LoginFooter',
    },

    render: function() {
        // FIXME: replace this with a proper Status skin
        // ...except then we wouldn't be able to switch to the Status theme at runtime.
        if (SettingsStore.getValue("theme") === 'status') return <div/>;

        var data = require('../../../../package.json');


        return (
            <div className="mx_Login_links">
                <br />
                <img src="themes/tchap/img/logos/logo_rep_fr.svg" width="100" height="59" alt="Republique Française"/>
                <br /><br />
                <a href="https://www.legifrance.gouv.fr/">Legifrance</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <a href="https://www.service-public.fr">Service-public</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <a href="https://www.gouvernement.fr/">Gouvernement</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <a href="https://www.data.gouv.fr/fr/">OpenData</a>
                <br />
                <br />
                <span>Tchap v{data.appVersion}</span>
            </div>
        );
    }
});
