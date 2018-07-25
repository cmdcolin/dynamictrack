define([
           'dojo/_base/declare',
           'JBrowse/Plugin'
       ],
       function(
           declare,
           JBrowsePlugin
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {
        var browser = args.browser;

        console.log( "DynamicTrack plugin starting" );
        browser.afterMilestone('initView', () => {
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
        })
    }
});
});
