define([
           'dojo/_base/declare',
           'JBrowse/Plugin',
           'dijit/ConfirmDialog',
           'dijit/MenuItem',
           'dijit/registry',
           'dojo/dom-construct'
       ],
       function(
           declare,
           JBrowsePlugin,
           Popup,
           MenuItem,
           registry,
           domConstruct
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {
        var browser = args.browser;

        console.log( "DynamicTrack plugin starting" );
        browser.afterMilestone('initView', () => {
            browser.addGlobalMenuItem('tools',
                new MenuItem({
                    id: 'menubar_popup',
                    label: 'Dynamic track',
                    onClick: () => {
                        new Popup({
                            browser: browser,
                            content: 'Click OK to initialize a new track',
                            title: 'Dynamic track',
                            onExecute: () => {
                                // can be standard track config with a different store class or track type and can add urlTemplate
                                var trackConfig = {
                                    "label" : "Dynamic track",
                                    "features" : [{
                                        "seq_id" : "ctgA",
                                        "name" : "Example",
                                        "start" : 330,
                                        "end" : 440
                                    }],
                                    "storeClass" : "JBrowse/Store/SeqFeature/FromConfig",
                                    "type" : "JBrowse/View/Track/CanvasFeatures"
                                };
                                var store = dojo.clone(trackConfig);
                                var track = dojo.clone(trackConfig);
                                store.browser = browser;
                                store.type = store.storeClass;
                                track.store = browser.addStoreConfig(undefined, store);
                                browser.publish ('/jbrowse/v1/v/tracks/new', [track]);
                                alert('Dynamic track created! Go to ctgA:300-400 to see feature');
                            }
                        }).show();
                    }
                })
            );
            setTimeout(() => {
                browser.renderGlobalMenu('tools', {text: 'Tools'}, browser.menuBar);
                var helpMenu = registry.byId('dropdownbutton_help');
                var toolsMenu = registry.byId('dropdownbutton_tools');
                domConstruct.place(toolsMenu.domNode, helpMenu.domNode, 'before');
            }, 200)
        });
    }
});
});
